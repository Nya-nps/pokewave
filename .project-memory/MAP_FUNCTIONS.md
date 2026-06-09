# MAP_FUNCTIONS — Index des fonctions par fichier
Dernière mise à jour : 2026-06-09

Format : `fonction()  :ligne → rôle`

---

## game.js (6735L) — Moteur principal

### Constantes globales
| Constante | Ligne | Rôle |
|-----------|-------|------|
| `DUAL_TYPES` | 6 | Override types doubles (mécanique manuelle) |
| `SPRITE_BASE/FRONT/BACK/SHINY` | 40-43 | URLs sprites PokeAPI |
| `SHINY_ODDS` | 46 | 1/256 |
| `CLASSES` | 92 | Mapping classe joueur |
| `EVO_CHAINS` | 100 | Chaînes évolution |
| `ENEMIES` | 111 | Pool ennemis de base |
| `EVENTS` | 124 | Pool événements exploration |
| `SHOP_ITEMS` | 135 | Items disponibles en boutique |
| `POKE_CATCH_RATES` | 146 | Taux de capture par ID |
| `ITEM_DISPLAY` | 188 | Labels affichage items |
| `MOVES_DB` | 212 | Base de données des moves |
| `CT_LIST` | 358 | Liste des CTs disponibles |
| `LEVEL_UP_MOVES` | 384 | Moves appris par level-up |
| `ZONE_LEVELS` | 631 | Niveaux min/max par zone |
| `GEN1_SPD` | 682 | Vitesses Gen1 |
| `GEN1` | 699 | Array Pokémon Gen1 |
| `ZONES` | 859 | Config complète des zones (ennemis, biomes) |
| `ZONE_KILL_NEEDED` | 1090 | 10 kills = 1 progression |
| `KILLS_PER_WAVE` | 1579 | Kills pour déclencher une wave |
| `REST_COOLDOWN` | 1846 | 30 000 ms |
| `TYPE_CHART` | 1903 | Tableau efficacité types |
| `FARM_INTERVAL` | 2269 | 2200 ms entre explorations auto |
| `_isMobile` | 2621 | Détection mobile (<= 768px) |
| `ORB_POOLS` | 2953 | Pools d'orbes par type |
| `ZONE_ORDER` | 3833 | Ordre linéaire des zones |
| `ZONE_POS` | 3842 | Positions canvas (map) |
| `ROUTE_CONNECTIONS` | 3870 | Liaisons entre zones |
| `KANTO_ZONES` | 3894 | Zone objects complets |
| `ZONE_COLORS` | 3910 | Couleurs par zone |
| `TALENT_ICONS` | 4629 | Icônes talents |
| `TALENT_DEFS` | 4669 | Définitions des talents |
| `TALENT_TIERS` | 4700 | Tiers talents |
| `POKEDEX_TOTAL` | 4927 | 151 (Gen1) |
| `DEX_MILESTONES` | 4930 | Récompenses pokédex |
| `MEGA_EVOS` | 4992 | Méga évolutions |
| `WORLD_BOSS_POOL` | 5031 | Pool boss mondiaux |
| `PRESTIGE_REWARDS` | 5216 | Récompenses prestige |
| `SHARD_TYPES/ICONS` | 5278-79 | Types de cristaux |
| `SKILL_TREE` | 5302 | Arbre de compétences |
| `TRAINER_RANKS` | 5358 | Rangs entraîneur |
| `PRESTIGE_SHOP` | 5379 | Shop prestige |
| `BREEDING_TIME` | 5412 | 30 000 ms |
| `SPECIAL_EVENTS` | 5481 | Événements spéciaux |
| `TEAM_SYNERGIES` | 5527 | Synergies d'équipe |
| `PARTICLE_COUNT` | 5841 | 8 (mobile) ou 18 (desktop) |
| `ACHIEVEMENTS` | 5856 | Liste succès |
| `DAILY_QUEST_POOL` | 5927 | Pool quêtes journalières |
| `AFFINITY_LEVELS` | 5982 | Paliers affinité Pokémon |
| `CRAFT_RECIPES` | 6030 | Recettes de craft |
| `TRAINER_XP_PER_LEVEL` | 6092 | Formule XP entraîneur |
| `HELD_ITEMS` | 6134 | Items tenus |
| `TOUR_FLOOR_ENEMIES` | 6323 | Ennemis par étage tournoi |
| `TRIAL_CHALLENGES` | 6350 | Défis trial (end-game) |
| `TRIAL_SHOP` | 6408 | Shop trial |

