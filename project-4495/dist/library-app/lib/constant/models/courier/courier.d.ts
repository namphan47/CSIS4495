import { DefaultModel } from "../default-model";
export declare class Courier extends DefaultModel {
    id: string;
    name: string;
    vin: string;
    driver_license: string;
    email: string;
    phone_no: string;
    lat: number;
    long: number;
    constructor(data: any);
}
