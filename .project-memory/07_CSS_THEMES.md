# CSS — Style et thème

## style.css (975 lignes)
Classes principales :
- `.screen` — écrans de jeu (display:none par défaut, `.active` les affiche)
- `#hud` — HUD permanent, `.visible` l'affiche
- `.btn` — boutons standards
- `.btn.red`, `.btn.green`, `.btn.purple`, `.btn.yellow` — variantes colorées
- `.bar-wrap` / `.bar-fill.hp` / `.bar-fill.xp` — barres de vie et XP
- `.combatant` — zone combattant dans l'écran bataille
- `.hp-battle` / `.hp-battle-fill` — barre HP en combat
- `.shop-panel`, `.menu-panel` — panneaux de boutique/menu
- `.class-btn` — bouton de sélection de starter
- `.class-grid` — grille de starters
- `.smtile` — tuiles du menu latéral (CSS vars: --tc, --bc, --brd)
- `.gen-filter-btn` — filtres de génération
- `.inv-container`, `.item-grid-display` — inventaire
- `.poke-display-lg`, `.poke-display-enemy` — sprites de Pokémon en combat
- `@keyframes` : pokeBounce, bossPulse, shinyFlash, drift

## theme.css (~1520 lignes)
Variables CSS globales :
- `--yellow: #ffd60a`
- `--red: #e63946` (var(--pokered))
- `--blue: #4cc9f0`
- `--green: #06d6a0` ou `#2dc653`
- `--purple: #c77dff` / `#7b2ff7`
- `--bg-dark: #070710` (fond principal)

## Body classes
- `.menu` — écran titre/menu (fond thématique)
- `.battle` — écran combat

## Polices
- `'Press Start 2P'` — pixel font pour titres et textes clés
- `'Nunito'` (400/700/800/900) — texte courant
- Chargées depuis Google Fonts dans index.html

## Visual Upgrade V5 (2026-06-09) — HUD & Barres redesign (en fin de theme.css, écrase V4 HUD)
- **`.hud-card`** : navy `rgba(10,14,32) → rgba(5,8,20)` + bordure cyan `.3`, ombre colorée — remplace le violet V4
- **`.bar-wrap`** : track 14px, fond dégradé noir net, border 1px rgba(255,255,255,.08)
- **`.bar-fill.hp`** : vert vif `#00c853 → #69f0ae` (remplace rose) + glow vert
- **`.bar-fill.hp.hp-low`** : rouge `#ff1744 → #ff616f` (animation hp-danger-pulse inchangée)
- **`.bar-fill.xp`** : or/ambre `#ffa000 → #ffd740`
- **`.bar-fill.mp`** : bleu/violet `#1565c0 → #7c4dff`
- **`.hp-battle`** / **`.hp-battle-fill`** : HP combat refait — vert vif cohérent avec HP principal

## Visual Upgrade V4 (2026-06-09) — Style vivid global (lignes ~1128–1471)
- Couvre : .smtile, .class-btn, .inv-tab, .item-card, .pokemon-card, .team-row-card, .box-poke-card, .switch-poke-card, .combatant (bleu/rouge), .skill-node, .pd-learn-card, .shop-item, .hud-card (gradient violet — écrasé par V5), boutons retour, forge/quests/achievements/prestige cards, .gen-filter-btn.active, talent/breeding cards, #battle-log, modaux, .menu-panel, #map-sidebar, #zone-label

## Visual Upgrade V3 (2026-06-09) — ajouts en fin de theme.css
- **Type badges par type** : `.type-Feu/.elem-Feu` → `.type-Fée/.elem-Fée` — 18 types avec gradient + glow individuel
- **Kill bar** : `#kill-bar-track` / `#kill-bar-fill` — gradient or→orange→rouge + shimmer
- **Boss button** : `#btn-boss` → `@keyframes boss-epic` (pulse dramatique)
- **Gold display** : `#gold-display` → `@keyframes gold-pulse`
- **HP low** : `.bar-fill.hp.hp-low` → `@keyframes hp-danger-pulse` (toggle via `setBar()` à <25%)
- **Notifications** : `#notif.notif-success/error/boss/prestige` — 4 variantes colorées (toggle via `notify()`)
- **Trainer badge** : `#trainer-level-badge` gradient violet + glow
- **Message box** : accent bleu côté gauche
- `setBar()` modifié : ajoute/retire `.hp-low` sur `bar-hp` quand pct<25
- `notify()` modifié : détecte emoji/motclé et assigne la classe couleur

## Éléments de fond
- `#bg`, `#bg-img`, `#bg-overlay`, `#bg-light` — couches de fond animé
- `#particles` — conteneur des particules flottantes
- `#notif` — conteneur de notifications
