import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  //public nomeUsuario: String = "Marty McFly";
  public listaFilmes = new Array<any>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MovieProvider) {
  }

  public somaDoisNumeros(num1: number, num2: number): void{
    alert("Minha função funcionou...");
    alert(num1+num2);
  }

  /**
   * Acionado quando a página carrega
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
    //this.somaDoisNumeros(5, 10);

    this.movieProvider.getLatestMovies().subscribe(
      data=>{
        const response = (data as any);
        const objetoRetorno = JSON.parse(response._body);
        console.log(objetoRetorno);

        this.listaFilmes = objetoRetorno.results;
      },
      error=>{
        console.log(error);
      }
      
    )
  }

}
