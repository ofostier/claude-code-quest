# Guide de Progression — Claude Code Quest

## Comment progresser

Le parcours est conçu pour être **linéaire mais flexible** :
- Chaque pièce débloque la suivante
- Tu peux revisiter les pièces passées à tout moment
- Les défis sont conçus pour prendre 15-30 minutes chacun

## Commandes disponibles à tout moment

| Commande | Action |
|----------|--------|
| `/hint` | Obtenir un indice pour le défi courant |
| `/validate` | Valider que ton défi est complet |
| `/progress` | Voir toutes tes pièces débloquées |

## Suivi de progression

Ta progression est sauvegardée à deux endroits :
1. **L'application web** (localStorage du navigateur)
2. **La mémoire Claude** (`.claude/memory/progress.md`)

Les deux sont synchronisés manuellement via `/validate`.

## Philosophie d'apprentissage

> "Don't tell me, show me"

Chaque pièce suit le même schéma :
1. **Théorie** — Comprendre le concept (5 min)
2. **Démo** — Voir le concept en action (5 min)
3. **Défi** — Faire soi-même (15-20 min)
4. **Déblocage** — Valider et passer à la suite

## Si tu es bloqué

1. Relis la section **Théorie** du chapitre
2. Utilise `/hint` (3 indices progressifs disponibles)
3. Consulte la documentation officielle liée en bas de chaque chapitre
4. Demande à Claude directement — c'est fait pour ça !

## Chemin recommandé

```
Pièce 1 → Pièce 2 → Pièce 3
   ↓           ↓          ↓
CLAUDE.md  Memory     Skills
(15 min)   (20 min)   (20 min)
              ↓
           Pièce 4 → Pièce 5 → Pièce 6 → Pièce 7
              ↓           ↓          ↓          ↓
           Hooks      Session     MCP      Master
           (20 min)   (25 min)   (30 min)  Build
                                           (45 min)
```

**Durée totale estimée** : 3-4 heures
