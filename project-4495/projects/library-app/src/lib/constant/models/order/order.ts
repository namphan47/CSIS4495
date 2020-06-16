import {DefaultModel} from "../default-model";
import {Restaurant} from "../restaurant/restaurant";
import {Customer} from "../customer/customer";
import {OrderItem} from "../order_item/order-item";
import {Delivery} from "../delivery/delivery";

export class Order extends DefaultModel {
  id: string = '';
  date_time: number = 0;
  restaurant_id: string = '';
  customer_id: string = '';
  total: number = 0;

  restaurant: Restaurant;
  customer: Customer;
  items: OrderItem[];

  constructor(data: any) {
    super(data);
    super.copyInto(data);
  }

}
