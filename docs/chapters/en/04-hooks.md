# Piece 4 — Hooks: Automating Behaviors

> **Concept**: Hooks are shell commands that execute automatically
> before or after Claude's actions. They transform Claude into an
> autonomous automation agent.

---

## Theory

### What is a Hook?

A Hook is a shell command that Claude executes automatically at specific moments:

| Event | Trigger |
|-------|---------|
| `PreToolUse` | Before Claude uses a tool (Edit, Read, Bash...) |
| `PostToolUse` | After Claude uses a tool |
| `Stop` | After each Claude response |
| `Notification` | When Claude sends a notification |

### Configuration files

Hooks are configured in JSON files:

```
.claude/
  settings.json        ← Team hooks (versioned in git)
  settings.local.json  ← Personal hooks (in .gitignore)
```

**Important**: `hooks` works in both files. `mcpServers` only works in `settings.json`.

### Hook structure

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write $CLAUDE_TOOL_INPUT_FILE_PATH"
          }
        ]
      }
    ]
  }
}
```

**Available variables**:
- `$CLAUDE_TOOL_NAME` — name of the tool used
- `$CLAUDE_TOOL_INPUT_FILE_PATH` — path of the edited file (for Edit)
- `$CLAUDE_TOOL_INPUT_COMMAND` — command run (for Bash)

### Practical use cases

- **Auto-format**: run Prettier after each Edit
- **Activity log**: log each response to a file
- **Notifications**: macOS notification sound after a long task
- **Validation**: run tests after each file modification

---

## Challenge — Piece 4 to unlock

**Objective**: Configure a hook that automatically logs Claude's activity.

### Steps

1. Create `.claude/settings.local.json` with a `Stop` hook (local since it's personal)
2. The hook should write a timestamp to `.claude/activity.log`
3. Restart Claude Code
4. Ask Claude anything (e.g., "Hello")
5. Verify with `cat .claude/activity.log` → you should see a timestamped line

### Solution

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"[$(date '+%H:%M:%S')] Claude finished\" >> .claude/activity.log"
          }
        ]
      }
    ]
  }
}
```

### Validation

Use `/validate` to have Claude check your work.

**Criteria**:
- [ ] File `.claude/settings.local.json` or `settings.json` created with a hook
- [ ] `cat .claude/activity.log` shows at least one timestamped line
- [ ] The hook fired without you doing anything manually

---

## Going further

- **PostToolUse + Edit** = auto-format with Prettier or ESLint on every save
- **Stop + sound** = audio notification when a long task completes
- Hooks can call any script — Python, Node.js, bash...
- Use `matcher: ".*"` to match all tools, or `matcher: "Edit"` to target only file edits

**Next piece**: Session — Mastering context →
