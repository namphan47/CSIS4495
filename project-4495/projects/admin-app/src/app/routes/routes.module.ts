import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFireModule} from '@angular/fire';
import {RestaurantComponent} from "@app/routes/restaurant/restaurant.component";
import {MapComponent} from "@app/routes/map/map.component";
import {CustomerComponent} from "@app/routes/customer/customer.component";
import {OrderComponent} from "@app/routes/order/order.component";
import {CourierComponent} from "@app/routes/courier/courier.component";
import {environment} from "@environment/environment";
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
