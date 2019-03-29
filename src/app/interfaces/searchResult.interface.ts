import { tramiteInterface } from "./tramite.interface";

export interface searchResultInterface {
  general?: busquedaGeneralInterface;
  especifica?: busquedaEspecifica;
  registrosEncontrados: number;
  listaTramites: tramiteInterface[];
}

export interface busquedaGeneralInterface {
  palabra: string;
}

export interface busquedaEspecifica {
  idDependencia?: number;
  dependencia?: string;
  idKiosco?: number;
  kiosco?: string;
  idTramite?: number;
  tramite?: string;
  fechaDesde?: string;
  fechaHasta?: string;
}
