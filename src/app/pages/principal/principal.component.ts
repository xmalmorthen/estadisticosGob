import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import * as moment from 'moment';

// INTERFACES
import { searchResultInterface } from 'src/app/interfaces/searchResult.interface';
import { pieCharInterface, pieChartsActoInterface, pieBarInterface } from 'src/app/interfaces/charts.interface';
import { WorldclockapiService, ChartsService, WsAPIEstadisticosGobService } from 'src/app/services/service.index';
import { wsAPIEstadiscitosGobListaDataInterface, wsAPIEstadiscitosGobListaRowInterface, wsAPIEstadiscitosGobRowsDepKioInterface, wsAPIEstadiscitosGobStatusDataInterface } from 'src/app/interfaces/wsAPIEstadiscitosGob.interface';
import { busquedaInterface } from 'src/app/interfaces/busqueda.interface';

// MODELS
import { frmBusquedaModel } from 'src/app/models/frmBusqueda.model';

// ENUMERATORS
import { tramitesDetailRefEnum } from 'src/app/enumerators/tramitesDetailRef.enum';
import { isUndefined, isObject } from 'util';
import { isString } from '@ng-bootstrap/ng-bootstrap/util/util';
import { tramiteInterface, tramitesEncontradosInterface } from 'src/app/interfaces/tramite.interface';

declare const $: any;

