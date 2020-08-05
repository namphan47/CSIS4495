import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {MainrouteModule} from './mainroute/mainroute.module';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {NguiMapModule} from '@ngui/map';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../admin-app/src/environments/environment';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';


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
    AngularFireModule.initializeApp(environment.firebase),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDrnDCTwDNyiqxi-qkY1wMRCpbBMA8LFYc'}),
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
