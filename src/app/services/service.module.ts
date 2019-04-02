import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { WorldclockapiService, ChartsService, WsAPIEstadisticosGobService } from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ], providers :[
    WorldclockapiService,
    ChartsService,
    WsAPIEstadisticosGobService
  ]
})
export class ServiceModule { }
