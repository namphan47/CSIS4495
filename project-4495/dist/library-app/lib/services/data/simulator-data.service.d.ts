import { FirebaseDataService } from "../firebase/firebase-data.service";
import { Customer } from "../../constant/models/customer/customer";
import { Restaurant } from "../../constant/models/restaurant/restaurant";
import { NotificationService } from "../mics/notification.service";
import { Courier, Delivery } from "../../constant/models";
import * as ɵngcc0 from '@angular/core';
declare enum SIMULATOR_MESSAGE {
    START = "simulator start",
    STEP = "simulator step",
    STOP = "simulator stop"
}
export declare class SimulatorDataService {
    private _FirebaseDataService;
    private _NotificationService;
    static MESSAGE: typeof SIMULATOR_MESSAGE;
    constructor(_FirebaseDataService: FirebaseDataService, _NotificationService: NotificationService);
    /**
     * start simulator
     * @returns {Promise<void>}
     */
    start(time?: number): Promise<void>;
    handleDelivery(delivery: Delivery): Promise<void>;
    stop(): void;
    /**
     * randomly generate n number of orders
     * @param n
     * @returns {Promise<void>}
     */
    generateOrder(n?: number): Promise<void>;
    /**
     * generate 1 order, 1 order item, 1 delivery, 1 delivery status history
     * @param customers
     * @param restaurants
     * @param couriers
     * @returns {Promise<void>}
     */
    generateOneOrder(customers: Customer[], restaurants: Restaurant[], couriers: Courier[]): Promise<void>;
    /**
     * get random
     * @param value
     * @returns {any | null | number}
     */
    getRandom(value: any[] | number): any;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SimulatorDataService, never>;
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLWRhdGEuc2VydmljZS5kLnRzIiwic291cmNlcyI6WyJzaW11bGF0b3ItZGF0YS5zZXJ2aWNlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlyZWJhc2VEYXRhU2VydmljZSB9IGZyb20gXCIuLi9maXJlYmFzZS9maXJlYmFzZS1kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL2N1c3RvbWVyL2N1c3RvbWVyXCI7XHJcbmltcG9ydCB7IFJlc3RhdXJhbnQgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL3Jlc3RhdXJhbnQvcmVzdGF1cmFudFwiO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL21pY3Mvbm90aWZpY2F0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cmllciwgRGVsaXZlcnkgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzXCI7XHJcbmRlY2xhcmUgZW51bSBTSU1VTEFUT1JfTUVTU0FHRSB7XHJcbiAgICBTVEFSVCA9IFwic2ltdWxhdG9yIHN0YXJ0XCIsXHJcbiAgICBTVEVQID0gXCJzaW11bGF0b3Igc3RlcFwiLFxyXG4gICAgU1RPUCA9IFwic2ltdWxhdG9yIHN0b3BcIlxyXG59XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFNpbXVsYXRvckRhdGFTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX0ZpcmViYXNlRGF0YVNlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9Ob3RpZmljYXRpb25TZXJ2aWNlO1xyXG4gICAgc3RhdGljIE1FU1NBR0U6IHR5cGVvZiBTSU1VTEFUT1JfTUVTU0FHRTtcclxuICAgIGNvbnN0cnVjdG9yKF9GaXJlYmFzZURhdGFTZXJ2aWNlOiBGaXJlYmFzZURhdGFTZXJ2aWNlLCBfTm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSk7XHJcbiAgICAvKipcclxuICAgICAqIHN0YXJ0IHNpbXVsYXRvclxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIHN0YXJ0KHRpbWU/OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgaGFuZGxlRGVsaXZlcnkoZGVsaXZlcnk6IERlbGl2ZXJ5KTogUHJvbWlzZTx2b2lkPjtcclxuICAgIHN0b3AoKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogcmFuZG9tbHkgZ2VuZXJhdGUgbiBudW1iZXIgb2Ygb3JkZXJzXHJcbiAgICAgKiBAcGFyYW0gblxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIGdlbmVyYXRlT3JkZXIobj86IG51bWJlcik6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIGdlbmVyYXRlIDEgb3JkZXIsIDEgb3JkZXIgaXRlbSwgMSBkZWxpdmVyeSwgMSBkZWxpdmVyeSBzdGF0dXMgaGlzdG9yeVxyXG4gICAgICogQHBhcmFtIGN1c3RvbWVyc1xyXG4gICAgICogQHBhcmFtIHJlc3RhdXJhbnRzXHJcbiAgICAgKiBAcGFyYW0gY291cmllcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICovXHJcbiAgICBnZW5lcmF0ZU9uZU9yZGVyKGN1c3RvbWVyczogQ3VzdG9tZXJbXSwgcmVzdGF1cmFudHM6IFJlc3RhdXJhbnRbXSwgY291cmllcnM6IENvdXJpZXJbXSk6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIGdldCByYW5kb21cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybnMge2FueSB8IG51bGwgfCBudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldFJhbmRvbSh2YWx1ZTogYW55W10gfCBudW1iZXIpOiBhbnk7XHJcbn1cclxuZXhwb3J0IHt9O1xyXG4iXX0=