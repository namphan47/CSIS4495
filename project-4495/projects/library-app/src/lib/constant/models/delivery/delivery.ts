import {DefaultModel} from "../default-model";
import {Point} from "../point/point";
import {DeliveryStatusHistory} from "./delivery-status-history";
import * as _ from 'lodash';

export class Delivery extends DefaultModel {
  id: string = '';
  points: Point[] = [];
  courier_id: string = '';
  order_id: string = '';
  status_history: DeliveryStatusHistory[] = [];
  currentStatus: DeliveryStatusHistory = null;

  constructor(data: any) {
    super(data);
    super.copyInto(data);
  }

  setStatusHistory(histories: DeliveryStatusHistory[]) {
    this.status_history = histories;
    this.currentStatus = _.maxBy(histories, (x: DeliveryStatusHistory) => x.date_time);
  }
}

