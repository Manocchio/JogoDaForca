import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  constructor( public nv:NavController) { }

  ngOnInit() {
  }

  public back():void{
    this.nv.navigateForward("/home");
  }
  public dev():void{
    this.nv.navigateForward("/desenvolvedores");
  }
}