### Fonctions — Initialisation & Navigation
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `showScreen(id)` | 1102 | Router central 18 écrans |
| `showInventory/Shop/Team/Map()` | 1137-40 | Raccourcis showScreen |
| `startGame()` | 1145 | Init player{}, lance session |
| `getActivePoke()` | 1222 | Retourne le Pokémon actif |
| `syncPlayerFromActive()` | 1230 | Copie stats actif → player |
| `syncActiveFromPlayer()` | 1263 | Copie player → actif |
| `switchToRosterPoke(idx)` | 1288 | Change Pokémon actif |
| `addCapturedToRoster(data)` | 1304 | Ajoute capture au roster |

### Fonctions — HUD
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `updateHUD()` | 1395 | Refresh HUD (debounced via rAF) |
| `_doUpdateHUD()` | 1401 | Implémentation effective |
| `setBar(barId,valId,cur,max)` | 1437 | Met à jour une barre de vie/xp |
| `setMessage(text)` | 1444 | Affiche message dans battle log |
| `updateKillHUD()` | 1595 | Refresh compteur kills/wave |
| `updateTimeHUD()` | 907 | (mechanics.js) |

### Fonctions — Zone & Exploration
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `showZone(name)` | 1461 | Affiche zone en cours |
| `openZonePicker()` | 1499 | Ouvre sélecteur de zone |
| `closeZonePicker()` | 1546 | Ferme sélecteur |
| `selectExploreZone(id)` | 1551 | Sélectionne zone exploration |
| `doExplore()` | 1792 | Explore zone — génère ennemi |
| `doRest()` | 1848 | Repos (cooldown 30s) |

### Fonctions — Wave / Boss
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `getWaveState()` | 1581 | Retourne état wave courante |
| `getWaveEnemyScale()` | 1593 | Multiplicateur difficulté wave |
| `recordKill()` | 1625 | +1 kill, déclenche wave/boss |
| `_bossFixedLevel(wave)` | 1649 | Niveau fixe du boss par wave |
| `_bossStatMult(wave)` | 1653 | Multiplicateur stats boss |
| `generateBossEnemy()` | 1660 | Génère données ennemi boss |
| `challengeBoss()` | 1711 | Lance le défi boss de wave |
| `openBossReplayMenu()` | 1725 | Menu replay boss |
| `replayBoss(wave)` | 1756 | Rejoue un boss précédent |

### Fonctions — Combat
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `getEffectiveness(atkT,defT)` | 1924 | Retourne multiplicateur type |
| `getEffLabel(mult)` | 1931 | Label texte efficacité |
| `showPreBattleMenu(enemy)` | 1946 | Affiche menu pré-combat |
| `startBattle(enemyData)` | 1973 | Lance un combat |
| `updateBattleHp()` | 2080 | Refresh barres HP combat |
| `setBattleTurn(turn)` | 2147 | Passe au tour |
| `battleAction(action)` | 2396 | Exécute action combat |
| `playAttackAnim(type,fromEnemy)` | 2622 | Animation attaque GPU |
| `hurtSprite(id)` | 2648 | Flash sprite dégât |
| `disableBattleButtons(dis)` | 2658 | Active/désactive boutons combat |
| `openCatchMenu()` | 2666 | Ouvre menu capture |
| `throwBall(ballId)` | 2697 | Lance une ball |
| `toggleAutoBattle()` | 2333 | Toggle combat automatique |
| `toggleFarmAuto()` | 2271 | Toggle farm automatique |

