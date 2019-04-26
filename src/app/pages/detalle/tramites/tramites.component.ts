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

  public tipoTramite: tramitesDetailRefEnum = null;
  public listaTramites: wsAPIEstadiscitosGobListaRowInterface[] = null;
  public totalTramites: number = 0;

  constructor(
    public wsAPIEstadisticosGobService: WsAPIEstadisticosGobService,
    private chartService: ChartsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.tipoTramite = tramitesDetailRefEnum[this.activatedRoute.snapshot.paramMap.get('ref')];

    this.activatedRoute.queryParams.subscribe( (params) => {

      if ( !moment(params.fecha1, "DD/MM/YYYY").isValid() || !moment(params.fecha2, "DD/MM/YYYY").isValid() ) {
        
        return this.router.navigateByUrl('/principal',{           
            queryParams: { error: true, message: 'Parámetros incorrectos' } 
          }
        );

      }

      this.getDataTipoTramite( this.tipoTramite, params.fecha1, params.fecha2)
      .then ( (response: wsAPIEstadiscitosGobListaDataInterface ) =>{
        
        this.listaTramites = response.rows.sort( ( a, b) => a.cantidad > b.cantidad ? -1 : a.cantidad < b.cantidad ? 1 :0);
        this.totalTramites = response.total;

      }).catch ( err => {});

    });

  }

  private getDataTipoTramite ( tipoTramite: tramitesDetailRefEnum, fecha1: string, fecha2: string ): Promise<wsAPIEstadiscitosGobListaDataInterface> {
    switch (tipoTramite) {
      case tramitesDetailRefEnum.linea:
        // LISTA DE TRAMITES EN LINEA
        return this.wsAPIEstadisticosGobService.listaTramitesRegistradosLinea(fecha1, fecha2);        
        break;
      case tramitesDetailRefEnum.kioscos:
        // LISTA DE TRAMITES EN KIOSCO
        return this.wsAPIEstadisticosGobService.listaTramitesRegistradosKioscos(fecha1, fecha2);        
        break;
      case tramitesDetailRefEnum.ventanilla:
        // LISTA DE TRAMITES EN KIOSCO
        return this.wsAPIEstadisticosGobService.listaTramitesRegistradosVentanilla(fecha1, fecha2);
        break;
    }
  }


}
