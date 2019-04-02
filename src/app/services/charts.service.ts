import { Injectable } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

// INTERFACES
import { pieCharInterface, pieChartsActoInterface, pieBarInterface } from '../interfaces/charts.interface';
import { ChartDataSets } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor() { }

  makePieChar (data: SingleDataSet, labels: Label[], total: number ): pieCharInterface {
    return {
      total: total,
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
              console.log(tooltipItem, data);
              //debugger;

              const label = ' ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + ' trámites'; //data.labels[tooltipItem.index];
              return label.slice(0,40);

            }
          }
        }
      
      },
      legend: false,
      plugins: [pluginDataLabels],
      data: data,
      labels: labels
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
  makeChartActo ( acto: string, chart: pieCharInterface ): pieChartsActoInterface {
    return {
      acto : acto,
      graph: chart
    };
  }
}
