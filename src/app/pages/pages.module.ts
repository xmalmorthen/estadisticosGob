import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// LOCALES
import localeEsMX from '@angular/common/locales/es-MX';

// COMPONENTS
import { PrincipalComponent } from './principal/principal.component';
import { TramitesComponent } from './detalle/tramites/tramites.component';

registerLocaleData(localeEsMX, 'es-MX');

@NgModule({
  declarations: [
    PrincipalComponent,
    TramitesComponent
  ],
  exports: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ChartsModule,
  ], 
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' }
  ]
})
export class PagesModule { }
