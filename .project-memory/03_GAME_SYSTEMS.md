# Systèmes de jeu — Référence rapide

## 1. Données Pokémon
| Source | Contenu | Constante/Var |
|---|---|---|
| game.js:699 | Gen 1 (151 Pokémon) | `GEN1[]`, `GEN1_SPD{}` |
| data.js:10 | Gen 2 (152-251) | `GEN2[]`, `GEN2_SPD{}` |
| data.js:130 | Gen 3 (252-386) | `GEN3[]`, `GEN3_SPD{}` |
| data.js:240 | Gen 4 (387-493) | `GEN4[]`, `GEN4_SPD{}` |
| data.js:352 | Gen 5 (494-649) | `GEN5[]`, `GEN5_SPD{}` |
| data.js:513 | Gen 6 (650-721) | `GEN6[]`, `GEN6_SPD{}` |
| data.js:590 | Gen 7 (722-809) | `GEN7[]`, `GEN7_SPD{}` |
| data.js:? | Gen 8 (810-905) | `GEN8[]`, `GEN8_SPD{}` |
| data.js:? | Gen 9 (906+) | `GEN9[]`, `GEN9_SPD{}` |

Format d'un Pokémon ennemi : `{id, n, t, hp, atk, def, xp, g}` (xp=yield/5, g=gold)

## 2. Zones et progression
- `ZONES` — game.js:859 — map complète avec Pokémon rencontrables, niveaux, type de zone
- `ZONE_LEVELS` — game.js:631 — niveaux min/max par zone
- `ZONE_KILL_NEEDED = 10` — game.js:1090 — kills pour débloquer boss
- `KILLS_PER_WAVE = 10` — game.js:1579
- Système vague : `getWaveState()` → `{wave, diffMult}` — game.js:1581
- Progression automatique de zone ou manuelle via `selectExploreZone(id)` — game.js:1551

## 3. Combat
- `TYPE_CHART` — game.js:1903 — table d'efficacité des types
- `getEffectiveness(atkType, defType)` — game.js:1924 (patché dans mechanics.js pour dual-types)
- `startBattle(enemyData)` — game.js:1973 — démarre un combat
- `battleAction(action)` — game.js:2396 — action: 'attack'|'magic'|'item'|'flee'
- Turn-based : `setBattleTurn(turn)` — game.js:2147
- Animations d'attaque : `playAttackAnim(type, fromEnemy)` — game.js:2622

## 4. Système de boss
- Boss régulier : `challengeBoss()` — game.js:1711
- `generateBossEnemy()` — game.js:1660 — génère un boss pour la vague actuelle
- `_bossFixedLevel(wave)` — game.js:1649 — niveau fixe selon la vague
- Replay boss : `openBossReplayMenu()` / `replayBoss(wave)` — game.js:1725/1756
- World boss : `challengeWorldBoss()` — game.js:5039, cooldown 5min, pool `WORLD_BOSS_POOL`

## 5. Capture
- `openCatchMenu()` — game.js:2666 — liste les balls disponibles
- `throwBall(ballId)` — game.js:2697
- `POKE_CATCH_RATES` — game.js:146 — taux de capture par Pokémon
- `addCapturedToRoster(capturedData)` — game.js:1304

## 6. Niveau et évolution
- `checkLevelUp()` — game.js:2817
- `checkRosterLevelUp(p)` — game.js:2780
- `xpForLevel(n)` — game.js:2139
- `EVO_CHAINS` — game.js:100 — chaînes d'évolution
- `checkEvolution()` — game.js:2845
- `triggerEvolution(chain)` — game.js:2878
- Niveau max : 500 (modifié depuis 100)

## 7. Auto-combat et Farm
- Farm auto : `toggleFarmAuto()` — game.js:2271, interval `FARM_INTERVAL=2200ms`
- Auto-combat : `toggleAutoBattle()` — game.js:2333
- `runAutoAction()` — game.js:2365 — logique d'action auto

## 8. Système de repos
- `doRest()` — game.js:1848
- `REST_COOLDOWN = 30000` (30s) — game.js:1846

