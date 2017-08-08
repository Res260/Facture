import {Observable} from 'rxjs/Rx';

/**
 * Utility class to be used by the services.
 */
export class ServiceUtil {

	/**
	 * Logs the error.
	 * @param error The error given by the http service
	 * @returns {Observable<any>} The observable containing the error.
	 */
	public static handleError(error: any): Observable<any> {
		console.debug('Error', error._body);
		return Observable.throw(error);
	}
}
