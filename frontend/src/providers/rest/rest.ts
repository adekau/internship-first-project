import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
    private apiUrl = 'http://localhost:3000/api';

    constructor(public http: HttpClient) { }

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

    getTrackers(token): Observable<{}> {
        return this.http.get<{}>(this.apiUrl + '/users/trackers', {
            headers: {
                'x-access-token': token
            }
        })
            .pipe(
                map(this.extractData),
                catchError(this.handleError)
            );
    }

    async createIncident(token, incident: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl + '/incidents', incident, {
                headers: {
                    'x-access-token': token
                }
            })
                .subscribe((res: any) => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
        });
    }

    async updateIncident(token, incident: any): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.apiUrl}/incidents/${incident.incidentId}`, incident, {
                headers: {
                    'x-access-token': token
                }
            })
                .subscribe((res: any) => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
        });
    }

    getHistory(token, incidentId): Observable<{}> {
        return this.http.get(`${this.apiUrl}/incidenthistory/${incidentId}`, {
            headers: {
                'x-access-token': token
            }
        })
            .pipe(
                map(this.extractData),
                catchError(this.handleError)
            );
    }

    getIncident(token, incidentId): Observable<{}> {
        return this.http.get(`${this.apiUrl}/incidents/${incidentId}`, {
            headers: {
                'x-access-token': token
            }
        })
            .pipe(
                map(this.extractData),
                catchError(this.handleError)
            );
    }
}
