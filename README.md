# 🧩 Claude Code Quest

**[English](#english) | [Français](#français)**

---

<a name="english"></a>
## 🇬🇧 English

> An interactive puzzle to master Claude Code, piece by piece.

**Claude Code Quest** is a hands-on tutorial that teaches Claude Code features
through 7 practical challenges. Each challenge unlocks a new puzzle piece and
reveals a Claude Code capability.

### What you'll learn

| # | Piece | Feature |
|---|-------|---------|
| 1 | 📋 CLAUDE.md | Persistent project instructions |
| 2 | 🧠 Memory | Cross-session memory |
| 3 | ⚡ Skills | Custom slash commands |
| 4 | 🪝 Hooks | Automating behaviors |
| 5 | 💬 Session | Context orchestration |
| 6 | 🔌 MCP | Connecting to external services |
| 7 | 🏆 Master Build | Putting it all together |

### Quick start

```bash
# Prerequisites: Node.js 18+, Claude Code installed
git clone https://github.com/ofostier/claude-code-quest.git
cd claude-code-quest
npm install
npm run dev
```

Open `http://localhost:5173` — the puzzle dashboard appears.

In another terminal, launch Claude Code:
```bash
claude
```

Claude will automatically read `CLAUDE.md` and know the project context.

### Available commands in Claude Code

| Command | Action |
|---------|--------|
| `/hint` | Get a hint for the current challenge |
| `/validate` | Validate your challenge |
| `/progress` | View your progress |

### Project structure

```
claude-code-quest/
├── CLAUDE.md                    ← Piece 1 in action!
├── .claude/
│   ├── memory/progress.md       ← Your progress
│   └── commands/                ← /hint /validate /progress
├── docs/chapters/               ← 7 detailed chapters (EN + FR)
└── src/                         ← React dashboard app
```

### Getting started

1. Run `npm run dev`
2. Click **Piece 1: CLAUDE.md**
3. Read the theory, then take on the challenge
4. Use `/validate` in Claude Code to unlock the next piece

---

Total duration: ~3-4h | Stack: React + Vite + Tailwind CSS

---

<a name="français"></a>
## 🇫🇷 Français

> Un parcours interactif pour maîtriser Claude Code, pièce par pièce.

**Claude Code Quest** est un projet formateur qui t'enseigne les fonctionnalités
de Claude Code à travers 7 défis pratiques. Chaque défi débloque une nouvelle
pièce du puzzle et révèle une capacité de Claude Code.

### Ce que tu vas apprendre

| # | Pièce | Fonctionnalité |
|---|-------|----------------|
| 1 | 📋 CLAUDE.md | Instructions persistantes par projet |
| 2 | 🧠 Memory | Mémoire inter-sessions |
| 3 | ⚡ Skills | Commandes slash personnalisées |
| 4 | 🪝 Hooks | Automatisation des comportements |
| 5 | 💬 Session | Orchestration du contexte |
| 6 | 🔌 MCP | Connexion à des services externes |
| 7 | 🏆 Master Build | Tout assembler |

### Installation rapide

```bash
# Prérequis : Node.js 18+, Claude Code installé
git clone https://github.com/ofostier/claude-code-quest.git
cd claude-code-quest
npm install
npm run dev
```

Ouvre `http://localhost:5173` — le tableau de bord puzzle s'affiche.

Dans un autre terminal, lance Claude Code :
```bash
claude
```

Claude lira automatiquement `CLAUDE.md` et connaîtra le contexte du projet.

### Commandes disponibles dans Claude Code

| Commande | Action |
|----------|--------|
| `/hint` | Indice pour le défi courant |
| `/validate` | Valider ton défi |
| `/progress` | Voir ta progression |

### Structure du projet

```
claude-code-quest/
├── CLAUDE.md                    ← Pièce 1 en action !
├── .claude/
│   ├── memory/progress.md       ← Ta progression
│   └── commands/                ← /hint /validate /progress
├── docs/chapters/               ← Les 7 chapitres détaillés (FR + EN)
└── src/                         ← Application React (tableau de bord)
```

### Démarrer

1. Lance `npm run dev`
2. Clique sur **Pièce 1 : CLAUDE.md**
3. Lis la théorie, puis relève le défi
4. Utilise `/validate` dans Claude Code pour débloquer la pièce suivante

---

Durée totale : ~3-4h | Stack : React + Vite + Tailwind CSS
