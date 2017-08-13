import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {BillBook} from '../_models/bill-book';
import {ServiceUtil} from '../_utils/ServiceUtil';

/**
 * Service that queries bill books.
 */
@Injectable()
export class BillBookService {

    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers([]);
        this.headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN, x_csrftoken');
    }

    /**
     * Fetches all billbooks with their bills and payments.
     * @returns {Observable<Array<BillBook>>} The observable which resolves to an array of {@link BillBook}.
     */
    public getAll(): Observable<Array<BillBook>> {
        return this.http.get(`${environment.backendUrl}billBook`, this.headers)
                   .map(response => response.json())
                   .catch(ServiceUtil.handleError);
    }

}
