import { FirebaseDataService } from "../firebase/firebase-data.service";
import { Customer } from "../../constant/models/customer/customer";
import { Restaurant } from "../../constant/models/restaurant/restaurant";
import { NotificationService } from "../mics/notification.service";
import { Courier, Delivery } from "../../constant/models";
import { MapService } from "../map/map.service";
import * as ɵngcc0 from '@angular/core';
declare enum SIMULATOR_MESSAGE {
    START = "simulator start",
    STEP = "simulator step",
    STOP = "simulator stop"
}
export declare class SimulatorDataService {
    private _FirebaseDataService;
    private _NotificationService;
    private _MapService;
    static MESSAGE: typeof SIMULATOR_MESSAGE;
    constructor(_FirebaseDataService: FirebaseDataService, _NotificationService: NotificationService, _MapService: MapService);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLWRhdGEuc2VydmljZS5kLnRzIiwic291cmNlcyI6WyJzaW11bGF0b3ItZGF0YS5zZXJ2aWNlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpcmViYXNlRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vZmlyZWJhc2UvZmlyZWJhc2UtZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9jdXN0b21lci9jdXN0b21lclwiO1xyXG5pbXBvcnQgeyBSZXN0YXVyYW50IH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnRcIjtcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gXCIuLi9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdXJpZXIsIERlbGl2ZXJ5IH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVsc1wiO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSBcIi4uL21hcC9tYXAuc2VydmljZVwiO1xyXG5kZWNsYXJlIGVudW0gU0lNVUxBVE9SX01FU1NBR0Uge1xyXG4gICAgU1RBUlQgPSBcInNpbXVsYXRvciBzdGFydFwiLFxyXG4gICAgU1RFUCA9IFwic2ltdWxhdG9yIHN0ZXBcIixcclxuICAgIFNUT1AgPSBcInNpbXVsYXRvciBzdG9wXCJcclxufVxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBTaW11bGF0b3JEYXRhU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9GaXJlYmFzZURhdGFTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfTm90aWZpY2F0aW9uU2VydmljZTtcclxuICAgIHByaXZhdGUgX01hcFNlcnZpY2U7XHJcbiAgICBzdGF0aWMgTUVTU0FHRTogdHlwZW9mIFNJTVVMQVRPUl9NRVNTQUdFO1xyXG4gICAgY29uc3RydWN0b3IoX0ZpcmViYXNlRGF0YVNlcnZpY2U6IEZpcmViYXNlRGF0YVNlcnZpY2UsIF9Ob3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLCBfTWFwU2VydmljZTogTWFwU2VydmljZSk7XHJcbiAgICAvKipcclxuICAgICAqIHN0YXJ0IHNpbXVsYXRvclxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIHN0YXJ0KHRpbWU/OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgaGFuZGxlRGVsaXZlcnkoZGVsaXZlcnk6IERlbGl2ZXJ5KTogUHJvbWlzZTx2b2lkPjtcclxuICAgIHN0b3AoKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogcmFuZG9tbHkgZ2VuZXJhdGUgbiBudW1iZXIgb2Ygb3JkZXJzXHJcbiAgICAgKiBAcGFyYW0gblxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIGdlbmVyYXRlT3JkZXIobj86IG51bWJlcik6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIGdlbmVyYXRlIDEgb3JkZXIsIDEgb3JkZXIgaXRlbSwgMSBkZWxpdmVyeSwgMSBkZWxpdmVyeSBzdGF0dXMgaGlzdG9yeVxyXG4gICAgICogQHBhcmFtIGN1c3RvbWVyc1xyXG4gICAgICogQHBhcmFtIHJlc3RhdXJhbnRzXHJcbiAgICAgKiBAcGFyYW0gY291cmllcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICovXHJcbiAgICBnZW5lcmF0ZU9uZU9yZGVyKGN1c3RvbWVyczogQ3VzdG9tZXJbXSwgcmVzdGF1cmFudHM6IFJlc3RhdXJhbnRbXSwgY291cmllcnM6IENvdXJpZXJbXSk6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIGdldCByYW5kb21cclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICogQHJldHVybnMge2FueSB8IG51bGwgfCBudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldFJhbmRvbSh2YWx1ZTogYW55W10gfCBudW1iZXIpOiBhbnk7XHJcbn1cclxuZXhwb3J0IHt9O1xyXG4iXX0=