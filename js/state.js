// ============================================================
// state.js — État global principal + Screen Router + Player helpers
// player · enemy · showScreen · startGame · roster helpers
// ============================================================

// ── Variables d'état principal ────────────────────────────
let player        = null;
let enemy         = null;
let currentScreen = 'title';

// ── UI — détail Pokémon (déclarés ici car dans la plage migrée) ───
let detailPokeIdx = null;
let detailSlot    = null; // 'move1' | 'move2' | null

// ============================================================
// SCREEN ROUTER
// ============================================================
function showScreen(id) {
  if (id !== 'map' && typeof mapAnimFrame !== 'undefined' && mapAnimFrame) {
    cancelAnimationFrame(mapAnimFrame);
    mapAnimFrame = null;
  }

  // Ferme tous les overlays flottants
  ['side-menu-overlay','catch-menu','zone-picker-overlay','pre-battle-menu'].forEach(ovId => {
    const el = document.getElementById(ovId);
    if (el) el.style.display = 'none';
  });

  if (typeof pendingEnemyData !== 'undefined') pendingEnemyData = null;
  if (id !== 'battle' && typeof battleBusy !== 'undefined') battleBusy = false;

  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    if (s.id === 'screen-map') s.style.display = 'none';
  });
  document.getElementById('hud').classList.remove('visible');
  document.body.className = '';

  switch (id) {
    case 'title':        document.getElementById('screen-title').classList.add('active');      document.body.classList.add('menu');   break;
    case 'menu':         document.getElementById('screen-menu').classList.add('active');       document.body.classList.add('menu');   break;
    case 'game':         document.getElementById('hud').classList.add('visible');                                                    break;
    case 'battle':       document.getElementById('screen-battle').classList.add('active');     document.body.classList.add('battle'); document.getElementById('hud').classList.add('visible'); break;
    case 'inventory':    document.getElementById('screen-inventory').classList.add('active');  renderInventory();                     break;
    case 'shop':         document.getElementById('screen-shop').classList.add('active');       renderShop();                         break;
    case 'team':         document.getElementById('screen-team').classList.add('active');       renderTeam();                         break;
    case 'map':          { const ms = document.getElementById('screen-map'); ms.style.display = 'flex'; ms.classList.add('active'); setTimeout(renderMap, 50); break; }
    case 'tour':         document.getElementById('screen-tour').classList.add('active');                                             break;
    case 'pokedex':      document.getElementById('screen-pokedex').classList.add('active');                                          break;
    case 'quests':       document.getElementById('screen-quests').classList.add('active');     renderQuests();                       break;
    case 'talents':      document.getElementById('screen-talents').classList.add('active');                                          break;
    case 'skills':       document.getElementById('screen-skills').classList.add('active');     renderSkillTree();                    break;
    case 'prestige':     document.getElementById('screen-prestige').classList.add('active');   renderPrestigeScreen();               break;
    case 'breeding':     document.getElementById('screen-breeding').classList.add('active');   renderBreedingScreen();               break;
    case 'achievements': document.getElementById('screen-achievements').classList.add('active'); renderAchievements();               break;
    case 'forge':        document.getElementById('screen-forge').classList.add('active');      renderForge();                        break;
    case 'trial':        document.getElementById('screen-trial').classList.add('active');                                            break;
    case 'saves':        document.getElementById('screen-saves').classList.add('active');      renderSaveManager();                  break;
    case 'wiki':         document.getElementById('screen-wiki').classList.add('active');       renderWiki();                         break;
  }

  currentScreen = id;
}

// Raccourcis pratiques
function showInventory() { showScreen('inventory'); }
function showShop()      { showScreen('shop');      }
function showTeam()      { showScreen('team');       }
function showMap()       { showScreen('map');        }

// ============================================================
// DÉMARRAGE DE PARTIE
// ============================================================
function startGame() {
  const name = document.getElementById('char-name').value.trim() || 'Héros Anonyme';
  const cls  = document.querySelector('.class-btn.selected')?.dataset.class || 'Évoli';
  const base = CLASSES[cls];

  const starterIsShiny = rollShiny();
  const starterPoke = _buildStarterPoke(cls, base, starterIsShiny);

  player = {
    name, cls,
    spriteId:        base.id,
    currentSpriteId: base.id,
    currentName:     cls,
    type:            base.type,
    dualType:        getPokeType(base.id, base.type),
    move: base.move,  mMove: base.mMove,  animType: base.animType,
    moveElem: base.moveElem, mMoveElem: base.mMoveElem,
    moveUses: base.moveUses, mMoveUses: base.mMoveUses,
    moveUsesMax: base.moveUses, mMoveUsesMax: base.mMoveUses,
    level: 1, hp: base.hp, maxHp: base.hp, mp: base.mp, maxMp: base.mp,
    xp: 0, xpNext: 100,
    atk: base.atk, def: base.def, spd: base.spd, magic: base.magic,
    gold: 500,
    bag:          { potion: 2 },
    balls:        { pokeball: 3 },
    ctBag:        {},
    heldItemBag:  {},
    badges:       [],
    team:         [],
    box:          [],
    roster:       [starterPoke],
    activeRosterIdx: 0,
    items:        base.items.map(i => ({ ...i })),
    currentZone:  'bourg-palette',
    visitedZones: ['bourg-palette'],
    zoneKills:    {},
    trainerLevel: 1,
    trainerXP:    0,
    trainerXPNext: typeof TRAINER_XP_PER_LEVEL === 'function' ? TRAINER_XP_PER_LEVEL(1) : 500,
    tourFloor: 0, totalKills: 0, lastBossWave: 0, talentTokens: 0,
    lastWorldBoss: 0, shinyEggs: 0, shinyCount: 0, megaCount: 0,
    worldBossKills: 0, achievements: [], stats: {},
    dailyQuests: [], dailyQuestDate: '', trialPoints: 0, trialWins: 0,
  };

  showScreen('game');
  updateHUD();
  updateKillHUD();
  showZone('PokéQuest');
  getDailyQuests();
  startPassiveIncome();
  checkAchievements();
  updateDayNightHUD();
  startPeriodicHUD();
  initDexFromRoster();

  const shinyMsg = starterIsShiny ? ' ✨ INCROYABLE ! Votre starter est SHINY !' : '';
  setMessage(`Bienvenue Dresseur ${player.name} ! ${player.cls} est prêt pour l'aventure !${shinyMsg}`);
  if (starterIsShiny) notify('✨ SHINY ! Rare 1/256 !');
}

