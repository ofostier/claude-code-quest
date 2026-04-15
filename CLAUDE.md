# Claude Code Quest — Instructions projet

Ce fichier EST la première leçon. En le lisant, tu apprends déjà comment
fonctionne CLAUDE.md : c'est un fichier d'instructions persistantes que Claude
lit au début de chaque session dans ce répertoire.

## À propos de ce projet

**Claude Code Quest** est un parcours interactif pour maîtriser Claude Code.
L'objectif est de débloquer les 7 pièces du puzzle en pratiquant les fonctionnalités.

## Conventions de code

- React fonctionnel uniquement (pas de classes)
- Tailwind CSS pour les styles (pas de CSS inline sauf cas exceptionnel)
- Noms de fichiers en PascalCase pour les composants
- Pas de `console.log` en production
- Toujours utiliser les hooks personnalisés de `src/hooks/`

## Comportement de Claude dans ce projet

1. Quand l'utilisateur demande d'avancer dans le projet, référence toujours
   le chapitre en cours dans `docs/chapters/`
2. Suggère des défis progressifs adaptés au chapitre débloqué
3. Ne révèle jamais la solution d'un défi avant que l'utilisateur ait essayé
4. Utilise les commandes disponibles dans `.claude/commands/` quand pertinent

## Progression actuelle

Consulte `.claude/memory/progress.md` pour voir où en est l'utilisateur.

## Stack technique

- React 19 + Vite 6
- Tailwind CSS v4
- React Router v7
- Lucide React (icônes)


## Mes préférences
Toujours me parler en français
Les commentaire de code toujours en anglais

---
*Ce CLAUDE.md est lui-même un exemple de Pièce 1 du puzzle.*
