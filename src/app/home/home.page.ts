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
      playing: false
    },
    {
      title: 'Dauphin',
      image: 'img/animals/dolphin-icon.png',
      desc: 'Siffle',
      file: '/sounds/dolphin.mp3',
      playing: false
    },
    {
      title: 'Grenouille',
      image: 'img/animals/frog-icon.png',
      desc: 'Coasse',
      file: '/sounds/frog.mp3',
      playing: false
    },
    {
      title: 'Oiseau',
      image: 'img/animals/bird-icon.png',
      desc: 'Chante',
      file: '/sounds/bird.mp3',
      playing: false
    },
    {
      title: 'Cochon',
      image: 'img/animals/pig-icon.png',
      desc: 'Grogne',
      file: '/sounds/pig.mp3',
      playing: false
    },
    {
      title: 'Chien',
      image: 'img/animals/puppy-icon.png',
      desc: 'Aboie',
      file: '/sounds/dog.mp3',
      playing: false
    },
    {
      title: 'Chat',
      image: 'img/animals/black-cat-icon.png',
      desc: 'Miaule',
      file: '/sounds/cat.mp3',
      playing: false
    },
    {
      title: 'Cheval',
      image: 'img/animals/horse-icon.png',
      desc: 'Hennit',
      file: '/sounds/horse.wav',
      playing: false
    },
    {
      title: 'Ane',
      image: 'img/animals/donkey-icon.png',
      desc: 'Brait',
      file: '/sounds/donkey.wav',
      playing: false
    }
  ];

  //## 1 stockagede l'animal choisi 
  private chosenAnimal = null;

  ////## 2 stockage d'un objet audio HTML
  private audio:HTMLAudioElement = null;  

  constructor(private toastCtrl: ToastController) {}  //## 6 Ask for ToastController 

  public play(){
    //## 1 Choisir un animal au hasard  
    let isRandom = Math.floor(Math.random() * this.animalList.length);  //Math.floor to go for nearest full number and Math.random makes things random
    
    this.chosenAnimal=this.animalList[isRandom];

    // ## 3 To eviter sound mixing, (arreter le son precedent)
    if(this.audio && ! this.audio.ended){
      this.audio.pause();
    }

    //## 7 Le message a afficher 
    
    
    //## 2 Jouer un son  
    //instanciation d'un objet audio avec le son que l'on veut jouer
    this.audio = new Audio('/assets' + this.chosenAnimal.file)
    //chargement du son
    this.audio.load();
    // lecture du son
    this.audio.play();
  }

  //## 4 Choix du joueur  
  public async guessAnimal(clickedAnimal){

    // ## 5 si aucun son n'a ete joue_ chosenAnimal est null  
    if(this.chosenAnimal == null) {
      return;
    }
    // dECLARE VARIABLES
    let message;
    let toastColor = 'danger';
    
    // ## 4 comparison des animaux  
    //celui sur lequel le jouer a clique
    //et celui dont on a joue le son
    if(this.chosenAnimal.title == clickedAnimal.title) {
      message = "Win!!!";
      toastColor = 'primary'
    } else {
      message = "try again";
    }

    // ## 8 Affichage du message  (async-await)
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'top',
      color: toastColor
    });

    toast.present();

    
  }


}
