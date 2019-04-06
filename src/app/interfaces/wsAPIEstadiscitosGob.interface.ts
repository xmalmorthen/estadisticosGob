export interface wsAPIEstadiscitosGobStatusDataInterface {
  status: boolean;
  data: wsAPIEstadiscitosGobRowsDepKioInterface[];
}

export interface wsAPIEstadiscitosGobRowsDepKioInterface {
  id: string;
  nombre: string;
  fIns: string;
  fAct?: any;
  idRefService: string;
}

export interface wsAPIEstadiscitosGobTotalesInterface {
  status: boolean;
  message: string;
  data: wsAPIEstadiscitosGobTotalesDataInterface;
}

export interface wsAPIEstadiscitosGobTotalesDataInterface {
  total: number;
}

export interface wsAPIEstadiscitosGobListaInterface {
  status: boolean;
  message: string;
  data: wsAPIEstadiscitosGobListaDataInterface;
}

export interface wsAPIEstadiscitosGobListaDataInterface {
  total: number;
  rows: wsAPIEstadiscitosGobListaRowInterface[];
}

export interface wsAPIEstadiscitosGobListaRowInterface {
  idTramite: string;
  cantidad: number;
  nombreTramite: string;
}