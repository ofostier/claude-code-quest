# 🧩 Claude Code Quest

> Un parcours interactif pour maîtriser Claude Code, pièce par pièce.

**Claude Code Quest** est un projet formateur qui t'enseigne les fonctionnalités
de Claude Code à travers 7 défis pratiques. Chaque défi débloque une nouvelle
pièce du puzzle et révèle une capacité de Claude Code.

## Ce que tu vas apprendre

| # | Pièce | Fonctionnalité |
|---|-------|----------------|
| 1 | 📋 CLAUDE.md | Instructions persistantes par projet |
| 2 | 🧠 Memory | Mémoire inter-sessions |
| 3 | ⚡ Skills | Commandes slash personnalisées |
| 4 | 🪝 Hooks | Automatisation des comportements |
| 5 | 💬 Session | Orchestration du contexte |
| 6 | 🔌 MCP | Connexion à des services externes |
| 7 | 🏆 Master Build | Tout assembler |

## Installation rapide

```bash
# Prérequis : Node.js 18+, Claude Code installé
git clone https://github.com/TON_USERNAME/claude-code-quest.git
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

## Commandes disponibles dans Claude Code

| Commande | Action |
|----------|--------|
| `/hint` | Indice pour le défi courant |
| `/validate` | Valider ton défi |
| `/progress` | Voir ta progression |

## Structure du projet

```
claude-code-quest/
├── CLAUDE.md                    ← Pièce 1 en action !
├── .claude/
│   ├── memory/progress.md       ← Ta progression
│   └── commands/                ← /hint /validate /progress
├── docs/chapters/               ← Les 7 chapitres détaillés
└── src/                         ← Application React (tableau de bord)
```

## Démarrer

1. Lance `npm run dev`
2. Clique sur **Pièce 1 : CLAUDE.md**
3. Lis la théorie, puis relève le défi
4. Utilise `/validate` dans Claude Code pour débloquer la pièce suivante

---

Durée totale : ~3-4h | Stack : React + Vite + Tailwind CSS

Documentation complète → [docs/INSTALLATION.md](docs/INSTALLATION.md) | [docs/PROGRESSION.md](docs/PROGRESSION.md)
