# MAP_QUICKREF — Réponses rapides "Où est X ?"
Dernière mise à jour : 2026-06-10 (audit + 3 nouvelles features : synergies actives, season pass, prestige sanctuary)

## Fichiers modules créés
| Fichier | Contenu | Lignes |
|---------|---------|--------|
| `js/constants.js` | DUAL_TYPES, sprites, shiny, SIZE_VARIANTS, CLASSES, EVO_CHAINS, ENEMIES, EVENTS, SHOP_ITEMS, POKE_CATCH_RATES, ITEM_DISPLAY, MOVES_DB, CT_LIST, LEVEL_UP_MOVES, ZONE_LEVELS, GEN1_SPD, GEN1, ZONES, ZONE_KILL_NEEDED + helpers (getPokeType, rollShiny, typeToAnim, etc.) | 835 |
| `js/state.js` | player, enemy, currentScreen, detailPokeIdx/detailSlot + showScreen() + startGame() + roster helpers (getActivePoke, sync, switch, addCaptured) | 321 |

## Ordre de chargement (index.html)
`js/constants.js` → `js/state.js` → `game.js` → `data.js` → `mechanics.js`

## Questions fréquentes

| Question | Réponse |
|----------|---------|
| Où est la logique de combat ? | `game.js:1973` (startBattle) + `game.js:2396` (battleAction) — patchés par mechanics.js |
| Où sont les données Pokémon ? | `js/constants.js` (GEN1, GEN1_SPD) + `data.js:10-877` (Gen2-9) — fusionnés dans `ALL_POKEMON` |
| Où est la sauvegarde ? | `game.js:3383` (saveGame) / `game.js:3391` (loadGame) + anti-cheat `game.js:3482` |
| Où est la config des zones ? | `js/constants.js` (ZONES{} + ZONE_LEVELS) |
| Où est le système de waves/boss ? | `game.js:1579-1791` — KILLS_PER_WAVE, getWaveState, generateBossEnemy |
| Où est le router d'écrans ? | `js/state.js` — showScreen(id) |
| Où est la formule XP ? | `game.js:2139` — xpForLevel(n) |
| Où est la formule dégâts ? | `mechanics.js:330` — calcFullDamage() |
| Où est le tableau de types ? | `game.js:1903` (TYPE_CHART) — override par mechanics.js |
| Où est le système de natures ? | `mechanics.js:24` (NATURES) + `mechanics.js:55` (applyNatureToStats) |
| Où est le système de météo ? | `mechanics.js:266` (WEATHER_INFO) + `mechanics.js:273` (setWeather) |
| Où est le système de statuts ? | `mechanics.js:148-230` (icons, colors, apply, DoT, display) |
| Où est le système de prestige ? | `game.js:5216-5278` (rewards, canPrestige, doPrestige) |
| Où est le pokédex ? | `game.js:4927-4992` (Gen1) + `data.js:1713-1768` (All gens) |
| Où est le système de talents ? | `game.js:4629-4927` (defs, tiers, roll, render) |
| Où est l'élevage (breeding) ? | `game.js:5412-5480` (BREEDING_TIME, startBreeding, checkBreedingSlots) |
| Où est le farm auto ? | `game.js:2269-2395` (toggleFarmAuto, scheduleFarmExplore) |
| Où est le combat auto ? | `game.js:2333-2395` (toggleAutoBattle, runAutoAction) |
| Où est le système de quêtes ? | `game.js:5927-5980` (pool, getDailyQuests, updateDailyProgress) |
| Où sont les succès ? | `game.js:5856-5926` (ACHIEVEMENTS, checkAchievements) |
| Où est le HUD ? | `game.js:1390-1460` (_hud cache, updateHUD, setBar, setMessage) |
| Où est le craft ? | `game.js:6030-6070` (CRAFT_RECIPES, canCraft, doCraft) |
| Où est le tournoi ? | `game.js:6542-6670` (showTourMode, renderTourScreen, startTourFloor) |
| Où est le trial (end-game) ? | `game.js:6350-6541` (TRIAL_CHALLENGES, startTrialChallenge, renderTrialScreen) |
| Où est le boss mondial ? | `game.js:5029-5110` (WORLD_BOSS_POOL, challengeWorldBoss) |
| Où sont les méga évolutions ? | `game.js:4992-5028` (MEGA_EVOS, canMegaEvolve, applyMegaEvo) |
| Où sont les capacités spéciales ? | `mechanics.js:80` (ABILITIES_DB) + `mechanics.js:135` (getAbilityForPokemon) |
| Où est le système de cristaux (shards) ? | `game.js:5278-5301` (SHARD_TYPES, addShard, getShardsBonus) |
| Où est l'arbre de compétences ? | `game.js:5302-5357` (SKILL_TREE, applySkillToTeam, buySkill) |
| Où est le système jour/nuit ? | `mechanics.js:858-926` (isNightTime, NIGHT_ONLY, updateTimeHUD) |
| Où sont les rivaux et Team Rocket ? | `mechanics.js:929-1023` (RIVAL_TEAMS, ROCKET/MAGMA/AQUA_GRUNTS) |
| Où est le système d'évolution par pierre ? | `mechanics.js:1096-1171` (STONE_EVOS, useStoneOnPokemon) |
| Où est l'affinité Pokémon ? | `game.js:5982-6013` (AFFINITY_LEVELS, addAffinity) |
| Où est le revenu passif ? | `game.js:6014-6029` (startPassiveIncome) |
| Où est le wiki des moves ? | `game.js:6215-6322` (renderWiki) |
| Où est la forge ? | `game.js:5165-5184` (renderForge) |
| Où sont les orbes ? | `game.js:2953-2997` (ORB_POOLS, useOrb) |
| Où sont les shiny ? | `mechanics.js:47` (rollShiny) + `game.js:46` (SHINY_ODDS = 1/256) |
| Où est la capture ? | `game.js:2666-2779` (openCatchMenu, throwBall) |
| Où est l'exploration ? | `game.js:1792-1845` (doExplore) — patchée par mechanics.js |
| Où sont les événements spéciaux ? | `game.js:5481-5526` (SPECIAL_EVENTS, triggerRandomEvent) |
| Où sont les synergies d'équipe ? | `game.js:5527-5554` (TEAM_SYNERGIES × 14 entrées, getActiveSynergies, applySynergyBonuses, renderSynergyBadges) |
| Où est le Season Pass ? | `game.js` (après updateGlobalStatsBatch) — SEASON_PASS, initSeasonPass, updateSeasonProgress, claimSeasonReward, renderSeasonPass |
| Où est le Sanctuaire Prestige ? | `game.js` (avant WORLD_BOSS_POOL) — PRESTIGE_LEGENDARY_POOL, challengePrestigeLegendary, handlePrestigeLegVictory |
| Où est l'écran Season Pass ? | `index.html` (#screen-season) + `state.js` (case 'season') |
| Où est le rang entraîneur ? | `game.js:5358-5392` (TRAINER_RANKS, getTrainerRank) |
| Où est l'XP entraîneur ? | `game.js:6092-6133` (TRAINER_XP_PER_LEVEL, addTrainerXP) |
| Où sont les items tenus ? | `game.js:6134-6201` (HELD_ITEMS, assignItemToPokemon) |
| Où est le prestige shop ? | `game.js:5379-5411` (PRESTIGE_SHOP, buyPrestigeUpgrade) |
| Où est la notification toast ? | `game.js:3813` (notify) |
| Où est le minimap ? | `game.js:4600-4628` (drawMinimap) |
| Où est la carte complète ? | `game.js:3943-4235` (renderMap, canvas Kanto) |
| Où est l'export/import de save ? | `game.js:3581-3695` (exportSave, loadSaveCode, handleSaveFileImport) |
| Où est l'auto-save ? | `game.js:3559` (_silentSave toutes les 3 min) |

