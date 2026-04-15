# Installation — Claude Code Quest

## Compatibilité OS

| OS | Support | Notes |
|----|---------|-------|
| **macOS** | ✅ Complet | Terminal, VS Code, Desktop |
| **Linux** | ✅ Complet | Terminal, VS Code |
| **Windows** | ⚠️ Via WSL | Installe [WSL2](https://learn.microsoft.com/fr-fr/windows/wsl/install) puis utilise le terminal Ubuntu |

> **Windows** : Claude Code fonctionne nativement sous Windows, mais toutes les commandes
> shell de ce cours supposent un environnement Unix (bash/zsh). Pour une expérience
> identique à macOS/Linux, utilise **WSL2** avec Ubuntu.

---

## Prérequis

| Outil | Version minimale | Vérification |
|-------|-----------------|--------------|
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Claude Code | Dernière version | `claude --version` |
| Git | 2+ | `git --version` |

### Installer Claude Code

```bash
npm install -g @anthropic-ai/claude-code
claude login
```

---

## Installation du projet

```bash
# 1. Cloner le repo
git clone https://github.com/TON_USERNAME/claude-code-quest.git
cd claude-code-quest

# 2. Installer les dépendances
npm install

# 3. Lancer l'application
npm run dev
```

L'application s'ouvre sur `http://localhost:5173`

---

## Lancer Claude Code dans le projet

Claude Code est disponible en **3 modes** — choisis celui que tu préfères.
Dans tous les cas, l'essentiel est que Claude soit **ancré dans le bon répertoire** :
il doit "voir" le dossier `claude-code-quest/` pour lire automatiquement `CLAUDE.md`
et accéder aux skills et à la mémoire du projet.

---

### Option A — Terminal (CLI)

```bash
# Depuis la racine du projet
cd claude-code-quest
claude
```

Claude démarre dans le répertoire courant. Vérifie avec `pwd` que tu es bien
à la racine de `claude-code-quest/` avant de lancer.

---

### Option B — Extension VS Code

1. Installe l'extension **Claude Code** depuis le marketplace VS Code
2. Ouvre le dossier `claude-code-quest/` dans VS Code
   (`Fichier > Ouvrir le dossier...` ou `code claude-code-quest/`)
3. Lance Claude Code via la palette de commandes :
   `Ctrl+Shift+P` → `Claude Code: Open`
   ou clique sur l'icône Claude dans la barre latérale

> **Important** : ouvre bien le dossier `claude-code-quest/` comme **workspace racine**,
> pas un dossier parent. Sinon Claude ne trouve pas `CLAUDE.md`.

---

### Option C — Claude Code Desktop

1. Ouvre l'application **Claude Code Desktop**
2. Clique sur **"Open Folder"** (ou `Fichier > Ouvrir`)
3. Sélectionne le dossier `claude-code-quest/`
4. Le nom du projet doit apparaître dans la barre de titre

> **Important** : si tu as plusieurs projets ouverts, vérifie que `claude-code-quest`
> est bien le projet **actif** (sélectionné dans la liste des workspaces).

---

### Comment vérifier que Claude est bien ancré ?

Dans n'importe quel mode, demande à Claude :

```
Résume tes instructions pour ce projet
```

Il doit répondre en mentionnant les conventions React/Tailwind et le puzzle.
S'il répond de façon générique, c'est qu'il n'a pas lu `CLAUDE.md` —
vérifie le répertoire de travail.

---

## Structure du projet

```
claude-code-quest/
├── CLAUDE.md                    ← Instructions Claude (Pièce 1 !)
├── .claude/
│   ├── memory/                  ← Ta progression et tes préférences
│   │   ├── MEMORY.md            ← Index des mémoires
│   │   └── progress.md          ← Suivi du puzzle
│   └── commands/                ← Tes commandes slash
│       ├── hint.md              ← /hint
│       ├── validate.md          ← /validate
│       └── progress.md          ← /progress
├── docs/
│   ├── INSTALLATION.md          ← Ce fichier
│   ├── PROGRESSION.md           ← Guide de progression
│   └── chapters/                ← Les 7 chapitres détaillés
│       ├── 01-claude-md.md
│       ├── 02-memory.md
│       ├── 03-skills.md
│       ├── 04-hooks.md
│       ├── 05-session.md
│       ├── 06-mcp.md
│       └── 07-master-build.md
└── src/                         ← Application React (le tableau de bord)
```

---

## Premiers pas

1. Lance `npm run dev` et ouvre `http://localhost:5173`
2. Clique sur **Pièce 1 : CLAUDE.md** pour commencer
3. Lis la théorie, essaie la démo
4. Lance Claude Code dans le projet (Terminal, VS Code ou Desktop — voir ci-dessus)
5. Utilise `/hint` si tu es bloqué, `/validate` quand tu penses avoir terminé

> **Important** : Claude Code charge `CLAUDE.md` et les commandes de `.claude/commands/`
> **au démarrage uniquement**. Si tu modifies ces fichiers en cours de session,
> redémarre Claude Code pour que les changements soient pris en compte.
> En terminal : tape `exit` puis relance `claude`.

---

## Résolution de problèmes

**Claude ne lit pas CLAUDE.md ?**
Claude n'est pas ancré dans le bon répertoire. Selon ton mode :
- **Terminal** : `pwd` doit afficher le chemin de `claude-code-quest/`
- **VS Code** : le workspace racine doit être `claude-code-quest/` (pas un dossier parent)
- **Desktop** : vérifie que `claude-code-quest` est le projet actif dans la liste des workspaces

Test rapide dans tous les cas : demande à Claude *"Résume tes instructions pour ce projet"* — il doit citer les conventions React/Tailwind.

**Les commandes `/hint`, `/validate`, `/progress` ne fonctionnent pas ?**
Les commandes sont chargées au démarrage de Claude Code. Deux causes possibles :
- **Session ouverte avant la création des fichiers** → redémarre Claude Code (`exit` puis `claude`)
- **Fichiers absents** → vérifie avec `ls .claude/commands/` que les 3 fichiers `.md` sont présents

**L'app ne se lance pas ?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```
