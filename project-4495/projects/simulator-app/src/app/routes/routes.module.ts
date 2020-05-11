import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestaurantComponent} from './restaurant/restaurant.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';

@NgModule({
  declarations: [RestaurantComponent],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
  ]
})
export class RoutesModule {
}
