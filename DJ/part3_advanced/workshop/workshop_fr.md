# Atelier : Table de Mixage DJ - Fonctionnalités Avancées

## Bienvenue !

Félicitations pour avoir terminé l'atelier de Personnalisation ! Maintenant, vous allez ajouter des fonctionnalités DJ avancées qui rendent votre table vraiment professionnelle : des sliders de temps pour naviguer dans les pistes, un crossfader pour des transitions fluides, et une visualisation BPM pour voir le rythme !

---

## Prérequis

**Avant de commencer cet atelier, assurez-vous d'avoir terminé la Partie 2 : Personnalisation**, qui inclut :
- ✅ Téléchargements de fichiers pour les images de fond et les sons
- ✅ Design responsive adapté au mobile
- ✅ Support tactile
- ✅ Fonctions helper pour un code organisé

---

## Ce que vous allez construire

À la fin de cet atelier, vous ajouterez :
- ✅ **Sliders de temps** - Sauter à n'importe quelle position dans une piste
- ✅ **Affichage du temps** - Voir le temps écoulé et la durée totale (format MM:SS)
- ✅ **Crossfader** - Transitionner en douceur entre les pistes en utilisant la trigonométrie
- ✅ **Visualisation BPM** - Cercles pulsants qui réagissent au rythme
- ✅ **Code refactorisé** - Apprendre à organiser le code en petites fonctions réutilisables

---

## Étape 1 : Ajouter les sliders de temps

### Comprendre les sliders de temps

Les sliders de temps permettent aux DJs de sauter à n'importe quelle position dans une piste. Pensez-y comme à la barre de progression d'un lecteur vidéo - vous pouvez cliquer n'importe où pour sauter à ce point dans la chanson.

**La logique** :
1. Ajoutez une propriété time slider à chaque objet track
2. Créez le slider dans `setupTrackSliders()`
3. Mettez à jour la position du slider pendant que la piste joue
4. Quand le slider est déplacé, sautez à cette position dans la piste

### Étape 1A : Ajouter les propriétés Time Slider

**Votre tâche** : Dans les objets `track1` et `track2`, ajoutez :
- `timeSlider: null`
- `timeSliderPosition: { x: 0, y: 0 }`
- `isDraggingTime: false`

**Pourquoi ?** Ces propriétés stockent l'élément slider, sa position, et si l'utilisateur le fait glisser.

### Étape 1B : Créer les sliders de temps

**Votre tâche** : Mettez à jour votre fonction `setupTrackSliders()` pour créer aussi un slider de temps :

```javascript
function setupTrackSliders(track) {
    // Volume slider (code existant)
    track.slider = createSlider(0, 100, 50);
    track.slider.position(track.sliderPosition.x, track.sliderPosition.y);
    
    // NOUVEAU : Time slider
    track.timeSlider = createSlider(0, 100, 0);
    track.timeSlider.position(track.timeSliderPosition.x, track.timeSliderPosition.y);
    track.timeSlider.style('width', '150px');
    track.timeSlider.input(function() {
        let soundDuration = track.sound.duration();
        let targetTime = (track.timeSlider.value() / 100) * soundDuration;
        track.sound.jump(targetTime);
    });
}
```

**Comprendre le code** :
- `createSlider(0, 100, 0)` crée un slider de 0% à 100%, commençant à 0%
- `.input()` s'exécute quand le slider est déplacé
- `track.sound.duration()` obtient la longueur totale du son
- `track.sound.jump(targetTime)` saute à un temps spécifique dans le son

