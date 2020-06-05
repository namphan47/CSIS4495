import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RestaurantsComponent} from './mainroute/restaurants/restaurants.component';

const routes: Routes = [
  {path: 'rest', component: RestaurantsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
