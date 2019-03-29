import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './pages/pages.index';

const routes: Routes = [

  { path: 'principal', component: PrincipalComponent, data: { title: 'Página principal'} },
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: '**', redirectTo: '/principal' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
