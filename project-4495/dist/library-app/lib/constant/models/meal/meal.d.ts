import { DefaultModel } from "../default-model";
export declare class Meal extends DefaultModel {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    restaurant_name: string;
    constructor(data: any);
}
