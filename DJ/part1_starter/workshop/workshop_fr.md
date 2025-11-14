# Atelier : Créer une Table de Mixage DJ

Bienvenue dans l'atelier de création d'une table de mixage DJ ! À la fin de cette session, vous aurez créé une table de mixage entièrement fonctionnelle où vous pourrez jouer deux sons simultanément, contrôler leurs volumes indépendamment et les mélanger ensemble - comme un vrai DJ !

---

## Introduction : Ce que nous allons construire

Imaginez que vous êtes DJ à une fête. Vous avez deux platines (ou decks) devant vous. Chaque deck peut jouer une chanson différente, et vous pouvez contrôler le volume de chacune indépendamment. Vous pouvez démarrer et arrêter chaque piste, et les mélanger ensemble pour créer un son unique. C'est exactement ce que nous allons construire - mais en version numérique !

**Votre table de mixage aura :**
- Deux pistes qui peuvent jouer des sons
- Chaque piste a son propre bouton play/pause
- Chaque piste a son propre slider de volume
- Les deux pistes peuvent jouer en même temps (mixage !)
- Les sons jouent en boucle

**Connexion au monde réel** : C'est similaire au fonctionnement des logiciels DJ professionnels - plusieurs pistes, contrôles indépendants, et la capacité de mélanger les sons ensemble. Une fois que vous comprenez ces concepts, vous pouvez les appliquer pour créer des applications audio plus complexes !

### Pour commencer : Code de base

Avant de commencer, vous avez besoin d'un point de départ. Voici le code minimal pour faire fonctionner votre projet :

```javascript
function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(255);
}
```

**Comprendre setup() et draw()** : Ce sont deux fonctions spéciales dans p5.js qui fonctionnent ensemble :

- **`setup()`** - Cette fonction s'exécute **une fois** au tout début lorsque votre programme démarre. C'est comme préparer votre espace de travail avant de commencer. Ici, elle crée votre canvas (votre zone de dessin). Utilisez `setup()` pour les choses qui ne doivent se produire qu'une seule fois : créer le canvas, charger les paramètres initiaux, créer les boutons et les curseurs.

- **`draw()`** - Cette fonction s'exécute **indéfiniment** (60 fois par seconde, en continu). C'est comme une boucle qui ne s'arrête jamais. À chaque image, p5.js appelle `draw()` pour mettre à jour et afficher tout à l'écran. Utilisez `draw()` pour les choses qui doivent se produire de manière répétée : dessiner des formes, mettre à jour les positions, vérifier les changements, lire les valeurs des curseurs.

**Pensez-y comme ceci** : 
- `setup()` = "Tout préparer" (se produit une fois)
- `draw()` = "Continuer à mettre à jour et afficher les choses" (se produit indéfiniment)

**Ce que ce code fait :**
- `setup()` crée votre canvas (votre zone de dessin) - s'exécute une fois au démarrage du programme
- `draw()` définit la couleur de fond en blanc - s'exécute en continu, rafraîchissant l'écran 60 fois par seconde

**Comprendre les fonctions** : Le code ci-dessus utilise des **fonctions** - ce sont comme des recettes qui contiennent des instructions. `setup()` et `draw()` sont des fonctions spéciales que p5.js appelle automatiquement. Nous créerons nos propres fonctions plus tard dans ce projet !

