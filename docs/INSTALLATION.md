# Installation — Claude Code Quest

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

```bash
# Depuis la racine du projet
claude
```

Claude va automatiquement lire `CLAUDE.md` et connaître le contexte du projet.

---

## Structure du projet

```
claude-code-quest/
├── CLAUDE.md                    ← Instructions Claude (Pièce 1 !)
├── .claude/
│   ├── memory/                  ← Ta progression et tes préférences
│   │   ├── MEMORY.md            ← Index des mémoires
│   │   └── progress.md          ← Suivi du puzzle
│   └── skills/                  ← Tes commandes slash
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
4. Ouvre un terminal et lance `claude` dans le répertoire du projet
5. Utilise `/hint` si tu es bloqué, `/validate` quand tu penses avoir terminé

---

## Résolution de problèmes

**Claude ne lit pas CLAUDE.md ?**
Vérifiez que Claude Code est lancé depuis la racine du projet : `pwd` doit afficher le chemin du projet.

**Les skills `/hint` ne fonctionnent pas ?**
Vérifiez que les fichiers `.claude/skills/` existent. Claude Code les charge au démarrage.

**L'app ne se lance pas ?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```
