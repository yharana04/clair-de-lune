# 🌙 Clair de Lune
### Le Conteur numérique des Loups-Garous de Thiercelieux

---

## 📖 Description

**Clair de Lune** est une application web mobile-first conçue pour animer des parties de **Loups-Garous de Thiercelieux** en présentiel. Elle remplace le rôle du conteur humain et guide le Maître du Jeu (MJ) tout au long de la partie : ordre de réveil des rôles, actions de nuit, vote du jour, timeline des événements, et conditions de victoire.

> L'application tourne entièrement dans le navigateur, sans serveur, sans connexion requise (une fois installée comme PWA).

---

## ✨ Fonctionnalités principales

- **43 rôles** implémentés avec leurs mécaniques complètes
- **Gestion automatique** de l'ordre de réveil chaque nuit
- **Timeline de partie** pliable et persistante (journal Nuit/Jour)
- **Distribution des rôles** avec carte 3D à maintenir pour révéler
- **Profils joueurs** mémorisés (localStorage, jusqu'à 100 joueurs)
- **Suggestion IA** de composition selon le nombre de joueurs
- **Fiches de rôles** filtrées sur les rôles présents dans la partie
- **Vue d'ensemble MJ** (bouton 👁️) avec révélation individuelle au clic
- **Conditions de victoire** automatiques (classique + spéciales)
- **PWA installable** sur mobile (Android & iOS) avec icône personnalisée

---

## 🗂️ Architecture du projet

```
clair-de-lune/
├── index.html          → Structure HTML des 5 écrans
├── style.css           → Thème médiéval (vert forêt, brun, or)
├── manifest.json       → Configuration PWA
├── service-worker.js   → Service worker (installation mobile)
├── favicon.ico         → Icône navigateur
│
├── core.js             → ROLES, état du jeu, navigation, joueurs, attribution
├── game.js             → Phases nuit/jour, timeline, vote, victoire, Chasseur, Chevalier
├── roles-nuit.js       → Actions de nuit (Renard, Corbeau, Détective, Ours, Flûte...)
├── roles-speciaux.js   → Cupidon, Sorcière, Voyante, Loups spéciaux, Neutres...
├── fiches.js           → FICHES_ROLES + modales (œil MJ, fiches, victoire)
│
└── images/
    ├── dos-carte.png   → Dos des cartes (style tarot ancien)
    ├── icon-*.png      → Icônes PWA (72 à 512px)
    └── [role].jpg      → 43 illustrations de rôles (style peinture à l'huile sombre)
```

---

## 🎮 Les 5 écrans

| Écran | Description |
|-------|-------------|
| **Accueil** | Logo animé, bouton Nouvelle Partie |
| **Joueurs** | Ajout/suppression, profils mémorisés (jusqu'à 100) |
| **Rôles** | Sélection manuelle ou suggestion IA, jauge d'équilibre |
| **Distribution** | Carte 3D à maintenir pour révéler le rôle en secret |
| **Jeu** | Interface complète nuit/jour avec journal de partie |

---

## 🐺 Les 43 rôles

### 🧑‍🌾 Camp du Village (19 rôles)
| Rôle | Mécanique |
|------|-----------|
| Villageois | Passif |
| Voyante | Voit la carte complète d'un joueur chaque nuit |
| Sorcière | 2 potions : vie et mort (une par nuit max) |
| Chasseur | Tire en mourant |
| Cupidon | Lie 2 amoureux à la Nuit 1 |
| Petite Fille | Peut espionner les loups (informatif) |
| Salvateur | Protège un joueur chaque nuit (pas le même 2 fois) |
| Ancien | Résiste à 1 attaque de loup. Si voté par le village → tous les pouvoirs villageois disparaissent |
| Idiot du Village | Survit au premier vote, perd son droit de vote |
| Deux Sœurs | Se reconnaissent à la Nuit 1 |
| Trois Frères | Se reconnaissent à la Nuit 1 |
| Renard | Flaire 3 joueurs, perd son pouvoir si aucun loup trouvé |
| Montreur d'Ours | L'ours grogne si ses voisins sont des loups |
| Chevalier à l'Épée Rouillée | Empoisonne le loup qui le tue (mort la nuit suivante) |
| Enfant Sauvage | Choisit un modèle — devient loup si le modèle meurt |
| Villageois-Villageois | Passif certifié |
| Comédien | Lié à un Original, immunisé tant qu'il vit, récupère son rôle à sa mort |
| Corbeau | Maudit un joueur (double voix au vote) |
| Juge Corrompu | Impose un candidat unique au vote (1 fois) |
| Meunier | Éliminé par vote sans révéler son rôle |
| Enquêteur | Découvre un rôle absent de la partie |
| Sorcière de Salem | 3 potions : vie, mort, vérité |
| Prêtre | Bénit le couple d'Amoureux (brise le lien de mort) |
| Détective | Vérifie le camp d'un joueur (Village ou non) |
| Garde Champêtre | Empêche 2 joueurs de voter l'un contre l'autre |

### 🐺 Camp des Loups (9 rôles)
| Rôle | Mécanique |
|------|-----------|
| Loup-Garou | Vote collectif chaque nuit |
| Grand Méchant Loup | 2ème victime si aucun loup n'est mort |
| Infect Père des Loups | Infecte une victime (1 fois) |
| Loup Blanc | Tue un autre loup une nuit sur deux |
| Loup Fou | Se réveille avec les loups + attaque séparée (règle maison) |
| Loup-Alpha | Vote double, tranche les égalités |
| Loup-Fétiche | Protège un loup contre les attaques neutres |
| Loup-Voyou | Tue séparément un Villageois sans pouvoir |
| Chien-Loup | Choisit son camp au Jour 2 (Villageois ou Loup) |

### ⚖️ Camp des Neutres (7 rôles)
| Rôle | Victoire |
|------|----------|
| Joueur de Flûte | Charmer tous les survivants |
| Loup-Garou Solitaire | Être le dernier survivant |
| Bouc-Émissaire | Être éliminé par le vote du village |
| Ange | Être éliminé lors du premier vote |
| Voleur | Variable selon le rôle volé |
| Sectaire | Tous les survivants dans sa secte |
| Pyromane | Être le dernier survivant après l'incendie |

### 💔 Camp des Amoureux (3 rôles)
| Rôle | Mécanique |
|------|-----------|
| Amoureux | Survivre ensemble — se suicident si l'autre meurt |
| Amant Délaissé | Se suicide si son amour secret meurt |

---

## 🌙 Ordre de réveil (nuit type)

```
Nuit 1 uniquement :
  💘 Cupidon → ✝️ Prêtre → 💔 Amant Délaissé
  🌿 Enfant Sauvage → 👯 Deux Sœurs → 👨‍👦‍👦 Trois Frères
  🎭 Voleur

Toutes les nuits :
  🛡️ Salvateur
  🐺 Loups (tous camps confondus)
  🐺 Grand Méchant Loup → 🐺 Infect Père → 🤍 Loup Blanc (nuits paires)
  🃏 Loup Fou → 🐺🛡️ Loup-Fétiche → 🐺 Loup-Voyou
  🔮 Voyante → 🦊 Renard → 🐻 Montreur d'Ours
  🔍 Enquêteur → 🕵️ Détective → 🪶 Corbeau → 🌿 Garde Champêtre
  🧙‍♀️ Sorcière → 🧪 Sorcière de Salem
  🪈 Joueur de Flûte → 🙏 Sectaire → 🔥 Pyromane
```

---

## 🎨 Design

- **Thème** : Médiéval rustique, peinture sombre style tarot ancien
- **Palette** : Vert forêt `#2D4A22`, Brun `#5C3D1E`, Or `#C9A84C`, Beige `#D4B483`
- **Polices** : Cinzel (titres), Crimson Text (texte courant)
- **Mobile-first** : max-width 480px, optimisé pour être tenu en main

---

## 📱 Installation comme application

1. Ouvrir le site dans **Chrome (Android)** ou **Safari (iOS)**
2. **Android** : bannière automatique "Ajouter à l'écran d'accueil"
3. **iOS** : bouton Partager → "Sur l'écran d'accueil"
4. L'app apparaît avec son icône, plein écran, sans barre d'adresse

---

## 🛠️ Technologies

- **HTML / CSS / JavaScript** vanilla — aucune dépendance externe
- **localStorage** pour les profils joueurs
- **PWA** (manifest.json + service worker) pour l'installation mobile
- **GitHub Pages** pour l'hébergement (HTTPS gratuit)

---

## 👥 Crédits

Projet développé pour animer des parties de **Loups-Garous de Thiercelieux** en présentiel.
Illustrations générées avec IA (style peinture à l'huile sombre, tarot ancien).
Logo original : *Clair de Lune* — loup hurlant sous la lune dorée.

---

*Que la nuit tombe sur Thiercelieux... 🌙🐺*
