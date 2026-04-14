---
name: validate
description: Valide si le défi du chapitre courant a été correctement complété
---

# /validate — Valider un défi

Lis `.claude/memory/progress.md` pour connaître le chapitre en cours.
Lis `docs/chapters/0X-nom.md` pour connaître les critères de validation.

Vérifie les critères en lisant les fichiers pertinents du projet.

Si validé :
1. Mets à jour `.claude/memory/progress.md` pour cocher la pièce
2. Affiche un message de félicitations avec le contexte de la prochaine pièce

Format de réponse :
```
✅ **Défi validé — Pièce X : [Nom] débloquée !**

[Ce que l'utilisateur a bien fait]

🔓 **Prochaine pièce : [Nom]**
[Courte accroche vers le prochain chapitre]
```

Si non validé :
```
🔍 **Pas encore...**

[Ce qui manque, sans donner la solution]
[Suggestion d'utiliser /hint]
```
