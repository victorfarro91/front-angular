import { Injectable } from '@angular/core';
import { Encuesta } from '../_model/encuesta';
import { HttpClient } from '@angular/common/http';
import { HOST_BACKEND, TOKEN_NAME } from '../_shared/constants';
//import { Problema } from '../_model/Problema';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncuestaAdminService {

  urlEncuesta: string = `${HOST_BACKEND}/api/encuesta`;

  mensajeRegistro = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  /*guardarEncuesta(encuesta: Encuesta) {
    return this.httpClient.post(`${this.urlEncuesta}/registrar`, encuesta);
  }*/

  obtenerRegistros(page: number, size: number) {
    return this.httpClient.get<Encuesta[]>(`${this.urlEncuesta}/listar-paginado?page=${page}&size=${size}`);
  }


}
