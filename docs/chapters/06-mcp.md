# Pièce 6 — MCP : Étendre les Capacités

> **Concept** : Le Model Context Protocol (MCP) est un standard ouvert qui permet
> à Claude de se connecter à des services externes — bases de données, APIs, outils
> métier — via des serveurs standardisés. C'est l'écosystème d'extensions de Claude.

---

## Théorie

### Qu'est-ce que MCP ?

MCP est un protocole qui définit comment un LLM communique avec des "serveurs"
qui exposent des outils. Un serveur MCP peut :
- Exposer des **tools** (fonctions que Claude peut appeler)
- Exposer des **ressources** (données que Claude peut lire)
- Exposer des **prompts** (templates réutilisables)

### Architecture MCP

```
Claude Code ←→ MCP Client ←→ MCP Server ←→ Service externe
                                 ↓
                         (GitHub, PostgreSQL,
                          Slack, Jira, etc.)
```

### Configurer un serveur MCP

Dans `~/.claude/settings.json` (global) ou `.claude/settings.json` (projet) :

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ton-token-ici"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"]
    }
  }
}
```

### Serveurs MCP populaires

| Serveur | Usage |
|---------|-------|
| `@mcp/server-github` | Issues, PRs, commits GitHub |
| `@mcp/server-postgres` | Requêtes SQL directes |
| `@mcp/server-filesystem` | Accès fichiers étendu |
| `@mcp/server-slack` | Messages, canaux Slack |
| `@mcp/server-puppeteer` | Contrôle de navigateur |
| `@mcp/server-memory` | Mémoire persistante externe |

### Utilisation dans Claude

Une fois configuré, Claude accède aux outils du serveur naturellement :

```
"Regarde les issues GitHub ouvertes avec le label 'bug' 
 et propose un plan de résolution"
```

```
"Connecte-toi à la base de données et montre-moi le schéma 
 de la table users"
```

### Créer son propre serveur MCP

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const server = new Server({ name: "mon-serveur", version: "1.0.0" });

server.setRequestHandler("tools/list", async () => ({
  tools: [{
    name: "get_meteo",
    description: "Obtient la météo d'une ville",
    inputSchema: {
      type: "object",
      properties: { ville: { type: "string" } }
    }
  }]
}));

server.setRequestHandler("tools/call", async (req) => {
  if (req.params.name === "get_meteo") {
    const { ville } = req.params.arguments;
    // ... appel API météo
    return { content: [{ type: "text", text: `Météo à ${ville}: ☀️ 22°C` }] };
  }
});
```

---

## Défi — Pièce 6 à débloquer

**Objectif** : Configurer et utiliser un serveur MCP.

### Option A — Serveur filesystem (facile)

1. Ajoute dans `.claude/settings.json` :
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}
```

2. Recharge Claude Code et teste :
   *"Liste les 5 fichiers modifiés le plus récemment dans ce projet"*

### Option B — Serveur GitHub (intermédiaire)

1. Crée un token GitHub (Settings > Developer settings > Tokens)
2. Configure le serveur `@modelcontextprotocol/server-github`
3. Teste : *"Crée une issue GitHub 'Premier commit' dans ce repo"*

### Validation

Utilise `/validate` pour vérifier.

**Critères** :
- [ ] Au moins un serveur MCP configuré dans settings.json
- [ ] Claude a utilisé un outil MCP avec succès
- [ ] Description du serveur ajoutée dans `.claude/memory/progress.md`

---

## Pour aller plus loin

- [Registre officiel MCP](https://github.com/modelcontextprotocol/servers)
- Les serveurs MCP peuvent être locaux (stdio) ou distants (SSE/HTTP)
- Claude Code Cowork permet de partager des MCP entre équipes

**Dernière pièce** : Master Build — Assemble tout ! →
