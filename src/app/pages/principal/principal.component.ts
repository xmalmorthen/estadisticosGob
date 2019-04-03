import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

// INTERFACES
import { searchResultInterface } from 'src/app/interfaces/searchResult.interface';
import { pieCharInterface, pieChartsActoInterface, pieBarInterface } from 'src/app/interfaces/charts.interface';
import { WorldclockapiService, ChartsService, WsAPIEstadisticosGobService } from 'src/app/services/service.index';
import { wsAPIEstadiscitosGobListaDataInterface, wsAPIEstadiscitosGobListaRowInterface } from 'src/app/interfaces/wsAPIEstadiscitosGob.interface';

// ENUMERATORS
import { tramitesDetailRefEnum } from 'src/app/enumerators/tramitesDetailRef.enum';
import { ActivatedRoute, Router } from '@angular/router';

declare const $: any;

declare interface pieChartsActosInterface {
  acto: string;
  cantidad?: number;
  graph: pieCharInterface;
}

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {   

  public isCollapsedSearchSeccion: boolean = true;

  public fechaActual: string = null; // fecha actual obtenida de la web
  public totalTramitesRealizados: number = 0; // label que muestra total de tramites realizados
  public chartsActos: pieChartsActoInterface[] = []; // objeto que contiene la información que se muestra de los tipos de tramites con sus gráficos
  public barCharOrigenSolicitudes: pieBarInterface = null; // objeto que contiene la información del gráfico de barras
  public searchResult: searchResultInterface = null; // objeto que contiene la información que se muestra como resultado de la busqueda general

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private wsWorldclockapiService: WorldclockapiService,
    private chartService: ChartsService,
    private wsAPIEstadisticosGobService: WsAPIEstadisticosGobService
  ) { 

    this.activatedRoute.queryParams.subscribe( (params) => {

      console.log(params);
      
    });

    this.wsWorldclockapiService.obtenerFechaUniverzal()
      .then( (response: string) => {
        this.fechaActual = response;
      })
      .catch( (err) => {});

    // LISTA DE TRAMITES EN LINEA
    this.wsAPIEstadisticosGobService.listaTramitesRegistradosLinea('01/01/2019','31/12/2019')
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
        this.chartsActos.push(this.chartService.makeChartActo('En línea', tramitesDetailRefEnum.linea ,pieChar, { fecha1: '01/01/2019', fecha2: '31/12/2019' }));

        this.totalTramitesRealizados += response.total;

    })
    .catch( (err) => {
    });
  
    // LISTA DE TRAMITES EN KIOSCOS
    this.wsAPIEstadisticosGobService.listaTramitesRegistradosKioscos('01/01/2019','31/12/2019')
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
        this.chartsActos.push(this.chartService.makeChartActo('En kioscos', tramitesDetailRefEnum.kioscos,pieChar, { fecha1: '01/01/2019', fecha2: '31/12/2019' }));

        this.totalTramitesRealizados += response.total;

    })
    .catch( (err) => {
    });

    // LISTA DE TRAMITES EN VENTANILLA
    this.wsAPIEstadisticosGobService.listaTramitesRegistradosVentanilla('01/01/2019','31/12/2019')
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
        this.chartsActos.push(this.chartService.makeChartActo('En ventanilla', tramitesDetailRefEnum.ventanilla,pieChar, { fecha1: '01/01/2019', fecha2: '31/12/2019' }));

        this.totalTramitesRealizados += response.total;

    })
    .catch( (err) => {
    });

  }

  ngOnInit() {
    
    // simulación de respuesta de grafico de barras
    const data = [{ data: [65, 59, 80, 81]}];
    const labels = ['Colima', 'Villa de Álvarez', 'Manzanillo', 'Comala'];
    this.barCharOrigenSolicitudes = this.chartService.makeBarChar(data,labels);


    // simulación de respuesta de busqueda general
    this.searchResult = {
      general : {
        palabra : 'acta'
      },
      registrosEncontrados : 5,
      listaTramites : [
        { id : 1, nombre : 'Trámite 1', realizados : { total : 10, linea : 5, ventanilla : 1, kiosco : 4 }, graph : this.chartService.makePieChar([5,1,4],['Línea','Kiosco','Ventanilla'],10) },
        { id : 2, nombre : 'Trámite 2', realizados : { total : 20, linea : 5, ventanilla : 5, kiosco : 10 }, graph : this.chartService.makePieChar([5,5,10],['Línea','Kiosco','Ventanilla'],20) },
        { id : 3, nombre : 'Trámite 3', realizados : { total : 5, linea : 3, ventanilla : 0, kiosco : 2 }, graph : this.chartService.makePieChar([3,2],['Línea','Ventanilla'],5) },
        { id : 4, nombre : 'Trámite 4' },
        { id : 5, nombre : 'Trámite 5' }
      ]
    };

  }

  // ngAfterViewInit(){}

  // events
  public maximizeCard(event, card, legendBtn) {
    let target = $(card);
    let _event = $(event.currentTarget);

    if (target.data('maximize') === true) {

      target.removeClass('col-12 col-md-12 col-lg-4').addClass('col-12');
      _event.addClass('fa-window-minimize');
      target.data('maximize', false);

      $(legendBtn).removeClass('d-none');

    } else {

      target.removeClass('col-12').addClass('col-12 col-md-12 col-lg-4');
      _event.addClass('fa-window-maximize').removeClass('fa-window-minimize');
      target.data('maximize', true);

      $(legendBtn).addClass('d-none');

    }

  }

  public chartClicked( event, item, labelTramite): void {
    console.log(event, item, labelTramite);
    //debugger;
  }

  public chartHovered( event, item, labelTramite): void {
    labelTramite.innerHTML = `<i class="fa fa-info-circle" aria-hidden="true"></i> Trámite <hr class='m-0 p-0'/><span>${item.graph.labels[event.active[0]._index]} [ <strong>${item.graph.data[event.active[0]._index]}</strong> trámites realizados.<span> ]` ;
  }  

}
