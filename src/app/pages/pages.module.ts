import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// BOOTSTRAP


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
    RouterModule,
    FormsModule,
    NgbModule,
    ChartsModule,
  ]
})
export class PagesModule { }
