import { DefaultModel } from "../default-model";
import { Order } from "../order/order";
import { Meal } from "../meal/meal";
export declare class OrderItem extends DefaultModel {
    id: string;
    order_id: string;
    meal_id: string;
    quantity: number;
    order: Order;
    meal: Meal;
    constructor(data: any);
}
