import { DefaultModel } from '../default-model';
export declare enum Delivery_Status {
    ORDERED = "ORDERED",
    PREPARING = "PREPARING",
    WAIT_FOR_PICK_UP = "WAIT_FOR_PICK_UP",
    DELIVERING = "DELIVERING",
    DELIVERED = "DELIVERED"
}
export declare class DeliveryStatusHistory extends DefaultModel {
    id: string;
    status: Delivery_Status;
    delivery_id: string;
    date_time: number;
    constructor(data: any);
}
