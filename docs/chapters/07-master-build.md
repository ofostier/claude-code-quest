# Pièce 7 — Master Build : Assembler le Puzzle

> **Félicitations !** Tu as débloqué les 6 premières pièces. Il est temps
> d'assembler tout ce que tu as appris pour créer quelque chose de réel.

---

## Le défi final

Tu vas utiliser **toutes les fonctionnalités** apprises pour construire
une mini-fonctionnalité de bout en bout, entièrement guidée par Claude Code.

### Objectif

Ajouter une page "Hall of Fame" à l'application qui :
1. Affiche la liste des utilisateurs ayant complété le puzzle
2. Permet d'ajouter son nom à la liste
3. Persiste les données localement (localStorage)
4. Est stylisée avec Tailwind

### Ce que tu dois utiliser

| Outil | Comment l'utiliser |
|-------|--------------------|
| **CLAUDE.md** | S'assure que Claude respecte les conventions React/Tailwind |
| **Memory** | Claude se souvient de ton niveau et adapte ses explications |
| **Skills** | Utilise `/my-review` sur le code généré |
| **Hooks** | Le hook logge automatiquement les modifications |
| **Session** | Toute la feature en une seule session avec contexte |
| **MCP** | (Bonus) Logge l'ajout dans une issue GitHub |

---

## Guide pas à pas

### Étape 1 — Préparer la session

Ouvre Claude Code et dis :
```
"Lis CLAUDE.md et la mémoire du projet. Nous allons construire 
 une page Hall of Fame. Je veux que tu respectes les conventions 
 du projet tout au long."
```

### Étape 2 — Générer la feature

```
"Crée un composant HallOfFame.jsx dans src/components/ qui :
 - Affiche une liste de noms (depuis localStorage)
 - Permet d'en ajouter un nouveau
 - Est stylisé avec Tailwind en cohérence avec le reste de l'app"
```

### Étape 3 — Revue avec ton Skill

```
/my-review
```

Demande à Claude d'appliquer les corrections suggérées.

### Étape 4 — Intégrer dans l'app

```
"Intègre HallOfFame dans l'application. Ajoute une route /hall-of-fame
 et un lien depuis la page principale."
```

### Étape 5 — Vérifier les hooks

```bash
cat .claude/activity.log
```
Tu dois voir les logs des modifications faites par Claude.

### Étape 6 — Résumer et mémoriser

```
"Résume ce que nous avons construit. Mets à jour la mémoire du projet
 avec les décisions d'architecture prises."
```

---

## Critères de validation finale

- [ ] Composant `HallOfFame.jsx` créé et fonctionnel
- [ ] Route `/hall-of-fame` accessible
- [ ] Code conforme aux conventions CLAUDE.md
- [ ] Skill `/my-review` utilisé et retours appliqués
- [ ] Hooks ont loggé les activités
- [ ] Mémoire projet mise à jour
- [ ] (Bonus) MCP GitHub utilisé

---

## Tu as terminé le puzzle !

```
🧩🧩🧩🧩🧩🧩🧩
✅ ✅ ✅ ✅ ✅ ✅ ✅
```

### Ce que tu maîtrises maintenant

- **CLAUDE.md** : Configurer Claude pour ton projet
- **Memory** : Persistance des préférences et du contexte
- **Skills** : Commandes slash personnalisées
- **Hooks** : Automatisation des actions
- **Session** : Orchestration de tâches complexes
- **MCP** : Connexion à des services externes
- **Orchestration** : Combiner tout pour des workflows puissants

### La suite ?

Explore ces ressources pour continuer :
- Construis tes propres serveurs MCP
- Partage tes Skills avec ton équipe
- Explore Claude Code en mode headless pour l'automatisation CI/CD
- Rejoins la communauté Claude Code

---

*"La meilleure façon d'apprendre un outil, c'est de construire quelque chose de réel avec lui."*
