import { Component } from '@angular/core';

import { MonitoramentoPage } from '../monitoramento/monitoramento';
import { ComandoPage } from '../comando/comando';
import { FilmesPage } from '../filmes/filmes';
import { ConfiguracaoPage } from '../configuracao/configuracao';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MonitoramentoPage;
  tab2Root = ComandoPage;
  tab3Root = FilmesPage;
  tab4Root = ConfiguracaoPage;

  constructor() {

  }
}
