import { Injectable } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

// INTERFACES
import { pieCharInterface, pieChartsActoInterface } from '../interfaces/charts.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor() { }

  makePieChar (data: SingleDataSet, labels: Label[], total: number ): pieCharInterface {
    return {
      total: total,
      options: {responsive: true,plugins: {datalabels: {formatter: (value, ctx) => {const label = ctx.chart.data.labels[ctx.dataIndex];return label;}}}},    
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
