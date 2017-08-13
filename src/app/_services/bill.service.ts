import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Bill} from '../_models/bill';
import {ServiceUtil} from '../_utils/ServiceUtil';

/**
 * Service that queries bills.
 */
@Injectable()
export class BillService {

    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers([]);
        this.headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN, x_csrftoken');
    }

    /**
     * Fetches all bills.
     * @returns {Observable<Array<Bill>>} The observable which resolves to an array of {@link Bill}.
     */
    public getAll(): Observable<Array<Bill>> {
        return this.http.get(`${environment.backendUrl}bill`, this.headers)
                   .map(response => response.json())
                   .catch(ServiceUtil.handleError);
    }

    /**
     * Saves a new bill in the server.
     * @param {Bill} newBill The bill to be persisted.
     * @returns {Observable<Bill>} The observable of the request.
     */
    public createBill(newBill: Bill): Observable<Bill> {
        return this.http.post(`${environment.backendUrl}bill`, newBill, this.headers)
                   .map(response => response.json())
                   .catch(ServiceUtil.handleError);
    }

    /**
     * Send a request to delete a bill
     * @param {number} id The id of the bill to delete.
     * @returns {Observable<string>} The observable of the request.
     */
    public deleteBill(id: number): Observable<string> {
        return this.http.delete(`${environment.backendUrl}bill/${id}`)
                   .catch(ServiceUtil.handleError);
    }

}
