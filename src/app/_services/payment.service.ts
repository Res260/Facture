import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Payment} from '../_models/payment';
import {ServiceUtil} from '../_utils/ServiceUtil';

/**
 * Service that queries payments.
 */
@Injectable()
export class PaymentService {

    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers([]);
        this.headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN, x_csrftoken');
    }

    /**
     * Fetches all payments.
     * @returns {Observable<Array<Payment>>} The observable which resolves to an array of {@link Payment}.
     */
    public getAll(): Observable<Array<Payment>> {
        return this.http.get(`${environment.backendUrl}payment`, this.headers)
            .map(response => response.json())
            .catch(ServiceUtil.handleError);
    }

    /**
     * Saves a new payment in the server.
     * @param {Payment} newPayment The payment to be persisted.
     * @returns {Observable<Payment>} The observable of the request.
     */
    public createPayment(newPayment: Payment): Observable<Payment> {
        return this.http.post(`${environment.backendUrl}payment`, newPayment, this.headers)
            .map(response => response.json())
            .catch(ServiceUtil.handleError);
    }

}
