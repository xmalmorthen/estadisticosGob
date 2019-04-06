import { Pipe, PipeTransform } from '@angular/core';
import { Select2Data } from 'ng-select2-component';

// INTERFACES
import { wsAPIEstadiscitosGobRowsDepKioInterface } from '../interfaces/wsAPIEstadiscitosGob.interface';

@Pipe({
  name: 'select2Paser'
})
export class Select2Pipe implements PipeTransform {

  transform(lista: wsAPIEstadiscitosGobRowsDepKioInterface[]): Select2Data  {
    let responsePipe = [];
    if (lista) {
      lista.forEach( (item: wsAPIEstadiscitosGobRowsDepKioInterface)  => {
        responsePipe.push({ value: item.id, label: item.nombre });
      });
    }
    return responsePipe;
  }

}
