import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html'
})
export class DashboardPage {
    data: any;

    constructor(public navCtrl: NavController, public rest: RestProvider) {

    }

    async ionViewDidLoad() {
        // let data = await this.authenticate();
        // this.getIncidents(data.token);
    }

    async authenticate() {
        // return await this.rest.authenticate();
    }

    getIncidents(token) {
        this.rest.getIncidents(token)
            .subscribe(
                data => this.data = data,
                err => console.error(err)
            );
    }

}
