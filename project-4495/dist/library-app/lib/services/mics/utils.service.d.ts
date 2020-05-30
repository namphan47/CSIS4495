import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import * as i0 from "@angular/core";
export declare class UtilsService {
    private _HttpClient;
    constructor(_HttpClient: HttpClient);
    getJSON(url: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDef<UtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDef<UtilsService>;
}
