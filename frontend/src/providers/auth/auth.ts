import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
    private apiUrl = 'http://localhost:3000/api';

    constructor(public http: HttpClient) { }

    authenticate(email, password): Promise<any> {
        let body = {
            email: email,
            password: password
        };

        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl + '/users/authenticate', body)
                .subscribe((res: any) => {
                    localStorage.setItem('access-token', res.token);
                    resolve(res);
                }, err => {
                    reject(err);
                });
        });
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('access-token');
    }

    logout(): void {
        localStorage.removeItem('access-token');
    }
}
