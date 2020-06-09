import { FirebaseDataService } from "../firebase/firebase-data.service";
import { Customer } from "../../constant/models/customer/customer";
import { Restaurant } from "../../constant/models/restaurant/restaurant";
import { NotificationService } from "../mics/notification.service";
import { Courier } from "../../constant/models";
import * as ɵngcc0 from '@angular/core';
export declare class SimulatorDataService {
    private _FirebaseDataService;
    private _NotificationService;
    constructor(_FirebaseDataService: FirebaseDataService, _NotificationService: NotificationService);
    /**
     * start simulator
     * @returns {Promise<void>}
     */
    start(): Promise<void>;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLWRhdGEuc2VydmljZS5kLnRzIiwic291cmNlcyI6WyJzaW11bGF0b3ItZGF0YS5zZXJ2aWNlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaXJlYmFzZURhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZpcmViYXNlL2ZpcmViYXNlLWRhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvY3VzdG9tZXIvY3VzdG9tZXJcIjtcclxuaW1wb3J0IHsgUmVzdGF1cmFudCB9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvcmVzdGF1cmFudC9yZXN0YXVyYW50XCI7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vbWljcy9ub3RpZmljYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3VyaWVyIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVsc1wiO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBTaW11bGF0b3JEYXRhU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9GaXJlYmFzZURhdGFTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfTm90aWZpY2F0aW9uU2VydmljZTtcclxuICAgIGNvbnN0cnVjdG9yKF9GaXJlYmFzZURhdGFTZXJ2aWNlOiBGaXJlYmFzZURhdGFTZXJ2aWNlLCBfTm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSk7XHJcbiAgICAvKipcclxuICAgICAqIHN0YXJ0IHNpbXVsYXRvclxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIHN0YXJ0KCk6IFByb21pc2U8dm9pZD47XHJcbiAgICBzdG9wKCk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIHJhbmRvbWx5IGdlbmVyYXRlIG4gbnVtYmVyIG9mIG9yZGVyc1xyXG4gICAgICogQHBhcmFtIG5cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICovXHJcbiAgICBnZW5lcmF0ZU9yZGVyKG4/OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZW5lcmF0ZSAxIG9yZGVyLCAxIG9yZGVyIGl0ZW0sIDEgZGVsaXZlcnksIDEgZGVsaXZlcnkgc3RhdHVzIGhpc3RvcnlcclxuICAgICAqIEBwYXJhbSBjdXN0b21lcnNcclxuICAgICAqIEBwYXJhbSByZXN0YXVyYW50c1xyXG4gICAgICogQHBhcmFtIGNvdXJpZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgICAqL1xyXG4gICAgZ2VuZXJhdGVPbmVPcmRlcihjdXN0b21lcnM6IEN1c3RvbWVyW10sIHJlc3RhdXJhbnRzOiBSZXN0YXVyYW50W10sIGNvdXJpZXJzOiBDb3VyaWVyW10pOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgcmFuZG9tXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHthbnkgfCBudWxsIHwgbnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXRSYW5kb20odmFsdWU6IGFueVtdIHwgbnVtYmVyKTogYW55O1xyXG59XHJcbiJdfQ==