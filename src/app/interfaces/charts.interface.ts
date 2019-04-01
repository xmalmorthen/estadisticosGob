import { SingleDataSet, Label } from "ng2-charts";
import { ChartOptions, ChartDataSets } from "chart.js";

export interface pieCharInterface {
  total?: number;
  data?: SingleDataSet;
  labels?: Label[];
  options: ChartOptions;
  plugins: any;
  legend: boolean;
}

export interface pieBarInterface {
  data?: ChartDataSets[];
  labels?: Label[];
  options: ChartOptions;
  plugins: any;
  legend: boolean;
}

export interface pieChartsActoInterface {
  acto: string;
  graph: pieCharInterface;
}
