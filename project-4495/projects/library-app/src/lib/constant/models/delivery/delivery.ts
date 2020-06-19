import {DefaultModel} from "../default-model";
import {Point} from "../point/point";
import {DeliveryStatusHistory} from "./delivery-status-history";
import * as _ from 'lodash';
import {Order} from "../order/order";
import {Courier} from "../courier/courier";
import {Restaurant} from "../restaurant/restaurant";
import {Customer} from "../customer/customer";

export class Delivery extends DefaultModel {
  id: string = '';
  points: Point[] = [];
  courier_id: string = '';
  order_id: string = '';
  status_history: DeliveryStatusHistory[] = [];
  currentStatus: DeliveryStatusHistory = null;
  timeToNextStatus: number = 0;

  order: Order;
  courier: Courier;
  restaurant: Restaurant;
  customer: Customer;
  path_to_restaurant: any[] = [];
  path_to_customer: any[] = [];

  constructor(data: any) {
    super(data);
    super.copyInto(data);
    if (this.path_to_customer.length) {
      this.path_to_customer = _.map(this.path_to_customer, x => JSON.parse(x));
    }
    if (this.path_to_restaurant.length) {
      this.path_to_restaurant = _.map(this.path_to_restaurant, x => JSON.parse(x));
    }
  }

  getData(): object {
    const self = this;
    const result = {};
    Object.keys(this).map(key => {
      if (this[key] instanceof DefaultModel) {
        return;
      }

      switch (key) {
        case '_raw':
        case 'order':
        case 'restaurant':
        case 'customer':
        case 'courier':
        case 'points':
          return;
        case 'path_to_restaurant':
        case 'path_to_customer': {
          result[key] = _.map(self[key], (x) => {
            return JSON.stringify(x);
          });
          // console.log(result[key]);
          return;
        }
      }
      result[key] = self[key];
    });
    return result;
  }

  setStatusHistory(histories: DeliveryStatusHistory[]) {
    this.status_history = histories;
    this.currentStatus = _.maxBy(histories, (x: DeliveryStatusHistory) => x.date_time);
  }

}

