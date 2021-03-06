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
     * Saves a new payment in the server.
     * @param {Payment} newPayment The payment to be persisted.
     * @returns {Observable<Payment>} The observable of the request.
     */
    public createPayment(newPayment: Payment): Observable<Payment> {
        return this.http.post(`${environment.backendUrl}payment`, newPayment, this.headers)
                   .map(response => response.json())
                   .catch(ServiceUtil.handleError);
    }

    /**
     * Delete a new payment from the server.
     * @param {Payment} id The payment to be deleted's id.
     * @returns {Observable<Payment>} The observable of the request.
     */
    public deletePayment(id: number): Observable<Payment> {
        return this.http.delete(`${environment.backendUrl}payment/${id}`, this.headers)
                   .catch(ServiceUtil.handleError);
    }

}
