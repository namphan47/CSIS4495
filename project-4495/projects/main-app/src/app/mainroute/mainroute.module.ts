import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [RestaurantsComponent, LoginComponent],
  imports: [
    CommonModule
  ]
})
export class MainrouteModule { }
