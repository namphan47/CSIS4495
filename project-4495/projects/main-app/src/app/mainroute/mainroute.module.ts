import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [RestaurantsComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule
  ]
})
export class MainrouteModule { }
