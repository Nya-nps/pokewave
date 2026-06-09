# Knowledge Graph — Relations entre systèmes

## Flux principal d'une session de jeu

```
startGame()
  └→ player = { ... }
  └→ showScreen('game')
  └→ updateHUD()
  └→ getDailyQuests()
  └→ startPassiveIncome()
  └→ startPeriodicHUD()
  └→ initDexFromRoster()

doExplore()
  └→ getWaveState()        ← vague actuelle + difficulté
  └→ zone sélectionnée (player.currentZone)
  └→ génère un ennemi depuis ZONES[zone].pokemon
  └→ showPreBattleMenu(enemyData)
       └→ startBattle(enemyData)

startBattle(enemyData)
  └→ showScreen('battle')
  └→ setBattleTurn('player')
  └→ [boutons: attack / magic / item / catch / switch / auto / flee]

battleAction('attack')
  └→ calcul dégâts (atk vs def, getEffectiveness, natures, abilities)
  └→ playAttackAnim(type, false)
  └→ enemy.hp -= dégâts
  └→ si enemy.hp <= 0 → victoire
       └→ addXP, addGold, awardShardOnKill
       └→ recordKill() → updateKillHUD()
       └→ checkLevelUp() → checkEvolution()
       └→ updateDailyProgress('kill')
       └→ checkAchievements()
       └→ si vague complète → btn-boss visible

challengeBoss()
  └→ generateBossEnemy()
  └→ showPreBattleMenu(bossData)
  └→ startBattle(bossData)
  └→ si victoire → gainSkillPoints, handleGymVictory si gym
```

## Relations entre fichiers

```
index.html
  ├── game.js        ← définit toutes les fonctions et constantes globales
  │     ├── GEN1[], GEN1_SPD      ← données Gen 1
  │     ├── ZONES{}, ZONE_LEVELS  ← zones de jeu
  │     ├── MOVES_DB{}, CT_LIST[] ← attaques
  │     ├── SHOP_ITEMS[], HELD_ITEMS{} ← économie
  │     └── [toutes les fonctions gameplay]
  │
  ├── data.js        ← étend game.js (exécuté après)
  │     ├── GEN2…GEN9, GEN2_SPD…GEN9_SPD
  │     └── Ces arrays sont utilisés dans les zones ZONES{} de game.js
  │
  └── mechanics.js   ← patche game.js (exécuté en dernier)
        ├── window.getEffectiveness ← patch dual-types
        ├── window.addCapturedToRoster ← patch natures
        └── [NATURES, ABILITIES_DB, etc.]
```

## Dépendances entre systèmes

| Système | Dépend de | Utilisé par |
|---|---|---|
| `player.roster` | `addCapturedToRoster()` | HUD, Team, Battle, Breeding |
| `battleAction()` | `getActivePoke()`, `getEffectiveness()` | Auto-battle, Tour, Trial |
| `checkLevelUp()` | `xpForLevel()` | Battle victory, addXP |
| `checkEvolution()` | `EVO_CHAINS`, `checkLevelUp()` | Level up callback |
| `updateHUD()` | `player.*`, `getActivePoke()` | Tout changement d'état |
| `ZONES` | `GEN1[]`..`GEN9[]` (via pokemon arrays) | `doExplore()`, Map render |
| `saveGame()` | `player` entier | Bouton SAVE, auto-save |
| `loadGame()` | localStorage + IDB | Bouton CONTINUER |
| `getTalents()` | `player.talentTokens` | `rollTalent()` |
| `doPrestige()` | `player.trainerLevel >= 50` | Écran Prestige |

## Index des constantes importantes

```
ZONE_KILL_NEEDED = 10          game.js:1090
KILLS_PER_WAVE   = 10          game.js:1579
FARM_INTERVAL    = 2200ms      game.js:2269
REST_COOLDOWN    = 30000ms     game.js:1846
BREEDING_TIME    = 30000ms     game.js:5412
WORLD_BOSS_COOLDOWN = 300000ms game.js:5029
SHINY_ODDS       = 1/256       game.js:46
MAX_TALENTS_PER_POKE = 1       game.js:4707
SAVE_VERSION     = '2.1'       game.js:3476
SAVE_KEY = 'pokemonRPG_save_v2' game.js:3477
MAX_LEVEL = 500                (anciennement 100)
```
