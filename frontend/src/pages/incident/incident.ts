import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.data = navParams.get('data');
    }

    ionViewDidLoad() { }

}
