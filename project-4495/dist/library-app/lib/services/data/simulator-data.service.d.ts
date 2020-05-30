import { FirebaseDataService } from "../firebase/firebase-data.service";
import * as i0 from "@angular/core";
export declare class SimulatorDataService {
    private _FirebaseDataService;
    constructor(_FirebaseDataService: FirebaseDataService);
    /**
     * start simulator
     * @returns {Promise<void>}
     */
    start(): Promise<void>;
    stop(): void;
    /**
     * get random
     * @param value
     * @returns {any | null | number}
     */
    getRandom(value: any[] | number): any;
    static ɵfac: i0.ɵɵFactoryDef<SimulatorDataService, never>;
    static ɵprov: i0.ɵɵInjectableDef<SimulatorDataService>;
}
