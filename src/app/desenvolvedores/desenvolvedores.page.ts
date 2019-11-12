import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-desenvolvedores',
  templateUrl: './desenvolvedores.page.html',
  styleUrls: ['./desenvolvedores.page.scss'],
})
export class DesenvolvedoresPage implements OnInit {

  constructor(public nv:NavController) { }

  ngOnInit() {
  }
  public back():void{
    this.nv.navigateForward("/sobre");
  }
}
