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
