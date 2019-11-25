import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
})
export class FinalPage implements OnInit {

  public resultado:string;

  constructor(public nav:NavController, public route:ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      
      this.resultado = params.get("resultado");
    })


 
    
    /*
    var background = document.querySelector(".final");
    
    if((parseInt(this.resultado)) == 1)
      background.setAttribute("class", "win");

    else if((parseInt(this.resultado)) == 0)
      background.setAttribute("class", "gameover");

      */
  
  }


  public jogar():void{

    this.nav.navigateRoot("/user");
  } 
  public menu():void{

    this.nav.navigateRoot("/home");
    
  }
  
}
