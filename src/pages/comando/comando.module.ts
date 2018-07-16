import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComandoPage } from './comando';

@NgModule({
  declarations: [
    ComandoPage,
  ],
  imports: [
    IonicPageModule.forChild(ComandoPage),
  ],
})
export class ComandoPageModule {}
