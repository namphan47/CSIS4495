import { ENUM_TABLES } from '../../constant/const-value';
import { UtilsService } from "../mics/utils.service";
import { IDefaultModelConstructor } from "../../constant/models/i-default-model";
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDef<DummyDataService, never>;
    static ɵprov: i0.ɵɵInjectableDef<DummyDataService>;
}
