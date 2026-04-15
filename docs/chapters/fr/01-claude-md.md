# Pièce 1 — CLAUDE.md : La Fondation

> **Concept** : CLAUDE.md est le fichier d'instructions persistantes que Claude lit
> automatiquement à chaque session dans un répertoire donné. C'est ton contrat
> avec Claude pour ce projet.

---

## Théorie

### Qu'est-ce que CLAUDE.md ?

CLAUDE.md est un fichier Markdown placé à la racine d'un projet (ou dans `~/.claude/`
pour des instructions globales). Claude le lit **automatiquement** au début de chaque
conversation dans ce répertoire.

Il te permet de :
- Définir des **conventions de code** spécifiques au projet
- Décrire l'**architecture** pour que Claude comprenne le contexte
- Configurer le **comportement de Claude** (ton, niveau de détail, langue...)
- Référencer d'autres fichiers importants

### Hiérarchie des CLAUDE.md

```
~/.claude/CLAUDE.md          ← Instructions globales (tous projets)
    ↓
~/projet/CLAUDE.md           ← Instructions du projet (écrase le global)
    ↓
~/projet/src/CLAUDE.md       ← Instructions d'un sous-dossier (optionnel)
```

> 💻 **Chemin selon l'OS**
>
> | OS | Chemin global |
> |-----|--------------|
> | macOS | `~/.claude/` = `/Users/<toi>/.claude/` |
> | Linux | `~/.claude/` = `/home/<toi>/.claude/` |
> | Windows | `%USERPROFILE%\.claude\` = `C:\Users\<toi>\.claude\` |
>
> Dans les exemples de cette doc, `~/` désigne toujours ton dossier utilisateur.

### Exemple concret

```markdown
# Mon Projet API

## Stack
- Node.js + Express
- PostgreSQL avec Prisma
- Tests avec Vitest

## Conventions
- Toujours utiliser async/await (jamais de callbacks)
- Les erreurs se propagent avec des classes custom dans `src/errors/`
- Chaque endpoint doit avoir un test d'intégration

## À ne pas faire
- Ne jamais commit de secrets ou .env
- Ne pas modifier `src/legacy/` sans avertissement
```

### Ce que Claude fait avec ce fichier

1. Il le lit **avant** de répondre à toute question
2. Il adapte son comportement à tes conventions
3. Il référence les fichiers mentionnés si besoin
4. Il respecte les contraintes définies dans toutes ses suggestions

---

## Démo — Le CLAUDE.md de ce projet

Ouvre le fichier `CLAUDE.md` à la racine de ce projet. Tu verras qu'il :
- Définit les conventions de code React/Tailwind
- Décrit la stack technique
- Guide Claude vers les bons fichiers selon le contexte
- Est lui-même un exemple en action !

```bash
cat CLAUDE.md
```

---

## Défi — Pièce 1 à débloquer

**Objectif** : Personnaliser le CLAUDE.md du projet pour qu'il reflète tes préférences.

### Étapes

1. Ouvre `CLAUDE.md` à la racine du projet
2. Ajoute une section `## Mes préférences` avec :
   - Ta langue préférée pour les commentaires (FR/EN)
   - Ton style de nommage préféré (camelCase/snake_case)
   - Une convention que tu veux que Claude respecte
3. Redémarre Claude Code (`exit` puis `claude`), puis tape exactement :
   ```
   Résume tes instructions pour ce projet
   ```
4. Claude doit citer tes préférences dans sa réponse (ex: *"tu préfères les commentaires en anglais"*).
   S'il répond de façon générique sans les mentionner, relis l'étape 2.

### Validation

Utilise `/validate` pour que Claude vérifie ton travail.

**Critères** :
- [ ] Section `## Mes préférences` présente dans CLAUDE.md
- [ ] Au moins 2 préférences personnelles ajoutées
- [ ] Claude les a bien lues lors d'un test

---

## Pour aller plus loin

- [Documentation officielle CLAUDE.md](https://docs.anthropic.com/claude-code)
- Tu peux référencer d'autres fichiers `.md` avec `@fichier.md` dans ton CLAUDE.md
- Un CLAUDE.md dans `~/.claude/` s'applique à tous tes projets

**Prochaine pièce** : Memory — Comment Claude se souvient d'une session à l'autre →
