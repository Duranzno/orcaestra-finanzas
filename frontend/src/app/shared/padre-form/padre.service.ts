import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Padre} from './padre';
import { Pago} from '../pago-form/pago'
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
    
  })
};

@Injectable({
  providedIn: 'root'
})
export class PadreService {
	padreURL='http://192.168.1.141:1234/api/padres/';
  private handleError:HandleError;

  constructor(
  	private http:HttpClient,
  	httpErrorHandler:HttpErrorHandler) {
  	this.handleError = httpErrorHandler.createHandleError('PadreService');
	}
	get():Observable<Padre[]>{
		return this.http.get<Padre[]>(this.padreURL)
			.pipe(
				catchError(this.handleError('getPadre',[]))
			);
	}
  post(pNuevo:Padre)//: Observable<Padre> 
  {
  	console.log(JSON.stringify(pNuevo))

    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.post<Padre>(this.padreURL, pNuevo, httpOptions)
      .pipe(
        catchError(this.handleError('addPadre', pNuevo))
      );
  }
}
