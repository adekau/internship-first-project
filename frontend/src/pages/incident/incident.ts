import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { IncidentFormPage } from '../incidentform/incidentform';
import { IncidentHistoryPage } from '../incidenthistory/incidenthistory';

/**
 * Generated class for the IncidentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-incident',
    templateUrl: 'incident.html',
})
export class IncidentPage {
    data: any;
    history: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public actionSheetCtrl: ActionSheetController
    ) {
        this.data = navParams.get('data');
        this.history = navParams.get('history');
    }

    ionViewDidLoad() { }
    ionViewWillEnter() {
        console.log('will enter');
        this.navParams.get('from');
    }

    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Incident Options',
            buttons: [
                {
                    text: 'Edit',
                    handler: () => {
                        this.navCtrl.push(IncidentFormPage, {
                            type: 'edit',
                            data: this.data
                        });
                    }
                },
                {
                    text: 'History',
                    handler: () => {
                        this.navCtrl.push(IncidentHistoryPage, {
                            incidentId: this.data.id
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });

        actionSheet.present();
    }

}
