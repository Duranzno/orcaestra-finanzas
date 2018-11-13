import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Estudiante} from './estudiante';
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
export class EstudianteService {
	estudianteURL='http://192.168.1.141:1234/api/estudiantes/';
  private handleError:HandleError;

  constructor(
  	private http:HttpClient,
  	httpErrorHandler:HttpErrorHandler) {
  	this.handleError = httpErrorHandler.createHandleError('EstudianteService');
	}
	get():Observable<Estudiante[]>{
		return this.http.get<Estudiante[]>(this.estudianteURL)
			.pipe(
				catchError(this.handleError('getEstudiante',[]))
			);
	}
  post(eNuevo:Estudiante)//: Observable<Estudiante> 
  {
  	console.log(JSON.stringify(eNuevo))

    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.post<Estudiante>(this.estudianteURL, eNuevo, httpOptions)
      .pipe(
        catchError(this.handleError('addEstudiante', eNuevo))
      );
  }
}
