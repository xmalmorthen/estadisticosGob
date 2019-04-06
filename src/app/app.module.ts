import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// MODULES
import { SharedModule } from './shared/shared.module';

// COMPONENTS
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';


@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ServiceModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