function _buildStarterPoke(cls, base, isShiny) {
  const poke = {
    name: cls, cls,
    spriteId:        base.id,
    currentSpriteId: base.id,
    currentName:     cls,
    type:            base.type,
    dualType:        getPokeType(base.id, base.type),
    move: base.move,  mMove: base.mMove, animType: base.animType,
    moveElem: base.moveElem, mMoveElem: base.mMoveElem,
    moveUses: base.moveUses, mMoveUses: base.mMoveUses,
    moveUsesMax: base.moveUses, mMoveUsesMax: base.mMoveUses,
    level: 1, hp: base.hp, maxHp: base.hp, mp: base.mp, maxMp: base.mp,
    xp: 0, xpNext: 100,
    atk: base.atk, def: base.def, spd: base.spd, magic: base.magic,
    spAtk: Math.round(base.magic * 1.1), spDef: Math.round(base.def * 0.9),
    isMain: true, isShiny,
  };
  if (isShiny) applyShinyBoost(poke);
  return poke;
}

// ============================================================
// ROSTER HELPERS
// ============================================================

/** Retourne le Pokémon actif du roster. */
function getActivePoke() {
  if (!player) return null;
  if (player.roster && player.roster.length > 0)
    return player.roster[player.activeRosterIdx || 0];
  return player;
}

/** Synchronise les stats combat du joueur depuis le Pokémon actif. */
function syncPlayerFromActive() {
  if (!player.roster || !player.roster.length) return;
  const p = getActivePoke();
  if (!p) return;
  player.currentSpriteId = p.currentSpriteId || p.spriteId;
  player.currentName     = p.currentName || p.name;
  player.type            = p.type;
  player.dualType        = p.dualType || getPokeType(p.currentSpriteId || p.spriteId, p.type);
  player.move            = p.move;       player.mMove        = p.mMove;
  player.animType        = p.animType || 'normal';
  player.moveElem        = p.moveElem;   player.mMoveElem    = p.mMoveElem;
  player.moveUses        = p.moveUses;   player.mMoveUses    = p.mMoveUses;
  player.moveUsesMax     = p.moveUsesMax; player.mMoveUsesMax = p.mMoveUsesMax;
  player.level           = p.level;
  player.hp              = p.hp;         player.maxHp        = p.maxHp;
  player.mp              = p.mp;         player.maxMp        = p.maxMp;
  player.xp              = p.xp;         player.xpNext       = p.xpNext;
  player.atk             = p.atk;        player.def          = p.def;
  player.spd             = p.spd;        player.magic        = p.magic;
  player.spAtk           = p.spAtk || p.magic;
  player.spDef           = p.spDef || p.def;
}

/** Synchronise le Pokémon actif depuis les stats combat du joueur. */
function syncActiveFromPlayer() {
  if (!player.roster || !player.roster.length) return;
  const p = getActivePoke();
  if (!p) return;
  p.currentSpriteId = player.currentSpriteId;
  p.currentName     = player.currentName;
  p.type            = player.type;
  p.dualType        = player.dualType;
  p.level           = player.level;
  p.hp              = player.hp;         p.maxHp    = player.maxHp;
  p.mp              = player.mp;         p.maxMp    = player.maxMp;
  p.xp              = player.xp;         p.xpNext   = player.xpNext;
  p.atk             = player.atk;        p.def      = player.def;
  p.spd             = player.spd;        p.magic    = player.magic;
  if (player.spAtk !== undefined) p.spAtk = player.spAtk;
  if (player.spDef !== undefined) p.spDef = player.spDef;
  p.moveUses        = player.moveUses;    p.mMoveUses    = player.mMoveUses;
  p.moveUsesMax     = player.moveUsesMax; p.mMoveUsesMax = player.mMoveUsesMax;
}