**Documentation** :
- [`sound.duration()`](https://p5js.org/reference/p5.SoundFile/duration) obtient la durée totale
- [`sound.jump()`](https://p5js.org/reference/p5.SoundFile/jump) saute à un temps spécifique
- [`sound.currentTime()`](https://p5js.org/reference/p5.SoundFile/currentTime) obtient le temps de lecture actuel

### Étape 1C : Mettre à jour les positions des sliders de temps

**Votre tâche** : Mettez à jour votre fonction `updatePositions()` pour calculer les positions des sliders de temps :

```javascript
function updatePositions() {
    // ... code existant ...
    let timeSliderY = height * 0.55;    // Duration sliders
    
    // Track 1
    track1.timeSliderPosition.x = leftX;
    track1.timeSliderPosition.y = timeSliderY;
    
    // Track 2
    track2.timeSliderPosition.x = rightX;
    track2.timeSliderPosition.y = timeSliderY;
}
```

### Étape 1D : Mettre à jour les sliders de temps pendant la lecture

**Votre tâche** : Créez une fonction pour mettre à jour les sliders de temps pendant que les pistes jouent :

```javascript
function updateTimeSliders() {
    updateTimeSlider(track1);
    updateTimeSlider(track2);
}

function updateTimeSlider(track) {
    let currentTime = track.sound.currentTime();
    let soundDuration = track.sound.duration();
    let progress = (currentTime / soundDuration) * 100;
    track.timeSlider.value(progress);
}
```

Puis appelez `updateTimeSliders()` dans votre fonction `draw()`.

**Comprendre le code** :
- `currentTime()` obtient jusqu'où nous sommes dans la piste
- Nous calculons le progrès en pourcentage (0-100)
- Mettez à jour la valeur du slider pour montrer la position actuelle

**Testez !** Jouez une piste et regardez le slider de temps bouger. Essayez de le faire glisser pour sauter à différentes positions !

---

## Étape 2 : Afficher le temps au format MM:SS

### Comprendre le formatage du temps

Au lieu d'afficher les secondes brutes, nous afficherons le temps au format "MM:SS" (minutes:secondes), comme "02:35" pour 2 minutes et 35 secondes.

### Étape 2A : Créer une fonction de formatage du temps

**Votre tâche** : Créez une fonction pour formater les secondes en MM:SS :

```javascript
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    let minutesStr = String(minutes).padStart(2, '0');
    let secsStr = String(secs).padStart(2, '0');
    return minutesStr + ":" + secsStr;
}
```

**Comprendre le code** :
- `Math.floor(seconds / 60)` obtient les minutes (nombre entier)
- `Math.floor(seconds % 60)` obtient les secondes restantes
- `String().padStart(2, '0')` assure 2 chiffres (par exemple, "05" au lieu de "5")
- Retourne le format comme "02:35"

**Documentation** : [`String.padStart()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) remplit les chaînes.

### Étape 2B : Afficher le temps

**Votre tâche** : Créez une fonction pour afficher le temps pour chaque piste :

```javascript
function drawTimeDisplay(track) {
    let elapsed = track.sound.currentTime();
    let total = track.sound.duration();
    let timeText = formatTime(elapsed) + " / " + formatTime(total);
    
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(timeText, track.timeSliderPosition.x, track.timeSliderPosition.y + 35);
}
```

Puis appelez `drawTimeDisplay(track1)` et `drawTimeDisplay(track2)` dans votre fonction `draw()`.

**Testez !** Vous devriez voir le temps affiché comme "00:15 / 03:42" (écoulé / total) !

---

## Étape 3 : Ajouter un crossfader

### Comprendre les crossfaders

Un crossfader transitionne en douceur entre deux pistes. À 0%, seule la piste 1 est entendue. À 100%, seule la piste 2 est entendue. À 50%, les deux pistes jouent à leurs niveaux de volume respectifs.

**Exemple du monde réel** : Les DJs utilisent des crossfaders pour transitionner en douceur d'une chanson à une autre pendant un mix.

### Étape 3A : Ajouter les variables Crossfader

**Votre tâche** : En haut de votre code, ajoutez :
- `let crossfader = null;`
- `let crossfaderValue = 50;`

### Étape 3B : Créer le slider Crossfader

**Votre tâche** : Créez une fonction pour configurer le crossfader :

```javascript
function setupCrossfader() {
    crossfader = createSlider(0, 100, 50);
    crossfader.position(width/2 - 100, height * 0.75);
    crossfader.style('width', '200px');
}
```

Puis appelez `setupCrossfader()` dans votre fonction `setup()`.

### Étape 3C : Implémenter la logique du crossfader avec la trigonométrie

**La logique** : Nous utiliserons les fonctions `sin()` et `cos()` pour des courbes de crossfade fluides.

**Votre tâche** : Créez une fonction pour appliquer le crossfader :

```javascript
function applyCrossfader() {
    crossfaderValue = crossfader.value();
    let angle = (crossfaderValue / 100) * (PI / 2);
    
    let track1CrossfadeVolume = track1.volume * cos(angle);
    let track2CrossfadeVolume = track2.volume * sin(angle);
    
    track1.sound.setVolume(track1CrossfadeVolume);
    track2.sound.setVolume(track2CrossfadeVolume);
}
```

Puis appelez `applyCrossfader()` dans votre fonction `draw()`.

**Comprendre le code** :
- Mappez la valeur du crossfader (0-100) à un angle (0 à π/2)
- `cos(angle)` donne le volume de track1 : 1.0 à 0°, 0.0 à 90°
- `sin(angle)` donne le volume de track2 : 0.0 à 0°, 1.0 à 90°
- Multipliez par le volume de la piste pour respecter les réglages de volume individuels

**Pourquoi la trigonométrie ?** Elle crée des transitions fluides et naturelles au lieu de changements brusques !

**Documentation** :
- [`cos()`](https://p5js.org/reference/p5/cos) et [`sin()`](https://p5js.org/reference/p5/sin) pour des courbes fluides

**Testez !** Déplacez le crossfader - la piste 1 devrait s'estomper pendant que la piste 2 s'intensifie !

---

## Étape 4 : Ajouter la visualisation BPM

### Comprendre la visualisation BPM

La visualisation BPM (Beats Per Minute) montre le rythme de la musique à travers des cercles pulsants. Les cercles deviennent plus grands quand le rythme est plus fort.

**La logique** :
1. Utilisez `p5.Amplitude` pour analyser l'audio
2. Obtenez le niveau d'amplitude (à quel point le son est fort)
3. Faites pulser les cercles en fonction de l'amplitude
4. Affichez les cercles au centre de l'écran

### Étape 4A : Configurer les analyseurs d'amplitude

**Votre tâche** : Dans votre fonction `setup()`, créez des analyseurs d'amplitude :

```javascript
amp1 = new p5.Amplitude();
amp2 = new p5.Amplitude();
```

Puis connectez-les aux sons :
```javascript
amp1.setInput(track1.sound);
amp2.setInput(track2.sound);
```

**Documentation** : [`p5.Amplitude`](https://p5js.org/reference/p5.Amplitude) analyse l'amplitude audio.

### Étape 4B : Ajouter les propriétés de taille de pulsation

**Votre tâche** : Dans les deux objets track, ajoutez :
- `pulseSize: 80`

Cela stocke la taille actuelle du cercle pulsant.

### Étape 4C : Créer les fonctions de visualisation BPM

**Votre tâche** : Créez des fonctions pour dessiner la visualisation BPM :

```javascript
function drawBPMVisualization() {
    track1.pulseSize = getPulseSize(track1, amp1);
    track2.pulseSize = getPulseSize(track2, amp2);
    
    let centerX = width / 2;
    let beatVisualY = height * 0.3;
    
    drawBeatCircle(centerX - 60, beatVisualY, track1.pulseSize, [255, 0, 0], "beat visual 1");
    drawBeatCircle(centerX + 60, beatVisualY, track2.pulseSize, [0, 0, 255], "beat visual 2");
}

function getPulseSize(track, amp) {
    let level = (track.sound && amp) ? amp.getLevel() : 0;
    return Math.max(80, 80 + (level * 400));
}

function drawBeatCircle(x, y, size, color, label) {
    noFill();
    stroke(color[0], color[1], color[2], 150);
    strokeWeight(3);
    circle(x, y, size);
    
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(label, x, y + size/2 + 15);
}
```

Puis appelez `drawBPMVisualization()` dans votre fonction `draw()`.

**Comprendre le code** :
- `amp.getLevel()` obtient l'amplitude actuelle (0.0 à 1.0)
- `Math.max(80, 80 + (level * 400))` assure une taille minimum de 80, s'agrandit avec l'amplitude
- Les cercles pulsent en synchronisation avec le rythme !

**Important** : L'amplitude est lue depuis l'audio brut, donc elle montre le BPM même si le volume ou le crossfader est à 0% !

**Testez !** Jouez des pistes et regardez les cercles pulser avec le rythme !

---

## Étape 5 : Mettre à jour les labels et la mise en page

### Étape 5A : Ajouter les labels de durée

**Votre tâche** : Dans votre fonction `drawLabels()`, ajoutez des labels pour les sliders de temps :

```javascript
text("duration", track1.timeSliderPosition.x, track1.timeSliderPosition.y - 15);
text("duration", track2.timeSliderPosition.x, track2.timeSliderPosition.y - 15);
```

### Étape 5B : Ajouter le label Crossfader

**Votre tâche** : Ajoutez un label pour le crossfader :

```javascript
text("crossfader", width/2, height * 0.72);
```

### Étape 5C : Mettre à jour la mise en page

**Votre tâche** : Assurez-vous que votre fonction `updatePositions()` calcule les positions pour la nouvelle mise en page :

```
+-------------------------------------------------------+
| choose track 1  | change background  | choose track 2 |
+-----------------+--------------------+----------------+
|  play/pause     | beat   | beat      | play/pause     |
|  track 1        | visual | visual    | track 2        |
|                 |   1    |   2       |                |
| volume slider1  |        |           | volume slider 2|
|                 |        |           |                |
| duration slider1|        |           |duration slider2|
|                 |        |           |                |
+-------------------------------------------------------+
|                                                       |
|                  crossfader slider                    |
+-------------------------------------------------------+
```

---

## Étape 6 : Refactoriser l'organisation du code

### Comprendre l'organisation du code

Le code a été refactorisé en petites fonctions ciblées. Cela le rend :
- Plus facile à comprendre
- Plus facile à tester
- Plus facile à maintenir
- Moins répétitif

### Fonctions helper clés

**Fonctions de setup** :
- `setupFileInputs()` - Crée tous les file inputs
- `setupTrackButton(track)` - Crée le bouton pour une piste
- `setupTrackSliders(track)` - Crée les sliders pour une piste
- `setupCrossfader()` - Crée le crossfader

**Fonctions de draw** :
- `drawBackground()` - Dessine le fond
- `drawLabels()` - Dessine tous les labels
- `drawTimeDisplay(track)` - Affiche le temps pour une piste
- `drawBPMVisualization()` - Dessine les cercles pulsants

**Fonctions de mise à jour** :
- `updateVolumes()` - Met à jour les volumes depuis les sliders
- `updateTimeSliders()` - Met à jour les positions des sliders de temps
- `applyCrossfader()` - Applique la logique du crossfader

**Fonctions de contrôle de piste** :
- `pauseTrack(track)` - Met en pause une piste
- `playTrack(track)` - Joue une piste
- `stopTrack(track)` - Arrête une piste
- `connectAmplitudeAnalyzer(track)` - Connecte l'analyseur

**Pourquoi refactoriser ?** Les petites fonctions sont plus faciles à comprendre, tester et modifier !

---

## Étape 7 : Tests finaux

### Liste de contrôle des tests

Testez toutes les nouvelles fonctionnalités :

1. ✅ **Sliders de temps**
   - Montrent-ils la position actuelle ?
   - Pouvez-vous les faire glisser pour sauter dans la piste ?
   - L'affichage du temps se met-il à jour correctement ?

2. ✅ **Affichage du temps**
   - Le temps est-il affiché au format MM:SS ?
   - Affiche-t-il "écoulé / total" correctement ?

3. ✅ **Crossfader**
   - À 0%, seule la piste 1 est-elle entendue ?
   - À 100%, seule la piste 2 est-elle entendue ?
   - À 50%, les deux pistes sont-elles entendues ?
   - La transition est-elle fluide ?

4. ✅ **Visualisation BPM**
   - Les cercles pulsent-ils avec le rythme ?
   - Fonctionnent-ils même quand le volume est à 0% ?
   - Fonctionnent-ils même quand le crossfader est à 0% ?

5. ✅ **Organisation du code**
   - Le code est-il organisé en petites fonctions ?
   - Est-il facile à comprendre ?
   - Pouvez-vous trouver des fonctionnalités spécifiques rapidement ?

---

## Félicitations ! 🎉

Vous avez ajouté avec succès des fonctionnalités DJ avancées ! Votre table a maintenant :
- Des sliders de temps pour naviguer dans les pistes
- Un affichage du temps au format MM:SS
- Un crossfader pour des transitions fluides
- Une visualisation BPM avec des cercles pulsants
- Un code bien organisé et refactorisé

**Ce que vous avez appris** :
- Comment créer des sliders de temps et sauter à des positions dans l'audio
- Comment formater et afficher le temps
- Comment utiliser la trigonométrie pour un crossfade fluide
- Comment analyser l'amplitude audio pour la visualisation
- Comment organiser le code en petites fonctions réutilisables

**Prochaines étapes** :
- Expérimentez avec différentes courbes de crossfader
- Essayez différents styles de visualisation BPM
- Ajoutez plus de fonctionnalités avancées (EQ, effets, etc.)
- Partagez votre table de mixage DJ professionnelle !

---

## Dépannage

**Problème** : Le slider de temps ne se met pas à jour
- **Solution** : Assurez-vous que `updateTimeSliders()` est appelé dans `draw()`

**Problème** : Impossible de sauter à une position dans la piste
- **Solution** : Vérifiez que `track.sound.jump(targetTime)` est appelé dans le gestionnaire `.input()` du slider

**Problème** : Le crossfader ne fonctionne pas en douceur
- **Solution** : Assurez-vous que vous utilisez `cos()` et `sin()` avec le calcul d'angle

**Problème** : La visualisation BPM ne s'affiche pas
- **Solution** : Vérifiez que `amp1.setInput(track1.sound)` et `amp2.setInput(track2.sound)` sont appelés

**Problème** : Les cercles ne pulsent pas
- **Solution** : Assurez-vous que `drawBPMVisualization()` est appelé dans `draw()` et que les analyseurs d'amplitude sont connectés

**Rappelez-vous** : Vérifiez toujours la console du navigateur (F12) pour les messages d'erreur !

