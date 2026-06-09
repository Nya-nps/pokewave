# MAP_STRUCTURE — Arborescence PokéQuest
Dernière mise à jour : 2026-06-09

```
pokewave/
├── index.html              → Shell HTML (597L) — 18 écrans div, charge scripts, define HUD
├── game.js                 → Moteur principal (6735L) — ⚠️ NE PAS LIRE EN ENTIER
├── data.js                 → Données Pokémon Gen2-9 (1959L) — tableaux GEN2..GEN9 + ALL_POKEMON
├── mechanics.js            → Extensions monkey-patch (1256L) — natures, abilities, types, météo, story
├── style.css               → Styles HUD / UI (975L) — layout, boutons, barres HP, animations
├── theme.css               → Palette couleurs + variables CSS (902L) — dark mode, thème RPG
├── serve.py                → Serveur HTTP local (dev)
├── split.py                → Script utilitaire découpe fichiers
├── pokewaves (1).html      → Archive ancienne version (ne pas modifier)
├── .gitignore
├── .claude/
│   └── settings.local.json → Permissions Claude Code locales
└── .project-memory/        → Mémoire persistante sessions
    ├── README.md            → Index principal + carte blocs game.js
    ├── MAP_STRUCTURE.md     → Ce fichier — arborescence
    ├── MAP_DEPENDENCIES.md  → Graphe dépendances (Mermaid + texte)
    ├── MAP_FUNCTIONS.md     → Index fonctions par fichier avec lignes
    ├── MAP_QUICKREF.md      → Réponses rapides "où est X ?"
    ├── 00_OVERVIEW.md       → Architecture, fichiers, ordre chargement, save
    ├── 01_PLAYER_OBJECT.md  → Struct player{}, struct Pokémon
    ├── 02_SCREENS.md        → 18 écrans, modals, showScreen() router
    ├── 03_GAME_SYSTEMS.md   → 25 systèmes avec lignes exactes
    ├── 04_MECHANICS_JS.md   → Patches mechanics.js décrits
    ├── 05_KNOWLEDGE_GRAPH.md → Flow jeu, dépendances, table constantes
    ├── 06_FUNCTIONAL_INDEX.md → "Où est X ?" par catégorie
    ├── 07_CSS_THEMES.md     → Classes CSS, palette, breakpoints
    ├── 08_BALANCING_HISTORY.md → Décisions balance, formules, git
    └── user-intelligence/   → 10 fichiers profil utilisateur
        ├── user-profile.md
        ├── learned-rules.json   (13 règles R001-R013)
        ├── preferences.json
        ├── coding-preferences.json
        ├── communication-style.json
        ├── recurring-patterns.json
        ├── decision-history.json
        ├── corrections-history.json
        ├── glossary.json
        ├── prompt-patterns.json
        └── engineering-rules.json
```

## Stats rapides
| Fichier     | Lignes | Tokens estimés | Stratégie lecture |
|-------------|--------|----------------|-------------------|
| game.js     | 6735   | ~131k          | grep + offset ciblé UNIQUEMENT |
| data.js     | 1959   | ~38k           | grep ou offset ciblé |
| mechanics.js| 1256   | ~24k           | lisible en entier si besoin |
| index.html  | 597    | ~11k           | lisible en entier |
| style.css   | 975    | ~18k           | grep + ciblé |
| theme.css   | 902    | ~17k           | grep + ciblé |
