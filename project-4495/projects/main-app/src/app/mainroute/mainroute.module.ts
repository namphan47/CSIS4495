import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {NguiMapModule} from "@ngui/map";
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [RestaurantsComponent, LoginComponent, SignupComponent, RestaurantDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot([]),
    NguiMapModule
  ]
})
export class MainrouteModule { }
