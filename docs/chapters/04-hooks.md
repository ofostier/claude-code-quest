# Pièce 4 — Hooks : Automatiser les Comportements

> **Concept** : Les Hooks permettent d'exécuter automatiquement des commandes
> shell à des moments précis (avant/après une action de Claude). C'est le pont
> entre Claude Code et ton environnement de développement.

---

## Théorie

### Qu'est-ce qu'un Hook ?

Un hook est une commande shell configurée dans un fichier de settings qui
se déclenche automatiquement en réponse à des événements Claude Code.

### `settings.json` vs `settings.local.json`

Il existe deux fichiers de configuration, et c'est important de savoir lequel utiliser :

| Fichier | Usage | Committer dans git ? |
|---------|-------|---------------------|
| `.claude/settings.json` | Hooks partagés + **`mcpServers`** (obligatoire pour MCP) | ✅ Oui |
| `.claude/settings.local.json` | Hooks personnels, permissions locales | ❌ Non |

**En pratique :**
- Un hook qui lance `prettier` sur chaque fichier modifié → `settings.json` (toute l'équipe en bénéficie)
- Un hook qui joue un son quand Claude finit → `settings.local.json` (c'est ta préférence perso)
- Un token d'API dans la config → `settings.local.json` (ne jamais committer un secret)

Les deux fichiers ont exactement la même structure. Claude Code les lit tous les deux et fusionne leur contenu.

### Les événements disponibles

| Événement | Moment de déclenchement |
|-----------|------------------------|
| `PreToolUse` | Avant qu'un outil (Edit, Bash...) s'exécute |
| `PostToolUse` | Après qu'un outil s'est exécuté |
| `Notification` | Quand Claude envoie une notification |
| `Stop` | Quand Claude termine sa réponse |
| `SubagentStop` | Quand un sous-agent termine |

### Structure de configuration

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint -- --fix $CLAUDE_TOOL_INPUT_FILE_PATH"
          }
        ]
      }
    ]
  }
}
```

### Variables d'environnement disponibles

```bash
$CLAUDE_TOOL_NAME          # Nom de l'outil utilisé (Edit, Bash, Write...)
$CLAUDE_TOOL_INPUT_*       # Paramètres de l'outil
$CLAUDE_HOOK_EVENT         # Type d'événement
```

### Exemples concrets

**Auto-format après chaque édition :**
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit",
      "hooks": [{"type": "command", "command": "prettier --write $CLAUDE_TOOL_INPUT_FILE_PATH"}]
    }]
  }
}
```

**Notification sonore quand Claude finit :**
```json
{
  "hooks": {
    "Stop": [{
      "matcher": ".*",
      "hooks": [{"type": "command", "command": "say 'Claude a terminé'"}]
    }]
  }
}
```

**Lancer les tests après modification d'un fichier de test :**
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit",
      "hooks": [{"type": "command", "command": "echo $CLAUDE_TOOL_INPUT_FILE_PATH | grep -q '.test.' && npm test -- --watch=false || true"}]
    }]
  }
}
```

---

## Démo

Regarde les fichiers de settings qui existent déjà :
```bash
ls .claude/settings*.json 2>/dev/null || echo "Aucun fichier settings encore"
```

---

## Défi — Pièce 4 à débloquer

**Objectif** : Configurer un hook qui s'exécute automatiquement.

### Étapes

1. Crée `.claude/settings.local.json` (on utilise la version locale car ce log
   est personnel — pas besoin de le partager) :

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"[$(date '+%H:%M:%S')] Claude a terminé une réponse\" >> .claude/activity.log"
          }
        ]
      }
    ]
  }
}
```

2. Recharge Claude Code (ferme et rouvre)

3. Demande à Claude n'importe quoi (ex: *"Bonjour"*)

4. Vérifie que le hook a fonctionné :
```bash
cat .claude/activity.log
```

5. Tu dois voir une ligne avec l'heure de la réponse de Claude.

### Bonus

Modifie le hook pour qu'il logge aussi le nom de l'outil utilisé avec `$CLAUDE_TOOL_NAME`.

### Validation

Utilise `/validate` pour vérifier.

**Critères** :
- [ ] Fichier `.claude/settings.local.json` (ou `settings.json`) créé avec au moins 1 hook
- [ ] Fichier `.claude/activity.log` contient au moins une entrée
- [ ] Le hook se déclenche automatiquement (pas manuellement)

---

## Pour aller plus loin

- Les hooks peuvent exécuter des scripts complexes
- `PreToolUse` peut bloquer une action (en retournant un code d'erreur non-zéro)
- Combine hooks + skills pour des workflows puissants

**Prochaine pièce** : Session — Maîtriser le contexte de conversation →
