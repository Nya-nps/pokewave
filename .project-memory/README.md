# .project-memory — Index de navigation rapide

Système de mémoire persistante pour PokéQuest.
Consulter ces fichiers EN PRIORITÉ avant de lire le code source.

## Navigation rapide (MAP_*)

| Fichier | Contenu | Quand l'utiliser |
|---|---|---|
| [MAP_STRUCTURE.md](MAP_STRUCTURE.md) | Arborescence complète + stats fichiers | Vue d'ensemble du projet |
| [MAP_DEPENDENCIES.md](MAP_DEPENDENCIES.md) | Graphe dépendances Mermaid + texte | Comprendre ordre de chargement / patches |
| [MAP_FUNCTIONS.md](MAP_FUNCTIONS.md) | Index toutes fonctions + ligne par fichier | Localiser n'importe quelle fonction |
| [MAP_QUICKREF.md](MAP_QUICKREF.md) | "Où est X ?" — 60+ réponses directes | Point d'entrée de chaque session |

## Fichiers de mémoire

| Fichier | Contenu | Quand l'utiliser |
|---|---|---|
| [00_OVERVIEW.md](00_OVERVIEW.md) | Architecture générale, fichiers, ordre de chargement | Toujours lire en premier |
| [01_PLAYER_OBJECT.md](01_PLAYER_OBJECT.md) | Structure de `player`, champs, Pokémon struct | Modifications de l'état du joueur, sauvegarde |
| [02_SCREENS.md](02_SCREENS.md) | Tous les écrans, modals, navigation | Ajouter/modifier un écran ou modal |
| [03_GAME_SYSTEMS.md](03_GAME_SYSTEMS.md) | 25 systèmes avec lignes exactes | Toute modification d'un système |
| [04_MECHANICS_JS.md](04_MECHANICS_JS.md) | Contenu de mechanics.js | Natures, abilities, statuts, météo |
| [05_KNOWLEDGE_GRAPH.md](05_KNOWLEDGE_GRAPH.md) | Flux de jeu, dépendances, constantes | Comprendre comment les systèmes s'enchaînent |
| [06_FUNCTIONAL_INDEX.md](06_FUNCTIONAL_INDEX.md) | "Où est X ?" — index par fonctionnalité | Localiser rapidement une feature |
| [07_CSS_THEMES.md](07_CSS_THEMES.md) | Classes CSS, variables, polices | Modifications visuelles |
| [08_BALANCING_HISTORY.md](08_BALANCING_HISTORY.md) | Décisions d'équilibrage, formules | Modifications de balance/gameplay |

## User Intelligence (apprentissage utilisateur)

Dossier `user-intelligence/` — profil, préférences, règles apprises :

| Fichier | Contenu |
|---|---|
| `user-profile.md` | Profil complet : niveau, style, objectifs, interdits |
| `preferences.json` | Préférences avec scores de confiance |
| `coding-preferences.json` | Stack, patterns de code, perf concerns |
| `communication-style.json` | Format des prompts, niveau de réponse attendu |
| `learned-rules.json` | 12 règles apprises avec confidence score |
| `recurring-patterns.json` | Types de tâches et patterns de prompts détectés |
| `decision-history.json` | Décisions prises et réactions de l'utilisateur |
| `corrections-history.json` | Corrections reçues → règles extraites |
| `glossary.json` | Vocabulaire spécifique au projet |
| `prompt-patterns.json` | Patterns de formulation + anti-patterns |

**Mise à jour** : après chaque session, incrémenter `sessions`, ajouter les nouvelles règles/corrections.

## Règles d'utilisation

1. **Avant toute tâche** : lire README.md + le fichier le plus pertinent
2. **Pour localiser une feature** : utiliser 06_FUNCTIONAL_INDEX.md
3. **Pour modifier un système** : lire 03_GAME_SYSTEMS.md pour trouver la ligne exacte
4. **Pour le flux de jeu** : lire 05_KNOWLEDGE_GRAPH.md
5. **Ouvrir game.js** : uniquement pour lire le bloc précis identifié (offset + limit)
6. **Après modification** : mettre à jour le fichier de mémoire concerné

## Localisation rapide des blocs game.js

```
Lignes 1-90    : Constantes de base (sprites, types, shiny, variants)
Lignes 92-210  : CLASSES, EVO_CHAINS, ENEMIES, EVENTS, SHOP_ITEMS, POKE_CATCH_RATES
Lignes 212-466 : MOVES_DB, CT_LIST, LEVEL_UP_MOVES
Lignes 467-630 : Moves/CT helpers, openPokeDetail, equipMove
Lignes 631-852 : ZONE_LEVELS, GEN1, GEN1_SPD
Lignes 853-1091: ZONES (toutes les zones de jeu)
Lignes 1095-1140: Variables globales, showScreen()
Lignes 1142-1390: startGame(), getActivePoke(), syncPlayer, addCapturedToRoster
Lignes 1390-1575: updateHUD(), setBar(), setMessage(), showZone(), toggleDropdown()
Lignes 1576-1790: Wave system, Boss system
Lignes 1792-1900: doExplore(), doRest()
Lignes 1900-1970: TYPE_CHART, getEffectiveness
Lignes 1970-2270: startBattle() complet (600+ lignes!)
Lignes 2262-2400: Auto-battle, toggleFarmAuto
Lignes 2396-2620: battleAction() complet
Lignes 2620-2775: Animations, catch menu, throwBall
Lignes 2775-2910: checkLevelUp, checkEvolution, triggerEvolution
Lignes 2910-3030: useBagSpecial, orbs, Trial orbes
Lignes 3030-3310: renderInventory, renderTeam, renderBox, openTeamDetail
Lignes 3310-3380: renderShop, buyItem, buyCT
Lignes 3380-3475: saveGame, loadGame
Lignes 3475-3600+: Save system avancé (IDB, anti-cheat, renderSaveManager)
Lignes 4200-4500: renderMap, hoverZone, challengeGymLeader, selectZone, travelToZone
Lignes 4490-4600: openSwitchMenu, closeSwitchMenu, confirmSwitch
Lignes 4620-4930: Talents system
Lignes 4930-5025: Pokédex, dexMilestones, MegaEvos
Lignes 5025-5110: World boss, Quests/Achievements/Forge shortcuts
Lignes 5110-5300: Time of Day, Prestige, Shards
Lignes 5300-5415: Skill Tree, Trainer Ranks, Prestige Shop
Lignes 5412-5560: Breeding, Special Events, Team Synergies
Lignes 5560-5730: renderSkillTree, renderPrestige, renderBreeding, startPeriodicHUD
Lignes 5730-5855: showPokedex, renderPokedex, showDexDetail, initDexFromRoster, particles
Lignes 5855-5980: ACHIEVEMENTS, checkAchievements, DAILY_QUEST_POOL
Lignes 5980-6095: Affinity, passive income, CRAFT_RECIPES, doCraft, globalStats
Lignes 6092-6215: TrainerXP, HELD_ITEMS, assignItemToPokemon, levelUpPokemon
Lignes 6215-6350: renderWiki
Lignes 6320-6545: Tour mode (TOUR_FLOOR_ENEMIES, TOUR_RARE_ITEMS)
Lignes 6345-6545: Trial mode (TRIAL_CHALLENGES, TRIAL_SHOP, startTrialChallenge, renderTrialScreen)
Lignes 6542-6660: showTourMode, renderTourScreen, startTourFloor
Lignes 6660-6735: triggerShinyEncounterEffect, fin du fichier
```
