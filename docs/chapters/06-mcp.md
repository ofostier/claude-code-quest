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

**Objectif** : Configurer et utiliser au moins un serveur MCP.

### Option A — Filesystem (recommandé pour débuter)

Aucun compte ni token nécessaire.

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

3. Teste :
   ```
   Liste les 5 fichiers modifiés le plus récemment dans ce projet
   ```

4. Claude doit répondre avec une vraie liste de fichiers — si tu vois
   qu'il utilise un outil `list_directory` ou `search_files`, c'est que
   le serveur MCP est actif.

### Option B — GitHub (si tu as un compte GitHub)

1. Génère un token : GitHub → Settings → Developer settings →
   Personal access tokens → Generate new token (classic) → coche `repo`

2. Ajoute dans `.claude/settings.local.json` (token = donnée personnelle) :
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_ton_token_ici"
      }
    }
  }
}
```

3. Redémarre Claude Code et teste :
   ```
   Crée une issue GitHub intitulée "Test MCP - Pièce 6 complétée"
   ```

### Critères de validation

- [ ] Au moins un serveur MCP configuré dans `settings.json` ou `settings.local.json`
- [ ] Redémarrage effectué après configuration
- [ ] Claude a utilisé un outil MCP (tu vois un appel d'outil dans sa réponse)

---

## Pour aller plus loin

- [Registre officiel : 50+ serveurs disponibles](https://github.com/modelcontextprotocol/servers)
- Tu peux activer plusieurs serveurs en même temps dans la même config
- Les serveurs avec token doivent toujours aller dans `settings.local.json`

**Dernière pièce** : Master Build — Assemble tout ! →
