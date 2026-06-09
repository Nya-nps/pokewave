# Écrans — Système de navigation

## Fonction centrale
`showScreen(id)` — game.js:1102

## Mapping id → div#screen-{id}
| id | Div | Render appelé | Description |
|---|---|---|---|
| `title` | `#screen-title` | — | Écran titre / accueil |
| `menu` | `#screen-menu` | — | Création de personnage / choix starter |
| `game` | HUD uniquement | `updateHUD()` | Écran principal (pas de div, juste le HUD) |
| `battle` | `#screen-battle` | — | Combat |
| `inventory` | `#screen-inventory` | `renderInventory()` | Sac du dresseur |
| `shop` | `#screen-shop` | `renderShop()` | Boutique |
| `team` | `#screen-team` | `renderTeam()` | Équipe + Box Pokémon |
| `map` | `#screen-map` | `renderMap()` | Carte du monde |
| `tour` | `#screen-tour` | — | Mode Tour (arène étages) |
| `trial` | `#screen-trial` | `renderTrialScreen()` | Mode Trial (end-game) |
| `pokedex` | `#screen-pokedex` | — | Pokédex national |
| `quests` | `#screen-quests` | `renderQuests()` | Quêtes journalières |
| `talents` | `#screen-talents` | `renderTalentScreen()` | Système de talents |
| `skills` | `#screen-skills` | `renderSkillTree()` | Arbre de compétences |
| `prestige` | `#screen-prestige` | `renderPrestigeScreen()` | Prestige |
| `breeding` | `#screen-breeding` | `renderBreedingScreen()` | Élevage / œufs |
| `achievements` | `#screen-achievements` | `renderAchievements()` | Succès |
| `forge` | `#screen-forge` | `renderForge()` | Forge / crafting |
| `saves` | `#screen-saves` | `renderSaveManager()` | Gestionnaire de sauvegardes |
| `wiki` | `#screen-wiki` | `renderWiki()` | Guide du joueur |

## Menu latéral (side panel)
Accessible via `toggleDropdown()` — game.js:1470
Overlay : `#side-menu-overlay` avec panel `#side-menu-panel`
Contient des boutons appelant directement les fonctions show*/showScreen()

## Modals flottants (z-index élevé)
| Modal | ID | Fonction d'ouverture |
|---|---|---|
| Catch balls | `#catch-menu` | `openCatchMenu()` |
| Choix Pokémon avant combat | `#pre-battle-menu` | `showPreBattleMenu()` |
| Détail Pokémon | `#poke-detail-menu` | `openPokeDetail(idx)` |
| Switch Pokémon | `#switch-pokemon-menu` | `openSwitchMenu()` |
| Zone picker | `#zone-picker-overlay` | `openZonePicker()` |
| Boss replay | `#boss-replay-overlay` | `openBossReplayMenu()` |
| Récompense Tour | `#tour-reward-modal` | `showTourReward(floor)` |
| Shiny flash | `#shiny-flash-overlay` | `triggerShinyEncounterEffect()` |
| Évolution | `#evo-screen` | `triggerEvolution(chain)` |
