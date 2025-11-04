# Guide pas à pas : Créer un Jukebox de Noël avec p5.js

Ce guide vous accompagne dans la création d'un jukebox de Noël interactif à partir de zéro en utilisant p5.js. Chaque partie s'appuie sur la précédente, suivez donc les étapes dans l'ordre !

---

## Partie 0 : Introduction à p5.js

### Qu'est-ce que p5.js ?

p5.js est une bibliothèque JavaScript qui facilite la création de graphiques interactifs, d'animations et d'applications multimédias. Imaginez-le comme une toile numérique où vous pouvez dessiner, animer et répondre aux interactions utilisateur.

### Concepts clés

**Canvas** : Le canvas est votre zone de dessin - comme une feuille de papier vierge. Vous définissez sa taille (largeur et hauteur en pixels).

**Fonction Setup** : Celle-ci s'exécute une fois au démarrage de votre programme. C'est comme préparer votre espace de travail avant de commencer.

**Fonction Draw** : Celle-ci s'exécute en boucle, de nombreuses fois par seconde (généralement 60 fois par seconde). C'est comme un flipbook - à chaque exécution, elle dessine sur votre canvas.

**Variables globales** : Variables déclarées en dehors des fonctions qui peuvent être utilisées n'importe où dans votre code. Elles sont comme un tableau blanc partagé sur lequel toutes les fonctions peuvent lire et écrire.

### Exemple : Comprendre la boucle

Imaginez que vous dessinez une animation en flipbook. Vous dessinez une scène, tournez la page, dessinez la scène suivante légèrement différente (en faisant varier quelques propriétés de ce que vous desinez), et ainsi de suite. La fonction `draw()` fonctionne de la même manière - elle dessine sur le canvas, modifie légèrement les propriétés des entités présente sur le canvas, puis dessine l'image suivate. Tout cela en une fraction de seconde, créant l'illusion du mouvement.


### Pour commencer

Avant de commencer, vous aurez besoin de :
- Vous rendre sur l'éditeur en ligne de p5.js https://editor.p5js.org/
- Nous vous recommandons très fortement de vous créer un compte afin de pouvoir sauvegarder et partager vos réalisations durant cet atelier

### Code de démarrage

Voici le code minimal pour commencer. Copiez ceci dans un fichier appelé `sketch.js` :

```javascript
function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(0);
}

function mousePressed() {
    console.log("Mouse clicked at:", mouseX, mouseY);
}
```

**Ce que cela fait :**
- `setup()` : Crée un canvas de 800 pixels de large et 600 pixels de haut
- `draw()` : Dessine un fond noir à chaque image
- `mousePressed()` : Affiche la position de la souris dans la console lorsque vous cliquez

**Essayez** : Cliquez n'importe où sur le canvas et vérifiez la console de p5.js

**Notez** : Très souvent en informatique, l'origine (la coordonnée (0,0)) se trouve tout en haut à gauche

---

## Partie 1 : Jukebox de base

### Comprendre les boutons

Un bouton est simplement un rectangle à l'écran qui répond aux clics. Pensez aux boutons comme à des interrupteurs - vous cliquez dessus, et quelque chose se passe.

**Exemple du monde réel** : Sur un distributeur automatique, chaque bouton déclenche une action différente (distribuer une collation différente). Les boutons de notre jukebox déclencheront différents sons.

### Comment fonctionnent les boutons

Un bouton a besoin de :
1. **Position** : Où il apparaît à l'écran (coordonnées x et y)
2. **Taille** : Sa taille (largeur et hauteur)
3. **Label** : Texte qui indique à l'utilisateur ce qu'il fait
4. **Action** : Ce qui se passe quand vous cliquez dessus (une fonction à appeler)

**Analogie** : Imaginez le bouton d'une sonnette. Il a un emplacement (à côté de votre porte), une taille (le bouton lui-même), un label (une étiquette avec "Sonnez" écrit dessus), et une action (il complète le circuit électrique d'une sonnette lorsqu'on appuie dessus afin de produire un son).

### Stocker les propriétés des boutons

