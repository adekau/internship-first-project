import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { IncidentPage } from '../incident/incident';
import { IncidentFormPage } from '../incidentform/incidentform';

@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html'
})
export class DashboardPage {
    data: any;
    total: number;
    open: number;
    major: number;
    minor: number;
    security: number;
    user: any = JSON.parse(localStorage.getItem('logged-in-user')) || {firstName: '', lastName: ''};

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
        this.navCtrl.push(IncidentPage, {
            data: this.data[i]
        });
    }

    getIncidents(token) {
        this.rest.getIncidents(token)
            .subscribe(
                data => {
                    this.data = data;
                    this.total = this.data.length;
                    this.open = 0;
                    this.major = 0;
                    this.minor = 0;
                    this.security = 0;

                    this.data.forEach(element => {
                        if (element.latest.resolution === "" || element.latest.resolution === null || element.latest.resolution === undefined) {
                            this.open += 1;
                        }
                        if (element.latest.classification === "major") {
                            this.major += 1;
                        } else if (element.latest.classification === "minor") {
                            this.minor += 1;
                        } else if (element.latest.classification === "security") {
                            this.security += 1;
                        } else {
                            // should NOT reach this branch
                            console.error("There is an incident with an incorrect classification.");
                        }
                    });
                },
                err => console.error(err)
            );
    }

    createNewIncident() {
        this.navCtrl.push(IncidentFormPage, {
            type: 'create'
        });
    }

    refresh() {
        if (this.auth.isLoggedIn()) {
            this.data = undefined;
            this.getIncidents(localStorage.getItem('access-token'));
        }
    }
}
