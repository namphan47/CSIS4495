import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RestaurantsComponent} from './mainroute/restaurants/restaurants.component';
import {LoginComponent} from './mainroute/login/login.component';

const routes: Routes = [
  {path: 'rest', component: RestaurantsComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
