import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncidentFormPage } from './incidentform';

@NgModule({
  declarations: [
    IncidentFormPage,
  ],
  imports: [
    IonicPageModule.forChild(IncidentFormPage),
  ],
})
export class CreatePageModule {}