### Fonctions — Level-up & Évolution
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `checkRosterLevelUp(p)` | 2780 | Vérifie level-up tout le roster |
| `checkLevelUp()` | 2817 | Vérifie level-up actif |
| `checkEvolution()` | 2845 | Vérifie évolution |
| `triggerEvolution(chain)` | 2878 | Déclenche animation évolution |
| `levelUpPokemon(p)` | 6202 | Level-up forcé (skill tree) |

### Fonctions — Inventaire & Moves
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `useBagSpecial(itemId)` | 2908 | Utilise item spécial |
| `useShinyGem()` | 2913 | Utilise gemme shiny |
| `useOrb(orbId)` | 2964 | Utilise orbe |
| `renderInventory()` | 2998 | Render écran inventaire |
| `openPokeDetail(rosterIdx)` | 485 | Ouvre détail Pokémon |
| `renderPokeDetail()` | 499 | Render détail Pokémon |
| `selectMoveSlot(slot)` | 584 | Sélectionne slot de move |
| `equipMove(moveName,ctId)` | 589 | Équipe un move/CT |
| `addCTToInventory(ctId)` | 474 | Ajoute CT à l'inventaire |
| `getLearnableMoves(poke)` | 467 | Retourne moves apprenables |

### Fonctions — Équipe / Boite
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `switchTeamTab(tab)` | 3037 | Switch onglet équipe |
| `renderTeam()` | 3055 | Render écran équipe |
| `renderBox()` | 3105 | Render boite de rangement |
| `openTeamDetail(src,idx)` | 3133 | Ouvre détail membre |
| `moveToBox(rosterIdx)` | 3269 | Envoie en boite |
| `moveToTeam(boxIdx)` | 3286 | Rappelle depuis boite |
| `selectLeadFromTeam(idx)` | 3296 | Définit le leader |

### Fonctions — Boutique
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `renderShop()` | 3311 | Render boutique |
| `buyItem(itemId)` | 3348 | Achète un item |
| `buyCT(ctId)` | 3366 | Achète une CT |

### Fonctions — Sauvegarde
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `saveGame()` | 3383 | Sauvegarde localStorage + IDB |
| `loadGame()` | 3391 | Charge depuis localStorage/IDB |
| `_computeSig(str)` | 3482 | Anti-cheat — signature save |
| `_wrapSave(json)` | 3500 | Emballe save avec signature |
| `_unwrapSave(raw)` | 3504 | Vérifie + déballe save |
| `_idbSave(data)` | 3519 | Sauvegarde IndexedDB |
| `_idbLoad(cb)` | 3530 | Charge depuis IndexedDB |
| `_silentSave()` | 3559 | Auto-save silencieux (3min) |
| `exportSave()` | 3581 | Export code base64 |
| `loadSaveCode()` | 3621 | Import code base64 |
| `renderSaveManager()` | 3733 | Render gestionnaire saves |

### Fonctions — Carte du monde
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `renderMap()` | 3943 | Render canvas carte Kanto |
| `hoverZone(id)` | 4234 | Hover zone sur map |
| `selectZone(id)` | 4381 | Sélectionne zone destination |
| `travelToZone()` | 4432 | Voyage vers zone sélectionnée |
| `challengeGymLeader(zoneId)` | 4320 | Lance défi arène |
| `handleGymVictory()` | 4358 | Gère victoire arène |
| `drawMinimap()` | 4600 | Minimap dans HUD |

### Fonctions — Talents / Prestige
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `showTalents()` | 4711 | Affiche écran talents |
| `renderTalentScreen()` | 4737 | Render talents |
| `rollTalent(count)` | 4832 | Roll un talent |
| `canPrestige()` | 5229 | Vérifie conditions prestige |
| `doPrestige()` | 5236 | Déclenche prestige |
| `getPrestigeMults()` | 5267 | Retourne multiplicateurs prestige |
| `renderPrestigeScreen()` | 5626 | Render écran prestige |
| `renderSkillTree()` | 5565 | Render arbre compétences |
| `buySkill(id)` | 5338 | Achète une compétence |

