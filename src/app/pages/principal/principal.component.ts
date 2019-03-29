import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

// INTERFACES
import { searchResultInterface } from 'src/app/interfaces/searchResult.interface';

declare const $: any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Trámite 1', 'Tramite 2', 'Trámite 3'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartPlugins = [pluginDataLabels];

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
  
  public searchResult : searchResultInterface = null;


  constructor() { }

  ngOnInit() {
    
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
    }

  }

  ngAfterViewInit(){
    //$('.collapse').collapse();
  }

  // events
  public maximizeCard(event) {
    let target = $(event.target);
    let _closest = target.closest('div[name=card]');


    if (target.data('maximize') === true) {

      _closest.css('min-width', '97%');
      target.addClass('fa-window-minimize').removeClass('fa-window-maximize');
      target.data('maximize', false);

    } else {

      _closest.css('min-width', '0');
      target.addClass('fa-window-maximize').removeClass('fa-window-minimize');
      target.data('maximize', true);

    }

  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
