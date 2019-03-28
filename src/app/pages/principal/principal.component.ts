import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as $ from 'jquery';

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

  constructor() { }

  ngOnInit() {
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

      _closest.css('min-width', null);
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
