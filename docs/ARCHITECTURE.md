# Architecture — Claude Code Quest

## Vue d'ensemble

Application React single-page (SPA) de parcours pédagogique interactif.
7 chapitres ("pièces") à débloquer séquentiellement en pratiquant Claude Code.

---

## Stack

| Outil | Version | Rôle |
|-------|---------|------|
| React | 19 | UI composants fonctionnels |
| Vite | 8 | Bundler + dev server |
| Tailwind CSS | v4 | Styles utilitaires |
| React Router | v7 | Routing SPA |
| Lucide React | latest | Icônes |

---

## Structure des fichiers

```
src/
├── main.jsx                  # Point d'entrée — monte App dans le DOM
├── App.jsx                   # Router + orchestration de la progression
├── index.css                 # Variables CSS globales + base Tailwind
│
├── components/
│   ├── Header.jsx            # Barre supérieure avec compteur de progression
│   ├── PuzzleBoard.jsx       # Page d'accueil — grille des 7 pièces
│   ├── PuzzlePiece.jsx       # Carte individuelle d'une pièce (locked/unlocked/done)
│   └── ChapterView.jsx       # Vue détaillée d'un chapitre (théorie + défi)
│
├── hooks/
│   └── useProgress.js        # Hook — état de progression + localStorage
│
└── data/
    └── chapters.js           # Source de vérité — données des 7 chapitres
```

---

## Flux de données

```
chapters.js (données statiques)
      ↓
useProgress (état + localStorage)
      ↓
App.jsx (routing + props drilling)
      ↓
PuzzleBoard ──→ PuzzlePiece (×7)
ChapterView (théorie + défi + validation)
```

### `useProgress.js` — état central

Gère toute la logique de progression via `localStorage` (clé `ccq_progress`) :

```js
{ completed: [1, 2, 3], current: 4 }
```

Expose :
- `isUnlocked(id)` — vrai si `id === 1` ou si `id - 1` est complété
- `isCompleted(id)` — vrai si `id` est dans `completed`
- `completeChapter(id)` — ajoute à `completed`, avance `current`
- `resetProgress()` — remet à zéro

### `chapters.js` — source de vérité

Tableau de 7 objets avec pour chaque chapitre :
- Métadonnées visuelles (`gradient`, `borderColor`, `glowColor`)
- `theory` — résumé + points clés + exemple de code
- `challenge` — objectif + étapes + validation + indice (+ solution optionnelle)

---

## Routing

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | `PuzzleBoard` | Grille d'accueil des 7 pièces |
| `/chapter/:slug` | `ChapterPage` → `ChapterView` | Détail d'un chapitre |

Le slug correspond au champ `slug` dans `chapters.js` (ex: `claude-md`, `memory`).

---

## Système Claude Code (hors src/)

```
.claude/
├── commands/           # Skills (commandes /slash)
│   ├── validate.md
│   ├── hint.md
│   ├── progress.md
│   └── my-review.md
├── memory/             # Mémoire persistante entre sessions
│   ├── MEMORY.md       # Table des matières de la mémoire
│   ├── progress.md     # Progression utilisateur
│   ├── user_profile.md # Profil et préférences
│   ├── feedback_testing.md
│   └── feedback_git.md
├── settings.local.json # Hooks personnels (non commité)
└── activity.log        # Log auto des réponses Claude (via hook Stop)

docs/
└── chapters/           # Documentation détaillée de chaque pièce
    ├── 01-claude-md.md
    ├── 02-memory.md
    └── ...
```

---

## Points d'amélioration possibles

1. **Pas de tests** — aucun script `test` dans `package.json`
2. **Props drilling** — la progression est passée manuellement de `App` vers les composants enfants ; un contexte React simplifierait ça
3. **`console.log` en production** — présence dans `src/data/chapters.js` à supprimer
4. **Données statiques** — `chapters.js` est en dur ; une source externe (JSON, CMS) faciliterait les mises à jour de contenu
