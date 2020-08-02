import { ENUM_TABLES } from "../../constant/const-value";
import { IDefaultModelConstructor } from "../../constant/models/i-default-model";
export declare class DummyDataService {
    readonly JSONS: {
        restaurant: {
            name: string;
            address: string;
            img1: string;
            img2: string;
            lat: number;
            lng: number;
            phone_no: string;
            del_time: string;
            del_fee: string;
            rating: number;
        }[];
        customer: {
            name: string;
            address: string;
            lat: number;
            lng: number;
            phone_no: string;
            email: string;
        }[];
        meal: {
            name: string;
            description: string;
            price: number;
            image: string;
            restaurant_name: string;
        }[];
        courier: {
            name: string;
            vin: string;
            driver_license: number;
            email: string;
            phone_no: string;
            lat: number;
            lng: number;
        }[];
    };
    constructor();
    convertDummyDataToModel(table: ENUM_TABLES, modelClass: IDefaultModelConstructor): Promise<any[]>;
}
