import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Pago, PagoImpl, Bancos} from './pago'
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';


// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'my-auth-token'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class PagoService {
//   constructor() { }
  pagoUrl='';
  private handleError:HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PagoService');
  }
//   getPagoId(pagoId:string):Observable<Pago[]>{
//   	const options = {
//   	 params: new HttpParams().set('pagoid',pagoId),
//   	};
//   	return this.http.put<Pago>(this.pagoUrl,pago,options)
//   	  .pipe(
//   	  	catchError(this.handleError('updatePago',pago))
// 	  	)
//   }
//   updatePagoId(pagoId:string,pago:Pago=new PagoImpl("Desconocido","123",4)
//   	:Observable<Pago> {
  	
//   	const options ={ params: new HttpParams().set('pagoid',pagoId) }:{};
//   	return this.http.put<Pago>(this.pagoUrl,pago,httpOptions)
//   	  .pipe(
//   	  	catchError(this.handleError('updatePago',pago))
// 	  	)
//   }
}
