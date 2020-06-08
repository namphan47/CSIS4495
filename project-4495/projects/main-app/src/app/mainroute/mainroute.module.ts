import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {NguiMapModule} from "@ngui/map";



@NgModule({
  declarations: [RestaurantsComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    NguiMapModule
  ]
})
export class MainrouteModule { }
