import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {RoutesModule} from "./routes/routes.module";
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "@app/core/core.module";
import {SharedModule} from "@app/shared/shared.module";

// use to debug
// import * as firebase from 'firebase/app';
// import 'firebase/firestore';
// firebase.firestore.setLogLevel('debug');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    AppRoutingModule,
    RoutesModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
