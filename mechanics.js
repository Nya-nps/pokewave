// ═══════════════════════════════════════════════════════════════
//  POKEWAVE — MÉCANIQUES AVANCÉES
//  STAB · Coups Critiques · Statuts · Météo · Capacités · Natures
//  Rival · Team Rocket · Jour/Nuit · Évolutions par pierre/amitié
// ═══════════════════════════════════════════════════════════════

// ──────────────────────────────────────────────────────────────
// 1. EFFICACITÉ DUAL-TYPE
//    Patch getEffectiveness pour gérer "Eau/Vol", "Feu/Sol" etc.
// ──────────────────────────────────────────────────────────────
const _origGetEff = window.getEffectiveness || getEffectiveness;
window.getEffectiveness = function(atkType, defType) {
  if (!defType) return 1;
  if (defType.includes('/')) {
    const [t1, t2] = defType.split('/');
    return _origGetEff(atkType, t1) * _origGetEff(atkType, t2);
  }
  return _origGetEff(atkType, defType);
};

// ──────────────────────────────────────────────────────────────
// 2. NATURES
// ──────────────────────────────────────────────────────────────
const NATURES = {
  'Rigide':    { atk:1,    def:1,    spd:1,    magic:1   },  // neutre
  'Solitaire': { atk:1.1,  def:0.9,  spd:1,    magic:1   },
  'Téméraire': { atk:1.1,  def:1,    spd:0.9,  magic:1   },
  'Adamante':  { atk:1.1,  def:1,    spd:1,    magic:0.9 },
  'Mauvais':   { atk:1.1,  def:1,    spd:1,    magic:1   },
  'Assurée':   { atk:0.9,  def:1.1,  spd:1,    magic:1   },
  'Détendue':  { atk:1,    def:1.1,  spd:0.9,  magic:1   },
  'Maligne':   { atk:1,    def:1.1,  spd:1,    magic:0.9 },
  'Relâchée':  { atk:1,    def:1.1,  spd:1,    magic:1   },
  'Timide':    { atk:0.9,  def:1,    spd:1.1,  magic:1   },
  'Pressée':   { atk:1,    def:0.9,  spd:1.1,  magic:1   },
  'Joviale':   { atk:1,    def:1,    spd:1.1,  magic:0.9 },
  'Naïve':     { atk:1,    def:1,    spd:1.1,  magic:1   },
  'Modeste':   { atk:0.9,  def:1,    spd:1,    magic:1.1 },
  'Douce':     { atk:1,    def:0.9,  spd:1,    magic:1.1 },
  'Posée':     { atk:1,    def:1,    spd:0.9,  magic:1.1 },
  'Témér.2':   { atk:1,    def:1,    spd:1,    magic:1.1 },
  'Calme':     { atk:0.9,  def:1,    spd:1,    magic:1   },
  'Gentille':  { atk:1,    def:0.9,  spd:1,    magic:1   },
  'Prudente':  { atk:1,    def:1,    spd:0.9,  magic:1   },
  'Hautaine':  { atk:1,    def:1,    spd:1,    magic:1   },
  'Bizarre':   { atk:1,    def:1,    spd:1,    magic:1   },
};

const NATURE_NAMES = Object.keys(NATURES);

function getRandomNature() {
  return NATURE_NAMES[Math.floor(Math.random() * NATURE_NAMES.length)];
}

function applyNatureToStats(p) {
  if (!p.nature) return;
  const n = NATURES[p.nature];
  if (!n) return;
  if (n.atk   !== 1) p.atk   = Math.max(1, Math.round(p.atk   * n.atk));
  if (n.def   !== 1) p.def   = Math.max(1, Math.round(p.def   * n.def));
  if (n.spd   !== 1) p.spd   = Math.max(1, Math.round(p.spd   * n.spd));
  if (n.magic !== 1) p.magic = Math.max(1, Math.round(p.magic * n.magic));
}

// Assigner nature lors de la capture/création
// Patch addCapturedToRoster pour assigner une nature
(function patchCaptureNature() {
  const _prevCapture = window.addCapturedToRoster;
  if (_prevCapture) {
    window.addCapturedToRoster = function(capturedData) {
      if (!capturedData.nature) capturedData.nature = getRandomNature();
      _prevCapture(capturedData);
    };
  }
})();

// ──────────────────────────────────────────────────────────────
// 3. CAPACITÉS (ABILITIES)
// ──────────────────────────────────────────────────────────────
const ABILITIES_DB = {
  'Brasier':     { desc:'Feu ×1.5 si PV < 33%',    type:'boost',  condition: (p) => p.hp/p.maxHp < 0.33, atkType:'Feu',      mult:1.5 },
  'Torrent':     { desc:'Eau ×1.5 si PV < 33%',    type:'boost',  condition: (p) => p.hp/p.maxHp < 0.33, atkType:'Eau',      mult:1.5 },
  'Engrais':     { desc:'Plante ×1.5 si PV < 33%', type:'boost',  condition: (p) => p.hp/p.maxHp < 0.33, atkType:'Plante',   mult:1.5 },
  'Lévitation':  { desc:'Immunité Sol',             type:'immune', atkType:'Sol' },
  'Intimidation':{ desc:'-15% Atk ennemi au début', type:'intimidate' },
  'Électricité': { desc:'30% Paralysie au contact', type:'onhit',  status:'paralysie' },
  'Flamme':      { desc:'30% Brûlure au contact',   type:'onhit',  status:'brûlure' },
  'Anticipe':    { desc:'Voir les attaques ennemies', type:'info' },
  'Serge-Pluie': { desc:'Pluie dès le début',        type:'weather', weather:'pluie' },
  'Sécheresse':  { desc:'Soleil dès le début',        type:'weather', weather:'soleil' },
  'Grêle':       { desc:'Grêle dès le début',          type:'weather', weather:'grêle' },
  'Tempête-Sable':{ desc:'Sable dès le début',         type:'weather', weather:'sable' },
  'Armure':      { desc:'Immunité aux Coups Critiques', type:'nocrit' },
  'Esprit-Force':{ desc:'+20% Atk',                  type:'statboost', stat:'atk', mult:1.2 },
  'Myster-Guard':{ desc:'N\'est touché que par les attaques super efficaces', type:'wonderguard' },
};

// Attribution capacité par type de Pokémon
const TYPE_ABILITY_MAP = {
  'Feu':      ['Brasier','Flamme'],
  'Eau':      ['Torrent','Électricité'],
  'Plante':   ['Engrais'],
  'Sol':      ['Armure'],
  'Dragon':   ['Esprit-Force'],
  'Vol':      ['Lévitation'],
  'Psy':      ['Anticipe'],
  'Spectre':  ['Lévitation'],
  'Électrik': ['Électricité'],
  'Acier':    ['Armure'],
  'Glace':    ['Armure'],
  'Normal':   [],
  'Combat':   ['Esprit-Force'],
};

const POKEMON_ABILITY_OVERRIDES = {
  // IDs spéciaux
  6:   'Brasier',     // Dracaufeu
  9:   'Torrent',     // Tortank
  3:   'Engrais',     // Florizarre
  6:   'Brasier',
  65:  'Anticipe',    // Alakazam
  94:  'Lévitation',  // Ectoplasma
  143: 'Esprit-Force',// Ronflex
  149: 'Esprit-Force',// Dracolosse
  245: 'Lévitation',  // Suicune
  249: 'Lévitation',  // Lugia
  282: 'Anticipe',    // Gardevoir
  350: 'Esprit-Force',// Milobellus
  384: 'Esprit-Force',// Rayquaza
  257: 'Brasier',
  260: 'Torrent',
  254: 'Engrais',
};