declare interface pieChartsActosInterface {
  acto: string;
  cantidad?: number;
  graph: pieCharInterface;
}

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {   

  public isCollapsedSearchSeccion: boolean = true;

  public listaDependencias: wsAPIEstadiscitosGobRowsDepKioInterface[] = null;
  public listaKioscos: wsAPIEstadiscitosGobRowsDepKioInterface[] = null;

  public fechaActual: string = null; // fecha actual obtenida de la web
  public totalTramitesRealizados: number = 0; // label que muestra total de tramites realizados
  public chartsActos: pieChartsActoInterface[] = []; // objeto que contiene la información que se muestra de los tipos de tramites con sus gráficos
  public barCharOrigenSolicitudes: pieBarInterface = null; // objeto que contiene la información del gráfico de barras
  public searchResult: searchResultInterface = null; // objeto que contiene la información que se muestra como resultado de la busqueda general

  public frmBusqueda: FormGroup;
  public modelBusqueda: busquedaInterface = {
    searching: false,
    searchFailed: false,
    dateHastaValid: '',
    dateDesdeValid: '',
    inputTextTramiteServicioValid: '',
    frmError: false,
    frmErrorMsg: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private wsWorldclockapiService: WorldclockapiService,
    private chartService: ChartsService,
    private wsAPIEstadisticosGobService: WsAPIEstadisticosGobService
  ) { 

    this.activatedRoute.queryParams.subscribe( (params) => {});

    this.wsWorldclockapiService.obtenerFechaUniverzal()
      .then( (response: string) => {
        this.fechaActual = response;
      })
      .catch( (err) => {});

    // LISTA DEPENDENCIAS
    this.wsAPIEstadisticosGobService.dependencias()
    .then( (response: wsAPIEstadiscitosGobRowsDepKioInterface[]) =>{

        this.listaDependencias = response;

    })
    .catch( (err) => {
    });

    // LISTA KIOSCOS
    this.wsAPIEstadisticosGobService.kioscos()
    .then( (response: wsAPIEstadiscitosGobRowsDepKioInterface[]) =>{

        this.listaKioscos = response;

    })
    .catch( (err) => {
    });

    // LISTA DE TRAMITES EN LINEA
    this.wsAPIEstadisticosGobService.listaTramitesRegistradosLinea('01/01/2019','31/12/2019')
    .then( (response: wsAPIEstadiscitosGobListaDataInterface) =>{

        let labels = [];
        let data= [];
        response.rows.forEach( (item: wsAPIEstadiscitosGobListaRowInterface) => {
          if (item.cantidad >= 4) {
            
            labels.push( item.nombreTramite );
            data.push( item.cantidad );

          }
        });

        let pieChar = this.chartService.makePieChar(data,labels,response.total);
        this.chartsActos.push(this.chartService.makeChartActo('En línea', tramitesDetailRefEnum.linea ,pieChar, { fecha1: '01/01/2019', fecha2: '31/12/2019' }));

        this.totalTramitesRealizados += response.total;

    })
    .catch( (err) => {
    });
  
    // LISTA DE TRAMITES EN KIOSCOS
    this.wsAPIEstadisticosGobService.listaTramitesRegistradosKioscos('01/01/2019','31/12/2019')
    .then( (response: wsAPIEstadiscitosGobListaDataInterface) =>{

        let labels = [];
        let data= [];
        response.rows.forEach( (item: wsAPIEstadiscitosGobListaRowInterface) => {
          if (item.cantidad >= 4) {
            
            labels.push( item.nombreTramite );
            data.push( item.cantidad );

          }
        });

        let pieChar = this.chartService.makePieChar(data,labels,response.total);
        this.chartsActos.push(this.chartService.makeChartActo('En kioscos', tramitesDetailRefEnum.kioscos,pieChar, { fecha1: '01/01/2019', fecha2: '31/12/2019' }));

        this.totalTramitesRealizados += response.total;

    })
    .catch( (err) => {
    });

    // LISTA DE TRAMITES EN VENTANILLA
    this.wsAPIEstadisticosGobService.listaTramitesRegistradosVentanilla('01/01/2019','31/12/2019')
    .then( (response: wsAPIEstadiscitosGobListaDataInterface) =>{

        let labels = [];
        let data= [];
        response.rows.forEach( (item: wsAPIEstadiscitosGobListaRowInterface) => {
          if (item.cantidad >= 4) {
            
            labels.push( item.nombreTramite );
            data.push( item.cantidad );

          }
        });        

        let pieChar = this.chartService.makePieChar(data,labels,response.total);
        this.chartsActos.push(this.chartService.makeChartActo('En ventanilla', tramitesDetailRefEnum.ventanilla,pieChar, { fecha1: '01/01/2019', fecha2: '31/12/2019' }));

        this.totalTramitesRealizados += response.total;

    })
    .catch( (err) => {
    });

  }

  ngOnInit() {

    this.frmBusqueda = new FormGroup({
      inputTextTramiteServicio: new FormControl('',[Validators.minLength(4), Validators.maxLength(100)]),
      selectDependencia: new FormControl([]),
      selectKiosco: new FormControl([]),
      inputDateDesde: new FormControl(),
      inputDateHasta: new FormControl()
    });   

    // simulación de respuesta de grafico de barras
    const data = [{ data: [65, 59, 80, 81]}];
    const labels = ['Colima', 'Villa de Álvarez', 'Manzanillo', 'Comala'];
    this.barCharOrigenSolicitudes = this.chartService.makeBarChar(data,labels);    

  }

  // ngAfterViewInit(){}

  // events
  public maximizeCard(event, card, legendBtn, graph) {
    let target = $(card);
    let _event = $(event.currentTarget);

    if (target.data('maximize') === true) {

      target.removeClass('col-12 col-md-12 col-lg-4').addClass('col-12');
      _event.addClass('fa-window-minimize');
      target.data('maximize', false);

      $(legendBtn).removeClass('d-none');

    } else {

      target.removeClass('col-12').addClass('col-12 col-md-12 col-lg-4');
      _event.addClass('fa-window-maximize').removeClass('fa-window-minimize');
      target.data('maximize', true);

      $(legendBtn).addClass('d-none');
      graph.legend = false;

    }

  }

  public chartClicked( event, item, labelTramite): void {
    //console.log(event, item, labelTramite);
  }

  private timesOutRefs= [];
  public chartHovered( event, item, labelTramite): void {
    labelTramite.innerHTML = `<i class="fa fa-info-circle" aria-hidden="true"></i> Trámite <hr class='m-0 p-0'/><span>${item.graph.labels[event.active[0]._index]} [ <strong>${item.graph.data[event.active[0]._index]}</strong> trámites realizados.<span> ]`;
    
    $(labelTramite).removeClass('d-none');

    const ref = this.timesOutRefs[ item.detailRef ];
    if (ref) {

      clearTimeout(this.timesOutRefs[ item.detailRef ]);
      this.timesOutRefs[ item.detailRef ] = null;

    }
    
    this.timesOutRefs[ item.detailRef ] = setTimeout(() => {

      $(labelTramite).addClass('d-none');
      this.timesOutRefs[ item.detailRef ] = null;

    }, 10000);

  }

  public frmBusquedaOnSubmit(): void{
    
    console.log(this.frmBusqueda);

    debugger;
  }

  public search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.modelBusqueda.searching = true),
      switchMap( term => term.length < 4 ? of([]) : this.wsAPIEstadisticosGobService.tramitesObservable(null,term)
        .pipe(
          tap( () => {
            this.modelBusqueda.searching = false;
            this.modelBusqueda.searchFailed = false;
          }),
          catchError(() => {
            this.modelBusqueda.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => this.modelBusqueda.searching = false)
    )

  formatter = (x: {nombre: string}) => x.nombre;

  get f() { return this.frmBusqueda.controls; }
  
  get getInputTextTramiteServicioValue() {
    const obj = this.frmBusqueda.get('inputTextTramiteServicio'); 
    return typeof obj.value !== "undefined"  ? (isObject(obj.value) ? 'objeto' : obj.value) : '';
  }

  get getSelectDependenciaValue() {
    const obj = this.frmBusqueda.get('selectDependencia'); 
    return typeof obj.value !== "undefined"  ? obj.value : -1;
  }

  get getMaxDateDesde() {
    const obj = this.frmBusqueda.get('inputDateHasta'); 
    let dateVal = '';
    if (obj.value){
      dateVal = moment(obj.value).add(-1,'days').format('YYYY-MM-DD');
    } else {
      dateVal = moment(this.fechaActual).add(-1,'days').format('YYYY-MM-DD');      
    }
    return dateVal;
  }

  get getMinDateHasta() {
    const obj = this.frmBusqueda.get('inputDateDesde'); 
    let dateVal = '';
    if (obj.value){
      dateVal = moment(obj.value).add(1,'days').format('YYYY-MM-DD');
    }
    return dateVal;
  }  

  get getMaxDateHasta() {
    const obj = this.frmBusqueda.get('inputDateDesde'); 
    let dateVal = '';
    if (obj.value){
      dateVal = moment(obj.value).add(1,'days').format('YYYY-MM-DD');
    }
    return dateVal;
  }  

  validaDesdeDate(event): void {
    this.modelBusqueda.dateDesdeValid = event.currentTarget.validationMessage;
  }

  validaHastaDate(event) : void{
    this.modelBusqueda.dateHastaValid = event.currentTarget.validationMessage;
  }

  validaData(event): void {
    this.modelBusqueda.inputTextTramiteServicioValid = event.currentTarget.validationMessage;
  }

  formBusquedaOnSubmit(): void{
    this.modelBusqueda.searching = false;
    this.modelBusqueda.frmError = false;
    this.modelBusqueda.frmErrorMsg = '';
    
    const data = this.frmBusqueda.value;

    debugger;

    if (!this.frmBusqueda.valid){
      this.modelBusqueda.frmError = true;
      this.modelBusqueda.frmErrorMsg = "Favor de completar la información";
      return null;
    }

    if ( data.inputTextTramiteServicio.length == 0 && data.selectDependencia.length == 0 && data.selectKiosco.length == 0 ){
      this.modelBusqueda.frmError = true;
      this.modelBusqueda.frmErrorMsg = "Falta información";
      return null;
    }    

    const fDesde = data.inputDateDesde ? moment(data.inputDateDesde).format('DD/MM/YYYY').toString() : null;
    const fHasta = data.inputDateHasta ? moment(data.inputDateHasta).format('DD/MM/YYYY').toString() : null;

    // BUSQUEDA POR TRAMITE O SERVICIO
    if ( isObject(data.inputTextTramiteServicio)){
      // BUSQUEDA POR ID DE TRAMITE
      Promise.all([
        this.wsAPIEstadisticosGobService.listaTramitesRegistradosLineaPorIdTramite(data.inputTextTramiteServicio.id, fDesde, fHasta),
        this.wsAPIEstadisticosGobService.listaTramitesRegistradosKioscosPorIdTramite(data.inputTextTramiteServicio.id, fDesde, fHasta),
        this.wsAPIEstadisticosGobService.listaTramitesRegistradosVentanillaPorIdTramite(data.inputTextTramiteServicio.id, fDesde, fHasta)
      ])
      .then( (values) =>{

        let listaTramites: tramiteInterface[] = [];


        for (let key in values) {          

          if (values[key].total > 0) {

            values[key].rows.forEach(row => {

              let tramiteItem = listaTramites.find( qry => qry.id == Number(row.idTramite));
              if (!tramiteItem){
                
                tramiteItem = {
                  id: Number(row.idTramite),
                  nombre: row.nombreTramite,
                  realizados: { linea: 0, kiosco: 0, ventanilla: 0, total: 0 }
                };

                listaTramites.push(tramiteItem);

              }
              
              switch (key) {
                case '0':
                  tramiteItem.realizados.linea += Number(row.cantidad);
                break;
                case '1':
                  tramiteItem.realizados.kiosco += Number(row.cantidad);
                break;
                case '2':
                  tramiteItem.realizados.ventanilla += Number(row.cantidad);
                break;
              }

              tramiteItem.realizados.total += Number(row.cantidad);

            });

          }

        };

        let total = 0;
        listaTramites.forEach(item => {
          item.graph = this.chartService.makePieChar([ item.realizados.linea, item.realizados.kiosco, item.realizados.ventanilla],['Línea','Kiosco','Ventanilla'],item.realizados.total, { tooltips:{enabled: true} });
          total += Number(item.realizados.total);
        });
        
        this.searchResult = {
          general: {
            palabra: data.inputTextTramiteServicio.nombre
          },
          registrosEncontrados: total,
          listaTramites: listaTramites
        };

      })
      .catch ( err => {});
      
    } else if (data.inputTextTramiteServicio.length > 0){
      // BUSQUEDA POR DESCRIPCION DE TRAMTE
      Promise.all([
        this.wsAPIEstadisticosGobService.listaTramitesRegistradosLineaPorDescripcion(data.inputTextTramiteServicio, fDesde , fHasta),
        this.wsAPIEstadisticosGobService.listaTramitesRegistradosKioscosPorDescripcion(data.inputTextTramiteServicio, fDesde , fHasta),
        this.wsAPIEstadisticosGobService.listaTramitesRegistradosVentanillaPorDescripcion(data.inputTextTramiteServicio, fDesde , fHasta)
      ])
      .then( (values) =>{

        let listaTramites: tramiteInterface[] = [];


        for (let key in values) {          

          if (values[key].total > 0) {

            values[key].rows.forEach(row => {

              let tramiteItem = listaTramites.find( qry => qry.id == Number(row.idTramite));
              if (!tramiteItem){
                
                tramiteItem = {
                  id: Number(row.idTramite),
                  nombre: row.nombreTramite,
                  realizados: { linea: 0, kiosco: 0, ventanilla: 0, total: 0 }
                };

                listaTramites.push(tramiteItem);

              }
              
              switch (key) {
                case '0':
                  tramiteItem.realizados.linea += Number(row.cantidad);
                break;
                case '1':
                  tramiteItem.realizados.kiosco += Number(row.cantidad);
                break;
                case '2':
                  tramiteItem.realizados.ventanilla += Number(row.cantidad);
                break;
              }

              tramiteItem.realizados.total += Number(row.cantidad);

            });

          }

        };

        let total = 0;
        listaTramites.forEach(item => {
          item.graph = this.chartService.makePieChar([ item.realizados.linea, item.realizados.kiosco, item.realizados.ventanilla],['Línea','Kiosco','Ventanilla'],item.realizados.total, { tooltips:{enabled: true} });
          total += Number(item.realizados.total);
        });
        
        this.searchResult = {
          general: {
            palabra: data.inputTextTramiteServicio
          },
          registrosEncontrados: total,
          listaTramites: listaTramites
        };

      })
      .catch ( err => {});

    } else {
      if (data.selectDependencia !== -1) {

        

        let listaTramites: tramiteInterface[] = [];

        data.selectDependencia.forEach(id => {
          
          Promise.all([
            this.wsAPIEstadisticosGobService.listaTramitesRegistradosLineaPorDependencia(id, fDesde , fHasta),
            this.wsAPIEstadisticosGobService.listaTramitesRegistradosVentanillaPorDependencia(id, fDesde , fHasta)
          ])
          .then( (values) =>{

            for (let key in values) {          

              if (values[key].total > 0) {

                values[key].rows.forEach(row => {

                  let tramiteItem = listaTramites.find( qry => qry.id == Number(row.idTramite));
                  if (!tramiteItem){
                    
                    tramiteItem = {
                      id: Number(row.idTramite),
                      nombre: row.nombreTramite,
                      realizados: { linea: 0, kiosco: 0, ventanilla: 0, total: 0 }
                    };

                    listaTramites.push(tramiteItem);

                  }
                  
                  switch (key) {
                    case '0':
                      tramiteItem.realizados.linea += Number(row.cantidad);
                    break;
                    case '2':
                      tramiteItem.realizados.ventanilla += Number(row.cantidad);
                    break;
                  }

                  tramiteItem.realizados.total += Number(row.cantidad);

                });

              }

            };

            let total = 0;
            listaTramites.forEach(item => {
              item.graph = this.chartService.makePieChar([ item.realizados.linea, item.realizados.ventanilla],['Línea','Ventanilla'],item.realizados.total, { tooltips:{enabled: true} });
              total += Number(item.realizados.total);
            });
            
            this.searchResult = {
              general: {
                palabra: data.inputTextTramiteServicio
              },
              registrosEncontrados: total,
              listaTramites: listaTramites
            };

            listaTramites = listaTramites.sort( ( a, b) => a.realizados > b.realizados ? -1 : a.realizados < b.realizados ? 1 :0);

          })
          .catch ( err => {});

        });

      }

      if (data.selectKiosco !== -1) {
        data.selectKiosco.forEach(id => {
          // TODO: Consultar trámites realizados por id kiosco [ data.selectKiosco ]
          //       verificar si se envían rangos de rechas
        });
      }

    }
    
  };


}
