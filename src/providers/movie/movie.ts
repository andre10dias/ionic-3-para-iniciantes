//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  /**
   * Ao setar um valor para a variável no parâmetro
   * a torna opcional, caso o método seja chamado 
   * sem passar o parâmetro, por default, o mesmo 
   * receberá o valor = 1
   * 
   * @param page 
   */
  getLatestMovies(page = 1){
    //return this.http.get(this.baseApiPath+"/movie/latest?api_key="+this.getApiKey());
    console.log("getLatestMovies page: ", page);
    return this.http.get(this.baseApiPath+`/movie/popular?${page}&api_key=`+this.getApiKey());
  }

  getMoviesDetails(filmeId){
    //usa crase (`) para concatenar usando ${}
    return this.http.get(this.baseApiPath+`/movie/${filmeId}?api_key=`+this.getApiKey());
  }

  getApiKey(): String {
    return "32819514a9d73e81c554e061572a0827"
  }

}
