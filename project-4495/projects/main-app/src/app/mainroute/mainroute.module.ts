import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestaurantsComponent} from './restaurants/restaurants.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {NguiMapModule} from '@ngui/map';
import {RestaurantDetailsComponent} from './restaurant-details/restaurant-details.component';
import {RouterModule} from '@angular/router';
import {CheckoutComponent} from './checkout/checkout.component';
import {DeliveryComponent} from './delivery/delivery.component';
import {FormsModule} from "@angular/forms";
import {KeyValueOrderPipe} from "../pipes/key-value-order.pipe";


@NgModule({
  declarations: [RestaurantsComponent, LoginComponent, SignupComponent, RestaurantDetailsComponent, CheckoutComponent, DeliveryComponent,
    KeyValueOrderPipe],
  imports: [
    CommonModule,
    RouterModule.forRoot([]),
    NguiMapModule,
    FormsModule,
  ],
  exports: [
    KeyValueOrderPipe
  ]
})
export class MainrouteModule {
}
