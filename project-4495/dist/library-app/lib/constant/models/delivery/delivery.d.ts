import { DefaultModel } from "../default-model";
import { Point } from "../point/point";
import { DeliveryStatusHistory } from "./delivery-status-history";
import { Order } from "../order/order";
import { Courier } from "../courier/courier";
import { Restaurant } from "../restaurant/restaurant";
import { Customer } from "../customer/customer";
export declare class Delivery extends DefaultModel {
    id: string;
    points: Point[];
    courier_id: string;
    order_id: string;
    status_history: DeliveryStatusHistory[];
    currentStatus: DeliveryStatusHistory;
    timeToNextStatus: number;
    order: Order;
    courier: Courier;
    restaurant: Restaurant;
    customer: Customer;
    path_to_restaurant: any[];
    path_to_customer: any[];
    subscription: any;
    constructor(data: any);
    getData(): object;
    setStatusHistory(histories: DeliveryStatusHistory[]): void;
}
