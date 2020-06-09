import { DefaultModel } from "../default-model";
import { Point } from "../point/point";
export declare class Delivery extends DefaultModel {
    id: string;
    points: Point[];
    courier_id: string;
    order_id: string;
    constructor(data: any);
}
