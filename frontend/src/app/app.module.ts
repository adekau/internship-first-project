import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { IncidentPage } from '../pages/incident/incident';
import { IncidentFormPage } from '../pages/incidentform/incidentform';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    LoginPage,
    IncidentPage,
    IncidentFormPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    LoginPage,
    IncidentPage,
    IncidentFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    AuthProvider
  ]
})
export class AppModule {}
