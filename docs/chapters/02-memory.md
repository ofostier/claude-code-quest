# Pièce 2 — Memory : Se souvenir d'une session à l'autre

---

## Théorie

### Le problème

Imagine que tu travailles avec un collègue très compétent. Mais chaque matin,
il arrive au bureau **sans aucun souvenir de la veille**. Tu dois lui réexpliquer
ton prénom, ton projet, tes préférences... à chaque fois.

C'est exactement ce qui se passe avec Claude par défaut.

Chaque fois que tu ouvres une nouvelle session, Claude repart de zéro.
Il ne sait plus :
- Comment tu t'appelles ou quel est ton niveau
- Que tu préfères les commentaires en anglais
- Sur quel projet tu travailles et où tu en es

### La solution : un carnet de notes

Le système de mémoire, c'est simplement **un dossier de fichiers texte**
que Claude peut lire et écrire lui-même.

```
.claude/
└── memory/
    ├── MEMORY.md         ← La liste de tout ce qu'il y a dans le carnet
    ├── user_profile.md   ← Qui tu es
    └── progress.md       ← Ta progression (déjà créé !)
```

Au début d'une nouvelle session, Claude lit ces fichiers et se "souvient"
de tout ce qui y est écrit.

C'est aussi simple que ça : **si c'est écrit dans un fichier, Claude s'en souvient**.

### Comment ça marche concrètement

**Pour que Claude mémorise quelque chose**, dis-lui simplement :
```
Souviens-toi que je préfère les commentaires en anglais
```

Claude va créer ou mettre à jour un fichier dans `.claude/memory/` tout seul.

**Pour que Claude retrouve une info**, dans une nouvelle session, demande :
```
Qu'est-ce que tu sais sur moi ?
```

Il va lire ses fichiers et te répondre avec ce qu'il a retenu.

**Pour qu'il oublie quelque chose** :
```
Oublie ma préférence sur les commentaires
```

> **Pas besoin de redémarrer.** Contrairement aux commandes slash (Pièce 3),
> la mémoire fonctionne immédiatement : Claude lit et écrit ses fichiers
> à la demande, dans n'importe quelle session.

### À quoi ressemble un fichier mémoire

C'est juste un fichier texte avec une petite entête :

```
---
name: Mon profil
description: Qui je suis et mes préférences
type: user
---

Je m'appelle Olivier. Je suis développeur intermédiaire.
Je travaille avec React et Node.js.
Je préfère les explications courtes et directes.
```

L'entête (entre les `---`) dit à Claude de quoi parle le fichier.
Le texte en dessous, c'est ce qu'il doit retenir. Tu peux écrire ce que tu veux,
en langage naturel — pas besoin de format particulier.

---

## Démo

Le fichier `.claude/memory/progress.md` existe déjà dans ce projet.
C'est de la mémoire en action : Claude sait où tu en es dans le puzzle
grâce à ce fichier.

Regarde son contenu :
```bash
cat .claude/memory/progress.md
```

Tu verras ta progression et les préférences que tu as partagées lors de la Pièce 1.

---

## Défi — Pièce 2 à débloquer

**Objectif** : Faire mémoriser ton profil à Claude et vérifier qu'il s'en souvient
dans une nouvelle session.

### Étapes

1. Crée le fichier `.claude/memory/MEMORY.md` avec ce contenu
   (c'est la "table des matières" du carnet) :

```markdown
# Ma mémoire — Claude Code Quest

- [Progression](progress.md) — Suivi du parcours puzzle
- [Mon profil](user_profile.md) — Mes préférences et mon contexte
```

2. Dans Claude Code, dis **exactement** ceci (préciser le nom du fichier est important,
   sinon Claude peut écrire dans un fichier existant au lieu d'en créer un nouveau) :
   ```
   Crée un fichier .claude/memory/user_profile.md pour mémoriser mon profil :
   [décris-toi en 2-3 phrases : niveau, technos, préférences]
   ```

3. Vérifie que le **nouveau** fichier a bien été créé :
   ```bash
   cat .claude/memory/user_profile.md
   ```
   Si tu obtiens une erreur "no such file", c'est que Claude a écrit ailleurs.
   Répète l'étape 2 en précisant bien le chemin du fichier.

4. Dans la **même session** ou dans une **nouvelle session**, demande :
   ```
   Qu'est-ce que tu sais sur moi ?
   ```
   Claude doit te répondre avec les infos que tu lui as données à l'étape 2.

   > **Contrairement aux commandes**, la mémoire ne nécessite pas de redémarrage.
   > Claude peut lire et écrire ses fichiers mémoire à tout moment, dans n'importe
   > quelle session. Si tu ouvres une nouvelle session dans une semaine, il se souviendra
   > quand même — tant que les fichiers sont là.

### Auto-évaluation

- [ ] Le fichier `MEMORY.md` existe dans `.claude/memory/`
- [ ] Le fichier `user_profile.md` a été créé par Claude (pas par toi)
- [ ] Dans une nouvelle session, Claude cite tes infos sans que tu les répètes

---

## Pour aller plus loin

- Tu peux modifier les fichiers mémoire à la main, comme n'importe quel fichier texte
- Plus les infos sont précises, plus Claude s'adapte bien
- Cette mémoire ne quitte pas ton ordinateur — elle n'est pas envoyée à Anthropic

**Prochaine pièce** : Skills — Crée tes propres commandes slash →
