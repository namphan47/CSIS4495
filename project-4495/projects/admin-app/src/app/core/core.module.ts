import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {NavComponent} from "@app/core/nav/nav.component";


@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavComponent
  ]
})
export class CoreModule {
}
