import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GamePage } from '../game/game.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( public navCtrl:NavController) {}


  public play():void{
    //this.navCtrl.navigateForward(GamePage);
  }

}
