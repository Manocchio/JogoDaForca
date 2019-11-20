import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  public jogos: string[] = ["God of War",
    "Resident evil", "Shadow of the colossus", "Crash", "Black", "Megaman",
    "Final Fantasy", "Devil may cry", "Space invanders", "Pitfall", "Left four dead",
    "Castlevania", "Metal gear solid", "Hitman", "Call of duty", "Dino Crisis",
    "The legend of zelda", "Super smash bros", "Spyro", "Dark Souls"];

  public palavraSorteada: string;
  public vidasRestantes: number = 6;
  public quantidadeAcertos: number = 0;
  public letrasUsadas: string[] = [];

  constructor(public nav: NavController) { }

  ngOnInit() {
    this.start();
  }

  public getRandom(max: number): number {

    return Math.floor(Math.random() * max + 1);
  }

  public start(): void {


    var indiceSelecionado = this.getRandom(this.jogos.length - 1);
    this.palavraSorteada = this.jogos[indiceSelecionado];



    var container = document.getElementById("container-palavra");


    for (var i: number = 0; i < this.palavraSorteada.length; i++) {

      var palavra = document.createElement("p");
      palavra.classList.add("letra");
      palavra.id = "letra" + i;
      palavra.style.cssFloat = "left";
      palavra.style.fontSize = "20px";
      palavra.style.marginLeft = "5px";

      if (this.palavraSorteada[i] != " ") {

        palavra.innerHTML += "_";
      }
      else {

        palavra.innerHTML += " ";
      }

      container.appendChild(palavra);
    }


    console.log(this.palavraSorteada);

  }


  public verificarLetra(letra: string): void {

      var encontrou: boolean = false;

      for (var i: number = 0; i < this.palavraSorteada.length; i++) {

        console.log(letra + "==" + this.palavraSorteada[i]);

        if (this.palavraSorteada[i].toLowerCase() == letra && this.letrasUsadas.indexOf(letra) == -1) {

          console.log("é igual");
          var letraView = document.getElementById("letra" + i);
          letraView.innerHTML = letra;
          this.quantidadeAcertos++;
          encontrou = true;

          console.log(this.palavraSorteada.replace(" ",""));

          if (this.quantidadeAcertos == this.palavraSorteada.replace(" " , "").length) {

            alert("tu ganhou menó");
          }
        }

      }

      if (!encontrou && this.letrasUsadas.indexOf(letra) == -1) {

        this.vidasRestantes--;
        var imagePersonagem = document.getElementById("personagem");

        if (this.vidasRestantes == 5) {

          imagePersonagem.setAttribute("src", "../../assets/img/personagem-personagem-com-perna-e-braco.png");
        }
        else if (this.vidasRestantes == 4) {

          imagePersonagem.setAttribute("src", "../../assets/img/personagem-com-dois-braco.png");
        }
        else if (this.vidasRestantes == 3) {

          imagePersonagem.setAttribute("src", "../../assets/img/personagem-com-braco.png");

        }
        else if (this.vidasRestantes == 2) {

          imagePersonagem.setAttribute("src", "../../assets/img/personagem-cabeca-e-torso.png");
        }
        else if (this.vidasRestantes == 1) {

          imagePersonagem.setAttribute("src", "../../assets/img/personagem-cabeca.png");
        }
        else {

          alert("tu perdeu");
        }
      }

      if (this.letrasUsadas.indexOf(letra) == -1) {

          this.letrasUsadas.push(letra);


          var imgUsado = document.createElement("img");
          imgUsado.src = "../../assets/img/img-usado.png";
          imgUsado.classList.add("center");

          document.getElementById(letra).appendChild(imgUsado);

      }
      else {

        alert("letra já usada!");
      }


  }



}
