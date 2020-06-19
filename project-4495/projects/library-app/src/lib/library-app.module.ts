import {NgModule} from '@angular/core';
import {LibraryAppComponent} from './library-app.component';
import {NguiMapModule} from "@ngui/map";

@NgModule({
  declarations: [LibraryAppComponent],
  imports: [
    NguiMapModule.forRoot({
      apiUrl: `https://maps.google.com/maps/api/js?libraries=drawing&key=AIzaSyDrnDCTwDNyiqxi-qkY1wMRCpbBMA8LFYc`
    })
  ],
  exports: [LibraryAppComponent]
})
export class LibraryAppModule {
}
