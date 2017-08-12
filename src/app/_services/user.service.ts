import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {User} from '../_models/user';
import {ServiceUtil} from '../_utils/ServiceUtil';

/**
 * Service that queries users.
 */
@Injectable()
export class UserService {

    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers([]);
        this.headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN, x_csrftoken');
    }

    /**
     * Fetches all users.
     * @returns {Observable<Array<User>>} The observable which resolves to an array of {@link User}.
     */
    public getAll(): Observable<Array<User>> {
        return this.http.get(`${environment.backendUrl}user`, this.headers)
            .map(response => response.json())
            .catch(ServiceUtil.handleError);
    }

}
