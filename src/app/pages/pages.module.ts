import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// LOCALES
import localeEsMX from '@angular/common/locales/es-MX';

// COMPONENTS
import { PrincipalComponent } from './principal/principal.component';

registerLocaleData(localeEsMX, 'es-MX');

@NgModule({
  declarations: [
    PrincipalComponent
  ],
  exports: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    ChartsModule,
  ], 
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' }
  ]
})
export class PagesModule { }
