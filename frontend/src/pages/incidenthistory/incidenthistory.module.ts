import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncidentHistoryPage } from './incidenthistory';

@NgModule({
  declarations: [
    IncidentHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(IncidentHistoryPage),
  ],
})
export class IncidenthistoryPageModule {}
