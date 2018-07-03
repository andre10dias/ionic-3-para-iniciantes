import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers: [MovieProvider]
})
export class FilmeDetalhesPage {

  public filme;
  public filmeId;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public movieProvider: MovieProvider) {
  }

  ionViewDidEnter() {
    //Pega o id do filme passado pela página feed.ts
    this.filmeId = this.navParams.get("id");
    this.movieProvider.getMoviesDetails(this.filmeId).subscribe(data=>{
        let retorno = (data as any)._body;
        this.filme = JSON.parse(retorno);
    }, error=>{
        console.log(error);
    })
    console.log('ionViewDidLoad FilmeDetalhesPage');
  }

}
