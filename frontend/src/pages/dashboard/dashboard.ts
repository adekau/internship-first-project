import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { IncidentPage } from '../incident/incident';

@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html'
})
export class DashboardPage {
    data: any;

    constructor(
        public navCtrl: NavController,
        public rest: RestProvider,
        private auth: AuthProvider
    ) { }

    ionViewDidLoad() {
        if (this.auth.isLoggedIn()) {
            this.getIncidents(localStorage.getItem('access-token'));
        } else {
            this.navCtrl.setRoot(LoginPage);
        }
    }

    goToIncident(i) {
        console.log('Navigating to incident #', i);
        this.navCtrl.push(IncidentPage, {
            data: this.data[i]
        });
    }

    getIncidents(token) {
        this.rest.getIncidents(token)
            .subscribe(
                data => this.data = data,
                err => console.error(err)
            );
    }

    createNewIncident() {
        console.log('Create clicked');
    }

}
