import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// INTERFACES
import { wsAPIEstadiscitosGobTotalesInterface, wsAPIEstadiscitosGobListaDataInterface, wsAPIEstadiscitosGobListaInterface, wsAPIEstadiscitosGobRowsDepKioInterface, wsAPIEstadiscitosGobStatusDataInterface } from '../interfaces/wsAPIEstadiscitosGob.interface';

const ws = 'http://localhost:666/wsAPIEstadisticosGob/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class WsAPIEstadisticosGobService {

  public ListaTramitesRegistradosLinea: wsAPIEstadiscitosGobListaDataInterface= null;
  public ListaTramitesRegistradosKioscos: wsAPIEstadiscitosGobListaDataInterface= null;
  public ListaTramitesRegistradosVentanilla: wsAPIEstadiscitosGobListaDataInterface= null;

  constructor(private http: HttpClient) { }

  // OBTENER DEPENDENCIAS
  dependencias(id?: string, desc?: string): Promise<wsAPIEstadiscitosGobRowsDepKioInterface[]> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/dependencias';
      if (id) {
        wsRequest += '?id=' + id;
      } else if (desc){
        wsRequest += '?desc=' + desc;
      }

      this.http.get<wsAPIEstadiscitosGobStatusDataInterface>(wsRequest)
          .pipe(
            map( (response: wsAPIEstadiscitosGobStatusDataInterface) => {
              return response.data;
            })
          )
          .subscribe( (response: wsAPIEstadiscitosGobRowsDepKioInterface[]) => {
              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER KIOSCOS
  kioscos(id?: string, desc?: string): Promise<wsAPIEstadiscitosGobRowsDepKioInterface[]> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/kioscos';
      if (id) {
        wsRequest += '?id=' + id;
      } else if (desc){
        wsRequest += '?desc=' + desc;
      }

      this.http.get<wsAPIEstadiscitosGobStatusDataInterface>(wsRequest)
          .pipe(
            map( (response: wsAPIEstadiscitosGobStatusDataInterface) => {
              return response.data;
            })
          )
          .subscribe( (response: wsAPIEstadiscitosGobRowsDepKioInterface[]) => {
              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER TRAMITES
  tramitesObservable(id?: string, desc?: string): Observable<wsAPIEstadiscitosGobRowsDepKioInterface[]> {

    let wsRequest = ws + 'query/tramites';
    if (id) {
      wsRequest += '?id=' + id;
    } else if (desc){
      wsRequest += '?desc=' + desc;
    }

    return this.http.get<wsAPIEstadiscitosGobStatusDataInterface>(wsRequest)
      .pipe(
        map( (response: wsAPIEstadiscitosGobStatusDataInterface) => {

          return response.data;            
          
          // let arrayResult = [];
          // response.data.forEach(item => {
          //   arrayResult.push(item.nombre);
          // });

          // return arrayResult;
          
        })
      );
  }

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

  // OBTENER LISTA DE TRAMITES REGISTRADOS EN LINEA
  listaTramitesRegistradosLinea(fecha1: string, fecha2: string): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    return new Promise ( (resolve, reject) => {

      if (this.ListaTramitesRegistradosLinea)
        resolve(this.ListaTramitesRegistradosLinea);

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
              
              this.ListaTramitesRegistradosLinea = response;

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER LISTA DE TRAMITES REGISTRADOS EN KIOSCOS
  listaTramitesRegistradosKioscos(fecha1: string, fecha2: string): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    return new Promise ( (resolve, reject) => {

      if (this.ListaTramitesRegistradosKioscos)
        resolve(this.ListaTramitesRegistradosKioscos);

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

              this.ListaTramitesRegistradosKioscos = response;

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER LISTA DE TRAMITES REGISTRADOS EN VENTANILLA
  listaTramitesRegistradosVentanilla(fecha1: string, fecha2: string): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    return new Promise ( (resolve, reject) => {

      if (this.ListaTramitesRegistradosVentanilla)
        resolve(this.ListaTramitesRegistradosVentanilla);

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

              this.ListaTramitesRegistradosVentanilla = response;

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER LISTA DE TRAMITES REGISTRADOS EN LINEA POR ID TRAMITE
  listaTramitesRegistradosLineaPorIdTramite(idTramite: number, fecha1: string, fecha2: string): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/listaTramitesRegistradosLineaPorIdTramite';

      wsRequest += '?idTramite=' + idTramite;
      if (fecha1) {
        wsRequest += '&fecha1=' + fecha1;
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
              
              this.ListaTramitesRegistradosLinea = response;

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER LISTA DE TRAMITES REGISTRADOS EN KIOSCOS POR ID TRAMITE
  listaTramitesRegistradosKioscosPorIdTramite(idTramite: number, fecha1: string, fecha2: string): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/listaTramitesRegistradosKioscosPorIdTramite';

      wsRequest += '?idTramite=' + idTramite;
      if (fecha1) {
        wsRequest += '&fecha1=' + fecha1;
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

              this.ListaTramitesRegistradosKioscos = response;

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER LISTA DE TRAMITES REGISTRADOS EN VENTANILLA POR ID TRAMITE
  listaTramitesRegistradosVentanillaPorIdTramite(idTramite: number, fecha1: string, fecha2: string): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/listaTramitesRegistradosVentanillaPorIdTramite';

      wsRequest += '?idTramite=' + idTramite;
      if (fecha1) {
        wsRequest += '&fecha1=' + fecha1;
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

              this.ListaTramitesRegistradosVentanilla = response;

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER LISTA DE TRAMITES REGISTRADOS EN LINEA POR DESCRIPCION
  listaTramitesRegistradosLineaPorDescripcion(desc: string, fecha1: string, fecha2: string): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/listaTramitesRegistradosLineaPorDescripcion';

      wsRequest += '?desc=' + desc;
      if (fecha1) {
        wsRequest += '&fecha1=' + fecha1;
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
              
              this.ListaTramitesRegistradosLinea = response;

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER LISTA DE TRAMITES REGISTRADOS EN KIOSCOS POR DESCRIPCION
  listaTramitesRegistradosKioscosPorDescripcion(desc: string, fecha1: string, fecha2: string): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/listaTramitesRegistradosKioscosPorDescripcion';

      wsRequest += '?desc=' + desc;
      if (fecha1) {
        wsRequest += '&fecha1=' + fecha1;
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

              this.ListaTramitesRegistradosKioscos = response;

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER LISTA DE TRAMITES REGISTRADOS EN VENTANILLA POR DESCRIPCION
  listaTramitesRegistradosVentanillaPorDescripcion(desc: string, fecha1: string, fecha2: string): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/listaTramitesRegistradosVentanillaPorDescripcion';

      wsRequest += '?desc=' + desc;
      if (fecha1) {
        wsRequest += '&fecha1=' + fecha1;
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

              this.ListaTramitesRegistradosVentanilla = response;

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER LISTA DE TRAMITES REGISTRADOS EN LINEA POR DESCRIPCION
  listaTramitesRegistradosLineaPorDependencia(idDependencia: number, fecha1: string, fecha2: string): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/listaTramitesRegistradosLineaPorDependencia';

      wsRequest += '?idDependencia=' + idDependencia;
      if (fecha1) {
        wsRequest += '&fecha1=' + fecha1;
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
              
              this.ListaTramitesRegistradosLinea = response;

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // OBTENER LISTA DE TRAMITES REGISTRADOS EN VENTANILLA POR DESCRIPCION
  listaTramitesRegistradosVentanillaPorDependencia(idDependencia: number, fecha1: string, fecha2: string): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    return new Promise ( (resolve, reject) => {

      let wsRequest = ws + 'query/listaTramitesRegistradosVentanillaPorDependencia';

      wsRequest += '?idDependencia=' + idDependencia;
      if (fecha1) {
        wsRequest += '&fecha1=' + fecha1;
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

              this.ListaTramitesRegistradosVentanilla = response;

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

}
