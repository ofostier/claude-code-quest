# Piece 7 — Master Build: Assembling the Puzzle

> **Concept**: The final challenge. You now master all 7 pieces.
> Time to combine them to build a real feature from scratch,
> with Claude as your full AI assistant.

---

## Theory

### The complete synergy

Each piece on its own is already powerful. Combined, they form a workflow
where Claude becomes a true development partner:

```
CLAUDE.md     → Conventions enforced automatically
Memory        → Claude knows your level and preferences
Skills        → /my-review validates generated code
Hooks         → Automatic activity log
Session       → Everything in one coherent conversation
MCP (bonus)   → GitHub issue created automatically
```

### How to start a Master Build session

The key is to anchor context right from the start:

```
"Read CLAUDE.md and the project memory files.
 I want to build the HallOfFame feature.
 Start by summarizing what you know about this project."
```

Claude will then:
1. Read CLAUDE.md (conventions, stack)
2. Read memory files (your preferences, past decisions)
3. Work respecting all established conventions

### Validate with /my-review

After each generated file:
```
/my-review
```

Claude runs your personal code review and flags any deviations from your standards.

### Track with Hooks

Your `Stop` hook (from Piece 4) logs each interaction automatically.
At the end, `cat .claude/activity.log` shows the complete session history.

### Update memory after the build

At the end, ask Claude:
```
"Update the project memory with the decisions we made
 during this session."
```

This ensures the next Claude session (and the next developer) benefits
from this knowledge.

---

## Challenge — Piece 7 to unlock

**Objective**: Build the "Hall of Fame" page using all the features.

### What to build

The `/hall-of-fame` route currently shows a placeholder. Your mission:
replace it with a real functional component that displays the puzzle completion.

### Steps

1. **Anchor context**: tell Claude to read CLAUDE.md and memory files
2. **Generate** `src/components/HallOfFame.jsx` with Tailwind CSS
3. **Validate** with `/my-review` and apply feedback
4. **Integrate** into `App.jsx` with the `/hall-of-fame` route
5. **Verify hooks**: `cat .claude/activity.log`
6. **Update memory**: ask Claude to document the decisions made

### Inspiration for HallOfFame

- Display the 7 puzzle pieces with their completion status
- Show the user's stats (time, attempts...)
- Add an animation when all pieces are complete
- Include a "Share" button for social media

### Validation

Use `/validate` to have Claude check your work.

**Criteria**:
- [ ] `HallOfFame.jsx` component created and functional
- [ ] Route `/hall-of-fame` accessible and replaces the placeholder
- [ ] Code complies with CLAUDE.md conventions
- [ ] `/my-review` skill used and feedback applied
- [ ] Hooks have logged activities in `activity.log`
- [ ] Project memory updated with decisions made

---

## Congratulations! 🏆

🧩 🧩 🧩 🧩 🧩 🧩 🧩

You've mastered all 7 Claude Code features:
1. **CLAUDE.md** — Persistent instructions
2. **Memory** — Context between sessions
3. **Skills** — Custom commands
4. **Hooks** — Automated behaviors
5. **Session** — Context orchestration
6. **MCP** — Extended capabilities
7. **Master Build** — The complete workflow

You now have all the tools to work with Claude Code like a pro.
The best way to deepen this mastery: use these features on your real projects.

---

## Going further

- Build more Skills for your recurring tasks
- Explore the [official MCP server catalog](https://github.com/modelcontextprotocol/servers)
- Share your CLAUDE.md template with your team
- Contribute to the Claude Code Quest project!
