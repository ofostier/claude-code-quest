# Piece 6 — MCP: Extending Capabilities

> **Concept**: The Model Context Protocol (MCP) lets Claude connect
> to external services: databases, GitHub, Slack, the web...
> Each server extends Claude's capabilities with new tools.

---

## Theory

### Without MCP vs With MCP

| Without MCP | With MCP |
|-------------|----------|
| Reads only your local files | Reads your database, GitHub, Slack... |
| Cannot search the web | Real-time web access |
| Cannot create issues | Creates GitHub issues directly |
| Cannot query an API | Calls any configured MCP service |

### How to add an MCP server

**The only method that works with the current CLI:**

```bash
claude mcp add <server-name> -- <command>
```

This command writes to `~/.claude.json` under `projects.<path>.mcpServers`.

### Management commands

```bash
# List active servers for the current project
claude mcp list

# Remove a server
claude mcp remove <name>

# Get details on a server
claude mcp get <name>
```

### OS Compatibility

| | macOS | Linux | Windows |
|---|---|---|---|
| **Claude Code CLI** | ✅ Terminal / VSCode | ✅ Terminal | ✅ WSL recommended |
| **`claude mcp add`** | ✅ identical | ✅ identical | ✅ in WSL |
| **`~/.claude.json`** | `/Users/<you>/.claude.json` | `/home/<you>/.claude.json` | `C:\Users\<you>\.claude.json` |
| **Env variables** | `~/.zshrc` | `~/.bashrc` | System settings or `$PROFILE` PowerShell |
| **`npx`** | ✅ with Node.js | ✅ with Node.js | ✅ with Node.js |

> 💡 **Windows**: Claude Code works natively, but the shell commands in examples
> assume a Unix environment. On Windows, use **WSL** (Windows Subsystem for Linux)
> for an experience identical to macOS/Linux.

### Example: Filesystem server (no token required)

```bash
# Add the server
claude mcp add filesystem -- \
  npx -y @modelcontextprotocol/server-filesystem .

# Verify it's registered
claude mcp list

# Restart Claude Code, then ask:
# "What MCP tools do you have available?"
# → Claude lists: read_file, write_file, list_directory, search_files...
```

### Example: GitHub server (with token)

```bash
# Method 1: token as environment variable
claude mcp add github \
  --env GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxx -- \
  npx -y @modelcontextprotocol/server-github

# Method 2: token in shell profile (more secure)
# Add to ~/.zshrc or ~/.bashrc:
# export GITHUB_TOKEN="ghp_xxx"

claude mcp add github -- npx -y @modelcontextprotocol/server-github
```

### Important technical note

The `mcpServers` key in `.claude/settings.json` is **silently ignored** by the
current Claude Code CLI. The only reliable method is `claude mcp add`, which
writes to `~/.claude.json`.

---

## Challenge — Piece 6 to unlock

**Objective**: Register an MCP server, prove it's active, and use it to explore the project.

### Steps

1. In a terminal, from the project root:
   ```bash
   claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem .
   ```
2. Verify registration: `claude mcp list` → `filesystem` should appear
3. Restart Claude Code: `exit` then `claude`
4. Ask: *"What MCP tools do you have available in this session?"*
5. Test: *"Find all .jsx files in the project and list them"*
6. Test: *"Are there any console.log statements in the source code?"*

### Validation

Use `/validate` to have Claude check your work.

**Criteria**:
- [ ] `claude mcp list` shows the `filesystem` server
- [ ] Claude Code restarted after registration
- [ ] "What MCP tools do you have?" → Claude mentions `read_file`, `list_directory`, `search_files`...
- [ ] Claude listed the .jsx files via MCP tools

---

## Going further

- [Official MCP servers](https://github.com/modelcontextprotocol/servers) — GitHub, PostgreSQL, Brave Search...
- You can write your own MCP server in TypeScript or Python
- MCP servers run locally — no data is sent to the cloud (unless the server does it explicitly)
- Combine filesystem + GitHub MCP: Claude reads your code AND creates issues automatically

**Next piece**: Master Build — Assemble the complete puzzle →