/** Change le Pokémon actif dans le roster. Retourne true si réussi. */
function switchToRosterPoke(idx, fromBattle = false) {
  if (!player.roster || idx < 0 || idx >= player.roster.length) return false;
  const target = player.roster[idx];
  if (!target) return false;
  if (target.hp <= 0) { notify(`${target.currentName || target.name} est K.O. !`); return false; }
  if (idx === (player.activeRosterIdx || 0)) { notify('Déjà sur le terrain !'); return false; }
  syncActiveFromPlayer();
  player.activeRosterIdx = idx;
  syncPlayerFromActive();
  return true;
}

/**
 * Ajoute un Pokémon capturé au roster ou à la box.
 * Ne duplique pas les espèces — garde le shiny ou le plus haut niveau.
 */
function addCapturedToRoster(capturedData) {
  if (!player.roster) player.roster = [];
  if (!player.box)    player.box    = [];

  const _allPoke  = (typeof ALL_POKEMON     !== 'undefined') ? ALL_POKEMON     : GEN1;
  const _allSpd   = (typeof ALL_SPD         !== 'undefined') ? ALL_SPD         : GEN1_SPD;
  const _pokeMap  = (typeof ALL_POKEMON_MAP !== 'undefined') ? ALL_POKEMON_MAP : null;

  const pData = _pokeMap
    ? _pokeMap.get(capturedData.id)
    : _allPoke.find(p => p.id === capturedData.id);

  const spd   = _allSpd[capturedData.id] || 50;
  const lvl   = capturedData.level || 1;
  const scale = 1 + lvl * 0.12;

  const newPoke = {
    name:            capturedData.name,
    currentName:     capturedData.name,
    spriteId:        capturedData.id,
    currentSpriteId: capturedData.id,
    type:            capturedData.type,
    dualType:        getPokeType(capturedData.id, capturedData.type),
    level:           lvl,
    hp:    Math.round((pData?.hp  || capturedData.hp)    * scale),
    maxHp: Math.round((pData?.hp  || capturedData.maxHp) * scale),
    mp: 50, maxMp: 50, xp: 0,
    xpNext: xpForLevel(lvl),
    atk:   Math.round((pData?.atk || 10) * scale),
    def:   Math.round((pData?.def ||  5) * scale),
    spAtk: Math.round((pData?.atk ||  8) * scale * 0.9),
    spDef: Math.round((pData?.def ||  5) * scale * 0.9),
    spd:   Math.round(spd * (1 + lvl * 0.02)),
    magic: Math.round((pData?.atk ||  8) * scale * 0.8),
    move: 'Attaque', mMove: 'Capacité',
    moveElem: capturedData.type, mMoveElem: capturedData.type,
    moveUses: 6, mMoveUses: 4, moveUsesMax: 6, mMoveUsesMax: 4,
    animType: typeToAnim(capturedData.type),
    isMain:  false,
    isShiny: capturedData.isShiny || false,
  };

  if (newPoke.isShiny) applyShinyBoost(newPoke);
  const sv = rollSizeVariant();
  newPoke.sizeVariant = sv.id;
  applySizeVariant(newPoke, sv);

  // ── Déduplication — une espèce par slot ──────────────
  const allPokes = [...player.roster, ...player.box];
  const existing = allPokes.find(p => (p.currentSpriteId || p.spriteId) === capturedData.id);

  if (existing) {
    const keepNew = (newPoke.isShiny && !existing.isShiny)
                 || (!existing.isShiny && newPoke.level > existing.level);
    if (keepNew) {
      const rIdx = player.roster.findIndex(p => (p.spriteId || p.currentSpriteId) === capturedData.id);
      const bIdx = player.box.findIndex(p => (p.spriteId || p.currentSpriteId) === capturedData.id);
      if (rIdx >= 0) {
        player.roster[rIdx] = newPoke;
        if (rIdx === (player.activeRosterIdx || 0)) syncPlayerFromActive();
      } else if (bIdx >= 0) {
        player.box[bIdx] = newPoke;
      }
      const reason = newPoke.isShiny ? '✨ Shiny supérieur' : `Niv.${newPoke.level} > Niv.${existing.level}`;
      notify(`🔄 ${capturedData.name} remplacé ! (${reason})`);
    } else {
      const reason = existing.isShiny ? 'tu as déjà le Shiny' : `déjà Niv.${existing.level}`;
      notify(`📦 ${capturedData.name} relâché — ${reason} !`);
    }
    return;
  }

  // Nouvelle espèce — ajout normal
  if (player.roster.length < 6) {
    player.roster.push(newPoke);
    player.team.push({
      name: capturedData.name, id: capturedData.id,
      type: capturedData.type, level: lvl,
      hp: newPoke.hp, maxHp: newPoke.maxHp,
    });
  } else {
    player.box.push(newPoke);
    notify(`📦 ${capturedData.name} envoyé dans la Box ! (équipe pleine)`);
  }

  if (newPoke.isShiny) player.shinyCount = (player.shinyCount || 0) + 1;
  markDexSeen(capturedData.id);
  updateGlobalStats('catches');
  checkAchievements();
}
