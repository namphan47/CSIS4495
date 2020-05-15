import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RestaurantComponent} from './routes/restaurant/restaurant.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {path: '', redirectTo: 'restaurant', pathMatch: 'full'},
      {path: 'restaurant', component: RestaurantComponent},
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