**Documentation** : Apprenez-en plus sur [`setup()`](https://p5js.org/reference/#/p5/setup) et [`draw()`](https://p5js.org/reference/#/p5/draw) dans la documentation p5.js.

---

## Comprendre la vue d'ensemble

Avant de commencer à coder, comprenons comment tout s'articule :

### Le concept clé : Les objets

Dans ce projet, nous allons utiliser **des objets** pour organiser notre code.

**Qu'est-ce qu'un objet ?** Un objet est comme un classeur avec plusieurs tiroirs. Chaque tiroir (appelé "propriété") a une étiquette et stocke quelque chose de spécifique. Tous les tiroirs appartiennent à un classeur (l'objet).

Toutes ces informations appartiennent ensemble car elles concernent UNE piste. C'est pourquoi nous les mettons toutes dans UN objet !

**Concept visuel** : [PLACEHOLDER SCHÉMA : Diagramme montrant un objet Track avec toutes ses propriétés : sound, volume, isPlaying, button, slider]

Pensez-y comme à une carte de recette :
- **Objet** = la carte de recette
- **Propriétés** = les ingrédients et instructions sur la carte
- Chaque piste est une carte de recette séparée avec ses propres ingrédients

---

## Étape 1 : Créer des objets Track

### Comprendre les objets

Un objet est un moyen de regrouper des informations liées ensemble. Au lieu d'avoir des variables séparées dispersées, nous mettons tout ce qui concerne une piste au même endroit.

**Pourquoi utiliser des objets ?**
- Cela garde les données liées organisées
- Cela rend le code plus facile à comprendre
- Cela rend le code plus facile à maintenir
- C'est ainsi que les développeurs professionnels organisent le code


### Étape 1A : Créer votre premier objet Track

**Comprendre les variables et les objets** : Avant de créer l'objet, comprenons ce que nous faisons :
- Une **variable** est comme une boîte étiquetée qui stocke des informations. Nous allons créer une variable appelée `track1` pour stocker les informations de notre piste.
- Un **objet** est une collection d'informations liées regroupées ensemble. Au lieu d'avoir des variables séparées comme `track1Sound`, `track1Volume`, etc., nous mettons tout ce qui concerne la piste 1 dans un objet.
- Une **propriété** est une information stockée dans un objet. Chaque propriété a un nom (comme `volume`) et une valeur (comme `0.5`).

**Le concept** : Chaque piste doit stocker :
- Le fichier son qu'elle jouera
- Le volume actuel (0.0 à 1.0)
- Si elle est actuellement en lecture (true/false)
- Un slider pour contrôler le volume (nous le créerons plus tard)
- Un bouton pour play/pause (nous le créerons plus tard)

**Ce que vous devez faire** : Créez un objet appelé `track1` qui contient toutes ces propriétés. Réfléchissez à ce que chaque propriété doit stocker :
- Le fichier son : commencez par `null` (nous le chargerons plus tard)
- Le volume : commencez par `0.5` (ce qui représente 50% de volume)
- Si elle est en lecture : commencez par `false` (pas encore en lecture)
- Le slider : commencez par `null` (nous le créerons plus tard)
- Le bouton : commencez par `null` (nous le créerons plus tard)
- La position du bouton : un objet avec les coordonnées x et y (x: 150, y: 200)
- Le label du bouton : texte comme "Track 1"

**Pourquoi ces propriétés ?** Chaque propriété stocke une information sur la piste. En les mettant toutes dans un objet, nous pouvons facilement accéder à tout ce qui concerne la piste 1.

**Concept visuel** : [PLACEHOLDER SCHÉMA : Diagramme montrant la structure de l'objet track1 avec l'objet button imbriqué]

**Documentation** : Apprenez-en plus sur [les objets JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects).

### Étape 1B : Créer votre deuxième objet Track

**La logique** : Vous avez besoin de deux pistes pour le mixage, donc vous avez besoin de deux objets track. Ils auront la même structure, mais des valeurs différentes.

**Ce que vous devez faire** : Créez un deuxième objet appelé `track2` avec la même structure que `track1`, mais avec des valeurs différentes :
- La coordonnée x de la position du bouton devrait être 450 (au lieu de 150) - cela le place à droite
- Le label du bouton devrait être "Track 2" (au lieu de "Track 1")

**Logique de positionnement** : Pour placer les boutons côte à côte, donnez-leur des positions x différentes mais la même position y. Pensez-y comme placer deux objets sur la même étagère - ils sont à la même hauteur (y), mais à des positions horizontales différentes (x).

**Concept visuel** : [PLACEHOLDER SCHÉMA : Diagramme de mise en page montrant deux boutons de piste côte à côte]

**Testez !** Vous ne verrez rien encore, mais vos objets sont créés. Vérifiez la console pour toute erreur.

---

## Étape 2 : Créer les boutons

### Comprendre les boutons

Les boutons sont des éléments interactifs qui répondent aux clics. Dans p5.js, vous pouvez créer des boutons en utilisant `createButton()`, qui gère automatiquement la détection des clics pour vous.

**Qu'est-ce qui fait fonctionner un bouton ?**
- Position : où il apparaît à l'écran
- Label : texte qui indique à l'utilisateur ce qu'il fait
- Gestionnaire de clic : ce qui se passe quand vous cliquez dessus

**Exemple du monde réel** : Un interrupteur :
- Position : sur le mur (emplacement spécifique)
- Label : peut-être "Lumière de la cuisine" ou "Lumière du salon" écrit dessus
- Action : allume/éteint les lumières quand on appuie

### Étape 2A : Créer les boutons avec createButton()

**Pourquoi dans `setup()` ?** Les boutons sont créés une fois et restent à l'écran. Puisque `setup()` s'exécute une fois au début, c'est l'endroit parfait pour créer tous vos boutons. Vous ne voulez pas créer de nouveaux boutons 60 fois par seconde dans `draw()` - cela créerait des milliers de boutons !

**La logique** : Dans p5.js, vous pouvez créer des boutons en utilisant `createButton()`. Cela crée un élément bouton HTML qui gère automatiquement les clics - vous n'avez pas besoin de vérifier manuellement si la souris a cliqué sur le bouton !

**Ce que vous devez faire** : Dans `setup()`, après avoir créé le canvas, créez des boutons pour chaque piste. Pour chaque bouton :
1. Créez le bouton en utilisant le label du bouton de la piste
2. Positionnez-le en utilisant les coordonnées de position du bouton de la piste
3. Connectez-le à une fonction qui gérera le clic - pour l'instant, cette fonction peut simplement afficher un message dans la console avec `console.log()`

**Pourquoi utiliser createButton() ?**
- C'est plus simple que de dessiner les boutons manuellement
- Cela gère automatiquement la détection des clics
- Cela crée un vrai bouton HTML avec lequel les utilisateurs peuvent interagir

**La connexion** : Quand vous connectez un bouton à une fonction, vous dites "quand ce bouton est cliqué, exécute cette fonction." Pour l'instant, votre fonction peut simplement afficher un message pour vérifier que le bouton fonctionne.

**Concept visuel** : [PLACEHOLDER SCHÉMA : Diagramme montrant la création et le positionnement des boutons]

**Documentation** : [`createButton()`](https://p5js.org/reference/#/p5/createButton) crée un élément bouton.

**Testez !** Vous devriez voir deux boutons affichés à l'écran ! Cliquez sur les boutons et regardez la console dans l'éditeur p5.js (en bas de l'écran). Vous devriez voir vos messages `console.log()` apparaître chaque fois que vous cliquez sur un bouton. C'est une excellente façon de vérifier que vos boutons fonctionnent avant d'ajouter la fonctionnalité complète de play/pause !

---

## Étape 3 : Charger les sons

### Comprendre le chargement des sons

Les sons doivent être chargés avant de pouvoir les jouer. Dans p5.js, nous utilisons la fonction `preload()` pour charger les sons avant que le programme ne démarre.

**Comprendre la fonction preload()** : `preload()` est une fonction spéciale dans p5.js qui s'exécute automatiquement avant `setup()`. Elle est conçue pour charger des fichiers (comme des images et des sons) afin qu'ils soient prêts lorsque votre programme démarre. Pensez-y comme préparer les ingrédients avant de cuisiner - vous rassemblez tout ce dont vous avez besoin d'abord, puis vous pouvez les utiliser.

**Pourquoi preload() ?**
- Cela garantit que les sons sont prêts avant d'essayer de les utiliser
- Cela s'exécute avant `setup()`, donc tout est chargé quand le programme démarre
- Cela empêche les erreurs d'essayer de jouer des sons qui ne sont pas encore chargés


### Étape 3A : Charger les sons dans les objets Track

**Le concept** : Dans `preload()`, vous devez charger chaque fichier son et l'assigner à la propriété `sound` de la piste. Cela connecte le fichier son à l'objet track.

**Où vont les sons ?** Mettez vos fichiers son dans un dossier `assets` dans votre projet. Formats courants : WAV, MP3, OGG.

**Ce que vous devez faire** : Dans `preload()`, chargez deux fichiers son et assignez-les aux objets track :
- Chargez le premier fichier son depuis le dossier assets et assignez-le à `track1.sound`
- Chargez le deuxième fichier son depuis le dossier assets et assignez-le à `track2.sound`

**Le processus** : Pensez-y comme ceci - vous dites à p5.js "va chercher ce fichier son et stocke-le dans l'objet track pour que nous puissions l'utiliser plus tard."

**Documentation** : [`loadSound()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile) charge les fichiers son. Note : Vous devez inclure la bibliothèque p5.sound !

**Testez !** Les sons devraient se charger sans erreur. Vérifiez la console si quelque chose ne va pas.

### Étape 3B : Définir le volume initial

**La logique** : Quand les sons sont chargés, vous devriez définir leur volume initial pour qu'ils soient prêts à jouer au bon niveau.

**Pourquoi dans `setup()` ?** Rappelez-vous, `setup()` s'exécute une fois au début. C'est parfait pour définir les valeurs initiales qui ne doivent se produire qu'une seule fois - comme définir le volume de départ. Nous n'avons pas besoin de définir le volume 60 fois par seconde, juste une fois au démarrage du programme !

**Ce que vous devez faire** : Dans `setup()`, après avoir créé le canvas et les boutons, définissez le volume pour les deux pistes. Vous utiliserez la valeur de volume stockée dans chaque objet track et l'appliquerez au son.

**Pourquoi ?** Cela garantit que les sons commencent au bon niveau de volume quand ils sont joués pour la première fois.

**Le processus** : Pour chaque piste, prenez la valeur de volume de l'objet track et appliquez-la au son. Cela connecte le réglage de volume à la lecture réelle du son.

**Documentation** : [`.setVolume()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/setVolume) définit le volume d'un son.

---

## Étape 4 : Créer les sliders de volume

### Comprendre les sliders

Les sliders sont des contrôles qui permettent aux utilisateurs d'ajuster une valeur en glissant. Chaque piste a besoin de son propre slider pour contrôler son volume.

**Qu'est-ce qui fait fonctionner un slider ?**
- Une plage de valeurs (minimum et maximum)
- Une valeur actuelle (où le slider est positionné)
- Une position à l'écran (où il apparaît)

**Exemple du monde réel** : Un bouton de volume sur une chaîne stéréo :
- Plage : de silencieux (0) à maximum (100%)
- Valeur actuelle : où le bouton est tourné
- Position : sur le panneau de contrôle de la chaîne

### Étape 4A : Créer les sliders

**Pourquoi dans `setup()` ?** Tout comme les boutons, les sliders sont créés une fois et restent à l'écran. Puisque `setup()` s'exécute une fois au début, c'est l'endroit parfait pour créer tous vos sliders. Nous lirons leurs valeurs dans `draw()` (qui s'exécute en continu), mais nous ne les créons qu'une seule fois dans `setup()`.

**Le concept** : Dans p5.js, vous créez des sliders en utilisant `createSlider()`. Chaque piste a besoin de son propre slider.

**Ce que vous devez faire** : Dans `setup()`, après avoir créé les boutons, créez des sliders pour chaque piste. Pour chaque slider :
1. Créez un slider avec une plage de 0 à 100, commençant à 50 (ce qui représente 50% de volume)
2. Positionnez-le en utilisant les coordonnées de position du slider de la piste

**Pourquoi ces valeurs ?**
- 0 à 100 représente 0% à 100% de volume (facile à comprendre pour les utilisateurs)
- Commencer à 50 signifie que le slider commence à 50% de volume (demi-volume)
- Nous convertirons cela en 0.0-1.0 plus tard quand nous l'appliquerons au son

**Pourquoi utiliser sliderPosition ?** Cela garde la position organisée dans l'objet track, ce qui facilite les modifications ultérieures. C'est comme avoir l'adresse écrite - vous pouvez la trouver facilement !

**Concept visuel** : [PLACEHOLDER SCHÉMA : Diagramme de mise en page montrant les boutons et sliders positionnés pour chaque piste]

**Documentation** : [`createSlider()`](https://p5js.org/reference/#/p5/createSlider) crée un élément slider.

**Testez !** Vous devriez voir deux sliders à l'écran que vous pouvez faire glisser !

### Étape 4B : Ajouter les labels de volume

**Qu'est-ce qu'un label ?** Un label (ou étiquette en français) est un texte qui explique ce que fait un élément de l'interface. C'est comme une petite note écrite qui dit "ceci contrôle le volume" ou "ce bouton sert à jouer la piste". Dans notre cas, nous voulons ajouter du texte qui dit "Volume" au-dessus de chaque slider pour que les utilisateurs sachent immédiatement ce que contrôlent ces sliders.

**Pourquoi dans `draw()` ?** Les labels sont dessinés sur le canvas, et tout ce qui est dessiné sur le canvas doit être dans `draw()` car `draw()` s'exécute en continu pour rafraîchir l'écran. Si vous dessinez du texte dans `setup()`, il n'apparaîtrait qu'une seule fois et pourrait être recouvert par le fond. Dans `draw()`, les labels sont redessinés à chaque image, donc ils restent toujours visibles.

**La logique** : Les utilisateurs doivent savoir ce que contrôlent les sliders. Ajouter des labels rend l'interface plus claire et plus facile à utiliser. Sans labels, les utilisateurs ne sauraient pas que les sliders contrôlent le volume !

**Ce que vous devez faire** : Dans votre fonction `draw()`, dessinez du texte au-dessus de chaque slider. Le texte devrait dire "Volume" et être positionné juste au-dessus de chaque slider. Pour dessiner du texte dans p5.js, vous utiliserez la fonction `text()`.

**Le processus** : Réfléchissez à où chaque slider est positionné, puis placez le texte légèrement au-dessus. Vous utiliserez la même coordonnée x que le slider, mais une coordonnée y légèrement plus petite (plus haut sur l'écran, car les coordonnées y augmentent vers le bas). Pensez-y comme placer une étiquette au-dessus d'un objet - vous voulez qu'elle soit au même endroit horizontalement (x), mais légèrement plus haute (y plus petit).

**Testez !** Vous devriez voir le texte "Volume" au-dessus de chaque slider !

---

## Étape 5 : Fonctionnalité Play/Pause

### Comprendre la logique de bascule

Une bascule change entre deux états. Pour play/pause :
- Si en lecture → mettez en pause
- Si pas en lecture → jouez-le

**Analogie du monde réel** : Un interrupteur :
- Si la lumière est allumée → éteignez-la
- Si la lumière est éteinte → allumez-la

### Étape 5A : Créer la fonction de bascule

**La logique** : Vous avez besoin d'une fonction qui bascule l'état de lecture d'une piste. Cette fonction devrait fonctionner pour n'importe quelle piste, donc elle prend un objet track en entrée.

**Ce que vous devez faire** : Créez une fonction qui :
1. Prend un objet track en entrée (pour qu'elle puisse fonctionner avec track1 ou track2)
2. Vérifie si le son de la piste est actuellement en lecture
3. Si en lecture : mettez-le en pause et mettez à jour l'état de lecture de la piste à false
4. Si pas en lecture :
   - Définissez le volume au réglage de volume actuel de la piste
   - Définissez-le en boucle (pour qu'il joue continuellement)
   - Commencez à le jouer
   - Mettez à jour l'état de lecture de la piste à true

**Pourquoi vérifier l'état d'abord ?** Parce que nous devons savoir quoi faire - s'il est en lecture, nous le mettons en pause ; s'il n'est pas en lecture, nous le jouons. C'est la logique de "bascule" - changer entre deux états.

**L'ordre compte** : Assurez-vous de définir le volume et les réglages de boucle avant de jouer, pour que le son commence avec les bons réglages.

**Documentation** :
- [`.isPlaying()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/isPlaying) vérifie si le son est en lecture
- [`.pause()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/pause) met le son en pause
- [`.play()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/play) joue le son
- [`.setLoop()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/setLoop) fait boucler le son

### Étape 5B : Connecter les boutons à la fonction de bascule

**La logique** : Maintenant que vous avez créé la fonction de bascule, vous devez remplacer les fonctions `console.log()` que vous avez utilisées dans l'étape 2 par la vraie fonction de bascule. Quand vous créez des boutons avec `createButton()`, vous les connectez à des fonctions en utilisant `.mousePressed()`. Cela gère automatiquement la détection des clics pour vous.

**Ce que vous devez faire** : Retournez à la partie de votre code où vous avez créé les boutons dans `setup()` (étape 2). Remplacez les fonctions `console.log()` par des appels à la fonction de bascule. Quand un bouton est cliqué, il devrait maintenant appeler la fonction de bascule avec l'objet track approprié au lieu d'afficher simplement un message dans la console.

**Pourquoi cela fonctionne ?** La méthode `.mousePressed()` détecte automatiquement quand le bouton est cliqué et appelle votre fonction. Pas besoin de vérifier manuellement les coordonnées de la souris ! C'est comme si le bouton "savait" quand il a été cliqué.

**La connexion** : Pensez-y comme ceci - le bouton est connecté à la fonction de bascule, et quand il est cliqué, il passe l'objet track à la fonction. De cette façon, la fonction sait quelle piste contrôler.

**Concept visuel** : [PLACEHOLDER SCHÉMA : Diagramme montrant la connexion du bouton avec le callback mousePressed]

**Documentation** : [`.mousePressed()`](https://p5js.org/reference/#/p5.Element/mousePressed) connecte une fonction aux clics de bouton.

**Testez !** Cliquez sur les boutons - les sons devraient jouer et se mettre en pause !

---

## Étape 6 : Contrôle du volume

### Comprendre les mises à jour en temps réel

Le volume doit se mettre à jour continuellement pendant que l'utilisateur déplace le slider. Cela se produit dans la fonction `draw()`, qui s'exécute plusieurs fois par seconde.

**Pourquoi utiliser `draw()` pour cela ?** Rappelez-vous, `draw()` s'exécute indéfiniment (60 fois par seconde). Cela le rend parfait pour vérifier les choses qui changent continuellement, comme les positions des sliders. À chaque image, nous vérifions la valeur du slider et mettons à jour le volume. Cela crée un contrôle fluide en temps réel - lorsque vous déplacez le slider, le volume change immédiatement !

**La logique** :
1. Lisez la valeur actuelle du slider
2. Convertissez-la en volume (0.0 à 1.0)
3. Appliquez-la au son s'il est en lecture

### Étape 6A : Lire les valeurs des sliders

**Le concept** : Les sliders retournent des valeurs de 0 à 100, mais les sons ont besoin de valeurs de 0.0 à 1.0. Vous devez convertir entre ces deux échelles.

**Ce que vous devez faire** : Dans votre fonction `draw()`, lisez la valeur du slider de chaque piste et convertissez-la en volume. La conversion est simple - divisez la valeur du slider par 100. Cela convertit du pourcentage (0-100) au décimal (0.0-1.0).

**Pourquoi diviser par 100 ?**
- Les sliders utilisent 0-100 (pourcentage) - c'est intuitif pour les utilisateurs (50 = 50%)
- Les sons utilisent 0.0-1.0 (décimal) - c'est ce que la bibliothèque son attend
- Diviser par 100 convertit entre eux : 50 ÷ 100 = 0.5

**Le processus** : Pour chaque piste, lisez la valeur du slider, divisez par 100, et stockez-la dans la propriété volume de la piste. Cela se produit à chaque frame, donc le volume se met à jour en temps réel pendant que l'utilisateur déplace le slider.

### Étape 6B : Appliquer le volume aux sons en lecture

**La logique** : Mettez à jour le volume uniquement pour les sons qui sont actuellement en lecture. Il n'y a pas de raison de mettre à jour le volume d'un son qui n'est pas en lecture.

**Ce que vous devez faire** : Dans votre fonction `draw()`, après avoir mis à jour les valeurs de volume depuis les sliders, vérifiez si le son de chaque piste est en lecture. Si c'est le cas, appliquez le nouveau volume au son.

**Pourquoi vérifier si en lecture ?**
- Si un son n'est pas en lecture, il n'y a pas besoin de mettre à jour son volume
- C'est plus efficace de ne mettre à jour que quand c'est nécessaire
- Quand le son commencera à jouer plus tard, il utilisera le réglage de volume actuel

**Le processus** : Pour chaque piste, vérifiez si le son est en lecture. Si oui, prenez la valeur de volume que vous venez de calculer et appliquez-la au son. Cela fait que le volume change en douceur pendant que vous déplacez le slider.

**Testez !** Déplacez les sliders pendant que les sons jouent - le volume devrait changer en temps réel !

---

## Tout mettre ensemble

### Le flux complet

Votre table de mixage devrait maintenant fonctionner comme ceci :

1. **Setup** : Charger les sons, créer les boutons et sliders, définir le volume initial
2. **Boucle Draw** (s'exécute en continu) :
   - Dessiner tous les éléments visuels (labels, etc.)
   - Lire les valeurs des sliders et les convertir en volume
   - Appliquer le volume aux sons en lecture
3. **Détection des clics** : Quand un bouton est cliqué, basculez l'état de lecture de cette piste

**Concept visuel** : [PLACEHOLDER SCHÉMA : Diagramme de flux montrant le flux complet du programme]

### Tester votre table de mixage

Testez chaque fonctionnalité :
- ✅ Cliquez sur le bouton track1 → sound1 joue
- ✅ Cliquez à nouveau sur le bouton track1 → sound1 se met en pause
- ✅ Cliquez sur le bouton track2 → sound2 joue
- ✅ Les deux pistes peuvent jouer en même temps (mixage !)
- ✅ Déplacez le slider track1 → le volume de track1 change
- ✅ Déplacez le slider track2 → le volume de track2 change
- ✅ Les sons bouclent continuellement

### Dépannage

**Pas de son ?**
- Vérifiez que la bibliothèque p5.sound est incluse
- Vérifiez que les fichiers son sont dans le dossier `assets`
- Vérifiez la console du navigateur pour les erreurs

**Les boutons ne fonctionnent pas ?**
- Vérifiez que la logique de détection des clics est correcte
- Vérifiez que les positions des boutons correspondent à votre détection des clics

**Le volume ne change pas ?**
- Vérifiez que vous lisez les valeurs des sliders dans `draw()`
- Vérifiez que vous appliquez le volume aux sons en lecture
- Vérifiez que la conversion de volume (diviser par 100) est correcte

---

## Idées de personnalisation

Maintenant que votre table de mixage fonctionne, essayez de la personnaliser :

- **Changez les positions et tailles des boutons**
- **Changez les positions des sliders**
- **Ajoutez un titre ou des labels**
- **Changez les couleurs**
- **Ajoutez plus de pistes**
- **Ajoutez un retour visuel quand les pistes jouent**

**Rappelez-vous** : L'expérimentation est la façon dont on apprend ! Essayez des choses, voyez ce qui se passe, et apprenez-en.

---

## Félicitations !

Vous avez construit une table de mixage DJ fonctionnelle ! Vous avez appris :
- Comment organiser le code en utilisant des objets
- Comment charger et jouer plusieurs sons
- Comment créer des boutons interactifs
- Comment créer et utiliser des sliders
- Comment contrôler le volume en temps réel
- Comment mélanger les sons ensemble

Ces concepts vous aideront à construire des applications interactives encore plus complexes !
