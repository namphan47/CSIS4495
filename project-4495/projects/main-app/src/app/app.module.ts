import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {MainrouteModule} from './mainroute/mainroute.module';
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {NguiMapModule} from "@ngui/map";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    FontAwesomeModule,
    HttpClientModule,
    MainrouteModule,
    AppRoutingModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDrnDCTwDNyiqxi-qkY1wMRCpbBMA8LFYc'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
