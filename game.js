// ============================================================
// game.js — logique principale de PokéQuest
// Données statiques : js/constants.js
// État global + router : js/state.js
// ============================================================

// Ajoute une CT à l'inventaire CT du joueur
function addCTToInventory(ctId) {
  if (!player.ctBag) player.ctBag = {};
  player.ctBag[ctId] = (player.ctBag[ctId] || 0) + 1;
}

// ══════════════════════════════════════════
// MENU DÉTAIL POKÉMON
// ══════════════════════════════════════════


function openPokeDetail(rosterIdx) {
  if (!player || !player.roster) return;
  detailPokeIdx = rosterIdx;
  detailSlot = null;
  renderPokeDetail();
  document.getElementById('poke-detail-menu').style.display = 'flex';
}

function closePokeDetail() {
  document.getElementById('poke-detail-menu').style.display = 'none';
  detailPokeIdx = null;
  detailSlot = null;
}

function renderPokeDetail() {
  const p = player.roster[detailPokeIdx];
  if (!p) return;
  const el = document.getElementById('poke-detail-content');
  const spriteId = p.currentSpriteId || p.spriteId;
  const imgSrc = p.isShiny ? SPRITE_SHINY(spriteId) : SPRITE_FRONT(spriteId);
  const hpPct = Math.max(0, Math.round((p.hp / p.maxHp) * 100));
  const xpPct = p.xpNext ? Math.round(((p.xp||0) / p.xpNext) * 100) : 0;

  // Attaques actuelles
  const m1 = MOVES_DB[p.move] || { type: p.moveElem||p.type, cat:'phy', pow:'—', acc:'—', pp:'—', desc: p.move };
  const m2 = MOVES_DB[p.mMove] || { type: p.mMoveElem||p.type, cat:'spe', pow:'—', acc:'—', pp:'—', desc: p.mMove };

  // Attaques apprises par niveau (disponibles mais pas encore équipées)
  const learnable = getLearnableMoves(p).filter(lm => lm.move !== p.move && lm.move !== p.mMove);
  // CTs utilisables
  const ctMoves = player.ctBag ? Object.entries(player.ctBag)
    .filter(([id, qty]) => qty > 0)
    .map(([id]) => CT_LIST.find(c => c.id === id))
    .filter(Boolean)
    .filter(ct => ct.move !== p.move && ct.move !== p.mMove) : [];

  const typeColor = tp => ({ Feu:'#ff6030',Eau:'#4488ff',Plante:'#44bb44',Électrik:'#ffcc00',Normal:'#9999aa',Psy:'#ff4499',Vol:'#88aaee',Dragon:'#7038f8',Poison:'#aa44bb',Combat:'#994422',Glace:'#88ccff',Sol:'#cc9944',Roche:'#9a8080',Spectre:'#5544aa',Insecte:'#88aa22',Acier:'#aaaacc',Ténèbres:'#443344',Fée:'#ff88cc' }[tp] || '#666');
  const catIcon = cat => cat === 'phy' ? '⚔️' : cat === 'spe' ? '✨' : '🔧';

  const moveCard = (move, moveData, slot, uses, usesMax) => `
    <div class="pd-move-card ${detailSlot===slot?'selected':''}" onclick="selectMoveSlot('${slot}')">
      <div style="display:flex;align-items:center;gap:.4rem;margin-bottom:.2rem">
        <span style="font-size:.9rem">${catIcon(moveData.cat)}</span>
        <span style="font-family:'Press Start 2P',monospace;font-size:.38rem;color:#fff">${move}</span>
        <span style="font-family:'Press Start 2P',monospace;font-size:.3rem;padding:.1rem .4rem;border-radius:4px;background:${typeColor(moveData.type)};color:#fff">${moveData.type}</span>
      </div>
      <div style="font-size:.65rem;color:rgba(255,255,255,.5)">Puissance: ${moveData.pow} · Précision: ${moveData.acc}% · PP: ${uses}/${usesMax||moveData.pp}</div>
      <div style="font-size:.6rem;color:rgba(255,255,255,.4);margin-top:.1rem">${moveData.desc}</div>
      ${detailSlot===slot ? '<div style="font-size:.5rem;color:var(--yellow);margin-top:.2rem">▼ Choisir un remplacement ci-dessous</div>' : ''}
    </div>`;

  const moveOption = (moveName, source, ctId) => {
    const md = MOVES_DB[moveName];
    if (!md) return '';
    return `<div class="pd-learn-card" onclick="equipMove('${moveName}', '${ctId||''}')">
      <div style="display:flex;align-items:center;gap:.4rem">
        <span>${catIcon(md.cat)}</span>
        <span style="font-family:'Press Start 2P',monospace;font-size:.35rem;color:var(--yellow)">${moveName}</span>
        <span style="font-family:'Press Start 2P',monospace;font-size:.28rem;padding:.1rem .35rem;border-radius:3px;background:${typeColor(md.type)};color:#fff">${md.type}</span>
        <span style="font-size:.55rem;color:rgba(255,255,255,.4)">${source}</span>
      </div>
      <div style="font-size:.6rem;color:rgba(255,255,255,.45)">Puis: ${md.pow} · Préc: ${md.acc}% · PP: ${md.pp} · ${md.desc}</div>
    </div>`;
  };

  const learnSection = (detailSlot && (learnable.length > 0 || ctMoves.length > 0)) ? `
    <div style="margin-top:.6rem;font-family:'Press Start 2P',monospace;font-size:.42rem;color:var(--blue)">📚 Attaques disponibles (→ remplace ${detailSlot==='move1'?p.move:p.mMove})</div>
    <div style="display:flex;flex-direction:column;gap:.35rem;margin-top:.3rem;max-height:180px;overflow-y:auto">
      ${learnable.map(lm => moveOption(lm.move, `Niv.${lm.lv}`, null)).join('')}
      ${ctMoves.map(ct => moveOption(ct.move, ct.name, ct.id)).join('')}
      ${learnable.length===0 && ctMoves.length===0 ? '<div style="font-size:.65rem;color:rgba(255,255,255,.4)">Aucune attaque disponible. Montez de niveau ou achetez des CTs !</div>' : ''}
    </div>` : (detailSlot ? `<div style="font-size:.65rem;color:rgba(255,255,255,.4);margin-top:.5rem">Aucune attaque disponible pour le moment.</div>` : '');

  el.innerHTML = `
    <div style="display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap">
      <div style="text-align:center">
        <img src="${imgSrc}" style="width:96px;height:96px;image-rendering:pixelated;${p.isShiny?'filter:drop-shadow(0 0 8px #ffd700)':''}"/>
        <div style="font-family:'Press Start 2P',monospace;font-size:.42rem;color:${p.isShiny?'#ffd700':'var(--yellow)'};margin-top:.3rem">${p.currentName||p.name}${p.isShiny?' ✨':''}</div>
        <div style="font-size:.65rem;color:rgba(255,255,255,.5)">Niv. ${p.level}</div>
      </div>
      <div style="flex:1;min-width:180px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.3rem;font-size:.7rem;margin-bottom:.5rem">
          ${[['❤️ PV',`${Math.ceil(p.hp)}/${p.maxHp}`],['⚔️ ATQ',p.atk],['🛡️ DEF',p.def],['✨ SpAtq',p.magic],['⚡ VIT',p.spd],['XP',`${p.xp||0}/${p.xpNext||100}`]].map(([k,v])=>`<div style="background:rgba(255,255,255,.05);border-radius:6px;padding:.2rem .4rem"><span style="color:rgba(255,255,255,.5)">${k}</span> <span style="color:var(--yellow);float:right">${v}</span></div>`).join('')}
        </div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.32rem;color:rgba(255,255,255,.5);margin-bottom:.1rem">PV</div>
        <div style="width:100%;height:10px;background:rgba(0,0,0,.4);border-radius:999px;overflow:hidden;margin-bottom:.4rem"><div style="height:100%;background:${hpPct>50?'linear-gradient(90deg,#2dc653,#06d6a0)':hpPct>20?'linear-gradient(90deg,#ffd60a,#ff9a3c)':'linear-gradient(90deg,#e63946,#ff6b9d)'};width:${hpPct}%;border-radius:999px"></div></div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.32rem;color:rgba(255,255,255,.5);margin-bottom:.1rem">XP</div>
        <div style="width:100%;height:8px;background:rgba(0,0,0,.4);border-radius:999px;overflow:hidden"><div style="height:100%;background:linear-gradient(90deg,#ffd60a,#ff9a3c);width:${xpPct}%;border-radius:999px"></div></div>
      </div>
    </div>
    <div style="margin-top:.8rem;font-family:'Press Start 2P',monospace;font-size:.42rem;color:rgba(255,255,255,.6)">🥊 ATTAQUES (cliquer pour changer)</div>
    <div style="display:flex;flex-direction:column;gap:.4rem;margin-top:.3rem">
      ${moveCard(p.move, m1, 'move1', p.moveUses||m1.pp, p.moveUsesMax||m1.pp)}
      ${moveCard(p.mMove, m2, 'move2', p.mMoveUses||m2.pp, p.mMoveUsesMax||m2.pp)}
    </div>
    ${learnSection}
  `;
}

function selectMoveSlot(slot) {
  detailSlot = (detailSlot === slot) ? null : slot;
  renderPokeDetail();
}

function equipMove(moveName, ctId) {
  if (!detailSlot || detailPokeIdx === null) return;
  const p = player.roster[detailPokeIdx];
  if (!p) return;
  const md = MOVES_DB[moveName];
  if (!md) return;
  // Consume CT if used
  if (ctId && player.ctBag && player.ctBag[ctId] > 0) {
    player.ctBag[ctId]--;
    notify(`${moveName} appris via CT !`);
  } else {
    notify(`${moveName} appris !`);
  }
  if (detailSlot === 'move1') {
    p.move = moveName;
    p.moveElem = md.type;
    p.moveUses = md.pp;
    p.moveUsesMax = md.pp;
    p.animType = typeToAnim(md.type);
  } else {
    p.mMove = moveName;
    p.mMoveElem = md.type;
    p.mMoveUses = md.pp;
    p.mMoveUsesMax = md.pp;
  }
  // If this is the active pokemon, sync back
  if (detailPokeIdx === (player.activeRosterIdx || 0)) {
    syncPlayerFromActive();
    updateHUD();
  }
  detailSlot = null;
  renderPokeDetail();
}

// ══════════════════════════════════════════
// HUD
// ══════════════════════════════════════════
// Cache des éléments fréquents — évite 80+ getElementById/frame
const _hudEls = {};
function _hud(id) { return _hudEls[id] || (_hudEls[id] = document.getElementById(id)); }

// updateHUD debouncé : plusieurs appels en rafale = 1 seul vrai rendu par frame
let _hudPending = false;
// updateKillHUD debouncé — appelée à chaque kill pendant l'auto-battle
let _killHudPending = false;
function updateHUD() {
  if (!player) return;
  if (_hudPending) return; // déjà prévu pour ce frame
  _hudPending = true;
  requestAnimationFrame(_doUpdateHUD);
}
function _doUpdateHUD() {
  _hudPending = false;
  if (!player) return;
  // En écran battle, seul updateBattleHp est utile — skip le HUD de jeu
  if (currentScreen === 'battle') return;
  _hud('player-name-hud').textContent = `${player.currentName} de ${player.name} ✦ Niv.${player.level}`;
  _hud('gold-val').textContent = player.gold;
  setBar('bar-hp','val-hp', player.hp, player.maxHp);
  setBar('bar-xp','val-xp', player.xp, player.xpNext);
  updateHUDTrainer();
  // Bouton REPOS : affiche % PV et streak
  const restBtn = _hud('btn-rest-dynamic');
  if (restBtn) {
    const hpPct = player.maxHp > 0 ? Math.round((player.hp / player.maxHp) * 100) : 100;
    const streak = player._winStreak || 0;
    restBtn.textContent = streak >= 5
      ? `🏥 REPOS (${hpPct}%) 🔥×${streak}`
      : `🏥 REPOS (${hpPct}%)`;
    restBtn.style.background = hpPct < 30
      ? 'linear-gradient(180deg,#e63946,#a01e27)'
      : hpPct < 60
        ? 'linear-gradient(180deg,#f4a261,#e76f51)'
        : 'linear-gradient(180deg,#2dc653,#1a8035)';
  }
  // Tour button in dropdown
  const tourBtn = _hud('btn-tour-drop');
  if (tourBtn) tourBtn.style.display = (player.trainerLevel||1) >= 10 ? 'block' : 'none';
  // Attack uses display — rebuild innerHTML seulement si le contenu a changé
  const atkDisp = _hud('atk-uses-display');
  if (atkDisp) {
    const t1 = player.moveElem || player.type;
    const t2 = player.mMoveElem || player.type;
    const newAtkHtml = `<span class="atk-use-label">${player.move||'Atk'}</span><span class="atk-elem-badge elem-${t1}" style="font-size:.28rem;padding:.1rem .3rem">${t1}</span><span style="width:.5rem;display:inline-block"></span><span class="atk-use-label">${player.mMove||'Magie'}</span><span class="atk-elem-badge elem-${t2}" style="font-size:.28rem;padding:.1rem .3rem">${t2}</span>`;
    if (atkDisp._cachedHtml !== newAtkHtml) { atkDisp.innerHTML = newAtkHtml; atkDisp._cachedHtml = newAtkHtml; }
  }
}
function setBar(barId, valId, cur, max) {
  const pct = Math.max(0, Math.min(100, (cur/max)*100));
  const el = _hud(barId);
  el.style.width = pct+'%';
  _hud(valId).textContent = `${Math.ceil(cur)} / ${max}`;
  if (barId === 'bar-hp') el.classList.toggle('hp-low', pct < 25);
}
const eventLog = [];
let _msgRafPending = false;
function setMessage(text) {
  eventLog.push(text);
  if (eventLog.length > 12) eventLog.shift();
  // Throttle DOM rebuild via RAF — pendant l'auto-battle évite les reflows en cascade
  if (_msgRafPending) return;
  _msgRafPending = true;
  requestAnimationFrame(() => {
    _msgRafPending = false;
    const box = document.getElementById('message-box');
    if (!box) return;
    box.innerHTML = eventLog.map((msg, i) => {
      const isLatest = i === eventLog.length - 1;
      return `<div style="opacity:${isLatest ? 1 : Math.max(0.3, 0.3 + (i / eventLog.length) * 0.7)};${isLatest ? 'color:var(--white)' : 'color:rgba(200,210,255,.65)'}">${msg}</div>`;
    }).join('');
    box.scrollTop = 999999; // évite la lecture de scrollHeight (reflow)
  });
}
function showZone(name) {
  const el = document.getElementById('zone-label');
  el.textContent = name; el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'), 2500);
}

// ══════════════════════════════════════════
// DROPDOWN MENU
// ══════════════════════════════════════════
function toggleDropdown() {
  const overlay = document.getElementById('side-menu-overlay');
  if (!overlay) return;
  const isOpen = overlay.style.display !== 'none';
  if (isOpen) {
    const panel = document.getElementById('side-menu-panel');
    if (panel) {
      panel.classList.add('side-menu-closing');
      setTimeout(() => { overlay.style.display = 'none'; panel.classList.remove('side-menu-closing'); }, 270);
    } else {
      overlay.style.display = 'none';
    }
  } else {
    // sync profil
    const nameEl = document.getElementById('side-player-name');
    if (nameEl) nameEl.textContent = (player?.currentName || '—') + (player?.name ? ' · ' + player.name : '');
    const lvlEl = document.getElementById('side-trainer-level');
    if (lvlEl) lvlEl.textContent = 'Niv.' + (player?.trainerLevel || 1);
    const goldEl = document.getElementById('side-gold');
    if (goldEl) goldEl.textContent = '₽ ' + (player?.gold || 0);
    const srcAvatar = document.getElementById('hud-avatar-img');
    const sideAvatar = document.getElementById('side-avatar-img');
    if (srcAvatar && sideAvatar) sideAvatar.src = srcAvatar.src;
    const xpBar = document.getElementById('bar-trainer-xp');
    const sideXp = document.getElementById('side-xp-bar');
    if (xpBar && sideXp) sideXp.style.width = xpBar.style.width;
    const tourBtn = document.getElementById('btn-tour-drop');
    if (tourBtn) tourBtn.style.display = (player?.trainerLevel||1) >= 10 ? 'flex' : 'none';
    overlay.style.display = 'block';
  }
}

// ══════════════════════════════════════════
// ZONE PICKER
// ══════════════════════════════════════════
function openZonePicker() {
  if (!player) return;
  const overlay = document.getElementById('zone-picker-overlay');
  if (!overlay) return;

  const bossesBeaten = player.lastBossWave || 0;
  const selectedId   = player.selectedExploreZone || null;
  const autoIdx      = Math.min(bossesBeaten, ZONE_ORDER.length - 1);
  const autoId       = ZONE_ORDER[autoIdx];

  // Active-label
  const lbl = document.getElementById('zone-picker-active-label');
  if (lbl) {
    const activeName = selectedId
      ? (ZONES[selectedId]?.name || selectedId)
      : `🔄 Auto — ${ZONES[autoId]?.name || autoId}`;
    lbl.textContent = `Zone active : ${activeName}`;
  }

  // Build zone list
  const list = document.getElementById('zone-picker-list');
  if (list) {
    list.innerHTML = '';
    const ICONS = { foret:'🌲', grotte:'⛰', route:'🛤', water:'🌊', elite:'🏆', cave:'⛰' };
    ZONE_ORDER.forEach((zoneId, idx) => {
      const zone = ZONES[zoneId];
      if (!zone) return;
      const unlocked   = idx <= bossesBeaten;
      const isSelected = zoneId === selectedId;
      const icon = ICONS[zone.type] || '🏙';
      const el = document.createElement('div');
      el.className = 'zone-choice-item'
        + (isSelected ? ' zc-selected' : '')
        + (!unlocked   ? ' zc-locked'   : '');
      el.innerHTML =
        `<span class="zc-icon">${icon}</span>` +
        `<span class="zc-name">${zone.name}</span>` +
        (isSelected   ? '<span class="zc-badge">✔</span>'  : '') +
        (!unlocked    ? '<span class="zc-badge">🔒</span>' : '');
      if (unlocked) el.onclick = () => selectExploreZone(zoneId);
      list.appendChild(el);
    });
  }

  overlay.style.display = 'flex';
}

function closeZonePicker() {
  const overlay = document.getElementById('zone-picker-overlay');
  if (overlay) overlay.style.display = 'none';
}

function selectExploreZone(id) {
  if (!player) return;
  player.selectedExploreZone = id || null;
  // persist
  _silentSave();
  const name = id ? (ZONES[id]?.name || id) : '🔄 Progression auto';
  notify(`🗺 Zone : ${name}`);
  setMessage(`🗺 Zone d'exploration : ${name}`);
  closeZonePicker();
  _updateZonePickerBtn();
  updateKillHUD();
}

function _updateZonePickerBtn() {
  const el = document.getElementById('hud-zone-name');
  if (!el || !player) return;
  const bossesBeaten = player.lastBossWave || 0;
  const selId = player.selectedExploreZone;
  const autoIdx = Math.min(bossesBeaten, ZONE_ORDER.length - 1);
  const autoId  = ZONE_ORDER[autoIdx];
  el.textContent = selId
    ? (ZONES[selId]?.name || selId)
    : `Auto: ${ZONES[autoId]?.name || autoId}`;
}

// ══════════════════════════════════════════
// WAVE / BOSS SYSTEM
// ══════════════════════════════════════════
const KILLS_PER_WAVE = 10;

function getWaveState() {
  if (!player) return { wave:1, killsInWave:0, bossReady:false, diffMult:1 };
  const totalKills     = player.totalKills  || 0;
  const bossesBeaten   = player.lastBossWave || 0;
  const killsSinceBoss = totalKills - bossesBeaten * KILLS_PER_WAVE;
  const bossReady      = killsSinceBoss >= KILLS_PER_WAVE;
  const wave           = bossesBeaten + 1;
  const killsInWave    = killsSinceBoss % KILLS_PER_WAVE;
  const diffMult       = parseFloat(Math.min(10.0, 1 + bossesBeaten * 0.15).toFixed(2));
  return { wave, killsInWave, bossReady, diffMult, totalKills, killsSinceBoss };
}

function getWaveEnemyScale() { return getWaveState().diffMult; }

function updateKillHUD() {
  if (!player) return;
  if (_killHudPending) return;
  _killHudPending = true;
  requestAnimationFrame(_doUpdateKillHUD);
}
function _doUpdateKillHUD() {
  _killHudPending = false;
  if (!player) return;
  const { wave, killsInWave, bossReady, diffMult, killsSinceBoss } = getWaveState();
  const display = Math.min(killsSinceBoss, KILLS_PER_WAVE);
  const wl = _hud('kill-wave-label');
  const kl = _hud('kill-count-label');
  const bf = _hud('kill-bar-fill');
  const dl = _hud('kill-diff-label');
  const bb = _hud('btn-boss');
  if (wl) {
    const bossesBeaten = player.lastBossWave || 0;
    const autoIdx  = Math.min(bossesBeaten, ZONE_ORDER.length - 1);
    const selId    = player.selectedExploreZone;
    const selIdx   = selId ? ZONE_ORDER.indexOf(selId) : -1;
    const activeId = (selId && (selIdx === -1 || selIdx <= bossesBeaten))
      ? selId : ZONE_ORDER[autoIdx];
    const zoneName = ZONES[activeId]?.name || '';
    wl.textContent = bossReady ? '💀' : `🌊 V${wave}`;
    wl.title = bossReady ? 'Boss disponible !' : `Vague ${wave} — ${zoneName}`;
  }
  _updateZonePickerBtn();
  if (kl) kl.textContent = bossReady ? 'Prêt !' : `${display}/${KILLS_PER_WAVE}`;
  if (bf) bf.style.width = `${Math.min(100,(display/KILLS_PER_WAVE)*100)}%`;
  if (dl) dl.textContent = `×${diffMult}`;
  if (bb) bb.style.display = bossReady ? 'inline-block' : 'none';
  const brp = _hud('btn-boss-replay');
  if (brp) brp.style.display = (player.lastBossWave||0) >= 1 ? 'inline-block' : 'none';
}

function recordKill() {
  if (!player) return;
  if (typeof player.totalKills !== 'number') player.totalKills = 0;
  const wasReady = getWaveState().bossReady;
  player.totalKills++;
  updateKillHUD();
  const { bossReady, wave } = getWaveState();
  if (bossReady && !wasReady) {
    notify(`💀 10 ennemis — Boss Vague ${wave} prêt !`);
    setMessage(`💀 Vague terminée ! Appuyez sur 💀 BOSS quand vous êtes prêt. Vous pouvez continuer à explorer !`);
  }
}

// ── Table de niveaux fixes des Boss par vague ──────────────────
// Le niveau est FIXE (indépendant du niveau du joueur).
// Les stats sont boostées via un multiplicateur croissant par vague.
//
//  Vague │ Niveau │ Mult stats │ Récompense XP │ Récompense Or
//  ──────┼────────┼────────────┼───────────────┼──────────────
//    1   │   10   │   ×1.80   │     300 XP    │    500 ₽
//    5   │   30   │   ×2.60   │   1 500 XP    │  2 500 ₽
//   10   │   55   │   ×3.60   │   3 000 XP    │  5 000 ₽
//   20   │  105   │   ×5.60   │   6 000 XP    │ 10 000 ₽
//   50   │  255   │  ×10.00   │   6 000 XP    │ 10 000 ₽
//   89+  │  450   │  ×10.00   │   6 000 XP    │ 10 000 ₽ (plafond)
// ──────────────────────────────────────────────────────────────
function _bossFixedLevel(wave) {
  // Paliers fixes : vague 1→10, 2→15, 3→20 … vague 89→450 (plafond)
  return Math.min(450, 5 + wave * 5);
}
function _bossStatMult(wave) {
  // Vague 1 : ×1.8 (intro abordable)
  // Vague 2+ : palier plus dur — ×2.2 puis +0.30 par vague (max ×10.0)
  if (wave <= 1) return 1.8;
  return Math.min(10.0, 2.2 + (wave - 2) * 0.30);
}

function generateBossEnemy() {
  if (!player) return null;
  const { wave } = getWaveState();
  const bossLevel = _bossFixedLevel(wave);
  const sc        = _bossStatMult(wave);

  const BOSS_POOL = [
    {id:6,  n:'Dracaufeu',  t:'Feu'    },
    {id:9,  n:'Tortank',    t:'Eau'    },
    {id:3,  n:'Florizarre', t:'Plante' },
    {id:130,n:'Léviator',   t:'Eau'    },
    {id:131,n:'Lokhlass',   t:'Glace'  },
    {id:143,n:'Ronflex',    t:'Normal' },
    {id:149,n:'Dracolosse', t:'Dragon' },
    {id:142,n:'Ptéra',      t:'Vol'    },
    {id:59, n:'Arcanin',    t:'Feu'    },
    {id:65, n:'Alakazam',   t:'Psy'    },
    {id:68, n:'Mackogneur', t:'Combat' },
    {id:94, n:'Ectoplasma', t:'Spectre'},
    {id:144,n:'Artikodin',  t:'Glace'  },
    {id:145,n:'Électhor',   t:'Électrik'},
    {id:146,n:'Sulfura',    t:'Feu'    },
    {id:150,n:'Mewtwo',     t:'Psy'    },
    {id:151,n:'Mew',        t:'Psy'    },
  ];
  const b     = BOSS_POOL[(wave - 1) % BOSS_POOL.length];
  const pData = (typeof ALL_POKEMON !== 'undefined' ? ALL_POKEMON : GEN1).find(p => p.id === b.id);

  // Stats fixes × multiplicateur de vague — PAS de scaling joueur
  const baseHp  = pData?.hp  || 80;
  const baseAtk = pData?.atk || 12;
  const baseDef = pData?.def || 8;
  const hp  = Math.round(baseHp  * sc * 1.4); // +40% PV bonus boss
  const atk = Math.round(baseAtk * sc);
  const def = Math.round(baseDef * sc * 0.9);
  const spd = Math.round(60 * (1 + wave * 0.03));

  // Récompenses fixes (ne dépendent pas du niveau du joueur)
  const xpReward   = Math.max(300, Math.round(15 * wave * wave));
  const goldReward = Math.max(200, Math.round(8 * wave * wave));

  return {
    name: `⭐ ${b.n} (Boss V.${wave})`,
    id: b.id, level: bossLevel,
    hp, maxHp: hp, atk, def, spd, type: b.t,
    xp: xpReward, gold: goldReward,
    isBoss: true, isShiny: false,
    _bossWave: wave, _statMult: sc,   // debug info
  };
}

function challengeBoss() {
  if (!player) return;
  const { bossReady, wave } = getWaveState();
  if (!bossReady) { notify('Pas encore prêt !'); return; }
  const boss = generateBossEnemy();
  if (!boss) return;
  const multLabel = boss._statMult ? `×${boss._statMult.toFixed(1)} stats` : '';
  notify(`💀 Boss V.${wave} — Niv.${boss.level} ${multLabel}`);
  setMessage(`💀 Boss Vague ${wave} : ${boss.name} Niv.${boss.level} surgit ! Stats boostées ${multLabel} — +${boss.xp} XP / +${boss.gold}₽`);
  player._bossBattle = { wave };
  startBattle(boss);
}

// ── Replay Boss ──────────────────────────
function openBossReplayMenu() {
  if (!player) return;
  const maxWave = player.lastBossWave || 0;
  if (maxWave < 1) { notify('Aucun boss battu encore !'); return; }
  const list = document.getElementById('boss-replay-list');
  if (list) {
    const BOSS_POOL = [
      {id:6,n:'Dracaufeu'},{id:9,n:'Tortank'},{id:3,n:'Florizarre'},{id:130,n:'Léviator'},
      {id:131,n:'Lokhlass'},{id:143,n:'Ronflex'},{id:149,n:'Dracolosse'},{id:142,n:'Ptéra'},
      {id:59,n:'Arcanin'},{id:65,n:'Alakazam'},{id:68,n:'Mackogneur'},{id:94,n:'Ectoplasma'},
      {id:144,n:'Artikodin'},{id:145,n:'Électhor'},{id:146,n:'Sulfura'},{id:150,n:'Mewtwo'},{id:151,n:'Mew'},
    ];
    list.innerHTML = '';
    for (let w = 1; w <= maxWave; w++) {
      const b = BOSS_POOL[(w-1) % BOSS_POOL.length];
      const lv = _bossFixedLevel(w);
      const sc = _bossStatMult(w);
      const el = document.createElement('div');
      el.style.cssText = 'display:flex;align-items:center;gap:.6rem;padding:.45rem .6rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,100,50,.25);border-radius:8px;cursor:pointer;font-family:\'Press Start 2P\',monospace;font-size:.34rem;color:rgba(255,255,255,.8)';
      el.innerHTML = `<img src="${SPRITE_FRONT(b.id)}" style="width:36px;height:36px;image-rendering:pixelated"/><span style="flex:1">V.${w} — ${b.n} Niv.${lv}</span><span style="color:#ff8055">×${sc.toFixed(1)} stats</span>`;
      el.onmouseenter = () => { el.style.background='rgba(255,100,50,.12)'; el.style.borderColor='rgba(255,100,50,.6)'; };
      el.onmouseleave = () => { el.style.background='rgba(255,255,255,.04)'; el.style.borderColor='rgba(255,100,50,.25)'; };
      el.onclick = () => { closeBossReplayMenu(); replayBoss(w); };
      list.appendChild(el);
    }
  }
  document.getElementById('boss-replay-overlay').style.display = 'flex';
}
function closeBossReplayMenu() {
  document.getElementById('boss-replay-overlay').style.display = 'none';
}
function replayBoss(wave) {
  if (!player) return;
  // Générer le boss de la vague demandée (niveau et stats fixes)
  const bossLevel = _bossFixedLevel(wave);
  const sc        = _bossStatMult(wave);
  const BOSS_POOL = [
    {id:6,n:'Dracaufeu',t:'Feu'},{id:9,n:'Tortank',t:'Eau'},{id:3,n:'Florizarre',t:'Plante'},
    {id:130,n:'Léviator',t:'Eau'},{id:131,n:'Lokhlass',t:'Glace'},{id:143,n:'Ronflex',t:'Normal'},
    {id:149,n:'Dracolosse',t:'Dragon'},{id:142,n:'Ptéra',t:'Vol'},{id:59,n:'Arcanin',t:'Feu'},
    {id:65,n:'Alakazam',t:'Psy'},{id:68,n:'Mackogneur',t:'Combat'},{id:94,n:'Ectoplasma',t:'Spectre'},
    {id:144,n:'Artikodin',t:'Glace'},{id:145,n:'Électhor',t:'Électrik'},{id:146,n:'Sulfura',t:'Feu'},
    {id:150,n:'Mewtwo',t:'Psy'},{id:151,n:'Mew',t:'Psy'},
  ];
  const b = BOSS_POOL[(wave-1) % BOSS_POOL.length];
  const pData = (typeof ALL_POKEMON!=='undefined' ? ALL_POKEMON : GEN1).find(p => p.id === b.id);
  const hp  = Math.round((pData?.hp||80)  * sc * 1.4);
  const atk = Math.round((pData?.atk||12) * sc);
  const def = Math.round((pData?.def||8)  * sc * 0.9);
  const spd = Math.round(60 * (1 + wave * 0.03));
  const boss = {
    name: `🔁 ${b.n} (Boss V.${wave})`,
    id: b.id, level: bossLevel,
    hp, maxHp: hp, atk, def, spd, type: b.t,
    xp: 0, gold: 0, // Pas de récompenses en replay
    isBoss: true, isShiny: false,
    _bossWave: wave, _statMult: sc,
  };
  notify(`🔁 Replay Boss V.${wave} — Niv.${bossLevel} ×${sc.toFixed(1)} stats`);
  setMessage(`🔁 Entraînement — Boss Vague ${wave} : ${boss.name} Niv.${bossLevel} ! Aucune récompense.`);
  player._bossBattle = { wave, isReplay: true };
  startBattle(boss);
}

// ══════════════════════════════════════════
// EXPLORE
// ══════════════════════════════════════════
function doExplore() {
  if (!player) return;

  const roll = Math.random();
  if (roll < 0.55) {
    updateGlobalStats('explores');
    const scale = getWaveEnemyScale();
    const { wave } = getWaveState();
    // Zone index : chaque groupe de 10 vagues = 1 zone
    // wave 1-9 → zone 0, wave 11-19 → zone 1, wave 21-29 → zone 2, etc.
    const bossesBeaten = player.lastBossWave || 0;
    const zoneIdx = Math.min(bossesBeaten, ZONE_ORDER.length - 1);
    const zoneId  = ZONE_ORDER[zoneIdx];
    const zone    = ZONES[zoneId];
    const pool    = zone?.pokemon || [];
    // Pokémon de toutes les générations
    const _allPoke = (typeof ALL_POKEMON !== 'undefined') ? ALL_POKEMON : GEN1;
    const _pokeMap = (typeof ALL_POKEMON_MAP !== 'undefined') ? ALL_POKEMON_MAP : null;
    const _allSpdT = (typeof ALL_SPD !== 'undefined') ? ALL_SPD : GEN1_SPD;
    const pokeId  = pool.length > 0
      ? pool[Math.floor(Math.random() * pool.length)]
      : _allPoke[Math.floor(Math.random() * _allPoke.length)].id;
    const pData   = (_pokeMap?.get(pokeId)) || _allPoke.find(p => p.id === pokeId) || _allPoke[Math.floor(Math.random()*_allPoke.length)];

    // Tranche de niveau fixe par zone — fallback sur zone auto si l'ID est inconnu
    const zoneLvRange = ZONE_LEVELS[zoneId] || ZONE_LEVELS[ZONE_ORDER[zoneIdx]] || [1, 8];
    const enemyLevel  = zoneLvRange[0] + Math.floor(Math.random() * (zoneLvRange[1] - zoneLvRange[0] + 1));
    // lvlScale +13% vs ancienne formule (0.15→0.17) — late-game plus résistant.
    // HP ×1.15 : difficulté via PV, pas via DEF.
    // ATK ×0.88 : dégâts ennemis légèrement réduits — survie joueur +1-2 tours.
    // DEF ×0.55 : correction critique — empêche les ennemis à haute DEF de base
    //   (Onix DEF:25, Crustabri DEF:20) de devenir imbattables au niveau de la zone.
    const lvlScale    = 1 + enemyLevel * 0.17;
    const baseSpd     = _allSpdT[pData.id] || 50;
    const e = {
      name: pData.n, id: pData.id, level: enemyLevel,
      hp:   Math.round(pData.hp  * lvlScale * 1.15),
      atk:  Math.round(pData.atk * lvlScale * 0.88),
      def:  Math.round((pData.def||5) * lvlScale * 0.55) || 1,
      spd:  Math.round(baseSpd * (1 + enemyLevel * 0.02)),
      xp:   Math.round((pData.xp||10) * lvlScale),
      gold: Math.round(enemyLevel * 3),
      type: pData.t, isShiny: rollShiny(), maxHp: 0,
    };
    e.maxHp = e.hp;
    if (e.isShiny) { e.hp=Math.round(e.hp*1.15); e.maxHp=e.hp; e.atk=Math.round(e.atk*1.15); e.def=Math.round(e.def*1.15); e.spd=Math.round(e.spd*1.15); }
    showPreBattleMenu(e);
  } else if (roll < 0.68) {
    const g = Math.floor(Math.random()*10)+3;
    player.gold += g; updateHUD();
    setMessage(`✦ Vous trouvez ${g} Pokédollars !`); notify(`+${g} ₽`);
  } else if (roll < 0.78) {
    player.bag.potion = (player.bag.potion||0)+1;
    setMessage('🧪 Une Potion dans l\'herbe !'); notify('+1 Potion');
  } else {
    setMessage(EVENTS[Math.floor(Math.random()*EVENTS.length)]);
  }
}
let lastRestTime = 0;
const REST_COOLDOWN = 30000; // 30 secondes

function doRest() {
  if (!player) return;
  const now = Date.now();
  const elapsed = now - lastRestTime;
  if (lastRestTime > 0 && elapsed < REST_COOLDOWN) {
    const remain = Math.ceil((REST_COOLDOWN - elapsed) / 1000);
    setMessage(`🏥 Le Centre Pokémon se recharge… encore ${remain}s.`);
    notify(`⏳ Attendre ${remain}s`);
    return;
  }
  lastRestTime = now;
  player._winStreak = 0; // le repos réinitialise le streak
  // Soin complet : le Centre Pokémon restaure 100 % des PV et PP
  player.hp = player.maxHp;
  player.mp = player.maxMp;
  player.moveUses  = player.moveUsesMax  || 6;
  player.mMoveUses = player.mMoveUsesMax || 4;
  // Soin de toute l'équipe — préserve l'ordre de passage (activeRosterIdx)
  if (player.roster) {
    const savedIdx = player.activeRosterIdx || 0; // mémoriser le slot actif
    player.roster.forEach(p => {
      p.hp = p.maxHp;
      p.mp = p.maxMp || 50;
      p.moveUses  = p.moveUsesMax  || 6;
      p.mMoveUses = p.mMoveUsesMax || 4;
    });
    // Écrire player → roster[savedIdx], puis relire pour rester cohérent
    syncActiveFromPlayer();
    player.activeRosterIdx = savedIdx; // s'assurer que l'idx n'a pas dévié
    syncPlayerFromActive();
  }
  updateHUD();
  updateGlobalStats('rests');
  setMessage(`🏥 ${player.currentName} est soigné à 100 % au Centre Pokémon ! PV et attaques entièrement restaurés.`);
  notify('🏥 Soin complet ! ⏳30s');
  // Countdown display on button
  const btn = document.querySelector('#action-btns .btn.green');
  if (btn) {
    btn.disabled = true;
    let t = 30;
    btn.textContent = `🏥 CENTRE (${t}s)`;
    const iv = setInterval(()=>{
      t--;
      if (t <= 0) { clearInterval(iv); btn.disabled=false; btn.textContent='🏥 CENTRE'; }
      else btn.textContent = `🏥 CENTRE (${t}s)`;
    }, 1000);
  }
}

// ══════════════════════════════════════════
// BATTLE
// ══════════════════════════════════════════
// ══════════════════════════════════════════
// TABLEAU DES TYPES (Gen 1-6 complet)
// mult: 2=super efficace, 0.5=pas très efficace, 0=immunité
// ══════════════════════════════════════════
const TYPE_CHART = {
  Normal:   { Roche:0.5, Acier:0.5, Spectre:0 },
  Feu:      { Feu:0.5, Eau:0.5, Roche:0.5, Dragon:0.5, Plante:2, Glace:2, Insecte:2, Acier:2 },
  Eau:      { Eau:0.5, Plante:0.5, Dragon:0.5, Feu:2, Sol:2, Roche:2 },
  Électrik: { Électrik:0.5, Plante:0.5, Dragon:0.5, Sol:0, Eau:2, Vol:2 },
  Plante:   { Feu:0.5, Plante:0.5, Poison:0.5, Vol:0.5, Insecte:0.5, Dragon:0.5, Acier:0.5, Eau:2, Sol:2, Roche:2 },
  Glace:    { Eau:0.5, Glace:0.5, Feu:2, Combat:2, Roche:2, Acier:2, Plante:2, Dragon:2, Vol:2, Sol:2 },
  Combat:   { Poison:0.5, Insecte:0.5, Psy:0.5, Vol:0.5, Fée:0.5, Normal:2, Glace:2, Roche:2, Acier:2, Ténèbres:2, Spectre:0 },
  Poison:   { Poison:0.5, Sol:0.5, Roche:0.5, Spectre:0.5, Acier:0, Plante:2, Fée:2 },
  Sol:      { Plante:0.5, Insecte:0.5, Électrik:0, Feu:2, Poison:2, Roche:2, Acier:2 },
  Vol:      { Électrik:0.5, Roche:0.5, Acier:0.5, Sol:0, Plante:2, Combat:2, Insecte:2 },
  Psy:      { Psy:0.5, Acier:0.5, Ténèbres:0, Combat:2, Poison:2 },
  Insecte:  { Feu:0.5, Combat:0.5, Vol:0.5, Spectre:0.5, Acier:0.5, Fée:0.5, Plante:2, Psy:2, Ténèbres:2 },
  Roche:    { Combat:0.5, Sol:0.5, Acier:0.5, Feu:2, Glace:2, Insecte:2, Vol:2 },
  Spectre:  { Normal:0, Combat:0, Spectre:2, Psy:2, Ténèbres:0.5 },
  Dragon:   { Acier:0.5, Fée:0, Dragon:2 },
  Ténèbres: { Combat:0.5, Ténèbres:0.5, Fée:0.5, Psy:2, Spectre:2 },
  Acier:    { Feu:0.5, Eau:0.5, Électrik:0.5, Acier:0.5, Plante:2, Glace:2, Roche:2, Fée:2 },
  Fée:      { Feu:0.5, Poison:0.5, Acier:0.5, Combat:2, Dragon:2, Ténèbres:2 },
};

function getEffectiveness(atkType, defType) {
  if (!atkType || !defType) return 1;
  const row = TYPE_CHART[atkType];
  if (!row) return 1;
  return row[defType] !== undefined ? row[defType] : 1;
}

function getEffLabel(mult) {
  if (mult === 0)  return { label:"Ça n'a aucun effet…",        color:'#888888' };
  if (mult >= 2)   return { label:'C\'est super efficace ! 🔥', color:'#ff4500' };
  if (mult <= 0.5) return { label:'Ce n\'est pas très efficace…', color:'#4cc9f0' };
  return { label:'', color:'' };
}

// Type de l'attaque de base selon le type du pokémon (simplifié)
function getAttackType(pokemonType) { return pokemonType; }

// ══════════════════════════════════════════
// PRE-BATTLE TEAM SELECTOR
// ══════════════════════════════════════════
let pendingEnemyData = null;

function showPreBattleMenu(enemyData) {
  if (player && player.roster && player.roster.length > 0) {
    // Conserver l'ordre de passage : si le slot actif est K.O. (hp <= 0),
    // trouver automatiquement le premier Pokémon vivant sans perturber l'ordre voulu.
    const activeIdx = player.activeRosterIdx || 0;
    const activePoke = player.roster[activeIdx];
    if (!activePoke || activePoke.hp <= 0) {
      const aliveIdx = player.roster.findIndex(p => p.hp > 0);
      if (aliveIdx >= 0) {
        player.activeRosterIdx = aliveIdx;
      }
    }
    syncPlayerFromActive();
  }
  startBattle(enemyData);
}

function closePreBattleMenu() {
  document.getElementById('pre-battle-menu').style.display = 'none';
  pendingEnemyData = null;
}

function cancelPreBattle() {
  closePreBattleMenu();
  setMessage('🌿 Vous évitez prudemment le Pokémon sauvage...');
}

function startBattle(enemyData) {
  enemy = { ...enemyData, maxHp: enemyData.hp };
  _bHpCache = { pp: -1, ep: -1 }; // force le premier rendu des barres HP
  // Réinitialiser Revenant (une seule fois par combat)
  if (player.roster) player.roster.forEach(p => { if (p._revenant) p._revenantUsed = false; });
  const activePoke = getActivePoke();
  const playerShiny = activePoke?.isShiny || false;
  document.getElementById('b-player-name').textContent = player.currentName + (playerShiny ? ' ✨' : '');
  document.getElementById('b-player-level').textContent = 'Niv.'+player.level;
  document.getElementById('b-enemy-name').textContent = enemy.name;
  document.getElementById('b-enemy-level').textContent = 'Niv.'+enemy.level;
  // Speed display
  const pSpdEl = document.getElementById('b-player-spd');
  const eSpdEl = document.getElementById('b-enemy-spd');
  if(pSpdEl) pSpdEl.textContent = '⚡'+player.spd;
  if(eSpdEl) eSpdEl.textContent = '⚡'+enemy.spd;
  // Type badges (support dual types)
  const pTypeBadge = document.getElementById('b-player-type');
  const eTypeBadge = document.getElementById('b-enemy-type');
  const playerDual = player.dualType || getPokeType(player.currentSpriteId, player.type);
  const enemyDual  = getPokeType(enemy.id, enemy.type);
  enemy.dualType   = enemyDual;
  if (playerDual.includes('/')) {
    const [t1,t2] = playerDual.split('/');
    pTypeBadge.innerHTML = `<span class="poke-type-badge type-${t1}" style="margin-right:2px">${t1}</span><span class="poke-type-badge type-${t2}">${t2}</span>`;
    pTypeBadge.className = '';
  } else {
    pTypeBadge.textContent = playerDual;
    pTypeBadge.className = 'poke-type-badge type-'+playerDual;
  }
  if (enemyDual.includes('/')) {
    const [t1,t2] = enemyDual.split('/');
    eTypeBadge.innerHTML = `<span class="poke-type-badge type-${t1}" style="margin-right:2px">${t1}</span><span class="poke-type-badge type-${t2}">${t2}</span>`;
    eTypeBadge.className = '';
  } else {
    eTypeBadge.textContent = enemyDual;
    eTypeBadge.className = 'poke-type-badge type-'+enemyDual;
  }
  // Matchup hint basé sur les éléments des attaques
  const myMult  = getEffectiveness(player.moveElem||player.type, enemy.type);
  const myMult2 = getEffectiveness(player.mMoveElem||player.type, enemy.type);
  const hisMult = getEffectiveness(enemy.type, player.type);
  let matchupHint = '';
  if (myMult >= 2)   matchupHint += ` ✅ ${player.move} super efficace !`;
  if (myMult2 >= 2 && myMult2 !== myMult) matchupHint += ` ✅ ${player.mMove} super efficace !`;
  if (myMult === 0)  matchupHint += ` ⚫ ${player.move} sans effet !`;
  if (myMult <= 0.5 && myMult > 0) matchupHint += ` ⚠ ${player.move} peu efficace.`;
  if (hisMult >= 2)  matchupHint += ` ❗ Ennemi super efficace !`;
  document.getElementById('player-battle-img').src = playerShiny ? SPRITE_SHINY(player.currentSpriteId) : SPRITE_FRONT(player.currentSpriteId);
  document.getElementById('enemy-battle-img').src = enemy.isShiny ? SPRITE_SHINY(enemy.id) : SPRITE_FRONT(enemy.id);
  const _ba = _hud('btn-attack'); const _bm = _hud('btn-magic');
  const _ah = `⚔ ${player.move} <span class="atk-elem-badge elem-${player.moveElem||player.type}">${player.moveElem||player.type}</span>`;
  const _mh = `✨ ${player.mMove} <span class="atk-elem-badge elem-${player.mMoveElem||player.type}">${player.mMoveElem||player.type}</span>`;
  if (_ba) { _ba.innerHTML = _ah; _ba._cachedHtml = _ah; }
  if (_bm) { _bm.innerHTML = _mh; _bm._cachedHtml = _mh; }
  updateBattleHp(); disableBattleButtons(false);
  // Désactiver la capture uniquement pendant les modes spéciaux (Tour, World Boss, Trial, Dresseurs)
  const _isCaptureBlocked = !!(enemy.isWorldBoss || enemy.isBoss || enemy.isTrainerBattle || player._bossBattle || player._tourBattle || player._worldBossBattle || player._trialBattle || player._gymBattle);
  const btnCatch = document.getElementById('btn-catch-battle');
  if (btnCatch) { btnCatch.style.display = _isCaptureBlocked ? 'none' : ''; }
  const shinyBadge = enemy.isShiny ? ' ✨' : '';
  const legendBadge = enemy.isLegendary ? ' ⭐' : '';
  document.getElementById('b-enemy-name').textContent = enemy.name + shinyBadge + legendBadge;
  (_hud('battle-log')).textContent = `${enemy.isLegendary ? '⭐ UN LÉGENDAIRE ! ' : enemy.isShiny ? '✨ OH ! Un Pokémon SHINY apparaît ! ' : '⚡ Un '}${enemy.name} (${enemy.type}) ${enemy.isLegendary ? 'vous défie !' : 'sauvage apparaît !'}${matchupHint}`;
  document.getElementById('catch-display').classList.remove('active');
  battleBusy = false;
  // Reset tour flag unless set by startTourFloor
  if (!player._tourBattle) player._tourBattle = false;
  // Méga-Évolution si pierre équipée
  if (player.roster && player.roster[player.activeRosterIdx||0]) {
    const activePoke = player.roster[player.activeRosterIdx||0];
    if (canMegaEvolve(activePoke) && !activePoke._isMega) {
      setTimeout(()=>applyMegaEvo(activePoke), 800);
    }
  }
  // Pokédex : seule la capture débloque l'entrée (pas la rencontre)
  // → markDexSeen est appelé uniquement dans addCapturedToRoster

  // Shiny rencontré : animation + pause farm auto obligatoire
  if (enemy.isShiny) {
    triggerShinyEncounterEffect();
    if (farmAutoOn) {
      // Stopper le farm auto pour que le joueur puisse décider de capturer
      farmAutoOn = false;
      if (farmAutoTimer) { clearTimeout(farmAutoTimer); farmAutoTimer = null; }
      const faBtn = document.getElementById('btn-farm-auto');
      if (faBtn) { faBtn.style.background='linear-gradient(180deg,#888,#555)'; faBtn.style.boxShadow='0 4px 0 #222'; faBtn.textContent='🤖 AUTO'; }
      notify('✨ SHINY ! 🛑 Farm Auto pausé — prends ta décision !');
    }
    // On ne lance PAS l'auto-combat sur un shiny — combat manuel uniquement
  } else if (farmAutoOn) {
    autoBattleOn = true;
    const abBtn = _hud('btn-auto');
    if (abBtn) { abBtn.style.background='linear-gradient(180deg,#2dc653,#1a8035)'; abBtn.style.boxShadow='0 4px 0 #0c4019'; abBtn.textContent='🤖 AUTO ON'; }
    if (autoBattleTimer) clearTimeout(autoBattleTimer);
    autoBattleTimer = setTimeout(runAutoAction, 1200);
  }

  if ((enemy.spd||50) > player.spd) {
    document.getElementById('battle-turn-info').textContent = '🔴 L\'ennemi attaque en premier !';
    disableBattleButtons(true);
    setTimeout(()=>{
      setBattleTurn('enemy');
    }, 800);
  } else {
    setBattleTurn('player');
  }
  showScreen('battle');
}

// Cache des pourcentages HP — évite les redraws si HP n'a pas bougé
let _bHpCache = { pp: -1, ep: -1 };
function updateBattleHp() {
  if (!player || !enemy) return;
  const pPct = Math.round(Math.max(0, (player.hp / player.maxHp) * 100));
  const ePct = Math.round(Math.max(0, (enemy.hp  / enemy.maxHp)  * 100));
  const pChanged = pPct !== _bHpCache.pp;
  const eChanged = ePct !== _bHpCache.ep;
  if (!pChanged && !eChanged) return; // rien à redessiner
  _bHpCache.pp = pPct; _bHpCache.ep = ePct;
  const barColor = p => p > 50 ? 'linear-gradient(90deg,#2dc653,#06d6a0)' : p > 20 ? 'linear-gradient(90deg,#ffd60a,#ff9a3c)' : 'linear-gradient(90deg,#e63946,#ff6b9d)';
  if (pChanged) {
    const pBar = _hud('b-hp-player');
    pBar.style.width = pPct+'%'; pBar.style.background = barColor(pPct);
    _hud('b-hp-player-text').textContent = `${Math.ceil(player.hp)} / ${player.maxHp}`;
  }
  if (eChanged) {
    const eBar = _hud('b-hp-enemy');
    eBar.style.width = ePct+'%'; eBar.style.background = barColor(ePct);
    _hud('b-hp-enemy-text').textContent = `${Math.ceil(enemy.hp)} / ${enemy.maxHp}`;
  }
}

// ══════════════════════════════════════════
// TOUR REWARD
// ══════════════════════════════════════════
let pendingTourRewardItem = null;

function showTourReward(floor) {
  const itemId = TOUR_REWARD_POOL[Math.floor(Math.random() * TOUR_REWARD_POOL.length)];
  pendingTourRewardItem = itemId;
  const item = HELD_ITEMS[itemId];
  document.getElementById('reward-floor-num').textContent = floor;
  document.getElementById('reward-item-display').innerHTML = `
    <div style="font-size:3rem">${item.icon}</div>
    <div style="font-family:'Press Start 2P',monospace;font-size:.6rem;color:#ffd700">${item.name}</div>
    <div style="font-size:.8rem;color:rgba(255,255,255,.65);text-align:center;max-width:280px">${item.desc}</div>
    ${item.consumable ? '<div style="font-family:\'Press Start 2P\',monospace;font-size:.38rem;color:#ff69b4;margin-top:.3rem">CONSOMABLE</div>' : '<div style="font-family:\'Press Start 2P\',monospace;font-size:.38rem;color:#4cc9f0;margin-top:.3rem">OBJET TENU</div>'}
  `;
  document.getElementById('tour-reward-modal').style.display = 'flex';
}

function claimTourReward() {
  if (!pendingTourRewardItem || !player) return;
  if (!player.heldItemBag) player.heldItemBag = {};
  player.heldItemBag[pendingTourRewardItem] = (player.heldItemBag[pendingTourRewardItem] || 0) + 1;
  const item = HELD_ITEMS[pendingTourRewardItem];
  notify(`${item.icon} ${item.name} obtenu !`);
  setMessage(`🏆 Récompense d'étage : ${item.icon} ${item.name} ajouté à vos objets !`);
  pendingTourRewardItem = null;
  document.getElementById('tour-reward-modal').style.display = 'none';
  showTourMode();
}

// Restes: heal 5% HP at start of player turn
function applyRestesHeal() {
  if (!player || !player.roster) return;
  const p = getActivePoke();
  if (!p || p.heldItem !== 'reste') return;
  const heal = Math.max(1, Math.floor(p.maxHp * 0.05));
  p.hp = Math.min(p.maxHp, p.hp + heal);
  player.hp = p.hp;
  updateBattleHp();
}

// Amulette d'Or: gold bonus — applied in battle victory
function getGoldMultiplier() {
  const p = getActivePoke();
  let mult = (p && p.heldItem === 'amulette-or') ? 1.3 : 1.0;
  if (p && p._fortuneBonus) mult *= (1 + p._fortuneBonus);
  if (player && player._globalGoldBonus) mult *= (1 + player._globalGoldBonus);
  if (player && player.prestigeGoldMult) mult *= player.prestigeGoldMult;
  return mult;
}
function getXpMultiplier() {
  const p = getActivePoke();
  let mult = 1.0;
  if (p && p._xpBonus) mult *= (1 + p._xpBonus);
  if (player && player._globalXPBonus) mult *= (1 + player._globalXPBonus);
  if (player && player.prestigeXPMult) mult *= player.prestigeXPMult;
  return mult;
}
function getEffectiveShinyOdds() {
  let odds = SHINY_ODDS;
  if (player) {
    if (player._shinyLuckMult) odds = Math.max(1, Math.round(odds / player._shinyLuckMult));
    if (player.prestigeShinyMult) odds = Math.max(1, Math.round(odds / player.prestigeShinyMult));
  }
  return odds;
}
function xpForLevel(n) {
  // Courbe quadratique — plafond porté à 500
  // lv10≈993  lv50≈22953  lv100≈90903  lv200≈361803  lv300≈812703  lv500≈2254503
  return Math.floor(3 * (3*n*n + 3*n + 1));
}
let battleTurn = 'player'; // 'player' or 'enemy'
let battleBusy = false;

function setBattleTurn(turn) {
  battleTurn = turn;
  const logEl = (_hud('battle-log'));
  if (turn === 'player') {
    disableBattleButtons(false);
    applyRestesHeal();
    const turnInfo = _hud('battle-turn-info');
    if(turnInfo) turnInfo.textContent = '🟢 Votre tour !';
  } else {
    disableBattleButtons(true);
    const turnInfo = _hud('battle-turn-info');
    if(turnInfo) turnInfo.textContent = '🔴 Tour ennemi…';
    // Enemy attacks after delay
    setTimeout(()=>{
      if (!enemy || !player) return;
      const eMult = getEffectiveness(enemy.type, player.type);
      const eBase = Math.max(1, enemy.atk+Math.floor(Math.random()*5)-Math.floor(player.def/2));
      // Cap à 28% des PV max pour éviter les one-shots des ennemis très forts (zones Johto/Hoenn)
      const eDmg  = Math.min(Math.round(eBase * eMult), Math.floor((player.maxHp||100) * 0.28));
      const eEff  = getEffLabel(eMult);
      player.hp -= eDmg;
      playAttackAnim('normal', true);
      hurtSprite('player-battle-img');
      let log = `${enemy.name} attaque`;
      if (eEff.label) log += ` — ${eEff.label}`;
      log += ` pour ${eDmg} dégâts !`;
      if (player.hp<=0) {
        // Talent Revenant : ressuscite une fois à 50% PV
        const _activePoke = getActivePoke();
        if (_activePoke && _activePoke._revenant && !_activePoke._revenantUsed) {
          _activePoke._revenantUsed = true;
          player.hp = Math.floor(player.maxHp * 0.5);
          if (_activePoke) _activePoke.hp = player.hp;
          updateBattleHp(); updateHUD();
          (_hud('battle-log')).textContent = `💫 Talent REVENANT ! ${player.currentName} ressuscite à 50% PV !`;
          notify(`💫 Revenant ! ${player.currentName} continue !`);
          battleBusy = false;
          setBattleTurn('player');
          return;
        }
        player.hp=0; updateBattleHp(); updateHUD();
        syncActiveFromPlayer();
        (_hud('battle-log')).textContent=`💀 ${player.currentName} est K.O. !`;
        // Check if there's another pokemon alive in roster
        const aliveIdx = player.roster ? player.roster.findIndex((p,i)=>i!==(player.activeRosterIdx||0) && p.hp > 0) : -1;
        if (aliveIdx >= 0) {
          setTimeout(()=>{
            const isTour = !!player._tourBattle;
            (_hud('battle-log')).textContent = isTour
              ? `💀 ${player.currentName} est K.O. dans la Tour ! Choisissez un remplaçant !`
              : `💀 ${player.currentName} est K.O. ! Choisissez un autre Pokémon !`;
            // Auto-battle : switch automatiquement vers le prochain pokemon vivant
            if (autoBattleOn) {
              const switched = switchToRosterPoke(aliveIdx, true);
              if (switched) {
                refreshBattlePlayerUI();
                battleBusy = false; // libère le verrou bloqué par la mort en contre-attaque
                (_hud('battle-log')).textContent = `💀 K.O. ! 🤖 Auto-switch → ${player.currentName} !`;
                setBattleTurn('player');
                if (autoBattleTimer) clearTimeout(autoBattleTimer);
                autoBattleTimer = setTimeout(runAutoAction, 800);
              } else {
                // Le switch a échoué (tous K.O. ?) — laisser le gestionnaire de défaite prendre le relais
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
            stopAutoBattle();
            disableBattleButtons(false);
            player.hp = Math.floor(player.maxHp * .3);
            if (player.roster) player.roster[player.activeRosterIdx||0].hp = player.hp;
            // Boss defeat → retour à 9 kills dans la vague
            if (player._bossBattle) {
              player._bossBattle = null;
              const { wave } = getWaveState();
              player.totalKills = Math.max(0, (wave - 1) * KILLS_PER_WAVE + (KILLS_PER_WAVE - 1));
              showScreen('game'); updateHUD(); updateKillHUD();
              notify('💀 Défaite contre le Boss — retour à 9/10 !');
              setMessage('💀 Défaite ! Retour à 9 victoires dans la vague.');
            } else if (player._worldBossBattle) {
              player._worldBossBattle = false;
              showScreen('game'); updateHUD();
              notify('💀 Défaite contre le World Boss !');
              setMessage('💀 Vous avez été vaincu par le World Boss… Retentez votre chance !');
            } else if (player._trialBattle) {
              player._trialBattle = false; player._trialBattleTp = 0;
              showScreen('game'); updateHUD();
              notify('💀 Défaite en Trial — aucun PT gagné.');
              setMessage('💀 Votre Pokémon a été vaincu en Trial. Réessayez !');
            } else if (player._tourBattle) {
              player._tourBattle = false;
              tourState = null;
              player.tourFloor = 0;
              showScreen('game'); updateHUD();
              notify('💀 Défaite dans la Tour — retour à l\'Étage 1 !');
              setMessage('💀 Votre Pokémon s\'est évanoui dans la Tour… Vous repartez de l\'Étage 1 !');
            } else if (player._gymBattle) {
              player._gymBattle = null;
              showScreen('game'); updateHUD();
              notify('💀 Défaite au Gym !');
              setMessage('💀 Votre Pokémon s\'est évanoui… Retentez le défi du Gym !');
            } else {
              showScreen('game'); updateHUD();
              setMessage(`${player.currentName} s'est évanoui… Vous vous réveillez.`);
            }
            player._winStreak = 0; // réinitialise le streak en cas de défaite
            // Farm auto continue si actif — reprend l'exploration automatiquement
            if (farmAutoOn) {
              if (farmAutoTimer) clearTimeout(farmAutoTimer);
              farmAutoTimer = setTimeout(scheduleFarmExplore, 1200);
            }
          }, 2000);
        }
        return;
      }
      (_hud('battle-log')).textContent=log;
      updateBattleHp(); updateHUD();
      battleBusy = false;
      setBattleTurn('player');
    }, 1000);
  }
}

// ── AUTO BATTLE ──
let autoBattleOn = false;
let autoBattleTimer = null;

// ── FARM AUTO (explore + combat automatique en boucle) ──
let farmAutoOn = false;
let farmAutoTimer = null;
const FARM_INTERVAL = 2200; // ms entre chaque exploration auto

function toggleFarmAuto() {
  if (!farmAutoOn && (player?.lastBossWave||0) < 1) {
    notify('🔒 Farm Auto débloqué après le 1er Boss de vague !');
    return;
  }
  farmAutoOn = !farmAutoOn;
  const btn = _hud('btn-farm-auto');
  if (farmAutoOn) {
    btn.style.background = 'linear-gradient(180deg,#ff9a3c,#cc5500)';
    btn.style.boxShadow  = '0 4px 0 #663300';
    btn.textContent = '🤖 FARM ON ●';
    setMessage('🤖 Mode FARM AUTO activé ! Exploration en boucle...');
    notify('🤖 FARM AUTO ON');
    scheduleFarmExplore();
  } else {
    btn.style.background = 'linear-gradient(180deg,#888,#555)';
    btn.style.boxShadow  = '0 4px 0 #222';
    btn.textContent = '🤖 FARM AUTO';
    if (farmAutoTimer) { clearTimeout(farmAutoTimer); farmAutoTimer = null; }
    // also stop auto battle if running
    autoBattleOn = false;
    if (autoBattleTimer) { clearTimeout(autoBattleTimer); autoBattleTimer = null; }
    const abBtn = _hud('btn-auto');
    if (abBtn) { abBtn.style.background='linear-gradient(180deg,#888,#555)'; abBtn.style.boxShadow='0 4px 0 #222'; abBtn.textContent='🤖 AUTO'; }
    notify('🤖 FARM AUTO OFF');
  }
}

function stopFarmAuto() {
  farmAutoOn = false;
  if (farmAutoTimer) { clearTimeout(farmAutoTimer); farmAutoTimer = null; }
  const btn = _hud('btn-farm-auto');
  if (btn) { btn.style.background='linear-gradient(180deg,#888,#555)'; btn.style.boxShadow='0 4px 0 #222'; btn.textContent='🤖 FARM AUTO'; }
}

function scheduleFarmExplore() {
  if (!farmAutoOn) return;
  farmAutoTimer = setTimeout(() => {
    if (!farmAutoOn || !player) return;
    // Si on est en combat, ne pas explorer — le combat auto prend le relais
    if (currentScreen === 'battle') { scheduleFarmExplore(); return; }
    // Si on n'est pas sur l'écran de jeu, stop
    if (currentScreen !== 'game') { scheduleFarmExplore(); return; }
    // Conserver l'ordre de passage : si le slot actif est K.O., corriger avant de vérifier les PV
    if (player.roster && player.roster.length > 0) {
      const curIdx = player.activeRosterIdx || 0;
      if ((player.roster[curIdx]?.hp || 0) <= 0) {
        const aliveIdx = player.roster.findIndex(p => p.hp > 0);
        if (aliveIdx >= 0) { player.activeRosterIdx = aliveIdx; syncPlayerFromActive(); }
      }
    }
    // Auto-repos si PV < 30% (basé sur le Pokémon actif, maintenant corrigé)
    const hpPct = player.hp / player.maxHp;
    if (hpPct < 0.30) {
      const now = Date.now();
      if (Date.now() - lastRestTime >= REST_COOLDOWN) {
        doRest();
        scheduleFarmExplore();
        return;
      }
    }
    doExplore();
    scheduleFarmExplore();
  }, FARM_INTERVAL);
}

function toggleAutoBattle() {
  autoBattleOn = !autoBattleOn;
  const btn = _hud('btn-auto');
  if (autoBattleOn) {
    btn.style.background = 'linear-gradient(180deg,#2dc653,#1a8035)';
    btn.style.boxShadow = '0 4px 0 #0c4019';
    btn.textContent = '🤖 AUTO ON';
    if (autoBattleTimer) clearTimeout(autoBattleTimer);
    autoBattleTimer = setTimeout(runAutoAction, 600);
  } else {
    btn.style.background = 'linear-gradient(180deg,#e63946,#9b1d23)';
    btn.style.boxShadow = '0 4px 0 #550f13';
    btn.textContent = '✋ MANUEL';
    if (autoBattleTimer) { clearTimeout(autoBattleTimer); autoBattleTimer = null; }
    // Rendre la main au joueur immédiatement si c'est son tour
    if (battleTurn === 'player' && !battleBusy) disableBattleButtons(false);
    setMessage('✋ Auto-combat désactivé — vous avez la main !');
  }
}

function stopAutoBattle() {
  autoBattleOn = false;
  if (autoBattleTimer) { clearTimeout(autoBattleTimer); autoBattleTimer = null; }
  const btn = _hud('btn-auto');
  if (btn) { btn.style.background = 'linear-gradient(180deg,#888,#555)'; btn.style.boxShadow = '0 4px 0 #222'; btn.textContent = '🤖 AUTO'; btn.style.boxShadow = '0 4px 0 #222'; }
  // Si farm auto toujours actif, reprendre l'exploration rapidement
  if (farmAutoOn) {
    if (farmAutoTimer) { clearTimeout(farmAutoTimer); farmAutoTimer = null; }
    farmAutoTimer = setTimeout(scheduleFarmExplore, 600);
  }
}

function runAutoAction() {
  // Arrêter si auto désactivé ou combat terminé
  if (!autoBattleOn || !enemy || !player || currentScreen !== 'battle') return;

  // Attendre si c'est le tour ennemi ou occupé (polling allongé pour réduire la charge CPU)
  if (battleTurn !== 'player' || battleBusy) {
    autoBattleTimer = setTimeout(runAutoAction, 500);
    return;
  }

  // Choisir l'action
  const hpPct = player.hp / player.maxHp;
  const hasPotions = (player.bag.potion||0)+(player.bag.superpotion||0)+(player.bag.hyperpotion||0)+(player.bag.maxrevif||0) > 0;
  if (hpPct < 0.25 && hasPotions) {
    battleAction('item');
  } else {
    const atkMult = getEffectiveness(player.moveElem||player.type, enemy.type);
    const magMult = getEffectiveness(player.mMoveElem||player.type, enemy.type);
    battleAction(magMult >= atkMult ? 'magic' : 'attack');
  }

  // Planifier le prochain coup (délai plus long pour laisser l'ennemi jouer)
  autoBattleTimer = setTimeout(runAutoAction, 1000);
}

function scheduleAutoAction() {
  if (!autoBattleOn) return;
  if (autoBattleTimer) clearTimeout(autoBattleTimer);
  autoBattleTimer = setTimeout(runAutoAction, 900);
}

function battleAction(action) {
  if (!enemy||!player) return;
  if (battleTurn !== 'player' || battleBusy) return;

  let log='';

  if (action==='flee') {
    // Fuite : vitesse joueur vs ennemi
    const fleeChance = Math.min(0.9, 0.35 + (player.spd - (enemy.spd||50)) / 200);
    if (Math.random()<fleeChance){ stopAutoBattle(); syncActiveFromPlayer(); showScreen('game'); setMessage('💨 Vous fuyez le combat !'); updateHUD(); return; }
    else log='💨 Impossible de fuir ! ';
    (_hud('battle-log')).textContent=log;
    setBattleTurn('enemy');
    return;
  } else if (action==='item') {
    const totalHeal = (player.bag.potion||0)+(player.bag.superpotion||0)+(player.bag.hyperpotion||0)+(player.bag.maxrevif||0);
    const totalPP   = (player.bag.elixir||0)+(player.bag.maxelixir||0);
    if (totalHeal > 0) {
      let heal=0, used='';
      if ((player.bag.maxrevif||0)>0 && player.hp < player.maxHp * 0.4){ heal=player.maxHp; player.bag.maxrevif--; used='Max Revif'; }
      else if ((player.bag.hyperpotion||0)>0){ heal=Math.round(player.maxHp*1.00); player.bag.hyperpotion--; used='Hyper Potion'; }
      else if ((player.bag.superpotion||0)>0){ heal=Math.round(player.maxHp*0.50); player.bag.superpotion--; used='Super Potion'; }
      else if ((player.bag.potion||0)>0){ heal=Math.round(player.maxHp*0.25); player.bag.potion--; used='Potion'; }
      else { heal=player.maxHp; player.bag.maxrevif--; used='Max Revif'; }
      player.hp = Math.min(player.maxHp, player.hp+heal);
      log=`🧪 ${used} utilisée sur ${player.currentName} ! +${heal} PV. `;
    } else if (totalPP > 0) {
      let used='', restore=0;
      if ((player.bag.maxelixir||0)>0){ player.bag.maxelixir--; used='Max Élixir'; restore=-1; }
      else { player.bag.elixir--; used='Élixir'; restore=10; }
      if (restore === -1) { player.moveUses=player.moveUsesMax||6; player.mMoveUses=player.mMoveUsesMax||4; }
      else { player.moveUses=Math.min(player.moveUsesMax||6,(player.moveUses||0)+restore); player.mMoveUses=Math.min(player.mMoveUsesMax||4,(player.mMoveUses||0)+restore); }
      log=`🧪 ${used} utilisé ! PP restaurés. `;
    } else { log='🧪 Aucun objet de soin disponible ! '; (_hud('battle-log')).textContent=log; return; }
    updateBattleHp(); updateHUD();
    (_hud('battle-log')).textContent=log;
    setBattleTurn('enemy');
    return;
  } else {
    let dmg=0;
    const _synDmg = applySynergyBonuses();
    if (action==='magic') {
      const atkType = player.mMoveElem || player.type;
      const mult = getEffectiveness(atkType, enemy.type);
      const effInfo = getEffLabel(mult);
      const base = Math.max(1, Math.round(player.magic * _synDmg.magicMult) + Math.floor(Math.random()*8) - Math.floor(enemy.def/2));
      dmg = Math.round(base * mult);
      player.mMoveUses = Math.max(0, (player.mMoveUses||0) - 1);
      if (player.mMoveUses === 0) player.mMoveUses = player.mMoveUsesMax || 4;
      playAttackAnim(player.animType, false);
      log=`✨ ${player.currentName} utilise ${player.mMove} (${atkType}) ! `;
      if (effInfo.label) log += effInfo.label + ' ';
      log += dmg > 0 ? `${dmg} dégâts.` : '';
      if (effInfo.label && effInfo.color && !_isMobile) { const _bl=_hud('battle-log'); if(_bl){_bl.style.color=effInfo.color; setTimeout(()=>{_bl.style.color='';},700);} }
    } else {
      const atkType = player.moveElem || player.type;
      const mult = getEffectiveness(atkType, enemy.type);
      const effInfo = getEffLabel(mult);
      const base = Math.max(1, Math.round(player.atk * _synDmg.atkMult) + Math.floor(Math.random()*6) - enemy.def);
      dmg = Math.round(base * mult);
      player.moveUses = Math.max(0, (player.moveUses||0) - 1);
      if (player.moveUses === 0) player.moveUses = player.moveUsesMax || 6;
      playAttackAnim(player.animType, false);
      log=`⚔ ${player.currentName} utilise ${player.move} (${atkType}) ! `;
      if (effInfo.label) log += effInfo.label + ' ';
      log += dmg > 0 ? `${dmg} dégâts.` : '';
      if (effInfo.label && effInfo.color && !_isMobile) { const _bl=_hud('battle-log'); if(_bl){_bl.style.color=effInfo.color; setTimeout(()=>{_bl.style.color='';},700);} }
    }
    enemy.hp -= dmg;
    if (dmg>0) hurtSprite('enemy-battle-img');
  }

  if (enemy.hp <= 0) {
    enemy.hp=0; updateBattleHp();
    const playerLv = player.level || 1;
    const enemyLv  = enemy.level  || 1;
    // XP proportionnel au niveau ennemi : fort = +XP, faible = -XP
    const lvRatio   = Math.max(0.2, Math.min(2.5, enemyLv / Math.max(1, playerLv)));
    // Bonus badge : +15% par badge (max ×2.2 avec 8 badges, était ×5)
    const badgeCount  = (player.badges||[]).length;
    const badgeBonus  = 1 + badgeCount * 0.15;
    // Streak de victoires consécutives (réinitialisé à la défaite ou au repos)
    player._winStreak = (player._winStreak||0) + 1;
    const streakBonus = player._bossBattle ? 1.0 : Math.min(2.0, 1 + Math.floor(player._winStreak / 5) * 0.1);
    // XP = niveau ennemi × 20 (indépendant de l'espèce)
    const _syn        = applySynergyBonuses();
    const xpG         = Math.round(enemyLv * 20 * lvRatio * badgeBonus * getXpMultiplier() * _syn.xpMult);
    const goldG       = Math.round((enemy.gold + Math.floor(Math.random() * Math.max(1, enemy.gold * 0.4))) * getGoldMultiplier() * streakBonus * _syn.goldMult);
    // Les replays de boss sont de l'entraînement pur : aucune récompense
    if (!player._bossBattle?.isReplay) { player.xp+=xpG; player.gold+=goldG; }
    if (player._winStreak > 0 && player._winStreak % 5 === 0 && !player._bossBattle)
      notify(`🔥 Streak ×${player._winStreak} — bonus or ×${streakBonus.toFixed(1)} !`);
    // XP pour tout le roster (100% pour tous) + level-up silencieux
    if (player.roster) {
      const leveledNames = [];
      player.roster.forEach((p,i)=>{
        if(i!==(player.activeRosterIdx||0) && p.hp>0){
          p.xp=(p.xp||0)+xpG;
          if (checkRosterLevelUp(p)) leveledNames.push(`${p.currentName||p.name} Niv.${p.level}`);
        }
      });
      // Une seule notif groupée si plusieurs level-ups (évite le spam)
      if (leveledNames.length === 1) notify(`⬆ ${leveledNames[0]} ! (banc)`);
      else if (leveledNames.length > 1) notify(`⬆ ${leveledNames.length} Pokémon ont monté de niveau ! (banc)`);
    }
    // Compteur kills par zone
    if (!player.zoneKills) player.zoneKills = {};
    const curZ = player.currentZone || 'bourg-palette';
    player.zoneKills[curZ] = (player.zoneKills[curZ]||0)+1;
    const kills = player.zoneKills[curZ];
    const killNeeded = ZONE_KILL_NEEDED;
    const killMsg = kills < killNeeded ? ` (${kills}/${killNeeded} Pokémon vaincus ici)` : kills===killNeeded ? ` 🔓 Zone débloquée ! Vous pouvez voyager !` : '';
    (_hud('battle-log')).textContent = `🏆 ${player.currentName} a vaincu ${enemy.name} ! +${xpG} XP +${goldG}₽ !${killMsg}`;
    disableBattleButtons(true); checkLevelUp();
    // Trainer XP: 5 per kill
    addTrainerXP(5);
    // Affinité +1 pour le pokemon actif
    if (player.roster?.[player.activeRosterIdx||0]) addAffinity(player.roster[player.activeRosterIdx||0], 1);
    // Stats globales — batch en 1 appel pour éviter 3× updateDailyProgress
    updateGlobalStatsBatch({ kills:1, battles:1, earn_gold: goldG });
    // Shards from enemy type
    if (enemy.type) awardShardOnKill(enemy.type);
    // Random event trigger
    triggerRandomEvent();
    // Auto-save silencieux toutes les 5 victoires
    _autoSaveKillCounter = (_autoSaveKillCounter||0) + 1;
    if (_autoSaveKillCounter % 5 === 0) _silentSave();

    // Record kill for wave system
    if (!player._bossBattle) recordKill();

    // Prestige Legendary victory
    if (player._prestigeLegBattle) {
      disableBattleButtons(true);
      handlePrestigeLegVictory(enemy);
      setTimeout(()=>{ stopAutoBattle(); disableBattleButtons(false); syncActiveFromPlayer(); openCatchMenu(); }, 1800);
      return;
    }

    // World Boss victory
    if (player._worldBossBattle) {
      disableBattleButtons(true);
      handleWorldBossVictory(enemy);
      setTimeout(()=>{ stopAutoBattle(); disableBattleButtons(false); syncActiveFromPlayer(); showScreen('game'); updateHUD(); }, 1800);
      return;
    }

    // Boss battle victory
    if (player._bossBattle) {
      const bossWave = (player._bossBattle && player._bossBattle.wave) ? player._bossBattle.wave : getWaveState().wave;
      const wasReplay = !!player._bossBattle.isReplay;
      player._bossBattle = null;
      if (!wasReplay) {
        // Boss classique : avancer lastBossWave et réinitialiser le compteur de kills
        // (empêche l'enchaînement immédiat de plusieurs boss)
        if (!player.lastBossWave || player.lastBossWave < bossWave) player.lastBossWave = bossWave;
        // Forcer totalKills à bossWave × 10 pour repartir de 0/10
        player.totalKills = bossWave * KILLS_PER_WAVE;
      }
      updateKillHUD();
      if (wasReplay) {
        updateHUD();
        notify(`🔁 Boss Vague ${bossWave} rejoué — entraînement accompli !`);
        setMessage(`🔁 Boss Vague ${bossWave} rejoué — aucune récompense (entraînement pur).`);
      } else {
        const bonusGold = Math.round(200 * bossWave * getPrestigeMults().boss);
        player.gold += bonusGold;
        updateHUD();
        notify(`🏆 Boss Vague ${bossWave} vaincu ! +${bonusGold}₽`);
        setMessage(`🏆 Boss vaincu ! Vague ${bossWave+1} commence — difficulté +15% ! +${bonusGold}₽`);
        updateGlobalStats('boss_kills');
        gainSkillPoints(3 + bossWave);
        checkAchievements();
        _silentSave();
      }
      setTimeout(()=>{ stopAutoBattle(); disableBattleButtons(false); syncActiveFromPlayer(); showScreen('game'); updateHUD(); updateKillHUD(); }, 1800);
      return;
    }

    // Gym battle chain
    if (player._gymBattle && handleGymVictory()) return;

    // Trial battle victory — award TP, return to trial screen
    if (player._trialBattle) {
      const trialTp = player._trialBattleTp || 20;
      player._trialBattle = false;
      player._trialBattleTp = 0;
      player.trialPoints = (player.trialPoints||0) + trialTp;
      player.trialWins   = (player.trialWins||0) + 1;
      setTimeout(()=>{
        stopAutoBattle(); disableBattleButtons(false); syncActiveFromPlayer();
        notify(`⚡ Victoire Trial ! +${trialTp} PT — Total : ${player.trialPoints} PT`);
        saveGame(); showScreen('trial'); updateHUD();
      }, 1800);
      return;
    }

    // Tour mode: handle floor completion — ONLY if explicitly in a tour battle
    if (player._tourBattle && tourState) {
      player._tourBattle = false;
      const completedFloor = tourState.floor;
      const isReplay = !!tourState.isReplay;
      // Only advance tourFloor if this is a new record
      if (!isReplay && completedFloor > (player.tourFloor || 0)) {
        player.tourFloor = completedFloor;
      }
      const isRewardFloor = completedFloor % 10 === 0;
      setTimeout(()=>{
        stopAutoBattle();
        disableBattleButtons(false);
        syncActiveFromPlayer();
        showScreen('game');
        updateHUD();
        if (isRewardFloor && !isReplay) {
          showTourReward(completedFloor);
        } else {
          const replayTag = isReplay ? ' (rejoué)' : '';
          setMessage(`🏆 Étage ${completedFloor} de la Tour complété${replayTag} !`);
          notify(`🏆 Étage ${completedFloor} ✓${replayTag}`);
          showTourMode();
        }
      }, 1800);
      return;
    }

    setTimeout(()=>{ stopAutoBattle(); disableBattleButtons(false); syncActiveFromPlayer(); showScreen('game'); updateHUD(); setMessage(`${player.currentName} a mis K.O. le ${enemy.name} !${killMsg}`); }, 1800);
    return;
  }

  // Determine turn order by speed
  (_hud('battle-log')).textContent=log;
  updateBattleHp(); updateHUD();
  // Refresh attack buttons — seulement si le contenu a réellement changé
  const _btnAtk = _hud('btn-attack'); const _btnMag = _hud('btn-magic');
  const _atkH = `⚔ ${player.move} <span class="atk-elem-badge elem-${player.moveElem||player.type}">${player.moveElem||player.type}</span>`;
  const _magH = `✨ ${player.mMove} <span class="atk-elem-badge elem-${player.mMoveElem||player.type}">${player.mMoveElem||player.type}</span>`;
  if (_btnAtk && _btnAtk._cachedHtml !== _atkH) { _btnAtk.innerHTML = _atkH; _btnAtk._cachedHtml = _atkH; }
  if (_btnMag && _btnMag._cachedHtml !== _magH) { _btnMag.innerHTML = _magH; _btnMag._cachedHtml = _magH; }

  // Player attacked — now check if enemy is faster for next turn or just pass to enemy
  battleBusy = true;
  disableBattleButtons(true);
  setBattleTurn('enemy');
}

// ── ATTACK ANIMATIONS ──
// Particules d'attaque — 0 sur mobile (trop coûteux), 5 sur desktop
const _isMobile = window.innerWidth <= 768;
function playAttackAnim(type, fromEnemy) {
  if (_isMobile) return; // skip sur mobile — économise ~12 DOM ops/attaque
  const layer = _hud('anim-layer') || document.getElementById('anim-layer');
  layer.innerHTML = '';
  const configs = {
    fire:   { count:5, colors:['#ff4500','#ff8c00','#ffd700'], shape:'●', animName:'flameAnim',   dur:'0.7s' },
    water:  { count:5, colors:['#4cc9f0','#00b4d8','#90e0ef'], shape:'◉', animName:'waterAnim',   dur:'0.6s' },
    leaf:   { count:5, colors:['#2dc653','#80b918','#38b000'], shape:'♦', animName:'leafAnim',    dur:'0.7s' },
    normal: { count:4, colors:['#ffffff','#ffd60a'],           shape:'★', animName:'normalAnim',  dur:'0.5s' },
    thunder:{ count:4, colors:['#ffd60a','#ffa500'],           shape:'⚡', animName:'thunderAnim', dur:'0.4s' },
  };
  const cfg = configs[type] || configs.normal;
  const frag = document.createDocumentFragment(); // 1 seul reflow au lieu de N
  for (let i = 0; i < cfg.count; i++) {
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;font-size:${16+Math.random()*12}px;color:${cfg.colors[Math.floor(Math.random()*cfg.colors.length)]};left:${fromEnemy?60+Math.random()*15:20+Math.random()*15}%;top:${30+Math.random()*40}%;animation:${cfg.animName} ${cfg.dur} ease ${i*0.06}s forwards;pointer-events:none;z-index:25`;
    el.textContent = cfg.shape;
    frag.appendChild(el);
  }
  layer.appendChild(frag);
  setTimeout(()=>layer.innerHTML='', 750);
}

// hurtSprite sans forced layout reflow (void offsetWidth supprimé)
// On alterne entre deux classes identiques pour redémarrer l'anim sans reflow
let _hurtToggle = false;
function hurtSprite(id) {
  const el = _hud(id) || document.getElementById(id);
  if (!el) return;
  _hurtToggle = !_hurtToggle;
  el.classList.remove('sprite-hurt-a','sprite-hurt-b');
  requestAnimationFrame(() => {
    el.classList.add(_hurtToggle ? 'sprite-hurt-a' : 'sprite-hurt-b');
  });
}

// Cache des boutons de combat — querySelectorAll évité à chaque turn
let _battleBtnsCache = null;
function disableBattleButtons(dis){
  if (!_battleBtnsCache) _battleBtnsCache = Array.from(document.querySelectorAll('#battle-actions .btn'));
  for (let i = 0; i < _battleBtnsCache.length; i++) {
    const b = _battleBtnsCache[i];
    if (b.id === 'btn-auto') continue;
    b.disabled = dis;
  }
}

// ── CATCH MENU ──
function openCatchMenu() {
  if (!player||!enemy) return;
  if (enemy.isBoss || player._bossBattle || player._worldBossBattle) {
    notify('⛔ Les Boss ne peuvent pas être capturés !');
    return;
  }
  const list = document.getElementById('catch-ball-list');
  list.innerHTML = '';
  const ballTypes = ['pokeball','superball','hyperball','masterball'];
  let hasBalls = false;
  ballTypes.forEach(b => {
    const qty = player.balls[b]||0;
    if (qty<=0) return;
    hasBalls = true;
    const item = SHOP_ITEMS.find(i=>i.id===b);
    if (!item) return;
    const div = document.createElement('div');
    div.className='shop-item';
    div.innerHTML=`<img src="${item.img}" style="width:32px;height:32px;image-rendering:pixelated"><div class="shop-item-info"><div class="shop-item-name">${item.name}</div><div class="shop-item-desc">${item.desc} · En stock: ${qty}</div></div><button class="shop-item-btn" onclick="throwBall('${b}')">Lancer</button>`;
    list.appendChild(div);
  });
  if (!hasBalls) { list.innerHTML='<div style="font-family:\'Press Start 2P\',monospace;font-size:.5rem;color:rgba(255,255,255,.6);text-align:center;padding:1rem">Aucune Poké Ball !</div>'; }
  battleBusy = true; // bloque l'auto-combat pendant le menu de capture
  document.getElementById('catch-menu').style.display='flex';
}
function closeCatchMenu(){
  document.getElementById('catch-menu').style.display='none';
  // Libère le verrou uniquement si le combat est encore actif (pas déjà résolu)
  if (enemy && player && player.hp > 0) battleBusy = false;
}

function throwBall(ballId) {
  if (!enemy || !player) { document.getElementById('catch-menu').style.display='none'; battleBusy=false; return; }
  closeCatchMenu();
  battleBusy = true; // re-verrouille jusqu'à la fin de l'animation de la ball
  if (!player.balls[ballId]||player.balls[ballId]<=0){ notify('Plus de '+ballId+' !'); battleBusy=false; return; }
  player.balls[ballId]--;
  const item = SHOP_ITEMS.find(i=>i.id===ballId);
  const ballImg = item ? item.img : '';

  disableBattleButtons(true);
  (_hud('battle-log')).textContent = `⚽ Vous lancez une ${item.name} sur ${enemy.name} !`;

  // Calcul taux de capture — Sanctuaire Prestige utilise un taux boosté
  const catchRate = enemy._prestigeCatchRate !== undefined ? enemy._prestigeCatchRate : getEnemyCatchRate(enemy.id || 0);
  // Formule officielle simplifiée : facteur PV (1/3 pleine vie → 1 presque KO)
  const hpFactor = (3 * (enemy.maxHp||1) - 2 * Math.max(0,enemy.hp)) / (3 * (enemy.maxHp||1));
  const ballBonus = item.catchRate;
  let catchChance = Math.min(0.95, (catchRate / 255) * hpFactor * 1.5 * ballBonus);
  if (item.catchRate >= 999) catchChance = 1.0;
  // Bonus compétence capture
  if (player._catchBonus) catchChance = Math.min(0.95, catchChance + player._catchBonus);

  // Afficher animation
  const catchDiv = document.getElementById('catch-display');
  const catchBall = document.getElementById('catch-ball-anim');
  const catchResult = document.getElementById('catch-result');
  catchBall.style.backgroundImage=`url(${ballImg})`;
  catchBall.textContent='';
  catchBall.style.cssText=`width:48px;height:48px;background:url(${ballImg}) center/contain no-repeat`;
  catchResult.textContent='';
  catchDiv.classList.add('active');

  setTimeout(()=>{
    const success = Math.random() < catchChance;
    if (success) {
      catchBall.style.animation='pokeballCatch 1s ease forwards';
      catchResult.textContent = `✓ ${enemy.name} a été capturé !`;
      catchResult.style.color='var(--green)';
      const _capName = enemy.name, _capShiny = enemy.isShiny||false;
      const _capCleanName = enemy._prestigeLegData?.name || enemy.name;
      addCapturedToRoster({ name:_capCleanName, id:enemy.id, type:enemy.type, hp:enemy.maxHp, maxHp:enemy.maxHp, level:enemy.level||1, isShiny:_capShiny });
      updateGlobalStats('catches', 1);
      player._pendingPrestigeCatch = null;
      setTimeout(()=>{
        catchDiv.classList.remove('active');
        stopAutoBattle();
        syncActiveFromPlayer();
        battleBusy = false;
        enemy = null;
        disableBattleButtons(false);
        showScreen('game');
        updateHUD();
        const shinyCapture = _capShiny ? ' ✨ Et en plus il est SHINY !' : '';
        setMessage(`🎉 Félicitations ! Vous avez capturé ${_capCleanName} ! (${Math.round(catchChance*100)}% de chance)${shinyCapture}`);
        notify(`${_capCleanName} capturé !${_capShiny?' ✨':''}`);
      }, 1800);
    } else {
      catchBall.style.animation='captureFail 1s ease forwards';
      catchResult.textContent = `✗ ${enemy.name} s'est échappé ! (${Math.round(catchChance*100)}%)`;
      catchResult.style.color='var(--red)';
      // Enemy counterattack after failed catch
      const eDmg = enemy._isPrestigeLeg ? 0 : Math.max(1, enemy.atk+Math.floor(Math.random()*5)-Math.floor(player.def/2));
      if (eDmg > 0) player.hp -= eDmg;
      setTimeout(()=>{
        catchDiv.classList.remove('active');
        disableBattleButtons(false);
        if (player.hp<=0){
          player.hp=Math.floor(player.maxHp*.2);
          showScreen('game'); updateHUD(); setMessage(`${enemy.name} s'est échappé et vous a mis K.O. !`);
        } else if (enemy._isPrestigeLeg) {
          // Légendaire prestige : relancer le menu capture tant que le joueur a des balls
          const hasBalls = Object.values(player.balls||{}).some(v=>v>0);
          if (hasBalls) {
            (_hud('battle-log')).textContent = `🏛️ ${enemy.name} résiste ! Réessayez !`;
            openCatchMenu();
          } else {
            notify('Plus de Poké Balls ! Le légendaire s\'échappe...');
            battleBusy = false;
            player._pendingPrestigeCatch = null;
            enemy = null;
            showScreen('game'); updateHUD();
            setMessage('🏛️ Pas de balls — le légendaire s\'est enfui. Revenez mieux équipé !');
          }
        } else {
          (_hud('battle-log')).textContent=`${enemy.name} s'échappe et attaque pour ${eDmg} dégâts !`;
          updateBattleHp(); updateHUD();
          battleBusy = false;
          setBattleTurn('player');
        }
      }, 1500);
    }
  }, 800);
}

// ══════════════════════════════════════════
// LEVEL UP + EVOLUTION
// ══════════════════════════════════════════

// Level-up silencieux pour les Pokémon en banc (ils gagnent 50% d'XP)
// Retourne true si au moins un niveau a été gagné (pour notifications groupées)
function checkRosterLevelUp(p) {
  if (!p || !p.level) return false;
  if (!p.xpNext) p.xpNext = xpForLevel(p.level);
  let leveled = false;
  while ((p.xp||0) >= p.xpNext) {
    if (p.level >= 500) { p.xp = 0; break; }
    p.xp -= p.xpNext;
    p.level++;
    p.xpNext = xpForLevel(p.level);
    p.maxHp  = (p.maxHp||50) + 10;
    p.hp     = Math.min(p.maxHp, (p.hp||0) + 10);
    p.maxMp  = (p.maxMp||50) + 8;
    p.mp     = Math.min(p.maxMp, (p.mp||0) + 8);
    p.atk    = (p.atk||0) + 3;
    p.def    = (p.def||0) + 1;
    p.magic  = (p.magic||0) + 2;
    p.spd    = (p.spd||0) + 1;
    if (p.spAtk !== undefined) p.spAtk += 2;
    if (p.spDef !== undefined) p.spDef += 1;
    leveled = true;
  }
  if (leveled) {
    // Vérifier les évolutions pour ce Pokémon en banc (silencieux)
    let chain = EVO_CHAINS[p.currentSpriteId || p.spriteId];
    while (chain && p.level >= chain.level) {
      p.currentSpriteId = chain.next;
      p.currentName     = chain.name;
      p.maxHp += 20; p.hp = Math.min(p.maxHp, p.hp + 20);
      p.maxMp  = (p.maxMp||50) + 10; p.mp = Math.min(p.maxMp, p.mp + 10);
      p.atk += 5; p.def += 4; p.magic += 4;
      chain = EVO_CHAINS[p.currentSpriteId];
    }
    // Pas de notify() ici — évite le spam pendant le farming
    // La notif groupée est gérée par l'appelant
  }
  return leveled;
}

function checkLevelUp() {
  while (player.xp >= player.xpNext) {
    if (player.level >= 500) { player.xp = 0; break; }
    player.xp -= player.xpNext;
    player.level++;
    // Courbe adoucie : +20% par niveau au lieu de +45%
    // Au niveau 50 ça fait ~3800 XP au lieu de ~380000 XP
    player.xpNext = xpForLevel(player.level);
    player.maxHp += 10; player.hp = player.maxHp;
    player.maxMp += 8;  player.mp = player.maxMp;
    player.atk+=3; player.def+=1; player.magic+=2; player.spd+=1;
    if (player.spAtk !== undefined) player.spAtk += 2;
    if (player.spDef !== undefined) player.spDef += 2;
    player.moveUses = player.moveUsesMax || 6;
    player.mMoveUses = player.mMoveUsesMax || 4;
    syncActiveFromPlayer();
    notify(`⬆ Niv.${player.level} ! +10PV +3ATQ +1DEF +2Mag +1Vit`);
    setMessage(`🌟 ${player.currentName} passe au Niveau ${player.level} ! ❤️+10PV  ⚔️+3ATQ  🛡️+1DEF  ✨+2Mag  ⚡+1Vit`);
    updateGlobalStats('level_ups');
    checkAchievements();
    const lvlMoves = (LEVEL_UP_MOVES[player.type] || LEVEL_UP_MOVES['Normal']).filter(m => m.lv === player.level && MOVES_DB[m.move]);
    if (lvlMoves.length > 0) {
      setTimeout(()=> notify(`📚 ${player.currentName} peut apprendre ${lvlMoves.map(m=>m.move).join(', ')} !`), 1200);
    }
    checkEvolution();
  }
  syncActiveFromPlayer();
}

function checkEvolution() {
  const chain = EVO_CHAINS[player.currentSpriteId];
  if (chain && player.level >= chain.level) {
    triggerEvolution(chain);
  }
}

// Appliqué au chargement d'une sauvegarde : si le Pokémon a passé
// son (ses) seuil(s) d'évolution sans déclencher d'animation, on corrige
// en silence pour éviter qu'un Salamèche niveau 20 reste Salamèche.
function checkEvolutionOnLoad() {
  if (!player) return;
  let evolved = false;
  let chain = EVO_CHAINS[player.currentSpriteId];
  while (chain && player.level >= chain.level) {
    player.currentSpriteId = chain.next;
    player.currentName = chain.name;
    player.maxHp += 20;
    player.hp = Math.min(player.maxHp, player.hp + 20);
    player.maxMp = (player.maxMp||60) + 10;
    player.mp  = Math.min(player.maxMp, (player.mp||0) + 10);
    player.atk += 5; player.def += 4; player.magic += 4;
    evolved = true;
    chain = EVO_CHAINS[player.currentSpriteId]; // check stade suivant
  }
  if (evolved) {
    syncActiveFromPlayer();
    updateHUD();
    notify(`🌟 ${player.currentName} — évolution appliquée !`);
    setMessage(`🌟 ${player.currentName} avait dépassé son niveau d\'évolution ! Évolution appliquée automatiquement.`);
  }
}

function triggerEvolution(chain) {
  const oldName = player.currentName;
  player.currentSpriteId = chain.next;
  player.currentName = chain.name;
  player.maxHp += 20; player.hp = player.maxHp;
  player.maxMp += 10; player.mp = player.maxMp;
  player.atk+=5; player.def+=4; player.magic+=4;
  syncActiveFromPlayer();

  const evoScreen = document.getElementById('evo-screen');
  document.getElementById('evo-sprite').src = SPRITE_FRONT(chain.next);
  document.getElementById('evo-text').textContent = `${oldName} évolue\nen ${chain.name} !`;
  evoScreen.classList.add('active');
  evoScreen.style.display='flex';
  notify(`🌟 ${oldName} → ${chain.name} !`);
}

function closeEvo() {
  const evoScreen = document.getElementById('evo-screen');
  evoScreen.classList.remove('active');
  evoScreen.style.display='none';
  updateHUD();
  if (player.currentSpriteId) {
    document.getElementById('player-name-hud').textContent = `${player.currentName} de ${player.name} ✦ Niv.${player.level}`;
  }
}

// ══════════════════════════════════════════
// SPECIAL ITEMS — Gemme Éclat & Orbes Trial
// ══════════════════════════════════════════
function useBagSpecial(itemId) {
  if (itemId === 'shiny-gem') useShinyGem();
  else if (itemId.startsWith('orb-')) useOrb(itemId);
}

function useShinyGem() {
  if (!player || (player.bag['shiny-gem']||0) < 1) return;
  const roster = player.roster || [];
  if (roster.length === 0) { notify('Aucun Pokémon dans l\'équipe !'); return; }
  const nonShiny = roster.filter(p => !p.isShiny);
  if (nonShiny.length === 0) { notify('Tous vos Pokémon sont déjà Shiny !'); return; }

  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center';
  const items = nonShiny.map(p => {
    const sid = p.currentSpriteId || p.spriteId;
    return `<div onclick="_applyGemToIdx(${roster.indexOf(p)},this)" style="cursor:pointer;background:rgba(255,255,255,.05);border:2px solid rgba(255,255,255,.15);border-radius:12px;padding:.7rem;display:flex;align-items:center;gap:.6rem;transition:border-color .2s" onmouseover="this.style.borderColor='#ffd700'" onmouseout="this.style.borderColor='rgba(255,255,255,.15)'">
      <img src="${SPRITE_FRONT(sid)}" style="width:52px;height:52px;image-rendering:pixelated"/>
      <div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.45rem;color:#ffd700">${p.currentName||p.name}</div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.32rem;color:rgba(255,255,255,.5)">Niv.${p.level} · ${p.type}</div>
      </div>
    </div>`;
  }).join('');
  modal.innerHTML = `<div style="background:rgba(10,10,30,.98);border:3px solid #ffd700;border-radius:16px;padding:1.5rem;width:min(360px,94vw);max-height:85vh;overflow-y:auto">
    <div style="font-family:'Press Start 2P',monospace;font-size:.6rem;color:#ffd700;text-align:center;margin-bottom:1rem">✨ GEMME ÉCLAT<br><span style="font-size:.38rem;color:rgba(255,255,255,.5)">Choisissez un Pokémon</span></div>
    <div style="display:flex;flex-direction:column;gap:.5rem">${items}</div>
    <button onclick="this.closest('div[style*=fixed]').remove()" style="margin-top:.8rem;width:100%;padding:.5rem;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);border-radius:8px;color:#fff;cursor:pointer;font-family:'Press Start 2P',monospace;font-size:.38rem">✗ Annuler</button>
  </div>`;
  document.body.appendChild(modal);
  window._applyGemToIdx = (idx, el) => {
    const p = player.roster[idx];
    if (!p || p.isShiny) return;
    p.isShiny = true;
    applyShinyBoost(p);
    player.shinyCount = (player.shinyCount||0) + 1;
    player.bag['shiny-gem']--;
    modal.remove();
    notify(`✨ ${p.currentName||p.name} est maintenant SHINY !`);
    saveGame();
    renderInventory();
  };
}

// ── TRIAL MODE — Orbes légendaires ──
const ORB_POOLS = {
  'orb-bird':    [{id:144,n:'Artikodin',t:'Glace/Vol'},{id:145,n:'Électhor',t:'Électrik/Vol'},{id:146,n:'Sulfura',t:'Feu/Vol'}],
  'orb-beast':   [{id:243,n:'Raikou',t:'Électrik'},{id:244,n:'Entei',t:'Feu'},{id:245,n:'Suicune',t:'Eau'}],
  'orb-golem':   [{id:377,n:'Regirock',t:'Roche'},{id:378,n:'Regice',t:'Glace'},{id:379,n:'Registeel',t:'Acier'}],
  'orb-dragon':  [{id:380,n:'Latias',t:'Dragon/Psy'},{id:381,n:'Latios',t:'Dragon/Psy'},{id:384,n:'Rayquaza',t:'Dragon/Vol'}],
  'orb-space':   [{id:483,n:'Dialga',t:'Acier/Dragon'},{id:484,n:'Palkia',t:'Eau/Dragon'},{id:487,n:'Giratina',t:'Spectre/Dragon'}],
  'orb-mega':    [{id:150,n:'Mewtwo',t:'Psy'},{id:382,n:'Kyogre',t:'Eau'},{id:383,n:'Groudon',t:'Sol'}],
  'orb-ancient': [{id:800,n:'Necrozma',t:'Psy'},{id:792,n:'Lunala',t:'Psy/Spectre'},{id:791,n:'Solgaleo',t:'Acier/Psy'}],
  'orb-ultra':   [{id:888,n:'Zacian',t:'Fée'},{id:889,n:'Zamazenta',t:'Combat'},{id:898,n:'Calyrex',t:'Psy/Glace'}],
};

function useOrb(orbId) {
  if (!player || (player.bag[orbId]||0) < 1) return;
  const pool = ORB_POOLS[orbId];
  if (!pool) return;
  const pick = pool[Math.floor(Math.random()*pool.length)];
  player.bag[orbId]--;
  notify(`⚡ L'orbe résonne… ${pick.n} apparaît !`);
  saveGame();
  // Build legendary enemy and start battle
  const legendLvl = Math.max(50, (player.trainerLevel||1) * 5);
  const legendScale = 1 + legendLvl * 0.12;
  const legendEnemy = {
    name: pick.n,
    id: pick.id,
    type: pick.t.includes('/') ? pick.t.split('/')[0] : pick.t,
    dualType: pick.t,
    hp: Math.round(120 * legendScale),
    maxHp: Math.round(120 * legendScale),
    atk: Math.round(28 * legendScale),
    def: Math.round(22 * legendScale),
    spd: Math.round(100 * legendScale * 0.4),
    magic: Math.round(25 * legendScale),
    level: legendLvl,
    xp: 300,
    gold: 500,
    isLegendary: true,
    capturable: true,
  };
  setTimeout(() => startBattle(legendEnemy), 600);
}

// ══════════════════════════════════════════
// INVENTORY
// ══════════════════════════════════════════
function renderInventory() {
  if (!player) return;
  // BAG
  const grid = document.getElementById('item-grid');
  const allItems = [];
  // Potions & soins
  const potionKeys = ['potion','superpotion','hyperpotion','maxrevif'];
  potionKeys.forEach(k=>{ if ((player.bag[k]||0)>0) allItems.push({key:k,qty:player.bag[k]}); });
  // Soins de statut
  const statusKeys = ['antidote','paralysoin','réveil','brulsoins','antidegel','totalsoins'];
  statusKeys.forEach(k=>{ if ((player.bag[k]||0)>0) allItems.push({key:k,qty:player.bag[k]}); });
  // PP
  const ppKeys = ['elixir','maxelixir'];
  ppKeys.forEach(k=>{ if ((player.bag[k]||0)>0) allItems.push({key:k,qty:player.bag[k]}); });
  // Balls
  const ballKeys = ['pokeball','superball','hyperball','masterball'];
  ballKeys.forEach(k=>{ if ((player.balls[k]||0)>0) allItems.push({key:k,qty:player.balls[k]}); });
  // CTs
  const ctKeys = Object.entries(player.ctBag||{}).filter(([,qty])=>qty>0);
  ctKeys.forEach(([id, qty]) => {
    const ct = CT_LIST.find(c=>c.id===id);
    if (ct) allItems.push({key:id, qty, customName:ct.name, customImg:ct.img});
  });
  // Starting items
  if (player.items) player.items.forEach(i=>{ if (i.q>0) allItems.push({key:i.img, qty:i.q, customName:i.n}); });
  // Special items (shiny-gem, orbs)
  const specialKeys = ['shiny-gem','orb-bird','orb-beast','orb-golem','orb-dragon','orb-space','orb-mega','orb-ancient','orb-ultra'];
  specialKeys.forEach(k=>{ if ((player.bag[k]||0)>0) allItems.push({key:k, qty:player.bag[k], usable:true}); });

  if (allItems.length===0) { grid.innerHTML='<div style="color:rgba(255,255,255,.4);font-size:.8rem">Sac vide…</div>'; return; }

  grid.innerHTML = allItems.map(({key,qty,customName,customImg,usable})=>{
    const d = ITEM_DISPLAY[key]||{ name:customName||key, img:customImg||'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png' };
    const useBtn = usable ? `<button onclick="useBagSpecial('${key}')" style="font-size:.35rem;padding:.2rem .5rem;margin-top:.2rem;background:var(--yellow);color:#000;border:none;border-radius:4px;cursor:pointer;font-family:'Press Start 2P',monospace">UTILISER</button>` : '';
    return `<div class="item-card" style="flex-direction:column;align-items:center;gap:.2rem"><img src="${customImg||d.img}" alt="${d.name}"/><div class="item-card-name">${customName||d.name}</div><div class="item-card-qty">x${qty}</div>${useBtn}</div>`;
  }).join('');
}

// ══════════════════════════════════════════
// TEAM
// ══════════════════════════════════════════
let selectedBoxIdx = null;
let teamDetailPokeSource = null; // 'roster' or 'box'
let teamDetailPokeIdx = null;

function switchTeamTab(tab) {
  document.getElementById('team-box-panel').style.display = tab === 'box' ? 'block' : 'none';
  document.getElementById('team-detail-panel').style.display = tab === 'detail' ? 'flex' : 'none';
  document.getElementById('tab-box').classList.toggle('active-tab', tab === 'box');
  document.getElementById('tab-detail').classList.toggle('active-tab', tab === 'detail');
  if (tab === 'box') {
    document.getElementById('tab-box').style.color = 'var(--yellow)';
    document.getElementById('tab-box').style.borderBottom = '2px solid var(--yellow)';
    document.getElementById('tab-detail').style.color = 'rgba(255,255,255,.4)';
    document.getElementById('tab-detail').style.borderBottom = 'none';
  } else {
    document.getElementById('tab-detail').style.color = 'var(--yellow)';
    document.getElementById('tab-detail').style.borderBottom = '2px solid var(--yellow)';
    document.getElementById('tab-box').style.color = 'rgba(255,255,255,.4)';
    document.getElementById('tab-box').style.borderBottom = 'none';
  }
}

function renderTeam() {
  if (!player) return;
  if (!player.box) player.box = [];
  
  // Update count label
  const countLabel = document.getElementById('team-count-label');
  if (countLabel) countLabel.textContent = `(${player.roster.length}/6)`;

  // ── LEFT PANEL: Active Team ──
  const container = document.getElementById('team-display');
  const allPoke = player.roster && player.roster.length > 0
    ? player.roster.map((p,i)=>({ ...p, isMain: i === (player.activeRosterIdx||0), fromRoster:true, rosterIdx:i }))
    : [];
  
  if (allPoke.length === 0) {
    container.innerHTML = '<div style="color:rgba(255,255,255,.4);font-family:\'Press Start 2P\',monospace;font-size:.45rem;text-align:center;padding:2rem">Équipe vide</div>';
  } else {
    container.innerHTML = allPoke.map(p => {
      const spriteId = p.currentSpriteId || p.spriteId || p.id;
      const imgSrc = p.isShiny ? SPRITE_SHINY(spriteId) : SPRITE_FRONT(spriteId);
      const dual = p.dualType || getPokeType(spriteId, p.type);
      const hpPct = Math.max(0, Math.round((p.hp/p.maxHp)*100));
      const isActive = p.isMain;
      const isFainted = p.hp <= 0;
      const hpColor = hpPct > 50 ? 'linear-gradient(90deg,#2dc653,#06d6a0)' : hpPct > 20 ? 'linear-gradient(90deg,#ffd60a,#ff9a3c)' : 'linear-gradient(90deg,#e63946,#ff6b9d)';
      const typeBadges = dual.includes('/')
        ? dual.split('/').map(t=>`<span class="poke-type-badge type-${t}" style="font-size:.28rem;padding:.12rem .35rem">${t}</span>`).join('')
        : `<span class="poke-type-badge type-${dual}" style="font-size:.28rem;padding:.12rem .35rem">${dual}</span>`;
      return `
      <div class="team-row-card${isActive?' active-poke-row':''}${isFainted?' fainted-row':''}" onclick="openTeamDetail('roster',${p.rosterIdx})">
        ${isActive ? '<div style="position:absolute;top:-1px;right:5px;font-family:\'Press Start 2P\',monospace;font-size:.28rem;color:var(--green)">▶ ACTIF</div>' : ''}
        <img class="team-row-img" src="${imgSrc}" alt="${p.currentName||p.name}" style="${p.isShiny?'filter:drop-shadow(0 0 5px #ffd700)':''}"/>
        <div class="team-row-info">
          <div class="team-row-name">${p.currentName||p.name}${p.isShiny?' ✨':''}</div>
          <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.5);line-height:1.7">Niv.${p.level} · ${typeBadges}${p.heldItem && HELD_ITEMS[p.heldItem] ? ` · ${HELD_ITEMS[p.heldItem].icon}` : ''}${p.sizeVariant && p.sizeVariant!=='normal' ? ` · <span style="color:${(SIZE_VARIANTS.find(sv=>sv.id===p.sizeVariant)||{}).color||'#fff'}">${(SIZE_VARIANTS.find(sv=>sv.id===p.sizeVariant)||{}).emoji||''} ${p.sizeVariant}</span>` : ''}</div>
          <div class="team-row-hp-bar"><div class="team-row-hp-fill" style="width:${hpPct}%;background:${hpColor}"></div></div>
          <div style="font-size:.55rem;color:rgba(255,255,255,.45);margin-top:.1rem">${Math.ceil(p.hp)}/${p.maxHp} PV</div>
        </div>
        <div class="team-row-actions" onclick="event.stopPropagation()">
          ${!isActive && !isFainted ? `<button class="team-row-btn" onclick="selectLeadFromTeam(${p.rosterIdx})" style="background:linear-gradient(180deg,#06d6a0,#048a68);color:#fff">⚡</button>` : ''}
          <button class="team-row-btn" onclick="moveToBox(${p.rosterIdx})" style="background:linear-gradient(180deg,#4cc9f0,#1a8ab5);color:#fff" ${isActive?'disabled title="Pokémon actif"':''}>📦</button>
        </div>
      </div>`;
    }).join('');
  }

  // ── SYNERGIES PANEL ──
  renderSynergyBadges();

  // ── RIGHT PANEL: Box ──
  renderBox();
}

function renderSynergyBadges() {
  const el = document.getElementById('team-synergy-panel');
  if (!el) return;
  const active = getActiveSynergies();
  if (active.length === 0) {
    el.innerHTML = '<div style="font-size:.58rem;color:rgba(255,255,255,.3);text-align:center;padding:.4rem 0">Aucune synergie active</div>';
    return;
  }
  el.innerHTML = active.map(s => `
    <div title="${s.desc}" style="display:flex;align-items:center;gap:.35rem;background:rgba(255,255,255,.06);border:1px solid ${s.color}55;border-radius:8px;padding:.28rem .5rem;cursor:default">
      <span style="font-size:.85rem">${s.icon}</span>
      <div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.28rem;color:${s.color}">${s.name}</div>
        <div style="font-size:.5rem;color:rgba(255,255,255,.5)">${s.desc}</div>
      </div>
    </div>`).join('');
}

let _boxDirtyKey = null;
function renderBox() {
  if (!player) return;
  if (!player.box) player.box = [];
  const boxEl = document.getElementById('box-display');
  if (!boxEl) return;
  // Dirty check : skip si box n'a pas changé (length + premier/dernier id + sélection)
  const dk = `${player.box.length}|${player.box[0]?.id??''}|${player.box[player.box.length-1]?.id??''}|${selectedBoxIdx??''}`;
  if (dk === _boxDirtyKey) return;
  _boxDirtyKey = dk;
  if (player.box.length === 0) {
    boxEl.innerHTML = '<div style="color:rgba(255,255,255,.3);font-family:\'Press Start 2P\',monospace;font-size:.42rem;padding:1.5rem;text-align:center;grid-column:1/-1">Box vide — capturez des Pokémon !</div>';
    return;
  }
  boxEl.innerHTML = player.box.map((p,i) => {
    const spriteId = p.currentSpriteId || p.spriteId || p.id;
    const imgSrc = p.isShiny ? SPRITE_SHINY(spriteId) : SPRITE_FRONT(spriteId);
    const dual = p.dualType || getPokeType(spriteId, p.type);
    const hpPct = Math.max(0, Math.round((p.hp/p.maxHp)*100));
    const isSelected = selectedBoxIdx === i;
    return `
    <div class="box-poke-card${isSelected?' selected-box':''}" onclick="openTeamDetail('box',${i})">
      <img src="${imgSrc}" style="width:56px;height:56px;image-rendering:pixelated;${p.isShiny?'filter:drop-shadow(0 0 5px #ffd700)':''}"/>
      <div style="font-family:'Press Start 2P',monospace;font-size:.32rem;color:var(--yellow);line-height:1.6">${p.currentName||p.name}${p.isShiny?' ✨':''}</div>
      <div style="font-family:'Press Start 2P',monospace;font-size:.28rem;color:rgba(255,255,255,.5)">Niv.${p.level}</div>
      <div style="width:80%;height:4px;background:rgba(0,0,0,.4);border-radius:999px;overflow:hidden">
        <div style="height:100%;background:${hpPct>50?'#2dc653':hpPct>20?'#ffd60a':'#e63946'};width:${hpPct}%;border-radius:999px"></div>
      </div>
      ${player.roster.length < 6 ? `<button class="team-row-btn" onclick="event.stopPropagation();moveToTeam(${i})" style="background:linear-gradient(180deg,#2dc653,#1a8035);color:#fff;margin-top:.2rem;font-size:.26rem">→ ÉQUIPE</button>` : '<div style="font-size:.55rem;color:rgba(255,100,100,.6);margin-top:.2rem">Équipe pleine</div>'}
    </div>`;
  }).join('');
}

function openTeamDetail(source, idx) {
  teamDetailPokeSource = source;
  teamDetailPokeIdx = idx;
  switchTeamTab('detail');
  renderTeamDetail();
}

function renderTeamDetail() {
  const p = teamDetailPokeSource === 'roster' ? player.roster[teamDetailPokeIdx] : player.box[teamDetailPokeIdx];
  if (!p) return;
  const el = document.getElementById('team-poke-detail-content');
  const spriteId = p.currentSpriteId || p.spriteId;
  const imgSrc = p.isShiny ? SPRITE_SHINY(spriteId) : SPRITE_FRONT(spriteId);
  const dual = p.dualType || getPokeType(spriteId, p.type);
  const hpPct = Math.max(0, Math.round((p.hp / p.maxHp) * 100));
  const xpPct = p.xpNext ? Math.round(((p.xp||0) / p.xpNext) * 100) : 0;
  const isActiveRoster = teamDetailPokeSource === 'roster' && teamDetailPokeIdx === (player.activeRosterIdx||0);
  const isFainted = p.hp <= 0;
  const typeBadges = dual.includes('/')
    ? dual.split('/').map(t=>`<span class="poke-type-badge type-${t}">${t}</span>`).join(' ')
    : `<span class="poke-type-badge type-${dual}">${dual}</span>`;
  
  // REAL STATS (like real Pokémon games)
  // Stat max for display scaling (gen 1 max ~400 for HP, ~300 for others)
  const statData = [
    { name:'PV',     val:p.maxHp,  color:'#e63946', max:400 },
    { name:'ATT',    val:p.atk,    color:'#ff9a3c', max:250 },
    { name:'DEF',    val:p.def,    color:'#ffd60a', max:250 },
    { name:'Atq Spé',val:p.spAtk||p.magic, color:'#4cc9f0', max:250 },
    { name:'Déf Spé',val:p.spDef||Math.round((p.def||5)*0.9), color:'#c77dff', max:250 },
    { name:'VIT',    val:p.spd,    color:'#2dc653', max:250 },
  ];
  const statBarsHtml = statData.map(s => {
    const pct = Math.min(100, Math.round((s.val / s.max) * 100));
    return `<div class="stat-bar-row">
      <div class="stat-bar-label">${s.name}</div>
      <div class="stat-bar-track"><div class="stat-bar-fill" style="width:${pct}%;background:${s.color};box-shadow:0 0 6px ${s.color}88"></div></div>
      <div class="stat-bar-val">${s.val}</div>
    </div>`;
  }).join('');

  const m1 = MOVES_DB[p.move] || { type: p.moveElem||p.type, cat:'phy', pow:'—', acc:'—', pp:'—', desc: p.move };
  const m2 = MOVES_DB[p.mMove] || { type: p.mMoveElem||p.type, cat:'spe', pow:'—', acc:'—', pp:'—', desc: p.mMove };
  const typeColor = tp => ({ Feu:'#ff6030',Eau:'#4488ff',Plante:'#44bb44',Électrik:'#ffcc00',Normal:'#9999aa',Psy:'#ff4499',Vol:'#88aaee',Dragon:'#7038f8',Poison:'#aa44bb',Combat:'#994422',Glace:'#88ccff',Sol:'#cc9944',Roche:'#9a8080',Spectre:'#5544aa',Insecte:'#88aa22',Acier:'#aaaacc',Ténèbres:'#443344',Fée:'#ff88cc' }[tp] || '#666');
  const catIcon = cat => cat === 'phy' ? '⚔️' : cat === 'spe' ? '✨' : '🔧';

  el.innerHTML = `
  <!-- Header: sprite + name + types -->
  <div style="display:flex;gap:1rem;align-items:center;background:rgba(255,255,255,.04);border-radius:12px;padding:.8rem 1rem;border:2px solid rgba(255,255,255,.08)">
    <img src="${imgSrc}" style="width:96px;height:96px;image-rendering:pixelated;flex-shrink:0;${p.isShiny?'filter:drop-shadow(0 0 10px #ffd700)':'filter:drop-shadow(0 0 10px rgba(255,214,10,.4))'}"/>
    <div style="flex:1">
      <div style="font-family:'Press Start 2P',monospace;font-size:.6rem;color:${p.isShiny?'#ffd700':'var(--yellow)'};margin-bottom:.4rem">${p.currentName||p.name}${p.isShiny?' ✨':''}</div>
      <div style="font-family:'Press Start 2P',monospace;font-size:.38rem;color:rgba(255,255,255,.55);margin-bottom:.5rem">Niv. ${p.level}${isActiveRoster?' · ▶ En combat':''}${isFainted?' · 💀 K.O.':''}</div>
      <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:.5rem">${typeBadges}</div>
      <!-- HP bar -->
      <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.5);margin-bottom:.2rem">PV : ${Math.ceil(p.hp)} / ${p.maxHp}</div>
      <div style="width:100%;height:10px;background:rgba(0,0,0,.4);border-radius:999px;overflow:hidden;margin-bottom:.3rem;border:1px solid rgba(255,255,255,.1)">
        <div style="height:100%;background:${hpPct>50?'linear-gradient(90deg,#2dc653,#06d6a0)':hpPct>20?'linear-gradient(90deg,#ffd60a,#ff9a3c)':'linear-gradient(90deg,#e63946,#ff6b9d)'};width:${hpPct}%;border-radius:999px;box-shadow:0 0 8px currentColor;transition:width .4s"></div>
      </div>
      <!-- XP bar -->
      <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.4);margin-bottom:.2rem">XP : ${p.xp||0} / ${p.xpNext||100}</div>
      <div style="width:100%;height:6px;background:rgba(0,0,0,.4);border-radius:999px;overflow:hidden;border:1px solid rgba(255,255,255,.08)">
        <div style="height:100%;background:linear-gradient(90deg,#ffd60a,#ff9a3c);width:${xpPct}%;border-radius:999px;transition:width .4s"></div>
      </div>
    </div>
  </div>

  <!-- STATS SECTION (real game style) -->
  <div style="background:rgba(255,255,255,.03);border-radius:12px;padding:.8rem 1rem;border:2px solid rgba(255,255,255,.07)">
    <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:var(--blue);margin-bottom:.7rem">📊 STATISTIQUES</div>
    <div class="stat-bars-container">${statBarsHtml}</div>
  </div>

  <!-- MOVES SECTION -->
  <div style="background:rgba(255,255,255,.03);border-radius:12px;padding:.8rem 1rem;border:2px solid rgba(255,255,255,.07)">
    <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:rgba(255,255,255,.6);margin-bottom:.6rem">🥊 ATTAQUES</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">
      ${[{move:p.move,data:m1,uses:p.moveUses,usesMax:p.moveUsesMax},{move:p.mMove,data:m2,uses:p.mMoveUses,usesMax:p.mMoveUsesMax}].map(({move,data,uses,usesMax})=>`
      <div style="background:rgba(255,255,255,.05);border:2px solid rgba(255,255,255,.1);border-radius:10px;padding:.5rem .7rem">
        <div style="display:flex;align-items:center;gap:.35rem;margin-bottom:.25rem">
          <span style="font-size:.8rem">${catIcon(data.cat)}</span>
          <span style="font-family:'Press Start 2P',monospace;font-size:.35rem;color:#fff">${move||'—'}</span>
        </div>
        <div style="display:flex;align-items:center;gap:.3rem;margin-bottom:.25rem">
          <span style="font-family:'Press Start 2P',monospace;font-size:.28rem;padding:.1rem .35rem;border-radius:4px;background:${typeColor(data.type)};color:#fff">${data.type}</span>
          <span style="font-size:.55rem;color:rgba(255,255,255,.5)">${uses||0}/${usesMax||data.pp} PP</span>
        </div>
        <div style="font-size:.58rem;color:rgba(255,255,255,.4);line-height:1.5">Puis:${data.pow} · Prec:${data.acc}%</div>
      </div>`).join('')}
    </div>
  </div>

  <!-- HELD ITEM SLOT -->
  <div style="background:rgba(255,255,255,.03);border-radius:12px;padding:.8rem 1rem;border:2px solid rgba(255,215,0,.2)">
    <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:#ffd700;margin-bottom:.6rem">📦 OBJET TENU</div>
    ${p.heldItem ? (() => {
      const hi = HELD_ITEMS[p.heldItem];
      return `<div style="display:flex;align-items:center;gap:.7rem;background:rgba(255,215,0,.07);border:2px solid rgba(255,215,0,.3);border-radius:10px;padding:.5rem .8rem">
        <div style="font-size:1.8rem">${hi.icon}</div>
        <div style="flex:1">
          <div style="font-family:'Press Start 2P',monospace;font-size:.42rem;color:#ffd700">${hi.name}</div>
          <div style="font-size:.65rem;color:rgba(255,255,255,.55);margin-top:.2rem">${hi.desc}</div>
          ${hi.consumable ? '<div style="font-family:\'Press Start 2P\',monospace;font-size:.3rem;color:#ff69b4;margin-top:.2rem">CONSOMABLE</div>' : ''}
        </div>
        <button class="team-row-btn" onclick="removeItemFromPokemon('${teamDetailPokeSource}',${teamDetailPokeIdx})" style="background:linear-gradient(180deg,#e63946,#a01e27);color:#fff;font-size:.32rem">✕ RETIRER</button>
      </div>`;
    })() : '<div style="font-size:.75rem;color:rgba(255,255,255,.3);font-style:italic">Aucun objet équipé</div>'}
    ${(() => {
      const bag = player.heldItemBag || {};
      const available = Object.entries(bag).filter(([,qty])=>qty>0);
      if (available.length === 0) return '<div style="font-size:.65rem;color:rgba(255,255,255,.3);margin-top:.4rem">Aucun objet disponible (complétez la Tour !)</div>';
      return `<div style="margin-top:.6rem;font-family:'Press Start 2P',monospace;font-size:.35rem;color:rgba(255,255,255,.5);margin-bottom:.35rem">Objets disponibles :</div>
      <div style="display:flex;flex-wrap:wrap;gap:.4rem">
        ${available.map(([id, qty]) => {
          const hi = HELD_ITEMS[id];
          if (!hi) return '';
          return `<button onclick="assignItemToPokemon('${teamDetailPokeSource}',${teamDetailPokeIdx},'${id}')" style="font-family:'Press Start 2P',monospace;font-size:.32rem;padding:.3rem .6rem;background:rgba(255,255,255,.08);border:2px solid ${hi.color};border-radius:8px;color:#fff;cursor:pointer;transition:all .15s" onmouseover="this.style.background='rgba(255,255,255,.15)'" onmouseout="this.style.background='rgba(255,255,255,.08)'" title="${hi.desc}">${hi.icon} ${hi.name} ×${qty}</button>`;
        }).join('')}
      </div>`;
    })()}
  </div>

  <!-- ACTION BUTTONS -->
  <div style="display:flex;flex-wrap:wrap;gap:.5rem">
    ${teamDetailPokeSource==='roster' ? `
      ${!isActiveRoster && !isFainted ? `<button class="btn green" onclick="selectLeadFromTeam(${teamDetailPokeIdx})" style="font-size:.4rem;padding:.45rem .9rem">⚡ MENER L'ÉQUIPE</button>` : ''}
      <button class="btn" onclick="openPokeDetail(${teamDetailPokeIdx})" style="font-size:.4rem;padding:.45rem .9rem;background:linear-gradient(180deg,#4cc9f0,#1a8ab5);box-shadow:0 4px 0 #0d3d5e">🎓 APPRENDRE ATTAQUE</button>
      ${!isActiveRoster ? `<button class="btn" onclick="moveToBox(${teamDetailPokeIdx})" style="font-size:.4rem;padding:.45rem .9rem">📦 METTRE EN BOX</button>` : ''}
    ` : `
      ${player.roster.length < 6 ? `<button class="btn green" onclick="moveToTeam(${teamDetailPokeIdx})" style="font-size:.4rem;padding:.45rem .9rem">→ METTRE EN ÉQUIPE</button>` : '<span style="font-family:\'Press Start 2P\',monospace;font-size:.38rem;color:rgba(255,100,100,.8);align-self:center">Équipe pleine (6/6)</span>'}
    `}
    <button class="btn" onclick="switchTeamTab(\'box\')" style="font-size:.4rem;padding:.45rem .9rem;background:linear-gradient(180deg,#555,#333)">↩ RETOUR BOX</button>
  </div>
  `;
}

function moveToBox(rosterIdx) {
  if (!player.roster) return;
  const isActive = rosterIdx === (player.activeRosterIdx||0);
  if (isActive) { notify('Impossible — c\'est votre Pokémon actif !'); return; }
  if (!player.box) player.box = [];
  const poke = player.roster.splice(rosterIdx, 1)[0];
  player.box.push(poke);
  // Fix activeRosterIdx if needed
  if (player.activeRosterIdx >= player.roster.length) {
    player.activeRosterIdx = Math.max(0, player.roster.length - 1);
  }
  if (player.roster.length > 0) syncPlayerFromActive();
  notify(`📦 ${poke.currentName||poke.name} mis en Box !`);
  switchTeamTab('box');
  renderTeam();
}

function moveToTeam(boxIdx) {
  if (!player.box) return;
  if (player.roster.length >= 6) { notify('Équipe pleine ! (max 6 Pokémon)'); return; }
  const poke = player.box.splice(boxIdx, 1)[0];
  player.roster.push(poke);
  notify(`✅ ${poke.currentName||poke.name} rejoint l'équipe !`);
  switchTeamTab('box');
  renderTeam();
}

function selectLeadFromTeam(idx) {
  if (!player.roster || idx < 0 || idx >= player.roster.length) return;
  const target = player.roster[idx];
  if (!target || target.hp <= 0) { notify(`${target?.currentName||'Ce Pokémon'} est K.O. !`); return; }
  syncActiveFromPlayer();
  player.activeRosterIdx = idx;
  syncPlayerFromActive();
  notify(`⚡ ${player.currentName} mène l'équipe !`);
  renderTeam();
  updateHUD();
}

// ══════════════════════════════════════════
// SHOP
// ══════════════════════════════════════════
function renderShop() {
  if (!player) return;
  document.getElementById('shop-gold').textContent = player.gold;
  const list = document.getElementById('shop-items-list');
  const itemsHTML = SHOP_ITEMS.map(item=>`
    <div class="shop-item">
      <img src="${item.img}" alt="${item.name}"/>
      <div class="shop-item-info">
        <div class="shop-item-name">${item.name}</div>
        <div class="shop-item-desc">${item.desc}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.3rem">
        <div class="shop-item-price">₽${item.price}</div>
        <button class="shop-item-btn" onclick="buyItem('${item.id}')">Acheter</button>
      </div>
    </div>`).join('');
  const ctHTML = `
    <div style="font-family:'Press Start 2P',monospace;font-size:.45rem;color:var(--blue);margin:.7rem 0 .4rem;text-shadow:1px 1px 0 #000">📀 CAPSULES TECHNIQUES (CT)</div>
    ${CT_LIST.map(ct=>{
      const md = MOVES_DB[ct.move] || {};
      const owned = (player.ctBag||{})[ct.id]||0;
      return `<div class="shop-item" style="${owned>0?'border-color:rgba(76,201,240,.4)':''}">
        <img src="${ct.img}" alt="${ct.name}" style="width:28px;height:28px"/>
        <div class="shop-item-info">
          <div class="shop-item-name" style="font-size:.38rem">${ct.name}</div>
          <div class="shop-item-desc">${md.type||''} · Puis:${md.pow||'?'} · ${md.desc||''}</div>
          ${owned>0?`<div style="font-size:.55rem;color:var(--green)">En inventaire: ${owned}</div>`:''}
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.3rem">
          <div class="shop-item-price">₽${ct.price}</div>
          <button class="shop-item-btn" onclick="buyCT('${ct.id}')">Acheter</button>
        </div>
      </div>`;
    }).join('')}`;
  list.innerHTML = itemsHTML + ctHTML;
}

function buyItem(itemId) {
  if (!player) return;
  const item = SHOP_ITEMS.find(i=>i.id===itemId);
  if (!item) return;
  if (player.gold < item.price){ notify('Pas assez de Pokédollars !'); return; }
  player.gold -= item.price;
  if (item.type==='ball') {
    player.balls[itemId] = (player.balls[itemId]||0)+1;
  } else {
    // heal, status, pp, special → tous dans player.bag
    player.bag[itemId] = (player.bag[itemId]||0)+1;
  }
  document.getElementById('shop-gold').textContent = player.gold;
  updateHUD();
  notify(`${item.name} acheté ! -${item.price}₽`);
}

function buyCT(ctId) {
  if (!player) return;
  const ct = CT_LIST.find(c => c.id === ctId);
  if (!ct) return;
  if (player.gold < ct.price) { notify('Pas assez de Pokédollars !'); return; }
  player.gold -= ct.price;
  if (!player.ctBag) player.ctBag = {};
  player.ctBag[ctId] = (player.ctBag[ctId] || 0) + 1;
  document.getElementById('shop-gold').textContent = player.gold;
  updateHUD();
  notify(`${ct.name} achetée ! -${ct.price}₽`);
  renderShop();
}

// ══════════════════════════════════════════
// SAVE / LOAD
// ══════════════════════════════════════════
function saveGame() {
  // Remplacée plus bas par la version double-write (localStorage + IDB) avec signature
  if (!player) return;
  const _s = JSON.stringify(player);
  localStorage.setItem(SAVE_KEY, _wrapSave(_s));
  notify('Partie sauvegardée !');
  setMessage('💾 Votre aventure a été sauvegardée.');
}
// ══════════════════════════════════════════
// SANITIZE LEVEL CAP — détecte et corrige
// tout Pokémon dont le niveau dépasse 500
// (manipulation directe de la sauvegarde)
// ══════════════════════════════════════════
const _LEVEL_CAP = 500;

function sanitizeLevelCap() {
  if (!player) return;
  const _allPoke = (typeof ALL_POKEMON !== 'undefined') ? ALL_POKEMON : GEN1;
  const _allSpd  = (typeof ALL_SPD     !== 'undefined') ? ALL_SPD     : GEN1_SPD;
  const _pokeMap = (typeof ALL_POKEMON_MAP !== 'undefined') ? ALL_POKEMON_MAP : null;

  const _fixPoke = (p) => {
    if (!p || (p.level || 0) <= _LEVEL_CAP) return false;
    const sid   = p.currentSpriteId || p.spriteId || 0;
    const pData = _pokeMap ? _pokeMap.get(sid) : _allPoke.find(x => x.id === sid);
    const scale = 1 + _LEVEL_CAP * 0.12; // 61 — équivaut à une capture au niveau cap
    p.maxHp  = Math.round((pData?.hp  || 45) * scale);
    p.hp     = p.maxHp;
    p.atk    = Math.round((pData?.atk || 10) * scale);
    p.def    = Math.round((pData?.def ||  5) * scale);
    p.magic  = Math.round((pData?.atk ||  8) * scale * 0.8);
    p.spd    = Math.round((_allSpd[sid] || pData?.spd || 50) * (1 + _LEVEL_CAP * 0.02));
    if (p.spAtk !== undefined) p.spAtk = Math.round((pData?.atk || 8) * scale * 0.9);
    if (p.spDef !== undefined) p.spDef = Math.round((pData?.def || 5) * scale * 0.9);
    // MP : 50 de base + 8 par niveau (identique à checkRosterLevelUp)
    p.maxMp  = 50 + (_LEVEL_CAP - 1) * 8;
    p.mp     = p.maxMp;
    p.level  = _LEVEL_CAP;
    p.xp     = 0;
    p.xpNext = xpForLevel(_LEVEL_CAP);
    return true;
  };

  let fixed = 0;
  (player.roster || []).forEach(p => { if (_fixPoke(p)) fixed++; });
  (player.box    || []).forEach(p => { if (_fixPoke(p)) fixed++; });

  // Filet de sécurité : corrige aussi l'objet player directement
  if ((player.level || 0) > _LEVEL_CAP) {
    _fixPoke(player);
    fixed++;
  }

  if (fixed > 0) {
    console.warn(`[PokéWave] ${fixed} Pokémon hors limite remis au Niv.${_LEVEL_CAP}`);
    notify(`⚠️ ${fixed} Pokémon hors limite remis au Niv.${_LEVEL_CAP} !`);
    setMessage(`⚠️ Limite de niveau : ${fixed} Pokémon au-delà du Niv.${_LEVEL_CAP} ont été réinitialisés avec les stats correspondantes.`);
  }
}

function loadGame() {
  const _raw = localStorage.getItem(SAVE_KEY);
  if (!_raw){ notify('Aucune sauvegarde !'); return; }
  const _uw = _unwrapSave(_raw);
  if (!_uw) { notify('❌ Aucune sauvegarde valide !'); return; }
  if (_uw.err === 'tampered') {
    notify('⛔ Sauvegarde modifiée — chargement refusé !');
    setMessage('⛔ Signature invalide : la sauvegarde a été modifiée manuellement. Restaurez depuis un fichier .pwsave valide.');
    return;
  }
  player = JSON.parse(_uw.json);
  if (!player.balls)        player.balls        = { pokeball:3 };
  if (!player.bag)          player.bag          = { potion:2 };
  if (!player.ctBag)        player.ctBag        = {};
  if (!player.heldItemBag)  player.heldItemBag  = {};
  if (!player.badges)       player.badges       = [];
  if (!player.team)         player.team         = [];
  if (!player.box)          player.box          = [];
  if (!player.trainerLevel) player.trainerLevel = 1;
  if (!player.trainerXP)    player.trainerXP    = 0;
  if (!player.trainerXPNext)player.trainerXPNext= TRAINER_XP_PER_LEVEL(1);
  if (!player.tourFloor)    player.tourFloor    = 0;
  if (!player.totalKills)   player.totalKills   = 0;
  if (!player.lastBossWave)   player.lastBossWave  = 0;
  if (!player.trialPoints)      player.trialPoints      = 0;
  if (!player.trialWins)        player.trialWins        = 0;
  if (!player.worldBossKills)   player.worldBossKills   = 0;
  if (!player.lastWorldBoss)    player.lastWorldBoss    = 0;
  if (!player.shinyCount)       player.shinyCount       = 0;
  if (!player.megaCount)        player.megaCount        = 0;
  if (player._winStreak === undefined) player._winStreak = 0;
  if (!player.breedingSelected) player.breedingSelected = [];
  if (!player.stats)            player.stats            = {};
  if (!player.achievements)     player.achievements     = [];
  player._trialBattle = false; player._trialBattleTp = 0;
  // Plafond de niveau — remet à 500 tout Pokémon modifié manuellement
  sanitizeLevelCap();
  // Recalibrer xpNext sur tous les Pokémon en cas d'ancienne courbe
  const _recalibrate = (p) => { if (p && p.level) { p.xpNext = xpForLevel(p.level); p.xp = Math.min(p.xp||0, p.xpNext - 1); } };
  (player.roster||[]).forEach(_recalibrate);
  (player.box||[]).forEach(_recalibrate);
  if (player.level) { player.xpNext = xpForLevel(player.level); player.xp = Math.min(player.xp||0, player.xpNext - 1); }
  if (!player.roster)       { player.roster = []; player.activeRosterIdx = 0; }
  if (player.roster.length === 0) {
    // Migrate from old save — build roster from player data
    const starterPoke = {
      name: player.cls || player.currentName, currentName: player.currentName,
      spriteId: player.spriteId, currentSpriteId: player.currentSpriteId,
      type: player.type, dualType: getPokeType(player.currentSpriteId, player.type),
      level: player.level, hp: player.hp, maxHp: player.maxHp,
      mp: player.mp||50, maxMp: player.maxMp||50,
      xp: player.xp, xpNext: player.xpNext,
      atk: player.atk, def: player.def, spd: player.spd, magic: player.magic,
      move: player.move, mMove: player.mMove, animType: player.animType||'normal',
      moveElem: player.moveElem, mMoveElem: player.mMoveElem,
      moveUses: player.moveUses||6, mMoveUses: player.mMoveUses||4,
      moveUsesMax: player.moveUsesMax||6, mMoveUsesMax: player.mMoveUsesMax||4,
      isMain: true,
    };
    player.roster = [starterPoke];
    player.activeRosterIdx = 0;
    // Add team pokemon to roster
    (player.team||[]).forEach(t => addCapturedToRoster(t));
  }
  if (!player.currentZone)  player.currentZone  = 'bourg-palette';
  if (!player.visitedZones) player.visitedZones = ['bourg-palette'];
  if (!player.visitedZones.includes(player.currentZone))
    player.visitedZones.push(player.currentZone);
  if (!player.zoneKills)    player.zoneKills    = {};
  if (player.moveUsesMax === undefined) { player.moveUsesMax=6; player.moveUses=6; }
  if (player.mMoveUsesMax === undefined){ player.mMoveUsesMax=4; player.mMoveUses=4; }
  if (!player.moveElem)     player.moveElem     = player.type;
  if (!player.mMoveElem)    player.mMoveElem    = player.type;
  // Rattrapage niveau pour les Pokémon du banc (XP accumulés sans level-up)
  (player.roster||[]).forEach((p,i)=>{ if(i!==(player.activeRosterIdx||0)) checkRosterLevelUp(p); });
  (player.box||[]).forEach(p=>checkRosterLevelUp(p));
  // Sync active roster pokemon to player
  if (player.roster.length > 0) syncPlayerFromActive();
  // Rattraper les évolutions manquées (Pokémon déjà au-delà du niveau d'évolution)
  checkEvolutionOnLoad();
  if (!player.dexSeen) { player.dexSeen = []; initDexFromRoster(); }
  showScreen('game'); updateHUD(); updateKillHUD();
  showZone(ZONES[player.currentZone]?.name || 'PokéQuest');
  getDailyQuests();
  startPassiveIncome();
  startPeriodicHUD();
  checkAchievements();
  updateDayNightHUD();
  setMessage(`Bienvenue de retour, Dresseur ${player.name} ! ${player.currentName} reprend l'aventure !`);
  
}

// ══════════════════════════════════════════
// SAVE MANAGER — Export / Import / Code
// ══════════════════════════════════════════
const SAVE_VERSION = '2.1';
const SAVE_KEY = 'pokemonRPG_save_v2';
const IDB_DB = 'pokewaveDB';
const IDB_STORE = 'saves';

// ── Anti-cheat : signature HMAC-like ──
function _computeSig(str) {
  // Clé secrète obfusquée (ne pas modifier — casse les signatures)
  const _k = [80,75,87,86,95,78,48,67,104,51,65,116,95,50,53,56,75,89];
  const k = _k.map(c => String.fromCharCode(c)).join('');
  const src = k + str.length + str + k.split('').reverse().join('');
  let a = 0x6d2b1e4f, b = 0xf3a70c89;
  for (let i = 0; i < src.length; i++) {
    const c = src.charCodeAt(i);
    a = Math.imul(a ^ c, 0x9e3779b9) >>> 0;
    b = Math.imul(b ^ c, 0x517cc1b7) >>> 0;
    a = ((a << 13) | (a >>> 19)) >>> 0;
    b = ((b <<  7) | (b >>> 25)) >>> 0;
  }
  a = (a ^ b ^ (a >>> 16)) >>> 0;
  b = (b ^ a ^ (b >>> 13)) >>> 0;
  return a.toString(16).padStart(8,'0') + b.toString(16).padStart(8,'0');
}
// Emballe le JSON joueur pour stockage signé
function _wrapSave(playerJson) {
  return JSON.stringify({ _pw: SAVE_VERSION, sig: _computeSig(playerJson), d: playerJson });
}
// Déballe et vérifie — retourne {json} | {json, legacy:true} | {err:'tampered'} | null
function _unwrapSave(raw) {
  if (!raw) return null;
  try {
    const w = JSON.parse(raw);
    if (w._pw && w.d !== undefined) {
      if (w.sig !== _computeSig(w.d)) return { err: 'tampered' };
      return { json: w.d };
    }
    // Format hérité : JSON joueur direct (re-signé au prochain save)
    if (w.name) return { json: raw, legacy: true };
    return null;
  } catch(_) { return null; }
}

// ── IndexedDB : double sauvegarde robuste (survive aux purges localStorage) ──
function _idbSave(data) {
  try {
    const req = indexedDB.open(IDB_DB, 1);
    req.onupgradeneeded = e => e.target.result.createObjectStore(IDB_STORE, { keyPath: 'id' });
    req.onsuccess = e => {
      const db = e.target.result;
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put({ id: 'main', data, ts: Date.now() });
    };
  } catch (_) {}
}
function _idbLoad(cb) {
  try {
    const req = indexedDB.open(IDB_DB, 1);
    req.onupgradeneeded = e => e.target.result.createObjectStore(IDB_STORE, { keyPath: 'id' });
    req.onsuccess = e => {
      const db = e.target.result;
      const tx = db.transaction(IDB_STORE, 'readonly');
      const get = tx.objectStore(IDB_STORE).get('main');
      get.onsuccess = () => cb(get.result?.data || null);
      get.onerror = () => cb(null);
    };
    req.onerror = () => cb(null);
  } catch (_) { cb(null); }
}

// Surcharge saveGame pour double-write
const _origSaveGame = saveGame;
saveGame = function() {
  if (!player) return;
  const serialized = JSON.stringify(player);
  const wrapped = _wrapSave(serialized);
  localStorage.setItem(SAVE_KEY, wrapped);
  _idbSave(wrapped);
  notify('Partie sauvegardée !');
  setMessage('💾 Votre aventure a été sauvegardée.');
};

// ── Auto-save silencieux (sans notification) ──
let _autoSaveKillCounter = 0;
function _silentSave() {
  if (!player) return;
  // Utilise requestIdleCallback si disponible pour éviter de bloquer le thread principal
  const doSave = () => {
    try {
      const serialized = JSON.stringify(player);
      const wrapped = _wrapSave(serialized);
      localStorage.setItem(SAVE_KEY, wrapped);
      _idbSave(wrapped);
    } catch(e) {}
  };
  if (window.requestIdleCallback) {
    requestIdleCallback(doSave, { timeout: 2000 });
  } else {
    setTimeout(doSave, 0);
  }
}
// Auto-save toutes les 3 minutes en arrière-plan
if (window._autoSaveInterval) clearInterval(window._autoSaveInterval);
window._autoSaveInterval = setInterval(_silentSave, 180000);

// ── Export — télécharge un fichier .pwsave (JSON) ──
function exportSave() {
  if (!player) { notify('Aucune sauvegarde à exporter !'); return; }
  const p = player;
  const pJson = JSON.stringify(p);
  const bundle = {
    _pw_version:     SAVE_VERSION,
    _pw_export_date: new Date().toISOString(),
    _pw_player:      p.name || '?',
    _pw_level:       p.level || 1,
    _pw_kills:       p.totalKills || 0,
    _pw_sig:         _computeSig(pJson),
    save:            p
  };
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const date = new Date().toISOString().slice(0,10);
  a.href     = url;
  a.download = `pokewave_${p.name||'save'}_${date}.pwsave`;
  a.click();
  URL.revokeObjectURL(url);
  notify('💾 Sauvegarde exportée !');
}

// ── Code de sauvegarde — base64 compact ──
function copySaveCode() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) { notify('Aucune sauvegarde !'); return; }
  const code = btoa(encodeURIComponent(raw));
  navigator.clipboard.writeText(code).then(() => {
    notify('📋 Code copié dans le presse-papier !');
    renderSaveManager();
  }).catch(() => {
    // Fallback : afficher le code dans une zone
    const el = document.getElementById('save-code-display');
    if (el) { el.value = code; el.style.display='block'; el.select(); }
    notify('📋 Code affiché ci-dessous — copiez-le manuellement');
  });
}

function loadSaveCode() {
  const el = document.getElementById('save-code-input');
  if (!el) return;
  const code = el.value.trim();
  if (!code) { notify('Collez un code de sauvegarde !'); return; }
  try {
    const raw = decodeURIComponent(atob(code));
    _applyImportedSave(raw, 'code');
  } catch(_) {
    notify('❌ Code invalide ou corrompu !');
  }
}

// ── Import depuis fichier ──
function triggerSaveFileImport() {
  document.getElementById('save-file-input').click();
}
function handleSaveFileImport(e) {
  const file = e.target.files[0];
  if (!file) return;
  e.target.value = '';
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const text = ev.target.result;
      const parsed = JSON.parse(text);
      if (parsed.save && parsed._pw_sig !== undefined) {
        // Nouveau format signé — vérifie la signature
        const pJson = JSON.stringify(parsed.save);
        if (parsed._pw_sig !== _computeSig(pJson)) {
          notify('⛔ Fichier .pwsave modifié — import refusé !');
          return;
        }
        _confirmImport(pJson, parsed);
      } else if (parsed.save) {
        // Ancien bundle sans signature — accepté (compatibilité)
        _confirmImport(JSON.stringify(parsed.save), parsed);
      } else {
        // JSON joueur direct
        _confirmImport(text, null);
      }
    } catch(_) {
      notify('❌ Fichier invalide !');
    }
  };
  reader.readAsText(file);
}

function _confirmImport(raw, preview) {
  // raw peut être un JSON joueur direct ou un format enveloppé (_unwrapSave)
  const _uwC = _unwrapSave(raw);
  const p = preview?.save || (_uwC && !_uwC.err ? JSON.parse(_uwC.json) : JSON.parse(raw));
  const info = preview
    ? `Dresseur : ${preview._pw_player || p.name} · Niv.${p.level||1} · ${p.totalKills||0} victoires\nExporté le : ${preview._pw_export_date ? new Date(preview._pw_export_date).toLocaleString('fr-FR') : '?'}`
    : `Dresseur : ${p.name||'?'} · Niv.${p.level||1}`;

  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;inset:0;z-index:999;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center';
  modal.innerHTML = `<div style="background:rgba(10,10,30,.98);border:3px solid #4cc9f0;border-radius:16px;padding:1.8rem;width:min(380px,94vw);display:flex;flex-direction:column;gap:1rem">
    <div style="font-family:'Press Start 2P',monospace;font-size:.65rem;color:#4cc9f0;text-align:center">📦 IMPORTER SAUVEGARDE</div>
    <div style="font-family:'Press Start 2P',monospace;font-size:.36rem;color:rgba(255,255,255,.7);line-height:2;background:rgba(0,0,0,.3);padding:.8rem;border-radius:8px">${info.replace(/\n/g,'<br>')}</div>
    <div style="font-family:'Press Start 2P',monospace;font-size:.32rem;color:#ff9a3c;text-align:center">⚠ Remplacera la sauvegarde locale actuelle !</div>
    <div style="display:flex;gap:.6rem">
      <button onclick="this.closest('[style*=fixed]').remove()" style="flex:1;padding:.6rem;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);border-radius:8px;color:#fff;cursor:pointer;font-family:'Press Start 2P',monospace;font-size:.38rem">✗ Annuler</button>
      <button id="_import_confirm_btn" style="flex:1;padding:.6rem;background:linear-gradient(180deg,#4cc9f0,#1a8ab5);border:none;border-radius:8px;color:#fff;cursor:pointer;font-family:'Press Start 2P',monospace;font-size:.38rem">✓ Importer</button>
    </div>
  </div>`;
  document.body.appendChild(modal);
  modal.querySelector('#_import_confirm_btn').onclick = () => {
    modal.remove();
    _applyImportedSave(raw, 'file');
  };
}

function _applyImportedSave(raw, source) {
  try {
    // Accepte format enveloppé (code de sauvegarde) ou JSON joueur direct
    const uw = _unwrapSave(raw);
    let playerJson;
    if (uw && !uw.err) {
      playerJson = uw.json;
    } else if (uw && uw.err === 'tampered') {
      notify('⛔ Import refusé : code de sauvegarde modifié !');
      return;
    } else {
      // JSON joueur direct passé par handleSaveFileImport ou code hérité
      const p = JSON.parse(raw);
      if (!p || !p.name) throw new Error('no player');
      playerJson = raw;
    }
    const p = JSON.parse(playerJson);
    if (!p || !p.name) throw new Error('no player');
    // Re-signe et stocke
    const wrapped = _wrapSave(playerJson);
    localStorage.setItem(SAVE_KEY, wrapped);
    _idbSave(wrapped);
    notify(`✅ Sauvegarde importée (${source}) — rechargement…`);
    setTimeout(() => { loadGame(); showScreen('game'); }, 800);
  } catch(_) {
    notify('❌ Sauvegarde corrompue ou incompatible !');
  }
}

// ── Récupération de secours depuis IndexedDB ──
function restoreFromIDB() {
  _idbLoad(raw => {
    if (!raw) { notify('Aucune sauvegarde IndexedDB trouvée !'); return; }
    _confirmImport(raw, null);
  });
}

// ── Rendu de l'écran de gestion des sauvegardes ──
function renderSaveManager() {
  const el = document.getElementById('saves-content');
  if (!el) return;

  // Infos save locale
  const raw = localStorage.getItem(SAVE_KEY);
  let localInfo = '<span style="color:rgba(255,255,255,.4)">Aucune sauvegarde locale</span>';
  if (raw) {
    try {
      const uw = _unwrapSave(raw);
      const p = uw && !uw.err ? JSON.parse(uw.json) : null;
      if (p) {
        const date = p._lastSaveDate ? new Date(p._lastSaveDate).toLocaleString('fr-FR') : 'Date inconnue';
        const sigStatus = uw.legacy ? '<span style="color:#ff9a3c"> ⚠ ancien format</span>' : '<span style="color:#2dc653"> ✓ signée</span>';
        localInfo = `<b style="color:#ffd700">${p.name||'?'}</b> · Niv.<b>${p.level||1}</b> · ${p.totalKills||0} victoires${sigStatus}<br><span style="color:rgba(255,255,255,.4);font-size:.55rem">${date}</span>`;
      } else if (uw && uw.err === 'tampered') {
        localInfo = '<span style="color:#ff4d4d">⛔ Sauvegarde corrompue / modifiée</span>';
      }
    } catch(_) {}
  }

  const fromGame = !!player;
  const backBtn = fromGame
    ? `<button class="btn" onclick="showScreen('game')" style="width:100%;margin-top:.5rem">↩ RETOUR AU JEU</button>`
    : `<button class="btn" onclick="showScreen('title')" style="width:100%;margin-top:.5rem">↩ MENU PRINCIPAL</button>`;

  el.innerHTML = `
    <div style="text-align:center;margin-bottom:1.2rem">
      <div style="font-family:'Press Start 2P',monospace;font-size:.7rem;color:#4cc9f0;text-shadow:2px 2px 0 #000">💾 GESTION DES SAUVEGARDES</div>
      <div style="font-family:'Press Start 2P',monospace;font-size:.32rem;color:rgba(255,255,255,.4);margin-top:.4rem">Export · Import · Code de récupération</div>
    </div>

    <!-- Sauvegarde actuelle -->
    <div style="background:rgba(76,201,240,.07);border:2px solid rgba(76,201,240,.3);border-radius:12px;padding:1rem;margin-bottom:.8rem">
      <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:#4cc9f0;margin-bottom:.5rem">📊 SAUVEGARDE LOCALE</div>
      <div style="font-family:'Press Start 2P',monospace;font-size:.38rem;line-height:2">${localInfo}</div>
      ${fromGame ? `<button onclick="saveGame();renderSaveManager()" style="margin-top:.6rem;width:100%;padding:.45rem;background:linear-gradient(180deg,#2dc653,#1a8035);border:none;border-radius:8px;color:#fff;cursor:pointer;font-family:'Press Start 2P',monospace;font-size:.38rem">💾 Sauvegarder maintenant</button>` : ''}
    </div>

    <!-- Export -->
    <div style="background:rgba(255,255,255,.04);border:2px solid rgba(255,255,255,.12);border-radius:12px;padding:1rem;margin-bottom:.8rem">
      <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:#ffd700;margin-bottom:.3rem">📤 EXPORTER</div>
      <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.4);margin-bottom:.6rem">Télécharge un fichier .pwsave sur votre appareil.<br>Gardez-le précieusement — il suffit à tout restaurer.</div>
      <button onclick="exportSave()" style="width:100%;padding:.5rem;background:linear-gradient(180deg,#ffd700,#b8860b);border:none;border-radius:8px;color:#000;cursor:pointer;font-family:'Press Start 2P',monospace;font-size:.4rem">⬇ Télécharger .pwsave</button>
    </div>

    <!-- Import fichier -->
    <div style="background:rgba(255,255,255,.04);border:2px solid rgba(255,255,255,.12);border-radius:12px;padding:1rem;margin-bottom:.8rem">
      <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:#ffd700;margin-bottom:.3rem">📥 IMPORTER UN FICHIER</div>
      <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.4);margin-bottom:.6rem">Sélectionnez un fichier .pwsave exporté précédemment.<br>Votre progression actuelle sera remplacée.</div>
      <button onclick="triggerSaveFileImport()" style="width:100%;padding:.5rem;background:linear-gradient(180deg,#4cc9f0,#1a8ab5);border:none;border-radius:8px;color:#fff;cursor:pointer;font-family:'Press Start 2P',monospace;font-size:.4rem">📂 Choisir un fichier</button>
    </div>

    <!-- Code de sauvegarde -->
    <div style="background:rgba(255,255,255,.04);border:2px solid rgba(255,255,255,.12);border-radius:12px;padding:1rem;margin-bottom:.8rem">
      <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:#a855f7;margin-bottom:.3rem">📋 CODE DE SAUVEGARDE</div>
      <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.4);margin-bottom:.6rem">Génère un code texte à coller dans un bloc-notes.<br>Pratique si le téléchargement de fichier ne fonctionne pas.</div>
      <div style="display:flex;gap:.4rem;margin-bottom:.4rem">
        <button onclick="copySaveCode()" style="flex:1;padding:.45rem;background:linear-gradient(180deg,#a855f7,#7c3aed);border:none;border-radius:8px;color:#fff;cursor:pointer;font-family:'Press Start 2P',monospace;font-size:.36rem">📋 Copier le code</button>
      </div>
      <textarea id="save-code-display" style="display:none;width:100%;height:80px;background:rgba(0,0,0,.4);border:1px solid rgba(255,255,255,.15);border-radius:6px;color:#a855f7;font-size:.55rem;padding:.4rem;resize:none;box-sizing:border-box" readonly placeholder="Le code apparaîtra ici…"></textarea>
      <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.4);margin-top:.5rem;margin-bottom:.25rem">Restaurer depuis un code :</div>
      <textarea id="save-code-input" style="width:100%;height:60px;background:rgba(0,0,0,.4);border:1px solid rgba(255,255,255,.15);border-radius:6px;color:#fff;font-size:.55rem;padding:.4rem;resize:none;box-sizing:border-box" placeholder="Collez votre code ici…"></textarea>
      <button onclick="loadSaveCode()" style="width:100%;margin-top:.35rem;padding:.45rem;background:linear-gradient(180deg,#06d6a0,#048a68);border:none;border-radius:8px;color:#fff;cursor:pointer;font-family:'Press Start 2P',monospace;font-size:.36rem">✓ Restaurer depuis le code</button>
    </div>

    <!-- Récupération IndexedDB -->
    <div style="background:rgba(255,154,60,.05);border:2px solid rgba(255,154,60,.2);border-radius:12px;padding:1rem;margin-bottom:.8rem">
      <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:#ff9a3c;margin-bottom:.3rem">🔧 RÉCUPÉRATION D'URGENCE</div>
      <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.4);margin-bottom:.6rem">Chaque sauvegarde est aussi écrite dans IndexedDB (plus<br>robuste que localStorage). Utilisez si localStorage est vide.</div>
      <button onclick="restoreFromIDB()" style="width:100%;padding:.45rem;background:linear-gradient(180deg,#ff9a3c,#c75a00);border:none;border-radius:8px;color:#fff;cursor:pointer;font-family:'Press Start 2P',monospace;font-size:.36rem">🔧 Restaurer depuis IndexedDB</button>
    </div>

    ${backBtn}`;
}

// ══════════════════════════════════════════
// NOTIFICATION
// ══════════════════════════════════════════
let notifTimer;
function notify(msg) {
  const el = document.getElementById('notif');
  el.textContent = msg;
  el.className = 'show';
  if (/✅|🏆|⬆|🔓|🎖|🥚/.test(msg))          el.classList.add('notif-success');
  else if (/✨\s*PRESTIGE|MAÎTRE/.test(msg))    el.classList.add('notif-prestige');
  else if (/💀\s*BOSS|WORLD BOSS|boss/.test(msg)) el.classList.add('notif-boss');
  else if (/❌|⚠|Requis|impossible/.test(msg)) el.classList.add('notif-error');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => el.classList.remove('show'), 2400);
}
// ══════════════════════════════════════════
// MAP — IMAGE + OVERLAY TRANSPARENT
// Fond = kanto_map.png, zones = canvas overlay
// ══════════════════════════════════════════

// Zones positionnées en % sur l'image kanto_map.png (560×556px)
// x/y = centre de la zone en %, w/h = taille en %
// Zone layout — winding path across the Kanto map
// Coordinates in % of canvas (x=left-right, y=top-bottom)
// Path: Bourg-Palette (bottom) → zigzag up through Kanto → Ligue (top-left)
// ══ 20 ZONES — grille 4 colonnes, box plus petites ══
// Colonnes : L(12%), ML(37%), MR(62%), R(87%)
// Lignes   : y = 12, 24, 36, 48, 60, 72, 84, 96 (espacement 12%)
// Box: w=18% h=7% → ~144×39px → pas de chevauchement
const ZONE_ORDER = [
  'bourg-palette','route-3','foret-jade','mt-lune',
  'argenta','brindibourg','route-5-6','celadopole',
  'route-9-10','tour-pokemon','lavanville','grotte-azuria',
  'safrania','route-13-15','parmanie','safari-zone',
  'carmin-sur-mer','route-19-20','iles-ecume','ligue-pokemon',
];

// Serpentement gauche→droite puis droite→gauche
const ZONE_POS = {
  // Ligne 5 bas (départ) → gauche à droite
  'bourg-palette':   { x:12, y:88 },
  'route-3':         { x:37, y:88 },
  'foret-jade':      { x:62, y:88 },
  'mt-lune':         { x:87, y:88 },
  // Ligne 4 → droite à gauche
  'argenta':         { x:87, y:72 },
  'brindibourg':     { x:62, y:72 },
  'route-5-6':       { x:37, y:72 },
  'celadopole':      { x:12, y:72 },
  // Ligne 3 → gauche à droite
  'route-9-10':      { x:12, y:55 },
  'tour-pokemon':    { x:37, y:55 },
  'lavanville':      { x:62, y:55 },
  'grotte-azuria':   { x:87, y:55 },
  // Ligne 2 → droite à gauche
  'safrania':        { x:87, y:38 },
  'route-13-15':     { x:62, y:38 },
  'parmanie':        { x:37, y:38 },
  'safari-zone':     { x:12, y:38 },
  // Ligne 1 haut (arrivée) → gauche à droite
  'carmin-sur-mer':  { x:12, y:21 },
  'route-19-20':     { x:37, y:21 },
  'iles-ecume':      { x:62, y:21 },
  'ligue-pokemon':   { x:87, y:21 },
};

const ROUTE_CONNECTIONS = [
  { from:'bourg-palette',  to:'route-3',        label:'Route 1'  },
  { from:'route-3',        to:'foret-jade',     label:'Route 2'  },
  { from:'foret-jade',     to:'mt-lune',        label:'Route 3'  },
  { from:'mt-lune',        to:'argenta',        label:'Mt.Lune'  },
  { from:'argenta',        to:'brindibourg',    label:'Route 4'  },
  { from:'brindibourg',    to:'route-5-6',      label:'Route 5'  },
  { from:'route-5-6',      to:'celadopole',     label:'Route 6'  },
  { from:'celadopole',     to:'route-9-10',     label:'Route 9'  },
  { from:'route-9-10',     to:'tour-pokemon',   label:'Route 10' },
  { from:'tour-pokemon',   to:'lavanville',     label:'Route 12' },
  { from:'lavanville',     to:'grotte-azuria',  label:'Route 8'  },
  { from:'grotte-azuria',  to:'safrania',       label:'Grotte'   },
  { from:'safrania',       to:'route-13-15',    label:'Route 11' },
  { from:'route-13-15',    to:'parmanie',       label:'Route 13' },
  { from:'parmanie',       to:'safari-zone',    label:'Safari'   },
  { from:'safari-zone',    to:'carmin-sur-mer', label:'Route 15' },
  { from:'carmin-sur-mer', to:'route-19-20',    label:'Route 19' },
  { from:'route-19-20',    to:'iles-ecume',     label:'Route 20' },
  { from:'iles-ecume',     to:'ligue-pokemon',  label:'Route 21' },
  { from:'bourg-palette',  to:'argenta',        label:'Route 22' },
];


const KANTO_ZONES = ZONE_ORDER.map(id => {
  const z = ZONES[id];
  const gl = z?.gymLeader;
  const pos = ZONE_POS[id];
  if (!pos) return null;
  return {
    id, x:pos.x, y:pos.y, w:18, h:7,
    label: z?.name || id,
    type: id === 'ligue-pokemon' ? 'elite'
        : ['foret-jade','tour-pokemon','mt-lune','grotte-azuria'].includes(id) ? 'cave'
        : ['route-3','route-5-6','route-9-10','route-13-15'].includes(id) ? 'route'
        : ['route-19-20','safari-zone'].includes(id) ? 'water'
        : 'city',
  };
}).filter(Boolean);

const ZONE_COLORS = {
  complete:  { fill:'rgba(255,105,180,0.82)', stroke:'#ff69b4', text:'#fff' },
  partial:   { fill:'rgba(60,130,240,0.82)',  stroke:'#4488ff', text:'#fff' },
  locked:    { fill:'rgba(255,140,0,0.82)',   stroke:'#ff8c00', text:'#fff' },
  current:   { fill:'rgba(50,220,100,0.90)',  stroke:'#2dc653', text:'#fff' },
  elite:     { fill:'rgba(220,50,50,0.90)',   stroke:'#e63946', text:'#fff' },
  city:      { fill:'rgba(240,168,64,0.82)',  stroke:'#F0A840', text:'#fff' },
  route:     { fill:'rgba(100,180,80,0.82)',  stroke:'#64b450', text:'#fff' },
  cave:      { fill:'rgba(140,100,80,0.82)',  stroke:'#8C6450', text:'#fff' },
  water:     { fill:'rgba(60,140,240,0.82)',  stroke:'#3c8cf0', text:'#fff' },
};

let selectedZoneId = null;
let mapHitZones    = [];
let mapAnimFrame   = null;
let mapPulseT      = 0;

function getZoneById(id){ return KANTO_ZONES.find(z=>z.id===id); }

// Canvas offscreen carte — persistants entre ouvertures, recréés seulement si dimensions changent
let _mapBgOff = null, _mapBgOffCtx = null, _mapBgDrawn = false;
let _mapRouteOff = null, _mapRouteOffCtx = null, _mapRouteSnap = null;
let _mapOffW = 0, _mapOffH = 0;
function _ensureMapOffscreen(W, H) {
  if (_mapBgOff && _mapOffW === W && _mapOffH === H) return;
  _mapBgOff = document.createElement('canvas'); _mapBgOff.width = W; _mapBgOff.height = H;
  _mapBgOffCtx = _mapBgOff.getContext('2d');
  _mapRouteOff = document.createElement('canvas'); _mapRouteOff.width = W; _mapRouteOff.height = H;
  _mapRouteOffCtx = _mapRouteOff.getContext('2d');
  _mapOffW = W; _mapOffH = H;
  _mapBgDrawn = false; _mapRouteSnap = null;
}

function renderMap() {
  if (!player) return;
  if (!player.visitedZones) player.visitedZones = ['bourg-palette'];
  if (!player.badges)       player.badges = [];

  const wrap   = document.getElementById('map-canvas-wrap');
  const canvas = document.getElementById('map-canvas');
  const W = wrap.clientWidth  || 800;
  const H = wrap.clientHeight || 560;
  canvas.width  = W;
  canvas.height = H;
  mapHitZones = [];
  if (mapAnimFrame) cancelAnimationFrame(mapAnimFrame);
  _ensureMapOffscreen(W, H); // réutilise les canvas si dimensions identiques

  function px(pct){ return pct/100 * W; }
  function py(pct){ return pct/100 * H; }

  // PokéClicker-style gym leader icons
  const GYM_LEADERS = {
    'argenta':        { icon:'🪨', name:'Pierre',  badge:'Badge Pierre'    },
    'brindibourg':    { icon:'💧', name:'Ondine',  badge:'Badge Cascade'   },
    'lavanville':     { icon:'⚡', name:'Surge',   badge:'Badge Foudre'    },
    'celadopole':     { icon:'🌿', name:'Erika',   badge:'Badge Arc-en-Ciel'},
    'carmin-sur-mer': { icon:'💜', name:'Aya',     badge:'Badge Âme'       },
    'parmanie':       { icon:'🎭', name:'Koga',    badge:'Badge Marais'    },
    'safrania':       { icon:'🔮', name:'Sabrina', badge:'Badge Marche'    },
    'iles-ecume':     { icon:'🔥', name:'Blaine',  badge:'Badge Volcan'    },
    'ligue-pokemon':  { icon:'🏆', name:'Champion',badge:'Titre Champion'  },
  };

  // Preload background
  const bgImg = new Image();
  bgImg.src = typeof KANTO_MAP_BG !== 'undefined' ? KANTO_MAP_BG : '';

  function getZoneColor(id) {
    const curZone = player.currentZone || 'bourg-palette';
    if (id === curZone) return ZONE_COLORS.current;
    if (id === 'ligue-pokemon') return ZONE_COLORS.elite;
    const kills = (player.zoneKills||{})[id]||0;
    const needed = ZONE_KILL_NEEDED;
    if (!player.visitedZones.includes(id)) return ZONE_COLORS.locked;
    if (kills >= needed) return ZONE_COLORS.complete;
    return ZONE_COLORS.partial;
  }

  function rr(ctx,x,y,w,h,r){
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
    ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
    ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
    ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
    ctx.closePath();
  }

  // ── Canvas hors-écran : fond (réutilise le canvas module-level) ──
  const bgOffscreen  = _mapBgOff;
  const bgCtx        = _mapBgOffCtx;
  const routeOffscreen = _mapRouteOff;
  const routeCtx     = _mapRouteOffCtx;
  function _drawBgOffscreen() {
    bgCtx.clearRect(0, 0, W, H);
    if (bgImg.complete && bgImg.naturalWidth > 0) {
      bgCtx.drawImage(bgImg, 0, 0, W, H);
      bgCtx.fillStyle = 'rgba(0,0,20,0.22)';
      bgCtx.fillRect(0, 0, W, H);
    } else {
      bgCtx.fillStyle = '#2a5c1a';
      bgCtx.fillRect(0, 0, W, H);
    }
    _mapBgDrawn = true;
  }
  bgImg.onload = () => { _mapBgDrawn = false; };
  function _drawRoutesOffscreen() {
    const cz = player.currentZone || 'bourg-palette';
    routeCtx.clearRect(0, 0, W, H);
    ROUTE_CONNECTIONS.forEach(conn => {
      const fromZ = getZoneById(conn.from);
      const toZ   = getZoneById(conn.to);
      if (!fromZ || !toZ) return;
      const fx = px(fromZ.x), fy = py(fromZ.y);
      const tx = px(toZ.x),   ty = py(toZ.y);
      const fromVisited = player.visitedZones.includes(conn.from) || conn.from === cz;
      const toVisited   = player.visitedZones.includes(conn.to)   || conn.to === cz;
      const routeColor = fromVisited && toVisited ? '#e8d44d'
                       : fromVisited || toVisited  ? '#c8a030'
                       : 'rgba(80,60,20,0.5)';
      routeCtx.save();
      routeCtx.strokeStyle = 'rgba(0,0,0,0.5)';
      routeCtx.lineWidth = 5;
      routeCtx.beginPath(); routeCtx.moveTo(fx,fy); routeCtx.lineTo(tx,ty); routeCtx.stroke();
      routeCtx.strokeStyle = routeColor;
      routeCtx.lineWidth = 3;
      routeCtx.setLineDash(fromVisited ? [] : [8,5]);
      routeCtx.beginPath(); routeCtx.moveTo(fx,fy); routeCtx.lineTo(tx,ty); routeCtx.stroke();
      routeCtx.setLineDash([]);
      if (fromVisited || toVisited) {
        const mx = (fx+tx)/2, my = (fy+ty)/2;
        const angle = Math.atan2(ty-fy, tx-fx);
        const perpX = -Math.sin(angle) * 14;
        const perpY =  Math.cos(angle) * 14;
        const lFontSize = Math.max(8, Math.min(10, W*0.011));
        const lw = conn.label.length * lFontSize * 0.62 + 14;
        const lh = lFontSize + 8;
        routeCtx.save();
        routeCtx.fillStyle = 'rgba(5,5,25,0.88)';
        rr(routeCtx, mx+perpX-lw/2, my+perpY-lh/2, lw, lh, 4);
        routeCtx.fill();
        routeCtx.strokeStyle = routeColor; routeCtx.lineWidth = 1.2;
        rr(routeCtx, mx+perpX-lw/2, my+perpY-lh/2, lw, lh, 4);
        routeCtx.stroke();
        routeCtx.font = `bold ${lFontSize}px 'Press Start 2P',monospace`;
        routeCtx.textAlign = 'center'; routeCtx.textBaseline = 'middle';
        routeCtx.fillStyle = 'rgba(0,0,0,0.7)';
        routeCtx.fillText(conn.label, mx+perpX+0.5, my+perpY+0.5);
        routeCtx.fillStyle = '#ffe066';
        routeCtx.fillText(conn.label, mx+perpX, my+perpY);
        routeCtx.restore();
      }
      routeCtx.restore();
    });
    // Légende statique dans le canvas routes
    const leg = [
      { col:ZONE_COLORS.current.fill,  stroke:ZONE_COLORS.current.stroke,  label:'Zone actuelle' },
      { col:ZONE_COLORS.complete.fill, stroke:ZONE_COLORS.complete.stroke, label:'Complétée ✓' },
      { col:ZONE_COLORS.partial.fill,  stroke:ZONE_COLORS.partial.stroke,  label:'En cours' },
      { col:ZONE_COLORS.locked.fill,   stroke:ZONE_COLORS.locked.stroke,   label:'Non explorée' },
    ];
    const legX = px(1), legY = py(88);
    const legFontSize = Math.max(7, Math.min(9, W*0.011));
    leg.forEach((l,i) => {
      const ly = legY + i*(legFontSize+8);
      routeCtx.fillStyle = 'rgba(0,0,20,0.7)';
      rr(routeCtx, legX-2, ly-2, px(20)+4, legFontSize+8, 3); routeCtx.fill();
      routeCtx.fillStyle = l.col;
      rr(routeCtx, legX, ly, legFontSize, legFontSize, 2); routeCtx.fill();
      routeCtx.strokeStyle = l.stroke; routeCtx.lineWidth=1;
      rr(routeCtx, legX, ly, legFontSize, legFontSize, 2); routeCtx.stroke();
      routeCtx.font = `bold ${legFontSize}px 'Press Start 2P',monospace`;
      routeCtx.textAlign='left'; routeCtx.textBaseline='top';
      routeCtx.fillStyle='rgba(0,0,0,0.8)';
      routeCtx.fillText(l.label, legX+legFontSize+5+0.5, ly+0.5);
      routeCtx.fillStyle='#fff';
      routeCtx.fillText(l.label, legX+legFontSize+5, ly);
    });
    _mapRouteSnap = player.visitedZones.join(',') + '|' + cz;
  }

  // ── drawFrame : limité à ~30fps, travail réduit au minimum par frame ──
  const mainCtx = canvas.getContext('2d');
  let _mapLastDraw = 0;
  function drawFrame(ts) {
    if (ts - _mapLastDraw < 33) { mapAnimFrame = requestAnimationFrame(drawFrame); return; }
    _mapLastDraw = ts;
    mapPulseT += 0.04;
    const curZone = player.currentZone || 'bourg-palette';
    const killNeeded = ZONE_KILL_NEEDED;
    const curKills = (player.zoneKills||{})[curZone]||0;
    const killsOk = curKills >= killNeeded;

    // Reconstruit les caches hors-écran uniquement si l'état a changé
    if (!_mapBgDrawn) _drawBgOffscreen();
    const snap = player.visitedZones.join(',') + '|' + curZone;
    if (snap !== _mapRouteSnap) _drawRoutesOffscreen();

    // Composite rapide : 2 drawImage au lieu de tout redessiner
    mainCtx.drawImage(bgOffscreen, 0, 0);
    mainCtx.drawImage(routeOffscreen, 0, 0);

    // ── ZONES (seule partie vraiment dynamique : pulse zone courante) ──
    mapHitZones = [];
    KANTO_ZONES.forEach(z => {
      if (!ZONES[z.id]) return;
      const cx = px(z.x), cy = py(z.y);
      const bw = px(z.w), bh = py(z.h);
      const x1 = cx-bw/2, y1 = cy-bh/2;
      const rad = Math.min(8, bh*0.4);
      const isCurrent = z.id === curZone;
      const isVisited = player.visitedZones.includes(z.id);
      const gl = GYM_LEADERS[z.id];
      const badgeGot = (player.badges||[]).includes(z.id);
      const col = getZoneColor(z.id);
      const pulse = isCurrent ? 0.65 + 0.35*Math.sin(mapPulseT*2) : 1;

      // Shadow uniquement pour zone courante et zones avec badge (plus pour toutes les zones)
      const needsShadow = isCurrent || badgeGot;
      if (needsShadow) {
        mainCtx.save();
        mainCtx.shadowColor = isCurrent ? '#2dc653' : '#ffd700';
        mainCtx.shadowBlur = isCurrent ? 18*pulse : 10;
      }

      rr(mainCtx, x1, y1, bw, bh, rad);
      mainCtx.fillStyle = col.fill;
      mainCtx.fill();

      rr(mainCtx, x1, y1, bw, bh, rad);
      mainCtx.strokeStyle = isCurrent ? `rgba(255,255,255,${pulse})` : col.stroke;
      mainCtx.lineWidth = isCurrent ? 2.5 : 1.8;
      mainCtx.stroke();

      if (needsShadow) { mainCtx.shadowBlur = 0; mainCtx.restore(); }

      if (gl) {
        const iconSize = Math.max(12, Math.min(18, bh*0.75));
        mainCtx.font = `${iconSize}px serif`;
        mainCtx.textAlign = 'right';
        mainCtx.textBaseline = 'top';
        if (badgeGot) { mainCtx.shadowColor = '#ffd700'; mainCtx.shadowBlur = 8; }
        mainCtx.fillStyle = badgeGot ? '#ffd700' : 'rgba(255,255,255,0.8)';
        mainCtx.fillText(gl.icon, x1+bw-3, y1+2);
        mainCtx.shadowBlur = 0;
      }

      const fs = Math.max(7, Math.min(10, bh*0.36));
      mainCtx.font = `bold ${fs}px 'Press Start 2P',monospace`;
      mainCtx.textAlign = 'center'; mainCtx.textBaseline = 'middle';
      mainCtx.fillStyle = 'rgba(0,0,0,0.9)';
      mainCtx.fillText(z.label, cx+1, cy+1);
      mainCtx.fillStyle = col.text;
      mainCtx.fillText(z.label, cx, cy);

      if (isCurrent) {
        const starSize = bh * 0.7;
        mainCtx.font = `${starSize}px serif`;
        mainCtx.textAlign = 'center'; mainCtx.textBaseline = 'bottom';
        mainCtx.shadowColor = '#ffd700'; mainCtx.shadowBlur = 14 * pulse;
        mainCtx.fillStyle = '#ffd700';
        mainCtx.fillText('★', cx, y1 - 2);
        mainCtx.shadowBlur = 0;
      }

      const accessible = ZONES[curZone]?.connexions?.includes(z.id);
      if (accessible && !isVisited && !killsOk) {
        mainCtx.font = `${bh*0.55}px serif`;
        mainCtx.textAlign = 'right'; mainCtx.textBaseline = 'top';
        mainCtx.fillStyle = 'rgba(255,80,80,0.95)';
        mainCtx.fillText('🔒', x1+bw-1, y1+bh*0.45);
      }

      mapHitZones.push({id:z.id, x1, y1, x2:x1+bw, y2:y1+bh,
        accessible: accessible || isCurrent,
        visited: isVisited, current: isCurrent});
    });

    // ── KILL PROGRESS BAR (dynamique) ──
    const barW = px(22), barH = py(3);
    const barX = W - barW - px(1.5), barY = H - barH - py(1.5);
    mainCtx.fillStyle='rgba(0,0,20,0.75)';
    rr(mainCtx,barX-6,barY-6,barW+12,barH+18,5); mainCtx.fill();
    mainCtx.fillStyle='rgba(255,255,255,0.08)';
    mainCtx.fillRect(barX, barY, barW, barH);
    const prog = Math.min(1, curKills/killNeeded);
    mainCtx.fillStyle = prog>=1 ? '#2dc653' : '#ffd60a';
    mainCtx.fillRect(barX, barY, barW*prog, barH);
    mainCtx.strokeStyle='rgba(255,255,255,0.2)'; mainCtx.lineWidth=1;
    mainCtx.strokeRect(barX, barY, barW, barH);
    const bfSize = Math.max(7,Math.min(9,W*0.011));
    mainCtx.font=`bold ${bfSize}px 'Press Start 2P',monospace`;
    mainCtx.textAlign='center'; mainCtx.textBaseline='bottom';
    mainCtx.fillStyle='rgba(0,0,0,0.8)';
    mainCtx.fillText(`${curKills}/${killNeeded} combats`, barX+barW/2+0.5, barY-1.5);
    mainCtx.fillStyle='#fff';
    mainCtx.fillText(`${curKills}/${killNeeded} combats`, barX+barW/2, barY-2);

    mapAnimFrame = requestAnimationFrame(drawFrame);
  }

  drawFrame();

  const curZone = player.currentZone || 'bourg-palette';
  hoverZone(curZone);
  document.getElementById('map-cur-zone-lbl').textContent = 'Zone : '+(ZONES[curZone]?.name || curZone);
  selectedZoneId = null;
  document.getElementById('btn-travel').style.display = 'none';
  const gymBtn = document.getElementById('btn-gym');
  if (gymBtn) gymBtn.style.display = 'none';
}


// roundRect helper
function rr(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
  ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
  ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
  ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
  ctx.closePath();
}

function hoverZone(id) {
  const z = ZONES[id]; if (!z) return;
  const kz = getZoneById(id);
  const col = ZONE_COLORS[kz?.type || 'route'] || ZONE_COLORS.route;
  const gl = z.gymLeader;
  const badgeEarned = (player.badges||[]).includes(id);

  document.getElementById('zone-info-name').textContent = z.name;
  const badge = document.getElementById('zone-info-type-badge');
  if (gl) {
    badge.textContent = badgeEarned ? `✅ ${gl.badge}` : `🏅 Arène — ${gl.badge}`;
    badge.style.background = badgeEarned ? 'rgba(45,198,83,.8)' : col.fill.replace(/[\d.]+\)$/, '0.9)');
  } else {
    badge.textContent = 'DÉPART';
    badge.style.background = col.fill.replace(/[\d.]+\)$/, '0.9)');
  }
  badge.style.color = col.text;
  badge.style.border = '1px solid ' + col.stroke;

  const descEl = document.getElementById('zone-info-desc');
  if (gl) {
    descEl.innerHTML = `${z.desc}<br><span style="color:rgba(255,255,255,.5);font-size:.6rem">${gl.quote}</span>`;
  } else {
    descEl.textContent = z.desc + ' — ' + z.pokemon.length + ' espèces';
  }

  const pd = document.getElementById('zone-info-pokes');
  pd.innerHTML = '';
  if (gl) {
    // Show gym leader team sprites
    gl.team.forEach(p => {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:2px';
      const img = document.createElement('img');
      img.src = SPRITE_FRONT(p.id); img.className = 'zone-poke-mini';
      img.title = `${p.n} Niv.${p.lv}`;
      const lbl = document.createElement('div');
      lbl.style.cssText = 'font-family:\'Press Start 2P\',monospace;font-size:.25rem;color:rgba(255,255,255,.5)';
      lbl.textContent = `Nv${p.lv}`;
      wrap.appendChild(img); wrap.appendChild(lbl);
      pd.appendChild(wrap);
    });
  } else {
    z.pokemon.slice(0,12).forEach(pid => {
      const img = document.createElement('img');
      img.src = SPRITE_FRONT(pid); img.className = 'zone-poke-mini';
      img.title = ((typeof ALL_POKEMON!=='undefined')?ALL_POKEMON:GEN1).find(p=>p.id===pid)?.n||'';
      pd.appendChild(img);
    });
  }

  // Kill counter
  const killInfo = document.getElementById('zone-kill-info');
  if (killInfo && player) {
    const killNeeded = ZONE_KILL_NEEDED;
    const kills = (player.zoneKills||{})[id]||0;
    const curZone = player.currentZone || 'bourg-palette';
    const isVisited = (player.visitedZones||[]).includes(id);
    const accessible = ZONES[curZone]?.connexions || [];

    if (id === curZone) {
      killInfo.style.display = 'block';
      const glBtn = gl && !badgeEarned ? ` · <span style="color:#ffd700">Arène disponible !</span>` : gl && badgeEarned ? ` · <span style="color:#2dc653">Badge obtenu ✅</span>` : '';
      killInfo.innerHTML = `Zone actuelle · ${kills}/${killNeeded} Pokémon vaincus${glBtn}`;
      killInfo.style.color = 'rgba(255,255,255,.5)';
    } else if (isVisited) {
      killInfo.style.display = 'block';
      killInfo.textContent = '✅ Déjà visitée — voyage libre !';
      killInfo.style.color = 'var(--green)';
    } else if (accessible.includes(id)) {
      killInfo.style.display = 'block';
      const curKills = (player.zoneKills||{})[curZone]||0;
      if (curKills >= killNeeded) {
        killInfo.textContent = `✅ Prêt à explorer ! (${curKills}/${killNeeded})`;
        killInfo.style.color = 'var(--green)';
      } else {
        killInfo.textContent = `🔒 Vaincre ${killNeeded - curKills} Pokémon ici d'abord`;
        killInfo.style.color = 'rgba(255,100,100,.9)';
      }
    } else {
      killInfo.style.display = 'none';
    }
  }
}

// ── GYM LEADER BATTLE ──
function challengeGymLeader(zoneId) {
  const z = ZONES[zoneId]; if (!z || !z.gymLeader) return;
  if ((player.badges||[]).includes(zoneId)) { notify(`✅ Badge déjà obtenu !`); return; }
  const gl = z.gymLeader;

  // Build gym leader "enemy" — use first team member as representative, fight sequentially
  player._gymBattle = { zoneId, teamIdx: 0 };
  const p = gl.team[0];
  const gymEnemy = { ...p, maxHp: p.hp, xp: Math.round(p.lv*8), gold: Math.round(gl.reward/gl.team.length), isShiny: false };
  showScreen('game');
  document.getElementById('screen-map').classList.remove('active');
  document.getElementById('screen-map').style.display = 'none';

  // Show leader intro
  notify(`⚔️ ${gl.name} : ${gl.quote}`);
  setMessage(`⚔️ Le Champion ${gl.name} (${gl.title}) vous défie ! Équipe : ${gl.team.length} Pokémon.`);
  setTimeout(() => startGymBattle(zoneId, 0), 800);
}

function startGymBattle(zoneId, teamIdx) {
  const gl = ZONES[zoneId].gymLeader;
  const p = gl.team[teamIdx];
  const gymEnemy = {
    name: p.n, id: p.id, level: p.lv,
    hp: p.hp, maxHp: p.hp, atk: p.atk, def: p.def, spd: p.spd,
    type: p.type, xp: Math.round(p.lv * 8),
    gold: teamIdx === gl.team.length - 1 ? gl.reward : 0,
    isShiny: false,
  };
  player._gymBattle = { zoneId, teamIdx };
  startBattle(gymEnemy);
}

function challengeGymFromMap() {
  const id = selectedZoneId || player.currentZone;
  challengeGymLeader(id);
}

function handleGymVictory() {
  if (!player._gymBattle) return false;
  const { zoneId, teamIdx } = player._gymBattle;
  const gl = ZONES[zoneId].gymLeader;
  const nextIdx = teamIdx + 1;
  if (nextIdx < gl.team.length) {
    setMessage(`⚔️ ${gl.name} envoie son prochain Pokémon !`);
    setTimeout(() => startGymBattle(zoneId, nextIdx), 1600);
    return true;
  } else {
    player._gymBattle = null;
    if (!player.badges) player.badges = [];
    if (!player.badges.includes(zoneId)) player.badges.push(zoneId);
    player.gold += gl.reward;
    updateHUD();
    notify(`🏅 ${gl.badge} obtenu !`);
    setMessage(`🏆 Vous avez vaincu ${gl.name} ! ${gl.badgeIcon} ${gl.badge} obtenu ! +${gl.reward}₽`);
    setTimeout(() => notify(`🏅 ${(player.badges||[]).length}/9 badges !`), 1500);
    setTimeout(() => { stopAutoBattle(); syncActiveFromPlayer(); showScreen('game'); updateHUD(); }, 2000);
    return true;
  }
}

function selectZone(id) {
  const z = ZONES[id]; if (!z) return;
  const curZone = player.currentZone || 'bourg-palette';
  if (!player.visitedZones) player.visitedZones = ['bourg-palette'];
  const isVisited = player.visitedZones.includes(id);
  const isCurrent = id === curZone;
  const killNeeded = ZONE_KILL_NEEDED;
  const kills = (player.zoneKills||{})[curZone]||0;
  const killsOk = kills >= killNeeded;

  hoverZone(id);

  if (isCurrent) {
    selectedZoneId = null;
    document.getElementById('btn-travel').style.display = 'none';
    // Show gym button if zone has gym leader and badge not yet earned
    const gl = ZONES[id]?.gymLeader;
    const gymBtn = document.getElementById('btn-gym');
    if (gymBtn) gymBtn.style.display = (gl && !(player.badges||[]).includes(id)) ? 'block' : 'none';
    return;
  }

  if (isVisited) {
    selectedZoneId = id;
    const btn = document.getElementById('btn-travel');
    btn.style.display = 'block';
    btn.disabled = false;
    btn.textContent = `🚶 Aller à ${z.name}`;
    const gymBtn = document.getElementById('btn-gym');
    if (gymBtn) gymBtn.style.display = 'none';
  } else {
    // Zone non encore visitée — doit être adjacente ET avoir les kills
    const accessible = ZONES[curZone]?.connexions || [];
    if (accessible.includes(id)) {
      selectedZoneId = id;
      const btn = document.getElementById('btn-travel');
      btn.style.display = 'block';
      if (killsOk) {
        btn.disabled = false;
        btn.textContent = `🚶 Explorer ${z.name}`;
      } else {
        btn.disabled = true;
        btn.textContent = `🔒 ${kills}/${killNeeded} victoires requises`;
      }
    } else {
      selectedZoneId = null;
      document.getElementById('btn-travel').style.display = 'none';
    }
  }
}

function travelToZone() {
  if (!selectedZoneId || !player) return;
  const z = ZONES[selectedZoneId]; if (!z) return;
  if (!player.visitedZones) player.visitedZones = ['bourg-palette'];
  const isVisited = player.visitedZones.includes(selectedZoneId);
  const curZone = player.currentZone || 'bourg-palette';

  // Si la zone n'est pas encore visitée, vérifier les kills
  if (!isVisited) {
    const killNeeded = ZONE_KILL_NEEDED;
    const kills = (player.zoneKills||{})[curZone]||0;
    if (kills < killNeeded) {
      notify(`🔒 Vaincre ${killNeeded - kills} Pokémon de plus dans cette zone !`);
      return;
    }
  }

  player.currentZone = selectedZoneId;
  if (!player.visitedZones.includes(selectedZoneId)) player.visitedZones.push(selectedZoneId);
  if (mapAnimFrame) { cancelAnimationFrame(mapAnimFrame); mapAnimFrame = null; }
  showScreen('game');
  showZone(z.name);
  setMessage(`Vous arrivez à ${z.name} ! ${z.desc}`);
  updateHUD(); 
  notify(`→ ${z.name}`);
}

document.getElementById('map-canvas').addEventListener('mousemove',e=>{
  const rect=e.target.getBoundingClientRect();
  const mx=e.clientX-rect.left, my=e.clientY-rect.top;
  const hit=mapHitZones.find(z=>mx>=z.x1&&mx<=z.x2&&my>=z.y1&&my<=z.y2);
  const tip=document.getElementById('map-tooltip');
  if(hit&&ZONES[hit.id]){
    hoverZone(hit.id);
    const isVisited = player.visitedZones?.includes(hit.id);
    const isCurrent = hit.id === (player.currentZone||'bourg-palette');
    let tipSuffix = '';
    if (isCurrent) tipSuffix = ' ✦ Zone actuelle';
    else if (isVisited) tipSuffix = ' ✦ Cliquer pour y retourner';
    else if (hit.accessible) tipSuffix = ' ✦ Nouvelle zone — cliquer';
    tip.textContent = ZONES[hit.id].name + tipSuffix;
    tip.style.left=(mx+14)+'px'; tip.style.top=(my-12)+'px';
    tip.classList.add('show');
    e.target.style.cursor=hit.accessible?'pointer':(hit.current?'default':'default');
  } else {
    tip.classList.remove('show');
    e.target.style.cursor='default';
  }
});
document.getElementById('map-canvas').addEventListener('click',e=>{
  const rect=e.target.getBoundingClientRect();
  const mx=e.clientX-rect.left, my=e.clientY-rect.top;
  const hit=mapHitZones.find(z=>mx>=z.x1&&mx<=z.x2&&my>=z.y1&&my<=z.y2);
  if(hit) selectZone(hit.id);
});
document.getElementById('map-canvas').addEventListener('mouseleave',()=>{
  document.getElementById('map-tooltip').classList.remove('show');
});

// ══════════════════════════════════════════
// SWITCH POKEMON IN BATTLE
// ══════════════════════════════════════════
let switchForcedAfterKO = false;

function refreshBattlePlayerUI() {
  const activePoke = getActivePoke();
  document.getElementById('player-battle-img').src = activePoke?.isShiny ? SPRITE_SHINY(player.currentSpriteId) : SPRITE_FRONT(player.currentSpriteId);
  const shinyLabel = activePoke?.isShiny ? ' ✨' : '';
  document.getElementById('b-player-name').textContent = player.currentName + shinyLabel;
  document.getElementById('b-player-level').textContent = 'Niv.'+player.level;
  const pSpdEl = document.getElementById('b-player-spd');
  if (pSpdEl) pSpdEl.textContent = '⚡'+player.spd;
  const pTypeBadge = document.getElementById('b-player-type');
  const dual = player.dualType || getPokeType(player.currentSpriteId, player.type);
  if (dual.includes('/')) {
    const [t1,t2] = dual.split('/');
    pTypeBadge.innerHTML = `<span class="poke-type-badge type-${t1}" style="margin-right:2px">${t1}</span><span class="poke-type-badge type-${t2}">${t2}</span>`;
    pTypeBadge.className = '';
  } else {
    pTypeBadge.textContent = dual;
    pTypeBadge.className = 'poke-type-badge type-'+dual;
  }
  const _ba = _hud('btn-attack'); const _bm = _hud('btn-magic');
  const _ah = `⚔ ${player.move} <span class="atk-elem-badge elem-${player.moveElem||player.type}">${player.moveElem||player.type}</span>`;
  const _mh = `✨ ${player.mMove} <span class="atk-elem-badge elem-${player.mMoveElem||player.type}">${player.mMoveElem||player.type}</span>`;
  if (_ba) { _ba.innerHTML = _ah; _ba._cachedHtml = _ah; }
  if (_bm) { _bm.innerHTML = _mh; _bm._cachedHtml = _mh; }
  updateBattleHp(); updateHUD();
}

function openSwitchMenu(forced=false) {
  const hasAlive = (player?.roster||[]).some((p,i) => i !== (player.activeRosterIdx||0) && p.hp > 0);
  if (!hasAlive) {
    if (!forced) notify('Pas d\'autre Pokémon disponible !');
    return;
  }
  switchForcedAfterKO = forced;
  battleBusy = false; // réinitialise l'état pour éviter tout blocage
  const list = document.getElementById('switch-poke-list');
  list.innerHTML = '';

  const cancelBtn = document.getElementById('btn-cancel-switch');
  if (cancelBtn) cancelBtn.style.display = forced ? 'none' : '';

  player.roster.forEach((p, idx) => {
    const isActive = idx === (player.activeRosterIdx||0);
    const isFainted = p.hp <= 0;
    const dual = p.dualType || getPokeType(p.currentSpriteId||p.spriteId, p.type);
    const typeBadges = dual.includes('/')
      ? dual.split('/').map(t=>`<span class="poke-type-badge type-${t}" style="font-size:.28rem;padding:.1rem .35rem">${t}</span>`).join('')
      : `<span class="poke-type-badge type-${dual}" style="font-size:.28rem;padding:.1rem .35rem">${dual}</span>`;
    const imgSrc = p.isShiny ? SPRITE_SHINY(p.currentSpriteId||p.spriteId) : SPRITE_FRONT(p.currentSpriteId||p.spriteId);
    const shinyStyle = p.isShiny ? 'filter:drop-shadow(0 0 5px #ffd700)' : '';
    const shinyLabel = p.isShiny ? ' ✨' : '';
    const selectable = !isFainted && !isActive;
    const card = document.createElement('div');
    card.className = `switch-poke-card${isActive?' active-poke':''}${isFainted?' fainted':''}`;
    card.dataset.rosterIdx = idx;
    card.dataset.selectable = selectable ? '1' : '0';
    card.innerHTML = `
      <img src="${imgSrc}" style="width:64px;height:64px;image-rendering:pixelated;${shinyStyle}"/>
      <div style="font-family:'Press Start 2P',monospace;font-size:.38rem;color:${p.isShiny?'#ffd700':'var(--yellow)'};line-height:1.6">${p.currentName||p.name}${shinyLabel}${isActive?' ★':''}</div>
      <div style="font-family:'Press Start 2P',monospace;font-size:.32rem;color:rgba(255,255,255,.6)">Niv.${p.level}</div>
      <div style="display:flex;gap:2px;flex-wrap:wrap;justify-content:center">${typeBadges}</div>
      <div style="width:90px;height:5px;background:rgba(0,0,0,.4);border-radius:999px;overflow:hidden;margin-top:.2rem">
        <div style="height:100%;background:linear-gradient(90deg,#e63946,#ff6b9d);width:${Math.max(0,Math.round((p.hp/p.maxHp)*100))}%;border-radius:999px"></div>
      </div>
      <div style="font-size:.6rem;color:rgba(255,255,255,.5)">${Math.ceil(p.hp)}/${p.maxHp}</div>
      ${selectable ? '' : `<div style="font-size:.55rem;color:rgba(255,100,100,.7);margin-top:.2rem">${isFainted?'K.O.':'En combat'}</div>`}
    `;
    list.appendChild(card);
  });

  // Event delegation — un seul handler sur le conteneur
  list.onclick = (e) => {
    const card = e.target.closest('[data-roster-idx]');
    if (!card || card.dataset.selectable !== '1') return;
    confirmSwitch(parseInt(card.dataset.rosterIdx, 10));
  };

  const menu = document.getElementById('switch-pokemon-menu');
  menu.style.display = 'flex';
  menu.classList.add('active');
}

function closeSwitchMenu() {
  if (switchForcedAfterKO) return;
  const menu = document.getElementById('switch-pokemon-menu');
  menu.style.display = 'none';
  menu.classList.remove('active');
}

function confirmSwitch(idx) {
  const success = switchToRosterPoke(idx, true);
  if (!success) return;
  const _sm = document.getElementById('switch-pokemon-menu');
  _sm.style.display = 'none';
  _sm.classList.remove('active');
  switchForcedAfterKO = false;

  refreshBattlePlayerUI();
  (_hud('battle-log')).textContent = `⇄ Go, ${player.currentName} !`;

  // Enemy gets a free attack on switch
  disableBattleButtons(true);
  setBattleTurn('enemy');
}

// MINIMAP
// ══════════════════════════════════════════
const mapState={ px:50, py:60 };
function drawMinimap() {
  const canvas=document.getElementById('minimap-canvas'), ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,100,80);
  ctx.fillStyle='#0a1a3a'; ctx.fillRect(0,0,100,80);
  ctx.fillStyle='#1a4060'; ctx.fillRect(0,20,100,25);
  ctx.fillStyle='#c9a96e'; ctx.fillRect(0,45,100,35);
  ctx.fillStyle='#2d7a3a'; ctx.fillRect(5,48,30,20); ctx.fillRect(60,50,25,15);
  mapState.px=Math.min(92,Math.max(8,mapState.px+(Math.random()-.5)*4));
  mapState.py=Math.min(74,Math.max(50,mapState.py+(Math.random()-.5)*2));
  ctx.fillStyle='#ffd60a'; ctx.beginPath(); ctx.arc(mapState.px,mapState.py,3.5,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='rgba(255,214,10,.6)'; ctx.lineWidth=1; ctx.stroke();
}

// ══════════════════════════════════════════
// CLASS SELECTION
// ══════════════════════════════════════════
document.getElementById('class-grid').addEventListener('click', e=>{
  const btn=e.target.closest('.class-btn');
  if (!btn) return;
  document.querySelectorAll('.class-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
});

// ══════════════════════════════════════════
// SYSTÈME DE TALENTS (GACHA)
// ══════════════════════════════════════════

// Définition de tous les talents avec raretés
// ── TALENT ICONS (SVG inline, style gaming)
const TALENT_ICONS = {
  // Commun — orange axe style
  'force':    `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M8 24 L20 12 L24 8 L28 4 L28 8 L24 12 L28 16 L24 20 L20 16 L8 28 Z" fill="#ff8c00" stroke="#ffd060" stroke-width="1"/><rect x="4" y="22" width="10" height="4" rx="2" fill="#cc6600" transform="rotate(-45 9 24)"/></svg>`,
  'defense':  `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M16 3 L28 9 L28 19 C28 25 22 30 16 31 C10 30 4 25 4 19 L4 9 Z" fill="none" stroke="#7ab8ff" stroke-width="2.5"/><path d="M16 7 L25 12 L25 19 C25 24 21 28 16 29 C11 28 7 24 7 19 L7 12 Z" fill="#1a3a6a"/><path d="M16 11 L16 22 M11 16 L21 16" stroke="#7ab8ff" stroke-width="2" stroke-linecap="round"/></svg>`,
  'vitalite': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M16 28 C16 28 4 20 4 12 C4 7.6 7.6 4 12 4 C14 4 15.8 4.9 16 6 C16.2 4.9 18 4 20 4 C24.4 4 28 7.6 28 12 C28 20 16 28 16 28Z" fill="#e63946" stroke="#ff9ab0" stroke-width="1"/><path d="M10 13 L14 13 L16 10 L18 16 L20 13 L22 13" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>`,
  'vitesse':  `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M20 4 L12 18 L18 18 L12 28 L28 12 L20 12 Z" fill="url(#bolt_grad)" stroke="#b060ff" stroke-width="1"/><defs><linearGradient id="bolt_grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c060ff"/><stop offset="100%" stop-color="#6020cc"/></linearGradient></defs></svg>`,
  'fortune':  `<svg viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="12" fill="#ffd700" stroke="#ffaa00" stroke-width="1.5"/><text x="16" y="21" text-anchor="middle" font-size="14" font-weight="bold" fill="#7a5500">₽</text></svg>`,
  'concentration': `<svg viewBox="0 0 32 32" width="28" height="28"><circle cx="16" cy="16" r="12" fill="none" stroke="#4cc9f0" stroke-width="2"/><circle cx="16" cy="16" r="7" fill="none" stroke="#4cc9f0" stroke-width="1.5"/><circle cx="16" cy="16" r="3" fill="#4cc9f0"/><line x1="16" y1="4" x2="16" y2="8" stroke="#4cc9f0" stroke-width="2"/><line x1="16" y1="24" x2="16" y2="28" stroke="#4cc9f0" stroke-width="2"/><line x1="4" y1="16" x2="8" y2="16" stroke="#4cc9f0" stroke-width="2"/><line x1="24" y1="16" x2="28" y2="16" stroke="#4cc9f0" stroke-width="2"/></svg>`,
  'endurance': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M8 8 L24 8 L24 26 C24 26 16 30 8 26 Z" fill="#2dc653" stroke="#06d6a0" stroke-width="1.5"/><path d="M12 17 L15 20 L21 13" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  'berserker': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M16 2 L20 10 L30 10 L22 16 L25 26 L16 20 L7 26 L10 16 L2 10 L12 10 Z" fill="#ff4400" stroke="#ff8800" stroke-width="1.5"/><path d="M16 2 L20 10 L30 10 L22 16 L25 26 L16 20" fill="#cc2200" opacity="0.5"/></svg>`,
  'titan':    `<svg viewBox="0 0 32 32" width="28" height="28"><rect x="6" y="14" width="20" height="16" rx="3" fill="#8a6a40" stroke="#c8a060" stroke-width="1.5"/><path d="M4 16 L16 4 L28 16" fill="#6a4a20" stroke="#c8a060" stroke-width="1.5"/><rect x="12" y="20" width="8" height="10" rx="1" fill="#5a3a10"/></svg>`,
  'mercure':  `<svg viewBox="0 0 32 32" width="28" height="28"><ellipse cx="16" cy="20" rx="10" ry="8" fill="#c0c0e0" stroke="#8080c0" stroke-width="1.5"/><circle cx="16" cy="12" r="6" fill="#e0e0ff" stroke="#8080c0" stroke-width="1.5"/><path d="M13 8 L16 3 L19 8" fill="#a0a0d0" stroke="#8080c0" stroke-width="1"/><line x1="16" y1="3" x2="16" y2="0" stroke="#a0a0d0" stroke-width="1.5"/></svg>`,
  'chasseur': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M16 4 L19 13 L28 13 L21 18 L24 27 L16 22 L8 27 L11 18 L4 13 L13 13 Z" fill="#44aa44" stroke="#88ee88" stroke-width="1.2"/></svg>`,
  'fortune3': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M16 2 L18 8 L24 6 L20 12 L28 12 L22 16 L28 20 L20 20 L24 26 L18 24 L16 30 L14 24 L8 26 L12 20 L4 20 L10 16 L4 12 L12 12 L8 6 L14 8 Z" fill="#ffd700" stroke="#ffaa00" stroke-width="1"/></svg>`,
  'elu':      `<svg viewBox="0 0 32 32" width="28" height="28"><defs><radialGradient id="elu_g" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff"/><stop offset="40%" stop-color="#ffd700"/><stop offset="100%" stop-color="#ff8c00"/></radialGradient></defs><path d="M16 2 L20 12 L30 12 L22 18 L25 28 L16 22 L7 28 L10 18 L2 12 L12 12 Z" fill="url(#elu_g)" stroke="#ffe066" stroke-width="1.5"/><circle cx="16" cy="16" r="4" fill="#fff" opacity="0.6"/></svg>`,
  'dragon':   `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M16 4 C10 4 4 9 4 15 C4 22 10 28 16 28 C22 28 28 22 28 16 C28 9 23 4 16 4Z" fill="#1a0a3a" stroke="#8844ff" stroke-width="2"/><path d="M16 8 L20 14 L16 12 L12 14 Z" fill="#ff4400"/><path d="M16 12 L24 16 L20 20 L16 16 L12 20 L8 16 Z" fill="#8844ff" stroke="#cc88ff" stroke-width="0.8"/><circle cx="11" cy="12" r="2" fill="#ff0"/><circle cx="21" cy="12" r="2" fill="#ff0"/></svg>`,
  'revenant': `<svg viewBox="0 0 32 32" width="28" height="28"><path d="M16 4 C10 4 6 8 6 14 C6 18 8 21 10 23 L10 28 L14 28 L14 25 L18 25 L18 28 L22 28 L22 23 C24 21 26 18 26 14 C26 8 22 4 16 4Z" fill="#3a0a5a" stroke="#cc44ff" stroke-width="1.5"/><circle cx="12" cy="14" r="2.5" fill="#ff44ff"/><circle cx="20" cy="14" r="2.5" fill="#ff44ff"/><path d="M12 21 Q16 18 20 21" stroke="#cc44ff" stroke-width="1.5" fill="none"/></svg>`,
  'providence':`<svg viewBox="0 0 32 32" width="28" height="28"><defs><radialGradient id="prov_g" cx="50%" cy="30%" r="70%"><stop offset="0%" stop-color="#ffffff"/><stop offset="50%" stop-color="#88ffcc"/><stop offset="100%" stop-color="#0044aa"/></radialGradient></defs><path d="M16 2 L18 8 L24 5 L21 11 L28 11 L23 15 L26 22 L20 19 L18 26 L16 20 L14 26 L12 19 L6 22 L9 15 L4 11 L11 11 L8 5 L14 8 Z" fill="url(#prov_g)" stroke="#88ffcc" stroke-width="1.5"/></svg>`,
};

function getTalentIcon(id) {
  if (id.startsWith('force'))    return TALENT_ICONS.force;
  if (id.startsWith('defense'))  return TALENT_ICONS.defense;
  if (id.startsWith('vitalite')) return TALENT_ICONS.vitalite;
  if (id.startsWith('vitesse'))  return TALENT_ICONS.vitesse;
  if (id === 'fortune-3')        return TALENT_ICONS.fortune3;
  if (id.startsWith('fortune'))  return TALENT_ICONS.fortune;
  if (id === 'concentration')    return TALENT_ICONS.concentration;
  if (id === 'endurance')        return TALENT_ICONS.endurance;
  if (id === 'berserker')        return TALENT_ICONS.berserker;
  if (id === 'titan')            return TALENT_ICONS.titan;
  if (id === 'mercure')          return TALENT_ICONS.mercure;
  if (id === 'chasseur')         return TALENT_ICONS.chasseur;
  if (id === 'elu')              return TALENT_ICONS.elu;
  if (id === 'dragon-soul')      return TALENT_ICONS.dragon;
  if (id === 'revenant')         return TALENT_ICONS.revenant;
  if (id === 'providence')       return TALENT_ICONS.providence;
  return TALENT_ICONS.force;
}

const TALENT_DEFS = [
  // ── COMMUN (60%) ──
  { id:'force-1',      name:'Force I',       tier:'commun',    color:'#ff8c00', desc:'+10% ATK',       apply:p=>{ p.atk=Math.round(p.atk*1.10); p.magic=Math.round(p.magic*1.10); } },
  { id:'force-2',      name:'Force II',      tier:'commun',    color:'#ff8c00', desc:'+18% ATK',       apply:p=>{ p.atk=Math.round(p.atk*1.18); p.magic=Math.round(p.magic*1.18); } },
  { id:'defense-1',    name:'Défense I',     tier:'commun',    color:'#7ab8ff', desc:'+10% DEF',       apply:p=>{ p.def=Math.round(p.def*1.10); } },
  { id:'defense-2',    name:'Défense II',    tier:'commun',    color:'#7ab8ff', desc:'+18% DEF',       apply:p=>{ p.def=Math.round(p.def*1.18); } },
  { id:'vitalite-1',   name:'Vitalité I',    tier:'commun',    color:'#e63946', desc:'+10% PV max',    apply:p=>{ p.maxHp=Math.round(p.maxHp*1.10); p.hp=p.maxHp; } },
  { id:'vitalite-2',   name:'Vitalité II',   tier:'commun',    color:'#e63946', desc:'+18% PV max',    apply:p=>{ p.maxHp=Math.round(p.maxHp*1.18); p.hp=p.maxHp; } },
  { id:'vitesse-1',    name:'Vitesse I',     tier:'commun',    color:'#b060ff', desc:'+10% VIT',       apply:p=>{ p.spd=Math.round(p.spd*1.10); } },
  { id:'fortune-1',    name:'Fortune I',     tier:'commun',    color:'#ffd700', desc:'+15% or gagné',  apply:p=>{ p._fortuneBonus=(p._fortuneBonus||0)+0.15; } },
  // ── RARE (28%) ──
  { id:'force-3',      name:'Force III',     tier:'rare',      color:'#ff8c00', desc:'+30% ATK',       apply:p=>{ p.atk=Math.round(p.atk*1.30); p.magic=Math.round(p.magic*1.30); } },
  { id:'defense-3',    name:'Défense III',   tier:'rare',      color:'#7ab8ff', desc:'+30% DEF',       apply:p=>{ p.def=Math.round(p.def*1.30); } },
  { id:'vitalite-3',   name:'Vitalité III',  tier:'rare',      color:'#e63946', desc:'+30% PV max',    apply:p=>{ p.maxHp=Math.round(p.maxHp*1.30); p.hp=p.maxHp; } },
  { id:'vitesse-2',    name:'Vitesse II',    tier:'rare',      color:'#b060ff', desc:'+25% VIT',       apply:p=>{ p.spd=Math.round(p.spd*1.25); } },
  { id:'fortune-2',    name:'Fortune II',    tier:'rare',      color:'#ffd700', desc:'+30% or gagné',  apply:p=>{ p._fortuneBonus=(p._fortuneBonus||0)+0.30; } },
  { id:'concentration',name:'Concentration', tier:'rare',      color:'#4cc9f0', desc:'+20% ATK & VIT', apply:p=>{ p.atk=Math.round(p.atk*1.20); p.spd=Math.round(p.spd*1.20); } },
  { id:'endurance',    name:'Endurance',     tier:'rare',      color:'#2dc653', desc:'+20% DEF & PV',  apply:p=>{ p.def=Math.round(p.def*1.20); p.maxHp=Math.round(p.maxHp*1.20); p.hp=p.maxHp; } },
  // ── ÉPIQUE (10%) ──
  { id:'berserker',    name:'Berserker',     tier:'epique',    color:'#ff4400', desc:'+50% ATK, -20% DEF',    apply:p=>{ p.atk=Math.round(p.atk*1.50); p.magic=Math.round(p.magic*1.50); p.def=Math.round(p.def*0.80); } },
  { id:'titan',        name:'Titan',         tier:'epique',    color:'#c8a060', desc:'+50% PV & DEF',          apply:p=>{ p.maxHp=Math.round(p.maxHp*1.50); p.hp=p.maxHp; p.def=Math.round(p.def*1.50); } },
  { id:'mercure',      name:'Mercure',       tier:'epique',    color:'#c0c0e0', desc:'+60% VIT',               apply:p=>{ p.spd=Math.round(p.spd*1.60); } },
  { id:'chasseur',     name:'Chasseur',      tier:'epique',    color:'#44aa44', desc:'+35% ATK, MAG & VIT',   apply:p=>{ p.atk=Math.round(p.atk*1.35); p.magic=Math.round(p.magic*1.35); p.spd=Math.round(p.spd*1.35); } },
  { id:'fortune-3',    name:'Fortune III',   tier:'epique',    color:'#ffd700', desc:'+60% or, +10% XP',      apply:p=>{ p._fortuneBonus=(p._fortuneBonus||0)+0.60; p._xpBonus=(p._xpBonus||0)+0.10; } },
  // ── LÉGENDAIRE (2%) ──
  { id:'elu',          name:"L'Élu",         tier:'legendaire',color:'#ffe066', desc:'+80% ATK, +50% VIT, +30% PV', apply:p=>{ p.atk=Math.round(p.atk*1.80); p.magic=Math.round(p.magic*1.80); p.spd=Math.round(p.spd*1.50); p.maxHp=Math.round(p.maxHp*1.30); p.hp=p.maxHp; p._isElu=true; } },
  { id:'dragon-soul',  name:'Âme du Dragon', tier:'legendaire',color:'#cc88ff', desc:'+100% ATK Spé, +40% DEF',    apply:p=>{ p.magic=Math.round(p.magic*2.0); p.spAtk=Math.round((p.spAtk||p.magic)*2.0); p.def=Math.round(p.def*1.40); p._dragonSoul=true; } },
  { id:'revenant',     name:'Revenant',      tier:'legendaire',color:'#cc44ff', desc:'Ressuscite 1× avec 50% PV',  apply:p=>{ p._revenant=true; } },
  { id:'providence',   name:'Providence',    tier:'legendaire',color:'#88ffcc', desc:'+50% tout + triple or',       apply:p=>{ ['atk','def','magic','spd'].forEach(s=>{p[s]=Math.round(p[s]*1.5);}); p.maxHp=Math.round(p.maxHp*1.5); p.hp=p.maxHp; p._fortuneBonus=(p._fortuneBonus||0)+2.0; } },
];

const TALENT_TIERS = {
  commun:     { label:'Commun',    odds:0.60, color:'#aaaaaa', bg:'rgba(170,170,170,.12)' },
  rare:       { label:'Rare',      odds:0.28, color:'#4488ff', bg:'rgba(68,136,255,.12)' },
  epique:     { label:'Épique',    odds:0.10, color:'#ff6600', bg:'rgba(255,102,0,.12)' },
  legendaire: { label:'Légendaire',odds:0.02, color:'#ffd700', bg:'rgba(255,215,0,.12)' },
};

const MAX_TALENTS_PER_POKE = 1;
let talentSelectedPokeSource = null;
let talentSelectedPokeIdx    = null;

function showTalents() {
  if (!player) return;
  if (!player.talentTokens) player.talentTokens = 0;
  renderTalentScreen();
  showScreen('talents');
}

function toggleTierAccordion(id) {
  const panel = document.getElementById(id);
  const arrow = document.getElementById(id + '-arrow');
  if (!panel) return;
  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  if (arrow) arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(90deg)';
}

function buyTalentTokens() {
  if (!player) return;
  if (player.gold < 500) { notify('Pas assez d\'or ! (500₽)'); return; }
  player.gold -= 500;
  player.talentTokens = (player.talentTokens||0) + 1;
  updateHUD();
  document.getElementById('talent-token-count').textContent = player.talentTokens;
  notify('🪙 +1 Jeton de Talent !');
}

function renderTalentScreen() {
  if (!player) return;
  document.getElementById('talent-token-count').textContent = player.talentTokens || 0;

  // Odds accordion panel
  const oddsList = document.getElementById('talent-odds-list');
  oddsList.innerHTML = Object.entries(TALENT_TIERS).map(([key, t]) => {
    const talents = TALENT_DEFS.filter(d => d.tier === key);
    const accordionId = `acc-${key}`;
      const talentRows = talents.map(td => `
      <div style="display:flex;align-items:flex-start;gap:.5rem;padding:.4rem .5rem;border-bottom:1px solid rgba(255,255,255,.06)">
        <div style="flex-shrink:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.3);border-radius:6px;border:1px solid ${td.color}44">${getTalentIcon(td.id)}</div>
        <div style="flex:1;min-width:0">
          <div style="font-family:'Press Start 2P',monospace;font-size:.34rem;color:${td.color};line-height:1.6">${td.name}</div>
          <div style="font-size:.62rem;color:rgba(255,255,255,.55);line-height:1.5;margin-top:.1rem">${td.desc}</div>
        </div>
      </div>`).join('');
    return `
    <div style="border:2px solid ${t.color}44;border-radius:10px;overflow:hidden">
      <div onclick="toggleTierAccordion('${accordionId}')" style="display:flex;align-items:center;justify-content:space-between;padding:.45rem .6rem;background:${t.bg};cursor:pointer;user-select:none">
        <div>
          <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:${t.color}">${t.label}</div>
          <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.4);margin-top:.15rem">${(t.odds*100).toFixed(0)}% · ${talents.length} talents</div>
        </div>
        <span id="${accordionId}-arrow" style="font-size:.7rem;color:${t.color};transition:transform .2s">▶</span>
      </div>
      <div id="${accordionId}" style="display:none;background:rgba(0,0,0,.25);max-height:300px;overflow-y:auto">${talentRows}</div>
    </div>`;
  }).join('');

  // Pokemon list
  const pokeList = document.getElementById('talent-poke-list');
  const allPoke = [...(player.roster||[]).map((p,i)=>({p,source:'roster',idx:i})),
                   ...(player.box||[]).map((p,i)=>({p,source:'box',idx:i}))];
  pokeList.innerHTML = allPoke.map(({p,source,idx}) => {
    const sid = p.currentSpriteId || p.spriteId;
    const isSelected = talentSelectedPokeSource===source && talentSelectedPokeIdx===idx;
    const talentCount = (p.talents||[]).length;
    return `<div onclick="selectTalentPoke('${source}',${idx})" style="display:flex;align-items:center;gap:.5rem;padding:.4rem .5rem;border-radius:8px;border:2px solid ${isSelected?'#c77dff':'rgba(255,255,255,.1)'};background:${isSelected?'rgba(199,125,255,.1)':'rgba(255,255,255,.04)'};cursor:pointer;transition:all .15s">
      <img src="${SPRITE_FRONT(sid)}" style="width:36px;height:36px;image-rendering:pixelated"/>
      <div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.38rem;color:${isSelected?'#c77dff':'#fff'}">${p.currentName||p.name}</div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.28rem;color:rgba(255,255,255,.4);margin-top:.1rem">Niv.${p.level} · ${talentCount}/${MAX_TALENTS_PER_POKE} talents</div>
      </div>
    </div>`;
  }).join('') || '<div style="font-size:.65rem;color:rgba(255,255,255,.3)">Aucun Pokémon</div>';
}

function selectTalentPoke(source, idx) {
  talentSelectedPokeSource = source;
  talentSelectedPokeIdx = idx;
  const pool = source === 'roster' ? player.roster : player.box;
  const p = pool[idx];
  if (!p) return;
  const sid = p.currentSpriteId || p.spriteId;
  const talentCount = (p.talents||[]).length;
  document.getElementById('talent-selected-header').innerHTML = `
    <div style="display:flex;align-items:center;gap:.6rem">
      <img src="${SPRITE_FRONT(sid)}" style="width:48px;height:48px;image-rendering:pixelated"/>
      <div>
        <div style="color:#c77dff">${p.currentName||p.name}</div>
        <div style="font-size:.5rem;color:rgba(255,255,255,.5);margin-top:.2rem">Niv.${p.level} · ${talentCount}/${MAX_TALENTS_PER_POKE} slots</div>
      </div>
    </div>`;
  document.getElementById('talent-gacha-area').style.display = 'flex';
  document.getElementById('talent-result').style.display = 'none';
  document.getElementById('talent-active-list').style.display = 'flex';
  const ph = document.getElementById('talent-placeholder');
  if (ph) ph.style.display = 'none';
  renderTalentSlots(p);
  renderTalentScreen();
}

function renderTalentSlots(p) {
  const talents = p.talents || [];
  const slots = document.getElementById('talent-slots');
  if (talents.length === 0) {
    slots.innerHTML = '<div style="font-size:.65rem;color:rgba(255,255,255,.3)">Aucun talent — lancez le Gacha !</div>';
    return;
  }
  slots.innerHTML = talents.map((talId, i) => {
    const t = TALENT_DEFS.find(d=>d.id===talId);
    if (!t) return '';
    const tier = TALENT_TIERS[t.tier];
    return `<div style="display:flex;align-items:center;gap:.6rem;background:${tier.bg};border:2px solid ${t.color}55;border-radius:10px;padding:.45rem .7rem">
      <div style="flex-shrink:0;width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.4);border-radius:8px;border:1px solid ${t.color}44">${getTalentIcon(t.id)}</div>
      <div style="flex:1">
        <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:${t.color}">${t.name}</div>
        <div style="font-size:.62rem;color:rgba(255,255,255,.55);margin-top:.1rem">${t.desc}</div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:${tier.color};margin-top:.1rem">${tier.label}</div>
      </div>
    </div>`;
  }).join('');
}

function rollTalent(count=1) {
  if (!player) return;
  if ((player.talentTokens||0) < count) { notify(`Pas assez de jetons ! (${count} requis)`); return; }
  if (talentSelectedPokeSource === null) { notify('Sélectionnez un Pokémon !'); return; }
  const pool = talentSelectedPokeSource === 'roster' ? player.roster : player.box;
  const p = pool[talentSelectedPokeIdx];
  if (!p) return;
  if (!p.talents) p.talents = [];

  player.talentTokens -= count;
  document.getElementById('talent-token-count').textContent = player.talentTokens;

  const results = [];
  for (let i = 0; i < count; i++) {
    // drawTalent gère lui-même le remplacement si le slot est plein —
    // on ne break jamais : chaque lancer garantit au moins 1 talent
    const drawn = drawTalent(p);
    results.push(drawn);
  }

  // Show results
  const resultEl = document.getElementById('talent-result');
  resultEl.style.display = 'block';
  if (count === 1 && results.length === 1) {
    const t = results[0];
    const tier = TALENT_TIERS[t.tier];
    resultEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:.8rem">
        <div style="width:52px;height:52px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.4);border-radius:12px;border:2px solid ${t.color}66;filter:drop-shadow(0 0 8px ${t.color})">${getTalentIcon(t.id)}</div>
        <div>
          <div style="font-family:'Press Start 2P',monospace;font-size:.55rem;color:${t.color};text-shadow:0 0 10px ${t.color}88">${t.name}</div>
          <div style="font-family:'Press Start 2P',monospace;font-size:.38rem;color:${tier.color};margin:.2rem 0">${tier.label.toUpperCase()}</div>
          <div style="font-size:.7rem;color:rgba(255,255,255,.7)">${t.desc}</div>
        </div>
      </div>`;
    if (t.tier === 'legendaire') {
      notify(`👑 LÉGENDAIRE ! ${t.name} obtenu pour ${p.currentName||p.name} !`);
    } else if (t.tier === 'epique') {
      notify(`🔥 Épique ! ${t.name} !`);
    }
  } else {
    const byTier = {legendaire:[],epique:[],rare:[],commun:[]};
    results.forEach(t => byTier[t.tier].push(t));
    resultEl.innerHTML = `<div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:#c77dff;margin-bottom:.5rem">${results.length} talents obtenus :</div>` +
      Object.entries(byTier).filter(([,v])=>v.length>0).map(([tier,list])=>{
        const tc = TALENT_TIERS[tier];
        return `<div style="margin:.2rem 0"><span style="font-family:'Press Start 2P',monospace;font-size:.32rem;color:${tc.color}">${tc.label}:</span> ${list.map(t=>`${t.icon}${t.name}`).join(' · ')}</div>`;
      }).join('');
  }

  renderTalentSlots(p);
  renderTalentScreen();
}

function rollTalent10() { rollTalent(10); }

function drawTalent(p) {
  const r = Math.random();
  let tier = 'commun';
  if (r < 0.02)      tier = 'legendaire';
  else if (r < 0.12) tier = 'epique';
  else if (r < 0.40) tier = 'rare';

  // If already has a talent, replace it — reset base stats first to avoid cumulative stacking
  if (p.talents && p.talents.length >= MAX_TALENTS_PER_POKE) {
    const pData = ((typeof ALL_POKEMON!=='undefined')?ALL_POKEMON:GEN1).find(d => d.id === (p.spriteId || p.currentSpriteId));
    if (pData) {
      const lvl = p.level || 1;
      const scale = 1 + (lvl - 1) * 0.08;
      p.atk   = Math.round((pData.atk || 10) * scale);
      p.def   = Math.round((pData.def || 8)  * scale);
      p.maxHp = Math.round((pData.hp  || 45) * scale);
      p.hp    = p.maxHp;
      p.magic = p.atk;
      if (p.spAtk !== undefined) p.spAtk = p.atk;
      if (p.spDef !== undefined) p.spDef = p.def;
      p._fortuneBonus = 0;
      p._xpBonus      = 0;
      p._isElu        = false;
      p._dragonSoul   = false;
      p._revenant     = false;
    }
    p.talents = [];
  }

  const owned = p.talents || [];
  const pool = TALENT_DEFS.filter(t => t.tier === tier && !owned.includes(t.id));
  const fallbackPool = pool.length > 0 ? pool : TALENT_DEFS.filter(t => !owned.includes(t.id));
  if (fallbackPool.length === 0) return TALENT_DEFS[0];

  const chosen = fallbackPool[Math.floor(Math.random()*fallbackPool.length)];
  p.talents.push(chosen.id);
  chosen.apply(p);
  return chosen;
}
const POKEDEX_TOTAL = 151;

// Milestones: at 25%, 50%, 75%, 100% of 151
const DEX_MILESTONES = [
  { pct:25,  count:Math.floor(151*0.25),  label:'25%',  rewards:[{type:'ball',id:'superball',qty:5},{type:'item',id:'superpotion',qty:3}] },
  { pct:50,  count:Math.floor(151*0.50),  label:'50%',  rewards:[{type:'ball',id:'hyperball',qty:5},{type:'candy',qty:3},{type:'item',id:'hyperpotion',qty:3}] },
  { pct:75,  count:Math.floor(151*0.75),  label:'75%',  rewards:[{type:'ball',id:'masterball',qty:1},{type:'candy',qty:5},{type:'item',id:'hyperpotion',qty:5}] },
  { pct:100, count:151,                   label:'100%', rewards:[{type:'ball',id:'masterball',qty:3},{type:'candy',qty:10},{type:'item',id:'hyperpotion',qty:10}] },
];

function getDexSeen() {
  if (!player) return new Set();
  return new Set(player.dexSeen || []);
}

function markDexSeen(pokeId) {
  if (!player) return;
  if (!player.dexSeen) player.dexSeen = [];
  if (!player.dexSeen.includes(pokeId)) {
    player.dexSeen.push(pokeId);
    checkDexMilestones();
  }
}

function checkDexMilestones() {
  if (!player) return;
  if (!player.dexMilestonesGiven) player.dexMilestonesGiven = [];
  const seen = (player.dexSeen || []).length;
  DEX_MILESTONES.forEach(m => {
    if (seen >= m.count && !player.dexMilestonesGiven.includes(m.pct)) {
      player.dexMilestonesGiven.push(m.pct);
      grantDexRewards(m);
    }
  });
}

function grantDexRewards(milestone) {
  if (!player) return;
  let msg = `🎉 Pokédex ${milestone.label} complété ! Récompenses : `;
  const parts = [];
  milestone.rewards.forEach(r => {
    if (r.type === 'ball') {
      player.balls[r.id] = (player.balls[r.id] || 0) + r.qty;
      const names = {pokeball:'Poké Ball',superball:'Super Ball',hyperball:'Hyper Ball',masterball:'Master Ball'};
      parts.push(`${r.qty}× ${names[r.id]||r.id}`);
    } else if (r.type === 'item') {
      player.bag[r.id] = (player.bag[r.id] || 0) + r.qty;
      const names = {potion:'Potion',superpotion:'Super Potion',hyperpotion:'Hyper Potion'};
      parts.push(`${r.qty}× ${names[r.id]||r.id}`);
    } else if (r.type === 'candy') {
      if (!player.heldItemBag) player.heldItemBag = {};
      player.heldItemBag['super-bonbon'] = (player.heldItemBag['super-bonbon']||0) + r.qty;
      parts.push(`${r.qty}× Super Bonbon`);
    }
  });
  msg += parts.join(', ');
  notify(`🏅 Pokédex ${milestone.label} !`);
  setTimeout(() => { notify(`🎁 ${parts.join(', ')}`); }, 1200);
  setMessage(msg);
}


// ══════════════════════════════════════════
// MÉGA ÉVOLUTIONS
// ══════════════════════════════════════════
const MEGA_EVOS = {
  6:   { name:'Méga Dracaufeu X', mult:{atk:1.5,def:1.3,spd:1.1,hp:1.2}, glow:'#4488ff' },
  9:   { name:'Méga Tortank',     mult:{atk:1.4,def:1.5,spd:1.0,hp:1.3}, glow:'#44aaff' },
  3:   { name:'Méga Florizarre',  mult:{atk:1.4,def:1.4,spd:1.1,hp:1.4}, glow:'#44cc44' },
  65:  { name:'Méga Alakazam',    mult:{atk:1.6,def:1.1,spd:1.5,hp:1.1}, glow:'#cc88ff' },
  94:  { name:'Méga Ectoplasma',  mult:{atk:1.5,def:1.2,spd:1.4,hp:1.2}, glow:'#8844ff' },
  130: { name:'Méga Léviator',    mult:{atk:1.6,def:1.2,spd:1.3,hp:1.3}, glow:'#00aaff' },
  142: { name:'Méga Ptéra',       mult:{atk:1.6,def:1.2,spd:1.5,hp:1.1}, glow:'#dd8800' },
  150: { name:'Méga Mewtwo X',    mult:{atk:1.7,def:1.3,spd:1.2,hp:1.3}, glow:'#cc00ff' },
  149: { name:'Méga Dracolosse',  mult:{atk:1.6,def:1.3,spd:1.4,hp:1.3}, glow:'#ff8800' },
  59:  { name:'Méga Arcanin',     mult:{atk:1.5,def:1.2,spd:1.5,hp:1.2}, glow:'#ff6600' },
  68:  { name:'Méga Mackogneur',  mult:{atk:1.7,def:1.2,spd:1.1,hp:1.3}, glow:'#cc6600' },
  143: { name:'Méga Ronflex',     mult:{atk:1.4,def:1.5,spd:0.9,hp:1.8}, glow:'#668866' },
};

function canMegaEvolve(p) {
  return p.heldItem === 'mega-stone' && MEGA_EVOS[p.currentSpriteId||p.spriteId];
}
function applyMegaEvo(p) {
  const id = p.currentSpriteId || p.spriteId;
  const mega = MEGA_EVOS[id];
  if (!mega || p._isMega) return;
  p._isMega = true;
  p.maxHp = Math.round(p.maxHp * mega.mult.hp); p.hp = p.maxHp;
  p.atk   = Math.round(p.atk   * mega.mult.atk);
  p.def   = Math.round(p.def   * mega.mult.def);
  p.spd   = Math.round(p.spd   * mega.mult.spd);
  const oldName = p.currentName || p.name;
  p.currentName = mega.name;
  if (player) player.megaCount = (player.megaCount||0) + 1;
  notify(`✨ ${oldName} → ${mega.name} !`);
  setMessage(`✨ MÉGA ÉVOLUTION ! ${mega.name} est libéré !`);
}

// ══════════════════════════════════════════
// WORLD BOSS
// ══════════════════════════════════════════
const WORLD_BOSS_COOLDOWN = 5 * 60 * 1000; // 5 minutes

// ══════════════════════════════════════════
// SANCTUAIRE PRESTIGE — Légendaires exclusifs
// ══════════════════════════════════════════
const PRESTIGE_LEGENDARY_POOL = [
  { minP:1, id:144, name:'Artikodin',  type:'Glace',    gold:5000, catchRate:0.08, shinyChance:0.03 },
  { minP:1, id:145, name:'Électhor',   type:'Électrik', gold:5200, catchRate:0.08, shinyChance:0.03 },
  { minP:1, id:146, name:'Sulfura',    type:'Feu',      gold:5100, catchRate:0.08, shinyChance:0.03 },
  { minP:2, id:149, name:'Dracolosse', type:'Dragon',   gold:6500, catchRate:0.06, shinyChance:0.04 },
  { minP:2, id:150, name:'Mewtwo',     type:'Psy',      gold:8000, catchRate:0.04, shinyChance:0.03 },
  { minP:3, id:151, name:'Mew',        type:'Normal',   gold:7000, catchRate:0.05, shinyChance:0.08 },
  { minP:5, id:249, name:'Lugia',      type:'Psy',      gold:10000, catchRate:0.04, shinyChance:0.05 },
  { minP:5, id:250, name:'Ho-Oh',      type:'Feu',      gold:10000, catchRate:0.04, shinyChance:0.05 },
  { minP:8, id:384, name:'Rayquaza',   type:'Dragon',   gold:15000, catchRate:0.03, shinyChance:0.08 },
  { minP:10,id:483, name:'Dialga',     type:'Acier',    gold:18000, catchRate:0.02, shinyChance:0.10 },
];
const PRESTIGE_HUNT_DAILY_LIMIT = 3;

function getAvailablePrestigeLegendaries() {
  const lv = player?.prestigeLevel || 0;
  return PRESTIGE_LEGENDARY_POOL.filter(p => p.minP <= lv);
}

function challengePrestigeLegendary(legendaryId) {
  if (!player) return;
  const lv = player.prestigeLevel || 0;
  if (lv < 1) { notify('⭐ Prestige 1 requis pour accéder au Sanctuaire !'); return; }
  const today = new Date().toDateString();
  if (player._prestigeHuntDate !== today) { player._prestigeHuntDate = today; player._prestigeHuntCount = 0; }
  if ((player._prestigeHuntCount||0) >= PRESTIGE_HUNT_DAILY_LIMIT) {
    notify(`🏛️ Limite journalière atteinte (${PRESTIGE_HUNT_DAILY_LIMIT} chasses/jour)`);
    return;
  }
  const pool = getAvailablePrestigeLegendaries();
  const leg = legendaryId ? pool.find(p=>p.id===legendaryId) : pool[Math.floor(Math.random()*pool.length)];
  if (!leg) { notify('Légendaire introuvable.'); return; }
  player._prestigeHuntCount = (player._prestigeHuntCount||0) + 1;
  const scale = 1 + lv * 0.3;
  const isShiny = Math.random() < leg.shinyChance * (player.prestigeShinyMult||1);
  const lvBoss = Math.max(60, Math.min(600, (player.level||1) + 40 + lv*10));
  const boss = {
    name:`🏛️ ${isShiny?'✨ ':''}${leg.name}`, id:leg.id, level:lvBoss,
    hp:   Math.round(player.maxHp * 6 * scale),
    maxHp:Math.round(player.maxHp * 6 * scale),
    atk:  Math.round(player.atk * 1.2 * scale),
    def:  Math.round(player.atk * 0.7 * scale),
    spd:  100 + lv*5,
    type: leg.type,
    xp:   lvBoss * 80,
    gold: Math.round(leg.gold * (player.prestigeGoldMult||1) * scale),
    _isPrestigeLeg: true,
    _prestigeLegData: { ...leg, isShiny },
    _prestigeCatchRate: Math.round(leg.catchRate * 255),
    isShiny,
  };
  notify(`🏛️ ${leg.name} Niv.${lvBoss} surgit du Sanctuaire !`);
  setMessage(`🏛️ LÉGENDAIRE PRESTIGE ! ${boss.name} — Chasse ${player._prestigeHuntCount}/${PRESTIGE_HUNT_DAILY_LIMIT} aujourd'hui`);
  player._prestigeLegBattle = true;
  startBattle(boss);
  showScreen('battle');
}

function handlePrestigeLegVictory(enemy) {
  player._prestigeLegBattle = false;
  const d = enemy._prestigeLegData;
  if (!d) return;
  player.gold += enemy.gold;
  const r = [`+${enemy.gold}₽`];
  // 30% chance d'une Méga Pierre
  if (Math.random() < 0.30) { player.heldItemBag=player.heldItemBag||{}; player.heldItemBag['mega-stone']=(player.heldItemBag['mega-stone']||0)+1; r.push('💎 Pierre Méga'); }
  // Capture possible (bouton dans l'UI de combat — on force direct ici via catch menu)
  player._pendingPrestigeCatch = { ...d, level: enemy.level, isShiny: d.isShiny };
  updateHUD();
  notify(`🏛️ Victoire ! ${r.join(' · ')} — Tentez la capture !`);
  checkAchievements();
}

const WORLD_BOSS_POOL = [
  { id:150, n:'Mewtwo Primordial', hp:5000, atk:180, def:80,  spd:150, type:'Psy',      gold:8000 },
  { id:146, n:'Sulfura Ardent',    hp:5500, atk:190, def:70,  spd:140, type:'Feu',      gold:8500 },
  { id:144, n:'Artikodin Glacial', hp:5800, atk:155, def:110, spd:120, type:'Glace',    gold:8200 },
  { id:145, n:'Électhor Tonnerre', hp:5200, atk:175, def:75,  spd:160, type:'Électrik', gold:8800 },
  { id:149, n:'Dracolosse Abyssal',hp:6000, atk:200, def:90,  spd:130, type:'Dragon',   gold:9500 },
];

function challengeWorldBoss() {
  if (!player) return;
  const now = Date.now();
  const lastWB = player.lastWorldBoss || 0;
  const remaining = WORLD_BOSS_COOLDOWN - (now - lastWB);
  if (remaining > 0 && lastWB > 0) {
    const min = Math.ceil(remaining / 60000);
    notify(`⏳ Recharge : ${min} min`);
    setMessage(`🌍 World Boss en recharge — encore ${min} minute(s) !`);
    return;
  }
  const lv = player.level || 1;
  if (lv < 30) {
    notify('⚠️ Niveau 30 requis !');
    setMessage('🌍 Trop faible ! Atteignez le niveau 30 avant d\'affronter les World Boss.');
    return;
  }
  const b = WORLD_BOSS_POOL[Math.floor(Math.random() * WORLD_BOSS_POOL.length)];
  const level = Math.max(80, Math.min(450, lv + 55));
  // +10% HP par kill. Stats relatives au joueur, mais planchers fixes pour éviter boss trivial.
  const difficulty = 1 + (player.worldBossKills || 0) * 0.10;
  const bossHp  = Math.max(1200, Math.round(player.maxHp  * 5   * difficulty));
  const bossAtk = Math.max(80,   Math.round(player.atk    * 0.90));
  const bossDef = Math.max(50,   Math.round(player.atk    * 0.50));
  const boss = {
    name:`🌍 ${b.n}`, id:b.id, level,
    hp:bossHp, maxHp:bossHp, atk:bossAtk, def:bossDef,
    spd:b.spd, type:b.type,
    xp:level*50, gold:Math.round(b.gold * difficulty),
    isWorldBoss:true, isShiny:false,
  };
  notify(`🌍 ${boss.name} — Niv.${boss.level} !`);
  setMessage(`🌍 WORLD BOSS ! ${boss.name} Niv.${boss.level} surgit des ténèbres !`);
  player._worldBossBattle = true;
  startBattle(boss);
}

function handleWorldBossVictory(enemy) {
  player._worldBossBattle = false;
  player.lastWorldBoss = Date.now();
  player.worldBossKills = (player.worldBossKills||0) + 1;
  player.gold += enemy.gold;
  if (!player.heldItemBag) player.heldItemBag = {};
  const rewards = [`+${enemy.gold}₽`];
  // Pierre Méga (30%)
  if (Math.random() < 0.30) {
    player.heldItemBag['mega-stone'] = (player.heldItemBag['mega-stone']||0) + 1;
    rewards.push('💎 Pierre Méga-Évolution');
  }
  // Œuf Shiny (8%)
  if (Math.random() < 0.08) {
    if (!player.shinyEggs) player.shinyEggs = 0;
    player.shinyEggs++;
    rewards.push('🥚 Œuf Shiny Mystérieux');
    // Hatch immediately: random shiny pokemon
    const randPoke = GEN1[Math.floor(Math.random()*GEN1.length)];
    setTimeout(()=>{
      addCapturedToRoster({
        name:randPoke.n, id:randPoke.id, type:randPoke.t,
        level:Math.max(5,player.level), hp:randPoke.hp, maxHp:randPoke.hp,
        isShiny:true,
      });
      notify(`🥚 L'Œuf éclot — ${randPoke.n} ✨ SHINY !`);
    }, 2000);
  }
  // Super Bonbons (3-5 toujours)
  const candy = 3 + Math.floor(Math.random()*3);
  player.heldItemBag['super-bonbon'] = (player.heldItemBag['super-bonbon']||0) + candy;
  rewards.push(`🍬×${candy} Super Bonbons`);
  updateGlobalStats('world_boss');
  updateHUD();
  notify('🌍 WORLD BOSS VAINCU !');
  setTimeout(()=>notify(rewards.join(' · ')), 600);
  setMessage(`🏆 World Boss vaincu ! ${rewards.join(' · ')}`);
}

function showQuests()       { showScreen('quests'); }
function showAchievements() { showScreen('achievements'); }
function showForge()        { showScreen('forge'); }

function renderQuests() {
  if (!player) return;
  const quests = getDailyQuests();
  const el = document.getElementById('quests-content');
  const today = new Date().toLocaleDateString('fr-FR', {weekday:'long',day:'numeric',month:'long'});
  el.innerHTML = `<div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:rgba(255,255,255,.4);margin-bottom:.3rem">📅 ${today}</div>` +
    quests.map(q => {
      const pct = Math.min(100, Math.round(((q.progress||0)/q.goal)*100));
      const done = q.done;
      const r = q.reward;
      const rewardStr = `+${r.gold}₽${r.candy?` · +${r.candy}🍬`:''}${r.tokens?` · +${r.tokens}🪙`:''}`;
      return `<div style="background:${done?'rgba(45,198,83,.1)':'rgba(255,255,255,.04)'};border:2px solid ${done?'#2dc653':'rgba(255,255,255,.12)'};border-radius:12px;padding:.9rem 1.1rem;display:flex;flex-direction:column;gap:.5rem">
        <div style="display:flex;align-items:center;gap:.6rem;justify-content:space-between">
          <div>
            <div style="font-family:'Press Start 2P',monospace;font-size:.5rem;color:${done?'#2dc653':'#06d6a0'}">${done?'✅ ':''} ${q.title}</div>
            <div style="font-size:.7rem;color:rgba(255,255,255,.6);margin-top:.2rem">${q.desc}</div>
          </div>
          <div style="font-family:'Press Start 2P',monospace;font-size:.38rem;color:#ffd60a;text-align:right">${rewardStr}</div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:.2rem">
            <span style="font-family:'Press Start 2P',monospace;font-size:.32rem;color:rgba(255,255,255,.5)">${q.progress||0} / ${q.goal}</span>
            <span style="font-family:'Press Start 2P',monospace;font-size:.32rem;color:${done?'#2dc653':'rgba(255,255,255,.5)'}">${pct}%</span>
          </div>
          <div style="width:100%;height:8px;background:rgba(0,0,0,.4);border-radius:999px;overflow:hidden;border:1px solid rgba(255,255,255,.1)">
            <div style="height:100%;width:${pct}%;background:${done?'linear-gradient(90deg,#2dc653,#06d6a0)':'linear-gradient(90deg,#06d6a0,#4cc9f0)'};border-radius:999px;transition:width .4s"></div>
          </div>
        </div>
      </div>`;
    }).join('');
}

function renderAchievements() {
  if (!player) return;
  const earned = player.achievements || [];
  const total = ACHIEVEMENTS.length;
  const done  = earned.length;
  document.getElementById('ach-progress').textContent = `${done}/${total} débloqués`;
  document.getElementById('achievements-content').innerHTML = ACHIEVEMENTS.map(ach => {
    const got = earned.includes(ach.id);
    const r = ach.reward;
    const rewardStr = [r.gold>0?`+${r.gold}₽`:'', r.candy>0?`+${r.candy}🍬`:'', r.tokens>0?`+${r.tokens}🪙`:''].filter(Boolean).join(' ');
    return `<div style="background:${got?'rgba(255,214,10,.08)':'rgba(255,255,255,.03)'};border:2px solid ${got?'rgba(255,214,10,.4)':'rgba(255,255,255,.08)'};border-radius:12px;padding:.7rem .9rem;opacity:${got?1:.75};transition:all .2s">
      <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.3rem">
        <span style="font-size:1.3rem">${got?ach.icon:'🔒'}</span>
        <div>
          <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:${got?'#ffd60a':'rgba(255,255,255,.65)'}">${got?ach.title:ach.title}</div>
          <div style="font-size:.62rem;color:rgba(255,255,255,.5);margin-top:.15rem">${ach.desc}</div>
        </div>
      </div>
      <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:${got?'#2dc653':'rgba(255,154,60,.7)'}">${got?'✓ Récompense : '+rewardStr:'🎁 Récompense : '+rewardStr}</div>
    </div>`;
  }).join('');
}

function renderForge() {
  if (!player) return;
  document.getElementById('forge-content').innerHTML = CRAFT_RECIPES.map(r => {
    const able = canCraft(r);
    return `<div style="background:rgba(255,255,255,.04);border:2px solid ${able?'rgba(255,154,60,.4)':'rgba(255,255,255,.1)'};border-radius:12px;padding:.8rem 1rem;display:flex;flex-direction:column;gap:.5rem">
      <div style="display:flex;align-items:center;gap:.5rem">
        <div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${r.icon}</div>
        <div>
          <div style="font-family:'Press Start 2P',monospace;font-size:.48rem;color:${able?'#ff9a3c':'rgba(255,255,255,.5)'}">${r.name}</div>
          <div style="font-size:.62rem;color:rgba(255,255,255,.5);margin-top:.15rem">${r.desc}</div>
        </div>
      </div>
      <button class="btn" onclick="doCraft('${r.id}');renderForge()" ${able?'':'disabled'} style="font-size:.45rem;padding:.4rem .8rem;${able?'background:linear-gradient(180deg,#ff9a3c,#cc5500);box-shadow:0 3px 0 #662a00':'background:#333;opacity:.5'}">
        ${able?'⚒️ Fabriquer':'🔒 Ressources insuffisantes'}
      </button>
    </div>`;
  }).join('');
}

// Hook explore stat
const _origDoExplore = doExplore;

// ══════════════════════════════════════════
// CYCLE JOUR / NUIT
// ══════════════════════════════════════════
function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 6  && h < 12) return { name:'Matin',        icon:'🌅', bonusType:'Normal',   shinyMult:1.0 };
  if (h >= 12 && h < 17) return { name:'Après-midi',   icon:'☀️', bonusType:'Feu',      shinyMult:1.0 };
  if (h >= 17 && h < 20) return { name:'Soir',         icon:'🌇', bonusType:'Électrik', shinyMult:1.1 };
  if (h >= 20 && h < 24) return { name:'Nuit',         icon:'🌙', bonusType:'Spectre',  shinyMult:1.2 };
  return                         { name:'Nuit profonde',icon:'🌌', bonusType:'Dragon',   shinyMult:1.3 };
}

function getDayNightXPBonus() {
  const t = getTimeOfDay();
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return 1.2;   // matin +20% XP
  if (h >= 20)           return 1.5;   // nuit  +50% XP
  return 1.0;
}

function updateDayNightHUD() {
  const t = getTimeOfDay();
  const el = _hud('time-of-day-hud');
  if (el) el.textContent = `${t.icon} ${t.name}`;
}

// ══════════════════════════════════════════
// PRESTIGE / ASCENSION
// ══════════════════════════════════════════
const PRESTIGE_REWARDS = [
  { lv:1, bonus:'×1.5 XP permanent',  mult:{xp:1.5} },
  { lv:2, bonus:'×2 Or permanent',    mult:{gold:2.0} },
  { lv:3, bonus:'×1.5 Boss reward',   mult:{boss:1.5} },
  { lv:4, bonus:'×2 XP permanent',    mult:{xp:2.0} },
  { lv:5, bonus:'×3 Or permanent',    mult:{gold:3.0} },
  { lv:6, bonus:'Shiny ×2',           mult:{shiny:2.0} },
  { lv:7, bonus:'×3 XP permanent',    mult:{xp:3.0} },
  { lv:8, bonus:'×5 Or permanent',    mult:{gold:5.0} },
  { lv:9, bonus:'Tout ×2',            mult:{xp:2.0,gold:2.0,boss:2.0} },
  { lv:10,bonus:'Tout ×5 — MAÎTRE',   mult:{xp:5.0,gold:5.0,boss:5.0,shiny:5.0} },
];

function canPrestige() {
  if (!player) return false;
  const wave = player.lastBossWave || 0;
  const lv   = player.level || 1;
  return wave >= 20 && lv >= 100;
}

function doPrestige() {
  if (!canPrestige()) {
    notify('Requis : Boss Vague 20+ et Niveau 100+');
    return;
  }
  const prestigeLv = (player.prestigeLevel||0) + 1;
  const reward = PRESTIGE_REWARDS[Math.min(prestigeLv-1, PRESTIGE_REWARDS.length-1)];

  // Keep: prestige level, dex, achievements, badges bonus
  const keepFields = {
    name:player.name, prestigeLevel:prestigeLv,
    prestigeXPMult:   (player.prestigeXPMult||1)   * (reward.mult.xp||1),
    prestigeGoldMult: (player.prestigeGoldMult||1)  * (reward.mult.gold||1),
    prestigeShinyMult:(player.prestigeShinyMult||1) * (reward.mult.shiny||1),
    prestigeBossMult: (player.prestigeBossMult||1)  * (reward.mult.boss||1),
    dexSeen: player.dexSeen,
    dexMilestonesGiven: player.dexMilestonesGiven,
    achievements: player.achievements,
    totalKillsAllTime: (player.totalKillsAllTime||0) + (player.totalKills||0),
  };

  // Reset all progress
  Object.keys(player).forEach(k => { if (!keepFields[k]) delete player[k]; });
  Object.assign(player, keepFields);

  // Restart tutorial
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-menu').classList.add('active');
  notify(`✨ PRESTIGE ${prestigeLv} ! ${reward.bonus}`);
  saveGame();
}

function getPrestigeMults() {
  return {
    xp:   player?.prestigeXPMult   || 1,
    gold: player?.prestigeGoldMult || 1,
    shiny:player?.prestigeShinyMult|| 1,
    boss: player?.prestigeBossMult || 1,
  };
}

// ══════════════════════════════════════════
// ÉCLATS DE TYPE (Shards)
// ══════════════════════════════════════════
const SHARD_TYPES = ['Feu','Eau','Plante','Électrik','Psy','Dragon','Normal','Spectre','Glace','Combat','Poison','Vol','Roche','Sol','Insecte'];
const SHARD_ICONS = {Feu:'🔥',Eau:'💧',Plante:'🌿',Électrik:'⚡',Psy:'🔮',Dragon:'🐉',Normal:'⚪',Spectre:'👻',Glace:'❄️',Combat:'🥊',Poison:'☠️',Vol:'🌪️',Roche:'🪨',Sol:'🌍',Insecte:'🦋'};

function addShard(type, amount=1) {
  if (!player) return;
  if (!player.shards) player.shards = {};
  player.shards[type] = (player.shards[type]||0) + amount;
}

function getShardsBonus(pokeType) {
  if (!player?.shards) return 1;
  const base = (player.shards[pokeType]||0);
  return 1 + Math.min(base * 0.001, 0.5); // +0.1% per shard, max +50%
}

function awardShardOnKill(enemyType) {
  if (Math.random() < 0.15) { // 15% chance
    addShard(enemyType, 1);
  }
}

// ══════════════════════════════════════════
// ARBRE DE COMPÉTENCES (Skill Tree)
// ══════════════════════════════════════════
const SKILL_TREE = {
  // Colonne Combat
  'atk-boost-1':   { name:'Attaque +',      desc:'+5% ATK équipe',    cost:100,  req:[],                    row:0, col:0, apply:()=>{ applySkillToTeam(p=>{ p.atk=Math.round(p.atk*1.05); }); } },
  'atk-boost-2':   { name:'Attaque ++',     desc:'+10% ATK équipe',   cost:300,  req:['atk-boost-1'],       row:1, col:0, apply:()=>{ applySkillToTeam(p=>{ p.atk=Math.round(p.atk*1.10); }); } },
  'atk-boost-3':   { name:'Attaque MAX',    desc:'+20% ATK équipe',   cost:800,  req:['atk-boost-2'],       row:2, col:0, apply:()=>{ applySkillToTeam(p=>{ p.atk=Math.round(p.atk*1.20); }); } },
  'def-boost-1':   { name:'Défense +',      desc:'+5% DEF équipe',    cost:100,  req:[],                    row:0, col:1, apply:()=>{ applySkillToTeam(p=>{ p.def=Math.round(p.def*1.05); }); } },
  'def-boost-2':   { name:'Défense ++',     desc:'+10% DEF équipe',   cost:300,  req:['def-boost-1'],       row:1, col:1, apply:()=>{ applySkillToTeam(p=>{ p.def=Math.round(p.def*1.10); }); } },
  'hp-boost-1':    { name:'Vitalité +',     desc:'+10% PV équipe',    cost:150,  req:[],                    row:0, col:2, apply:()=>{ applySkillToTeam(p=>{ p.maxHp=Math.round(p.maxHp*1.10);p.hp=p.maxHp; }); } },
  'hp-boost-2':    { name:'Vitalité ++',    desc:'+20% PV équipe',    cost:400,  req:['hp-boost-1'],        row:1, col:2, apply:()=>{ applySkillToTeam(p=>{ p.maxHp=Math.round(p.maxHp*1.20);p.hp=p.maxHp; }); } },
  // Colonne Économie
  'gold-find-1':   { name:'Fortune I',      desc:'+20% or des combats', cost:200, req:[],                   row:0, col:3, apply:()=>{ player._globalGoldBonus=(player._globalGoldBonus||0)+0.20; } },
  'gold-find-2':   { name:'Fortune II',     desc:'+40% or des combats', cost:600, req:['gold-find-1'],      row:1, col:3, apply:()=>{ player._globalGoldBonus=(player._globalGoldBonus||0)+0.40; } },
  'xp-boost-1':    { name:'Étude I',        desc:'+20% XP de combat',   cost:200, req:[],                   row:0, col:4, apply:()=>{ player._globalXPBonus=(player._globalXPBonus||0)+0.20; } },
  'xp-boost-2':    { name:'Étude II',       desc:'+40% XP de combat',   cost:600, req:['xp-boost-1'],       row:1, col:4, apply:()=>{ player._globalXPBonus=(player._globalXPBonus||0)+0.40; } },
  'passive-inc-1': { name:'Rentier I',      desc:'+5₽/s passif',        cost:400, req:['gold-find-1'],      row:2, col:3, apply:()=>{ player._passiveIncome=(player._passiveIncome||0)+5; } },
  'passive-inc-2': { name:'Rentier II',     desc:'+15₽/s passif',       cost:1200,req:['passive-inc-1'],    row:3, col:3, apply:()=>{ player._passiveIncome=(player._passiveIncome||0)+15; } },
  // Colonne Capture
  'catch-rate-1':  { name:'Pisteur I',      desc:'+10% taux capture',   cost:150, req:[],                   row:0, col:5, apply:()=>{ player._catchBonus=(player._catchBonus||0)+0.10; } },
  'catch-rate-2':  { name:'Pisteur II',     desc:'+20% taux capture',   cost:500, req:['catch-rate-1'],     row:1, col:5, apply:()=>{ player._catchBonus=(player._catchBonus||0)+0.20; } },
  'shiny-luck-1':  { name:'Shiny Luck I',   desc:'Shiny ×2',            cost:1000,req:['catch-rate-1'],     row:2, col:5, apply:()=>{ player._shinyLuckMult=(player._shinyLuckMult||1)*2; } },
  'shiny-luck-2':  { name:'Shiny Luck II',  desc:'Shiny ×4',            cost:3000,req:['shiny-luck-1'],     row:3, col:5, apply:()=>{ player._shinyLuckMult=(player._shinyLuckMult||1)*4; } },
  // Centre
  'all-boost':     { name:'MAÎTRISE',       desc:'+15% tout',           cost:4000, req:['atk-boost-2','xp-boost-2','catch-rate-2'], row:3,col:2,
    apply:()=>{ applySkillToTeam(p=>{p.atk=Math.round(p.atk*1.15);p.def=Math.round(p.def*1.15);p.maxHp=Math.round(p.maxHp*1.15);p.hp=p.maxHp;});
                player._globalGoldBonus=(player._globalGoldBonus||0)+0.15;
                player._globalXPBonus=(player._globalXPBonus||0)+0.15; } },
};

function applySkillToTeam(fn) {
  if (!player) return;
  [...(player.roster||[]), ...(player.box||[])].forEach(fn);
  if (player.level) {
    fn(player); syncActiveFromPlayer();
  }
}

function buySkill(id) {
  if (!player) return;
  const skill = SKILL_TREE[id];
  if (!skill) return;
  if (!player.skills) player.skills = [];
  if (player.skills.includes(id)) { notify('Déjà appris !'); return; }
  const reqs = skill.req.filter(r => !player.skills.includes(r));
  if (reqs.length > 0) { notify(`Débloquer d'abord : ${reqs.join(', ')}`); return; }
  if ((player.skillPoints||0) < skill.cost) { notify(`Pas assez de points de compétence ! (${skill.cost} requis)`); return; }
  player.skillPoints = (player.skillPoints||0) - skill.cost;
  player.skills.push(id);
  skill.apply();
  notify(`✅ Compétence apprise : ${skill.name} !`);
  updateHUD();
  renderSkillTree();
}

// ══════════════════════════════════════════
// RANG DE DRESSEUR
// ══════════════════════════════════════════
const TRAINER_RANKS = [
  { rank:'Bronze',      minKills:0,     color:'#cd7f32', icon:'🥉', bonus:{xp:1.0, gold:1.0} },
  { rank:'Argent',      minKills:100,   color:'#c0c0c0', icon:'🥈', bonus:{xp:1.1, gold:1.1} },
  { rank:'Or',          minKills:500,   color:'#ffd700', icon:'🥇', bonus:{xp:1.2, gold:1.2} },
  { rank:'Platine',     minKills:2000,  color:'#e5e4e2', icon:'💎', bonus:{xp:1.35,gold:1.35} },
  { rank:'Diamant',     minKills:5000,  color:'#b9f2ff', icon:'💠', bonus:{xp:1.5, gold:1.5} },
  { rank:'Maître',      minKills:15000, color:'#ff44aa', icon:'🌟', bonus:{xp:2.0, gold:2.0} },
  { rank:'Légendaire',  minKills:50000, color:'#ffd700', icon:'👑', bonus:{xp:3.0, gold:3.0} },
];

function getTrainerRank() {
  if (!player) return TRAINER_RANKS[0];
  const kills = (player.totalKillsAllTime||0) + (player.totalKills||0);
  let rank = TRAINER_RANKS[0];
  for (const r of TRAINER_RANKS) { if (kills >= r.minKills) rank = r; }
  return rank;
}

// ══════════════════════════════════════════
// UPGRADES PERMANENTES (boutique prestige)
// ══════════════════════════════════════════
const PRESTIGE_SHOP = [
  { id:'auto-heal',    name:'Soin Auto',      desc:'Se soigne automatiquement à 20% PV', cost:5,  icon:'💊', costUnit:'étoiles' },
  { id:'double-drop',  name:'Double Récolte', desc:'20% de chance de doubler le butin',  cost:8,  icon:'💰', costUnit:'étoiles' },
  { id:'fast-catch',   name:'Capture Rapide', desc:'Temps de capture divisé par 2',      cost:6,  icon:'⚽', costUnit:'étoiles' },
  { id:'xp-overflow',  name:'XP Débordante',  desc:'L\'XP en trop passe au Pokémon suivant',cost:10,icon:'⬆️',costUnit:'étoiles' },
  { id:'boss-preview', name:'Intel Boss',     desc:'Voir les stats du boss avant combat',cost:4,  icon:'🔍', costUnit:'étoiles' },
  { id:'shard-magnet', name:'Aimant Éclat',   desc:'×3 éclats de type gagnés',           cost:7,  icon:'✨', costUnit:'étoiles' },
  { id:'team-regen',   name:'Régénération',   desc:'+2% PV équipe par vague complétée',  cost:12, icon:'❤️', costUnit:'étoiles' },
  { id:'lucky-egg',    name:'Œuf Chanceux',   desc:'Shiny ×3 après chaque boss battu',   cost:15, icon:'🥚', costUnit:'étoiles' },
];

// Prestige stars earned = prestige level
function getPrestigeStars() { return player?.prestigeLevel || 0; }

function buyPrestigeUpgrade(id) {
  const upg = PRESTIGE_SHOP.find(u=>u.id===id);
  if (!upg) return;
  if (!player.prestigeUpgrades) player.prestigeUpgrades = [];
  if (player.prestigeUpgrades.includes(id)) { notify('Déjà acheté !'); return; }
  const stars = getPrestigeStars();
  const spent = (player.prestigeShopSpent||0);
  if (stars - spent < upg.cost) { notify(`Pas assez d'étoiles ! (${upg.cost} requis)`); return; }
  player.prestigeShopSpent = spent + upg.cost;
  player.prestigeUpgrades.push(id);
  notify(`⭐ ${upg.name} débloqué !`);
  renderPrestigeShop();
}

function hasPrestigeUpgrade(id) { return (player?.prestigeUpgrades||[]).includes(id); }

// ══════════════════════════════════════════
// ÉLEVAGE / BREEDING
// ══════════════════════════════════════════
const BREEDING_TIME = 300000; // 5 minutes
let breedingSlots = [null, null]; // up to 2 eggs incubating

function startBreeding(rosterIdx1, rosterIdx2) {
  if (!player?.roster) return;
  const p1 = player.roster[rosterIdx1];
  const p2 = player.roster[rosterIdx2];
  if (!p1 || !p2) { notify('Pokémon invalides !'); return; }
  if (p1.spriteId === p2.spriteId) { notify('Même espèce — croisement impossible !'); return; }
  const slotIdx = breedingSlots.findIndex(s=>s===null);
  if (slotIdx === -1) { notify('Tous les slots d\'élevage sont occupés !'); return; }

  const eggId = Math.random() < 0.5 ? (p1.spriteId||p1.currentSpriteId) : (p2.spriteId||p2.currentSpriteId);
  const avgLevel = Math.floor(((p1.level||1)+(p2.level||1))/2);
  const isShiny = Math.random() < (1 / Math.max(1, 512 / ((player._shinyLuckMult||1) * (player.prestigeShinyMult||1))));

  breedingSlots[slotIdx] = {
    eggId, avgLevel, isShiny,
    startTime: Date.now(),
    endTime: Date.now() + BREEDING_TIME,
    parent1: p1.currentName||p1.name,
    parent2: p2.currentName||p2.name,
  };
  notify(`🥚 Œuf en incubation ! Prêt dans 30 secondes !`);
  updateBreedingHUD();
}

function checkBreedingSlots() {
  if (!player || !breedingSlots) return;
  breedingSlots.forEach((slot, i) => {
    if (!slot) return;
    if (Date.now() >= slot.endTime) {
      // Hatch!
      const _ap = (typeof ALL_POKEMON!=='undefined')?ALL_POKEMON:GEN1;
      const pData = _ap.find(p=>p.id===slot.eggId);
      if (pData) {
        addCapturedToRoster({
          name:pData.n, id:pData.id, type:pData.t,
          level:Math.max(1,slot.avgLevel-5+Math.floor(Math.random()*11)),
          hp:pData.hp, maxHp:pData.hp, isShiny:slot.isShiny,
        });
        notify(`🥚 L'œuf a éclos ! ${pData.n}${slot.isShiny?' ✨ SHINY !':''}`);
        markDexSeen(pData.id);
      }
      breedingSlots[i] = null;
      updateBreedingHUD();
    }
  });
}

function updateBreedingHUD() {
  const el = _hud('breeding-hud');
  if (!el) return;
  const active = breedingSlots.filter(s=>s!==null);
  if (active.length === 0) { el.style.display='none'; return; }
  el.style.display='flex';
  el.innerHTML = active.map(s => {
    const remaining = Math.max(0, Math.ceil((s.endTime-Date.now())/1000));
    const _apH = (typeof ALL_POKEMON!=='undefined')?ALL_POKEMON:GEN1;
    const pData = _apH.find(p=>p.id===s.eggId);
    return `<div style="display:flex;align-items:center;gap:.3rem;font-family:'Press Start 2P',monospace;font-size:.32rem;color:rgba(255,255,255,.7)">
      🥚 ${pData?.n||'?'}${s.isShiny?'✨':''} — ${remaining}s
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════
// ÉVÉNEMENTS SPÉCIAUX
// ══════════════════════════════════════════
const SPECIAL_EVENTS = [
  { id:'shiny-weekend', name:'Weekend Shiny !',   desc:'Taux Shiny ×2 pendant 2h',  duration:2*3600000, icon:'✨', effect:()=>({shinyMult:2}) },
  { id:'gold-rush',     name:'Ruée vers l\'Or !', desc:'×3 Or en combat pendant 1h', duration:3600000,   icon:'💰', effect:()=>({goldMult:3}) },
  { id:'xp-festival',   name:'Festival XP !',     desc:'×2 XP pendant 1h',           duration:3600000,   icon:'⬆️', effect:()=>({xpMult:2}) },
  { id:'boss-blitz',    name:'Blitz de Boss !',   desc:'Boss toutes les 5 kills',     duration:1800000,   icon:'💀', effect:()=>({bossEvery:5}) },
  { id:'catch-mania',   name:'Capture Mania !',   desc:'Taux de capture ×2',          duration:3600000,   icon:'⚽', effect:()=>({catchMult:2}) },
];

let activeEvent = null;
let eventEndTime = 0;

function triggerRandomEvent() {
  if (activeEvent) return;
  if (Math.random() > 0.03) return; // 3% par exploration
  const ev = SPECIAL_EVENTS[Math.floor(Math.random()*SPECIAL_EVENTS.length)];
  activeEvent = ev;
  eventEndTime = Date.now() + ev.duration;
  notify(`🎉 ÉVÉNEMENT : ${ev.icon} ${ev.name} — ${ev.desc} !`);
  setMessage(`🎉 Événement spécial : ${ev.name} ! ${ev.desc}`);
  updateEventHUD();
  setTimeout(() => {
    activeEvent = null;
    updateEventHUD();
    notify(`⏰ Événement "${ev.name}" terminé.`);
  }, ev.duration);
}

function getActiveEventEffects() {
  if (!activeEvent || Date.now() > eventEndTime) return {};
  return activeEvent.effect();
}

function updateEventHUD() {
  const el = _hud('event-hud');
  if (!el) return;
  if (!activeEvent || Date.now() > eventEndTime) {
    el.style.display = 'none'; return;
  }
  const remaining = Math.ceil((eventEndTime - Date.now()) / 60000);
  el.style.display = 'flex';
  el.textContent = `${activeEvent.icon} ${activeEvent.name} — ${remaining}min`;
}

// ══════════════════════════════════════════
// SYNERGIES D'ÉQUIPE
// ══════════════════════════════════════════
const TEAM_SYNERGIES = [
  // Synergies originales
  { id:'mono-fire',      name:'Brigade de Feu',    desc:'+25% ATK si 3+ Feu',              check:r=>r.filter(p=>p.type==='Feu').length>=3,                                    bonus:{atk:1.25},        icon:'🔥', color:'#ff6030' },
  { id:'mono-water',     name:'Torrent',            desc:'+25% DEF si 3+ Eau',              check:r=>r.filter(p=>p.type==='Eau').length>=3,                                    bonus:{def:1.25},        icon:'💧', color:'#4488ff' },
  { id:'all-diff',       name:'Équipe Diverse',     desc:'+15% tout si 6 types différents', check:r=>new Set(r.map(p=>p.type)).size>=6,                                        bonus:{all:1.15},        icon:'🌈', color:'#ff88ff' },
  { id:'all-same',       name:'Meute Unifiée',      desc:'+40% ATK si tous même type',      check:r=>new Set(r.map(p=>p.type)).size===1&&r.length>=3,                          bonus:{atk:1.40},        icon:'🤝', color:'#ffcc00' },
  { id:'dragon-duo',     name:'Duo Dragon',         desc:'+50% ATK Spé si 2+ Dragons',      check:r=>r.filter(p=>p.type==='Dragon').length>=2,                                 bonus:{magic:1.50},      icon:'🐉', color:'#7038f8' },
  { id:'legendary',      name:'Équipe Légendaire',  desc:'+30% tout si Pokémon Légendaire', check:r=>r.some(p=>[144,145,146,149,150,151].includes(p.spriteId||p.currentSpriteId)), bonus:{all:1.30},   icon:'⭐', color:'#ffd700' },
  // Nouvelles synergies
  { id:'ghost-trio',     name:'Trio Fantôme',       desc:'+30% VIT si 3+ Spectre',          check:r=>r.filter(p=>p.type==='Spectre').length>=3,                                bonus:{spd:1.30},        icon:'👻', color:'#7766bb' },
  { id:'steel-fort',     name:'Forteresse Acier',   desc:'+35% DEF si 3+ Acier',            check:r=>r.filter(p=>p.type==='Acier').length>=3,                                  bonus:{def:1.35},        icon:'🛡️', color:'#aaaacc' },
  { id:'psychic-duo',    name:'Duo Psychique',       desc:'+35% ATK Spé si 2+ Psy',         check:r=>r.filter(p=>p.type==='Psy').length>=2,                                    bonus:{magic:1.35},      icon:'🔮', color:'#ff44aa' },
  { id:'ice-cold',       name:'Glaciation',          desc:'+20% ATK si 3+ Glace',            check:r=>r.filter(p=>p.type==='Glace').length>=3,                                  bonus:{atk:1.20},        icon:'❄️', color:'#88ccff' },
  { id:'fighting-break', name:'Brise-Bouclier',      desc:'+25% ATK si 2+ Combat',           check:r=>r.filter(p=>p.type==='Combat').length>=2,                                 bonus:{atk:1.25},        icon:'🥊', color:'#994422' },
  { id:'poison-cloud',   name:'Nuage Toxique',       desc:'+20% tout si 2+ Poison',          check:r=>r.filter(p=>p.type==='Poison').length>=2,                                 bonus:{all:1.20},        icon:'☠️', color:'#aa44bb' },
  { id:'full-kanto',     name:'Équipe Kanto',        desc:'+20% XP si équipe 100% Gen1',     check:r=>r.length>=4&&r.every(p=>(p.spriteId||p.currentSpriteId||0)<=151),        bonus:{xp:1.20},         icon:'🎮', color:'#ff4444' },
  { id:'shiny-team',     name:'Équipe Brillante',    desc:'+50% Or si 3+ Shiny',             check:r=>r.filter(p=>p.isShiny).length>=3,                                         bonus:{gold:1.50},       icon:'✨', color:'#ffd700' },
];

function getActiveSynergies() {
  if (!player?.roster?.length) return [];
  return TEAM_SYNERGIES.filter(s => s.check(player.roster));
}

function applySynergyBonuses() {
  const active = getActiveSynergies();
  if (active.length === 0) return { atkMult:1, defMult:1, magicMult:1, spdMult:1, goldMult:1, xpMult:1 };
  let atkMult=1, defMult=1, magicMult=1, spdMult=1, goldMult=1, xpMult=1;
  active.forEach(s => {
    if (s.bonus.atk)   atkMult   *= s.bonus.atk;
    if (s.bonus.def)   defMult   *= s.bonus.def;
    if (s.bonus.magic) magicMult *= s.bonus.magic;
    if (s.bonus.spd)   spdMult   *= s.bonus.spd;
    if (s.bonus.gold)  goldMult  *= s.bonus.gold;
    if (s.bonus.xp)    xpMult    *= s.bonus.xp;
    if (s.bonus.all)   { atkMult*=s.bonus.all; defMult*=s.bonus.all; magicMult*=s.bonus.all; goldMult*=s.bonus.all; xpMult*=s.bonus.all; }
  });
  return { atkMult, defMult, magicMult, spdMult, goldMult, xpMult };
}

// ══════════════════════════════════════════
// SKILL POINT GAIN (1 per boss kill + level)
// ══════════════════════════════════════════
function gainSkillPoints(amount) {
  if (!player) return;
  player.skillPoints = (player.skillPoints||0) + amount;
  updateHUD();
  notify(`📊 +${amount} Point(s) de Compétence !`);
}

// ══════════════════════════════════════════
// RENDER SKILL TREE SCREEN
// ══════════════════════════════════════════
function renderSkillTree() {
  const el = document.getElementById('skill-tree-content');
  if (!el || !player) return;
  const learned = player.skills || [];
  const sp = player.skillPoints || 0;
  document.getElementById('skill-points-display').textContent = `${sp} pts disponibles`;

  const cols = 6;
  const rows = 4;
  const grid = Array.from({length:rows}, ()=>Array(cols).fill(null));
  Object.entries(SKILL_TREE).forEach(([id,s])=>{ grid[s.row][s.col] = {id,...s}; });

  el.innerHTML = grid.map((row,ri)=>
    `<div style="display:flex;gap:.5rem;justify-content:center;margin-bottom:.4rem">`+
    row.map((sk,ci)=>{
      if (!sk) return `<div style="width:120px;height:72px"></div>`;
      const done  = learned.includes(sk.id);
      const avail = sk.req.every(r=>learned.includes(r)) && sp >= sk.cost && !done;
      const locked= !sk.req.every(r=>learned.includes(r));
      return `<div onclick="${avail?`buySkill('${sk.id}')`:''}"
        style="width:120px;height:72px;border-radius:10px;border:2px solid ${done?'#2dc653':avail?'#ffd700':locked?'rgba(255,255,255,.1)':'rgba(255,255,255,.2)'};
        background:${done?'rgba(45,198,83,.15)':avail?'rgba(255,214,10,.08)':'rgba(0,0,0,.3)'};
        cursor:${avail?'pointer':'default'};padding:.3rem .4rem;display:flex;flex-direction:column;justify-content:center;
        transition:all .15s;${avail?'':'opacity:.7'}"
        ${avail?`onmouseover="this.style.borderColor='#ffe066'" onmouseout="this.style.borderColor='#ffd700'"`:''}>
        <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:${done?'#2dc653':avail?'#ffd700':'rgba(255,255,255,.5)'}">${done?'✓ ':avail?'⭐ ':locked?'🔒 ':''}${sk.name}</div>
        <div style="font-size:.55rem;color:rgba(255,255,255,.55);margin-top:.15rem">${sk.desc}</div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.28rem;color:${avail?'#ffd700':'rgba(255,255,255,.35)'};margin-top:.1rem">${done?'Appris':sk.cost+' pts'}</div>
      </div>`;
    }).join('')+`</div>`
  ).join('');
}

function renderPrestigeShop() {
  const el = document.getElementById('prestige-shop-content');
  if (!el || !player) return;
  const stars = getPrestigeStars();
  const spent = player.prestigeShopSpent || 0;
  const available = stars - spent;
  document.getElementById('prestige-stars-display').textContent = `⭐ ${available} étoiles disponibles`;

  el.innerHTML = PRESTIGE_SHOP.map(u => {
    const owned = hasPrestigeUpgrade(u.id);
    const canBuy = available >= u.cost && !owned;
    return `<div style="background:${owned?'rgba(255,214,10,.1)':'rgba(255,255,255,.04)'};border:2px solid ${owned?'#ffd700':canBuy?'rgba(255,214,10,.3)':'rgba(255,255,255,.1)'};border-radius:12px;padding:.7rem .9rem;display:flex;flex-direction:column;gap:.35rem">
      <div style="display:flex;align-items:center;gap:.5rem">
        <span style="font-size:1.3rem">${u.icon}</span>
        <div>
          <div style="font-family:'Press Start 2P',monospace;font-size:.42rem;color:${owned?'#ffd700':canBuy?'#fff':'rgba(255,255,255,.5)'}">${owned?'✅ ':''} ${u.name}</div>
          <div style="font-size:.62rem;color:rgba(255,255,255,.55);margin-top:.1rem">${u.desc}</div>
        </div>
        <div style="margin-left:auto;font-family:'Press Start 2P',monospace;font-size:.38rem;color:#ffd700">⭐${u.cost}</div>
      </div>
      ${!owned?`<button class="btn" onclick="buyPrestigeUpgrade('${u.id}');renderPrestigeShop()" ${canBuy?'':'disabled'} style="font-size:.42rem;padding:.3rem .6rem;${canBuy?'background:linear-gradient(180deg,#ffd60a,#cc9900);color:#1a1a00':'background:#333;opacity:.5'}">
        ${canBuy?'⭐ Acheter':'🔒 Indisponible'}
      </button>`:''}
    </div>`;
  }).join('');
}


function renderPrestigeScreen() {
  if (!player) return;
  const pl = player.prestigeLevel || 0;
  const can = canPrestige();
  const next = PRESTIGE_REWARDS[Math.min(pl, PRESTIGE_REWARDS.length-1)];
  const info = document.getElementById('prestige-info');
  if (info) info.innerHTML = `
    <div style="font-family:'Press Start 2P',monospace;font-size:.5rem;color:#ffd700;margin-bottom:.5rem">Niveau Prestige : ${pl}</div>
    <div style="font-size:.68rem;color:rgba(255,255,255,.65);line-height:1.7;margin-bottom:.5rem">Le Prestige remet le jeu à zéro en échange de bonus <strong>permanents</strong>. Pokédex et Succès conservés.<br>Prochaine récompense : <span style="color:#ffd700">${next?.bonus||'Max atteint'}</span></div>
    <div style="font-size:.65rem;color:${can?'#2dc653':'rgba(255,100,100,.8)'}">
      ${can?'✅ Conditions remplies !':`🔒 Requis : Boss Vague 20 (actuel: ${player.lastBossWave||0}) et Niveau 100 (actuel: ${player.level||1})`}</div>
    ${can?`<button class="btn yellow" onclick="if(confirm('Prestige ? Tout sauf Pokédex/Succès sera réinitialisé.'))doPrestige()" style="margin-top:.8rem;font-size:.5rem">⭐ ACTIVER LE PRESTIGE</button>`:''}`;

  // ── Sanctuaire Prestige ──
  const sanctuaryEl = document.getElementById('prestige-sanctuary');
  if (sanctuaryEl) {
    if (pl < 1) {
      sanctuaryEl.innerHTML = `<div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:rgba(255,255,255,.3);text-align:center;padding:1rem">🔒 Débloqué après Prestige 1</div>`;
    } else {
      const pool = getAvailablePrestigeLegendaries();
      const today = new Date().toDateString();
      const huntsLeft = PRESTIGE_HUNT_DAILY_LIMIT - (player._prestigeHuntDate===today ? (player._prestigeHuntCount||0) : 0);
      const typeColors={Glace:'#88ccff',Électrik:'#ffcc00',Feu:'#ff6030',Dragon:'#7038f8',Psy:'#ff44aa',Normal:'#9999aa',Acier:'#aaaacc'};
      const cards = pool.map(leg => {
        const tc = typeColors[leg.type]||'#888';
        const clickFn = huntsLeft > 0 ? 'challengePrestigeLegendary(' + leg.id + ')' : "notify('Limite atteinte !')";
        const shinyBadge = leg.shinyChance >= 0.05 ? '<div style="font-size:.45rem;color:#ffd700">✨ Shiny ' + Math.round(leg.shinyChance*100) + '%</div>' : '';
        return '<div onclick="' + clickFn + '" style="background:rgba(0,0,0,.4);border:2px solid ' + tc + '44;border-radius:10px;padding:.6rem;text-align:center;cursor:' + (huntsLeft>0?'pointer':'not-allowed') + ';transition:all .15s;' + (huntsLeft>0?'':'opacity:.5') + '">'
          + '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + leg.id + '.png" style="width:48px;height:48px;image-rendering:pixelated" onerror="this.style.display=\'none\'"/>'
          + '<div style="font-family:\'Press Start 2P\',monospace;font-size:.3rem;color:' + tc + ';margin-top:.2rem">' + leg.name + '</div>'
          + '<div style="font-size:.5rem;color:rgba(255,255,255,.4);margin-top:.1rem">' + leg.type + ' · P' + leg.minP + '+</div>'
          + '<div style="font-family:\'Press Start 2P\',monospace;font-size:.28rem;color:#ffd700;margin-top:.2rem">+' + leg.gold + '₽</div>'
          + shinyBadge + '</div>';
      }).join('');
      sanctuaryEl.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.7rem">
          <div style="font-family:'Press Start 2P',monospace;font-size:.42rem;color:#c77dff">🏛️ Sanctuaire — ${pool.length} Légendaires disponibles</div>
          <div style="font-family:'Press Start 2P',monospace;font-size:.38rem;color:rgba(255,255,255,.5)">🎯 ${huntsLeft}/${PRESTIGE_HUNT_DAILY_LIMIT} chasses aujourd'hui</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:.5rem">${cards}</div>`;
    }
  }
  renderPrestigeShop();
}

function renderBreedingScreen() {
  if (!player) return;
  const slotsEl = document.getElementById('breeding-slots-display');
  if (slotsEl) {
    slotsEl.innerHTML = breedingSlots.map((s,i) => {
      if (!s) return `<div style="width:140px;height:80px;border:2px dashed rgba(255,255,255,.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'Press Start 2P',monospace;font-size:.35rem;color:rgba(255,255,255,.3)">Slot ${i+1} libre</div>`;
      const _apR = (typeof ALL_POKEMON!=='undefined')?ALL_POKEMON:GEN1;
      const pData = _apR.find(p=>p.id===s.eggId);
      const remaining = Math.max(0, Math.ceil((s.endTime-Date.now())/1000));
      const pct = Math.min(100, Math.round(((BREEDING_TIME-(s.endTime-Date.now()))/BREEDING_TIME)*100));
      return `<div style="width:140px;border:2px solid #ff88cc;border-radius:10px;padding:.5rem;background:rgba(255,136,204,.1)">
        <div style="text-align:center;font-size:1.5rem">🥚${s.isShiny?'✨':''}</div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:#ff88cc;margin:.2rem 0">${pData?.n||'?'}</div>
        <div style="width:100%;height:4px;background:rgba(0,0,0,.4);border-radius:999px;overflow:hidden"><div style="height:100%;width:${pct}%;background:#ff88cc;border-radius:999px"></div></div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.28rem;color:rgba(255,255,255,.4);margin-top:.15rem">${remaining}s</div>
      </div>`;
    }).join('');
  }
  if (!player.breedingSelected) player.breedingSelected = [];
  const breedRoster = document.getElementById('breeding-roster');
  if (!breedRoster) return;
  const allPoke = [...(player.roster||[]).map((p,i)=>({p,src:'roster',idx:i})), ...(player.box||[]).map((p,i)=>({p,src:'box',idx:i}))];
  breedRoster.innerHTML = allPoke.map(({p,src,idx}) => {
    const sid = p.currentSpriteId||p.spriteId;
    const sel = player.breedingSelected.some(s=>s.src===src&&s.idx===idx);
    return `<div onclick="toggleBreedSelect('${src}',${idx})" style="border:2px solid ${sel?'#ff88cc':'rgba(255,255,255,.12)'};border-radius:10px;padding:.4rem;background:${sel?'rgba(255,136,204,.12)':'rgba(255,255,255,.04)'};cursor:pointer;display:flex;align-items:center;gap:.4rem">
      <img src="${SPRITE_FRONT(sid)}" style="width:40px;height:40px;image-rendering:pixelated"/>
      <div><div style="font-family:'Press Start 2P',monospace;font-size:.35rem;color:${sel?'#ff88cc':'#fff'}">${p.currentName||p.name}</div>
      <div style="font-family:'Press Start 2P',monospace;font-size:.28rem;color:rgba(255,255,255,.45)">Niv.${p.level}</div></div>
    </div>`;
  }).join('');
  const sel = player.breedingSelected||[];
  const brdActionDiv = document.getElementById('breed-action-btn');
  if (brdActionDiv) {
    brdActionDiv.innerHTML = `<button class="btn" onclick="startBreedFromScreen()" ${sel.length===2?'':'disabled'} style="width:100%;font-size:.52rem;background:linear-gradient(180deg,#ff88cc,#cc3388);box-shadow:0 4px 0 #881144;margin-top:.5rem;${sel.length!==2?'opacity:.4':''}">🥚 Créer un Œuf</button>`;
  }
}

function toggleBreedSelect(src, idx) {
  if (!player.breedingSelected) player.breedingSelected = [];
  const key = `${src}-${idx}`;
  const pos = player.breedingSelected.findIndex(s=>`${s.src}-${s.idx}`===key);
  if (pos>=0) { player.breedingSelected.splice(pos,1); }
  else if (player.breedingSelected.length<2) { player.breedingSelected.push({src,idx}); }
  else { notify('Maximum 2 Pokémon !'); return; }
  renderBreedingScreen();
}

function startBreedFromScreen() {
  const sel = player.breedingSelected||[];
  if (sel.length!==2) { notify('Sélectionnez 2 Pokémon !'); return; }
  const [a,b] = sel;
  const p1 = a.src==='box' ? player.box[a.idx] : player.roster[a.idx];
  const p2 = b.src==='box' ? player.box[b.idx] : player.roster[b.idx];
  if (!p1||!p2) { notify('Pokémon invalides !'); return; }
  if ((p1.spriteId||p1.currentSpriteId)===(p2.spriteId||p2.currentSpriteId)) {
    notify('Même espèce — croisement impossible !'); return;
  }
  const slotIdx = breedingSlots.findIndex(s=>s===null);
  if (slotIdx===-1) { notify('Tous les slots d\'élevage sont occupés !'); return; }
  const eggId = Math.random()<0.5 ? (p1.spriteId||p1.currentSpriteId) : (p2.spriteId||p2.currentSpriteId);
  const avgLevel = Math.floor(((p1.level||1)+(p2.level||1))/2);
  const isShiny = Math.random() < (1 / Math.max(1, 512 / ((player._shinyLuckMult||1) * (player.prestigeShinyMult||1))));
  breedingSlots[slotIdx] = {
    eggId, avgLevel, isShiny,
    startTime: Date.now(), endTime: Date.now()+BREEDING_TIME,
    parent1: p1.currentName||p1.name, parent2: p2.currentName||p2.name,
  };
  notify('🥚 Œuf en incubation ! Prêt dans 30 secondes !');
  updateBreedingHUD();
  player.breedingSelected=[];
  renderBreedingScreen();
}

let _periodicHUDTimer = null;
function startPeriodicHUD() {
  if (_periodicHUDTimer) clearInterval(_periodicHUDTimer);
  _periodicHUDTimer = setInterval(updatePeriodicHUD, 5000);
}

function updatePeriodicHUD() {
  if (!player) return;
  updateDayNightHUD();
  updateEventHUD();
  updateBreedingHUD();
  checkBreedingSlots();
  const rankEl = _hud('rank-hud');
  if (rankEl) {
    const r = getTrainerRank();
    rankEl.textContent = `${r.icon} ${r.rank}`;
    rankEl.style.color = r.color;
    rankEl.style.borderColor = r.color+'44';
  }
}

function showPokedex() {
  if (!player) return;
  if (!player.dexSeen) player.dexSeen = [];
  renderPokedex();
  showScreen('pokedex');
}

function renderPokedex() {
  const seen = new Set(player.dexSeen || []);
  const total = seen.size;
  const pct = (total / POKEDEX_TOTAL) * 100;

  // Update header
  document.getElementById('dex-progress-label').textContent = `${total} / ${POKEDEX_TOTAL} capturés`;
  document.getElementById('dex-progress-bar').style.width = pct + '%';

  // Milestone bar
  const given = player.dexMilestonesGiven || [];
  document.getElementById('dex-milestones').innerHTML = DEX_MILESTONES.map(m => {
    const done = given.includes(m.pct);
    const reachable = total >= m.count;
    const rewardLines = m.rewards.map(r => {
      if (r.type==='ball') { const names={pokeball:'Poké Ball',superball:'Super Ball',hyperball:'Hyper Ball',masterball:'Master Ball'}; const imgs={pokeball:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',superball:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',hyperball:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png',masterball:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png'}; return `<div style="display:flex;align-items:center;gap:.35rem"><img src="${imgs[r.id]}" style="width:20px;height:20px;image-rendering:pixelated"/><span>${r.qty}× ${names[r.id]||r.id}</span></div>`; }
      if (r.type==='item') { const names={potion:'Potion',superpotion:'Super Potion',hyperpotion:'Hyper Potion'}; const imgs={potion:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png',superpotion:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png',hyperpotion:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hyper-potion.png'}; return `<div style="display:flex;align-items:center;gap:.35rem"><img src="${imgs[r.id]}" style="width:20px;height:20px;image-rendering:pixelated"/><span>${r.qty}× ${names[r.id]||r.id}</span></div>`; }
      if (r.type==='candy') return `<div style="display:flex;align-items:center;gap:.35rem"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png" style="width:20px;height:20px;image-rendering:pixelated"/><span>${r.qty}× Super Bonbon</span></div>`;
    }).join('');
    return `<div style="background:${done?'rgba(45,198,83,.12)':reachable?'rgba(255,214,10,.08)':'rgba(255,255,255,.03)'};border:2px solid ${done?'#2dc653':reachable?'#ffd60a':'rgba(255,255,255,.12)'};border-radius:12px;padding:.7rem .9rem;display:flex;flex-direction:column;gap:.4rem">
      <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.1rem">
        <span style="font-size:1.1rem">${done?'✅':reachable?'⚡':'🔒'}</span>
        <span style="font-family:'Press Start 2P',monospace;font-size:.52rem;color:${done?'#2dc653':reachable?'#ffd60a':'rgba(255,255,255,.4)'}">${m.label}</span>
        <span style="font-family:'Press Start 2P',monospace;font-size:.35rem;color:rgba(255,255,255,.4);margin-left:auto">${m.count} Pokémon</span>
      </div>
      <div style="font-family:'Press Start 2P',monospace;font-size:.34rem;color:rgba(255,255,255,.55);display:flex;flex-direction:column;gap:.25rem">${rewardLines}</div>
      ${done?'<div style="font-family:\'Press Start 2P\',monospace;font-size:.3rem;color:#2dc653;margin-top:.1rem">✓ Récompense récupérée</div>':''}
    </div>`;
  }).join('');

  // Pokémon grid — all 151 Gen 1
  const grid = document.getElementById('pokedex-grid');
  grid.innerHTML = GEN1.map(p => {
    const unlocked = seen.has(p.id);
    const imgSrc = SPRITE_FRONT(p.id);
    const numStr = String(p.id).padStart(3, '0');
    return `<div style="background:rgba(${unlocked?'255,255,255':'0,0,0'},.04);border:2px solid rgba(${unlocked?'255,214,10':'255,255,255'},.${unlocked?'2':'07'});border-radius:10px;padding:.5rem .4rem;text-align:center;transition:all .2s;cursor:${unlocked?'pointer':'default'}" ${unlocked?`onclick="showDexDetail(${p.id})" onmouseover="this.style.borderColor='var(--yellow)'" onmouseout="this.style.borderColor='rgba(255,214,10,.2)'"`:''}>
      <div style="font-family:'Press Start 2P',monospace;font-size:.28rem;color:rgba(255,255,255,.3);margin-bottom:.2rem">#${numStr}</div>
      <img src="${imgSrc}" style="width:52px;height:52px;image-rendering:pixelated;${unlocked?'':'filter:grayscale(1) brightness(.25) contrast(.8)'}"/>
      <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:${unlocked?'var(--yellow)':'rgba(255,255,255,.2)'};margin-top:.25rem;line-height:1.5">${unlocked?p.n:'???'}</div>
      ${unlocked?`<div style="font-family:'Press Start 2P',monospace;font-size:.25rem;padding:.1rem .3rem;background:rgba(255,255,255,.07);border-radius:4px;color:rgba(255,255,255,.5);margin-top:.15rem">${p.t}</div>`:''}
    </div>`;
  }).join('');
}

function showDexDetail(pokeId) {
  const p = GEN1.find(x=>x.id===pokeId);
  if (!p) return;
  const dual = getPokeType(p.id, p.t);
  const typeColor = tp => ({ Feu:'#ff6030',Eau:'#4488ff',Plante:'#44bb44',Électrik:'#ffcc00',Normal:'#9999aa',Psy:'#ff4499',Vol:'#88aaee',Dragon:'#7038f8',Poison:'#aa44bb',Combat:'#994422',Glace:'#88ccff',Sol:'#cc9944',Roche:'#9a8080',Spectre:'#5544aa',Insecte:'#88aa22',Acier:'#aaaacc',Ténèbres:'#443344',Fée:'#ff88cc' }[tp]||'#666');
  const typeBadges = dual.split('/').map(t=>`<span style="font-family:'Press Start 2P',monospace;font-size:.38rem;padding:.18rem .5rem;border-radius:4px;background:${typeColor(t)};color:#fff">${t}</span>`).join(' ');
  const numStr = String(p.id).padStart(3,'0');
  // Check if captured
  const captured = (player.roster||[]).concat(player.box||[]).filter(r=>(r.spriteId||r.currentSpriteId)===p.id);
  const html = `<div style="display:flex;flex-direction:column;align-items:center;gap:.7rem;text-align:center">
    <div style="font-family:'Press Start 2P',monospace;font-size:.5rem;color:rgba(255,255,255,.4)">#${numStr}</div>
    <img src="${SPRITE_FRONT(p.id)}" style="width:96px;height:96px;image-rendering:pixelated;filter:drop-shadow(0 0 12px rgba(255,214,10,.4))"/>
    <div style="font-family:'Press Start 2P',monospace;font-size:.65rem;color:var(--yellow)">${p.n}</div>
    <div style="display:flex;gap:.4rem">${typeBadges}</div>
    ${captured.length>0?`<div style="font-family:'Press Start 2P',monospace;font-size:.38rem;color:#2dc653">✓ Dans votre équipe / box</div>`:''}
  </div>`;
  // Use a simple modal
  const modal = document.createElement('div');
  modal.style.cssText='position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center';
  modal.innerHTML=`<div style="background:rgba(10,10,30,.98);border:3px solid var(--yellow);border-radius:16px;padding:1.5rem;width:min(340px,92vw);box-shadow:0 0 30px rgba(255,214,10,.2)">${html}<button class="btn" onclick="this.closest('div[style*=\'fixed\']').remove()" style="margin-top:.7rem;font-size:.45rem">✗ FERMER</button></div>`;
  document.body.appendChild(modal);
}

// markDexSeen est appelé directement dans addCapturedToRoster (plus de wrapper récursif)

function initDexFromRoster() {
  if (!player) return;
  if (!player.dexSeen) player.dexSeen = [];
  // Mark all current roster + box pokemon
  const all = (player.roster||[]).concat(player.box||[]);
  all.forEach(p => {
    const id = p.currentSpriteId||p.spriteId||p.id;
    if (id && !player.dexSeen.includes(id)) player.dexSeen.push(id);
  });
}

// ── mousemove throttlé via RAF (évite les style-recalcs à 60fps) ──
let _bgLightPending = false;
let _bgLightX = 0, _bgLightY = 0;
document.addEventListener('mousemove', e => {
  _bgLightX = e.clientX; _bgLightY = e.clientY;
  if (_bgLightPending) return;
  _bgLightPending = true;
  requestAnimationFrame(() => {
    const bgLight = document.getElementById('bg-light');
    if (bgLight) bgLight.style.background =
      `radial-gradient(circle 400px at ${_bgLightX}px ${_bgLightY}px, rgba(255,214,10,0.06) 0%, rgba(76,201,240,0.03) 40%, transparent 70%)`;
    _bgLightPending = false;
  });
}, { passive: true });

// ── Particules : 10 sur mobile, 20 sur desktop ──
const pCont = document.getElementById('particles');
const PARTICLE_COUNT = window.innerWidth <= 640 ? 8 : 18;
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const s = document.createElement('div'); s.className = 'spark';
  s.style.left = Math.random()*100+'vw';
  s.style.animationDuration = (9+Math.random()*14)+'s';
  s.style.animationDelay   = (-Math.random()*22)+'s';
  s.style.width = s.style.height = (2+Math.random()*3)+'px';
  s.style.background = Math.random() > .5 ? '#4cc9f0' : '#ffd60a';
  pCont.appendChild(s);
}


// ══════════════════════════════════════════
// SUCCÈS / ACHIEVEMENTS
// ══════════════════════════════════════════
const ACHIEVEMENTS = [
  // Combats
  { id:'first-kill',    title:'Premier sang',    desc:'Vaincre 1 Pokémon',         icon:'⚔️',  condition:p=>(p.totalKills||0)>=1,        reward:{gold:50} },
  { id:'kills-100',     title:'Chasseur',         desc:'Vaincre 100 Pokémon',        icon:'🗡️',  condition:p=>(p.totalKills||0)>=100,      reward:{gold:300} },
  { id:'kills-500',     title:'Guerrier',         desc:'Vaincre 500 Pokémon',        icon:'⚔️',  condition:p=>(p.totalKills||0)>=500,      reward:{gold:800, candy:2} },
  { id:'kills-1000',    title:'Légende',          desc:'Vaincre 1000 Pokémon',       icon:'🏆',  condition:p=>(p.totalKills||0)>=1000,     reward:{gold:2000, candy:5, tokens:3} },
  { id:'kills-5000',    title:'Exterminateur',    desc:'Vaincre 5000 Pokémon',       icon:'💀',  condition:p=>(p.totalKills||0)>=5000,     reward:{gold:5000, candy:10, tokens:5} },
  // Boss
  { id:'first-boss',    title:'Briseur de Vague', desc:'Vaincre le 1er Boss',        icon:'💀',  condition:p=>(p.lastBossWave||0)>=1,      reward:{gold:500, candy:1} },
  { id:'boss-5',        title:'Dompteur',         desc:'Vaincre 5 Boss de vague',    icon:'🔥',  condition:p=>(p.lastBossWave||0)>=5,      reward:{gold:2000, candy:3} },
  { id:'boss-10',       title:'Conquérant',       desc:'Vaincre 10 Boss de vague',   icon:'👑',  condition:p=>(p.lastBossWave||0)>=10,     reward:{gold:5000, candy:5, tokens:3} },
  { id:'world-boss-1',  title:'Héros du Monde',   desc:'Vaincre 1 World Boss',       icon:'🌍',  condition:p=>(p.worldBossKills||0)>=1,    reward:{gold:3000, tokens:2} },
  { id:'world-boss-5',  title:'Gardien',          desc:'Vaincre 5 World Boss',       icon:'🌟',  condition:p=>(p.worldBossKills||0)>=5,    reward:{gold:10000, tokens:5, candy:5} },
  // Pokémon
  { id:'catch-10',      title:'Attrape-tout',     desc:'Capturer 10 Pokémon',        icon:'⚽',  condition:p=>((p.roster?.length||0)+(p.box?.length||0))>=10, reward:{gold:400} },
  { id:'catch-50',      title:'Collectionneur',   desc:'Capturer 50 Pokémon',        icon:'📦',  condition:p=>((p.roster?.length||0)+(p.box?.length||0))>=50, reward:{gold:1500, candy:3} },
  { id:'shiny-1',       title:'Chasseur Shiny',   desc:'Capturer 1 Pokémon Shiny',   icon:'✨',  condition:p=>(p.shinyCount||0)>=1,        reward:{gold:2000, tokens:2} },
  { id:'shiny-5',       title:'Éblouissant',      desc:'Capturer 5 Pokémon Shiny',   icon:'💫',  condition:p=>(p.shinyCount||0)>=5,        reward:{gold:5000, tokens:5} },
  { id:'mega-1',        title:'Méga Puissance',   desc:'Utiliser une Méga-Évolution',icon:'💎',  condition:p=>(p.megaCount||0)>=1,         reward:{gold:1000, tokens:1} },
  // Pokédex
  { id:'dex-25',        title:'Débutant Dresseur', desc:'Voir 25 Pokémon',           icon:'📖',  condition:p=>(p.dexSeen?.length||0)>=25,  reward:{gold:300} },
  { id:'dex-75',        title:'Expert',           desc:'Voir 75 Pokémon',            icon:'📗',  condition:p=>(p.dexSeen?.length||0)>=75,  reward:{gold:1000, candy:2} },
  { id:'dex-151',       title:'Maître Pokémon',   desc:'Voir les 151 Pokémon',       icon:'🎓',  condition:p=>(p.dexSeen?.length||0)>=151, reward:{gold:5000, candy:10, tokens:5} },
  // Or
  { id:'gold-1000',     title:'Riche',            desc:'Avoir 1000₽',                icon:'💰',  condition:p=>(p.gold||0)>=1000,           reward:{gold:0} },
  { id:'gold-10000',    title:'Millionnaire',     desc:'Avoir 10000₽',               icon:'💵',  condition:p=>(p.gold||0)>=10000,          reward:{tokens:2} },
  { id:'gold-100000',   title:'Magnat',           desc:'Avoir 100000₽',              icon:'🏦',  condition:p=>(p.gold||0)>=100000,         reward:{tokens:5, candy:3} },
  // Niveau
  { id:'lv-10',         title:'Apprenti',         desc:'Atteindre le niveau 10',     icon:'⬆️',  condition:p=>(p.level||1)>=10,            reward:{gold:200} },
  { id:'lv-30',         title:'Confirmé',         desc:'Atteindre le niveau 30',     icon:'⬆️',  condition:p=>(p.level||1)>=30,            reward:{gold:1000, candy:2} },
  { id:'lv-50',         title:'Expert',           desc:'Atteindre le niveau 50',     icon:'⬆️',  condition:p=>(p.level||1)>=50,            reward:{gold:3000, tokens:3} },
  { id:'lv-100',        title:'Maître',           desc:'Atteindre le niveau 100',    icon:'👑',  condition:p=>(p.level||1)>=100,           reward:{gold:10000,  tokens:10, candy:10} },
  { id:'lv-200',        title:'Champion',         desc:'Atteindre le niveau 200',    icon:'🔥',  condition:p=>(p.level||1)>=200,           reward:{gold:50000,  tokens:25, candy:20} },
  { id:'lv-300',        title:'Élite',            desc:'Atteindre le niveau 300',    icon:'💎',  condition:p=>(p.level||1)>=300,           reward:{gold:150000, tokens:50, candy:35} },
  { id:'lv-500',        title:'Transcendant',     desc:'Atteindre le niveau 500',    icon:'🌌',  condition:p=>(p.level||1)>=500,           reward:{gold:500000, tokens:150,candy:100} },
  // Tour
  { id:'tour-10',       title:'Grimpeur',         desc:'Atteindre l\'étage 10',      icon:'🏔️',  condition:p=>(p.tourFloor||0)>=10,        reward:{gold:1000, tokens:2} },
  { id:'tour-25',       title:'Alpiniste',        desc:'Atteindre l\'étage 25',      icon:'🗻',  condition:p=>(p.tourFloor||0)>=25,        reward:{gold:3000, tokens:3, candy:3} },
  { id:'tour-50',       title:'Sommet',           desc:'Atteindre l\'étage 50',      icon:'🌠',  condition:p=>(p.tourFloor||0)>=50,        reward:{gold:8000, tokens:8, candy:8} },
  // Dresseur
  { id:'trainer-5',     title:'Dresseur Confirmé',desc:'Niveau Dresseur 5',          icon:'🎖️',  condition:p=>(p.trainerLevel||1)>=5,      reward:{gold:500, tokens:1} },
  { id:'trainer-10',    title:'Maître Dresseur',  desc:'Niveau Dresseur 10',         icon:'🎗️',  condition:p=>(p.trainerLevel||1)>=10,     reward:{gold:2000, tokens:3} },
  { id:'trainer-20',    title:'Légendaire',       desc:'Niveau Dresseur 20',         icon:'🌟',  condition:p=>(p.trainerLevel||1)>=20,     reward:{gold:10000, tokens:10, candy:5} },
];

// checkAchievements debouncé — plusieurs appels en rafale (combat+levelup) → 1 seul check réel
let _achTimer = null;
function checkAchievements() {
  if (!player) return;
  if (_achTimer) clearTimeout(_achTimer);
  _achTimer = setTimeout(_doCheckAchievements, 400);
}
function _doCheckAchievements() {
  _achTimer = null;
  if (!player) return;
  if (!player.achievements) player.achievements = [];
  ACHIEVEMENTS.forEach(ach => {
    if (player.achievements.includes(ach.id)) return;
    if (ach.condition(player)) {
      player.achievements.push(ach.id);
      grantAchievementReward(ach);
    }
  });
}

function grantAchievementReward(ach) {
  const r = ach.reward;
  const parts = [];
  if (r.gold  > 0) { player.gold += r.gold; parts.push(`+${r.gold}₽`); }
  if (r.candy > 0) { player.heldItemBag = player.heldItemBag||{}; player.heldItemBag['super-bonbon']=(player.heldItemBag['super-bonbon']||0)+r.candy; parts.push(`+${r.candy}🍬`); }
  if (r.tokens> 0) { player.talentTokens=(player.talentTokens||0)+r.tokens; parts.push(`+${r.tokens}🪙`); }
  updateHUD();
  notify(`🏅 Succès : ${ach.icon} ${ach.title} !`);
  setTimeout(()=> setMessage(`🏅 Succès débloqué : "${ach.title}" — ${ach.desc} · Récompense : ${parts.join(' ')}`), 200);
}

// ══════════════════════════════════════════
// QUÊTES JOURNALIÈRES
// ══════════════════════════════════════════
const DAILY_QUEST_POOL = [
  { id:'kill-20',      title:'Chasseur du Jour',  desc:'Vaincre 20 Pokémon',          goal:20,  type:'kills',       reward:{gold:400,  candy:1} },
  { id:'kill-50',      title:'Guerrier du Jour',  desc:'Vaincre 50 Pokémon',          goal:50,  type:'kills',       reward:{gold:800,  tokens:1} },
  { id:'catch-3',      title:'Captureur',         desc:'Capturer 3 Pokémon',          goal:3,   type:'catches',     reward:{gold:600,  candy:1} },
  { id:'earn-1000',    title:'Prospère',          desc:'Gagner 1000₽ en combats',     goal:1000,type:'earn_gold',   reward:{gold:500,  tokens:1} },
  { id:'wave-boss',    title:'Briseur de Vague',  desc:'Vaincre le Boss de la vague', goal:1,   type:'boss_kills',  reward:{gold:1500, candy:2} },
  { id:'explore-30',   title:'Explorateur',       desc:'Explorer 30 fois',            goal:30,  type:'explores',    reward:{gold:300,  candy:1} },
  { id:'level-up',     title:'Entraîneur',        desc:'Monter de niveau 3 fois',     goal:3,   type:'level_ups',   reward:{gold:500,  tokens:1} },
  { id:'shiny-hunt',   title:'Chasse Shiny',      desc:'Affronter 100 Pokémon',       goal:100, type:'battles',     reward:{gold:700,  candy:2} },
  { id:'world-boss',   title:'Héros Mondial',     desc:'Vaincre le World Boss',       goal:1,   type:'world_boss',  reward:{gold:3000, tokens:2, candy:3} },
  { id:'rest-5',       title:'Soigneur',          desc:'Se reposer 5 fois',           goal:5,   type:'rests',       reward:{gold:200,  candy:1} },
];

function getDailyQuests() {
  if (!player) return [];
  const today = new Date().toDateString();
  if (player.dailyQuestDate !== today) {
    player.dailyQuestDate = today;
    // Pick 3 random quests
    const shuffled = [...DAILY_QUEST_POOL].sort(()=>Math.random()-0.5);
    player.dailyQuests = shuffled.slice(0,3).map(q=>({
      ...q, progress:0, done:false
    }));
    player.dailyQuestProgress = {};
    notify('🌅 Nouvelles Quêtes Journalières disponibles !');
  }
  return player.dailyQuests || [];
}

function updateDailyProgress(type, amount=1) {
  if (!player) return;
  getDailyQuests(); // ensure initialized
  (player.dailyQuests||[]).forEach(q => {
    if (q.done || q.type !== type) return;
    q.progress = (q.progress||0) + amount;
    if (q.progress >= q.goal) {
      q.progress = q.goal;
      q.done = true;
      grantQuestReward(q);
    }
  });
}

function grantQuestReward(q) {
  const r = q.reward;
  if (r.gold)   { player.gold += r.gold; }
  if (r.candy)  { player.heldItemBag=player.heldItemBag||{}; player.heldItemBag['super-bonbon']=(player.heldItemBag['super-bonbon']||0)+r.candy; }
  if (r.tokens) { player.talentTokens=(player.talentTokens||0)+r.tokens; }
  updateHUD();
  notify(`✅ Quête : ${q.title} ! +${r.gold}₽${r.candy?` +${r.candy}🍬`:''}${r.tokens?` +${r.tokens}🪙`:''}`);
}

// ══════════════════════════════════════════
// STATUT D'AFFINITÉ POKÉMON
// ══════════════════════════════════════════
const AFFINITY_LEVELS = [
  { lv:1,  name:'Inconnu',    bonus:0,    color:'#888' },
  { lv:2,  name:'Familier',   bonus:0.03, color:'#aaa' },
  { lv:3,  name:'Ami',        bonus:0.07, color:'#4488ff' },
  { lv:4,  name:'Confiant',   bonus:0.12, color:'#44cc44' },
  { lv:5,  name:'Fidèle',     bonus:0.18, color:'#ff8c00' },
  { lv:6,  name:'Inséparable',bonus:0.25, color:'#ff44aa' },
  { lv:7,  name:'Légendaire', bonus:0.35, color:'#ffd700' },
];

function addAffinity(poke, amount=1) {
  if (!poke) return;
  if (!poke.affinity)     poke.affinity = 0;
  if (!poke.affinityLv)   poke.affinityLv = 1;
  poke.affinity += amount;
  const needed = poke.affinityLv * 50;
  if (poke.affinity >= needed && poke.affinityLv < 7) {
    poke.affinity = 0;
    poke.affinityLv++;
    const lvData = AFFINITY_LEVELS[poke.affinityLv-1];
    notify(`💖 ${poke.currentName||poke.name} → Affinité ${lvData.name} ! +${(lvData.bonus*100).toFixed(0)}% dégâts`);
    // Apply bonus to stats
    poke.atk   = Math.round(poke.atk   * (1 + lvData.bonus/7));
    poke.magic = Math.round(poke.magic * (1 + lvData.bonus/7));
  }
}

// ══════════════════════════════════════════
// REVENU PASSIF (or automatique)
// ══════════════════════════════════════════
let passiveIncomeTimer = null;

function startPassiveIncome() {
  if (passiveIncomeTimer) clearInterval(passiveIncomeTimer);
  passiveIncomeTimer = setInterval(() => {
    if (!player || currentScreen !== 'game') return;
    const base = 2 + Math.floor((player.level||1) * 0.5) + (player.lastBossWave||0) * 3 + (player._passiveIncome||0);
    const income = Math.max(1, Math.round(base * (player.prestigeGoldMult||1)));
    player.gold += income;
    updateHUD();
    const ind = document.getElementById('passive-income-indicator');
    if (ind) { ind.textContent = `+${income}/5s`; setTimeout(()=>{if(ind)ind.textContent='';},1500); }
  }, 5000); // every 5s
}

// ══════════════════════════════════════════
// FORGE / ARTISANAT
// ══════════════════════════════════════════
const CRAFT_RECIPES = [
  { id:'superball',   name:'Super Ball',     icon:'<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png" style="width:32px;height:32px;image-rendering:pixelated;vertical-align:middle"/>', cost:{gold:300, pokeball:3},   result:{ball:'superball',qty:1},    desc:'3 Poké Balls + 300₽' },
  { id:'hyperball',   name:'Hyper Ball',     icon:'<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png" style="width:32px;height:32px;image-rendering:pixelated;vertical-align:middle"/>', cost:{gold:800, superball:2},  result:{ball:'hyperball',qty:1},    desc:'2 Super Balls + 800₽' },
  { id:'superpotion', name:'Super Potion',   icon:'<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png" style="width:32px;height:32px;image-rendering:pixelated;vertical-align:middle"/>', cost:{gold:200, potion:2},     result:{item:'superpotion',qty:1},  desc:'2 Potions + 200₽' },
  { id:'hyperpotion', name:'Hyper Potion',   icon:'<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hyper-potion.png" style="width:32px;height:32px;image-rendering:pixelated;vertical-align:middle"/>', cost:{gold:500, superpotion:2},result:{item:'hyperpotion',qty:1},  desc:'2 Super Potions + 500₽' },
  { id:'talent-token',name:'Jeton Talent',   icon:'<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" style="width:32px;height:32px;image-rendering:pixelated;vertical-align:middle"/>', cost:{gold:400},               result:{token:1},                   desc:'400₽ → 1 Jeton Talent' },
  { id:'rare-candy',  name:'Super Bonbon',   icon:'<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png" style="width:32px;height:32px;image-rendering:pixelated;vertical-align:middle"/>', cost:{gold:600},               result:{candy:1},                   desc:'600₽ → 1 Super Bonbon' },
];

function canCraft(recipe) {
  if (!player) return false;
  const c = recipe.cost;
  if (c.gold && (player.gold||0) < c.gold) return false;
  if (c.pokeball   && (player.balls?.pokeball||0)    < c.pokeball)   return false;
  if (c.superball  && (player.balls?.superball||0)   < c.superball)  return false;
  if (c.superpotion&& (player.bag?.superpotion||0)   < c.superpotion)return false;
  if (c.potion     && (player.bag?.potion||0)        < c.potion)     return false;
  return true;
}

function doCraft(recipeId) {
  const r = CRAFT_RECIPES.find(x=>x.id===recipeId);
  if (!r || !canCraft(r)) { notify('Matériaux insuffisants !'); return; }
  const c = r.cost;
  if (c.gold)       player.gold -= c.gold;
  if (c.pokeball)   player.balls.pokeball   -= c.pokeball;
  if (c.superball)  player.balls.superball   -= c.superball;
  if (c.superpotion)player.bag.superpotion   -= c.superpotion;
  if (c.potion)     player.bag.potion        -= c.potion;
  const res = r.result;
  if (res.ball)  { player.balls[res.ball]  = (player.balls[res.ball]||0)  + (res.qty||1); }
  if (res.item)  { player.bag[res.item]    = (player.bag[res.item]||0)    + (res.qty||1); }
  if (res.token) { player.talentTokens = (player.talentTokens||0) + (res.token||1); }
  if (res.candy) { player.heldItemBag=player.heldItemBag||{}; player.heldItemBag['super-bonbon']=(player.heldItemBag['super-bonbon']||0)+(res.candy||1); }
  updateHUD();
  notify(`⚒️ Fabriqué : ${r.icon} ${r.name} !`);
}

// ══════════════════════════════════════════
// STATISTIQUES GLOBALES
// ══════════════════════════════════════════
function updateGlobalStats(type, amount=1) {
  if (!player) return;
  if (!player.stats) player.stats = {};
  player.stats[type] = (player.stats[type]||0) + amount;
  updateDailyProgress(type, amount);
  updateSeasonProgress(type, amount);
  if ((player.stats.kills||0) % 10 === 0 || type !== 'kills') checkAchievements();
}
// Version batch : évite 3× updateDailyProgress/frame pour un seul kill
function updateGlobalStatsBatch(map) {
  if (!player) return;
  if (!player.stats) player.stats = {};
  Object.entries(map).forEach(([type, amount]) => {
    player.stats[type] = (player.stats[type]||0) + amount;
    updateDailyProgress(type, amount);
    updateSeasonProgress(type, amount);
  });
  if ((player.stats.kills||0) % 10 === 0) checkAchievements();
}

// ══════════════════════════════════════════
// PASS DE SAISON — reset hebdomadaire
// ══════════════════════════════════════════
const SEASON_PASS = {
  tracks: [
    {
      id:'combat', name:'Combattant', icon:'⚔️', color:'#e63946',
      milestones:[
        { pts:20,  label:'20 combats',  reward:{gold:500} },
        { pts:60,  label:'60 combats',  reward:{gold:1200, candy:1} },
        { pts:120, label:'120 combats', reward:{tokens:2} },
        { pts:250, label:'250 combats', reward:{gold:4000, candy:3} },
        { pts:500, label:'500 combats', reward:{gold:10000, tokens:5}, ultimate:true },
      ],
      pointTypes:['kills','boss_kills','battles','world_boss'],
    },
    {
      id:'explorer', name:'Explorateur', icon:'🗺️', color:'#4cc9f0',
      milestones:[
        { pts:15,  label:'15 explorations',  reward:{gold:400} },
        { pts:40,  label:'40 explorations',  reward:{gold:900, candy:1} },
        { pts:80,  label:'80 explorations',  reward:{tokens:2} },
        { pts:150, label:'150 explorations', reward:{gold:2800, candy:2} },
        { pts:300, label:'300 explorations', reward:{gold:7000, tokens:4}, ultimate:true },
      ],
      pointTypes:['explores','rests','level_ups'],
    },
    {
      id:'collector', name:'Collecteur', icon:'📦', color:'#06d6a0',
      milestones:[
        { pts:10,  label:'10 captures',  reward:{gold:600} },
        { pts:30,  label:'30 captures',  reward:{gold:1400, candy:2} },
        { pts:70,  label:'70 captures',  reward:{tokens:3} },
        { pts:150, label:'150 captures', reward:{gold:4500, candy:4} },
        { pts:300, label:'300 captures', reward:{gold:12000, tokens:6}, ultimate:true },
      ],
      pointTypes:['catches'],
    },
  ],
};

function _seasonKey() {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - start) / 86400000 + start.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
}

function initSeasonPass() {
  if (!player) return;
  const key = _seasonKey();
  if (player.seasonKey !== key) {
    player.seasonKey = key;
    player.seasonProgress = {};
    player.seasonClaimed  = {};
    notify('🎫 Nouveau Pass Saisonnier disponible !');
  }
}

function updateSeasonProgress(type, amount=1) {
  if (!player) return;
  initSeasonPass();
  SEASON_PASS.tracks.forEach(t => {
    if (t.pointTypes.includes(type)) {
      if (!player.seasonProgress) player.seasonProgress = {};
      player.seasonProgress[t.id] = (player.seasonProgress[t.id]||0) + amount;
    }
  });
}

function claimSeasonReward(trackId, milestoneIdx) {
  if (!player) return;
  initSeasonPass();
  const track = SEASON_PASS.tracks.find(t=>t.id===trackId);
  if (!track) return;
  const ms = track.milestones[milestoneIdx];
  if (!ms) return;
  const pts = player.seasonProgress?.[trackId]||0;
  if (pts < ms.pts) { notify('⛔ Palier pas encore atteint !'); return; }
  const key = `${trackId}-${milestoneIdx}`;
  if (player.seasonClaimed?.[key]) { notify('✅ Déjà réclamé !'); return; }
  if (!player.seasonClaimed) player.seasonClaimed = {};
  player.seasonClaimed[key] = true;
  const r = ms.reward;
  if (r.gold)   player.gold += r.gold;
  if (r.candy)  { player.heldItemBag=player.heldItemBag||{}; player.heldItemBag['super-bonbon']=(player.heldItemBag['super-bonbon']||0)+r.candy; }
  if (r.tokens) player.talentTokens=(player.talentTokens||0)+r.tokens;
  updateHUD();
  const parts=[r.gold?`+${r.gold}₽`:'',r.candy?`+${r.candy}🍬`:'',r.tokens?`+${r.tokens}🪙`:''].filter(Boolean).join(' ');
  notify(`🎫 Pass Saisonnier : ${parts} !`);
  renderSeasonPass();
}

function renderSeasonPass() {
  const el = document.getElementById('season-pass-content');
  if (!el || !player) return;
  initSeasonPass();
  const typeColors={gold:'#ffd60a',candy:'#ff88cc',tokens:'#c77dff'};
  el.innerHTML = SEASON_PASS.tracks.map(track => {
    const pts = player.seasonProgress?.[track.id]||0;
    const maxPts = track.milestones[track.milestones.length-1].pts;
    const pct = Math.min(100, Math.round(pts/maxPts*100));
    const milestonesHTML = track.milestones.map((ms, i) => {
      const reached = pts >= ms.pts;
      const claimed = player.seasonClaimed?.[`${track.id}-${i}`];
      const canClaim = reached && !claimed;
      const rewardStr = Object.entries(ms.reward).map(([k,v])=>`<span style="color:${typeColors[k]||'#fff'};font-size:.55rem">${k==='gold'?`+${v}₽`:k==='candy'?`+${v}🍬`:`+${v}🪙`}</span>`).join(' ');
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:.2rem;min-width:80px">
        <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.4)">${ms.label}</div>
        <button onclick="claimSeasonReward('${track.id}',${i})" ${!canClaim?'disabled':''}
          style="width:44px;height:44px;border-radius:50%;border:2px solid ${claimed?'#2dc653':reached?track.color:'rgba(255,255,255,.15)'};
          background:${claimed?'rgba(45,198,83,.2)':reached?`${track.color}22`:'rgba(0,0,0,.4)'};
          cursor:${canClaim?'pointer':'default'};font-size:1rem;transition:all .15s;
          ${canClaim?`box-shadow:0 0 10px ${track.color}66`:''}">
          ${claimed?'✅':reached?'🎁':'🔒'}
        </button>
        <div style="text-align:center">${rewardStr}</div>
        ${ms.ultimate?`<div style="font-family:'Press Start 2P',monospace;font-size:.25rem;color:${track.color};margin-top:.1rem">★ MAX</div>`:''}
      </div>`;
    }).join('<div style="flex:1;height:2px;background:rgba(255,255,255,.1);margin-top:22px;align-self:center"></div>');
    return `<div style="background:rgba(255,255,255,.03);border:2px solid ${track.color}44;border-radius:14px;padding:1rem 1.2rem;display:flex;flex-direction:column;gap:.7rem">
      <div style="display:flex;align-items:center;gap:.6rem;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:.5rem">
          <span style="font-size:1.4rem">${track.icon}</span>
          <div style="font-family:'Press Start 2P',monospace;font-size:.5rem;color:${track.color}">${track.name}</div>
        </div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.38rem;color:rgba(255,255,255,.5)">${pts} / ${maxPts} pts</div>
      </div>
      <div style="height:8px;background:rgba(0,0,0,.4);border-radius:999px;overflow:hidden;border:1px solid rgba(255,255,255,.1)">
        <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,${track.color},${track.color}88);border-radius:999px;transition:width .4s"></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:.3rem">${milestonesHTML}</div>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════
// NIVEAU DRESSEUR
// ══════════════════════════════════════════
const TRAINER_XP_PER_LEVEL = lv => Math.floor(20 * Math.pow(1.35, lv - 1));

function addTrainerXP(amount) {
  if (!player) return;
  if (!player.trainerLevel) player.trainerLevel = 1;
  if (!player.trainerXP)    player.trainerXP    = 0;
  if (!player.trainerXPNext) player.trainerXPNext = TRAINER_XP_PER_LEVEL(1);

  player.trainerXP += amount;
  while (player.trainerXP >= player.trainerXPNext) {
    player.trainerXP -= player.trainerXPNext;
    player.trainerLevel++;
    player.trainerXPNext = TRAINER_XP_PER_LEVEL(player.trainerLevel);
    notify(`🎖 Niveau Dresseur ${player.trainerLevel} !`);
    setMessage(`🎖 Vous atteignez le niveau Dresseur ${player.trainerLevel} !`);
    if (player.trainerLevel === 10) {
      setTimeout(() => {
        notify('🏆 MODE TOUR DÉBLOQUÉ !');
        setMessage('🏆 Niveau 10 Dresseur atteint — Le MODE TOUR est débloqué !');
        document.getElementById('btn-tour').style.display = 'inline-block';
      }, 1000);
    }
  }
  updateHUDTrainer();
}

function updateHUDTrainer() {
  if (!player) return;
  const lv = player.trainerLevel || 1;
  const xp = player.trainerXP || 0;
  const xpNext = player.trainerXPNext || TRAINER_XP_PER_LEVEL(1);
  const pct = Math.min(100, Math.round((xp / xpNext) * 100));
  const badge = _hud('trainer-level-badge');
  const bar   = _hud('bar-trainer-xp');
  const val   = _hud('trainer-xp-val');
  if (badge) badge.textContent = `Niv.${lv}`;
  if (bar)   bar.style.width = pct + '%';
  if (val)   val.textContent = `${xp}/${xpNext}`;
  const tourDrop = _hud('btn-tour-drop');
  if (tourDrop) tourDrop.style.display = lv >= 10 ? 'block' : 'none';
}
// ══════════════════════════════════════════
const HELD_ITEMS = {
  'mega-stone':   { name:'Pierre Méga', icon:'💎', desc:'Méga-Évolution en combat (si compatible)', consumable:false, color:'#aa44ff',
    apply(p){ return false; } },
  'super-bonbon':  { name:'Super Bonbon',  icon:'<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png" style="width:18px;height:18px;image-rendering:pixelated;vertical-align:middle"/>', desc:'+1 niveau au Pokémon (consomable)', consumable:true,  color:'#ff69b4',
    apply(p){ levelUpPokemon(p); return true; } },
  'amulette-or':   { name:'Amulette d\'Or', icon:'💰', desc:'+30% or gagné en combat',         consumable:false, color:'#ffd700',
    apply(p){ return false; } },
  'ceinture-choix':{ name:'Ceinture Choix', icon:'🥊', desc:'+30% Attaque',                    consumable:false, color:'#ff4500',
    apply(p){ p.atk = Math.round(p.atk * 1.3); return false; } },
  'lentille-choix':{ name:'Lentille Choix', icon:'🔮', desc:'+30% Att. Spéciale',              consumable:false, color:'#9b59b6',
    apply(p){ p.magic = Math.round(p.magic * 1.3); p.spAtk = Math.round((p.spAtk||p.magic)*1.3); return false; } },
  'bandeau-choix': { name:'Bandeau Choix',  icon:'🏃', desc:'+30% Vitesse',                    consumable:false, color:'#2dc653',
    apply(p){ p.spd = Math.round(p.spd * 1.3); return false; } },
  'reste':         { name:'Restes',         icon:'🍖', desc:'Récupère 5% PV/tour en combat',   consumable:false, color:'#888',
    apply(p){ return false; } },
  'ecaille-mentale':{ name:'Écaille Mentale',icon:'🛡', desc:'+25% Déf. Spéciale',             consumable:false, color:'#4cc9f0',
    apply(p){ p.def = Math.round(p.def * 1.25); p.spDef = Math.round((p.spDef||p.def)*1.25); return false; } },
  'pepite':        { name:'Pépite',         icon:'💎', desc:'Vaut 3000₽ si vendue',           consumable:true,  color:'#00ffff',
    apply(p){ player.gold += 3000; updateHUD(); return true; } },
};

const TOUR_REWARD_POOL = ['super-bonbon','amulette-or','ceinture-choix','lentille-choix','bandeau-choix','reste','ecaille-mentale','pepite'];

function getHeldItem(itemId) { return HELD_ITEMS[itemId] || null; }

function assignItemToPokemon(source, idx, itemId) {
  const pool = source === 'roster' ? player.roster : player.box;
  const p = pool[idx];
  if (!p) return;
  const item = HELD_ITEMS[itemId];
  if (!item) return;
  // Check stock
  if (!player.heldItemBag) player.heldItemBag = {};
  if ((player.heldItemBag[itemId] || 0) <= 0) { notify(`Pas de ${item.name} !`); return; }
  // Remove previous held item (give back)
  if (p.heldItem) {
    player.heldItemBag[p.heldItem] = (player.heldItemBag[p.heldItem] || 0) + 1;
    // Revert previous item effect if non-consumable (simple: we don't revert, just track)
  }
  p.heldItem = itemId;
  // Consumables apply immediately
  if (item.consumable) {
    const consumed = item.apply(p);
    if (consumed) {
      player.heldItemBag[itemId]--;
      p.heldItem = null;
      notify(`🍬 ${item.name} utilisé sur ${p.currentName||p.name} !`);
    }
  } else {
    player.heldItemBag[itemId]--;
    notify(`${item.icon} ${p.currentName||p.name} tient ${item.name} !`);
  }
  renderTeamDetail();
  renderTeam();
}

function removeItemFromPokemon(source, idx) {
  const pool = source === 'roster' ? player.roster : player.box;
  const p = pool[idx];
  if (!p || !p.heldItem) return;
  if (!player.heldItemBag) player.heldItemBag = {};
  player.heldItemBag[p.heldItem] = (player.heldItemBag[p.heldItem] || 0) + 1;
  notify(`${HELD_ITEMS[p.heldItem]?.icon||'📦'} ${p.currentName||p.name} n'a plus d'objet.`);
  p.heldItem = null;
  renderTeamDetail();
  renderTeam();
}

function levelUpPokemon(p) {
  if (p.level >= 500) return;
  p.level++;
  p.xpNext = xpForLevel((p.level||1));
  p.maxHp  += 12; p.hp = p.maxHp;
  p.atk    += 2; p.def += 1; p.magic += 2; p.spd += 1;
  if (p.spAtk !== undefined) p.spAtk += 2;
  if (p.spDef !== undefined) p.spDef += 1;
  notify(`⬆ ${p.currentName||p.name} → Niveau ${p.level} ! (Super Bonbon)`);
}

// ══════════════════════════════════════════
// WIKI — GUIDE DU JOUEUR
// ══════════════════════════════════════════
function renderWiki() {
  const el = document.getElementById('wiki-content');
  if (!el) return;
  const section = (icon, title, color, rows) => `
    <details style="margin-bottom:.7rem;border:1px solid ${color}44;border-radius:10px;overflow:hidden">
      <summary style="cursor:pointer;padding:.7rem 1rem;background:${color}18;font-family:'Press Start 2P',monospace;font-size:.45rem;color:${color};display:flex;align-items:center;gap:.5rem;list-style:none;user-select:none">
        ${icon} ${title}
      </summary>
      <div style="padding:.8rem 1rem;display:flex;flex-direction:column;gap:.45rem;background:rgba(0,0,0,.3)">
        ${rows.map(r=>`<div style="font-family:'Press Start 2P',monospace;font-size:.38rem;color:rgba(255,255,255,.75);line-height:1.9;padding:.3rem .5rem;background:rgba(255,255,255,.03);border-left:2px solid ${color}66;border-radius:0 6px 6px 0">${r}</div>`).join('')}
      </div>
    </details>`;
  el.innerHTML = [
    section('🎮','EXPLORATION & COMBAT','#06d6a0',[
      '➤ Explore pour rencontrer des Pokémon sauvages et gagner de l\'or.',
      '➤ Chaque vague de 10 victoires déclenche un Boss d\'exploration.',
      '➤ Le Farm Auto explore et combat automatiquement en boucle.',
      '➤ Utilise ✋ MANUEL en combat pour stopper l\'auto et agir toi-même.',
      '➤ Les Pokémon K.O. ne peuvent pas combattre — soigne-les au Centre.',
    ]),
    section('⚔️','ACTIONS EN COMBAT','#4cc9f0',[
      '➤ ATTAQUE : dégâts physiques standards, toujours disponible.',
      '➤ CAPACITÉ : attaque spéciale élémentaire, 4 utilisations par combat.',
      '➤ POTION : soigne ton Pokémon actif en plein combat.',
      '➤ CAPTURER : lance une Poké Ball sur le Pokémon sauvage.',
      '➤ CHANGER : switche vers un autre Pokémon de ton équipe.',
      '➤ FUITE : 70 % de chance de quitter le combat (impossible en modes spéciaux).',
    ]),
    section('⚽','CAPTURE','#ffd60a',[
      '➤ La capture est possible sur tous les Pokémon sauvages ET les boss d\'exploration.',
      '➤ DÉSACTIVÉE pendant : Tour Infinie, World Boss, Trial, Dresseurs.',
      '➤ Poké Ball ×1 · Super Ball ×1.5 · Hyper Ball ×2 · Master Ball = capture garantie.',
      '➤ Les Pokémon K.O. ou avec peu de PV sont plus faciles à capturer.',
      '➤ Ton Pokédex se complète automatiquement à chaque nouvelle capture.',
    ]),
    section('✨','POKÉMON SHINY','#f72585',[
      '➤ Taux d\'apparition : 1 chance sur 256 à chaque rencontre.',
      '➤ Un shiny a ses stats boostées de +20 % sur toutes les valeurs.',
      '➤ Reconnaissable au badge ✨ sur le sprite et dans ton équipe.',
      '➤ La Gemme Éclat (boutique Trial) force un Pokémon de ton équipe à devenir shiny.',
      '➤ Les œufs d\'élevage peuvent aussi produire des shiny (même taux).',
    ]),
    section('📏','VARIANTES DE TAILLE','#a855f7',[
      '➤ Chaque Pokémon capturé reçoit une taille aléatoire qui modifie ses stats.',
      '➤ 🔬 Lilliputien (2%) : stats ×0.80 — très rare, stats réduites.',
      '➤ 🔹 Petit (13%) : stats ×0.92.',
      '➤ ⬜ Normal (50%) : stats ×1.00 — le plus commun.',
      '➤ 🔷 Grand (25%) : stats ×1.10.',
      '➤ 🔶 Géant (8%) : stats ×1.25.',
      '➤ 🔴 Colossal (2%) : stats ×1.50 — très rare, stats très élevées.',
    ]),
    section('🏆','TOUR INFINIE','#ffd60a',[
      '➤ Accessible au niveau Dresseur 10 via le menu ☰.',
      '➤ Affronte des ennemis de plus en plus puissants à chaque étage.',
      '➤ Tu peux choisir de refaire un étage déjà vaincu (sélecteur d\'étage).',
      '➤ Tous les 10 étages : récompenses spéciales (balls, bonbons, or).',
      '➤ La capture est DÉSACTIVÉE en Tour — uniquement pour la gloire.',
      '➤ Défaite = sortie de la Tour, étage remis à zéro.',
    ]),
    section('⚡','MODE TRIAL','#a855f7',[
      '➤ Affronte des Pokémon Légendaires en échange de Points Trial (PT).',
      '➤ 5 tiers de difficulté : Tier 1 (20 PT) → Tier 5 (85 PT).',
      '➤ Les PT s\'accumulent et servent dans la Boutique Trial exclusive.',
      '➤ Boutique Trial : Orbes invocateurs, Gemme Éclat — introuvables ailleurs.',
      '➤ Les Orbes permettent de déclencher un combat contre un légendaire capturable.',
      '➤ La capture est DÉSACTIVÉE pendant les défis Trial eux-mêmes.',
    ]),
    section('🌍','WORLD BOSS','#e63946',[
      '➤ Apparaît toutes les 2 heures environ (timer en bas de l\'écran).',
      '➤ Pokémon légendaire extrêmement puissant — prépare ton meilleur combattant.',
      '➤ Récompense : or massif + bonus spéciaux selon le boss.',
      '➤ La capture est DÉSACTIVÉE contre le World Boss.',
      '➤ Défaite = aucune pénalité, tu peux retenter dès que le timer le permet.',
    ]),
    section('🥚','ÉLEVAGE','#ff88cc',[
      '➤ Sélectionne deux Pokémon compatibles pour créer un œuf.',
      '➤ L\'œuf éclot après un certain nombre de pas (explorations).',
      '➤ Le bébé hérite d\'un talent aléatoire parmi ceux de ses parents.',
      '➤ Chance de shiny (1/256) comme pour les captures sauvages.',
    ]),
    section('✨','TALENTS & COMPÉTENCES','#c77dff',[
      '➤ Chaque Pokémon peut avoir jusqu\'à 3 talents passifs.',
      '➤ Les talents se débloquent avec des Jetons de Talent (victoires, succès).',
      '➤ Exemples : Vol-Santé (soin auto), Bouclier, Coup Critique…',
      '➤ L\'écran Compétences (📊) montre les bonus de ton Dresseur.',
    ]),
    section('⭐','PRESTIGE','#ffd60a',[
      '➤ Disponible une fois ton Pokémon actif au niveau 100.',
      '➤ Remet le jeu à zéro mais octroie des bonus permanents cumulables.',
      '➤ Plus tu prestiges souvent, plus tes bonus (or, XP, stats) augmentent.',
      '➤ Les succès et le Pokédex sont conservés après un Prestige.',
    ]),
    section('💾','SAUVEGARDE','#4cc9f0',[
      '➤ Sauvegarde automatique à chaque victoire de combat.',
      '➤ SAVE dans le menu = sauvegarde manuelle immédiate.',
      '➤ EXPORT : télécharge un fichier .pwsave — garde-le précieusement !',
      '➤ Code de sauvegarde : texte Base64 pour copier-coller entre appareils.',
      '➤ En cas de perte : le bouton "Restaurer depuis IndexedDB" récupère une copie locale.',
    ]),
  ].join('');
}

// ══════════════════════════════════════════
// MODE TOUR
// ══════════════════════════════════════════
let tourState = null; // { floor, pokemon, enemy, phase:'choose'|'fight'|'reward' }
let _tourSelectedFloor = null; // null = prochain étage non battu

const TOUR_FLOOR_ENEMIES = floor => {
  const scale = 1 + floor * 0.18;
  const allIds = GEN1.filter(p => p.id <= 151);
  // Pick random enemies, harder every floor
  const pool = allIds.filter(p => p.atk * scale >= 5);
  const pData = pool[Math.floor(Math.random() * pool.length)];
  const spd = GEN1_SPD[pData.id] || 50;
  return {
    name: pData.n, id: pData.id,
    level: Math.max(1, Math.min(500, floor * 3 + Math.floor(Math.random() * 5))),
    hp: Math.round(pData.hp * scale), maxHp: Math.round(pData.hp * scale),
    atk: Math.round(pData.atk * scale), def: Math.round(pData.def * scale) || 1,
    spd: Math.round(spd * scale), xp: 0, gold: 0, type: pData.t,
    isShiny: false,
  };
};

const TOUR_RARE_ITEMS = ['super-bonbon','ceinture-choix','lentille-choix','bandeau-choix','reste','ecaille-mentale','amulette-or','pepite'];

// ══════════════════════════════════════════
// TRIAL MODE SCREEN
// ══════════════════════════════════════════
// ── TRIAL : pool de défis légendaires disponibles ──
// ── TRIAL : contenu END-GAME — stats fixes, pas de scaling trainer ──
// Formule dégâts : max(1, enemy.atk + rand(5) - player.def/2)
// Joueur Niv.100 attendu : HP≈1450, ATK≈310, DEF≈210 (def/2≈105)
// Tier 1 : accessible Niv.70+ · Tier 5 : mur absolu Niv.100+ build optimal
const TRIAL_CHALLENGES = [
  // ── Tier 1 — 50 PT · Niv. 72 · "Légendaires régionaux" ──
  {id:144, n:'Artikodin',  t:'Glace/Vol',      lv:72,  tp:50,  hp:1380, atk:440, def:110, spd:220, magic:400},
  {id:145, n:'Électhor',   t:'Électrik/Vol',   lv:72,  tp:50,  hp:1300, atk:460, def:100, spd:235, magic:420},
  {id:146, n:'Sulfura',    t:'Feu/Vol',        lv:72,  tp:50,  hp:1280, atk:455, def:105, spd:225, magic:415},
  {id:243, n:'Raikou',     t:'Électrik',       lv:72,  tp:50,  hp:1350, atk:440, def:108, spd:240, magic:400},
  {id:244, n:'Entei',      t:'Feu',            lv:72,  tp:50,  hp:1480, atk:460, def:102, spd:210, magic:420},
  {id:245, n:'Suicune',    t:'Eau',            lv:72,  tp:50,  hp:1420, atk:420, def:132, spd:200, magic:382},
  {id:377, n:'Regirock',   t:'Roche',          lv:72,  tp:50,  hp:1300, atk:415, def:155, spd:172, magic:378},
  {id:378, n:'Regice',     t:'Glace',          lv:72,  tp:50,  hp:1300, atk:400, def:158, spd:175, magic:365},
  {id:379, n:'Registeel',  t:'Acier',          lv:72,  tp:50,  hp:1300, atk:408, def:162, spd:175, magic:372},
  // ── Tier 2 — 90 PT · Niv. 95 · "Duo légendaires + Création" ──
  {id:380, n:'Latias',     t:'Dragon/Psy',     lv:95,  tp:90,  hp:2200, atk:545, def:158, spd:285, magic:500},
  {id:381, n:'Latios',     t:'Dragon/Psy',     lv:95,  tp:90,  hp:2100, atk:575, def:148, spd:298, magic:525},
  {id:384, n:'Rayquaza',   t:'Dragon/Vol',     lv:95,  tp:90,  hp:2380, atk:595, def:142, spd:290, magic:545},
  {id:480, n:'Uxie',       t:'Psy',            lv:95,  tp:90,  hp:2050, atk:512, def:175, spd:262, magic:472},
  {id:481, n:'Mesprit',    t:'Psy',            lv:95,  tp:90,  hp:2150, atk:548, def:160, spd:270, magic:502},
  {id:482, n:'Azelf',      t:'Psy',            lv:95,  tp:90,  hp:2000, atk:582, def:145, spd:295, magic:535},
  {id:483, n:'Dialga',     t:'Acier/Dragon',   lv:95,  tp:90,  hp:2520, atk:562, def:188, spd:252, magic:515},
  {id:484, n:'Palkia',     t:'Eau/Dragon',     lv:95,  tp:90,  hp:2420, atk:582, def:168, spd:268, magic:535},
  {id:487, n:'Giratina',   t:'Spectre/Dragon', lv:95,  tp:90,  hp:2680, atk:558, def:192, spd:245, magic:510},
  // ── Tier 3 — 140 PT · Niv. 120 · "Épées / Forces de la Nature / Vie-Mort" ──
  {id:638, n:'Cobalion',   t:'Acier/Combat',   lv:120, tp:140, hp:3400, atk:725, def:218, spd:342, magic:665},
  {id:639, n:'Terrakion',  t:'Roche/Combat',   lv:120, tp:140, hp:3300, atk:765, def:208, spd:332, magic:700},
  {id:640, n:'Virizion',   t:'Plante/Combat',  lv:120, tp:140, hp:3200, atk:710, def:222, spd:348, magic:650},
  {id:641, n:'Boréas',     t:'Vol',            lv:120, tp:140, hp:3380, atk:745, def:202, spd:362, magic:682},
  {id:642, n:'Démiolos',   t:'Électrik/Vol',   lv:120, tp:140, hp:3400, atk:758, def:198, spd:372, magic:695},
  {id:716, n:'Xerneas',    t:'Fée',            lv:120, tp:140, hp:3620, atk:718, def:225, spd:328, magic:658},
  {id:717, n:'Yveltal',    t:'Ténèbres/Vol',   lv:120, tp:140, hp:3560, atk:748, def:212, spd:338, magic:685},
  {id:718, n:'Zygarde',    t:'Dragon/Sol',     lv:120, tp:140, hp:3780, atk:702, def:232, spd:320, magic:642},
  // ── Tier 4 — 200 PT · Niv. 148 · "Dieu-Pokémon" ──
  {id:150, n:'Mewtwo',     t:'Psy',            lv:148, tp:200, hp:5800, atk:1005,def:272, spd:455, magic:925},
  {id:382, n:'Kyogre',     t:'Eau',            lv:148, tp:200, hp:5650, atk:985, def:288, spd:422, magic:905},
  {id:383, n:'Groudon',    t:'Sol',            lv:148, tp:200, hp:5750, atk:1015,def:305, spd:418, magic:930},
  {id:791, n:'Solgaleo',   t:'Acier/Psy',      lv:148, tp:200, hp:5520, atk:975, def:295, spd:434, magic:895},
  {id:792, n:'Lunala',     t:'Psy/Spectre',    lv:148, tp:200, hp:5420, atk:965, def:280, spd:442, magic:885},
  {id:800, n:'Necrozma',   t:'Psy',            lv:148, tp:200, hp:5320, atk:995, def:285, spd:438, magic:915},
  // ── Tier 5 — 300 PT · Niv. 178 · "Mur absolu — contenu END-GAME" ──
  {id:888, n:'Zacian',     t:'Fée',            lv:178, tp:300, hp:9600,  atk:1385,def:405, spd:565, magic:1275},
  {id:889, n:'Zamazenta',  t:'Combat',         lv:178, tp:300, hp:10200, atk:1325,def:445, spd:528, magic:1215},
  {id:1007,n:'Koraidon',   t:'Combat/Dragon',  lv:178, tp:300, hp:10800, atk:1405,def:425, spd:555, magic:1285},
  {id:1008,n:'Miraidon',   t:'Électrik/Dragon',lv:178, tp:300, hp:10200, atk:1365,def:415, spd:560, magic:1255},
];

// 5 défis aléatoires, régénérés à chaque ouverture du Trial
let _trialChallengePool = [];
function _refreshTrialPool() {
  const shuffled = [...TRIAL_CHALLENGES].sort(()=>Math.random()-.5);
  // 1 par tier pour une difficulté graduée : de l'accessible au mur absolu
  const t1 = shuffled.filter(c=>c.tp===50).slice(0,1);
  const t2 = shuffled.filter(c=>c.tp===90).slice(0,1);
  const t3 = shuffled.filter(c=>c.tp===140).slice(0,1);
  const t4 = shuffled.filter(c=>c.tp===200).slice(0,1);
  const t5 = shuffled.filter(c=>c.tp===300).slice(0,1);
  _trialChallengePool = [...t1,...t2,...t3,...t4,...t5];
}

// Trial Shop catalog — prix calibrés sur les nouveaux PT (Tier5 = 300 PT/victoire)
const TRIAL_SHOP = [
  {id:'orb-bird',    name:'Orbe Oiseau',    legendaries:'Artikodin · Électhor · Sulfura',    cost:1600,  img:ITEM_DISPLAY['orb-bird']?.img},
  {id:'orb-beast',   name:'Orbe Bête',      legendaries:'Raikou · Entei · Suicune',          cost:1600,  img:ITEM_DISPLAY['orb-beast']?.img},
  {id:'orb-golem',   name:'Orbe Golem',     legendaries:'Regirock · Regice · Registeel',     cost:1600,  img:ITEM_DISPLAY['orb-golem']?.img},
  {id:'orb-dragon',  name:'Orbe Dragon',    legendaries:'Latias · Latios · Rayquaza',        cost:2800,  img:ITEM_DISPLAY['orb-dragon']?.img},
  {id:'orb-space',   name:'Orbe Espace',    legendaries:'Dialga · Palkia · Giratina',        cost:3800,  img:ITEM_DISPLAY['orb-space']?.img},
  {id:'orb-ancient', name:'Orbe Ancestral', legendaries:'Solgaleo · Lunala · Necrozma',      cost:6000,  img:ITEM_DISPLAY['orb-ancient']?.img},
  {id:'orb-mega',    name:'Orbe Méga',      legendaries:'Mewtwo · Kyogre · Groudon',         cost:9000,  img:ITEM_DISPLAY['orb-mega']?.img},
  {id:'orb-ultra',   name:'Orbe Ultime',    legendaries:'Zacian · Zamazenta · Koraidon...',   cost:15000, img:ITEM_DISPLAY['orb-ultra']?.img},
  {id:'shiny-gem',   name:'Gemme Éclat',    legendaries:'Rend un Pokémon Shiny (+15% stats)', cost:2500, img:ITEM_DISPLAY['shiny-gem']?.img},
];

function buyTrialItem(itemId) {
  if (!player) return;
  const item = TRIAL_SHOP.find(i=>i.id===itemId);
  if (!item) return;
  if ((player.trialPoints||0) < item.cost) { notify(`Pas assez de PT ! (${item.cost} requis)`); return; }
  player.trialPoints -= item.cost;
  player.bag[itemId] = (player.bag[itemId]||0)+1;
  notify(`✅ ${item.name} obtenu ! (−${item.cost} PT) · Reste : ${player.trialPoints} PT`);
  saveGame();
  renderTrialScreen();
}

function startTrialChallenge(idx) {
  if (!player) return;
  const c = _trialChallengePool[idx];
  if (!c) return;
  if (!player.roster || player.roster.filter(p=>p.hp>0).length===0) {
    notify('Tous vos Pokémon sont K.O. !'); return;
  }
  // Stats FIXES — contenu end-game, pas de scaling joueur
  const trialEnemy = {
    name: c.n, id: c.id,
    type: c.t.includes('/') ? c.t.split('/')[0] : c.t,
    dualType: c.t,
    hp: c.hp, maxHp: c.hp,
    atk: c.atk, def: c.def,
    spd: c.spd,
    magic: c.magic,
    level: c.lv, xp: 0, gold: 0,
    isLegendary: true, isTrainerBattle: true,
  };
  player._trialBattle = true;
  player._trialBattleTp = c.tp;
  showScreen('battle');
  startBattle(trialEnemy);
}

function renderTrialScreen() {
  const el = document.getElementById('trial-content');
  if (!el || !player) return;
  if (_trialChallengePool.length === 0) _refreshTrialPool();

  const pts = player.trialPoints || 0;
  const wins = player.trialWins || 0;

  // Challenges section
  const challengeCards = _trialChallengePool.map((c, i) => {
    const sid = c.id;
    const tier = c.tp<=50 ? 1 : c.tp<=90 ? 2 : c.tp<=140 ? 3 : c.tp<=200 ? 4 : 5;
    const tierColor  = ['','#7bc8f6','#a8e6cf','#ffd166','#ff9a3c','#e63946'][tier];
    const tierLabel  = ['','ACCESSIBLE','INTERMÉDIAIRE','DIFFICILE','TRÈS DIFFICILE','END-GAME ⚠'][tier];
    const tierBg     = ['','rgba(123,200,246,.08)','rgba(168,230,207,.08)','rgba(255,209,102,.08)','rgba(255,154,60,.10)','rgba(230,57,70,.12)'][tier];
    const tierBorder = ['','rgba(123,200,246,.3)','rgba(168,230,207,.3)','rgba(255,209,102,.35)','rgba(255,154,60,.4)','rgba(230,57,70,.55)'][tier];
    return `<div style="background:${tierBg};border:2px solid ${tierBorder};border-radius:12px;padding:.7rem;display:flex;align-items:center;gap:.7rem">
      <img src="${SPRITE_FRONT(sid)}" style="width:52px;height:52px;image-rendering:pixelated;filter:drop-shadow(0 0 8px ${tierColor}60)"/>
      <div style="flex:1">
        <div style="font-family:'Press Start 2P',monospace;font-size:.42rem;color:#ffd700">${c.n}</div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.28rem;color:rgba(255,255,255,.45);margin-top:.12rem">${c.t} · Niv.<b>${c.lv}</b></div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.28rem;color:${tierColor};margin-top:.08rem">${tierLabel}</div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.32rem;color:#a855f7;margin-top:.1rem">+${c.tp} PT</div>
      </div>
      <button onclick="startTrialChallenge(${i})" style="font-family:'Press Start 2P',monospace;font-size:.32rem;padding:.4rem .6rem;background:linear-gradient(180deg,${tierColor},${tierBorder.replace('rgba','rgb').replace(/,[\d.]+\)/,')')});color:#000;border:none;border-radius:8px;cursor:pointer;white-space:nowrap;font-weight:bold">⚡ DÉFIER</button>
    </div>`;
  }).join('');

  // Shop section
  const shopCards = TRIAL_SHOP.map(item => {
    const owned = player.bag[item.id]||0;
    const canBuy = pts >= item.cost;
    return `<div style="background:rgba(255,215,0,.05);border:2px solid rgba(255,215,0,${canBuy?'.35':'.1'});border-radius:12px;padding:.7rem;display:flex;align-items:center;gap:.6rem">
      <img src="${item.img||''}" style="width:36px;height:36px;image-rendering:pixelated;opacity:${canBuy?1:.4}"/>
      <div style="flex:1">
        <div style="font-family:'Press Start 2P',monospace;font-size:.38rem;color:${canBuy?'#ffd700':'rgba(255,255,255,.35)'}">${item.name}${owned>0?` <span style="color:#a855f7">×${owned}</span>`:''}</div>
        <div style="font-size:.55rem;color:rgba(255,255,255,.4);margin-top:.15rem">${item.legendaries}</div>
      </div>
      <div style="text-align:center;min-width:60px">
        <div style="font-family:'Press Start 2P',monospace;font-size:.38rem;color:#ffd700">${item.cost} PT</div>
        <button onclick="buyTrialItem('${item.id}')" ${canBuy?'':'disabled'} style="font-family:'Press Start 2P',monospace;font-size:.28rem;padding:.3rem .5rem;margin-top:.25rem;background:${canBuy?'linear-gradient(180deg,#ffd700,#b8860b)':'rgba(255,255,255,.08)'};color:${canBuy?'#000':'rgba(255,255,255,.3)'};border:none;border-radius:6px;cursor:${canBuy?'pointer':'default'}">ACHETER</button>
      </div>
    </div>`;
  }).join('');

  // Orbs in bag
  const orbKeys = ['orb-bird','orb-beast','orb-golem','orb-dragon','orb-space','orb-mega','orb-ancient','orb-ultra'];
  const ownedOrbsHtml = orbKeys.filter(k=>(player.bag[k]||0)>0)
    .map(k=>`<span style="background:rgba(168,85,247,.2);border:1px solid rgba(168,85,247,.4);border-radius:6px;padding:.15rem .35rem;font-size:.55rem">${ITEM_DISPLAY[k]?.name||k} ×${player.bag[k]} <button onclick="useOrb('${k}')" style="background:none;border:none;color:#a855f7;cursor:pointer;font-size:.55rem">⚡</button></span>`).join('');

  el.innerHTML = `
    <div style="text-align:center;margin-bottom:.8rem">
      <div style="font-family:'Press Start 2P',monospace;font-size:.7rem;color:#a855f7;text-shadow:2px 2px 0 #000">⚡ MODE TRIAL</div>
      <div style="display:flex;justify-content:center;gap:1.5rem;margin-top:.5rem">
        <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:#ffd700">🏆 ${pts} PT</div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:rgba(255,255,255,.5)">⚡ ${wins} victoire${wins!==1?'s':''}</div>
      </div>
    </div>

    <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:#a855f7;margin-bottom:.4rem">⚔ DÉFIS DISPONIBLES</div>
    <div style="font-family:'Press Start 2P',monospace;font-size:.28rem;color:rgba(255,154,60,.8);margin-bottom:.2rem">⚠ Contenu END-GAME — Niv.100+ recommandé pour Tier 3+</div>
    <div style="font-family:'Press Start 2P',monospace;font-size:.28rem;color:rgba(255,255,255,.3);margin-bottom:.5rem">Victoire = PT · Défaite = 0 PT · Stats fixes · Pas de capture</div>
    <div style="display:flex;flex-direction:column;gap:.4rem;margin-bottom:1rem">${challengeCards}</div>
    <button onclick="_refreshTrialPool();renderTrialScreen()" style="width:100%;margin-bottom:1rem;padding:.45rem;background:rgba(168,85,247,.15);border:1px solid rgba(168,85,247,.3);border-radius:8px;color:#a855f7;cursor:pointer;font-family:'Press Start 2P',monospace;font-size:.35rem">🔄 Nouveaux défis</button>

    ${ownedOrbsHtml ? `<div style="font-family:'Press Start 2P',monospace;font-size:.35rem;color:rgba(255,255,255,.5);margin-bottom:.3rem">📦 Orbes en inventaire (cliquez ⚡ pour invoquer — capture possible) :</div><div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem">${ownedOrbsHtml}</div>` : ''}

    <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:#ffd700;margin-bottom:.4rem">🛒 SHOP TRIAL EXCLUSIF</div>
    <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.35);margin-bottom:.5rem">Dépensez vos PT pour obtenir des Orbes (invocation + capture) ou la Gemme Éclat</div>
    <div style="display:flex;flex-direction:column;gap:.4rem;margin-bottom:1rem">${shopCards}</div>

    <button class="btn red" onclick="showScreen('game')" style="width:100%">↩ RETOUR</button>`;
}

// Patch renderTrialScreen into screen activation
document.addEventListener('DOMContentLoaded', () => {
  const trialEl = document.getElementById('screen-trial');
  if (trialEl) {
    const obs = new MutationObserver(() => {
      if (trialEl.classList.contains('active')) renderTrialScreen();
    });
    obs.observe(trialEl, { attributes: true, attributeFilter: ['class'] });
  }
});

function showTourMode() {
  if (!player) return;
  if ((player.trainerLevel||1) < 10) { notify('Niveau Dresseur 10 requis !'); return; }
  if (!player.tourFloor) player.tourFloor = 0;
  renderTourScreen();
  document.getElementById('screen-tour').classList.add('active');
  currentScreen = 'tour';
}

function closeTourMode() {
  document.getElementById('screen-tour').classList.remove('active');
  tourState = null;
  showScreen('game');
}

function renderTourScreen() {
  const maxFloor = (player.tourFloor || 0); // highest beaten floor (0 = none beaten yet)
  // Default selection: next unbeaten floor
  if (_tourSelectedFloor === null) _tourSelectedFloor = maxFloor + 1;
  // Clamp: can't select beyond next floor
  if (_tourSelectedFloor > maxFloor + 1) _tourSelectedFloor = maxFloor + 1;

  const selectedFloor = _tourSelectedFloor;
  const isRewardFloor = selectedFloor % 10 === 0;
  const diff = (1 + (selectedFloor - 1) * 0.18).toFixed(2);
  const el = document.getElementById('tour-content');
  if (!el) return;

  // Floor selector grid — floors 1..maxFloor already beaten + next floor
  let floorGrid = '';
  if (maxFloor >= 1) {
    const badges = [];
    for (let f = 1; f <= maxFloor + 1; f++) {
      const isNext = f === maxFloor + 1;
      const isSel  = f === selectedFloor;
      const isRew  = f % 10 === 0;
      const bg     = isSel  ? '#ffd60a' : isNext ? 'rgba(255,214,10,.15)' : isRew ? 'rgba(255,214,10,.08)' : 'rgba(255,255,255,.05)';
      const border = isSel  ? '#ffd60a' : isNext ? 'rgba(255,214,10,.5)'  : 'rgba(255,255,255,.15)';
      const color  = isSel  ? '#0a0a1a' : isNext ? '#ffd60a'              : isRew ? '#ffd700' : 'rgba(255,255,255,.7)';
      const label  = isNext ? `▶ ${f}` : isRew ? `★ ${f}` : `${f}`;
      badges.push(`<div onclick="selectTourFloor(${f})" style="cursor:pointer;padding:.3rem .4rem;background:${bg};border:1.5px solid ${border};border-radius:6px;font-family:'Press Start 2P',monospace;font-size:.35rem;color:${color};text-align:center;min-width:28px;transition:all .15s">${label}</div>`);
    }
    floorGrid = `
      <div style="margin-bottom:.9rem">
        <div style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:rgba(255,255,255,.5);margin-bottom:.4rem">Choisir l'étage :</div>
        <div style="display:flex;flex-wrap:wrap;gap:.3rem">${badges.join('')}</div>
      </div>`;
  }

  // Pokemon picker
  const rosterAlive = (player.roster || []).filter(p => p.hp > 0);
  const pokeChoices = rosterAlive.map(p => {
    const spriteId = p.currentSpriteId || p.spriteId;
    const imgSrc = p.isShiny ? SPRITE_SHINY(spriteId) : SPRITE_FRONT(spriteId);
    const heldItem = p.heldItem ? HELD_ITEMS[p.heldItem] : null;
    const hpPct = Math.round((p.hp / p.maxHp) * 100);
    return `
    <div onclick="startTourFloor(${player.roster.indexOf(p)})" style="background:rgba(255,255,255,.05);border:2px solid rgba(255,255,255,.15);border-radius:12px;padding:.8rem 1rem;cursor:pointer;display:flex;align-items:center;gap:.8rem;transition:all .2s" onmouseover="this.style.borderColor='var(--yellow)'" onmouseout="this.style.borderColor='rgba(255,255,255,.15)'">
      <img src="${imgSrc}" style="width:60px;height:60px;image-rendering:pixelated"/>
      <div style="flex:1">
        <div style="font-family:'Press Start 2P',monospace;font-size:.5rem;color:var(--yellow)">${p.currentName||p.name}</div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.35rem;color:rgba(255,255,255,.5);margin-top:.2rem">Niv.${p.level} · PV: ${Math.ceil(p.hp)}/${p.maxHp}</div>
        <div style="width:100%;height:5px;background:rgba(0,0,0,.4);border-radius:999px;overflow:hidden;margin-top:.3rem"><div style="height:100%;width:${hpPct}%;background:${hpPct>50?'#2dc653':hpPct>20?'#ffd60a':'#e63946'};border-radius:999px"></div></div>
        ${heldItem ? `<div style="font-size:.6rem;margin-top:.3rem">${heldItem.icon} ${heldItem.name}</div>` : '<div style="font-size:.55rem;color:rgba(255,255,255,.3);margin-top:.3rem">Aucun objet</div>'}
      </div>
    </div>`;
  }).join('');

  el.innerHTML = `
    <div style="text-align:center;margin-bottom:1rem">
      <div style="font-family:'Press Start 2P',monospace;font-size:.75rem;color:var(--yellow);text-shadow:2px 2px 0 var(--pokered)">🏆 TOUR INFINIE</div>
      <div style="font-family:'Press Start 2P',monospace;font-size:.5rem;color:rgba(255,255,255,.6);margin-top:.4rem">
        Étage sélectionné : <span style="color:var(--yellow)">${selectedFloor}</span>${isRewardFloor ? ' <span style="color:#ffd700">★ RÉCOMPENSE !</span>' : ''}
        ${selectedFloor <= maxFloor ? ' <span style="color:#06d6a0;font-size:.4rem">(déjà battu)</span>' : ''}
      </div>
      <div style="font-size:.75rem;color:rgba(255,255,255,.5);margin-top:.2rem">Difficulté : ×${diff}</div>
    </div>
    ${floorGrid}
    <div style="font-family:'Press Start 2P',monospace;font-size:.45rem;color:var(--blue);margin-bottom:.6rem">Choisissez votre Pokémon :</div>
    <div style="display:flex;flex-direction:column;gap:.5rem;margin-bottom:1rem">${pokeChoices || '<div style="color:rgba(255,100,100,.8);font-size:.6rem">Tous vos Pokémon sont K.O. !</div>'}</div>
    <button class="btn red" onclick="closeTourMode()" style="width:100%">↩ QUITTER LA TOUR</button>
  `;
}

function selectTourFloor(f) {
  _tourSelectedFloor = f;
  renderTourScreen();
}

function startTourFloor(rosterIdx) {
  if (!player.roster[rosterIdx] || player.roster[rosterIdx].hp <= 0) return;
  const maxFloor = player.tourFloor || 0;
  const targetFloor = (_tourSelectedFloor !== null) ? _tourSelectedFloor : (maxFloor + 1);
  _tourSelectedFloor = null; // reset pour la prochaine ouverture
  const tourEnemy = TOUR_FLOOR_ENEMIES(targetFloor);
  // Si on rejoue un étage déjà battu, on ne met pas à jour tourFloor en cas de victoire
  tourState = { floor: targetFloor, rosterIdx, isReplay: targetFloor <= maxFloor };

  // Temporarily set active pokemon to chosen one
  syncActiveFromPlayer();
  player.activeRosterIdx = rosterIdx;
  syncPlayerFromActive();

  // Mark battle as tour battle
  player._tourBattle = true;
  document.getElementById('screen-tour').classList.remove('active');
  startBattle(tourEnemy);
}

// Hook into battle victory to handle tour floors
const _origBattleVictory = null; // handled inline via player._tourBattle flag

// ══════════════════════════════════════════
// HELD ITEM: Restes — regen in battle
// ══════════════════════════════════════════
// Applied in setBattleTurn (player turn start)
// ══════════════════════════════════════════
// ZONE PICKER — click outside to close
// ══════════════════════════════════════════
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('zone-picker-overlay');
  if (!overlay || overlay.style.display === 'none') return;
  if (e.target === overlay) closeZonePicker();
}, { passive: true });

// ══════════════════════════════════════════
// SHINY ENCOUNTER EFFECT
// ══════════════════════════════════════════
function triggerShinyEncounterEffect() {
  // Flash lumineux plein écran
  const overlay = document.getElementById('shiny-flash-overlay');
  if (overlay) {
    overlay.style.display = 'block';
    // Relancer l'animation à chaque rencontre
    overlay.style.animation = 'none';
    void overlay.offsetWidth; // reflow pour reset l'animation
    overlay.style.animation = 'shinyFlash 1.5s ease-out forwards';
    setTimeout(() => { overlay.style.display = 'none'; }, 1600);
  }
  // Animation scintillante sur le sprite ennemi
  const sprite = document.getElementById('enemy-battle-img');
  if (sprite) {
    sprite.classList.remove('shiny-anim');
    void sprite.offsetWidth;
    sprite.classList.add('shiny-anim');
    setTimeout(() => sprite.classList.remove('shiny-anim'), 1300);
  }
  // Message et notification
  notify('✨ OH ! Un Pokémon SHINY apparaît !!!');
  setMessage('✨✨ SHINY ! Un Pokémon aux couleurs uniques vous défie — capturez-le ! ✨✨');
}

// ══════════════════════════════════════════
// RACCOURCIS CLAVIER (QoL)
// ══════════════════════════════════════════
document.addEventListener('keydown', function(e) {
  // Ne pas interférer si l'utilisateur tape dans un champ texte
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  const key = e.key;

  // ── Écran de jeu ──
  if (currentScreen === 'game') {
    if (key === ' ' || key === 'Enter') { e.preventDefault(); doExplore(); }
    else if (key === 'r' || key === 'R') { doRest(); }
    else if (key === 'i' || key === 'I') { showScreen('inventory'); }
    else if (key === 'm' || key === 'M') { showMap(); }
    else if (key === 't' || key === 'T') { showTeam(); }
  }
  // ── Écran de combat ──
  else if (currentScreen === 'battle') {
    if ((key === 'a' || key === 'A') && !battleBusy) {
      const btnAtk = document.getElementById('btn-attack');
      if (btnAtk && !btnAtk.disabled) btnAtk.click();
    } else if ((key === 's' || key === 'S') && !battleBusy) {
      const btnMag = document.getElementById('btn-magic');
      if (btnMag && !btnMag.disabled) btnMag.click();
    } else if (key === 'f' || key === 'F') {
      const btnFlee = document.getElementById('btn-flee');
      if (btnFlee && !btnFlee.disabled) btnFlee.click();
    }
  }
  // ── Retour (Échap) ──
  if (key === 'Escape') {
    const overlay = document.getElementById('zone-picker-overlay');
    if (overlay && overlay.style.display !== 'none') { closeZonePicker(); return; }
    const sideMenu = document.getElementById('side-menu-overlay');
    if (sideMenu && sideMenu.style.display !== 'none') { toggleDropdown(); return; }
    const catchMenu = document.getElementById('catch-menu');
    if (catchMenu && catchMenu.style.display !== 'none') { closeCatchMenu(); return; }
    if (currentScreen !== 'game' && currentScreen !== 'title' && currentScreen !== 'menu' && currentScreen !== 'battle') {
      showScreen('game');
    }
  }
});
