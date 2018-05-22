import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DashboardPage } from '../pages/dashboard/dashboard';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = DashboardPage;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public auth: AuthProvider,
        public toast: ToastController) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Dashboard', component: DashboardPage },
            { title: 'List', component: ListPage },
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    login() {
        this.nav.setRoot(LoginPage);
    }

    logout() {
        this.auth.logout();

        this.toast.create({
            message: 'Logged out!',
            duration: 3000,
            position: 'top'
        }).present();
        
        this.nav.setRoot(DashboardPage);
    }
}
