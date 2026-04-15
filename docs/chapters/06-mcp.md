# Pièce 6 — MCP : Étendre les Capacités

> **Concept** : Le Model Context Protocol (MCP) permet à Claude de se connecter
> à des services externes. Sans MCP, Claude ne peut travailler qu'avec les fichiers
> de ton ordinateur. Avec MCP, il peut lire ta base de données, créer des issues
> GitHub, envoyer des messages Slack, contrôler un navigateur...

---

## Théorie

### Le problème sans MCP

Par défaut, Claude travaille uniquement avec ce qu'il peut lire sur ton disque.
Il ne peut pas :
- Voir tes issues GitHub sans que tu les copie-colles
- Interroger ta base de données directement
- Envoyer un message sur Slack
- Faire une recherche sur le web

### La solution : brancher des services

MCP (Model Context Protocol) est un système de "prises électriques" standardisées.
Chaque service (GitHub, PostgreSQL, Slack...) fournit une prise MCP — un petit
programme appelé **serveur MCP**. Tu branches ce serveur dans ta config, et Claude
peut alors utiliser ce service directement dans la conversation.

```
Sans MCP :   Claude ←→ tes fichiers uniquement

Avec MCP :   Claude ←→ tes fichiers
                    ←→ GitHub (issues, PRs, commits)
                    ←→ ta base de données
                    ←→ Slack
                    ←→ ...
```

### Comment brancher un serveur MCP

Tu ajoutes une entrée dans `.claude/settings.json` (partagé avec l'équipe)
ou `.claude/settings.local.json` (personnel, si le serveur contient un token) :

```json
{
  "mcpServers": {
    "nom-du-serveur": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-nom"],
      "env": {
        "TOKEN": "ton-token-si-necessaire"
      }
    }
  }
}
```

> **C'est quoi `npx` ?**
> `npx` est un outil inclus avec Node.js qui télécharge et exécute un package npm
> sans l'installer définitivement. Le `-y` accepte automatiquement l'installation.
> C'est la façon recommandée de lancer des serveurs MCP : pas besoin d'installation
> manuelle, la version à jour est toujours utilisée.

Redémarre Claude Code après chaque modification de la config — il détecte les serveurs au démarrage uniquement.

---

### Exemples concrets

#### 1. Filesystem — accès fichiers étendu
*Sans token, le plus simple à tester.*

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

Ce que tu peux faire ensuite :
```
"Liste les 5 fichiers modifiés le plus récemment"
"Cherche tous les fichiers qui contiennent le mot TODO"
"Montre-moi l'arborescence complète de src/"
```

---

#### 2. GitHub — issues, PRs, commits
*Nécessite un token GitHub (gratuit). Package archivé mais fonctionnel.*

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxx"
      }
    }
  }
}
```

Créer le token : GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → coche `repo`.

Ce que tu peux faire ensuite :
```
"Montre-moi les issues ouvertes avec le label 'bug'"
"Crée une issue 'Améliorer le formulaire de contact'"
"Résume les 5 derniers commits de la branche main"
"Y a-t-il des PRs en attente de review ?"
```

---

#### 3. PostgreSQL — base de données
*Nécessite une base Postgres accessible.*

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://user:password@localhost/mabase"
      ]
    }
  }
}
```

Ce que tu peux faire ensuite :
```
"Montre-moi le schéma de la table users"
"Combien d'utilisateurs se sont inscrits cette semaine ?"
"Y a-t-il des doublons d'email dans la table customers ?"
```

---

