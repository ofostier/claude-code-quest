# Piece 2 — Memory: Persistent Memory

> **Concept**: By default, Claude starts completely fresh every session.
> Memory is simply a folder of text files that Claude reads at startup.
> If it's written down, Claude remembers it.

---

## Theory

### The memory problem

Every time you open Claude Code, it has **zero context** about your previous work:
- It doesn't know your preferences
- It doesn't remember past decisions
- It doesn't know the project history

### The solution: a memory folder

Claude Code supports a convention: a `.claude/memory/` folder containing structured text files.

At startup, Claude reads these files and "knows" what they contain.

### How to create a memory

Simply ask Claude:
```
Remember that I prefer concise explanations and work with React.
Create a .claude/memory/user_profile.md file with this information.
```

Claude creates the file. Next session, it reads it automatically.

### MEMORY.md — the table of contents

The `MEMORY.md` file at the project root lists what's in the memory folder:

```markdown
# Project Memory

- [User profile](user_profile.md) — Preferences and working style
- [Architecture decisions](architecture.md) — Key choices made
- [Test feedback](test_feedback.md) — Lessons learned from tests
```

### File formats

**Simple profile:**
```yaml
---
name: My profile
description: Who I am and my preferences
type: user
---

My name is [Name].
I prefer short explanations.
I work with React and Node.js.
```

**Detailed technical feedback:**
```yaml
---
name: Testing preferences
description: How to write tests in this project
type: feedback
---

Always write integration tests, no mocks.

**Why:** mocks hid a migration bug
in production in March 2024.

**How to apply:** use a real PostgreSQL DB
via Docker in dev. See docker-compose.yml.
```

---

## Challenge — Piece 2 to unlock

**Objective**: Create a user profile and test persistence between sessions.

### Steps

1. In Claude Code, say: *"Create a `.claude/memory/user_profile.md` file to
   memorize my profile: [describe yourself in 3-4 sentences]"*
2. Verify with `cat .claude/memory/user_profile.md` that the file was created
3. Run `ls .claude/memory/` to see all files present
4. Create/update `MEMORY.md` so it lists all the memory files
5. In the same or a new session, ask: *"What do you know about me?"*

### Validation

Use `/validate` to have Claude check your work.

**Criteria**:
- [ ] File `MEMORY.md` created and up to date (lists all files in the folder)
- [ ] File `user_profile.md` created by Claude
- [ ] Type "What do you know about me?" → Claude answers with your profile

---

## Going further

- Memory files are plain Markdown — edit them directly anytime
- You can create multiple files by topic: `preferences.md`, `architecture.md`, `decisions.md`...
- Claude reads ALL files referenced in `MEMORY.md` at startup

**Next piece**: Skills — Custom slash commands →
