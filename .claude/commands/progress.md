---
name: progress
description: Affiche la progression complète de l'utilisateur dans Claude Code Quest
---

# /progress — Voir sa progression

Lis `.claude/memory/progress.md` et génère un rapport visuel de progression.

Format de réponse :

```
🧩 **Claude Code Quest — Ta progression**

████████░░░░░░░░ 3/7 pièces (43%)

✅ Pièce 1 : CLAUDE.md         — Maîtrisé
✅ Pièce 2 : Memory            — Maîtrisé  
✅ Pièce 3 : Skills            — Maîtrisé
🔒 Pièce 4 : Hooks             — Verrouillé
🔒 Pièce 5 : Session           — Verrouillé
🔒 Pièce 6 : MCP               — Verrouillé
🔒 Pièce 7 : Master Build      — Verrouillé

**Prochain défi :** [description courte du défi Pièce 4]

_Utilise /hint pour un indice ou /validate pour valider ton défi._
```

Adapte la barre de progression au nombre de pièces réellement débloquées.
