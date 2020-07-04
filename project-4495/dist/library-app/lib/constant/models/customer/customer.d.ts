import { DefaultModel } from "../default-model";
export declare class Customer extends DefaultModel {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    phone_no: string;
    email: string;
    password: string;
    constructor(data: any);
}
