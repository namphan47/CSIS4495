import { ENUM_TABLES } from "../../constant/const-value";
import { IDefaultModelConstructor } from "../../constant/models/i-default-model";
import { UtilsService } from "../mics/utils.service";
import * as ɵngcc0 from '@angular/core';
export declare class DummyDataService {
    private _UtilsService;
    readonly JSONS: {
        restaurant: {
            name: string;
            address: string;
            img1: string;
            img2: string;
            lat: number;
            lng: number;
            phone_no: string;
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
    constructor(_UtilsService: UtilsService);
    convertDummyDataToModel(table: ENUM_TABLES, modelClass: IDefaultModelConstructor): Promise<any[]>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DummyDataService, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZGF0YS5zZXJ2aWNlLmQudHMiLCJzb3VyY2VzIjpbImR1bW15LWRhdGEuc2VydmljZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFTlVNX1RBQkxFUyB9IGZyb20gXCIuLi8uLi9jb25zdGFudC9jb25zdC12YWx1ZVwiO1xyXG5pbXBvcnQgeyBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3IgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL2ktZGVmYXVsdC1tb2RlbFwiO1xyXG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tIFwiLi4vbWljcy91dGlscy5zZXJ2aWNlXCI7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIER1bW15RGF0YVNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfVXRpbHNTZXJ2aWNlO1xyXG4gICAgcmVhZG9ubHkgSlNPTlM6IHtcclxuICAgICAgICByZXN0YXVyYW50OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICAgICAgYWRkcmVzczogc3RyaW5nO1xyXG4gICAgICAgICAgICBpbWcxOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGltZzI6IHN0cmluZztcclxuICAgICAgICAgICAgbGF0OiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxuZzogbnVtYmVyO1xyXG4gICAgICAgICAgICBwaG9uZV9ubzogc3RyaW5nO1xyXG4gICAgICAgIH1bXTtcclxuICAgICAgICBjdXN0b21lcjoge1xyXG4gICAgICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgICAgICAgICAgbGF0OiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxuZzogbnVtYmVyO1xyXG4gICAgICAgICAgICBwaG9uZV9ubzogc3RyaW5nO1xyXG4gICAgICAgICAgICBlbWFpbDogc3RyaW5nO1xyXG4gICAgICAgIH1bXTtcclxuICAgICAgICBtZWFsOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgICAgICAgICAgcHJpY2U6IG51bWJlcjtcclxuICAgICAgICAgICAgaW1hZ2U6IHN0cmluZztcclxuICAgICAgICAgICAgcmVzdGF1cmFudF9uYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgfVtdO1xyXG4gICAgICAgIGNvdXJpZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgICAgICB2aW46IHN0cmluZztcclxuICAgICAgICAgICAgZHJpdmVyX2xpY2Vuc2U6IG51bWJlcjtcclxuICAgICAgICAgICAgZW1haWw6IHN0cmluZztcclxuICAgICAgICAgICAgcGhvbmVfbm86IHN0cmluZztcclxuICAgICAgICAgICAgbGF0OiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxuZzogbnVtYmVyO1xyXG4gICAgICAgIH1bXTtcclxuICAgIH07XHJcbiAgICBjb25zdHJ1Y3RvcihfVXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UpO1xyXG4gICAgY29udmVydER1bW15RGF0YVRvTW9kZWwodGFibGU6IEVOVU1fVEFCTEVTLCBtb2RlbENsYXNzOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3IpOiBQcm9taXNlPGFueVtdPjtcclxufVxyXG4iXX0=