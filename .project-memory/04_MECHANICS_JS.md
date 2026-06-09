# mechanics.js — Mécaniques avancées

Fichier chargé EN DERNIER (après game.js et data.js).
Patche et étend les fonctions existantes via monkey-patching.

## 1. Dual-types (lignes 1-19)
Patche `getEffectiveness()` pour gérer les types `/` (ex: 'Eau/Vol').
```js
window.getEffectiveness = function(atkType, defType) { ... }
```

## 2. Natures (lignes 24-75)
- `NATURES` — 22 natures avec multiplicateurs {atk, def, spd, magic}
- `NATURE_NAMES` — liste des noms
- `getRandomNature()` — retourne une nature aléatoire
- `applyNatureToStats(p)` — applique les modificateurs sur un Pokémon
- Patch `addCapturedToRoster` : assigne une nature à chaque capture

## 3. Capacités / Abilities (lignes 80-120)
- `ABILITIES_DB` — dictionnaire des capacités passives
  - Types: boost, immune, intimidate, onhit, weather, nocrit, statboost, wonderguard
- `TYPE_ABILITY_MAP` — association type Pokémon → capacités possibles

## 4. Effets de statut
Poison, Paralysie, Brûlure, Sommeil, Gel
Appliqués dans la logique de combat

## 5. Météo
Types: pluie, soleil, grêle, sable
Déclenchée par capacités ou abilities (Serge-Pluie, Sécheresse, etc.)

## 6. Coups critiques
Probabilité et calcul des coups critiques dans le combat

## 7. Rival / Team Rocket
Événements de combat contre rivals / Team Rocket

## 8. Jour/Nuit et évolutions
Évolutions conditionnelles selon l'heure (jour/nuit)
Évolutions par pierre / amitié

## Résumé des patches
mechanics.js utilise `window.XXX = function(...)` pour patcher les fonctions de game.js.
Il peut aussi appeler `(function patchX() { const _prev = window.X; window.X = ... })()` 
pour enchaîner avec l'implémentation originale.