### Fonctions — Pokédex
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `showPokedex()` | 5736 | Affiche pokédex |
| `renderPokedex()` | 5743 | Render grille pokédex |
| `showDexDetail(pokeId)` | 5788 | Détail d'un Pokémon |
| `markDexSeen(pokeId)` | 4942 | Marque comme vu |
| `checkDexMilestones()` | 4951 | Vérifie jalons pokédex |

### Fonctions — Succès / Quêtes
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `checkAchievements()` | 5901 | Vérifie et débloque succès |
| `grantAchievementReward(ach)` | 5913 | Donne récompense succès |
| `getDailyQuests()` | 5940 | Génère quêtes du jour |
| `updateDailyProgress(type,amt)` | 5956 | Met à jour progression quête |
| `renderAchievements()` | 5142 | Render écran succès |
| `renderQuests()` | 5110 | Render écran quêtes |

### Fonctions — Systèmes avancés
| Fonction | Ligne | Rôle |
|----------|-------|------|
| `xpForLevel(n)` | 2139 | Formule XP requis pour niveau n |
| `getGoldMultiplier()` | 2135 | Multiplicateur gold (prestige etc.) |
| `notify(msg)` | 3813 | Toast notification |
| `addAffinity(poke,amt)` | 5992 | Ajoute affinité Pokémon |
| `startPassiveIncome()` | 6014 | Lance revenu passif |
| `doCraft(recipeId)` | 6050 | Craft un item |
| `addShard(type,amt)` | 5281 | Ajoute cristaux type |
| `getShardsBonus(pokeType)` | 5287 | Bonus cristaux pour type |
| `challengeWorldBoss()` | 5039 | Lance boss mondial |
| `startBreeding(idx1,idx2)` | 5415 | Lance élevage |
| `checkBreedingSlots()` | 5439 | Vérifie slots élevage |
| `addTrainerXP(amount)` | 6094 | Ajoute XP entraîneur |
| `getTrainerRank()` | 5368 | Retourne rang entraîneur |
| `triggerShinyEncounterEffect()` | 6670 | Effet animation shiny |
| `startTourFloor(rosterIdx)` | 6631 | Lance étage tournoi |
| `startTrialChallenge(idx)` | 6432 | Lance défi trial |
| `renderWiki()` | 6215 | Render wiki moves |
| `renderForge()` | 5165 | Render forge |

---

## data.js (1959L) — Données Pokémon Gen2-9

| Symbole | Ligne | Rôle |
|---------|-------|------|
| `GEN2` | 10 | Array Gen2 (Pokémon 152-251) |
| `GEN2_SPD` | 113 | Vitesses Gen2 |
| `GEN3` | 130 | Array Gen3 (252-386) |
| `GEN3_SPD` | 228 | Vitesses Gen3 |
| `GEN4` | 240 | Array Gen4 (387-493) |
| `GEN5` | 352 | Array Gen5 (494-649) |
| `GEN6` | 513 | Array Gen6 (650-721) |
| `GEN7` | 590 | Array Gen7 (722-809) |
| `GEN8` | 683 | Array Gen8 (810-905) |
| `GEN9` | 770 | Array Gen9 (906+) |
| `LEGENDARIES_IDS` | 880 | Set des IDs légendaires |
| `ALL_POKEMON` | 885 | Fusion GEN1..GEN9 |
| `ALL_SPD` | 886 | Fusion vitesses |
| `ALL_POKEMON_MAP` | 888 | Map id→pokemon |
| `STARTER_META` | 1628 | Métadonnées starters par gen |
| `buildStarterGrid(gen)` | 1668 | Render grille starters |
| `DEX_TOTAL_ALL` | 1713 | Total Pokémon (~1010) |
| `NEW_DEX_MILESTONES` | 1715 | Jalons pokédex étendu |
| `renderDexGrid()` | 1768 | Render grille dex étendue |

