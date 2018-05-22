import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    private loginInfo: any = {};

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private auth: AuthProvider,
        private toast: ToastController) { }

    ionViewDidLoad() {
        if (this.auth.isLoggedIn()) {
            this.navCtrl.setRoot(DashboardPage);
        }
    }

    loginForm() {
        this.auth.authenticate(this.loginInfo.email, this.loginInfo.password)
            .then(data => {
                this.navCtrl.setRoot(DashboardPage);
                this.toast.create({
                    message: 'Successfully logged in!',
                    duration: 3000,
                    position: 'top'
                }).present();
            });
    }

}
