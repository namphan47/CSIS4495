import { DefaultModel } from "../default-model";
import { Restaurant } from "../restaurant/restaurant";
import { Customer } from "../customer/customer";
import { OrderItem } from "../order_item/order-item";
export declare class Order extends DefaultModel {
    id: string;
    date_time: number;
    restaurant_id: string;
    customer_id: string;
    total: number;
    restaurant: Restaurant;
    customer: Customer;
    items: OrderItem[];
    constructor(data: any);
}