## 9. Boutique
- `SHOP_ITEMS` — game.js:135 — liste des objets disponibles
- `buyItem(itemId)` — game.js:3348
- `buyCT(ctId)` — game.js:3366
- `CT_LIST` — game.js:358 — liste des CTs

## 10. Sauvegarde
- `saveGame()` — game.js:3383
- `loadGame()` — game.js:3391
- `SAVE_VERSION='2.1'`, `SAVE_KEY='pokemonRPG_save_v2'`
- IndexedDB : `IDB_DB='pokewaveDB'`, store `'saves'`
- Anti-cheat : `_computeSig()` — game.js:3482

## 11. HUD
- `updateHUD()` — game.js:1395 (debounce → `_doUpdateHUD()`)
- `setBar(barId,valId,cur,max)` — game.js:1437
- `setMessage(text)` — game.js:1444
- `showZone(name)` — game.js:1461
- `updateKillHUD()` — game.js:1595

## 12. Talents (gacha)
- `TALENT_DEFS` — game.js:4669 — définitions des talents
- `TALENT_TIERS` — game.js:4700
- `MAX_TALENTS_PER_POKE = 1` — game.js:4707
- `rollTalent()` — game.js:4832
- `buyTalentTokens()` — game.js:4727 — coût 500₽

## 13. Pokédex
- `POKEDEX_TOTAL = 151` — game.js:4927 (mais avec data.js, 324+ Pokémon)
- `DEX_MILESTONES` — game.js:4930
- `markDexSeen(pokeId)` — game.js:4942
- `checkDexMilestones()` — game.js:4951

## 14. Prestige
- `PRESTIGE_REWARDS` — game.js:5216
- `canPrestige()` / `doPrestige()` — game.js:5229/5236
- `PRESTIGE_SHOP` — game.js:5379
- `getPrestigeMults()` — game.js:5267

## 15. Breeding (élevage)
- `BREEDING_TIME = 30000` (30s) — game.js:5412
- `startBreeding(idx1, idx2)` — game.js:5415
- `checkBreedingSlots()` — game.js:5439

## 16. Trial (end-game)
- `TRIAL_CHALLENGES` — game.js:6350 — défis légendaires (stats fixes, 5 tiers)
- `TRIAL_SHOP` — game.js:6408
- `startTrialChallenge(idx)` — game.js:6432
- Monnaie : `trialPoints`

## 17. Tour Mode
- `TOUR_FLOOR_ENEMIES` — game.js:6323
- `showTourMode()` / `startTourFloor(rosterIdx)` — game.js:6542/6631
- Récompenses : `TOUR_REWARD_POOL` — game.js:6155

## 18. Arbre de compétences
- `SKILL_TREE` — game.js:5302 — nœuds de compétences
- `buySkill(id)` — game.js:5338
- Points gagnés en battant des boss

## 19. Synergies d'équipe
- `TEAM_SYNERGIES` — game.js:5527
- `getActiveSynergies()` — game.js:5536
- `applySynergyBonuses()` — game.js:5541

## 20. Événements spéciaux
- `SPECIAL_EVENTS` — game.js:5481
- `triggerRandomEvent()` — game.js:5492

## 21. Éclats (Shards)
- `SHARD_TYPES` — game.js:5278 — 15 types
- `addShard(type, amount)` — game.js:5281
- `awardShardOnKill(enemyType)` — game.js:5293

## 22. Revenu passif
- `startPassiveIncome()` — game.js:6014

## 23. Niveau dresseur
- `TRAINER_XP_PER_LEVEL(lv)` — game.js:6092
- `addTrainerXP(amount)` — game.js:6094
- `TRAINER_RANKS` — game.js:5358

## 24. Mega-évolution
- `MEGA_EVOS` — game.js:4992
- `canMegaEvolve(p)` / `applyMegaEvo(p)` — game.js:5007/5010

## 25. Objets tenus (held items)
- `HELD_ITEMS` — game.js:6134
- `assignItemToPokemon(source, idx, itemId)` — game.js:6159
