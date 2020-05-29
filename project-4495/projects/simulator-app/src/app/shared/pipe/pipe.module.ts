import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KeyValueOrderPipe} from './key-value-order.pipe';


@NgModule({
  declarations: [KeyValueOrderPipe],
  exports: [
    KeyValueOrderPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule {
}
