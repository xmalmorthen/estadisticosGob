import { pieCharInterface } from './charts.interface';

export interface tramiteInterface {
  id: number;
  nombre: string;
  realizados?: tramitesEncontradosInterface;
  graph?: pieCharInterface
}

export interface tramitesEncontradosInterface {
  total: number;
  linea: number;
  ventanilla: number;
  kiosco: number;
}