function getAbilityForPokemon(p) {
  if (POKEMON_ABILITY_OVERRIDES[p.id]) return POKEMON_ABILITY_OVERRIDES[p.id];
  const pool = TYPE_ABILITY_MAP[p.t || p.type] || [];
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ──────────────────────────────────────────────────────────────
// 4. STATUTS DE COMBAT
// ──────────────────────────────────────────────────────────────
// Stocké sur player.statusEffect et enemy.statusEffect :
// { type: 'poison'|'brûlure'|'paralysie'|'sommeil'|'gel', turns: N }

const STATUS_ICONS = {
  poison:   '☠ Empoisonné',
  brûlure:  '🔥 Brûlé',
  paralysie:'⚡ Paralysé',
  sommeil:  '💤 Endormi',
  gel:      '🧊 Gelé',
};

const STATUS_COLORS = {
  poison:   '#aa44bb',
  brûlure:  '#ff6030',
  paralysie:'#ffcc00',
  sommeil:  '#4488ff',
  gel:      '#88ccff',
};

function applyStatus(target, statusType, turns) {
  if (!target || target.statusEffect?.type) return false; // déjà un statut
  target.statusEffect = { type: statusType, turns: turns || 0 };
  return true;
}

function clearStatus(target) {
  if (target) target.statusEffect = null;
}

// Appliquer les dégâts de statut (fin de tour)
// Retourne une string de log
function applyStatusDoT(target, isPlayer) {
  if (!target || !target.statusEffect) return '';
  const st = target.statusEffect;
  const name = isPlayer ? (player?.currentName || 'Votre Pokémon') : (enemy?.name || 'Ennemi');
  let logAdd = '';

  if (st.type === 'poison') {
    const dmg = Math.max(1, Math.round(target.maxHp / 8));
    target.hp -= dmg;
    logAdd = ` ☠ ${name} perd ${dmg} PV (Poison) !`;
  } else if (st.type === 'brûlure') {
    const dmg = Math.max(1, Math.round(target.maxHp / 8));
    target.hp -= dmg;
    logAdd = ` 🔥 ${name} perd ${dmg} PV (Brûlure) !`;
  } else if (st.type === 'gel') {
    // 20% de chance de dégel
    if (Math.random() < 0.2) {
      target.statusEffect = null;
      logAdd = ` 🧊 ${name} n'est plus gelé !`;
    }
  } else if (st.type === 'sommeil') {
    st.turns--;
    if (st.turns <= 0) {
      target.statusEffect = null;
      logAdd = ` 💤 ${name} se réveille !`;
    }
  }
  return logAdd;
}

// Afficher l'indicateur de statut dans le DOM
function updateStatusDisplay() {
  const pStatus = document.getElementById('b-player-status');
  const eStatus = document.getElementById('b-enemy-status');
  if (pStatus) {
    if (player?.statusEffect) {
      pStatus.textContent = STATUS_ICONS[player.statusEffect.type] || '';
      pStatus.style.color = STATUS_COLORS[player.statusEffect.type] || '#fff';
      pStatus.style.display = 'block';
    } else {
      pStatus.style.display = 'none';
    }
  }
  if (eStatus) {
    if (enemy?.statusEffect) {
      eStatus.textContent = STATUS_ICONS[enemy.statusEffect.type] || '';
      eStatus.style.color = STATUS_COLORS[enemy.statusEffect.type] || '#fff';
      eStatus.style.display = 'block';
    } else {
      eStatus.style.display = 'none';
    }
  }
}

// Injecter les balises de statut dans le DOM de combat
function injectStatusUI() {
  // Player
  let pEl = document.getElementById('b-player-status');
  if (!pEl) {
    pEl = document.createElement('div');
    pEl.id = 'b-player-status';
    pEl.style.cssText = 'font-family:"Press Start 2P",monospace;font-size:.32rem;margin-top:.2rem;display:none';
    const pNameEl = document.getElementById('b-player-name');
    if (pNameEl?.parentNode) pNameEl.parentNode.insertBefore(pEl, pNameEl.nextSibling);
  }
  // Enemy
  let eEl = document.getElementById('b-enemy-status');
  if (!eEl) {
    eEl = document.createElement('div');
    eEl.id = 'b-enemy-status';
    eEl.style.cssText = 'font-family:"Press Start 2P",monospace;font-size:.32rem;margin-top:.2rem;display:none';
    const eNameEl = document.getElementById('b-enemy-name');
    if (eNameEl?.parentNode) eNameEl.parentNode.insertBefore(eEl, eNameEl.nextSibling);
  }
  // Weather indicator
  let wEl = document.getElementById('battle-weather');
  if (!wEl) {
    wEl = document.createElement('div');
    wEl.id = 'battle-weather';
    wEl.style.cssText = 'position:absolute;top:.6rem;right:.7rem;font-family:"Press Start 2P",monospace;font-size:.35rem;opacity:.85;display:none';
    const bScreen = document.getElementById('screen-battle');
    if (bScreen) bScreen.appendChild(wEl);
  }
}

// ──────────────────────────────────────────────────────────────
// 5. MÉTÉO EN COMBAT
// ──────────────────────────────────────────────────────────────
let battleWeather = { type: null, turns: 0 };

const WEATHER_INFO = {
  pluie:   { icon: '🌧', label: 'Pluie',  boost:'Eau', weaken:'Feu',     dotType: null,              dotTypes:[] },
  soleil:  { icon: '☀️', label: 'Soleil', boost:'Feu', weaken:'Eau',     dotType: null,              dotTypes:[] },
  grêle:   { icon: '🌨', label: 'Grêle',  boost: null, weaken: null,     dotType: 'grêle',           dotTypes:['Normal','Feu','Eau','Plante','Électrik','Combat','Poison','Sol','Psy','Dragon','Ténèbres','Acier','Fée'] },
  sable:   { icon: '🌪', label: 'Sable',  boost:'Roche', weaken: null,   dotType: 'sable',           dotTypes:['Normal','Feu','Eau','Plante','Électrik','Combat','Poison','Psy','Dragon','Ténèbres','Fée','Insecte','Vol','Spectre'] },
};

function setWeather(type, turns) {
  battleWeather = { type, turns: turns || 5 };
  updateWeatherDisplay();
  return `${WEATHER_INFO[type]?.icon || ''} ${WEATHER_INFO[type]?.label || type} commence !`;
}

function updateWeatherDisplay() {
  const wEl = document.getElementById('battle-weather');
  if (!wEl) return;
  if (battleWeather.type && battleWeather.turns > 0) {
    const wi = WEATHER_INFO[battleWeather.type];
    wEl.textContent = `${wi?.icon || ''} ${wi?.label || ''} (${battleWeather.turns} tours)`;
    wEl.style.display = 'block';
  } else {
    wEl.style.display = 'none';
  }
}

function getWeatherMult(atkType) {
  if (!battleWeather.type || battleWeather.turns <= 0) return 1;
  const wi = WEATHER_INFO[battleWeather.type];
  if (!wi) return 1;
  if (wi.boost === atkType) return 1.5;
  if (wi.weaken === atkType) return 0.5;
  return 1;
}

function applyWeatherDoT(target, isPlayer) {
  if (!battleWeather.type || battleWeather.turns <= 0) return '';
  const wi = WEATHER_INFO[battleWeather.type];
  if (!wi || !wi.dotType) return '';
  const targetType = isPlayer ? player?.type : enemy?.type;
  if (!targetType || !wi.dotTypes.includes(targetType)) return '';
  const name = isPlayer ? (player?.currentName || 'Votre Pokémon') : (enemy?.name || 'Ennemi');
  const dmg = Math.max(1, Math.round(target.maxHp / 16));
  target.hp -= dmg;
  return ` ${wi.icon} ${name} subit ${dmg} dégâts (${wi.label}) !`;
}

function tickWeather() {
  if (battleWeather.type && battleWeather.turns > 0) {
    battleWeather.turns--;
    if (battleWeather.turns <= 0) {
      const old = battleWeather.type;
      battleWeather = { type: null, turns: 0 };
      updateWeatherDisplay();
      return ` ${WEATHER_INFO[old]?.icon || ''} La météo se normalise.`;
    }
    updateWeatherDisplay();
  }
  return '';
}

// ──────────────────────────────────────────────────────────────
// 6. CALCUL DE DÉGÂTS COMPLET
//    STAB + Critique + Météo + Capacité + Type
// ──────────────────────────────────────────────────────────────
function calcFullDamage(baseRaw, atkType, defType, attackerPoke, isMagic) {
  let mult = getEffectiveness(atkType, defType);

  // STAB
  const attackerType = attackerPoke?.type || (isMagic ? player?.type : player?.type);
  const dualType = attackerPoke?.dualType || attackerType;
  const types = dualType ? dualType.split('/') : [attackerType];
  const stab = types.some(t => t === atkType) ? 1.5 : 1;

  // Météo
  const wMult = getWeatherMult(atkType);

  // Capacité offensive
  let abilityMult = 1;
  if (attackerPoke) {
    const ab = ABILITIES_DB[attackerPoke.ability];
    if (ab?.type === 'boost' && ab.atkType === atkType && ab.condition && ab.condition(attackerPoke)) {
      abilityMult = ab.mult || 1;
    }
  }

  // Coup critique
  let crit = 1;
  let isCrit = false;
  const critNoAbility = attackerPoke?.ability === 'Armure' ? false : (Math.random() < 1/16);
  if (critNoAbility) { crit = 1.5; isCrit = true; }

  // Brûlure: halve physical attack
  if (attackerPoke?.statusEffect?.type === 'brûlure' && !isMagic) {
    abilityMult *= 0.5;
  }

  const dmg = Math.max(1, Math.round(baseRaw * mult * stab * wMult * abilityMult * crit));
  return { dmg, mult, stab, isCrit, wMult, abilityMult };
}

// ──────────────────────────────────────────────────────────────
// 7. MOVES AVEC EFFETS DE STATUT
// ──────────────────────────────────────────────────────────────
const MOVE_STATUS_EFFECTS = {
  'Flammèche':    { status:'brûlure',   chance:0.10 },
  'Lance-Flammes':{ status:'brûlure',   chance:0.10 },
  'Déflagration': { status:'brûlure',   chance:0.30 },
  'Sacre-Feu':    { status:'brûlure',   chance:0.20 },
  'Tonnerre':     { status:'paralysie', chance:0.30 },
  'Fouet Tonnerre':{ status:'paralysie',chance:0.10 },
  'Blizzard':     { status:'gel',       chance:0.10 },
  'Laser Glace':  { status:'gel',       chance:0.10 },
  'Poudre Toxik': { status:'poison',    chance:1.00 },
  'Dard-Venin':   { status:'poison',    chance:0.30 },
  'Choc Mental':  { status:'paralysie', chance:0.30 },
  'Pneumopoing':  { status:'sommeil',   chance:1.00 },
  'Chant Doux':   { status:'sommeil',   chance:1.00 },
};

function tryApplyMoveStatus(moveName, target) {
  const eff = MOVE_STATUS_EFFECTS[moveName];
  if (!eff) return '';
  if (target.statusEffect) return ''; // déjà un statut
  if (Math.random() < eff.chance) {
    const turns = eff.status === 'sommeil' ? (1 + Math.floor(Math.random() * 3)) : 0;
    applyStatus(target, eff.status, turns);
    const name = target === enemy ? enemy.name : player.currentName;
    return ` ${STATUS_ICONS[eff.status]} !`;
  }
  return '';
}

// ──────────────────────────────────────────────────────────────
// 8. PATCH battleAction — VERSION COMPLÈTE AVEC TOUTES LES MÉCANIQUES
// ──────────────────────────────────────────────────────────────
const _origBattleAction = window.battleAction || battleAction;

window.battleAction = function(action) {
  if (!enemy || !player) return;
  if (battleTurn !== 'player' || battleBusy) return;

  let log = '';

  // ── FUITE ──
  if (action === 'flee') {
    const fleeChance = Math.min(0.9, 0.35 + (player.spd - (enemy.spd||50)) / 200);
    if (Math.random() < fleeChance) {
      stopAutoBattle(); syncActiveFromPlayer(); showScreen('game');
      setMessage('💨 Vous fuyez le combat !'); updateHUD(); return;
    }
    log = '💨 Impossible de fuir ! ';
    document.getElementById('battle-log').textContent = log;
    setBattleTurn('enemy'); return;
  }

  // ── ITEM ──
  if (action === 'item') {
    // Soins de statut d'abord
    const statusItems = [
      { key:'antidote', cures:['poison'],    name:'Antidote' },
      { key:'paralysoin', cures:['paralysie'], name:'Anti-Para' },
      { key:'réveil',   cures:['sommeil'],   name:'Réveil' },
      { key:'brulsoins',cures:['brûlure'],   name:'Brûle-Soins' },
      { key:'antidegel', cures:['gel'],      name:'Antigel' },
      { key:'totalsoins',cures:['poison','brûlure','paralysie','sommeil','gel'], name:'Total-Soins' },
    ];
    let usedStatus = false;
    for (const si of statusItems) {
      if ((player.bag[si.key]||0) > 0 && player.statusEffect && si.cures.includes(player.statusEffect.type)) {
        player.bag[si.key]--;
        clearStatus(player);
        log = `💊 ${si.name} utilisé ! Statut guéri !`;
        updateStatusDisplay();
        document.getElementById('battle-log').textContent = log;
        updateBattleHp(); updateHUD();
        setBattleTurn('enemy'); return;
      }
    }
    // Soins HP
    const totalPotions = (player.bag.potion||0)+(player.bag.superpotion||0)+(player.bag.hyperpotion||0);
    if (totalPotions > 0) {
      let heal = 0, used = '';
      if ((player.bag.hyperpotion||0) > 0) { heal=120; player.bag.hyperpotion--; used='Hyper Potion'; }
      else if ((player.bag.superpotion||0) > 0) { heal=60; player.bag.superpotion--; used='Super Potion'; }
      else { heal=30; player.bag.potion--; used='Potion'; }
      player.hp = Math.min(player.maxHp, player.hp + heal);
      log = `🧪 ${used} utilisée sur ${player.currentName} ! +${heal} PV.`;
    } else {
      log = '🧪 Plus d\'items ! ';
      document.getElementById('battle-log').textContent = log; return;
    }
    updateBattleHp(); updateHUD();
    document.getElementById('battle-log').textContent = log;
    setBattleTurn('enemy'); return;
  }

  // ── VÉRIFIER STATUT DU JOUEUR (paralysie / sommeil / gel) ──
  if (player.statusEffect) {
    const st = player.statusEffect;
    if (st.type === 'sommeil') {
      st.turns--;
      if (st.turns <= 0) { clearStatus(player); log = `💤 ${player.currentName} se réveille ! `; }
      else {
        log = `💤 ${player.currentName} est endormi et ne peut pas attaquer !`;
        document.getElementById('battle-log').textContent = log;
        updateStatusDisplay(); setBattleTurn('enemy'); return;
      }
    } else if (st.type === 'paralysie') {
      if (Math.random() < 0.25) {
        log = `⚡ ${player.currentName} est paralysé et ne peut pas bouger !`;
        document.getElementById('battle-log').textContent = log;
        updateStatusDisplay(); setBattleTurn('enemy'); return;
      }
    } else if (st.type === 'gel') {
      if (Math.random() < 0.8) {
        log = `🧊 ${player.currentName} est gelé et ne peut pas attaquer !`;
        document.getElementById('battle-log').textContent = log;
        updateStatusDisplay(); setBattleTurn('enemy'); return;
      } else {
        clearStatus(player);
        log = `🧊 ${player.currentName} n'est plus gelé ! `;
      }
    }
  }

  // ── ATTAQUE ──
  let dmg = 0;
  let moveName = '';

  if (action === 'magic') {
    const atkType = player.mMoveElem || player.type;
    moveName = player.mMove;
    const baseRaw = Math.max(1, player.magic + Math.floor(Math.random()*8) - Math.floor((enemy.def||5)/2));
    const calc = calcFullDamage(baseRaw, atkType, enemy.dualType || enemy.type, player, true);
    dmg = calc.dmg;
    const effInfo = getEffLabel(calc.mult);
    playAttackAnim(player.animType, false);
    log += `✨ ${player.currentName} utilise ${player.mMove} (${atkType}) ! `;
    if (calc.isCrit) log += '💥 Coup Critique ! ';
    if (calc.stab > 1) log += '';
    if (effInfo.label) log += effInfo.label + ' ';
    log += dmg > 0 ? `${dmg} dégâts.` : '';
    const statusLog = tryApplyMoveStatus(moveName, enemy);
    log += statusLog;
    if (effInfo.color) setTimeout(()=>{ const el=document.getElementById('battle-log'); el.style.color=effInfo.color; setTimeout(()=>el.style.color='',800); }, 50);
  } else {
    const atkType = player.moveElem || player.type;
    moveName = player.move;
    const baseRaw = Math.max(1, player.atk + Math.floor(Math.random()*6) - (enemy.def||5));
    const calc = calcFullDamage(baseRaw, atkType, enemy.dualType || enemy.type, player, false);
    dmg = calc.dmg;
    const effInfo = getEffLabel(calc.mult);
    playAttackAnim(player.animType, false);
    log += `⚔ ${player.currentName} utilise ${player.move} (${atkType}) ! `;
    if (calc.isCrit) log += '💥 Coup Critique ! ';
    if (effInfo.label) log += effInfo.label + ' ';
    log += dmg > 0 ? `${dmg} dégâts.` : '';
    const statusLog = tryApplyMoveStatus(moveName, enemy);
    log += statusLog;
    if (effInfo.color) setTimeout(()=>{ const el=document.getElementById('battle-log'); el.style.color=effInfo.color; setTimeout(()=>el.style.color='',800); }, 50);
  }

  enemy.hp -= dmg;
  if (dmg > 0) hurtSprite('enemy-battle-img');

  // Fin de tour joueur : statut + météo
  log += applyStatusDoT(enemy, false);
  log += applyWeatherDoT(enemy, false);
  log += tickWeather();
  updateStatusDisplay();

  // ── ENNEMI K.O. ──
  if (enemy.hp <= 0) {
    enemy.hp = 0; updateBattleHp();
    const playerLv  = player.level || 1;
    const enemyLv   = enemy.level  || 1;
    const lvRatio   = enemyLv > playerLv ? 1 + (enemyLv - playerLv) * 0.05 : 1;
    const badgeCount = (player.badges||[]).length;
    const badgeBonus = 1 + badgeCount * 0.5;
    const xpG  = Math.round((enemy.xp||10) * 3 * lvRatio * badgeBonus);
    const goldG= Math.round(((enemy.gold||5) + Math.floor(Math.random()*10)) * getGoldMultiplier());
    player.xp += xpG; player.gold += goldG;
    if (player.roster) player.roster.forEach((p,i)=>{ if(i!==(player.activeRosterIdx||0) && p.hp>0){ p.xp=(p.xp||0)+Math.floor(xpG*0.5); }});
    if (!player.zoneKills) player.zoneKills = {};
    const curZ = player.currentZone || 'bourg-palette';
    player.zoneKills[curZ] = (player.zoneKills[curZ]||0)+1;
    const kills = player.zoneKills[curZ]; const kn = ZONE_KILL_NEEDED;
    const killMsg = kills < kn ? ` (${kills}/${kn})` : kills===kn ? ` 🔓 Zone débloquée !` : '';
    document.getElementById('battle-log').textContent = `🏆 ${player.currentName} a vaincu ${enemy.name} ! +${xpG} XP +${goldG}₽ !${killMsg}`;
    disableBattleButtons(true); checkLevelUp();
    addTrainerXP(5);
    if (player.roster?.[player.activeRosterIdx||0]) addAffinity(player.roster[player.activeRosterIdx||0], 1);
    updateGlobalStats('kills'); updateGlobalStats('battles');
    updateGlobalStats('earn_gold', goldG);
    if (enemy.type) awardShardOnKill(enemy.type);
    triggerRandomEvent();
    if (!player._bossBattle) recordKill();
    if (player._worldBossBattle) {
      disableBattleButtons(true); handleWorldBossVictory(enemy);
      setTimeout(()=>{ stopAutoBattle(); disableBattleButtons(false); syncActiveFromPlayer(); showScreen('game'); updateHUD(); }, 1800);
      return;
    }
    if (player._bossBattle) {
      const bossWave = player._bossBattle?.wave || getWaveState().wave;
      player._bossBattle = null;
      if (!player.lastBossWave || player.lastBossWave < bossWave) player.lastBossWave = bossWave;
      if (!player.totalKills) player.totalKills = bossWave * KILLS_PER_WAVE;
      updateKillHUD();
      const bonusGold = Math.round(500 * bossWave); player.gold += bonusGold; updateHUD();
      notify(`🏆 Boss Vague ${bossWave} vaincu ! +${bonusGold}₽`);
      setMessage(`🏆 Boss vaincu ! +${bonusGold}₽`);
      updateGlobalStats('boss_kills'); gainSkillPoints(3 + bossWave); checkAchievements();
      setTimeout(()=>{ stopAutoBattle(); disableBattleButtons(false); syncActiveFromPlayer(); showScreen('game'); updateHUD(); updateKillHUD(); }, 1800);
      return;
    }
    if (player._gymBattle && handleGymVictory()) return;
    if (player._tourBattle && tourState) {
      player._tourBattle = false; player.tourFloor = tourState.floor;
      const isRewardFloor = player.tourFloor % 10 === 0;
      setTimeout(()=>{
        stopAutoBattle(); disableBattleButtons(false); syncActiveFromPlayer(); showScreen('game'); updateHUD();
        if (isRewardFloor) showTourReward(player.tourFloor);
        else { setMessage(`🏆 Étage ${player.tourFloor} complété !`); notify(`🏆 Étage ${player.tourFloor} ✓`); showTourMode(); }
      }, 1800); return;
    }
    setTimeout(()=>{ stopAutoBattle(); disableBattleButtons(false); syncActiveFromPlayer(); showScreen('game'); updateHUD(); setMessage(`${player.currentName} a mis K.O. le ${enemy.name} !`); }, 1800);
    return;
  }

  document.getElementById('battle-log').textContent = log;
  updateBattleHp(); updateHUD();
  document.getElementById('btn-attack').innerHTML = `⚔ ${player.move} <span class="atk-elem-badge elem-${player.moveElem||player.type}">${player.moveElem||player.type}</span>`;
  document.getElementById('btn-magic').innerHTML  = `✨ ${player.mMove} <span class="atk-elem-badge elem-${player.mMoveElem||player.type}">${player.mMoveElem||player.type}</span>`;
  battleBusy = true; disableBattleButtons(true);
  setBattleTurn('enemy');
};

// ──────────────────────────────────────────────────────────────
// 9. PATCH setBattleTurn — Tour ennemi avec statuts + capacités
// ──────────────────────────────────────────────────────────────
const _origSetBattleTurn = window.setBattleTurn || setBattleTurn;

window.setBattleTurn = function(turn) {
  battleTurn = turn;
  const turnInfo = document.getElementById('battle-turn-info');
  if (turn === 'player') {
    disableBattleButtons(false);
    applyRestesHeal();
    // Restes ennemi (si tenu item future)
    if (turnInfo) turnInfo.textContent = '🟢 Votre tour !';
    updateStatusDisplay();
  } else {
    disableBattleButtons(true);
    if (turnInfo) turnInfo.textContent = '🔴 Tour ennemi…';

    setTimeout(() => {
      if (!enemy || !player) return;

      let log = '';

      // ── STATUT ENNEMI (paralysie / sommeil / gel) ──
      if (enemy.statusEffect) {
        const st = enemy.statusEffect;
        if (st.type === 'sommeil') {
          st.turns--;
          if (st.turns <= 0) { clearStatus(enemy); log += `💤 ${enemy.name} se réveille ! `; }
          else {
            log = `💤 ${enemy.name} est endormi et ne peut pas attaquer !`;
            log += applyStatusDoT(player, true);
            document.getElementById('battle-log').textContent = log;
            updateBattleHp(); updateHUD(); updateStatusDisplay();
            battleBusy = false; setBattleTurn('player'); return;
          }
        } else if (st.type === 'paralysie') {
          if (Math.random() < 0.25) {
            log = `⚡ ${enemy.name} est paralysé et ne peut pas bouger !`;
            log += applyStatusDoT(player, true);
            document.getElementById('battle-log').textContent = log;
            updateBattleHp(); updateHUD(); updateStatusDisplay();
            battleBusy = false; setBattleTurn('player'); return;
          }
        } else if (st.type === 'gel') {
          if (Math.random() < 0.8) {
            log = `🧊 ${enemy.name} est gelé et ne peut pas attaquer !`;
            log += applyStatusDoT(player, true);
            document.getElementById('battle-log').textContent = log;
            updateBattleHp(); updateHUD(); updateStatusDisplay();
            battleBusy = false; setBattleTurn('player'); return;
          } else {
            clearStatus(enemy); log += `🧊 ${enemy.name} n'est plus gelé ! `;
          }
        }
      }

      // ── ATTAQUE ENNEMIE ──
      const defType = player.dualType || player.type;
      const eMult   = getEffectiveness(enemy.type, defType);
      const eBase   = Math.max(1, (enemy.atk||5) + Math.floor(Math.random()*5) - Math.floor((player.def||5)/2));

      // Capacité de l'ennemi
      let eAbilityMult = 1;
      if (enemy.ability) {
        const ab = ABILITIES_DB[enemy.ability];
        if (ab?.type === 'boost' && ab.atkType === enemy.type && ab.condition && ab.condition(enemy)) {
          eAbilityMult = ab.mult || 1;
        }
        if (ab?.type === 'wonderguard' && eMult < 2) {
          log += `🛡 ${enemy.name} n'est pas affecté (Myster-Guard) !`;
          document.getElementById('battle-log').textContent = log;
          battleBusy = false; setBattleTurn('player'); return;
        }
      }

      const eWeather = getWeatherMult(enemy.type);
      const eBrûlure = enemy.statusEffect?.type === 'brûlure' ? 0.5 : 1;
      const eCrit    = Math.random() < 1/16;
      const eDmg     = Math.max(1, Math.round(eBase * eMult * eWeather * eAbilityMult * eBrûlure * (eCrit ? 1.5 : 1)));
      const eEff     = getEffLabel(eMult);

      // Wonder Guard : ne touche que si super efficace
      if (player.ability === 'Myster-Guard' && eMult < 2) {
        log += `🛡 ${player.currentName} n'est pas touché (Myster-Guard) !`;
        document.getElementById('battle-log').textContent = log;
        battleBusy = false; setBattleTurn('player'); return;
      }

      // Capacité ennemie onHit (Électricité, Flamme)
      if (enemy.ability) {
        const ab = ABILITIES_DB[enemy.ability];
        if (ab?.type === 'onhit' && Math.random() < 0.30) {
          const applied = applyStatus(player, ab.status, ab.status === 'sommeil' ? 2 : 0);
          if (applied) log += ` ${STATUS_ICONS[ab.status]} (Capacité: ${enemy.ability}) !`;
        }
      }

      player.hp -= eDmg;
      playAttackAnim('normal', true);
      hurtSprite('player-battle-img');

      log += `${enemy.name} attaque`;
      if (eCrit) log += ' 💥 Coup Critique !';
      if (eEff.label) log += ` — ${eEff.label}`;
      log += ` pour ${eDmg} dégâts !`;

      // DoT statut joueur + météo
      log += applyStatusDoT(player, true);
      log += applyWeatherDoT(player, true);

      updateStatusDisplay();

      if (player.hp <= 0) {
        player.hp = 0; updateBattleHp(); updateHUD(); syncActiveFromPlayer();
        document.getElementById('battle-log').textContent = `💀 ${player.currentName} est K.O. !`;
        const aliveIdx = player.roster
          ? player.roster.findIndex((p,i)=>i!==(player.activeRosterIdx||0) && p.hp > 0)
          : -1;
        if (aliveIdx >= 0) {
          setTimeout(()=>{
            const isTour = !!player._tourBattle;
            document.getElementById('battle-log').textContent = isTour
              ? `💀 K.O. dans la Tour ! Choisissez un remplaçant !`
              : `💀 ${player.currentName} K.O. ! Choisissez un autre Pokémon !`;
            if (autoBattleOn) {
              const switched = switchToRosterPoke(aliveIdx, true);
              if (switched) {
                battleBusy = false; // libère le verrou bloqué par la mort en contre-attaque
                document.getElementById('battle-log').textContent = `💀 K.O. ! 🤖 Auto-switch → ${player.currentName} !`;
                setBattleTurn('player');
                if (autoBattleTimer) clearTimeout(autoBattleTimer);
                autoBattleTimer = setTimeout(runAutoAction, 800);
              } else {
                battleBusy = false;
                showScreen('game'); updateHUD();
                setMessage(`${player.currentName} s'est évanoui… Tous vos Pokémon sont K.O.`);
              }
            } else {
              battleBusy = false; // libère aussi pour le menu de sélection manuel
              openSwitchMenu(true);
            }
          }, 1500);
        } else {
          setTimeout(()=>{
            stopAutoBattle(); disableBattleButtons(false);
            player.hp = Math.floor(player.maxHp * .3);
            if (player.roster) player.roster[player.activeRosterIdx||0].hp = player.hp;
            if (player._bossBattle) {
              player._bossBattle = null;
              const { wave } = getWaveState(); player.totalKills = Math.max(0,(wave-1)*KILLS_PER_WAVE+(KILLS_PER_WAVE-1));
              showScreen('game'); updateHUD(); updateKillHUD();
              notify('💀 Défaite contre le Boss !'); setMessage('💀 Défaite ! Retour à 9/10 !');
            } else if (player._worldBossBattle) {
              player._worldBossBattle = false; showScreen('game'); updateHUD();
              notify('💀 Défaite contre le World Boss !');
            } else if (player._tourBattle) {
              player._tourBattle = false; tourState = null; player.tourFloor = 0;
              showScreen('game'); updateHUD(); notify('💀 Défaite dans la Tour !');
            } else if (player._gymBattle) {
              player._gymBattle = null;
              showScreen('game'); updateHUD(); notify('💀 Défaite au Gym !');
              setMessage('💀 Votre Pokémon s\'est évanoui… Retentez le défi du Gym !');
            } else {
              showScreen('game'); updateHUD();
              setMessage(`${player.currentName} s'est évanoui…`);
            }
            if (farmAutoOn) { if(farmAutoTimer) clearTimeout(farmAutoTimer); farmAutoTimer=setTimeout(scheduleFarmExplore,1200); }
          }, 2000);
        }
        return;
      }
      document.getElementById('battle-log').textContent = log;
      updateBattleHp(); updateHUD();
      battleBusy = false;
      setBattleTurn('player');
    }, 1000);
  }
};

// ──────────────────────────────────────────────────────────────
// 10. PATCH startBattle — Capacités + Météo initiale + Statuts reset
// ──────────────────────────────────────────────────────────────
const _origStartBattle = window.startBattle || startBattle;

window.startBattle = function(enemyData) {
  // Reset statuts et météo
  if (player) clearStatus(player);
  clearStatus(enemyData);
  battleWeather = { type: null, turns: 0 };

  // Assigner capacité à l'ennemi
  const ePoke = ALL_POKEMON.find(p => p.id === enemyData.id) || GEN1.find(p => p.id === enemyData.id);
  if (ePoke && !enemyData.ability) {
    enemyData.ability = getAbilityForPokemon(ePoke);
  }

  // Appeler la fonction originale
  _origStartBattle(enemyData);

  // Injecter l'UI de statut APRÈS le rendu
  setTimeout(() => {
    injectStatusUI();
    updateStatusDisplay();
    updateWeatherDisplay();

    // Capacité Intimidation : -15% ATK ennemi
    if (player?.ability) {
      const pAb = ABILITIES_DB[player.ability];
      if (pAb?.type === 'intimidate' && enemy) {
        enemy.atk = Math.max(1, Math.round((enemy.atk||5) * 0.85));
        const log = document.getElementById('battle-log');
        if (log) log.textContent += ` 😤 Intimidation : Atk de ${enemy.name} réduite !`;
      }
      if (pAb?.type === 'weather' && pAb.weather) {
        const wMsg = setWeather(pAb.weather, 5);
        const log = document.getElementById('battle-log');
        if (log) log.textContent += ' ' + wMsg;
      }
    }
    // Capacité ennemie météo
    if (enemy?.ability) {
      const eAb = ABILITIES_DB[enemy.ability];
      if (eAb?.type === 'weather' && eAb.weather && !battleWeather.type) {
        const wMsg = setWeather(eAb.weather, 5);
        const log = document.getElementById('battle-log');
        if (log) log.textContent += ' ' + wMsg;
      }
      if (eAb?.type === 'intimidate') {
        player.atk = Math.max(1, Math.round((player.atk||5) * 0.85));
        const log = document.getElementById('battle-log');
        if (log) log.textContent += ` 😤 Intimidation : Votre Atk est réduite !`;
      }
    }
  }, 200);
};

// ──────────────────────────────────────────────────────────────
// 11. NATURES sur les Pokémon du roster
// ──────────────────────────────────────────────────────────────
// Quand on sync le joueur depuis le roster, on affiche la nature
const _origSyncPlayerFromActive = window.syncPlayerFromActive || syncPlayerFromActive;
window.syncPlayerFromActive = function() {
  _origSyncPlayerFromActive();
  // S'assurer que le pokémon actif a une nature
  const active = player?.roster?.[player.activeRosterIdx||0];
  if (active && !active.nature) {
    active.nature = getRandomNature();
  }
  if (active) player.nature = active.nature;
};

// ──────────────────────────────────────────────────────────────
// 12. CYCLE JOUR / NUIT
// ──────────────────────────────────────────────────────────────
function isNightTime() {
  const h = new Date().getHours();
  return h >= 20 || h < 6;
}
function isDawnDusk() {
  const h = new Date().getHours();
  return (h >= 6 && h < 8) || (h >= 18 && h < 20);
}

// Pokémon qui n'apparaissent que la nuit
const NIGHT_ONLY = new Set([197,198,200,228,229,261,262,37,38,163,164,52,53,316,317]);
// Pokémon qui n'apparaissent que le jour
const DAY_ONLY   = new Set([193,177,178,270,271,272,274,275,276,277,120,121]);
// Pokémon favorisés la nuit (chance double)
const NIGHT_BOOST= new Set([92,93,94,41,42,169,302,303,353,354]);

// Override doExplore pour le cycle jour/nuit
const _prevDoExplore = window.doExplore;
window.doExplore = function() {
  // On modifie temporairement les pools de zones selon l'heure
  const night = isNightTime();
  const _origZones = {};
  // Filtrer les Pokémon selon l'heure dans chaque zone
  if (typeof ZONES !== 'undefined') {
    Object.keys(ZONES).forEach(zid => {
      const z = ZONES[zid];
      if (z.pokemon) {
        _origZones[zid] = z.pokemon;
        if (night) {
          // La nuit : exclure DAY_ONLY, doubler les NIGHT_BOOST, inclure NIGHT_ONLY
          let pool = z.pokemon.filter(id => !DAY_ONLY.has(id));
          NIGHT_BOOST.forEach(id => { if (z.pokemon.includes(id)) pool.push(id); });
          z.pokemon = pool.length > 0 ? pool : z.pokemon;
        } else {
          // Le jour : exclure NIGHT_ONLY
          const pool = z.pokemon.filter(id => !NIGHT_ONLY.has(id));
          z.pokemon = pool.length > 0 ? pool : z.pokemon;
        }
      }
    });
  }
  _prevDoExplore();
  // Restaurer les pools originaux
  Object.keys(_origZones).forEach(zid => {
    if (ZONES[zid]) ZONES[zid].pokemon = _origZones[zid];
  });
};

// Afficher l'heure dans le HUD
function updateTimeHUD() {
  let el = document.getElementById('time-indicator');
  if (!el) {
    el = document.createElement('div');
    el.id = 'time-indicator';
    el.style.cssText = 'font-family:"Press Start 2P",monospace;font-size:.38rem;opacity:.7;margin-left:.5rem;display:inline-block';
    const hud = document.getElementById('player-name-hud');
    if (hud) hud.after(el);
  }
  const h = new Date().getHours();
  if (isNightTime())    el.textContent = '🌙 Nuit';
  else if (isDawnDusk()) el.textContent = '🌅 Crépuscule';
  else                  el.textContent = '☀️ Jour';
}

if (window._timeHUDInterval) clearInterval(window._timeHUDInterval);
window._timeHUDInterval = setInterval(updateTimeHUD, 60000);
setTimeout(updateTimeHUD, 1000);

// ──────────────────────────────────────────────────────────────
// 13. RIVAL & ÉQUIPE ROCKET/MAGMA/AQUA
// ──────────────────────────────────────────────────────────────
const RIVAL_TEAMS = [
  // Rival Kanto (précoce)
  {
    name: 'Rival Gary', sprite: 60, quote: "Tu n'es qu'un débutant !",
    minBoss: 0, maxBoss: 8,
    team: [
      {id:56,n:'Capumain',lv:12,hp:90,atk:12,def:8,spd:75,type:'Normal',xp:0,gold:0},
      {id:19,n:'Rattatac',lv:11,hp:85,atk:9,def:7,spd:85,type:'Normal',xp:0,gold:0},
    ],
    reward: 500, xp: 80
  },
  // Rival Kanto (milieu)
  {
    name: 'Rival Gary', sprite: 60, quote: "Humph ! Je me perfectionne !",
    minBoss: 9, maxBoss: 16,
    team: [
      {id:18,n:'Roucarnage',lv:25,hp:120,atk:16,def:11,spd:100,type:'Normal',xp:0,gold:0},
      {id:65,n:'Alakazam',  lv:28,hp:140,atk:20,def:13,spd:120,type:'Psy',   xp:0,gold:0},
      {id:149,n:'Dracolosse',lv:30,hp:190,atk:25,def:13,spd:80, type:'Dragon',xp:0,gold:0},
    ],
    reward: 2000, xp: 400
  },
  // Rival Johto (Silver)
  {
    name: 'Rival Silver', sprite: 215, quote: "Les faibles n'ont pas leur place ici.",
    minBoss: 17, maxBoss: 25,
    team: [
      {id:215,n:'Farfurex',  lv:35,hp:130,atk:22,def:13,spd:115,type:'Ténèbres',xp:0,gold:0},
      {id:197,n:'Noctali',   lv:36,hp:160,atk:16,def:28,spd:65, type:'Ténèbres',xp:0,gold:0},
      {id:248,n:'Tyranocif', lv:40,hp:220,atk:32,def:26,spd:61, type:'Roche',  xp:0,gold:0},
    ],
    reward: 4000, xp: 800
  },
  // Rival Hoenn (Brendan)
  {
    name: 'Rival Brendan', sprite: 254, quote: "Je m'entraîne sans relâche depuis Littleroot !",
    minBoss: 26, maxBoss: 39,
    team: [
      {id:254,n:'Jungko',   lv:45,hp:180,atk:20,def:16,spd:120,type:'Plante',xp:0,gold:0},
      {id:373,n:'Drattack', lv:48,hp:240,atk:28,def:23,spd:100,type:'Dragon',xp:0,gold:0},
      {id:282,n:'Gardevoir',lv:46,hp:195,atk:16,def:16,spd:80, type:'Psy',   xp:0,gold:0},
    ],
    reward: 7000, xp: 1200
  },
];

const ROCKET_GRUNTS = [
  {
    name: 'Grunt Rocket', sprite: 20, quote: "Prépare-toi au Projet Mewtwo !",
    trigger: ['bourg-palette','route-3','foret-jade','mt-lune','argenta'],
    team: [
      {id:52,n:'Meowth',  lv:15,hp:100,atk:10,def:8,spd:90,type:'Normal',xp:0,gold:0},
      {id:41,n:'Nosferapti',lv:14,hp:90,atk:10,def:7,spd:65,type:'Poison',xp:0,gold:0},
    ],
    reward: 600, xp: 90
  },
  {
    name: 'Admin Rocket', sprite: 20, quote: "La Team Rocket prend le contrôle de tout !",
    trigger: ['safrania','tour-pokemon','lavanville'],
    team: [
      {id:110,n:'Smogogo',  lv:28,hp:140,atk:14,def:14,spd:35, type:'Poison',xp:0,gold:0},
      {id:89, n:'Grotadmorv',lv:30,hp:160,atk:18,def:16,spd:50, type:'Poison',xp:0,gold:0},
      {id:53, n:'Persian',  lv:29,hp:135,atk:16,def:10,spd:115,type:'Normal',xp:0,gold:0},
    ],
    reward: 1500, xp: 300
  },
];

const MAGMA_GRUNTS = [
  {
    name: 'Grunt Magma', sprite: 323, quote: "La Team Magma réveillera Groudon !",
    trigger: ['lavaplage','sylvemont','sootopolis'],
    team: [
      {id:322,n:'Chamallot',lv:30,hp:140,atk:14,def:11,spd:35,type:'Feu',xp:0,gold:0},
      {id:229,n:'Démolosse',lv:32,hp:155,atk:22,def:11,spd:95,type:'Feu',xp:0,gold:0},
    ],
    reward: 1800, xp: 350
  },
];

const AQUA_GRUNTS = [
  {
    name: 'Grunt Aqua', sprite: 319, quote: "La Team Aqua libérera Kyogre !",
    trigger: ['mardeborg','laberganta','sootopolis'],
    team: [
      {id:318,n:'Carvanha', lv:30,hp:130,atk:24,def:5,spd:65,type:'Eau',xp:0,gold:0},
      {id:319,n:'Sharpedo', lv:32,hp:150,atk:28,def:9,spd:95,type:'Eau',xp:0,gold:0},
    ],
    reward: 1800, xp: 350
  },
];

// Vérifier si un événement de rival/rocket doit apparaître
let _lastEventBoss = -1;

function checkStoryEvents() {
  if (!player) return;
  const bossBeaten = player.lastBossWave || 0;
  if (bossBeaten === _lastEventBoss) return; // Déjà vérifié ce boss
  _lastEventBoss = bossBeaten;

  // Rival toutes les ~8 zones boss
  if (bossBeaten > 0 && bossBeaten % 8 === 0) {
    const rival = RIVAL_TEAMS.find(r => bossBeaten >= r.minBoss && bossBeaten <= r.maxBoss);
    if (rival) triggerStoryBattle(rival, 'rival');
    return;
  }

  // Rocket dans les zones Kanto
  const zone = ZONE_ORDER[Math.min(bossBeaten, ZONE_ORDER.length-1)];
  const rocket = ROCKET_GRUNTS.find(g => g.trigger.includes(zone));
  const magma   = MAGMA_GRUNTS.find(g => g.trigger.includes(zone));
  const aqua    = AQUA_GRUNTS.find(g => g.trigger.includes(zone));

  if (rocket && Math.random() < 0.15) { triggerStoryBattle(rocket, 'rocket'); return; }
  if (magma  && Math.random() < 0.12) { triggerStoryBattle(magma,  'magma');  return; }
  if (aqua   && Math.random() < 0.12) { triggerStoryBattle(aqua,   'aqua');   return; }
}

function triggerStoryBattle(encounter, type) {
  const icons = { rival:'⚔️ RIVAL', rocket:'🚀 TEAM ROCKET', magma:'🔥 TEAM MAGMA', aqua:'💧 TEAM AQUA' };
  const colors = { rival:'#ffd700', rocket:'#ff2244', magma:'#ff6600', aqua:'#0066ff' };

  setMessage(`${icons[type] || '⚔'} — ${encounter.name} : "${encounter.quote}"`);
  notify(`${icons[type]} — ${encounter.name} !`);

  // Afficher un popup de défi
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center';
  overlay.innerHTML = `
    <div style="background:rgba(10,10,30,.97);border:3px solid ${colors[type]};border-radius:18px;padding:1.6rem;width:min(400px,93vw);text-align:center;box-shadow:0 0 30px ${colors[type]}55">
      <div style="font-family:'Press Start 2P',monospace;font-size:.7rem;color:${colors[type]};margin-bottom:.8rem">${icons[type]}</div>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${encounter.sprite}.png"
           style="width:80px;height:80px;image-rendering:pixelated;filter:drop-shadow(0 0 8px ${colors[type]})"/>
      <div style="font-family:'Press Start 2P',monospace;font-size:.6rem;color:#fff;margin:.6rem 0">${encounter.name}</div>
      <div style="font-family:'Press Start 2P',monospace;font-size:.38rem;color:rgba(255,255,255,.7);margin-bottom:1rem;line-height:1.8">"${encounter.quote}"</div>
      <div style="display:flex;gap:.6rem;justify-content:center">
        <button class="btn" onclick="startStoryEncounter(${JSON.stringify(encounter).replace(/"/g,'&quot;')}, '${type}');this.closest('[style*=fixed]').remove()" style="font-size:.45rem">⚔ COMBATTRE</button>
        <button class="btn red" onclick="this.closest('[style*=fixed]').remove()" style="font-size:.45rem">↩ FUIR</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
}

window.startStoryEncounter = function(encounter, type) {
  if (!encounter.team || encounter.team.length === 0) return;
  const first = encounter.team[0];
  const enemyData = {
    ...first,
    maxHp: first.hp,
    xp: Math.round(first.lv * 5),
    gold: Math.round(encounter.reward / encounter.team.length),
    isShiny: false,
    _storyEncounter: encounter,
    _storyType: type,
  };
  startBattle(enemyData);
};

// Hook post-victoire pour les rencontres story (récompense)
const _prevBattleActionOrigVictory = null;
// → déjà géré dans le patch battleAction (après enemy.hp <= 0) via triggerRandomEvent
// Pour les rencontres story, on récupère la récompense dans triggerRandomEvent ou on hook checkLevelUp

// ──────────────────────────────────────────────────────────────
// 14. ÉVOLUTIONS PAR PIERRE
// ──────────────────────────────────────────────────────────────
const STONE_EVOS = {
  // { pokemonId: { stone: 'nom-pierre', evolvesTo: id, name: 'Nom' } }
  133:  { stone: 'Pierre Foudre', evolvesTo: 135, name: 'Voltali' },  // Évoli → Voltali
  // Note: Évoli a plusieurs évolutions selon la pierre
  // Pour simplifier: chaque pierre donne une évolution différente
  // Évoli → Pyroli (déjà par niveau), les autres par pierres
  44:  { stone: 'Pierre Plante',  evolvesTo: 45,  name: 'Rafflésia' },
  70:  { stone: 'Pierre Plante',  evolvesTo: 71,  name: 'Empiflor' },
  102: { stone: 'Pierre Plante',  evolvesTo: 103, name: 'Nœtendre' },
  30:  { stone: 'Pierre Lune',    evolvesTo: 31,  name: 'Nidoqueen' },
  33:  { stone: 'Pierre Lune',    evolvesTo: 34,  name: 'Nidoking' },
  35:  { stone: 'Pierre Lune',    evolvesTo: 36,  name: 'Mélofée' },
  39:  { stone: 'Pierre Lune',    evolvesTo: 40,  name: 'Grodoudou' },
  61:  { stone: 'Pierre Eau',     evolvesTo: 62,  name: 'Mackogneur' },
  90:  { stone: 'Pierre Eau',     evolvesTo: 91,  name: 'Crustabri' },
  120: { stone: 'Pierre Eau',     evolvesTo: 121, name: 'Staross' },
  25:  { stone: 'Pierre Foudre',  evolvesTo: 26,  name: 'Raichu' },
  58:  { stone: 'Pierre Feu',     evolvesTo: 59,  name: 'Arcanin' },
  37:  { stone: 'Pierre Feu',     evolvesTo: 38,  name: 'Feunard' },
  // Gen 2
  173: { stone: 'Pierre Amour',   evolvesTo: 35,  name: 'Mélo→Mélofée' },
  175: { stone: 'Pierre Amour',   evolvesTo: 176, name: 'Togetic' },
  183: { stone: 'Pierre Eau',     evolvesTo: 184, name: 'Azumarill' },
  191: { stone: 'Pierre Soleil',  evolvesTo: 192, name: 'Héliatronc' },
  315: { stone: 'Pierre Feuille', evolvesTo: 407, name: 'Rosaïa' },
  // Gen 3
  333: { stone: 'Pierre Dragon',  evolvesTo: 334, name: 'Altaria' },
};

// Ajouter les pierres au shop
const STONE_SHOP_ITEMS = [
  { id:'pierre-foudre',  name:'Pierre Foudre',  desc:'Fait évoluer certains Pokémon (Pikachu→Raichu, Évoli→Voltali)', price:2000, stoneId:'Pierre Foudre',  img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/thunder-stone.png', type:'stone' },
  { id:'pierre-feu',     name:'Pierre Feu',     desc:'Fait évoluer certains Pokémon (Evoli→Pyroli, Caninos→Arcanin)', price:2000, stoneId:'Pierre Feu',     img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fire-stone.png',    type:'stone' },
  { id:'pierre-eau',     name:'Pierre Eau',     desc:'Fait évoluer certains Pokémon (Tétarte→Mackogneur, Amonistar)', price:2000, stoneId:'Pierre Eau',     img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/water-stone.png',   type:'stone' },
  { id:'pierre-plante',  name:'Pierre Plante',  desc:'Fait évoluer certains Pokémon (Gloom→Rafflésia)', price:2000, stoneId:'Pierre Plante',  img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/leaf-stone.png',   type:'stone' },
  { id:'pierre-lune',    name:'Pierre Lune',    desc:'Fait évoluer Nidoran/Rondoudou/Mélofée…', price:1500, stoneId:'Pierre Lune',    img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/moon-stone.png',   type:'stone' },
  { id:'pierre-soleil',  name:'Pierre Soleil',  desc:'Fait évoluer Tournegrin→Héliatronc', price:2500, stoneId:'Pierre Soleil',  img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sun-stone.png',    type:'stone' },
  { id:'pierre-amour',   name:'Pierre Amour',   desc:'Fait évoluer Mélo/Togepi', price:3000, stoneId:'Pierre Amour',   img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/shiny-stone.png',  type:'stone' },
];

SHOP_ITEMS.push(...STONE_SHOP_ITEMS);

// Fonction d'utilisation d'une pierre
window.useStoneOnPokemon = function(source, idx, stoneId) {
  const pool = source === 'roster' ? player.roster : player.box;
  const p = pool[idx];
  if (!p) return;
  const spriteId = p.spriteId || p.currentSpriteId;
  const evo = STONE_EVOS[spriteId];
  if (!evo || evo.stone !== stoneId) {
    notify(`Cette pierre ne fonctionne pas sur ${p.currentName||p.name} !`); return;
  }
  // Vérifier stock
  if (!player.bag) player.bag = {};
  const bagKey = stoneId.toLowerCase().replace(/ /g, '-');
  if ((player.bag[bagKey]||0) <= 0) {
    notify(`Pas de ${stoneId} dans le sac !`); return;
  }
  player.bag[bagKey]--;
  // Évoluer
  const oldName = p.currentName || p.name;
  const newData = ALL_POKEMON.find(pk => pk.id === evo.evolvesTo);
  if (!newData) { notify('Données manquantes pour cette évolution !'); return; }
  p.currentSpriteId = evo.evolvesTo; p.spriteId = evo.evolvesTo;
  p.currentName = evo.name || newData.n;
  p.type = newData.t;
  p.maxHp += 20; p.hp = p.maxHp;
  p.atk += 3; p.def += 3; p.magic += 3; p.spd += 2;
  notify(`✨ ${oldName} évolue en ${p.currentName} ! (${evo.stone})`);
  if (typeof renderTeam === 'function') renderTeam();
  if (typeof syncPlayerFromActive === 'function') syncPlayerFromActive();
};

// ──────────────────────────────────────────────────────────────
// 15. FIX TOUR — utilise ALL_POKEMON
// ──────────────────────────────────────────────────────────────
window.TOUR_FLOOR_ENEMIES = function(floor) {
  const scale  = 1 + floor * 0.18;
  const minAtk = 3;
  const pool   = ALL_POKEMON.filter(p => p.atk * scale >= minAtk);
  const pData  = pool[Math.floor(Math.random() * pool.length)];
  const spd    = ALL_SPD[pData.id] || 50;
  return {
    name: pData.n, id: pData.id,
    level: Math.max(1, Math.min(100, floor * 3 + Math.floor(Math.random() * 5))),
    hp:    Math.round(pData.hp  * scale), maxHp: Math.round(pData.hp * scale),
    atk:   Math.round(pData.atk * scale), def: Math.round((pData.def||5) * scale) || 1,
    spd:   Math.round(spd * scale), xp: 0, gold: 0,
    type:  pData.t, isShiny: false,
  };
};

// ──────────────────────────────────────────────────────────────
// 16. INDICATEUR CAPACITÉ dans les fiches Pokémon
// ──────────────────────────────────────────────────────────────
// Assigner capacité aux Pokémon du roster lors de leur création
const _origStartGame = window.startGame || startGame;
window.startGame = function() {
  _origStartGame();
  setTimeout(() => {
    if (player?.roster) {
      player.roster.forEach(p => {
        if (!p.ability) {
          const pData = ALL_POKEMON.find(pk => pk.id === (p.spriteId||p.currentSpriteId));
          if (pData) p.ability = getAbilityForPokemon(pData);
        }
        if (!p.nature) p.nature = getRandomNature();
      });
    }
  }, 500);
};

// ──────────────────────────────────────────────────────────────
// 17. HOOK SUR checkStoryEvents APRÈS CHAQUE BOSS
// ──────────────────────────────────────────────────────────────
// Le hook se fait en observant les changements de lastBossWave
const _origCheckAchievements = window.checkAchievements || checkAchievements;
window.checkAchievements = function() {
  _origCheckAchievements();
  checkStoryEvents();
};

// ──────────────────────────────────────────────────────────────
// 18. STYLE CSS INJECTÉ — Indicateurs de statut en combat
// ──────────────────────────────────────────────────────────────
(function injectMechanicsCSS() {
  const style = document.createElement('style');
  style.textContent = `
    #b-player-status, #b-enemy-status {
      font-family: 'Press Start 2P', monospace;
      font-size: .3rem;
      padding: .12rem .4rem;
      border-radius: 4px;
      background: rgba(255,255,255,.08);
      display: inline-block;
      margin-top: .2rem;
    }
    #battle-weather {
      font-family: 'Press Start 2P', monospace;
      font-size: .34rem;
      padding: .3rem .6rem;
      background: rgba(0,0,0,.5);
      border: 1px solid rgba(255,255,255,.15);
      border-radius: 8px;
    }
    #time-indicator {
      font-family: 'Press Start 2P', monospace;
      font-size: .35rem;
    }
    .story-encounter-flash {
      animation: storyFlash .5s 3;
    }
    @keyframes storyFlash {
      0%,100% { opacity:1; }
      50%      { opacity:.3; }
    }
  `;
  document.head.appendChild(style);
})();

console.log('✅ PokéWave Mechanics loaded: STAB, Critiques, Statuts, Météo, Capacités, Natures, Jour/Nuit, Rival/Rocket');
