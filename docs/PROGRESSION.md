# Guide de Progression — Claude Code Quest

## Ce que tu peux modifier sans risque

Les défis te demandent de modifier des fichiers — c'est voulu. Voici ce qui
est **à toi** et ce qu'il ne faut **pas toucher** :

```
claude-code-quest/
│
├── ✅ CLAUDE.md                ← À toi (Pièce 1)
│
├── ✅ .claude/                 ← À toi (Pièces 2, 3, 4, 6)
│   ├── memory/                 ← Crée tes fichiers mémoire ici
│   ├── commands/               ← Crée tes commandes ici
│   └── settings.json           ← Crée-le pour les hooks et MCP
│
├── ✅ docs/                    ← À toi (Pièce 5 : ARCHITECTURE.md)
│
├── ⚠️  src/                    ← Ne touche pas, sauf Pièce 7
│                                  (HallOfFame.jsx uniquement)
│
└── 🔒 package.json, vite.config.js, etc.   ← Ne pas modifier
```

En résumé : tout ce qui est dans `.claude/` et `CLAUDE.md` t'appartient.
Le code de l'application dans `src/` est hors-scope jusqu'à la Pièce 7.

---

## Filet de sécurité — git

Tout est versionné. Si tu casses quelque chose, tu peux toujours revenir en arrière.

**Voir ce qui a changé :**
```bash
git status          # fichiers modifiés
git diff            # détail des changements
```

**Annuler une modification sur un fichier :**
```bash
git restore CLAUDE.md          # remet CLAUDE.md à son état d'origine
git restore .claude/           # remet tout .claude/ à l'état d'origine
```

**Tout remettre à zéro (état initial du repo) :**
```bash
git restore .
```
> ⚠️ Cette commande efface **toutes** tes modifications non commitées.
> Ta progression dans l'app web (localStorage) n'est pas affectée.

**Sauvegarder ton travail avant d'expérimenter :**
```bash
git add .claude/ CLAUDE.md
git commit -m "sauvegarde pièce X"
```

---

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
