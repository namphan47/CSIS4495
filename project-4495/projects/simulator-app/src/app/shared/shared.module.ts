import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterNotificationComponent} from './footer-notification/footer-notification.component';


@NgModule({
  declarations: [FooterNotificationComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FooterNotificationComponent
  ]
})
export class SharedModule {
}
