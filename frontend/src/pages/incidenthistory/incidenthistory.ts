import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { IncidentPage } from '../incident/incident';

/**
 * Generated class for the IncidenthistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-incidenthistory',
    templateUrl: 'incidenthistory.html',
})
export class IncidentHistoryPage {
    incidentId: number;
    data: any;
    incident: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private rest: RestProvider
    ) {
        this.incidentId = navParams.get('incidentId');
    }

    ionViewDidLoad() {
        this.getHistory();
        this.getIncident();
    }

    getHistory() {
        this.rest.getHistory(localStorage.getItem('access-token'), this.incidentId)
            .subscribe(data => this.data = data);
    }

    getIncident() {
        this.rest.getIncident(localStorage.getItem('access-token'), this.incidentId)
            .subscribe(data => this.incident = data);
    }

    viewRevision(num) {
        this.data.forEach(d => {
            if (d.revision === num) {
                let obj = Object.assign({}, this.incident);
                obj.latest = d;
                console.log(obj);
                this.navCtrl.push(IncidentPage, {
                    data: obj
                });
            }
        });
    }

}
