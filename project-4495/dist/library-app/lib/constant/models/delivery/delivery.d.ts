import { DefaultModel } from "../default-model";
import { Point } from "../point/point";
import { DeliveryStatusHistory } from "./delivery-status-history";
export declare class Delivery extends DefaultModel {
    id: string;
    points: Point[];
    courier_id: string;
    order_id: string;
    status_history: DeliveryStatusHistory[];
    currentStatus: DeliveryStatusHistory;
    constructor(data: any);
    setStatusHistory(histories: DeliveryStatusHistory[]): void;
}
