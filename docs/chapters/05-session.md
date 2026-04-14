# Pièce 5 — Session : Maîtriser le Contexte

> **Concept** : Une session Claude Code est une conversation avec contexte
> persistant. Comprendre comment gérer le contexte, reprendre une session,
> et orchestrer des tâches complexes est essentiel pour les projets ambitieux.

---

## Théorie

### Le contexte dans Claude Code

Claude Code maintient un contexte de conversation pendant toute une session.
Ce contexte contient :
- L'historique des échanges
- Les fichiers lus et modifiés
- Les commandes exécutées
- Les décisions prises

### Reprendre une session

```bash
# Lister les sessions récentes
claude --list-sessions

# Reprendre la dernière session
claude --continue

# Reprendre une session spécifique
claude --resume <session-id>
```

### Gestion du contexte long

Pour les projets complexes, le contexte peut devenir volumineux. Stratégies :

**1. Résumé de session**
Demander à Claude de résumer avant de continuer :
```
"Résume ce que nous avons accompli et ce qui reste à faire, 
puis compact ce contexte"
```

**2. Fichiers de contexte**
Référencer des fichiers plutôt que copier-coller :
```
"Lis @src/components/Auth.jsx et explique le flux d'authentification"
```

**3. Mode --no-context**
Démarrer une session propre pour une tâche isolée :
```bash
claude --no-context "Génère les tests pour src/utils/format.js"
```

### Mode non-interactif (scripts)

Claude Code peut s'utiliser dans des scripts :

```bash
# Exécution directe
claude -p "Génère un composant Button React dans src/components/"

# Avec stdin
cat error.log | claude -p "Analyse ces erreurs et propose des corrections"

# Dans un pipeline CI
claude -p "Vérifie que le code respecte nos conventions" --output-format json
```

### Faire plusieurs choses en même temps

Par défaut Claude travaille une tâche à la fois. Mais tu peux lui demander
d'en faire plusieurs simultanément — il va alors lancer des "sous-agents",
c'est-à-dire des copies de lui-même qui travaillent en parallèle :

```
"Fais ces deux choses en même temps :
 - Optimise les requêtes SQL dans src/db/
 - Améliore les messages d'erreur dans src/api/"
```

Au lieu d'attendre que la première tâche finisse avant de commencer la seconde,
Claude les traite en parallèle. Pratique quand tu as plusieurs tâches indépendantes.

---

## Démo

Essaie de voir l'historique de tes sessions :

```bash
ls ~/.claude/projects/
```

Chaque projet a son propre historique de sessions.

---

## Défi — Pièce 5 à débloquer

**Objectif** : Orchestrer une tâche complexe sur plusieurs étapes de session.

### Étapes

1. Dans une session Claude Code, demande :
   *"Analyse l'architecture de ce projet React et documente-la dans docs/ARCHITECTURE.md"*

2. Claude va lire plusieurs fichiers. Laisse-le terminer.

3. Vérifie que `docs/ARCHITECTURE.md` a été créé.

4. Dans la **même session**, demande :
   *"Basé sur l'architecture que tu viens de documenter, suggère 3 améliorations possibles"*

5. Claude doit utiliser le contexte de l'étape 2 sans relire les fichiers.

6. Résume la session :
   *"Résume ce qu'on a accompli dans cette session en 3 points"*

### Validation

Utilise `/validate` pour vérifier.

**Critères** :
- [ ] Fichier `docs/ARCHITECTURE.md` créé avec du contenu
- [ ] Claude a utilisé le contexte session (pas relu tous les fichiers)
- [ ] Résumé de session effectué

---

## Pour aller plus loin

- `claude --dangerously-skip-permissions` pour les scripts automatisés (avec précaution)
- Les sessions peuvent être exportées pour audit ou documentation
- Combiner avec les Hooks pour déclencher des actions en fin de session

**Prochaine pièce** : MCP — Connecte Claude à n'importe quel service →
