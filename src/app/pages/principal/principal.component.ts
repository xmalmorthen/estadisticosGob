import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

// INTERFACES
import { searchResultInterface } from 'src/app/interfaces/searchResult.interface';
import { pieCharInterface, pieChartsActoInterface, pieBarInterface } from 'src/app/interfaces/charts.interface';
import { WorldclockapiService, ChartsService, WsAPIEstadisticosGobService } from 'src/app/services/service.index';
import { wsAPIEstadiscitosGobListaDataInterface, wsAPIEstadiscitosGobListaRowInterface } from 'src/app/interfaces/wsAPIEstadiscitosGob.interface';

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

  public maximizedObject: any = null;

  constructor(
    private wsWorldclockapiService: WorldclockapiService,
    private chartService: ChartsService,
    private wsAPIEstadisticosGobService: WsAPIEstadisticosGobService
  ) { 

    this.wsWorldclockapiService.obtenerFechaUniverzal()
      .then( (response: string) => {
        this.fechaActual = response;
      })
      .catch( (err) => {});


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
          this.chartsActos.push(this.chartService.makeChartActo('En línea',pieChar));

      })
      .catch( (err) => {
      });

  }

  ngOnInit() {
    
    // simulación de respuesta de graficos de pastel tramites y servicios   
    // for (let i = 1; i <= 3; i++) {

    //   let randomTramites = Math.trunc((Math.random() * 15) + 1);
    //   let labels = [];
    //   let data= [];
    //   let total= 0;
    //   for (let idx = 1; idx <= randomTramites; idx++) {
    //     labels.push(`Trámite ${idx}`);

    //     const cantidad = Math.trunc((Math.random() * 15) + 1);
    //     data.push( cantidad );
    //     total += cantidad;
    //   }

    //   this.totalTramitesRealizados += total;  
    //   let pieChar = this.chartService.makePieChar(data,labels,total);
    //   this.chartsActos.push(this.chartService.makeChartActo(i === 1 ? 'En línea' : i === 2 ? 'Kioscos' : 'Ventanilla',pieChar));
    // }

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
  public maximizeCard(event, card) {
    let target = $(card);
    let _event = $(event.currentTarget);

    if (target.data('maximize') === true) {

      target.removeClass('col-12 col-md-12 col-lg-4').addClass('col-12');
      _event.addClass('fa-window-minimize');
      target.data('maximize', false);

    } else {

      target.removeClass('col-12').addClass('col-12 col-md-12 col-lg-4');
      _event.addClass('fa-window-maximize').removeClass('fa-window-minimize');
      target.data('maximize', true);

    }

  }

  public chartClicked( event, item ): void {
    console.log(event,item);
  }  

}
