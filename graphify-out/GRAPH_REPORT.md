# Graph Report - /home/user/pokewave  (2026-06-10)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 363 nodes · 808 edges · 21 communities (15 shown, 6 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 99 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6b169e26`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]

## God Nodes (most connected - your core abstractions)
1. `notify()` - 71 edges
2. `battleAction()` - 36 edges
3. `showScreen()` - 31 edges
4. `setMessage()` - 30 edges
5. `updateHUD()` - 24 edges
6. `_hud()` - 22 edges
7. `startBattle()` - 22 edges
8. `loadGame()` - 20 edges
9. `startGame()` - 17 edges
10. `syncPlayerFromActive()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `startGame()` --calls--> `updateHUD()`  [INFERRED]
  js/state.js → game.js
- `startGame()` --calls--> `setMessage()`  [INFERRED]
  js/state.js → game.js
- `triggerStoryBattle()` --calls--> `setMessage()`  [INFERRED]
  mechanics.js → game.js
- `startGame()` --calls--> `updateKillHUD()`  [INFERRED]
  js/state.js → game.js
- `openBossReplayMenu()` --calls--> `SPRITE_FRONT()`  [INFERRED]
  game.js → js/constants.js

## Import Cycles
- None detected.

## Communities (21 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.03
Nodes (40): ACHIEVEMENTS, AFFINITY_LEVELS, _bHpCache, breedingSlots, CRAFT_RECIPES, DAILY_QUEST_POOL, DEX_MILESTONES, eventLog (+32 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (44): assignItemToPokemon(), equipMove(), moveToBox(), moveToTeam(), openPokeDetail(), openTeamDetail(), removeItemFromPokemon(), renderBox() (+36 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (44): applyMegaEvo(), applySkillToTeam(), buyCT(), buyItem(), buySkill(), buyTalentTokens(), canCraft(), challengeGymFromMap() (+36 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (31): ABILITIES_DB, applyStatus(), AQUA_GRUNTS, battleWeather, calcFullDamage(), checkStoryEvents(), DAY_ONLY, getWeatherMult() (+23 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (35): addAffinity(), applyRestesHeal(), battleAction(), canMegaEvolve(), challengeWorldBoss(), closeCatchMenu(), confirmSwitch(), disableBattleButtons() (+27 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (23): ALL_POKEMON, ALL_POKEMON_MAP, ALL_SPD, GEN2, GEN2_SPD, GEN3, GEN3_SPD, GEN4 (+15 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (22): buyPrestigeUpgrade(), challengePrestigeLegendary(), closeTourMode(), getAvailablePrestigeLegendaries(), getPrestigeStars(), renderAchievements(), renderForge(), renderInventory() (+14 more)

### Community 7 - "Community 7"
Cohesion: 0.14
Nodes (20): addTrainerXP(), checkAchievements(), checkRosterLevelUp(), getDailyQuests(), getEffectiveShinyOdds(), initDexFromRoster(), levelUpPokemon(), loadGame() (+12 more)

### Community 8 - "Community 8"
Cohesion: 0.20
Nodes (14): _bossFixedLevel(), _bossStatMult(), challengeBoss(), closeZonePicker(), generateBossEnemy(), getWaveEnemyScale(), getWaveState(), openBossReplayMenu() (+6 more)

### Community 9 - "Community 9"
Cohesion: 0.25
Nodes (9): _applyImportedSave(), _computeSig(), _confirmImport(), exportSave(), _idbSave(), loadSaveCode(), renderSaveManager(), _unwrapSave() (+1 more)

### Community 10 - "Community 10"
Cohesion: 0.22
Nodes (9): buyTrialItem(), canPrestige(), doPrestige(), _refreshTrialPool(), renderTrialScreen(), saveGame(), useBagSpecial(), useOrb() (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.25
Nodes (8): checkBreedingSlots(), getTrainerRank(), renderBreedingScreen(), startBreedFromScreen(), startBreeding(), toggleBreedSelect(), updateBreedingHUD(), updatePeriodicHUD()

### Community 12 - "Community 12"
Cohesion: 0.29
Nodes (8): drawTalent(), getTalentIcon(), renderTalentScreen(), renderTalentSlots(), rollTalent(), rollTalent10(), selectTalentPoke(), showTalents()

### Community 13 - "Community 13"
Cohesion: 0.40
Nodes (5): _ensureMapOffscreen(), getZoneById(), hoverZone(), renderMap(), selectZone()

### Community 14 - "Community 14"
Cohesion: 0.67
Nodes (3): applySynergyBonuses(), getActiveSynergies(), renderSynergyBadges()

## Knowledge Gaps
- **98 isolated node(s):** `GEN2`, `GEN2_SPD`, `GEN3`, `GEN3_SPD`, `GEN4` (+93 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `triggerStoryBattle()` connect `Community 3` to `Community 2`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Why does `notify()` connect `Community 2` to `Community 0`, `Community 1`, `Community 3`, `Community 4`, `Community 6`, `Community 7`, `Community 8`, `Community 9`, `Community 10`, `Community 11`, `Community 12`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `setMessage()` connect `Community 2` to `Community 0`, `Community 3`, `Community 4`, `Community 6`, `Community 7`, `Community 8`, `Community 10`, `Community 16`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `notify()` (e.g. with `addCapturedToRoster()` and `startGame()`) actually correct?**
  _`notify()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `battleAction()` (e.g. with `showScreen()` and `syncActiveFromPlayer()`) actually correct?**
  _`battleAction()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 25 inferred relationships involving `showScreen()` (e.g. with `battleAction()` and `challengeGymLeader()`) actually correct?**
  _`showScreen()` has 25 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `setMessage()` (e.g. with `startGame()` and `triggerStoryBattle()`) actually correct?**
  _`setMessage()` has 2 INFERRED edges - model-reasoned connections that need verification._