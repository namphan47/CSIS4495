import {DefaultModel} from "../default-model";
import {Order} from "../order/order";
import {Meal} from "../meal/meal";

export class OrderItem extends DefaultModel {
  id: string = '';
  order_id: string = '';
  meal_id: string = '';
  quantity: number = 0;

  order: Order;
  meal: Meal;


  constructor(data: any) {
    super(data);
    super.copyInto(data);
  }
}
