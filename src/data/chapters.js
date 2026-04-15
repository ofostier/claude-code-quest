export const CHAPTERS = [
  {
    id: 1,
    slug: 'claude-md',
    title: 'CLAUDE.md',
    subtitle: 'La Fondation',
    icon: '📋',
    gradient: 'from-blue-500 to-cyan-500',
    color: 'blue',
    borderColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    duration: '~15 min',
    theory: {
      summary: 'CLAUDE.md est ton contrat avec Claude. Ce fichier Markdown est lu automatiquement à chaque session.',
      keyPoints: [
        'Lu automatiquement à chaque ouverture de session',
        'Définit les conventions, la stack, le comportement',
        'Hiérarchie : global (~/.claude/) → projet → sous-dossier',
        'Peut référencer d\'autres fichiers avec @fichier.md',
      ],
      codeExample: `# Mon Projet

## Stack
- React + Vite
- Tailwind CSS

## Conventions
- Composants en PascalCase
- Toujours async/await

## À ne jamais faire
- Modifier \`src/legacy/\` sans avertissement`,
    },
    challenge: {
      objective: 'Personnaliser le CLAUDE.md pour qu\'il reflète tes préférences personnelles.',
      steps: [
        'Ouvre `CLAUDE.md` à la racine du projet',
        'Ajoute une section `## Mes préférences`',
        'Ajoute ta langue préférée pour les commentaires (FR/EN)',
        'Ajoute ton style de nommage préféré',
        'Teste : ouvre Claude Code et demande-lui de résumer ses instructions',
      ],
      validation: [
        'Section `## Mes préférences` présente dans CLAUDE.md',
        'Au moins 2 préférences personnelles ajoutées',
        'Dans Claude Code, taper : "Résume tes instructions pour ce projet" → Claude cite tes préférences',
      ],
      hint: 'Claude lit le fichier mot pour mot. Sois explicite dans tes instructions — "toujours", "jamais", "préférer" sont des mots-clés puissants.',
    },
  },
  {
    id: 2,
    slug: 'memory',
    title: 'Memory',
    subtitle: 'La Mémoire Persistante',
    icon: '🧠',
    gradient: 'from-emerald-500 to-teal-500',
    color: 'emerald',
    borderColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    duration: '~20 min',
    theory: {
      summary: 'Par défaut, Claude repart de zéro à chaque session. La mémoire, c\'est juste un dossier de fichiers texte qu\'il lit au démarrage — si c\'est écrit, il s\'en souvient.',
      keyPoints: [
        'Sans mémoire : Claude ne se souvient de rien d\'une session à l\'autre',
        'Avec mémoire : tu lui dis "souviens-toi de X", il crée un fichier',
        'Au prochain démarrage, il lit ce fichier et "se souvient"',
        '`MEMORY.md` est la table des matières — liste ce qu\'il y a dans le dossier',
      ],
      codeExamples: {
        basic:
`---
name: Mon profil
description: Qui je suis et mes préférences
type: user
---

Je m'appelle Olivier.
Je préfère les explications courtes.
Je travaille avec React et Node.js.`,
        advanced:
`---
name: Préférences de test
description: Comment écrire les tests dans ce projet
type: feedback
---

Toujours écrire des tests d'intégration, pas de mocks.

**Pourquoi :** les mocks ont masqué un bug de migration
en production en mars 2024.

**Comment appliquer :** utiliser une vraie DB PostgreSQL
via Docker en dev. Voir docker-compose.yml.`,
      },
    },
    challenge: {
      objective: 'Créer un profil utilisateur et tester la persistance entre sessions.',
      steps: [
        'Dans Claude Code, dis : "Crée un fichier .claude/memory/user_profile.md pour mémoriser mon profil : [décris-toi]" — préciser le nom évite que Claude écrive dans un fichier existant',
        'Vérifie avec `cat .claude/memory/user_profile.md` que le fichier a bien été créé',
        'Fais `ls .claude/memory/` pour voir tous les fichiers présents',
        'Crée/mets à jour `MEMORY.md` pour qu\'il liste tous les fichiers du dossier',
        'Dans la même session ou une nouvelle, demande : "Qu\'est-ce que tu sais sur moi ?"',
      ],
      validation: [
        'Fichier `MEMORY.md` créé et à jour (liste tous les fichiers du dossier)',
        'Fichier `user_profile.md` créé par Claude',
        'Taper "Qu\'est-ce que tu sais sur moi ?" → Claude répond avec ton profil sans que tu aies rien expliqué',
      ],
      hint: 'Sois précis dans ce que tu demandes à Claude de mémoriser. "Mémorise que je préfère X" fonctionne mieux que "souviens-toi de X".',
    },
  },
  {
    id: 3,
    slug: 'skills',
    title: 'Skills',
    subtitle: 'Commandes Personnalisées',
    icon: '⚡',
    gradient: 'from-yellow-500 to-orange-500',
    color: 'yellow',
    borderColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    duration: '~20 min',
    theory: {
      summary: 'Les Skills sont des fichiers Markdown qui définissent des commandes slash (/nom) que Claude exécute à la demande.',
      keyPoints: [
        'Fichiers `.md` dans `.claude/commands/`',
        'Invoqués avec `/nom-du-skill`',
        'Claude lit et exécute les instructions du fichier',
        'Peuvent lire la mémoire, lancer des outils, formater des sorties',
      ],
      codeExample: `---
name: deploy-check
description: Vérifie que tout est prêt avant deploy
---

# /deploy-check

Vérifie avant de déployer :
1. Lance \`npm test\` — tous verts ?
2. Pas de \`console.log\` dans src/
3. .env.example à jour ?

Résume ce qui est prêt et ce qui bloque.`,
    },
    challenge: {
      objective: 'Créer ton propre skill `/my-review` personnalisé.',
      steps: [
        'Crée `.claude/commands/my-review.md`',
        'Définis une revue de code avec au moins une règle personnelle',
        'Utilise `/my-review` sur un fichier du projet',
        'Affine les instructions selon le résultat',
      ],
      validation: [
        'Fichier `.claude/commands/my-review.md` créé',
        'Au moins une règle personnalisée dans le skill',
        'Taper `/my-review` dans Claude Code → Claude répond avec une liste de points ✅/⚠️/❌',
      ],
      hint: 'Les meilleurs skills ont un format de sortie défini (ex: emojis ✅/⚠️/❌). Claude suivra exactement le format que tu spécifies.',
    },
  },
  {
    id: 4,
    slug: 'hooks',
    title: 'Hooks',
    subtitle: 'Automatiser les Comportements',
    icon: '🪝',
    gradient: 'from-red-500 to-pink-500',
    color: 'red',
    borderColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    duration: '~20 min',
    theory: {
      summary: 'Les Hooks exécutent des commandes shell automatiquement avant/après les actions de Claude.',
      keyPoints: [
        '`hooks` fonctionne dans les deux fichiers — `mcpServers` uniquement dans `settings.json`',
        'Hooks perso (sons, logs) → `settings.local.json` | Hooks équipe + MCP → `settings.json`',
        'Événements : PreToolUse, PostToolUse, Stop, Notification',
        'Variables : $CLAUDE_TOOL_NAME, $CLAUDE_TOOL_INPUT_*',
      ],
      codeExample: `{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit",
      "hooks": [{
        "type": "command",
        "command": "prettier --write $CLAUDE_TOOL_INPUT_FILE_PATH"
      }]
    }]
  }
}`,
    },
    challenge: {
      objective: 'Configurer un hook qui logge automatiquement l\'activité de Claude.',
      steps: [
        'Crée `.claude/settings.local.json` avec un hook `Stop` (local car c\'est un log personnel)',
        'Le hook doit logger l\'heure dans `.claude/activity.log`',
        'Redémarre Claude Code',
        'Demande n\'importe quoi à Claude (ex: "Bonjour")',
        'Vérifie avec `cat .claude/activity.log` → tu dois voir une ligne avec l\'heure',
      ],
      validation: [
        'Fichier `.claude/settings.local.json` ou `settings.json` créé avec un hook',
        '`cat .claude/activity.log` affiche au moins une ligne horodatée',
        'Le hook s\'est déclenché sans que tu aies rien fait manuellement',
      ],
      hint: 'Le hook `Stop` se déclenche après chaque réponse de Claude, peu importe ce qu\'il fait. C\'est le plus facile à tester.',
      solution: `// Fichier : .claude/settings.local.json
{
  "hooks": {
    "Stop": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "echo \\"[$(date '+%H:%M:%S')] Claude a terminé\\" >> .claude/activity.log"
          }
        ]
      }
    ]
  }
}`,
    },
  },
  {
    id: 5,
    slug: 'session',
    title: 'Session',
    subtitle: 'Maîtriser le Contexte',
    icon: '💬',
    gradient: 'from-violet-500 to-purple-500',
    color: 'violet',
    borderColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    duration: '~25 min',
    theory: {
      summary: 'Une session Claude Code maintient un contexte persistant. Savoir orchestrer une session longue est une compétence clé.',
      keyPoints: [
        '`claude --continue` reprend la dernière session',
        '`claude --resume <id>` pour une session spécifique',
        '`claude -p "..."` pour le mode non-interactif / scripts',
        'Tu peux demander à Claude de lancer plusieurs tâches en même temps : "Optimise les requêtes SQL ET améliore les messages d\'erreur en parallèle"',
      ],
      codeExample: `# Reprendre une session
claude --continue

# Mode non-interactif
claude -p "Génère les tests pour src/utils/"

# Pipeline
cat error.log | claude -p "Analyse ces erreurs"`,
    },
    challenge: {
      objective: 'Orchestrer une tâche multi-étapes en une seule session.',
      steps: [
        'Demande à Claude d\'analyser l\'architecture et créer `docs/ARCHITECTURE.md`',
        'Dans la même session, demande 3 améliorations basées sur cette analyse',
        'Claude doit utiliser le contexte sans relire tous les fichiers',
        'Résume la session en 3 points',
      ],
      validation: [
        'Fichier `docs/ARCHITECTURE.md` créé avec du contenu',
        'Claude a utilisé le contexte session (pas tout relu)',
        'Résumé de session effectué',
      ],
      hint: 'Observe si Claude dit "comme je l\'ai vu précédemment" ou relit le fichier. S\'il relit, demande-lui d\'utiliser son contexte.',
    },
  },
  {
    id: 6,
    slug: 'mcp',
    title: 'MCP',
    subtitle: 'Étendre les Capacités',
    icon: '🔌',
    gradient: 'from-cyan-500 to-blue-500',
    color: 'cyan',
    borderColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    duration: '~30 min',
    theory: {
      summary: 'Sans MCP, Claude ne voit que tes fichiers. Avec MCP, il peut lire ta base de données, créer des issues GitHub, faire des recherches web... Chaque service se "branche" avec une commande.',
      keyPoints: [
        '❌ Sans MCP : Claude travaille uniquement avec tes fichiers locaux',
        '✅ Avec MCP : Claude accède à GitHub, PostgreSQL, Slack, le web...',
        '`claude mcp add <nom> -- <commande>` — la méthode officielle qui fonctionne',
        '`claude mcp list` pour voir les serveurs actifs · `claude mcp remove <nom>` pour supprimer',
      ],
      codeExamples: {
        basic:
`# Filesystem — aucun token requis
# Dans un terminal, depuis le projet :
claude mcp add filesystem -- \\
  npx -y @modelcontextprotocol/server-filesystem .

# Vérifier :
claude mcp list

# Redémarre Claude, puis demande :
# "Quels outils MCP as-tu disponibles ?"
# → Claude liste read_file, list_directory...`,
        advanced:
`# GitHub — avec token d'accès
claude mcp add github \\
  --env GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxx -- \\
  npx -y @modelcontextprotocol/server-github

# Ou avec variable d'environnement système (plus sûr) :
# Dans ~/.zshrc : export GITHUB_TOKEN="ghp_xxx"
# Puis :
claude mcp add github -- npx -y @modelcontextprotocol/server-github

# Dans Claude après redémarrage :
# "Y a-t-il des issues GitHub ouvertes ?"
# "Crée une issue 'Test MCP'"`,
      },
    },
    challenge: {
      objective: 'Enregistrer un serveur MCP et prouver qu\'il est actif dans une session.',
      steps: [
        'Dans un terminal, depuis le projet : `claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem .`',
        'Vérifie l\'enregistrement : `claude mcp list` → `filesystem` doit apparaître',
        'Redémarre Claude Code (`exit` puis `claude`)',
        'Dans Claude Code, demande : "Quels outils MCP as-tu disponibles dans cette session ?"',
      ],
      validation: [
        '`claude mcp list` affiche le serveur `filesystem`',
        'Claude Code redémarré après l\'enregistrement',
        'Demander "Quels outils MCP as-tu ?" → Claude mentionne `read_file`, `list_directory`...',
      ],
      hint: 'La commande `claude mcp add` écrit dans `~/.claude.json`. C\'est la seule méthode fiable — éditer settings.json manuellement ne fonctionne pas avec le CLI actuel.',
    },
  },
  {
    id: 7,
    slug: 'master-build',
    title: 'Master Build',
    subtitle: 'Assembler le Puzzle',
    icon: '🏆',
    gradient: 'from-amber-400 to-yellow-300',
    color: 'amber',
    borderColor: '#f59e0b',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    duration: '~45 min',
    theory: {
      summary: 'Le défi final : utiliser toutes les pièces ensemble pour construire une vraie fonctionnalité.',
      keyPoints: [
        'CLAUDE.md guide les conventions de bout en bout',
        'Memory adapte les explications à ton niveau',
        'Ton Skill /my-review valide le code généré',
        'Les Hooks tracent automatiquement l\'activité',
      ],
      codeExample: `# La synergie complète

CLAUDE.md     → Conventions respectées automatiquement
Memory        → Claude connaît ton niveau et tes préférences
Skills        → /my-review valide le code généré
Hooks         → Activity log automatique
Session       → Tout en une conversation cohérente
MCP (bonus)   → Issue GitHub créée automatiquement`,
    },
    challenge: {
      objective: 'Construire la page "Hall of Fame" en utilisant toutes les fonctionnalités.',
      steps: [
        'Ouvre Claude Code et référence CLAUDE.md + mémoire',
        'Génère `src/components/HallOfFame.jsx` avec Tailwind',
        'Utilise `/my-review` sur le code généré',
        'Intègre dans l\'app avec une route `/hall-of-fame`',
        'Vérifie les logs du hook dans `activity.log`',
        'Mets à jour la mémoire projet avec les décisions prises',
      ],
      validation: [
        'Composant HallOfFame.jsx créé et fonctionnel',
        'Route /hall-of-fame accessible',
        'Code conforme aux conventions CLAUDE.md',
        'Skill /my-review utilisé et retours appliqués',
        'Hooks ont loggé les activités',
        'Mémoire projet mise à jour',
      ],
      hint: 'Commence par dire à Claude : "Lis CLAUDE.md et la mémoire du projet. Nous construisons HallOfFame." Ça ancre tout le contexte.',
    },
  },
];

export const getChapter = (slug) => CHAPTERS.find((c) => c.slug === slug);
export const getNextChapter = (id) => CHAPTERS.find((c) => c.id === id + 1);
