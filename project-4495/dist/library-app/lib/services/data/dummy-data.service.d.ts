import { ENUM_TABLES } from "../../constant/const-value";
import { IDefaultModelConstructor } from "../../constant/models/i-default-model";
import { UtilsService } from "../mics/utils.service";
import * as ɵngcc0 from '@angular/core';
export declare class DummyDataService {
    private _UtilsService;
    readonly CONSTANT_PATH = "assets/dummy/";
    readonly JSONS: {
        restaurant: {
            name: string;
            address: string;
            lat: string;
            long: string;
            phone_no: string;
        }[];
        customer: ({
            name: string;
            address: string;
            lat: string;
            long: string;
            phone_no: string;
            email: string;
        } | {
            name: string;
            address: string;
            phone_no: string;
            email: string;
            lat?: undefined;
            long?: undefined;
        })[];
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
        }[];
    };
    constructor(_UtilsService: UtilsService);
    convertDummyDataToModel(table: ENUM_TABLES, modelClass: IDefaultModelConstructor): Promise<any[]>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DummyDataService, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZGF0YS5zZXJ2aWNlLmQudHMiLCJzb3VyY2VzIjpbImR1bW15LWRhdGEuc2VydmljZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVOVU1fVEFCTEVTIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L2NvbnN0LXZhbHVlXCI7XHJcbmltcG9ydCB7IElEZWZhdWx0TW9kZWxDb25zdHJ1Y3RvciB9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvaS1kZWZhdWx0LW1vZGVsXCI7XHJcbmltcG9ydCB7IFV0aWxzU2VydmljZSB9IGZyb20gXCIuLi9taWNzL3V0aWxzLnNlcnZpY2VcIjtcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgRHVtbXlEYXRhU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9VdGlsc1NlcnZpY2U7XHJcbiAgICByZWFkb25seSBDT05TVEFOVF9QQVRIID0gXCJhc3NldHMvZHVtbXkvXCI7XHJcbiAgICByZWFkb25seSBKU09OUzoge1xyXG4gICAgICAgIHJlc3RhdXJhbnQ6IHtcclxuICAgICAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgICAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGxhdDogc3RyaW5nO1xyXG4gICAgICAgICAgICBsb25nOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIHBob25lX25vOiBzdHJpbmc7XHJcbiAgICAgICAgfVtdO1xyXG4gICAgICAgIGN1c3RvbWVyOiAoe1xyXG4gICAgICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgICAgICAgICAgbGF0OiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGxvbmc6IHN0cmluZztcclxuICAgICAgICAgICAgcGhvbmVfbm86IHN0cmluZztcclxuICAgICAgICAgICAgZW1haWw6IHN0cmluZztcclxuICAgICAgICB9IHwge1xyXG4gICAgICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgICAgICAgICAgcGhvbmVfbm86IHN0cmluZztcclxuICAgICAgICAgICAgZW1haWw6IHN0cmluZztcclxuICAgICAgICAgICAgbGF0PzogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsb25nPzogdW5kZWZpbmVkO1xyXG4gICAgICAgIH0pW107XHJcbiAgICAgICAgbWVhbDoge1xyXG4gICAgICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIHByaWNlOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGltYWdlOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIHJlc3RhdXJhbnRfbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIH1bXTtcclxuICAgICAgICBjb3VyaWVyOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICAgICAgdmluOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGRyaXZlcl9saWNlbnNlOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGVtYWlsOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIHBob25lX25vOiBzdHJpbmc7XHJcbiAgICAgICAgfVtdO1xyXG4gICAgfTtcclxuICAgIGNvbnN0cnVjdG9yKF9VdGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSk7XHJcbiAgICBjb252ZXJ0RHVtbXlEYXRhVG9Nb2RlbCh0YWJsZTogRU5VTV9UQUJMRVMsIG1vZGVsQ2xhc3M6IElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcik6IFByb21pc2U8YW55W10+O1xyXG59XHJcbiJdfQ==