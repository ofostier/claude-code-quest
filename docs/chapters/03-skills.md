# Pièce 3 — Skills : Tes Commandes Personnalisées

> **Concept** : Les Skills sont des fichiers Markdown qui définissent des commandes
> slash (`/nom`) personnalisées. Claude lit le fichier et exécute les instructions
> qu'il contient. C'est une façon de créer tes propres outils Claude Code.

---

## Théorie

### Qu'est-ce qu'un Skill ?

Un Skill est un fichier `.md` dans `.claude/commands/` qui décrit une action
que Claude doit exécuter quand tu tapes `/nom-du-skill`.

```markdown
---
name: deploy-check
description: Vérifie que tout est prêt avant un déploiement
---

# /deploy-check

Vérifie les éléments suivants avant de déployer :
1. Lance `npm test` et s'assure que tous les tests passent
2. Vérifie qu'il n'y a pas de `console.log` dans src/
3. Vérifie que `.env.example` est à jour
4. Résume ce qui est prêt et ce qui bloque
```

Ensuite, dans Claude Code, `/deploy-check` exécute toutes ces étapes.

### Anatomie d'un Skill

```markdown
---
name: nom-commande          ← Le nom après /
description: Description    ← Ce que fait la commande (affiché dans /help)
---

# Instructions pour Claude

[Instructions détaillées que Claude va suivre]
[Peut inclure du code, des vérifications, des formats de sortie]
[Peut référencer d'autres fichiers avec @fichier]
```

### Exemples de Skills utiles

| Skill | Usage |
|-------|-------|
| `/review` | Revue de code complète du fichier courant |
| `/test-ideas` | Suggère des cas de test pour la fonction sélectionnée |
| `/explain` | Explication détaillée du code sélectionné |
| `/todo` | Liste tous les TODO/FIXME du projet |
| `/changelog` | Génère un changelog depuis le dernier tag git |

### Skills déjà disponibles dans ce projet

Regarde dans `.claude/commands/` — tu as déjà :
- `/hint` — Obtenir un indice pour le défi courant
- `/validate` — Valider ton défi
- `/progress` — Voir ta progression

---

## Démo

Essaie maintenant dans Claude Code :
```
/hint
```
```
/progress
```

Tu verras Claude exécuter les instructions définies dans les fichiers `.md` correspondants.

> **À retenir** : Claude Code charge les commandes de `.claude/commands/` **au démarrage**.
> Si tu crées ou modifies un fichier de commande, tu dois **redémarrer Claude Code**
> pour qu'il soit disponible. En terminal : `exit` puis `claude`.

---

## Défi — Pièce 3 à débloquer

**Objectif** : Créer ton propre Skill personnalisé.

### Étapes

1. Crée le fichier `.claude/commands/my-review.md` :

```markdown
---
name: my-review
description: Ma revue de code personnalisée
---

# /my-review

Effectue une revue du fichier courant ou du code sélectionné.
Vérifie :
1. Les problèmes de performance évidents
2. La lisibilité et les noms de variables
3. Les cas limites non gérés
4. [Ajoute ta propre règle ici]

Présente les résultats avec des emojis : ✅ bien, ⚠️ à améliorer, ❌ problème
```

2. Personnalise la règle #4 avec quelque chose qui te tient à cœur

3. Teste sur un fichier React du projet :
   ```
   /my-review
   ```

4. Affine les instructions selon le résultat obtenu

### Validation

Utilise `/validate` pour vérifier.

**Critères** :
- [ ] Fichier `.claude/commands/my-review.md` créé
- [ ] Au moins une règle personnalisée ajoutée
- [ ] Skill testé avec succès sur un fichier du projet

---

## Pour aller plus loin

- Un skill peut accepter des arguments : décris-les dans les instructions
- Tu peux référencer le contexte courant (`@fichier`, sélection)
- Les skills peuvent chaîner d'autres skills ou lire la mémoire

**Prochaine pièce** : Hooks — Automatise les actions récurrentes →
