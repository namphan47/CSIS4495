import {DefaultModel} from "../default-model";
import {Point} from "../point/point";

export class Delivery extends DefaultModel {
  id: string = '';
  points: Point[] = [];
  courier_id: string = '';
  order_id: string = '';

  constructor(data: any) {
    super(data);
    super.copyInto(data);
  }
}

