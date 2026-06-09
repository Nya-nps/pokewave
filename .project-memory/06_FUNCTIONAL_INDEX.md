# Index fonctionnel — "Où est X ?"

## Combat et attaques
- Logique de combat complète → `startBattle()` game.js:1973, `battleAction()` game.js:2396
- Table des types → `TYPE_CHART` game.js:1903, `getEffectiveness()` game.js:1924
- Calcul dégâts → dans `battleAction()` game.js:2396 (inline)
- Coups critiques, statuts, météo → mechanics.js (global)
- Animations de combat → `playAttackAnim()` game.js:2622, `hurtSprite()` game.js:2648
- Auto-combat → `toggleAutoBattle()` game.js:2333, `runAutoAction()` game.js:2365
- Fuite → dans `battleAction('flee')` game.js:2396

## Pokémon — données et stats
- Base de données Gen 1 → `GEN1[]` game.js:699, `GEN1_SPD{}` game.js:682
- Base de données Gen 2-9 → data.js (GEN2 à GEN9)
- Pokémon de départ → `CLASSES{}` game.js:92
- Chaînes d'évolution → `EVO_CHAINS{}` game.js:100
- Types duaux → `DUAL_TYPES{}` game.js:6
- Sprites → `SPRITE_FRONT(id)`, `SPRITE_BACK(id)`, `SPRITE_SHINY(id)` game.js:41-43

## Progression du joueur
- Niveau du Pokémon → `checkLevelUp()` game.js:2817, `xpForLevel()` game.js:2139
- Évolution → `checkEvolution()` game.js:2845, `triggerEvolution()` game.js:2878
- Niveau dresseur → `addTrainerXP()` game.js:6094, `TRAINER_XP_PER_LEVEL()` game.js:6092
- Prestige → `doPrestige()` game.js:5236, `canPrestige()` game.js:5229
- Arbre de compétences → `SKILL_TREE` game.js:5302, `buySkill()` game.js:5338

## Économie
- Or → `player.gold`, `getGoldMultiplier()` game.js:2135
- Boutique → `renderShop()` game.js:3311, `buyItem()` game.js:3348
- Boutique prestige → `PRESTIGE_SHOP` game.js:5379, `buyPrestigeUpgrade()` game.js:5393
- Revenu passif → `startPassiveIncome()` game.js:6014
- Éclats → `SHARD_TYPES` game.js:5278, `addShard()` game.js:5281
- Trial shop → `TRIAL_SHOP` game.js:6408, `buyTrialItem()` game.js:6420

## Inventaire / Équipement
- Inventaire bag → `player.bag`, `player.balls`, `player.ctBag`, `player.heldItemBag`
- Render inventaire → `renderInventory()` game.js:2998
- Objets tenus → `HELD_ITEMS{}` game.js:6134, `assignItemToPokemon()` game.js:6159
- CTs → `CT_LIST[]` game.js:358, `addCTToInventory()` game.js:474, `buyCT()` game.js:3366
- Mouvements → `MOVES_DB{}` game.js:212, `LEVEL_UP_MOVES{}` game.js:384
- Équiper un move → `equipMove()` game.js:589
- Forge/craft → `CRAFT_RECIPES[]` game.js:6030, `doCraft()` game.js:6050

## Équipe et Pokémon capturés
- Roster actif (max 6) → `player.roster`
- Box (réserve) → `player.box`
- Changer de Pokémon → `openSwitchMenu()` game.js:4496, `confirmSwitch()` game.js:4558
- Déplacer vers box → `moveToBox()` game.js:3269
- Déplacer vers équipe → `moveToTeam()` game.js:3286
- Pokémon de tête → `selectLeadFromTeam()` game.js:3296
- Détail Pokémon → `openPokeDetail()` game.js:485, `renderPokeDetail()` game.js:499

## Navigation et zones
- Changer d'écran → `showScreen(id)` game.js:1102
- Zones de jeu → `ZONES{}` game.js:859
- Voyager → `travelToZone()` game.js:4432, `selectZone()` game.js:4381
- Zone picker (modal) → `openZonePicker()` game.js:1499, `selectExploreZone()` game.js:1551
- Carte → `renderMap()` game.js (autour de 4100+)
- Gym leaders → `challengeGymLeader()` game.js:4320, `handleGymVictory()` game.js:4358

## Systèmes sociaux / méta
- Quêtes journalières → `DAILY_QUEST_POOL[]` game.js:5927, `getDailyQuests()` game.js:5940
- Succès → `ACHIEVEMENTS[]` game.js:5856, `checkAchievements()` game.js:5901
- Pokédex → `markDexSeen()` game.js:4942, `renderPokedex()` game.js:5743
- Talents (gacha) → `TALENT_DEFS[]` game.js:4669, `rollTalent()` game.js:4832
- Breeding → `startBreeding()` game.js:5415, `checkBreedingSlots()` game.js:5439
- Affinité → `AFFINITY_LEVELS[]` game.js:5982, `addAffinity()` game.js:5992
- Synergies équipe → `TEAM_SYNERGIES[]` game.js:5527, `applySynergyBonuses()` game.js:5541
- Événements → `SPECIAL_EVENTS[]` game.js:5481, `triggerRandomEvent()` game.js:5492

## Sauvegarde / Chargement
- Sauvegarder → `saveGame()` game.js:3383
- Charger → `loadGame()` game.js:3391
- Gestionnaire exports → `renderSaveManager()` game.js (~3476+)
- Anti-cheat → `_computeSig()` game.js:3482, `_wrapSave()` game.js:3500

## Affichage / UI
- HUD principal → `updateHUD()` game.js:1395 → `_doUpdateHUD()` game.js:1401
- Barre de vie/XP → `setBar()` game.js:1437
- Notifications → `notify()` / `setMessage()` game.js:1444
- Particules background → game.js:5841 (PARTICLE_COUNT)
- Menu latéral → `toggleDropdown()` game.js:1470
- Wiki/Guide → `renderWiki()` game.js:6215

## Mechanics.js spécifique
- Natures → `NATURES{}`, `applyNatureToStats(p)` mechanics.js:24
- Abilities → `ABILITIES_DB{}` mechanics.js:80
- Dual-type fix → `window.getEffectiveness` mechanics.js:12
