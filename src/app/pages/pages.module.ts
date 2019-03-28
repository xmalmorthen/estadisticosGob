import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

// COMPONENTS
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  declarations: [
    PrincipalComponent
  ],
  exports: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ]
})
export class PagesModule { }
