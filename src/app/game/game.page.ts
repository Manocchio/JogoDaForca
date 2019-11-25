import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {



  public nomeJogador: string;
  public dica: string;
  public palavraSorteada: string;
  public vidasRestantes: number = 6;
  public quantidadeAcertos: number = 0;
  public letrasUsadas: string[] = [];


  public jogos = [{ dica: "Um cara com tatuagem vermelha, conhecido como fantasma de sparta.", nome: "God of War" },
  { dica: "Apocalipse zumbi, e protagonista de cabelo lambido", nome: "Resident evil" },
  { dica: "Um cara em um cavalinho caçando titans", nome: "Shadow of the colossus" },
  { dica: "Uma raposa aleatória pulando em caixas", nome: "Crash" },
  { dica: "Melhor jogo de tiro do PS2", nome: "Black" },
  { dica: "Jogo de plataforma com um robô azul", nome: "Megaman" },
  { dica: "Joguinho de fantasia, um dos mais conhecidos RPGs já feitos", nome: "Final Fantasy" },
  { dica: "Um demônio que pode chorar", nome: "Devil may cry" },
  { dica: "Primeiro joguinho de nave, lá do Atari", nome: "Space invaders" },
  { dica: "O Indiana Jones do Atari", nome: "Pitfall" },
  { dica: "Jogo de zumbi da Valve", nome: "Left four dead" },
  { dica: "Um jogo para caçar vampiros e dar chicotadas", nome: "Castlevania" },
  { dica: "Um jogo de espionagem, tática e furtividade", nome: "Metal gear solid" },
  { dica: "Um assassino profissional clonado, cuja a perícia impecável coloca-o em alta procura para contratos.", nome: "Hitman" },
  { dica: "Joguinho de tiro que lança todo ano", nome: "Call of duty" },
  { dica: "Um jogo sobre viagens no tempo e parkour", nome: "Prince of Persia" },
  { dica: "Um RPG dificil pra kct", nome: "Dark Souls" },
  { dica: "O melhor jogo de carro da atualidade", nome: "Forza Horizon" },
  { dica: "Um jogo de plataforma sobre um dragão roxo. Foi bastante famoso durante o Playstation 1", nome: "Spyro" },

  ];

  constructor(public nav: NavController, public alertController: AlertController, public route: ActivatedRoute) { }


  async exibirAlert(header: string, subHeader: string, msg: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: msg,
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


    var indiceSelecionado = this.getRandom(this.jogos.length - 1);
    this.palavraSorteada = this.jogos[indiceSelecionado].nome;
    this.dica = this.jogos[indiceSelecionado].dica;


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

        palavra.innerHTML += "-";
      }

      container.appendChild(palavra);
    }

    this.route.paramMap.subscribe((params: ParamMap) => {

      this.nomeJogador = params.get("nome");
    }

    )

  }




  public verificarLetra(letra: string): void {

    var encontrou: boolean = false;

    if (this.letrasUsadas.indexOf(letra) == -1) {


      for (var i: number = 0; i < this.palavraSorteada.length; i++) {



        if (this.palavraSorteada[i].toLowerCase() == letra && this.letrasUsadas.indexOf(letra) == -1) {


          var letraView = document.getElementById("letra" + i);
          letraView.innerHTML = letra;
          this.quantidadeAcertos++;
          encontrou = true;
          this.playSong("../../assets/song/acerto.wav");

          if (this.quantidadeAcertos == this.palavraSorteada.replace(/ /g, "").length) {

            this.playSong("../../assets/song/vitoria.mp3")
            this.nav.navigateRoot("/final/Você ganhou," + this.nomeJogador + "!");

          }
        }

      }

      if (!encontrou && this.letrasUsadas.indexOf(letra) == -1) {

        this.reduzirVida();

      }


      this.letrasUsadas.push(letra);


      var imgUsado = document.createElement("img");
      imgUsado.src = "../../assets/img/img-usado.png";
      imgUsado.classList.add("center");

      document.getElementById(letra).appendChild(imgUsado);

    }
    else {

      this.exibirAlert("Aviso", "A letra " + letra + " já foi usada!", "Escolha outra!")
    }


  }

  public exibirDica(): void {

    this.exibirAlert("Dica", "Você consegue adivinhar ?", this.dica);

  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Insira a palavra',
      inputs: [
        {
          name: 'txtPalavra',
          type: 'text',
          id: 'txtPalavra',
          placeholder: 'Digite aqui'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            this.verificarPalavra(alertData.txtPalavra);
          }
        }
      ]
    });

    await alert.present();
  }

  public verificarPalavra(palavra: string): void {

    if (this.palavraSorteada.toLowerCase() == palavra.toLowerCase()) {

      this.playSong("../../assets/song/vitoria.mp3");
      
      this.nav.navigateRoot("/final/Você ganhou," + this.nomeJogador + "!");
    }
    else {

      this.playSong("../../assets/song/gameover.wav")
      this.nav.navigateRoot("/final/Você perdeu,"+this.nomeJogador+"!");

    }


  }

  public reduzirVida(): void {

    this.vidasRestantes--;
    this.playSong("../../assets/song/erro.wav");
    
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
      
      this.nav.navigateRoot("/final/Você perdeu," + this.nomeJogador + "!");
      //this.nav.navigateRoot("/final/0");
      this.playSong("../../assets/song/gameover.wav")
    }

   
  }

  public playSong(path:string): void {

    var audio = new Audio();
    audio.src = path;
    audio.play();

  }


}
