import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Rx';
import {ServiceUtil} from '../_utils/ServiceUtil';
import {Payment} from '../_models/payment';

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

}
