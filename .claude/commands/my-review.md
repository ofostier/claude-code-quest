---
name: deploy-check
description: Vérifie que tout est prêt avant deploy
---

# /deploy-check

Vérifie avant de déployer :
1. Lance `npm test` — tous verts ?
2. Pas de `console.log` dans src/
3. .env.example à jour ?
4. Verifie la convention de nommage

Résume ce qui est prêt et ce qui bloque.