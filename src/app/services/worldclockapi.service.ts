import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { worldClockApiInterface } from '../interfaces/worldClockApi.interface';

const ws = 'http://worldclockapi.com/api/json/utc/now';

@Injectable({
  providedIn: 'root'
})
export class WorldclockapiService {

  constructor(private http: HttpClient) { }

  // GET UTC NOW
  obtenerFechaUniverzal(): Promise<string> {
    return new Promise ( (resolve, reject) => {
      this.http.get<worldClockApiInterface>(ws)
          .pipe(
            map( (response: worldClockApiInterface) => {
              return response.currentDateTime;
            })
          )
          .subscribe( (response: string) => {
              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

}
