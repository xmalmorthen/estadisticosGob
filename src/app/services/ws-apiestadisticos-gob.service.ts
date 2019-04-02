import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

// INTERFACES
import { wsAPIEstadiscitosGobTotalesInterface, wsAPIEstadiscitosGobListaDataInterface, wsAPIEstadiscitosGobListaInterface } from '../interfaces/wsAPIEstadiscitosGob.interface';

const ws = 'http://localhost:666/wsAPIEstadisticosGob/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class WsAPIEstadisticosGobService {

  constructor(private http: HttpClient) { }

  // OBTENER TOTAL DE TRAMITES REGISTRADOS EN LINEA
  totalTramitesRegistradosLinea(fecha1: string, fecha2: string): Promise<number> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/totalTramitesRegistradosLinea';
      if (fecha1) {
        wsRequest += '?fecha1=' + fecha1;
        if (fecha2)
          wsRequest += '&fecha2=' + fecha2;
      }

      this.http.get<wsAPIEstadiscitosGobTotalesInterface>(wsRequest)
          .pipe(
            map( (response: wsAPIEstadiscitosGobTotalesInterface) => {
              return response.data.total;
            })
          )
          .subscribe( (response: number) => {
              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER TOTAL DE TRAMITES REGISTRADOS EN KIOSCOS
  totalTramitesRegistradosKioscos(fecha1: string, fecha2: string): Promise<number> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/totalTramitesRegistradosKioscos';
      if (fecha1) {
        wsRequest += '?fecha1=' + fecha1;
        if (fecha2)
          wsRequest += '&fecha2=' + fecha2;
      }

      this.http.get<wsAPIEstadiscitosGobTotalesInterface>(wsRequest)
          .pipe(
            map( (response: wsAPIEstadiscitosGobTotalesInterface) => {
              return response.data.total;
            })
          )
          .subscribe( (response: number) => {
              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER TOTAL DE TRAMITES REGISTRADOS EN VENTANILLA
  totalTramitesRegistradosVentanilla(fecha1: string, fecha2: string): Promise<number> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/totalTramitesRegistradosVentanilla';
      if (fecha1) {
        wsRequest += '?fecha1=' + fecha1;
        if (fecha2)
          wsRequest += '&fecha2=' + fecha2;
      }

      this.http.get<wsAPIEstadiscitosGobTotalesInterface>(wsRequest)
          .pipe(
            map( (response: wsAPIEstadiscitosGobTotalesInterface) => {
              return response.data.total;
            })
          )
          .subscribe( (response: number) => {
              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER TOTAL DE TRAMITES REGISTRADOS EN VENTANILLA
  listaTramitesRegistradosLinea(fecha1: string, fecha2: string): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/listaTramitesRegistradosLinea';
      if (fecha1) {
        wsRequest += '?fecha1=' + fecha1;
        if (fecha2)
          wsRequest += '&fecha2=' + fecha2;
      }

      this.http.get<wsAPIEstadiscitosGobListaInterface>(wsRequest)
          .pipe(
            map( (response: wsAPIEstadiscitosGobListaInterface) => {
              return response.data;
            })
          )
          .subscribe( (response: wsAPIEstadiscitosGobListaDataInterface) => {
              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER TOTAL DE TRAMITES REGISTRADOS EN KIOSCOS
  listaTramitesRegistradosKioscos(fecha1: string, fecha2: string): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/listaTramitesRegistradosKioscos';
      if (fecha1) {
        wsRequest += '?fecha1=' + fecha1;
        if (fecha2)
          wsRequest += '&fecha2=' + fecha2;
      }

      this.http.get<wsAPIEstadiscitosGobListaInterface>(wsRequest)
          .pipe(
            map( (response: wsAPIEstadiscitosGobListaInterface) => {
              return response.data;
            })
          )
          .subscribe( (response: wsAPIEstadiscitosGobListaDataInterface) => {
              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER TOTAL DE TRAMITES REGISTRADOS EN KIOSCOS
  listaTramitesRegistradosVentanilla(fecha1: string, fecha2: string): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/listaTramitesRegistradosVentanilla';
      if (fecha1) {
        wsRequest += '?fecha1=' + fecha1;
        if (fecha2)
          wsRequest += '&fecha2=' + fecha2;
      }

      this.http.get<wsAPIEstadiscitosGobListaInterface>(wsRequest)
          .pipe(
            map( (response: wsAPIEstadiscitosGobListaInterface) => {
              return response.data;
            })
          )
          .subscribe( (response: wsAPIEstadiscitosGobListaDataInterface) => {
              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

}
