---
name: hint
description: Donne un indice pour le défi du chapitre courant sans révéler la solution
---

# /hint — Obtenir un indice

Lis le fichier `.claude/memory/progress.md` pour identifier le chapitre en cours.
Puis lis le fichier `docs/chapters/0X-nom.md` correspondant.

Donne un **indice progressif** (pas la solution) qui aide l'utilisateur à avancer.
L'indice doit être court (2-3 lignes max) et poser une question Socratique.

Format de réponse :
```
💡 **Indice — Pièce X : [Nom]**

[Question ou observation qui guide sans révéler]

_Besoin d'un autre indice ? Utilise /hint à nouveau._
```
