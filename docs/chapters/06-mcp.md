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
programme appelé **serveur MCP**. Tu enregistres ce serveur avec une commande,
et Claude peut alors utiliser ce service directement dans la conversation.

```
Sans MCP :   Claude ←→ tes fichiers uniquement

Avec MCP :   Claude ←→ tes fichiers
                    ←→ GitHub (issues, PRs, commits)
                    ←→ ta base de données
                    ←→ Slack
                    ←→ ...
```

### Compatibilité macOS / Linux / Windows

| | macOS | Linux | Windows |
|---|---|---|---|
| **Claude Code CLI** | ✅ Terminal / VSCode | ✅ Terminal | ✅ WSL recommandé |
| **`claude mcp add`** | ✅ identique | ✅ identique | ✅ dans WSL |
| **`~/.claude.json`** | `/Users/<toi>/.claude.json` | `/home/<toi>/.claude.json` | `C:\Users\<toi>\.claude.json` |
| **Variables d'env** | `~/.zshrc` | `~/.bashrc` | Paramètres système ou `$PROFILE` PowerShell |
| **`npx`** | ✅ avec Node.js | ✅ avec Node.js | ✅ avec Node.js |

> 💡 **Windows** : Claude Code fonctionne nativement, mais les commandes shell
> des exemples supposent un environnement Unix. Sous Windows, utilise **WSL**
> (Windows Subsystem for Linux) pour une expérience identique à macOS/Linux.

---

### Comment enregistrer un serveur MCP

#### La commande officielle

```bash
claude mcp add <nom> -- <commande> <args>
```

Claude Code écrit la config dans `~/.claude.json` sous ton profil de projet.
C'est l'**unique méthode fiable** — éditer `settings.json` manuellement ne fonctionne pas.

#### Portée : projet ou global ?

Par défaut, `claude mcp add` enregistre le serveur pour le **projet courant** uniquement.

```bash
# Projet courant uniquement (défaut)
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem .

# Disponible dans tous tes projets
claude mcp add --scope global filesystem -- npx -y @modelcontextprotocol/server-filesystem .
```

#### Vérifier les serveurs enregistrés

```bash
claude mcp list
```

Cette commande liste tous les serveurs actifs pour le projet courant.

#### Supprimer un serveur

```bash
claude mcp remove filesystem
```

#### Redémarrer après ajout

Claude Code charge les serveurs MCP **au démarrage uniquement**.
Après `claude mcp add` : `exit` puis `claude` pour recharger.

#### Vérifier dans une session

Après redémarrage, demande directement dans Claude Code :
```
Quels outils MCP as-tu disponibles dans cette session ?
```
Claude liste tous les outils des serveurs actifs.

---

### Gérer les tokens

Les serveurs comme GitHub nécessitent un token d'accès. Deux approches :

**Option 1 — Passer le token via `--env`** (stocké dans `~/.claude.json`) :
```bash
claude mcp add github --env GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxx -- \
  npx -y @modelcontextprotocol/server-github
```

**Option 2 — Variable d'environnement système** (recommandé — le token reste hors de `~/.claude.json`) :
```bash
# Dans ~/.zshrc :
export GITHUB_TOKEN="ghp_ton_token_ici"

# Puis :
source ~/.zshrc
claude mcp add github -- npx -y @modelcontextprotocol/server-github
```

> ⚠️ **Ne jamais commiter un token.** `~/.claude.json` n'est pas suivi par git,
> mais si tu partages ta machine ou sauvegardes ce fichier, le token est exposé.
> La variable d'environnement système est la méthode la plus sûre.

---

### Exemples concrets

#### 1. Filesystem — accès fichiers étendu
*Sans token, le plus simple à tester.*

```bash
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem .
```

Ce que tu peux faire ensuite :
```
"Liste les 5 fichiers modifiés le plus récemment"
"Cherche tous les fichiers qui contiennent le mot TODO"
"Montre-moi l'arborescence complète de src/"
```

---

#### 2. GitHub — issues, PRs, commits
*Nécessite un token GitHub (gratuit).*

```bash
claude mcp add github -- npx -y @modelcontextprotocol/server-github
# Puis dans la session : définir GITHUB_PERSONAL_ACCESS_TOKEN
```

Créer le token : GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → coche `repo`.

