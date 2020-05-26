import {OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

export class DefaultComponent implements OnDestroy {
  _subscriptionList: Subscription;

  constructor() {
    this.unsubscribeAll();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  /**
   * unsubscribe all subscription which add into the component
   * it is important to prevent subscription still exist when component is destroyed
   */
  unsubscribeAll() {
    if (this._subscriptionList) {
      this._subscriptionList.unsubscribe();
    }
    this._subscriptionList = new Subscription();

  }

  /**
   * add subscriptions to component storage
   * @param subscriptions
   */
  addSubscribes(...subscriptions) {
    subscriptions.forEach((el) => {
      this._subscriptionList.add(el);
    });
  }
}
