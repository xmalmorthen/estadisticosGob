import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

// SERVICES
import { WsAPIEstadisticosGobService, ChartsService } from 'src/app/services/service.index';

// INTERFACES
import { wsAPIEstadiscitosGobListaDataInterface, wsAPIEstadiscitosGobListaRowInterface } from 'src/app/interfaces/wsAPIEstadiscitosGob.interface';
import { pieChartsActoInterface } from 'src/app/interfaces/charts.interface';

// ENUMERATORS
import { tramitesDetailRefEnum } from 'src/app/enumerators/tramitesDetailRef.enum';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.scss']
})
export class TramitesComponent implements OnInit {

  private parameter: string;
  public chartsActos: pieChartsActoInterface[] = [];

  constructor(
    public wsAPIEstadisticosGobService: WsAPIEstadisticosGobService,
    private chartService: ChartsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.parameter = this.activatedRoute.snapshot.paramMap.get('ref');
    this.activatedRoute.queryParams.subscribe( (params) => {

      if ( !moment(params.fecha1, "DD/MM/YYYY").isValid() || !moment(params.fecha2, "DD/MM/YYYY").isValid() ) {
        
        return this.router.navigateByUrl('/principal',{           
            queryParams: { error: true, message: 'Parámetros incorrectos' } 
          }
        );

      }

      // LISTA DE TRAMITES EN LINEA
      this.wsAPIEstadisticosGobService.listaTramitesRegistradosLinea(null, null)
      .then( (response: wsAPIEstadiscitosGobListaDataInterface) =>{

          let labels = [];
          let data= [];
          response.rows.forEach( (item: wsAPIEstadiscitosGobListaRowInterface) => {
            if (item.cantidad >= 4) {
              
              labels.push( item.nombreTramite );
              data.push( item.cantidad );

            }
          });

          let pieChar = this.chartService.makePieChar(data,labels,response.total);
          this.chartsActos.push(this.chartService.makeChartActo('En línea', tramitesDetailRefEnum.linea ,pieChar, { fecha1: params.fecha1, fecha2: params.fecha2 }));
          //this.totalTramitesRealizados += response.total;

      })
      .catch( (err) => {
      });

    });

  }

}
