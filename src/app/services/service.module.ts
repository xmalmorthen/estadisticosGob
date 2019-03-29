import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { WorldclockapiService, ChartsService } from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ], providers :[
    WorldclockapiService,
    ChartsService
  ]
})
export class ServiceModule { }
