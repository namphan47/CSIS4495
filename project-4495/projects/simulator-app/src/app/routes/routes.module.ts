import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestaurantComponent} from './restaurant/restaurant.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import { MapComponent } from './map/map.component';
import { CustomerComponent } from './customer/customer.component';
import { CourierComponent } from './courier/courier.component';
import { OrderComponent } from './order/order.component';
import {PipeModule} from "@app/shared/pipe/pipe.module";

@NgModule({
  declarations: [RestaurantComponent, MapComponent, CustomerComponent, CourierComponent, OrderComponent],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    PipeModule,
  ]
})
export class RoutesModule {
}
