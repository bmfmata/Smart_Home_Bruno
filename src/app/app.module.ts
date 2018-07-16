import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//importação do modulo HTTP.
import {HttpModule } from '@angular/http';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Importação das novas páginas

import { FilmesPage } from '../pages/filmes/filmes';
import { MonitoramentoPage } from '../pages/monitoramento/monitoramento';
import { ConfiguracaoPage } from '../pages/configuracao/configuracao';
import { ComandoPage } from '../pages/comando/comando';
import { DweetProvider } from '../providers/dweet/dweet';
import { MoovieProvider } from '../providers/moovie/moovie';
import { ConfigProvider } from '../providers/config/config';
import { IntroPage } from '../pages/intro/intro';

@NgModule({
  declarations: [
    MyApp,
    
    //Declaração das páginas
    FilmesPage,
    MonitoramentoPage,
    ConfiguracaoPage,
    ComandoPage,
    IntroPage,
  
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //Declaração do módulo HTTP
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    //Declaração das páginas
    MonitoramentoPage,
    ConfiguracaoPage,
    ComandoPage,
    FilmesPage,
    IntroPage,

    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    // Declaração dos providers para funcionar como global
    DweetProvider,
    MoovieProvider,
    ConfigProvider
  ]
})
export class AppModule {}
