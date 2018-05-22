import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/throw';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
    private apiUrl = 'http://localhost:3000/api'
    private accessToken: any;

    static get parameters() {
        return [[HttpClient], [Storage]];
    }

    constructor(public http: HttpClient, public storage: Storage) { }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const err = error || '';
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    private storeAuth(res: Response) {
        let body: any = res;
        if (body.status === 200 && body.auth) {
            this.storage.ready().then(() => {
                this.storage.set('access-token', body.token);
            });
        }
        return body || {};
    }

    getIncidents(token): Observable<{}> {

        return this.http.get<{}>(this.apiUrl + '/incidents', {
            headers: {
                'x-access-token': token
            }
        })
            .pipe(
                map(this.extractData),
                catchError(this.handleError)
            );

    }

    authenticate(): Promise<any> {
        let body: {} = {
            email: 'alexander.j.dekau@wmich.edu',
            password: 'test12'
        };

        return this.http.post(this.apiUrl + '/users/authenticate', body).toPromise();
    }

}
