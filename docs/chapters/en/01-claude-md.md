# Piece 1 — CLAUDE.md: The Foundation

> **Concept**: CLAUDE.md is the persistent instruction file that Claude reads
> automatically at every session in a given directory. It is your contract
> with Claude for this project.

---

## Theory

### What is CLAUDE.md?

CLAUDE.md is a Markdown file placed at the root of a project (or in `~/.claude/`
for global instructions). Claude reads it **automatically** at the start of every
conversation in that directory.

It lets you:
- Define project-specific **code conventions**
- Describe the **architecture** so Claude understands the context
- Configure **Claude's behavior** (tone, level of detail, language...)
- Reference other important files

### CLAUDE.md Hierarchy

```
~/.claude/CLAUDE.md          ← Global instructions (all projects)
    ↓
~/project/CLAUDE.md          ← Project instructions (overrides global)
    ↓
~/project/src/CLAUDE.md      ← Subdirectory instructions (optional)
```

> 💻 **Path by OS**
>
> | OS | Global path |
> |-----|------------|
> | macOS | `~/.claude/` = `/Users/<you>/.claude/` |
> | Linux | `~/.claude/` = `/home/<you>/.claude/` |
> | Windows | `%USERPROFILE%\.claude\` = `C:\Users\<you>\.claude\` |
>
> In all examples, `~/` refers to your home directory.

### Concrete example

```markdown
# My API Project

## Stack
- Node.js + Express
- PostgreSQL with Prisma
- Tests with Vitest

## Conventions
- Always use async/await (never callbacks)
- Errors propagate with custom classes in `src/errors/`
- Every endpoint must have an integration test

## Never do
- Never commit secrets or .env
- Do not modify `src/legacy/` without warning
```

### What Claude does with this file

1. It reads it **before** answering any question
2. It adapts its behavior to your conventions
3. It references any mentioned files as needed
4. It respects the defined constraints in all its suggestions

---

## Demo — This project's CLAUDE.md

Open the `CLAUDE.md` file at the root of this project. You'll see that it:
- Defines React/Tailwind code conventions
- Describes the tech stack
- Guides Claude to the right files based on context
- Is itself an example in action!

```bash
cat CLAUDE.md
```

---

## Challenge — Piece 1 to unlock

**Objective**: Customize the project's CLAUDE.md to reflect your preferences.

### Steps

1. Open `CLAUDE.md` at the project root
2. Add a `## My preferences` section with:
   - Your preferred language for comments (FR/EN)
   - Your preferred naming style (camelCase/snake_case)
   - A convention you want Claude to follow
3. Restart Claude Code (`exit` then `claude`), then type exactly:
   ```
   Summarize your instructions for this project
   ```
4. Claude should mention your preferences in its response (e.g., *"you prefer comments in English"*).
   If it answers generically without mentioning them, revisit step 2.

### Validation

Use `/validate` to have Claude check your work.

**Criteria**:
- [ ] Section `## My preferences` present in CLAUDE.md
- [ ] At least 2 personal preferences added
- [ ] Claude read them correctly in a test

---

## Going further

- [Official CLAUDE.md documentation](https://docs.anthropic.com/claude-code)
- You can reference other `.md` files with `@file.md` in your CLAUDE.md
- A CLAUDE.md in `~/.claude/` applies to all your projects

**Next piece**: Memory — How Claude remembers between sessions →
