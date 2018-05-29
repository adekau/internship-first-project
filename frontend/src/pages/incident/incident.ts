import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { IncidentFormPage } from '../incidentform/incidentform';

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

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public actionSheetCtrl: ActionSheetController
    ) {
        this.data = navParams.get('data');
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
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => {
                        console.log('Delete clicked');
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
