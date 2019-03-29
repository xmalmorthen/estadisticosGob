import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

// INTERFACES
import { searchResultInterface } from 'src/app/interfaces/searchResult.interface';
import { pieCharInterface, pieChartsActoInterface } from 'src/app/interfaces/charts.interface';
import { WorldclockapiService, ChartsService } from 'src/app/services/service.index';

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

  public fechaActual: string = null;
  public totalTramitesRealizados: number = 0;
  public chartsActos: pieChartsActoInterface[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: Label[] = ['Colima', 'Villa de Álvarez', 'Manzanillo', 'Comala'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'Origen de solicitudes' },
  ];

  public barChartColors: any[] = [
    { backgroundColor: [] },
    { borderColor: [] }
  ];

  public searchResult: searchResultInterface = null;


  constructor(
    private wsWorldclockapiService: WorldclockapiService,
    private chartService: ChartsService
  ) { 

    this.wsWorldclockapiService.obtenerFechaUniverzal()
      .then( (response: string) => {
        this.fechaActual = response;
      })
      .catch( (err) => {});

  }

  ngOnInit() {
    
    // simulación de respuesta de graficos de pastel tramites y servicios
    
    for (let i = 1; i <= 3; i++) {

      let randomTramites = Math.trunc((Math.random() * 15) + 1);
      let labels = [];
      let data= [];
      let total= 0;
      for (let idx = 1; idx <= randomTramites; idx++) {
        labels.push(`Trámite ${idx}`);

        const cantidad = Math.trunc((Math.random() * 15) + 1);
        data.push( cantidad );
        total += cantidad;
      }

      this.totalTramitesRealizados += total;  
      let pieChar = this.chartService.makePieChar(data,labels,total);
      this.chartsActos.push(this.chartService.makeChartActo(i === 1 ? 'En línea' : i === 2 ? 'Kioscos' : 'Ventanilla',pieChar));
    }



    



    // simulación de respuesta de busqueda general
    this.searchResult = {
      general : {
        palabra : 'acta'
      },
      registrosEncontrados : 5,
      listaTramites : [
        { id : 1, nombre : 'Trámite 1', realizados : { total : 10, linea : 5, ventanilla : 1, kiosco : 4 } },
        { id : 2, nombre : 'Trámite 2', realizados : { total : 20, linea : 5, ventanilla : 5, kiosco : 10 } },
        { id : 3, nombre : 'Trámite 3', realizados : { total : 5, linea : 3, ventanilla : 0, kiosco : 2 } },
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
