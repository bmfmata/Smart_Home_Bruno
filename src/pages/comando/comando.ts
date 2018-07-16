import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//É preciso importar o provideer.
import { DweetProvider } from '../../providers/dweet/dweet';

/**
 * Generated class for the ComandoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comando',
  templateUrl: 'comando.html',
})
export class ComandoPage {

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
   public state: string;
   public teste = 0
 
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
 
   
   ionViewDidLoad() {
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
         this.teste = objeto_retorno.with[0].content.bam_nuvem;
         
 
       },
       
       error => {
         console.log(error);
       }
 
       
     )
     if(this.bebe == 0){
       
       this.state = "Manual";
       
     }
     else{
         this.state = "Automatico";
         
 
 
       }
     console.log(this.locais, this.state);
     
     
   }
 
 
   update() {
     this.ionViewDidLoad();
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
     this.update();
     console.log(this.teste);
     
 
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


