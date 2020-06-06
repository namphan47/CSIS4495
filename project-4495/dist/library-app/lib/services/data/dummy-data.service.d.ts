import { ENUM_TABLES } from "../../constant/const-value";
import { IDefaultModelConstructor } from "../../constant/models/i-default-model";
import { UtilsService } from "../mics/utils.service";
import * as ɵngcc0 from '@angular/core';
export declare class DummyDataService {
    private _UtilsService;
    static TABLES: typeof ENUM_TABLES;
    readonly CONSTANT_PATH = "assets/dummy/";
    readonly JSONS: {
        restaurant: string;
        customer: string;
        meal: string;
        courier: string;
    };
    constructor(_UtilsService: UtilsService);
    convertDummyDataToModel(table: ENUM_TABLES, modelClass: IDefaultModelConstructor): Promise<any[]>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DummyDataService, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZGF0YS5zZXJ2aWNlLmQudHMiLCJzb3VyY2VzIjpbImR1bW15LWRhdGEuc2VydmljZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFTlVNX1RBQkxFUyB9IGZyb20gXCIuLi8uLi9jb25zdGFudC9jb25zdC12YWx1ZVwiO1xyXG5pbXBvcnQgeyBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3IgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL2ktZGVmYXVsdC1tb2RlbFwiO1xyXG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tIFwiLi4vbWljcy91dGlscy5zZXJ2aWNlXCI7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIER1bW15RGF0YVNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfVXRpbHNTZXJ2aWNlO1xyXG4gICAgc3RhdGljIFRBQkxFUzogdHlwZW9mIEVOVU1fVEFCTEVTO1xyXG4gICAgcmVhZG9ubHkgQ09OU1RBTlRfUEFUSCA9IFwiYXNzZXRzL2R1bW15L1wiO1xyXG4gICAgcmVhZG9ubHkgSlNPTlM6IHtcclxuICAgICAgICByZXN0YXVyYW50OiBzdHJpbmc7XHJcbiAgICAgICAgY3VzdG9tZXI6IHN0cmluZztcclxuICAgICAgICBtZWFsOiBzdHJpbmc7XHJcbiAgICAgICAgY291cmllcjogc3RyaW5nO1xyXG4gICAgfTtcclxuICAgIGNvbnN0cnVjdG9yKF9VdGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSk7XHJcbiAgICBjb252ZXJ0RHVtbXlEYXRhVG9Nb2RlbCh0YWJsZTogRU5VTV9UQUJMRVMsIG1vZGVsQ2xhc3M6IElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcik6IFByb21pc2U8YW55W10+O1xyXG59XHJcbiJdfQ==