# PokéQuest — Vue d'ensemble du projet

## Identité
- **Nom** : PokéQuest — Aventure Insulaire / Île des Dragons Célestes
- **Type** : Jeu RPG Pokémon, navigateur, single-page, vanille JS/HTML/CSS
- **Langue UI** : Français
- **Aucun framework, aucun build tool, aucune dépendance npm**

## Fichiers (racine du projet)
| Fichier | Lignes | Rôle |
|---|---|---|
| `index.html` | 597 | Entrée unique — tous les écrans HTML (divs `.screen`) |
| `game.js` | 6735 | Moteur principal — toute la logique de jeu |
| `data.js` | 1959 | Données Pokémon Gen 2→9 (Gen 1 est dans game.js) |
| `mechanics.js` | 1256 | Mécaniques avancées : natures, statuts, météo, capacités, rival |
| `style.css` | 975 | Styles principaux |
| `theme.css` | 902 | Variables CSS de thème / couleurs |
| `serve.py` | ~20 | Serveur de dev local |
| `split.py` | ~50 | Outil utilitaire dev |

## Ordre de chargement des scripts (bas de index.html)
```html
<script src="game.js?v=21">   ← chargé en premier
<script src="data.js?v=6">    ← étend les structures de game.js
<script src="mechanics.js?v=4"> ← patche les fonctions de game.js
```

## Architecture globale
- Toutes les données de jeu vivent dans un objet global `player` (null au démarrage)
- Les écrans sont des `div.screen` activés via `showScreen(id)`
- Pas de SPA router — tout est dans le DOM, on toggle `class="active"`
- Le HUD est permanent (div#hud), visible en mode jeu et combat
- La sauvegarde utilise localStorage + IndexedDB avec anti-cheat (signature HMAC-like)
- Génération 1 (151 Pokémon) définie dans game.js, Gen 2-9 dans data.js

## Système de sauvegarde
- Clé localStorage : `pokemonRPG_save_v2`
- Base IndexedDB : `pokewaveDB`, store : `saves`
- Version de sauvegarde : `2.1`
- Anti-cheat : `_computeSig()` + `_wrapSave()` / `_unwrapSave()`