## Quels fichiers modifier pour...

| Tâche | Fichier(s) cible |
|-------|-----------------|
| Modifier une formule de dégâts | `mechanics.js:330` (calcFullDamage) |
| Ajouter un nouveau Pokémon Gen1 | `js/constants.js` (GEN1) |
| Ajouter un nouveau Pokémon Gen2+ | `data.js` (GEN correspondante) |
| Modifier l'équilibre d'une zone | `js/constants.js` (ZONE_LEVELS + ZONES) |
| Modifier les stats des boss | `game.js` (_bossFixedLevel + _bossStatMult) |
| Ajouter une capacité (ability) | `mechanics.js:80` (ABILITIES_DB) |
| Modifier la formule XP | `game.js:2139` (xpForLevel) |
| Ajouter un écran | `index.html` (div) + `js/state.js` (showScreen switch/case) |
| Modifier les taux de catch | `js/constants.js` (POKE_CATCH_RATES) |
| Ajouter un move | `js/constants.js` (MOVES_DB) |
| Modifier le coût d'une compétence | `game.js:5302` (SKILL_TREE) |
| Modifier les récompenses de prestige | `game.js:5216` (PRESTIGE_REWARDS) |
| Ajouter un succès | `game.js:5856` (ACHIEVEMENTS) |
| Ajouter une quête quotidienne | `game.js:5927` (DAILY_QUEST_POOL) |
| Modifier les chances shiny | `mechanics.js:46` (SHINY_ODDS) |
| Ajouter un événement story | `mechanics.js:1024` (checkStoryEvents) |
| Modifier l'UI mobile | `style.css` (media queries) ou `game.js:2621` (_isMobile) |
| Modifier la palette de couleurs | `theme.css` |
| Modifier les styles HUD | `style.css` |

## Constantes critiques à connaître

| Constante | Valeur | Localisation |
|-----------|--------|--------------|
| `SHINY_ODDS` | 256 (1/256) | `js/constants.js` (+ override `mechanics.js:46`) |
| `ZONE_KILL_NEEDED` | 10 | `js/constants.js` |
| `KILLS_PER_WAVE` | 10 | `game.js:1579` |
| `REST_COOLDOWN` | 30 000 ms | `game.js:1846` |
| `FARM_INTERVAL` | 2 200 ms | `game.js:2269` |
| `BREEDING_TIME` | 300 000 ms (5 min) | `game.js:5412` |
| `WORLD_BOSS_COOLDOWN` | 300 000 ms (5 min) | `game.js:5029` |
| `SAVE_VERSION` | '2.1' | `game.js:3476` |
| `SAVE_KEY` | 'pokemonRPG_save_v2' | `game.js:3477` |
| `MAX_TALENTS_PER_POKE` | 1 | `game.js:4707` |
| `PARTICLE_COUNT` | 8 (mobile) / 18 (desktop) | `game.js:5841` |
| `_autoSaveInterval` | 180 000 ms (3 min) | `game.js:3578` |
