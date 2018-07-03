import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let configKeyName = "config"

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    name: "",
    username: ""
  }
  
  constructor() {
    console.log('Hello ConfigProvider Provider');
  }

  /**
   * Recupera os dados do localstorage
   */
  getConfigData(): any{
      return localStorage.getItem(configKeyName);
  }

  /**
   * Grava os dados do localstorage
   * @param showSlide 
   * @param name 
   * @param username 
   */
  setConfigData(showSlide?: boolean, name?: string, username?: string){
      let config = {
        showSlide: false,
        name: "",
        username: ""
      }

      if (showSlide) {
        config.showSlide = showSlide;
      }

      if (name) {
        config.name = name;
      }

      if (username) {
        config.username = username;
      }

      localStorage.setItem(configKeyName, JSON.stringify(config));
  }

}
