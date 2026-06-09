# MAP_DEPENDENCIES — Graphe de dépendances PokéQuest
Dernière mise à jour : 2026-06-09

## Graphe Mermaid

```mermaid
graph TD
    index.html -->|link| style.css
    index.html -->|link| theme.css
    index.html -->|script 1| game.js
    index.html -->|script 2| data.js
    index.html -->|script 3| mechanics.js

    data.js -->|injecte GEN2-9 dans window| game.js
    mechanics.js -->|monkey-patch window.*| game.js

    subgraph mechanics.js patches
        MP1[window.battleAction]
        MP2[window.startBattle]
        MP3[window.setBattleTurn]
        MP4[window.syncPlayerFromActive]
        MP5[window.doExplore]
        MP6[window.startGame]
        MP7[window.checkAchievements]
        MP8[window.getEffectiveness]
        MP9[window.startStoryEncounter]
        MP10[window.useStoneOnPokemon]
        MP11[window.TOUR_FLOOR_ENEMIES]
    end

    game.js --> MP1
    game.js --> MP2
    game.js --> MP3
    game.js --> MP4
    game.js --> MP5
    game.js --> MP6
    game.js --> MP7
    game.js --> MP8
```

## Graphe texte

```
index.html
  ├── <link> style.css        → layout HUD, barres, boutons, animations
  ├── <link> theme.css        → variables couleur, dark mode
  ├── <script #1> game.js     → moteur complet, globals exposés dans window
  ├── <script #2> data.js     → injecte GEN2..GEN9, ALL_POKEMON dans window
  └── <script #3> mechanics.js → monkey-patch des fonctions de game.js

game.js (source de vérité)
  ├── expose dans window : player, showScreen, startBattle, battleAction,
  │     doExplore, saveGame, loadGame, updateHUD, setBattleTurn,
  │     syncPlayerFromActive, startGame, checkAchievements
  └── consomme : GEN1 (interne), GEN2-9 (data.js via window)

data.js
  ├── dépend de : rien (standalone)
  ├── expose : GEN2, GEN3, GEN4, GEN5, GEN6, GEN7, GEN8, GEN9
  │             ALL_POKEMON, ALL_POKEMON_MAP, ALL_SPD, LEGENDARIES_IDS
  │             STARTER_META, buildStarterGrid(), DEX_TOTAL_ALL
  └── consomme : window (injection globale)

mechanics.js
  ├── dépend de : game.js (doit être chargé avant)
  ├── patch : window.battleAction → ajoute natures/abilities/weather/status
  ├── patch : window.startBattle  → ajoute story events, rival battles
  ├── patch : window.setBattleTurn → ajoute status DoT, weather tick
  ├── patch : window.syncPlayerFromActive → ajoute natures stats
  ├── patch : window.doExplore    → ajoute time-of-day filtering
  ├── patch : window.startGame    → ajoute stone shop items
  ├── patch : window.checkAchievements → override achievements check
  ├── patch : window.getEffectiveness → override type chart
  └── ajoute : NATURES, ABILITIES_DB, STATUS_ICONS, WEATHER_INFO,
                STONE_EVOS, RIVAL_TEAMS, ROCKET/MAGMA/AQUA_GRUNTS,
                isNightTime(), checkStoryEvents(), triggerStoryBattle()
```

## Ordre de chargement CRITIQUE

```
1. style.css + theme.css   (CSS, pas d'ordre entre eux)
2. game.js                 (définit toutes les fonctions et player{})
3. data.js                 (ajoute GEN2-9 + fusionne ALL_POKEMON)
4. mechanics.js            (patch les fonctions de game.js)
```

**Ne jamais inverser cet ordre.** mechanics.js dépend de `window.battleAction` 
qui n'existe qu'après game.js. data.js dépend de GEN1_SPD défini dans game.js.

## Variables globales clés exposées par game.js

| Variable / Fonction | Rôle |
|---------------------|------|
| `player` | Objet état complet du joueur (HP, roster, gold, inventory, flags) |
| `showScreen(id)` | Router central — affiche l'un des 18 écrans |
| `startBattle(enemyData)` | Lance un combat PvE |
| `battleAction(action)` | Exécute une action de combat (attack/magic/item/flee) |
| `doExplore()` | Explore la zone courante — génère un ennemi aléatoire |
| `saveGame()` / `loadGame()` | Persistance localStorage + IndexedDB |
| `updateHUD()` | Refresh HUD (debounced) |
| `setBattleTurn(turn)` | Passe au tour suivant (player ou enemy) |
| `syncPlayerFromActive()` | Sync player{} depuis le Pokémon actif |
| `recordKill()` | Enregistre un kill + déclenche wave/boss si atteint |
