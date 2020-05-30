import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterNotificationComponent} from './footer-notification/footer-notification.component';
import {PipeModule} from "@app/shared/pipe/pipe.module";


@NgModule({
  declarations: [FooterNotificationComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FooterNotificationComponent,
    PipeModule
  ]
})
export class SharedModule {
}