Nous stockerons les informations des boutons dans un tableau. Un tableau est comme une liste - vous pouvez avoir plusieurs éléments dans l'ordre.

Notre tableau de boutons sera consitué de plusieurs bouton avec des propriétés différentes :
- Bouton n°1 : Jouer le son 1
- Bouton n°2 : Jouer le son 2
- Bouton n°3 : Changer l'image de fond
- etc.


### Créer un bouton

Pour créer un bouton, nous devons :
1. Stocker ses informations (position, taille, label, action)
2. Le dessiner à l'écran
3. Vérifier s'il a été cliqué

**Processus étape par étape :**

1. **Stocker les données du bouton** : Créer un objet qui contient toutes les informations du bouton: ce sera notre façon de représenter un bouton dans notre code
2. **Dessiner le bouton** : Dessiner un rectangle et du texte dans la fonction `draw()`
3. **Vérifier les clics** : Dans `mousePressed()`, vérifier si le clic était dans la zone du bouton

### Callback de bouton

Un callback est une fonction qui est appelée quand quelque chose se passe. Pour les boutons, le callback est la fonction qui s'exécute lorsque vous cliquez sur le bouton.


### Exemple de code de bouton

Voici comment ajouter un bouton avec un callback :

```javascript
// Stocker les informations du bouton
let myButton = {
    name: "Cliquez-moi",
    x: 100,
    y: 100,
    width: 150,
    height: 40,
    callback: handleButtonClick
};

// Fonction qui s'exécute quand le bouton est cliqué
function handleButtonClick() {
    console.log("Le bouton a été cliqué !");
}

// Fonction pour dessiner un bouton
function drawButton(btn) {
    fill(100, 150, 255);  // Couleur bleue
    rect(btn.x, btn.y, btn.width, btn.height, 5);
    fill(255);  // Texte blanc
    textAlign(CENTER, CENTER);
    text(btn.name, btn.x + btn.width/2, btn.y + btn.height/2);
}

// Fonction pour vérifier si la souris est sur le bouton
function isMouseOver(btn) {
    return mouseX >= btn.x && 
           mouseX <= btn.x + btn.width &&
           mouseY >= btn.y && 
           mouseY <= btn.y + btn.height;
}

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(0);
    drawButton(myButton);
}

function mousePressed() {
    if (isMouseOver(myButton)) {
        myButton.callback();
    }
}
```

**Essayez** : Cliquez sur le bouton et observez la console. Vous devriez voir "Le bouton a été cliqué !" apparaître.

**Comprendre le code :**
- `isMouseOver()` vérifie si les coordonnées de la souris sont dans le rectangle du bouton
- Si c'est vrai, elle appelle la fonction callback du bouton
- Le callback peut faire n'importe quoi - afficher dans la console, jouer un son, changer une variable, etc.

### Jouer un son


**Comment ça fonctionne :**
1. Charger le fichier son depuis votre ordinateur
2. Le stocker dans une variable
3. Appeler `.play()` dessus quand vous voulez l'entendre


### Ajouter un son à votre bouton

Pour ajouter un son à un bouton :

1. **Créer une fonction qui charge et joue un son**
2. **Définir cette fonction comme callback du bouton**

**Étape par étape :**

1. Utiliser `loadSound()` pour charger un fichier son. Il prend deux paramètres :
   - Le chemin du fichier (comme 'assets/sound1.wav')
   - Une fonction callback qui s'exécute lorsque le chargement est terminé

2. Dans le callback, appeler `.play()` sur l'objet son

3. Définir cette fonction comme callback de votre bouton

**Ce qui se passe :**
- L'utilisateur clique sur le bouton
- Le callback du bouton s'exécute
- Le callback charge le fichier son
- Lorsque le chargement est terminé, le son joue

**Note importante** : Chaque fois que vous appelez `loadSound()`, il charge le fichier à nouveau. Pour les sons fréquemment joués, vous pourriez vouloir les charger une fois dans `setup()` et les stocker, puis simplement appeler `.play()` dans le callback.

---

## Partie 2 : Personnalisation de base

### Changer le fond

