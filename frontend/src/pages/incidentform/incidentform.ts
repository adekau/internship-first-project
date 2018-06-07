import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import * as _ from 'lodash';
import { RestProvider } from '../../providers/rest/rest';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-incidentform',
    templateUrl: 'incidentform.html',
})

export class IncidentFormPage {
    private allowedToLeave: boolean = false;
    private user: any = {};
    private trackers: any;
    private incident: any = {
        resolution: ""
    };
    private original: any = {
        resolution: ""
    };
    type: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private rest: RestProvider,
        private toast: ToastController
    ) {
        this.type = navParams.get('type');
        
        if (this.type === 'edit') {
            let data = navParams.get('data');
            // Using object.assign to shallow copy object to get a clone, not reference.
            this.incident = Object.assign({}, data.latest);
            this.incident.trackerId = data.tracker.id;
            delete this.incident.createdAt;
            delete this.incident.updatedAt;
            this.incident.incidentId = data.id;
            delete this.incident.id;
            this.original = Object.assign({}, this.incident);
        }
     }

    ionViewDidLoad() {
        this.getTrackers();
        this.getUser();
    }

    private getUser() {
        this.user = JSON.parse(localStorage.getItem('logged-in-user'));
    }

    private getTrackers() {
        let token = localStorage.getItem('access-token');
        this.rest.getTrackers(token)
            .subscribe(trackers => this.trackers = trackers);
    }

    private formHasChanged(): boolean {
        return !_.isEqual(this.incident, this.original);
    }

    ionViewCanLeave() {
        if (this.formHasChanged() && !this.allowedToLeave) {
            let alertPopup = this.alertCtrl.create({
                title: 'Discard unsaved form data?',
                message: 'Inputted information will not save if you leave. Are you sure?',
                buttons: [{
                    text: 'Exit',
                    handler: () => {
                        this.allowedToLeave = true;
                        this.navCtrl.pop();
                    }
                },
                {
                    text: 'Stay',
                    handler: () => {
                        // Stuff to do if stay is pressed.
                    }
                }]
            });

            alertPopup.present();

            return false;
        } else {
            return true;
        }
    }

    submitForm() {
        if (this.type === 'create') {
            this.createIncident();
        } else {
            this.editIncident();
        }
    }

    createIncident() {
        this.incident.userId = this.user.id;
        this.incident.revision = 1;
        let token = localStorage.getItem('access-token');
        this.rest.createIncident(token, this.incident)
            .then((res: any) => {
                this.toast.create({
                    message: `${res.text}`,
                    duration: 3000,
                    position: 'top'
                }).present();
                this.allowedToLeave = true;
                this.navCtrl.setRoot(DashboardPage);
            });
    }

    editIncident() {
        // NOTE: Incident revision # incrementation is handled on the server.
        let token = localStorage.getItem('access-token');

        this.rest.updateIncident(token, this.incident)
            .then((res: any) => {
                this.toast.create({
                    message: `${res.text}`,
                    duration: 3000,
                    position: 'top'
                }).present();
                this.allowedToLeave = true;
                this.navCtrl.setRoot(DashboardPage);
            });
    }
}
