# Piece 5 — Session: Mastering Context

> **Concept**: A Claude Code session maintains persistent context throughout
> a conversation. Knowing how to start, resume, and orchestrate a session
> is a key skill for complex tasks.

---

## Theory

### What is a session?

A session is a conversation with Claude Code that maintains context:
- Claude remembers everything said earlier in the session
- No need to re-explain the context with each message
- Long tasks can span multiple exchanges

### Essential commands

```bash
# Start a new session
claude

# Resume the last session (context preserved)
claude --continue

# Resume a specific session by ID
claude --resume <session-id>

# Non-interactive mode (for scripts/pipelines)
claude -p "Your question here"
```

### Non-interactive mode with `-p`

The `-p` flag allows using Claude in scripts:

```bash
# Generate tests automatically
claude -p "Generate Vitest tests for src/utils/format.js"

# Analyze a log file
cat error.log | claude -p "Analyze these errors and suggest fixes"

# Pipeline with multiple steps
git diff HEAD~1 | claude -p "Summarize the changes in this diff"
```

### Parallel tasks in a session

Claude can handle multiple tasks simultaneously in one session:

```
"Optimize SQL queries AND improve error messages in parallel.
 Report when both are done."
```

This is more efficient than running tasks sequentially — Claude
maintains context across both tasks simultaneously.

### Context management

When a session becomes long:
- Ask Claude to summarize what's been done: "Summarize the session in 3 points"
- Reference earlier context: "Based on the analysis we did earlier..."
- Claude can re-read files if needed, but usually uses its context

---

## Challenge — Piece 5 to unlock

**Objective**: Orchestrate a multi-step task in a single session.

### Steps

1. Ask Claude to analyze the project architecture and create `docs/ARCHITECTURE.md`
2. **In the same session**, ask for 3 concrete improvement suggestions based on that analysis
3. Claude should reference its earlier analysis without re-reading everything
4. Ask Claude to summarize the session in 3 bullet points

### Validation

Use `/validate` to have Claude check your work.

**Criteria**:
- [ ] File `docs/ARCHITECTURE.md` created with content
- [ ] Claude referenced its earlier analysis (not re-read everything)
- [ ] Session summary completed

---

## Going further

- Use `claude --continue` to resume work the next day without losing context
- Session IDs are stored in `~/.claude/projects/` — you can list them
- For repetitive automation: combine `-p` mode with cron or a Makefile
- An agent launched with `claude` can itself spawn sub-sessions

**Next piece**: MCP — Extend Claude's capabilities →
