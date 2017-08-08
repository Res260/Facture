import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Bill} from '../_models/bill';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Rx';
import {ServiceUtil} from '../_utils/ServiceUtil';

/**
 * Service that queries bills.
 */
@Injectable()
export class BillService {

	constructor(private http: Http) {

	}

	public getAll(): Observable<Array<Bill>> {
		const headers: Headers = new Headers([]);
		headers.append('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN, x_csrftoken');
		return this.http.get(`${environment.backendUrl}bills`, headers)
			.map(response => response.json())
			.catch(ServiceUtil.handleError);
	}

}
