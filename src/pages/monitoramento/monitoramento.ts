import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//É preciso importar o provideer.
import { DweetProvider } from '../../providers/dweet/dweet';

/**
 * Generated class for the MonitoramentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-monitoramento',
  templateUrl: 'monitoramento.html',
})
export class MonitoramentoPage {

  constructor(
    public navCtrl: NavController,

    //Declara o Dweet como constructor
    public dweetProvider: DweetProvider, 
    public navParams: NavParams) {
  }

  //Declaração das Variáveis que serão usadas.
  public respostaDweet: string = "";
  public locais = new Array<any>();
  public temp = 0;
  public lumi = 0;
  public bebe = 0;
  public estado = 0;
  public alarme = 0;
  public auto_man: string;
  public on_off: string;
  public aux_lumi: string;

  //Declaração da Model que irá ajustar o Toogle Button do Ar condicionado.
  public liga_des_model = {
    checked: false,
    name: "AR"
  }

  //Declaração da Model que irá ajustar o Toogle Button do Botão AM.
  public bam_nuvem_model = {
    checked: false,
    name: "BAM"
  }

  //Declaração da Model que irá ajustar o Toogle Button do Reset.
  public reset_model = {
    checked: false,
    name: "RESET"
  }

  
  ionViewDidEnter() {
    //buscando os dados no Dweet e salvando nas variáies locais
    
    this.dweetProvider.getLastestDweet("bmfmata").subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.locais = objeto_retorno.with[0].content;
        this.liga_des_model.checked = objeto_retorno.with[0].content.led;
        this.bam_nuvem_model.checked = objeto_retorno.with[0].content.bam_nuvem;
        this.reset_model.checked = objeto_retorno.with[0].content.bam_nuvem;
        this.temp = objeto_retorno.with[0].content.temp;
        this.estado = objeto_retorno.with[0].content.estado;
        this.lumi = objeto_retorno.with[0].content.lumi;
        this.bebe = objeto_retorno.with[0].content.bebe;
        this.alarme = objeto_retorno.with[0].content.alarme;
        console.log(this.locais);      

      },
      
      error => {
        console.log(error);
      }
     
    )
    if(this.estado == 1){
        this.auto_man = "Automático";
    }
    else{
        this.auto_man = "Manual";
      }
    


    if(this.alarme == 0){
          this.on_off = "Desligado";
      }
    else{
          this.on_off = "Ligado";     
      }
    


    
    if(this.lumi < 300){
        this.aux_lumi = "Baixa";
    }
    else if(this.lumi >= 300 && this.lumi <= 500){
        this.aux_lumi = "Média";     
    }
    else{
    
        this.aux_lumi = "Alta";
      }
  

  }


  update() {
    this.ionViewDidEnter();
  }




  //mudando o estado do Ar Condicionado
  change_liga_des() {
    this.dweetPost();
    console.log(this.liga_des_model.checked);
  }

  //Mudando o estado do Reset
  change_reset() {
    this.dweetPost();
    console.log(this.reset_model.checked);

  }

  //Mudando o estado do Botão Automático/Manual
  change_bam_nuvem() {
    this.dweetPost();
    console.log(this.bam_nuvem_model.checked);

  }


  dweetPost() {
    //Convertendo os dados de Boolean para Int.
    const liga_des = ((this.liga_des_model.checked == true) ? 1 : 0);
    const reset = ((this.reset_model.checked == true) ? 1 : 0);
    const bam_nuvem = ((this.bam_nuvem_model.checked == true) ? 1 : 0);

    //Enviando os dados para o Dweet.io
    const json_dweet = { "bam_nuvem": bam_nuvem, "liga_des": liga_des, "reset": reset, "bebe": this.bebe, "alarme": this.alarme, "estado": this.estado, "temp": this.temp, "lumi": this.lumi };
    this.dweetProvider.setDweet("bmfmata", json_dweet).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

}






