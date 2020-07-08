import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RestaurantsComponent} from './mainroute/restaurants/restaurants.component';
import {LoginComponent} from './mainroute/login/login.component';
import {SignupComponent} from './mainroute/signup/signup.component';
import {RestaurantDetailsComponent} from './mainroute/restaurant-details/restaurant-details.component';
import {CheckoutComponent} from './mainroute/checkout/checkout.component';
import {DeliveryComponent} from "./mainroute/delivery/delivery.component";

const routes: Routes = [
  {
    path: 'main',
    children: [
      {path: '', redirectTo: 'signup', pathMatch: 'full'},
      {path: 'rest', component: RestaurantsComponent},
      {path: 'rest-details/:id', component: RestaurantDetailsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'checkout', component: CheckoutComponent},
      {path: 'delivery', component: DeliveryComponent}
    ]
  },
  {path: '', redirectTo: 'main', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
