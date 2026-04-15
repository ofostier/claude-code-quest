# Piece 3 — Skills: Custom Commands

> **Concept**: Skills are Markdown files that define slash commands (`/name`)
> that Claude executes on demand. You write the instructions once,
> then invoke them with a simple command.

---

## Theory

### What is a Skill?

A Skill is a `.md` file placed in `.claude/commands/`. When you type `/skill-name`
in Claude Code, Claude reads that file and follows its instructions.

### File structure

```
.claude/
  commands/
    my-review.md       ← invoked with /my-review
    deploy-check.md    ← invoked with /deploy-check
    explain.md         ← invoked with /explain
```

### Anatomy of a Skill

```markdown
---
name: deploy-check
description: Check everything is ready before deploying
---

# /deploy-check

Verify before deploying:
1. Run `npm test` — all green?
2. No `console.log` in src/
3. .env.example up to date?

Summarize what's ready and what's blocking.
```

The YAML frontmatter (`---`) is optional but recommended for IDE auto-completion.

### Why use Skills?

| Without Skills | With Skills |
|----------------|-------------|
| Re-type the same instructions every time | One slash command does it all |
| Inconsistent behavior | Identical output every time |
| Instructions forgotten between sessions | Persistent in a versioned file |

### Tips for effective Skills

- **Define the output format explicitly**: if you want emojis ✅/⚠️/❌, say so
- **Be specific**: "Check imports in the current file" is better than "check code"
- **Skills can reference memory**: "Check consistency with conventions in MEMORY.md"

---

## Challenge — Piece 3 to unlock

**Objective**: Create your own custom `/my-review` skill.

### Steps

1. Create `.claude/commands/my-review.md`
2. Define a code review with at least one personal rule (example: "no `var`, only `const`/`let`")
3. Use `/my-review` on a project file (example: `src/App.jsx`)
4. Refine the instructions based on the result

### Example Skill

```markdown
---
name: my-review
description: Personal code review
---

# /my-review

Review the current file and check:

1. **No `var`** — only `const` or `let`
2. **No `console.log`** left in code
3. **Named functions** — no anonymous arrow functions
4. **Useful comments** — no "self-evident" comments

Output format for each point:
✅ OK — [brief explanation]
⚠️ Warning — [what to fix]
❌ Error — [what's wrong and how to fix it]
```

### Validation

Use `/validate` to have Claude check your work.

**Criteria**:
- [ ] File `.claude/commands/my-review.md` created
- [ ] At least one custom rule in the Skill
- [ ] Type `/my-review` in Claude Code → Claude responds with a ✅/⚠️/❌ checklist

---

## Going further

- Skills can receive arguments: `/explain src/utils/format.js`
- You can create skills for repetitive tasks: `/standup`, `/changelog`, `/translate`
- Skills are versioned in git — share them with your team

**Next piece**: Hooks — Automate behaviors →
