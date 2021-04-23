import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public animalList = [
    {
      title: 'Vache',
      image: 'img/animals/cow-icon.png',
      desc: 'Meugle',
      file: '/sounds/cow.mp3',
      playing: false,
    },
    {
      title: 'Dauphin',
      image: 'img/animals/dolphin-icon.png',
      desc: 'Siffle',
      file: '/sounds/dolphin.mp3',
      playing: false,
    },
    {
      title: 'Grenouille',
      image: 'img/animals/frog-icon.png',
      desc: 'Coasse',
      file: '/sounds/frog.mp3',
      playing: false,
    },
    {
      title: 'Oiseau',
      image: 'img/animals/bird-icon.png',
      desc: 'Chante',
      file: '/sounds/bird.mp3',
      playing: false,
    },
    {
      title: 'Cochon',
      image: 'img/animals/pig-icon.png',
      desc: 'Grogne',
      file: '/sounds/pig.mp3',
      playing: false,
    },
    {
      title: 'Chien',
      image: 'img/animals/puppy-icon.png',
      desc: 'Aboie',
      file: '/sounds/dog.mp3',
      playing: false,
    },
    {
      title: 'Chat',
      image: 'img/animals/black-cat-icon.png',
      desc: 'Miaule',
      file: '/sounds/cat.mp3',
      playing: false,
    },
    {
      title: 'Cheval',
      image: 'img/animals/horse-icon.png',
      desc: 'Hennit',
      file: '/sounds/horse.wav',
      playing: false,
    },
    {
      title: 'Ane',
      image: 'img/animals/donkey-icon.png',
      desc: 'Brait',
      file: '/sounds/donkey.wav',
      playing: false,
    },
  ];

  
  public chosenAnimal = null;                        //## 1 stockagede l'animal choisi
  private answerDelayInSecond = 30;                  //10 Time maximum to reset
  public secondLeft = null;                          //10 Time left to reset
  private timer = null;                               //10 le chrono pour le reponse
  private audio: HTMLAudioElement = null;             //## 2 stockage d'un objet audio HTML
  public tries = 0;                                   //# 11 Nombre de coups
  private maxTries = 3;
  constructor(private toastCtrl: ToastController) {}                      //## 4 Ask for ToastController
  
  public play() {                                                         //## 1 Choisir un animal au hasard   
    let isRandom = Math.floor(Math.random() * this.animalList.length);      //Math.floor to go for nearest full number and Math.random makes things random
    this.chosenAnimal = this.animalList[isRandom];

     if (this.audio && !this.audio.ended) {                                  // ## 3 To eviter sound mixing, (arreter le son precedent)
      this.audio.pause();
    }
    this.startTimer();                                                //## 10 Lancement du chrono
    this.audio = new Audio('/assets' + this.chosenAnimal.file);         //## 2 Jouer un son //instanciation d'un objet audio avec le son que l'on veut jouer
    this.audio.load();                                                //chargement du son
    this.audio.play();                                                  // lecture du son
  }

  
  public async guessAnimal(clickedAnimal) {                         //## 4 Choix du joueur
    if (this.chosenAnimal == null) {                                 // ## 5 si aucun son n'a ete joue_ chosenAnimal est null
      return;
    }
    this.tries++;
    let message;                                // dECLARE VARIABLES
    let toastColor = 'danger';                  //## 8

    if(this.tries > this.maxTries) {             //## 12 max tries
      message = "Vous avez depasse le nombre de coups autorise";
      toastColor = "warning";
      this.resetGame();
    }
    else if (this.chosenAnimal.title == clickedAnimal.title) {          // ## 4 comparison des animaux //celui sur lequel le jouer a clique //et celui dont on a joue le son
      message = 'gagne en ' + this.tries + ' coups';                  //win
      toastColor = 'primary';
      this.resetGame();                                                 //## 9
    } else {
      message = 'try again';
    }
    const toast = await this.toastCtrl.create({                         // ## 8 Affichage du message  (async-await)
      message: message,
      duration: 1000,
      position: 'top',
      color: toastColor,                                                  //## 8
    });

    toast.present();
  }
  
  private resetGame() {                                 //## 9 Reset game if win
    this.chosenAnimal = null;
    this.audio = null;
    this.tries = 0;
    this.secondLeft = 0;                                //## 10
    clearInterval(this.timer);
  } 
    private startTimer() {                                  //10 Set Timer to show time left and a countdown reverse
    this.secondLeft = this.answerDelayInSecond;
    this.timer = setInterval(() => { 
      this.secondLeft--;                                  //Decremente le temps restants
      if (this.secondLeft == 0) {                           //s'il ne reste plus de temps, on remet le jeu a zero 
        this.resetGame();
        clearInterval(this.timer);                            //annulation du chrono
      }
    }, 1000);
  }
}
