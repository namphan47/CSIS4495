import { DefaultModel } from "../default-model";
export declare enum Delivery_Status {
    ORDERED = 0,
    PREPARING = 1,
    WAIT_FOR_PICK_UP = 2,
    DELIVERING = 3,
    DELIVERED = 4
}
export declare class DeliveryStatusHistory extends DefaultModel {
    id: string;
    status: Delivery_Status;
    delivery_id: string;
    date_time: number;
    constructor(data: any);
}
