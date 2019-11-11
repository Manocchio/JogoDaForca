import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  public jogos:string[] = ["God of War",
  "Resident evil","Shadow of the colossus","Crash","Black","Megaman",
  "Final Fantasy","Devil may cry","Space invanders","Pitfall","Left four dead",
  "Castlevania","Metal gear solid","Hitman","Call of duty","Dino Crisis",
  "The legend of zelda","Super smash bros","Spyro","Dark Souls"];

  constructor() { }

  ngOnInit() {
  }

  public getRandom(max:number):number {
  
    return Math.floor(Math.random() * max + 1)
}

}
