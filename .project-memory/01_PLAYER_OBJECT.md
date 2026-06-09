# Objet `player` — Structure complète

Créé dans `startGame()` (game.js:1170).
Variable globale `let player = null` (game.js:1095).

## Champs principaux
```js
player = {
  // Identité
  name,            // nom du dresseur
  cls,             // nom du Pokémon de départ (ex: 'Salamèche')
  spriteId,        // id PokeAPI du sprite initial
  currentSpriteId, // id actif (peut changer après évolution)
  currentName,     // nom actif

  // Stats combat (Pokémon actif = roster[activeRosterIdx])
  type, dualType,
  move, mMove, animType,
  moveElem, mMoveElem,
  moveUses, mMoveUses, moveUsesMax, mMoveUsesMax,
  level, hp, maxHp, mp, maxMp,
  xp, xpNext,
  atk, def, spd, magic,

  // Économie
  gold: 500,       // or initial

  // Inventaire
  bag: { potion:2 },        // objets consommables
  balls: { pokeball:3 },    // Poké Balls
  ctBag: {},                // CTs (Capacités Techniques)
  heldItemBag: {},          // objets à tenir

  // Progression
  badges: [],
  currentZone: 'bourg-palette',
  visitedZones: ['bourg-palette'],
  zoneKills: {},            // kills par zone

  // Pokémon
  roster: [starterPoke],    // équipe active (max 6)
  box: [],                  // PC Box (réserve)
  activeRosterIdx: 0,       // index du Pokémon actif dans roster

  // Niveau dresseur
  trainerLevel: 1,
  trainerXP: 0,
  trainerXPNext: TRAINER_XP_PER_LEVEL(1),

  // Systèmes divers
  tourFloor: 0,
  totalKills: 0,
  lastBossWave: 0,
  talentTokens: 0,
  lastWorldBoss: 0,
  shinyEggs: 0, shinyCount: 0, megaCount: 0, worldBossKills: 0,
  achievements: [],
  stats: {},                // statistiques globales
  dailyQuests: [],
  dailyQuestDate: "",
  trialPoints: 0, trialWins: 0,
  prestigeLevel: 0,         // (ajouté au prestige)
  prestigeUpgrades: [],     // ids des upgrades achetées
}
```

## Structure d'un Pokémon dans roster/box
```js
{
  name, cls, spriteId, currentSpriteId, currentName,
  type, dualType,
  move, mMove, animType, moveElem, mMoveElem,
  moveUses, mMoveUses, moveUsesMax, mMoveUsesMax,
  level, hp, maxHp, mp, maxMp,
  xp, xpNext,
  atk, def, spd, magic, spAtk, spDef,
  isMain,         // true pour le starter
  isShiny,        // true si shiny
  nature,         // assignée à la capture (mechanics.js)
  ability,        // capacité passive (mechanics.js)
  talent,         // talent équipé (max 1 par Pokémon)
  affinity,       // affinité (système d'amitié)
  heldItem,       // id de l'objet tenu
  customMoves: [],  // moves équipés via CT ou lvl-up
  sizeVariant,    // 'tiny'|'small'|'normal'|'large'|'giant'
}
```

## Fonctions de synchronisation roster↔player
- `getActivePoke()` — game.js:1222 → retourne `player.roster[player.activeRosterIdx]`
- `syncPlayerFromActive()` — game.js:1230 → copie stats du Pokémon actif → player
- `syncActiveFromPlayer()` — game.js:1263 → copie stats player → Pokémon actif
- `switchToRosterPoke(idx)` — game.js:1288 → change le Pokémon actif
