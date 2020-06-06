import { FirebaseDataService } from "../firebase/firebase-data.service";
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SimulatorDataService, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLWRhdGEuc2VydmljZS5kLnRzIiwic291cmNlcyI6WyJzaW11bGF0b3ItZGF0YS5zZXJ2aWNlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlyZWJhc2VEYXRhU2VydmljZSB9IGZyb20gXCIuLi9maXJlYmFzZS9maXJlYmFzZS1kYXRhLnNlcnZpY2VcIjtcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgU2ltdWxhdG9yRGF0YVNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfRmlyZWJhc2VEYXRhU2VydmljZTtcclxuICAgIGNvbnN0cnVjdG9yKF9GaXJlYmFzZURhdGFTZXJ2aWNlOiBGaXJlYmFzZURhdGFTZXJ2aWNlKTtcclxuICAgIC8qKlxyXG4gICAgICogc3RhcnQgc2ltdWxhdG9yXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgICAqL1xyXG4gICAgc3RhcnQoKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIHN0b3AoKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHJhbmRvbVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7YW55IHwgbnVsbCB8IG51bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0UmFuZG9tKHZhbHVlOiBhbnlbXSB8IG51bWJlcik6IGFueTtcclxufVxyXG4iXX0=