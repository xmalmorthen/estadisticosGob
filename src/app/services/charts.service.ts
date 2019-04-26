import { Injectable } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

// INTERFACES
import { pieCharInterface, pieChartsActoInterface, pieBarInterface } from '../interfaces/charts.interface';
import { ChartDataSets, ChartOptions } from 'chart.js';

// ENUMERATORS
import { tramitesDetailRefEnum } from '../enumerators/tramitesDetailRef.enum';

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor() { }

  makePieChar (data: SingleDataSet, labels: Label[], total: number, options: ChartOptions = null  ): pieCharInterface {

    var defaults: ChartOptions = {
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
          enabled: false,
          callbacks: {
            label: function(tooltipItem, data) {
              // const label = ' ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + ' trámites'; //data.labels[tooltipItem.index];
              const label = data.labels[tooltipItem.index];
              return label; //.slice(0,40);
            }
          }
        }
      }

    options = options ? $.extend(defaults, options) : defaults;

    return {
      total: total,
      legend: false,
      plugins: [pluginDataLabels],
      data: data,
      labels: labels,
      options: options
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
