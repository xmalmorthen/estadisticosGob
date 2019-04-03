import { SingleDataSet, Label } from "ng2-charts";
import { ChartOptions, ChartDataSets } from "chart.js";

// ENUMERATORS
import { tramitesDetailRefEnum } from '../enumerators/tramitesDetailRef.enum';

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
  detailRef: tramitesDetailRefEnum;
  params?: {[k: string]: string;};
  graph: pieCharInterface;
}
