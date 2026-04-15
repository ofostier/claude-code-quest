// English chapter content
export const CHAPTERS_CONTENT_EN = {
  1: {
    subtitle: 'The Foundation',
    theory: {
      summary:
        'CLAUDE.md is your contract with Claude. This Markdown file is automatically read at the start of every session.',
      keyPoints: [
        'Automatically read at every session startup',
        'Defines conventions, stack, and behavior',
        'Hierarchy: global (~/.claude/) → project → subdirectory',
        'Can reference other files with @file.md',
      ],
      codeExample: `# My Project

## Stack
- React + Vite
- Tailwind CSS

## Conventions
- Components in PascalCase
- Always async/await

## Never do
- Modify \`src/legacy/\` without warning`,
    },
    challenge: {
      objective: 'Customize the CLAUDE.md to reflect your personal preferences.',
      steps: [
        'Open `CLAUDE.md` at the project root',
        'Add a `## My preferences` section',
        'Add your preferred language for comments (FR/EN)',
        'Add your preferred naming style',
        'Test: open Claude Code and ask it to summarize its instructions',
      ],
      validation: [
        'Section `## My preferences` present in CLAUDE.md',
        'At least 2 personal preferences added',
        'In Claude Code, type: "Summarize your instructions for this project" → Claude mentions your preferences',
      ],
      hint: 'Claude reads the file word for word. Be explicit in your instructions — "always", "never", "prefer" are powerful keywords.',
    },
  },

  2: {
    subtitle: 'Persistent Memory',
    theory: {
      summary:
        "By default, Claude starts fresh every session. Memory is just a folder of text files it reads at startup — if it's written down, it remembers.",
      keyPoints: [
        'Without memory: Claude remembers nothing between sessions',
        'With memory: tell it "remember X", it creates a file',
        'At next startup, it reads that file and "remembers"',
        '`MEMORY.md` is the table of contents — lists what\'s in the folder',
      ],
      codeExamples: {
        basic: `---
name: My profile
description: Who I am and my preferences
type: user
---

My name is Olivier.
I prefer short explanations.
I work with React and Node.js.`,
        advanced: `---
name: Testing preferences
description: How to write tests in this project
type: feedback
---

Always write integration tests, no mocks.

**Why:** mocks hid a migration bug
in production in March 2024.

**How to apply:** use a real PostgreSQL DB
via Docker in dev. See docker-compose.yml.`,
      },
    },
    challenge: {
      objective: 'Create a user profile and test persistence between sessions.',
      steps: [
        'In Claude Code, say: "Create a file .claude/memory/user_profile.md to memorize my profile: [describe yourself]" — specifying the name prevents Claude from writing to an existing file',
        'Verify with `cat .claude/memory/user_profile.md` that the file was created',
        'Run `ls .claude/memory/` to see all files present',
        'Create/update `MEMORY.md` so it lists all files in the folder',
        'In the same or a new session, ask: "What do you know about me?"',
      ],
      validation: [
        'File `MEMORY.md` created and up to date (lists all files in the folder)',
        'File `user_profile.md` created by Claude',
        'Type "What do you know about me?" → Claude answers with your profile without you having explained anything',
      ],
      hint: 'Be precise about what you ask Claude to memorize. "Memorize that I prefer X" works better than "remember X".',
    },
  },

  3: {
    subtitle: 'Custom Commands',
    theory: {
      summary:
        'Skills are Markdown files that define slash commands (/name) that Claude executes on demand.',
      keyPoints: [
        '`.md` files in `.claude/commands/`',
        'Invoked with `/skill-name`',
        'Claude reads and executes the instructions in the file',
        'Can read memory, launch tools, format outputs',
      ],
      codeExample: `---
name: deploy-check
description: Check everything is ready before deploying
---

# /deploy-check

Verify before deploying:
1. Run \`npm test\` — all green?
2. No \`console.log\` in src/
3. .env.example up to date?

Summarize what's ready and what's blocking.`,
    },
    challenge: {
      objective: 'Create your own custom `/my-review` skill.',
      steps: [
        'Create `.claude/commands/my-review.md`',
        'Define a code review with at least one personal rule',
        'Use `/my-review` on a project file',
        'Refine the instructions based on the result',
      ],
      validation: [
        'File `.claude/commands/my-review.md` created',
        'At least one custom rule in the skill',
        'Type `/my-review` in Claude Code → Claude responds with a ✅/⚠️/❌ checklist',
      ],
      hint: 'The best skills have a defined output format (e.g., emojis ✅/⚠️/❌). Claude will follow exactly the format you specify.',
    },
  },

  4: {
    subtitle: 'Automating Behaviors',
    theory: {
      summary: "Hooks automatically run shell commands before/after Claude's actions.",
      keyPoints: [
        '`hooks` works in both files — `mcpServers` only in `settings.json`',
        'Personal hooks (sounds, logs) → `settings.local.json` | Team hooks + MCP → `settings.json`',
        'Events: PreToolUse, PostToolUse, Stop, Notification',
        'Variables: $CLAUDE_TOOL_NAME, $CLAUDE_TOOL_INPUT_*',
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
      objective: "Configure a hook that automatically logs Claude's activity.",
      steps: [
        "Create `.claude/settings.local.json` with a `Stop` hook (local since it's a personal log)",
        'The hook should log the time to `.claude/activity.log`',
        'Restart Claude Code',
        'Ask Claude anything (e.g., "Hello")',
        'Verify with `cat .claude/activity.log` → you should see a line with the timestamp',
      ],
      validation: [
        'File `.claude/settings.local.json` or `settings.json` created with a hook',
        '`cat .claude/activity.log` shows at least one timestamped line',
        'The hook fired without you doing anything manually',
      ],
      hint: "The `Stop` hook fires after every Claude response, regardless of what it does. It's the easiest to test.",
      solution: `// File: .claude/settings.local.json
{
  "hooks": {
    "Stop": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "echo \\"[$(date '+%H:%M:%S')] Claude finished\\" >> .claude/activity.log"
          }
        ]
      }
    ]
  }
}`,
    },
  },

  5: {
    subtitle: 'Mastering Context',
    theory: {
      summary:
        'A Claude Code session maintains persistent context. Knowing how to orchestrate a long session is a key skill.',
      keyPoints: [
        '`claude --continue` resumes the last session',
        '`claude --resume <id>` for a specific session',
        '`claude -p "..."` for non-interactive / scripting mode',
        'You can ask Claude to run multiple tasks at once: "Optimize SQL queries AND improve error messages in parallel"',
      ],
      codeExample: `# Resume a session
claude --continue

# Non-interactive mode
claude -p "Generate tests for src/utils/"

# Pipeline
cat error.log | claude -p "Analyze these errors"`,
    },
    challenge: {
      objective: 'Orchestrate a multi-step task in a single session.',
      steps: [
        'Ask Claude to analyze the architecture and create `docs/ARCHITECTURE.md`',
        'In the same session, ask for 3 improvements based on that analysis',
        'Claude should use session context without re-reading all files',
        'Summarize the session in 3 points',
      ],
      validation: [
        'File `docs/ARCHITECTURE.md` created with content',
        'Claude used session context (did not re-read everything)',
        'Session summary completed',
      ],
      hint: 'Watch whether Claude says "as I saw earlier" or re-reads the file. If it re-reads, ask it to use its context.',
    },
  },

  6: {
    subtitle: 'Extending Capabilities',
    theory: {
      summary:
        'Without MCP, Claude only sees your files. With MCP, it can read your database, create GitHub issues, do web searches... Each service "plugs in" with a command.',
      keyPoints: [
        '❌ Without MCP: Claude works only with your local files',
        '✅ With MCP: Claude accesses GitHub, PostgreSQL, Slack, the web...',
        '`claude mcp add <name> -- <command>` — the official method that works',
        '`claude mcp list` to see active servers · `claude mcp remove <name>` to delete',
      ],
      codeExamples: {
        basic: `# Filesystem — no token required
# In a terminal, from the project:
claude mcp add filesystem -- \\
  npx -y @modelcontextprotocol/server-filesystem .

# Verify:
claude mcp list

# Restart Claude, then ask:
# "What MCP tools do you have available?"
# → Claude lists read_file, list_directory...`,
        advanced: `# GitHub — with access token
claude mcp add github \\
  --env GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxx -- \\
  npx -y @modelcontextprotocol/server-github

# Or with system environment variable (safer):
# In ~/.zshrc: export GITHUB_TOKEN="ghp_xxx"
# Then:
claude mcp add github -- npx -y @modelcontextprotocol/server-github

# In Claude after restart:
# "Are there any open GitHub issues?"
# "Create an issue 'Test MCP'"`,
      },
    },
    challenge: {
      objective: 'Register an MCP server, prove it is active, and use it to explore the project.',
      steps: [
        'In a terminal, from the project: `claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem .`',
        'Verify registration: `claude mcp list` → `filesystem` should appear',
        'Restart Claude Code (`exit` then `claude`)',
        'In Claude Code, ask: "What MCP tools do you have available in this session?"',
        'Test MCP: ask "Find all .jsx files in the project and list them"',
        'Test again: "Are there any console.log statements in the source code?"',
      ],
      validation: [
        '`claude mcp list` shows the `filesystem` server',
        'Claude Code restarted after registration',
        '"What MCP tools do you have?" → Claude mentions `read_file`, `list_directory`, `search_files`...',
        'Claude listed the .jsx files via MCP (not just with its native tools)',
      ],
      hint: 'The `claude mcp add` command writes to `~/.claude.json`. It\'s the only reliable method — manually editing settings.json doesn\'t work with the current CLI.',
    },
  },

  7: {
    subtitle: 'Assembling the Puzzle',
    theory: {
      summary: 'The final challenge: use all the pieces together to build a real feature.',
      keyPoints: [
        'CLAUDE.md guides conventions end to end',
        'Memory adapts explanations to your level',
        'Your /my-review skill validates generated code',
        'Hooks automatically track activity',
      ],
      codeExample: `# The complete synergy

CLAUDE.md     → Conventions enforced automatically
Memory        → Claude knows your level and preferences
Skills        → /my-review validates generated code
Hooks         → Automatic activity log
Session       → Everything in one coherent conversation
MCP (bonus)   → GitHub issue created automatically`,
    },
    challenge: {
      objective: 'Build the "Hall of Fame" page using all the features.',
      steps: [
        'Open Claude Code and reference CLAUDE.md + memory',
        'Generate `src/components/HallOfFame.jsx` with Tailwind',
        'Use `/my-review` on the generated code',
        'Integrate into the app with a `/hall-of-fame` route',
        'Check hook logs in `activity.log`',
        'Update project memory with the decisions made',
      ],
      validation: [
        'HallOfFame.jsx component created and functional',
        'Route /hall-of-fame accessible',
        'Code complies with CLAUDE.md conventions',
        '/my-review skill used and feedback applied',
        'Hooks have logged activities',
        'Project memory updated',
      ],
      hint: 'Start by telling Claude: "Read CLAUDE.md and the project memory. We\'re building HallOfFame." That anchors all the context.',
    },
  },
};
