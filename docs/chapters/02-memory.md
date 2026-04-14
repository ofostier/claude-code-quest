# Pièce 2 — Memory : La Mémoire Persistante

> **Concept** : Le système de mémoire permet à Claude de retenir des informations
> entre les sessions : tes préférences, l'état du projet, les décisions prises.
> Claude écrit et lit ces fichiers lui-même.

---

## Théorie

### Le problème sans mémoire

Par défaut, Claude repart de zéro à chaque conversation. Il ne sait pas :
- Que tu préfères les tests d'intégration aux tests unitaires
- Que vous avez décidé de ne pas utiliser Redux la semaine dernière
- Que le projet doit être livré vendredi

### La solution : le système de mémoire

Claude Code peut maintenir un système de fichiers de mémoire dans
`.claude/memory/`. Ces fichiers sont en Markdown avec un frontmatter YAML
qui aide Claude à décider quand les lire.

### Structure d'un fichier mémoire

```markdown
---
name: Préférences de test
description: Comment l'utilisateur veut que les tests soient écrits
type: user
---

L'utilisateur préfère les tests d'intégration aux tests unitaires.
Raison : "Les mocks nous ont coûté une prod l'année dernière."
Toujours tester contre une vraie DB en dev.
```

### Les 4 types de mémoire

| Type | Contenu | Durée de vie |
|------|---------|--------------|
| `user` | Profil, préférences, expertise | Longue durée |
| `feedback` | Ce qui marche ou non avec Claude | Longue durée |
| `project` | État, décisions, contexte projet | Moyen terme |
| `reference` | Où trouver des infos externes | Longue durée |

### Comment Claude utilise la mémoire

1. **Lecture** : Claude lit les fichiers pertinents en début de session
2. **Écriture** : Claude crée/met à jour les fichiers quand tu lui dis de retenir qqch
3. **Index** : Un fichier `MEMORY.md` liste tous les fichiers mémoire

```
.claude/
└── memory/
    ├── MEMORY.md          ← Index (lu automatiquement)
    ├── user_profile.md    ← Qui tu es
    ├── project_state.md   ← État du projet
    └── progress.md        ← Ta progression (déjà créé !)
```

---

## Démo

Regarde le fichier `.claude/memory/progress.md` — il a été créé automatiquement
par ce projet pour suivre ta progression. C'est de la mémoire en action !

```bash
cat .claude/memory/progress.md
```

### Demander à Claude de mémoriser

Dans une session Claude Code, tu peux dire :
```
"Souviens-toi que je préfère les fonctions fléchées aux déclarations de fonction"
```

Claude va alors créer ou mettre à jour un fichier dans `.claude/memory/`.

---

## Défi — Pièce 2 à débloquer

**Objectif** : Créer un profil utilisateur et tester la persistance entre sessions.

### Étapes

1. Crée le fichier `.claude/memory/MEMORY.md` (l'index) :

```markdown
# Index Mémoire — Claude Code Quest

- [Progression](progress.md) — Suivi du parcours puzzle
- [Profil utilisateur](user_profile.md) — Préférences et contexte
```

2. Dans une session Claude Code, dis :
   *"Mémorise que je suis développeur [ton niveau] et que je travaille principalement avec [tes technos]"*

3. Vérifie que Claude a créé `.claude/memory/user_profile.md`

4. Ferme la session, rouvre-en une, et demande :
   *"Qui suis-je d'après ta mémoire ?"*

5. Claude doit répondre avec les infos mémorisées.

### Validation

Utilise `/validate` pour que Claude vérifie.

**Critères** :
- [ ] Fichier `MEMORY.md` créé avec au moins 2 entrées
- [ ] Fichier `user_profile.md` créé par Claude
- [ ] Claude retrouve les infos dans une nouvelle session

---

## Pour aller plus loin

- Tu peux dire *"oublie"* pour demander à Claude de supprimer une mémoire
- La mémoire peut référencer des fichiers du projet avec des chemins relatifs
- Les mémoires `feedback` sont particulièrement puissantes pour affiner le comportement

**Prochaine pièce** : Skills — Crée tes propres commandes slash →
