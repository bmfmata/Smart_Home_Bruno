import { Injectable } from '@angular/core';


//cria como constante transformando texto em variável para ficar mais facil de repetir
let config_key_name = "config";

@Injectable()
export class ConfigProvider {

  private config = {
      showSlide: false,
      name: "",
      username: ""
  }

  constructor() {

  }

  // Recupera os dados do localstorage
  getConfigData(): any{
      return localStorage.getItem(config_key_name);
  }

  // Grava os dados do localstorage
  // O sinal de ? é para na ora que gravar nao ser obrigatório
  setConfigData(showSlide?: boolean, name?: string, username?: string){
  
  //Os códigos abaixo e If são utilizados para se preencher o campo, atualiza, senão, mantém os dados antes.
  
    let config = {
          showSlide: false,
          name: "",
          username: ""
      };

      if(showSlide){
        config.showSlide = showSlide;
      }

      if(name){
        config.name = name;
      }

      if(username){
        config.username = username;
      }


      //Local Storage é um item nativo, mas só aceita texto e acima ta em objeto
      //Por isso usar JSON.stringify para converter para texto
      //config_key_name = "config"
      localStorage.setItem(config_key_name, JSON.stringify(config));
  } 
}