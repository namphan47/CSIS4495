import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "@app/app-routing.module";
import {RoutesModule} from "@app/routes/routes.module";
import {CoreModule} from "@app/core/core.module";
import {SharedModule} from "@app/shared/shared.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    AppRoutingModule,
    RoutesModule,
    CoreModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
