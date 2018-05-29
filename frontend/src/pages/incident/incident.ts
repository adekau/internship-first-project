import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

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

    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Incident Options',
            buttons: [
                {
                    text: 'Edit',
                    handler: () => {
                        console.log('Edit clicked');
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
