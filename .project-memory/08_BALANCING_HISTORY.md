# Historique d'équilibrage et décisions de design

## Commits récents (résumé git)
- **Plafond niveau 100→500** : les Pokémon peuvent maintenant monter jusqu'au niveau 500
  Zones entièrement rebalancées en conséquence
- **Coûts des compétences réduits ×5** : coûts 100–4000 au lieu de 500–20000
- **Trial refondu** : contenu END-GAME brutal avec stats fixes, 5 tiers
- **Anti-cheat** : sauvegardes signées + tampons de session protégés
- **7 changements gameplay** : QoL + équilibrage divers

## Rééquilibrage général (2026-06-09 — session 2)

### Bugs systèmes non-fonctionnels — CORRIGÉS
- **Prestige XP/Or jamais appliqués** : `getPrestigeMults()` n'était jamais appelé dans le calcul XP/Or du combat → ajout de `_pm.xp` et `_pm.gold` dans `xpG`/`goldG` (L2473-2474)
- **Skill Tree Étude I/II, Fortune I/II ignorés** : `_globalXPBonus` et `_globalGoldBonus` stockés mais jamais multipliés → intégrés dans `xpG`/`goldG` en même temps que prestige
- **rollShiny() ignorait tous les multiplicateurs** : `_shinyLuckMult` (skill tree) et `prestigeShinyMult` jamais appliqués dans les rencontres sauvages → corrigé L47 (`Math.ceil(SHINY_ODDS / mult)`)
- **Prestige boss mult jamais stocké** : `mult.boss` dans `PRESTIGE_REWARDS` lv3/lv9 jamais sauvegardé → ajout de `prestigeBossMult` dans `keepFields` de `doPrestige` + exposé dans `getPrestigeMults()` + appliqué au `bonusGold` des boss

### Balance — Boss rewards
- **Boss XP linéaire → quadratique** : `200 + wave*150` remplacé par `max(300, 15*wave²)`. Vague 20 : 6 000 XP (était 3 200) ; vague 50 : 37 500 (était 7 700) ; vague 89 : 118 935 (était 13 550)
- **Boss Gold quadratique** : `300 + wave*100` remplacé par `max(200, 8*wave²)`. Vague 89 : 63 368 (était 9 200)
- **diffMult plafonné à ×10** : valeur HUD cohérente avec le cap boss (`Math.min(10.0, ...)`)

## Correctifs appliqués (2026-06-09 — session 1)
- **Level cap 500 enforced** : ajout de `if (level >= 500) { xp = 0; break; }` dans `checkLevelUp`, `checkRosterLevelUp`, et `levelUpPokemon` — les 3 fonctions pouvaient dépasser 500 indéfiniment
- **Boss level cap 100→450** : `_bossFixedLevel` plafonnait à 100 (résidu ancien cap) → porté à 450. Vague 20 = niv.105, vague 50 = niv.255, vague 89+ = niv.450
- **Prestige niveau 50→100** : `canPrestige` exigeait niveau 50 (10% du cap) → porté à 100 (20%)

## Correctifs appliqués (2026-06-09 — session 3)

### World Boss — stats triviales au bas niveau CORRIGÉ
- **Problème** : stats boss 100% relatives au joueur, sans plancher → niv 1 générait un boss à 60 HP / 5 ATK
- **Fix** : gate niveau 30 + planchers `Math.max` sur les trois stats
  - `bossHp  = Math.max(1200, player.maxHp * 5 * difficulty)` (était `player.maxHp * 3`)
  - `bossAtk = Math.max(80,   player.atk   * 0.90)` (était `player.maxHp * 0.15 + def/2`)
  - `bossDef = Math.max(50,   player.atk   * 0.50)` (était `player.atk * 0.40`)
- **Pattern** : gate de niveau → stats minimales fixes → scaling pour late-game (standard RPG browser)

## Balance pass complète (2026-06-09 — session 3) — Senior Game Design audit

### Problème critique résolu : DEF ennemi scaling exponentiel
**Symptôme** : TTK joueur de ~500 tours sur Onix niv 100, ~13 tours sur Magnéton niv 56 (vs 7 tours survie)
**Cause** : `def = base_def * lvlScale * 1.0` — Onix (base DEF:25) à niv 100 = 400 DEF vs joueur ATK 326
**Fix** :
- `lvlScale = 1 + level * 0.17` (était 0.15) → scaling global +13%
- HP ennemi × 1.15 → difficulté via PV, pas DEF
- ATK ennemi × 0.88 → survie joueur +1-2 tours
- DEF ennemi × 0.55 → TTK joueur divisé par ~2 en mid-game

Simulations post-fix :
| Phase | TTK joueur | Survie joueur |
|---|---|---|
| Early niv 5 | 5 tours | 12 tours |
| Mid niv 56 | 7 tours (était 13) | 8 tours |
| Late niv 112 | 9 tours | 10 tours |
| End niv 205 | 17 tours | 4 tours |

### Classe Carapuce rééquilibrée
- ATK 11 → 13 (+18%), DEF 18 → 16 (-11%)
- Tank avec ATK viable, plus distinct de l'archétype Évoli

## Règles de design établies
- Les ennemis ont des stats simplifiées : {id, n, t, hp, atk, def, xp, g} (divisées par ~5 des stats officielles)
- Le niveau maximum du jeu est 500 (enforced)
- Les boss ont des niveaux fixes par vague (`_bossFixedLevel`), plafond 450
- Trial = stats fixes (pas de scaling dresseur)
- Le système de vagues demande 10 kills pour déclencher le boss
- Les zones ont chacune leur propre pool de Pokémon et niveaux
- Prestige requis : Boss Vague 20+ ET Niveau 100+

## Formules importantes
- XP pour monter de niveau : `xpForLevel(n)` — game.js:2139 (courbe exponentielle)
- XP dresseur : `TRAINER_XP_PER_LEVEL(lv) = floor(20 * 1.35^(lv-1))` — game.js:6092
- Multiplicateur de vague : `getWaveState()` retourne `diffMult` croissant
- Cooldown repos : 30s
- Farm auto interval : 2.2s par exploration
