import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  public jogos: string[] =  [ "God of War",
                              "Resident evil", 
                              "Shadow of the colossus", 
                              "Crash", 
                              "Black", 
                              "Megaman",
                              "Final Fantasy", 
                              "Devil may cry", 
                              "Space invanders", 
                              "Pitfall", 
                              "Left four dead",
                              "Castlevania", 
                              "Metal gear solid", 
                              "Hitman", 
                              "Call of duty",
                              "Dino Crisis",
                              "The legend of zelda", 
                              "Super smash bros", 
                              "Spyro", 
                              "Dark Souls"
                            ];

  

  public palavraSorteada: string;
  public vidasRestantes: number = 6;
  public quantidadeAcertos: number = 0;
  public letrasUsadas: string[] = [];
  public dicas =  [ { dica:"Um cara com tatuagem vermelha, conhecido como fantasma de sparta.", nome:"God of War" },
                    { dica:"Apocalipse zumbi, e protagonista de cabelo lambido", nome:"Resident evil"},
                    { dica:"Um cara em um cavalinho caçando titans", nome:"Shadow of the colossus"},
                    { dica:"Uma raposa aleatória pulando em caixas", nome:"Crash"},
                    { dica:"Melhor jogo de tiro do PS2", nome:"Black"},
                    { dica:"Jogo de plataforma com um robô azul", nome:"Megaman"},
                    { dica:"Joguinho de fantasia, um dos mais conhecidos RPGs já feitos", nome:"Final Fantasy"},
                    { dica:"Um demonio que pode chorar", nome:"Devil may cry"},
                    { dica:"Primeiro joguinho de nave, coisa de Atari", nome:"Space invaders"},
                    { dica:"O Indiana Jones do Atari", nome:"Pitfall"},
                    { dica:"Jogo de zumbi da Valve", nome:"Left four dead"},
                    { dica:"Um jogo para caçar vampiros e dar chicotadas", nome:"Castlevania"},
                    { dica:"Um jogo de espionagem, tática e furtividade", nome:"Metal gear solid"},
                    {, nome:},
                    {, nome:},
                    {, nome:},
                    {, nome:},
                    {, nome:},
                    {, nome:},
                    
                  ];

  constructor(public nav: NavController, public alertController: AlertController) { }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }
  

  ngOnInit() {
    this.start();
  }

  public getRandom(max: number): number {

    return Math.floor(Math.random() * max + 1);
  }

  public start(): void {

    console.log(""+ this.dicas[0].dica);
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