#### 4. Brave Search — recherche web
*Nécessite une clé API Brave Search (gratuit jusqu'à 2000 requêtes/mois).*

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "BSA_xxxxxxxxxxxx"
      }
    }
  }
}
```

Ce que tu peux faire ensuite :
```
"Cherche les dernières actualités sur React 19"
"Trouve la documentation officielle de Tailwind v4"
"Y a-t-il des vulnérabilités connues pour ce package npm ?"
```

---

#### 5. Puppeteer — contrôle de navigateur
*Sans token. Permet à Claude de naviguer sur le web comme un humain.*

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

Ce que tu peux faire ensuite :
```
"Va sur http://localhost:5173 et fais une capture d'écran"
"Teste le formulaire de contact et dis-moi s'il fonctionne"
"Vérifie que la page /about se charge sans erreur"
```

---

### Tableau récapitulatif

| Serveur | Token requis ? | Usage principal | Statut |
|---------|---------------|-----------------|--------|
| `server-filesystem` | ❌ Non | Explorer les fichiers | ✅ Actif |
| `server-github` | ✅ `GITHUB_PERSONAL_ACCESS_TOKEN` | Issues, PRs, commits | ⚠️ Archivé* |
| `server-postgres` | ✅ Connection string | Requêtes SQL | ⚠️ Archivé* |
| `server-brave-search` | ✅ `BRAVE_API_KEY` | Recherche web | ⚠️ Archivé* |
| `server-puppeteer` | ❌ Non | Navigation navigateur | ⚠️ Archivé* |
| `server-slack` | ✅ Oui | Messages, canaux | ⚠️ Archivé* |

> *Archivé = le package npm fonctionne toujours mais n'est plus activement maintenu
> par l'équipe MCP. Pour des alternatives maintenues, voir le
> [registre officiel](https://github.com/modelcontextprotocol/servers).

---

## Défi — Pièce 6 à débloquer

**Objectif** : Configurer un serveur MCP et vérifier qu'il est bien chargé.

### ⚠️ Note importante sur le serveur `filesystem`

Le serveur `filesystem` est le plus simple à configurer, mais il est **difficile
à distinguer** des outils natifs de Claude. Claude Code a déjà accès aux fichiers
par défaut (outils `Read`, `LS`, `Bash`...) — quand tu lui demandes de lister
des fichiers, il utilisera ses propres outils plutôt que ceux du MCP.

**Comment vraiment vérifier qu'un MCP est actif :**

```bash
# Dans un terminal (pas dans Claude Code), tape :
claude mcp list
```

Cette commande liste tous les serveurs MCP que Claude a détectés et chargés.
Si ton serveur apparaît dans la liste → il est actif.

---

### Option A — Filesystem (le plus simple)

Aucun compte ni token nécessaire. On utilise `claude mcp list` pour valider.

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

2. Redémarre Claude Code (`exit` puis `claude`)

3. **Validation — dans un terminal externe** :
   ```bash
   claude mcp list
   ```
   Tu dois voir `filesystem` dans la liste des serveurs actifs.

4. Dans Claude Code, demande :
   ```
   Quels outils MCP as-tu disponibles ?
   ```
   Claude doit mentionner des outils comme `read_file`, `list_directory`, `search_files`.

---

### Option B — GitHub (démontre vraiment la puissance de MCP)

GitHub est un meilleur exemple car Claude **ne peut pas** accéder à GitHub sans MCP.
La différence est immédiate et indiscutable.

1. Génère un token : GitHub → Settings → Developer settings →
   Personal access tokens → Generate new token (classic) → coche `repo`

2. Ajoute dans `.claude/settings.local.json` :
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_ton_token_ici"
      }
    }
  }
}
```

3. Redémarre Claude Code, puis teste :
   ```
   Crée une issue GitHub intitulée "Test MCP - Pièce 6 complétée"
   dans le repo claude-code-quest
   ```
   Si l'issue apparaît sur GitHub → MCP fonctionne. Sans MCP, Claude
   n'aurait aucun moyen de créer une issue.

---

### Critères de validation

- [ ] Serveur MCP configuré dans `settings.json` ou `settings.local.json`
- [ ] `claude mcp list` affiche le serveur dans un terminal externe
- [ ] Test effectué qui prouve que MCP est utilisé (et non les outils natifs)

---

## Pour aller plus loin

- [Registre officiel : 50+ serveurs disponibles](https://github.com/modelcontextprotocol/servers)
- Tu peux activer plusieurs serveurs en même temps dans la même config
- Les serveurs avec token doivent toujours aller dans `settings.local.json`

**Dernière pièce** : Master Build — Assemble tout ! →
