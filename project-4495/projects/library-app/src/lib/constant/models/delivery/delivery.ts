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
  }

  setStatusHistory(histories: DeliveryStatusHistory[]) {
    this.status_history = histories;
    this.currentStatus = _.maxBy(histories, (x: DeliveryStatusHistory) => x.date_time);
  }

}

