# Règles du projet PokéQuest

## Mémoire persistante
Toujours consulter `.project-memory/MAP_QUICKREF.md` en premier avant d'ouvrir un fichier source.
Ne jamais lire game.js en entier (6735L / 131k tokens) — utiliser grep + offset ciblé uniquement.

## Compact obligatoire après chaque tâche
À la fin de chaque réponse qui complète une tâche (modification de fichier, génération de système,
installation de skill, analyse, etc.), terminer la réponse par la ligne suivante, seule sur sa ligne :

```
→ /compact
```

Cela rappelle à l'utilisateur de lancer /compact pour compresser le contexte et économiser des tokens.

## Règles de travail
- Répondre en français uniquement
- Ne pas sur-expliquer — l'utilisateur est expert JS
- Livrer des systèmes complets, jamais d'ébauches
- Ne jamais lancer d'agents ou d'étapes optionnelles sans confirmation explicite (R013)
- Mettre à jour .project-memory/ après chaque modification de fichier source
