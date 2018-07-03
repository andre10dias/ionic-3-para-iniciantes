import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

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
  public loader;
  public refresher;
  public refreshing: boolean = false;
  public page = 1;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MovieProvider, 
    public loadingCtrl: LoadingController) {
  }

  public somaDoisNumeros(num1: number, num2: number): void{
    alert("Minha função funcionou...");
    alert(num1+num2);
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
      //,duration: 10000
    });
    this.loader.present();
  }

  fechaCarregando() {
    this.loader.dismiss();
  }

  abrirDetalhes(filme){
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id});
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    console.log('Begin async operation', infiniteScroll);
    this.carregarFilmes(true);
    console.log(this.listaFilmes);
    console.log(this.page);
  }

  /**
   * Recarrega a página ao ser clicada e arrastada pelo usuário
   * @param refresher
   */
  doRefresh(refresher) {
    this.refresher = refresher;
    this.refreshing = true;
    this.carregarFilmes();
    console.log('Begin async operation', refresher);

    /*setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);*/
  }

  /**
   * Acionado quando a página carrega
   * Roda apenas uma vez, 
   * Só roda novamente quando a página for reciclada, 
   * qndo o ciclo de vida do app destruir a página
   * e ela for criada novamente.
   */
  /*ionViewDidLoad() {
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
  }*/

  /**
   * Roda sempre que se entra na página.
   */
  ionViewDidEnter() {
    this.carregarFilmes();
  }

  carregarFilmes(newPage: boolean = false){
    console.log('ionViewDidEnterLoad FeedPage');
    //this.somaDoisNumeros(5, 10);
    this.abreCarregando();
    console.log("carregarFilmes page: ", this.page);
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data=>{
        const response = (data as any);
        const objetoRetorno = JSON.parse(response._body);
        
        /**
         * "concat" concatena/adiciona o valor de objetoRetorno.results 
         * na lista "listaFilmes"
         */
        if (newPage) {
          console.log("newPage");
          this.listaFilmes = this.listaFilmes.concat(objetoRetorno.results);
          console.log("listaFilmes: ", this.listaFilmes);
          this.infiniteScroll.complete(); //faz o carregar sumir
        }
        else{
          this.listaFilmes = objetoRetorno.results;
        }

        console.log(objetoRetorno);
        this.fechaCarregando();

        if (this.refreshing) {
          this.refresher.complete();
          this.refreshing = false;
        }
      },
      error=>{
        console.log(error);
        this.fechaCarregando();
        
        if (this.refreshing) {
          this.refresher.complete();
          this.refreshing = false;
        }
      }
      
    )
  }

}
