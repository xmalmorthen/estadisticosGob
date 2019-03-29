export interface tramiteInterface {
  id: number;
  nombre: string;
  realizados?: tramitesEncontradosInterface;
}

export interface tramitesEncontradosInterface {
  total: number;
  linea: number;
  ventanilla: number;
  kiosco: number;
}
