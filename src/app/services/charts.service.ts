import { Injectable } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

// INTERFACES
import { pieCharInterface, pieChartsActoInterface, pieBarInterface } from '../interfaces/charts.interface';
import { ChartDataSets } from 'chart.js';

// ENUMERATORS
import { tramitesDetailRefEnum } from '../enumerators/tramitesDetailRef.enum';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor() { }

  makePieChar (data: SingleDataSet, labels: Label[], total: number ): pieCharInterface {
    return {
      total: total,
      legend: false,
      plugins: [pluginDataLabels],
      data: data,
      labels: labels,
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            // formatter: (value, ctx) => {
            //   const label =  ctx.chart.data.labels[ctx.dataIndex];
            //   return label;
            // }
          }
        },
        tooltips:{
          enabled: true,
          callbacks: {
            label: function(tooltipItem, data) {
              //console.log(tooltipItem, data);
              //debugger;

              const label = ' ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + ' trámites'; //data.labels[tooltipItem.index];
              return label; //.slice(0,40);

            }
          }
        }      
      }
    };
  }

  makeBarChar (data: ChartDataSets[], labels: Label[] ): pieBarInterface {
    return {
      options: {responsive: true},    
      legend: false,
      plugins: [pluginDataLabels],
      data: data,
      labels: labels
    };
  }


  //cambiar tipado string de parámetro chart por los diferentes tipos de interfaces de graficos
  makeChartActo ( acto: string, detailRef: tramitesDetailRefEnum, chart: pieCharInterface, params: {[k: string]: string;} ): pieChartsActoInterface {
    return {
      acto: acto,
      detailRef: detailRef,
      params: params,      
      graph: chart
    };
  }
}