Changer le fond est comme changer le papier peint dans une pièce. Vous pouvez utiliser soit :
1. Une couleur unie (comme peindre le mur)
2. Une image (comme accrocher du papier peint)

**Analogie du monde réel** : Sur votre téléphone, vous pouvez définir un fond de couleur unie ou utiliser une photo. Notre jukebox fonctionne de la même manière.

### Comprendre les images de fond

Les images de fond sont des images chargées depuis des fichiers (comme des fichiers PNG ou JPG). Elles sont chargées de manière asynchrone, ce qui signifie :
- Vous commencez à charger l'image
- Le programme continue de s'exécuter
- Quand l'image est prête, une fonction callback s'exécute

**Pourquoi c'est important** : Si vous essayez de dessiner une image qui n'est pas encore chargée, vous obtiendrez une erreur ou ne verrez rien. C'est pourquoi nous vérifions si l'image existe avant de la dessiner.

**Exemple en dehors de ce projet** : Imaginez commander de la nourriture en ligne :
1. Vous passez la commande (commencez à charger l'image)
2. Vous pouvez naviguer sur d'autres pages en attendant (le programme continue)
3. Quand la nourriture arrive (l'image se charge), vous recevez une notification (le callback s'exécute)

### Basculer entre les fonds

Pour basculer entre les fonds :
1. Stocker tous les chemins de fichiers de fond dans un tableau
2. Garder une trace de celui qui est actuellement actif (en utilisant un numéro d'index)
3. Quand l'utilisateur clique sur un bouton, incrémenter l'index
4. Revenir au premier quand vous atteignez la fin

**Exemple** : Si vous avez 3 fonds :
- Départ : index 0 (premier fond)
- Clic : index 1 (deuxième fond)
- Clic : index 2 (troisième fond)
- Clic : index 0 à nouveau (retour au premier)

Cela s'appelle "cycler" ou "boucler" à travers les options.

### Afficher du texte

Le texte dans p5.js est comme écrire sur une toile. Vous contrôlez :
- Ce que dit le texte
- Où il apparaît (coordonnées x et y)
- Sa couleur
- Sa taille
- Comment il est aligné (gauche, centre, ou droite)

**Analogie du monde réel** : Pensez au texte comme à une enseigne sur une devanture. Vous choisissez :
- Le message ("OUVERT")
- L'emplacement (centre de la vitrine)
- La taille (assez grande pour être lue de loin)
- La couleur (peut-être rouge pour attirer l'attention)

### Positionnement du texte

Le positionnement du texte peut être délicat car le texte peut être aligné de différentes manières :

**Aligné à gauche** : La coordonnée x est où le texte commence (bord gauche)
- Exemple : Si x = 100, le texte commence au pixel 100

**Centré** : La coordonnée x est le centre du texte
- Exemple : Si x = 400, le centre du texte est au pixel 400

**Aligné à droite** : La coordonnée x est où le texte se termine (bord droit)
- Exemple : Si x = 700, le texte se termine au pixel 700

**Exemple du monde réel** : Pensez à une règle. Si vous voulez centrer le texte à la marque de 6 pouces, vous alignez le centre du texte avec cette marque. Si vous voulez du texte aligné à gauche, vous alignez le bord gauche avec cette marque.

### Créer une fonction de texte

Une bonne pratique est de créer une fonction réutilisable pour dessiner du texte. Cela facilite le dessin de texte avec un style cohérent.

**Pourquoi utiliser une fonction ?** : Au lieu d'écrire le même code encore et encore, vous l'écrivez une fois et l'appelez quand vous en avez besoin.

**Exemple en dehors de ce projet** : Au lieu de dire à quelqu'un la recette pour faire du café à chaque fois, vous l'écrivez une fois et vous y référez. Une fonction est comme cette recette écrite.

**Avantages :**
- Style cohérent (tout le texte a le même aspect)
- Facile à changer (mettez à jour la fonction une fois, tout le texte change)
- Moins de code à écrire (réutiliser au lieu de répéter)

---

## Partie 3 : Effets de particules

### Qu'est-ce que les particules ?

Les particules sont de petits objets qui se déplacent à l'écran pour créer des effets visuels. Pensez-y comme :
- Flocons de neige qui tombent
- Étincelles d'un feu
- Gouttes de pluie
- Confettis

**Analogie du monde réel** : Dans un film, quand vous voyez un effet magique (comme des paillettes ou de la fumée), ceux-ci sont souvent créés en utilisant des systèmes de particules. Chaque paillette ou bouffée de fumée est une minuscule particule qui bouge et s'estompe.

### Pourquoi utiliser des tableaux pour les particules ?

Lorsque vous avez de nombreux objets similaires (comme 100 flocons de neige), vous utilisez un tableau pour tous les stocker. C'est comme avoir une boîte pleine d'objets identiques - vous pouvez en sortir un, le regarder, le modifier, ou le remettre.

**Exemple en dehors de ce projet** : Imaginez un parking :
- Chaque voiture est un objet (a une position, couleur, taille)
- Le parking est un tableau (stocke toutes les voitures)
- Vous pouvez parcourir toutes les voitures pour vérifier si un espace est vide
- Vous pouvez ajouter de nouvelles voitures ou retirer des voitures du tableau

**Pourquoi des tableaux ?** : Au lieu d'avoir 100 variables séparées (`snowflake1`, `snowflake2`, etc.), vous avez un tableau (`snowflakes`) avec 100 éléments. Cela facilite le travail avec tous en même temps.

### Initialisation

L'initialisation signifie "mettre en place" ou "préparer". Pour les particules, l'initialisation signifie :
1. Créer le tableau
2. Créer chaque objet particule
3. Donner à chaque particule des valeurs de départ (position, taille, vitesse, etc.)

**Pourquoi initialiser ?** : Vous devez mettre en place les particules avant de pouvoir les dessiner. C'est comme préparer les ingrédients avant de cuisiner - vous ne pouvez pas cuisiner sans ingrédients.

**Initialisation étape par étape :**

1. **Créer un tableau vide** : Commencer avec un conteneur vide
   - Exemple : `snowflakes = []` (tableau vide)

2. **Créer des particules dans une boucle** : Puisque vous avez besoin de nombreuses particules, utilisez une boucle
   - Exemple : Créer 50 flocons de neige
   - Chaque itération de la boucle crée une particule

3. **Définir des valeurs de départ aléatoires** : Donner à chaque particule des propriétés aléatoires
   - Position aléatoire (pour qu'elles ne commencent pas toutes au même endroit)
   - Taille aléatoire (pour qu'elles aient l'air variées)
   - Vitesse aléatoire (pour qu'elles se déplacent à des rythmes différents)

**Exemple du monde réel** : Imaginez remplir un bocal avec des billes :
1. Vous commencez avec un bocal vide (tableau vide)
2. Vous ajoutez des billes une par une (boucle, ajout de particules)
3. Chaque bille peut être d'une couleur ou taille différente (propriétés aléatoires)

### Animation

L'animation signifie faire bouger et changer les choses au fil du temps. Pour les particules, l'animation implique :
1. Mettre à jour les propriétés de chaque particule (position, taille, couleur, etc.)
2. Dessiner chaque particule dans sa nouvelle position
3. Répéter cela à chaque image

**Comment fonctionne l'animation :**
- À chaque image, les particules bougent un peu
- Sur de nombreuses images, cela crée l'illusion d'un mouvement continu
- Comme un flipbook - chaque page montre une position légèrement différente

**Boucle d'animation étape par étape :**

1. **Parcourir toutes les particules** : Vérifier chaque particule une par une

2. **Mettre à jour les propriétés** : Changer les valeurs de la particule
   - Déplacer la position (ajouter la vitesse à x ou y)
   - Changer la taille (peut-être la rendre plus petite au fil du temps)
   - Changer la couleur/transparence (peut-être s'estomper)

3. **Vérifier les limites** : Voir si la particule est sortie de l'écran
   - Si oui, la réinitialiser ou la supprimer
   - Ou la faire réapparaître de l'autre côté

4. **Dessiner la particule** : La dessiner à sa position actuelle

5. **Répéter** : Faire cela à chaque image (60 fois par seconde)

**Exemple en dehors de ce projet** : Pensez à un économiseur d'écran avec des bulles flottantes :
- Chaque bulle est une particule
- Chaque seconde, chaque bulle bouge légèrement
- Certaines bulles éclatent (disparaissent) quand elles atteignent le bord
- De nouvelles bulles apparaissent pour les remplacer
- Cela crée une animation continue

### Types d'effets de particules

**Neige** : Les particules tombent vers le bas, se balancent d'un côté à l'autre
- Mouvement : Vers le bas (comme la gravité) + balancement horizontal
- Réinitialisation : Quand la particule passe sous l'écran, la remettre en haut

**Feu** : Les particules montent vers le haut, scintillent, s'estompent
- Mouvement : Vers le haut + mouvement horizontal aléatoire
- Réinitialisation : Quand la particule s'estompe, la réinitialiser en bas
- Couleur : Change selon la valeur "vie" (plus brillante quand nouvelle, plus sombre en s'estompant)

**Étoiles** : Les particules restent en place, mais scintillent (la luminosité change)
- Mouvement : Aucun (les étoiles sont stationnaires)
- Animation : La luminosité change au fil du temps en utilisant une onde sinusoïdale
- Spécial : Faire apparaître occasionnellement une "étoile filante" qui traverse l'écran

**Comparaison du monde réel** :
- Neige : Comme de la vraie neige qui tombe du ciel
- Feu : Comme des flammes qui montent d'un feu de camp
- Étoiles : Comme des étoiles dans le ciel nocturne qui scintillent

### Gérer plusieurs animations

Vous pouvez avoir plusieurs systèmes de particules qui s'exécutent en même temps, mais généralement vous n'en affichez qu'un à la fois. Pour basculer entre eux :

1. **Stocker toutes les animations dans un tableau** : Comme une playlist
2. **Garder une trace de l'animation actuelle** : Stocker un numéro d'index
3. **Bouton pour basculer** : Incrémenter l'index, revenir au début quand vous atteignez la fin
4. **Dessiner uniquement l'animation actuelle** : Dans `draw()`, appeler uniquement la fonction de dessin de l'animation actuelle

**Exemple** : Comme basculer entre les chaînes de télévision :
- Vous avez 3 chaînes (Neige, Feu, Étoiles)
- Vous êtes actuellement sur la chaîne 1 (Neige)
- Appuyez sur un bouton pour aller à la chaîne 2 (Feu)
- La télévision n'affiche qu'une chaîne à la fois

---

## Résumé

Félicitations ! Vous avez appris à créer un jukebox interactif avec :

1. **Boutons** : Rectangles interactifs qui répondent aux clics
2. **Callbacks** : Fonctions qui s'exécutent quand les boutons sont cliqués
3. **Sons** : Chargement et lecture de fichiers audio
4. **Fonds** : Basculer entre des couleurs unies et des images
5. **Texte** : Affichage de texte stylisé sur le canvas
6. **Particules** : Création d'effets animés avec des tableaux d'objets
7. **Animation** : Faire bouger et changer les choses au fil du temps

### Points clés à retenir

- Les **tableaux** sont excellents pour stocker plusieurs éléments similaires (boutons, particules)
- Les **callbacks** vous permettent de répondre aux événements (clics, fin de chargement)
- Les **fonctions** aident à organiser le code et le rendre réutilisable
- Les **boucles** sont essentielles pour travailler avec de nombreux éléments (particules)
- Les **valeurs aléatoires** rendent les choses naturelles et variées
- L'**animation** consiste simplement à mettre à jour et redessiner de nombreuses fois par seconde

### Prochaines étapes

Essayez d'expérimenter avec :
- Ajouter plus de boutons
- Changer les couleurs et vitesses des particules
- Ajouter de nouveaux effets de particules
- Créer vos propres fichiers son
- Ajouter plus d'images de fond
- Changer le message texte

N'oubliez pas : La programmation consiste à décomposer les gros problèmes en petites étapes. Chaque partie de ce projet n'était qu'une petite étape s'appuyant sur les précédentes. Continuez à pratiquer, et vous vous améliorerez avec chaque projet !