Ce que tu peux faire ensuite :
```
"Montre-moi les issues ouvertes avec le label 'bug'"
"Crée une issue 'Améliorer le formulaire de contact'"
"Résume les 5 derniers commits de la branche main"
```

---

#### 3. PostgreSQL — base de données
```bash
claude mcp add postgres -- npx -y @modelcontextprotocol/server-postgres \
  postgresql://user:password@localhost/mabase
```

---

#### 4. Brave Search — recherche web
```bash
claude mcp add brave-search --env BRAVE_API_KEY=BSA_xxx -- \
  npx -y @modelcontextprotocol/server-brave-search
```

---

#### 5. Puppeteer — contrôle de navigateur
```bash
claude mcp add puppeteer -- npx -y @modelcontextprotocol/server-puppeteer
```

```
"Va sur http://localhost:5173 et fais une capture d'écran"
"Teste le formulaire de contact et dis-moi s'il fonctionne"
```

---

### Tableau récapitulatif

| Serveur | Token requis ? | Commande `claude mcp add` |
|---------|---------------|--------------------------|
| `server-filesystem` | ❌ Non | `claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem .` |
| `server-github` | ✅ `GITHUB_PERSONAL_ACCESS_TOKEN` | `claude mcp add github -- npx -y @modelcontextprotocol/server-github` |
| `server-postgres` | ✅ Connection string | `claude mcp add postgres -- npx -y @modelcontextprotocol/server-postgres <url>` |
| `server-brave-search` | ✅ `BRAVE_API_KEY` | `claude mcp add brave-search -- npx -y @modelcontextprotocol/server-brave-search` |
| `server-puppeteer` | ❌ Non | `claude mcp add puppeteer -- npx -y @modelcontextprotocol/server-puppeteer` |

> Ces packages npm sont archivés mais fonctionnels. Pour des alternatives maintenues,
> voir le [registre officiel](https://github.com/modelcontextprotocol/servers).

---

## Défi — Pièce 6 à débloquer

**Objectif** : Enregistrer un serveur MCP et prouver qu'il est actif dans une session.

### ⚠️ Important : Claude Code CLI uniquement

La commande `claude mcp add` fonctionne dans le **Claude Code CLI** (terminal).
Elle ne s'applique pas à l'extension VSCode ni à claude.ai.

Pour tester MCP, ouvre un terminal et lance `claude` depuis le projet.

---

### Option A — Filesystem (le plus simple)

Aucun compte ni token nécessaire.

1. Dans un terminal, depuis le projet :
```bash
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem .
```

2. Vérifie l'enregistrement :
```bash
claude mcp list
```
Tu dois voir `filesystem` dans la liste.

3. Redémarre Claude Code (`exit` puis `claude`)

4. Dans Claude Code, demande :
```
Quels outils MCP as-tu disponibles dans cette session ?
```
Claude doit mentionner des outils comme `read_file`, `list_directory`, `search_files`.

---

### Option B — GitHub (démontre vraiment la puissance de MCP)

GitHub est un meilleur exemple car Claude **ne peut pas** accéder à GitHub sans MCP.
La différence est immédiate et indiscutable.

1. Génère un token : GitHub → Settings → Developer settings →
   Personal access tokens → Generate new token (classic) → coche `repo`

2. Ajoute le serveur avec le token :
```bash
claude mcp add github --env GITHUB_PERSONAL_ACCESS_TOKEN=ghp_ton_token -- \
  npx -y @modelcontextprotocol/server-github
```

3. Redémarre Claude Code, puis teste :
```
Crée une issue GitHub intitulée "Test MCP - Pièce 6 complétée"
dans le repo claude-code-quest
```
Si l'issue apparaît sur GitHub → MCP fonctionne.

---

### Critères de validation

- [ ] `claude mcp add` exécuté avec succès
- [ ] `claude mcp list` affiche le serveur
- [ ] Claude Code redémarré après l'enregistrement
- [ ] Demander "Quels outils MCP as-tu ?" → Claude mentionne les outils du serveur

---

## Pour aller plus loin

- [Registre officiel : 50+ serveurs disponibles](https://github.com/modelcontextprotocol/servers)
- Tu peux activer plusieurs serveurs en même temps
- `claude mcp remove <nom>` pour désactiver un serveur
- `claude mcp get <nom>` pour voir la config d'un serveur

**Dernière pièce** : Master Build — Assemble tout ! →
