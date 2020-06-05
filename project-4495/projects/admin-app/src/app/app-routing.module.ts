import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RestaurantComponent} from './routes/restaurant/restaurant.component';
import {MapComponent} from '@app/routes/map/map.component';
import {CustomerComponent} from '@app/routes/customer/customer.component';
import {OrderComponent} from '@app/routes/order/order.component';
import {CourierComponent} from '@app/routes/courier/courier.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {path: '', redirectTo: 'map', pathMatch: 'full'},
      {path: 'restaurant', component: RestaurantComponent},
      {path: 'map', component: MapComponent},
      {path: 'customer', component: CustomerComponent},
      {path: 'order', component: OrderComponent},
      {path: 'courier', component: CourierComponent},
    ]
  },
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