---

## mechanics.js (1256L) — Extensions monkey-patch

| Symbole | Ligne | Rôle |
|---------|-------|------|
| `DUAL_TYPES` | 6 | (référence game.js) |
| `getPokeType/1/2(id,base)` | 28-38 | Résout type dual |
| `SPRITE_BASE/FRONT/BACK/SHINY` | 40-43 | URLs sprites |
| `rollShiny()` | 47 | Roll shiny 1/256 |
| `SIZE_VARIANTS` | 62 | Variantes taille |
| `CLASSES` | 92 | Classes joueur |
| `EVO_CHAINS` | 100 | Chaînes évolution |
| `ENEMIES` | 111 | Pool ennemis |
| `EVENTS` | 124 | Pool événements |
| `SHOP_ITEMS` | 135 | Items boutique |
| `NATURES` | 24 | 25 natures Pokémon |
| `NATURE_NAMES` | 49 | Noms natures |
| `getRandomNature()` | 51 | Roll nature aléatoire |
| `applyNatureToStats(p)` | 55 | Applique modificateurs nature |
| `ABILITIES_DB` | 80 | Base données capacités spéciales |
| `TYPE_ABILITY_MAP` | 99 | Type → ability par défaut |
| `POKEMON_ABILITY_OVERRIDES` | 115 | Overrides par ID Pokémon |
| `getAbilityForPokemon(p)` | 135 | Retourne ability d'un Pokémon |
| `STATUS_ICONS/COLORS` | 148-156 | Icônes et couleurs statuts |
| `applyStatus(target,type,turns)` | 164 | Applique un statut |
| `clearStatus(target)` | 170 | Efface statut |
| `applyStatusDoT(target,isPlayer)` | 176 | Dégâts par tour (brûlure/poison) |
| `updateStatusDisplay()` | 207 | Refresh UI statuts |
| `WEATHER_INFO` | 266 | Config météo |
| `setWeather(type,turns)` | 273 | Active météo |
| `getWeatherMult(atkType)` | 291 | Multiplicateur météo |
| `calcFullDamage(...)` | 330 | Calcul dégâts complet |
| `MOVE_STATUS_EFFECTS` | 369 | Effets statut par move |
| `tryApplyMoveStatus(name,target)` | 385 | Tente d'appliquer effet move |
| `isNightTime()` | 858 | Heure de nuit ? |
| `isDawnDusk()` | 862 | Aube/crépuscule ? |
| `NIGHT_ONLY/DAY_ONLY/NIGHT_BOOST` | 868-872 | Sets Pokémon heure-dépendants |
| `checkStoryEvents()` | 1024 | Vérifie events histoire |
| `triggerStoryBattle(enc,type)` | 1048 | Lance combat histoire |
| `RIVAL_TEAMS` | 929 | Équipes rivales |
| `ROCKET/MAGMA/AQUA_GRUNTS` | 975-1009 | Équipes adverses |
| `STONE_EVOS` | 1096 | Évolutions par pierre |
| `STONE_SHOP_ITEMS` | 1126 | Items pierres en boutique |
| `window.useStoneOnPokemon` | 1139 | Utilise pierre sur Pokémon |
| `window.TOUR_FLOOR_ENEMIES` | 1172 | Override ennemis tournoi |

---

## index.html (597L) — Shell HTML

Pas de fonctions JS — contient uniquement les divs-écrans (IDs) :
`#home`, `#explore`, `#battle`, `#inventory`, `#shop`, `#team`,
`#map`, `#talents`, `#prestige`, `#quests`, `#achievements`, `#pokedex`,
`#breeding`, `#forge`, `#wiki`, `#tour`, `#trial`, `#save-manager`
