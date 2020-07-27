import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../../constant/models/customer/customer';
import { DummyDataService } from '../data/dummy-data.service';
import { IDefaultModel } from '../../constant/models/i-default-model';
import { Restaurant } from '../../constant/models/restaurant/restaurant';
import { Courier } from '../../constant/models/courier/courier';
import { Meal } from '../../constant/models/meal/meal';
import { ENUM_TABLES } from '../../constant/const-value';
import { NotificationService } from '../mics/notification.service';
import { OrderItem } from '../../constant/models/order_item/order-item';
import { Order } from '../../constant/models/order/order';
import { QueryParamModel } from '../../constant/models/query-param-model';
import { Delivery } from '../../constant/models';
import { DeliveryStatusHistory } from '../../constant/models/delivery/delivery-status-history';
import { MapService } from '../map/map.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as ɵngcc0 from '@angular/core';
export declare class FirebaseDataService {
    private _AngularFirestore;
    private _AngularFireDatabase;
    private _DummyDataService;
    private _NotificationService;
    private _MapService;
    private _AngularFireAuth;
    readonly TABLES: {
        customer: {
            name: ENUM_TABLES;
            class: typeof Customer;
        };
        courier: {
            name: ENUM_TABLES;
            class: typeof Courier;
        };
        restaurant: {
            name: ENUM_TABLES;
            class: typeof Restaurant;
        };
        meal: {
            name: ENUM_TABLES;
            class: typeof Meal;
        };
        order: {
            name: ENUM_TABLES;
            class: typeof Order;
        };
        delivery: {
            name: ENUM_TABLES;
            class: typeof Delivery;
        };
        order_item: {
            name: ENUM_TABLES;
            class: typeof OrderItem;
        };
        delivery_status_history: {
            name: ENUM_TABLES;
            class: typeof DeliveryStatusHistory;
        };
    };
    constructor(_AngularFirestore: AngularFirestore, _AngularFireDatabase: AngularFireDatabase, _DummyDataService: DummyDataService, _NotificationService: NotificationService, _MapService: MapService, _AngularFireAuth: AngularFireAuth);
    /**
     * reset DB
     * @returns {Promise<void>}
     */
    resetDB(): Promise<void>;
    /**
     * link restaurant and meals data
     * @returns {Promise<void>}
     */
    linkRestaurantMealDB(): Promise<void>;
    /**
     * add data of collection
     * @param object
     * @returns {Promise<unknown[]>}
     */
    private addDB;
    /**
     * get customer data
     * @returns {Promise<Customer[]>}
     */
    getCustomer(): Promise<Customer[]>;
    /**
     * get customer by email
     * @param email
     * @returns {Promise<Customer>}
     */
    getCustomerByEmail(email: string): Promise<Customer>;
    /**
     * get courier data
     * @returns {Promise<Courier[]>}
     */
    getCourier(): Promise<Courier[]>;
    /**
     * get delivery data
     * @returns {Promise<Delivery[]>}
     */
    getDeliveries(): Promise<Delivery[]>;
    getDeliveryById(id: string): Promise<Delivery>;
    getDeliveryStatusHistory(): Promise<DeliveryStatusHistory[]>;
    getStatusHistoryOfDelivery(queryParams?: QueryParamModel[]): Promise<DeliveryStatusHistory[]>;
    /**
     * get restaurant data
     * @returns {Promise<Restaurant[]>}
     */
    getRestaurant(): Promise<Restaurant[]>;
    /**
     * get meals data
     * @returns {Promise<Meal[]>}
     */
    getMeals(): Promise<Meal[]>;
    /**
     * get order items data
     * @param queryParams
     * @returns {Promise<Meal[]>}
     */
    getOrderItems(queryParams?: QueryParamModel[]): Promise<OrderItem[]>;
    /**
     * get order details
     * @returns {Promise<Order[]>}
     */
    getOrders(): Promise<Order[]>;
    getOrderById(id: string): Promise<Order>;
    /**
     * get data of collection
     * @param object
     * @returns {Promise<IDefaultModelConstructor[]>}
     */
    private getDB;
    /**
     * get object by id
     * @param object
     * @param id
     * @returns {Promise<IDefaultModelConstructor[]>}
     */
    private getDBWithId;
    /**
     * convert data to class object
     * @param data
     * @param modelClass
     * @returns {any[]}
     */
    private convertToClassObject;
    /**
     * create document, set id
     * @param object
     * @returns {Promise<void>}
     */
    createWithObject(object: IDefaultModel): Promise<void>;
    /**
     * update document
     * @param object
     */
    updateWithObject(object: IDefaultModel): Promise<void>;
    /**
     * get table name from class name
     * @param className
     * @returns {any}
     */
    getTable(className: string): any;
    deleteOrder(): Promise<void>;
    deleteOrderItem(): Promise<void>;
    deleteDelivery(): Promise<void>;
    deleteDeliveryStatus(): Promise<void>;
    /**
     * delete data of collection
     * @param name
     * @returns {Promise<void>}
     */
    private deleteTable;
    getPointsRealTime(id: any): import("rxjs").Observable<unknown[]>;
    getRealTimeDB(name: string, id: string): import("rxjs").Observable<unknown[]>;
    /**
     * Sign in with email/password
     * @param user
     * @returns {Promise<boolean>}
     */
    signUp(user: Customer): Promise<boolean>;
    /**
     * Sign in with email/password
     * @param user
     * @returns {Promise<Customer>}
     */
    signIn(user: Customer): Promise<Customer>;
    /**
     * get random
     * @param value
     * @returns {any | null | number}
     */
    getRandom(value: any[] | number): any;
    /**
     * checkout
     * @param customer
     * @param restaurant
     * @param orderItems
     * @returns {Promise<void>}
     */
    checkout(customer: Customer, restaurant: Restaurant, orderItems: OrderItem[]): Promise<any>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FirebaseDataService, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmQudHMiLCJzb3VyY2VzIjpbImZpcmViYXNlLWRhdGEuc2VydmljZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuZ3VsYXJGaXJlc3RvcmUgfSBmcm9tICdAYW5ndWxhci9maXJlL2ZpcmVzdG9yZSc7XHJcbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2N1c3RvbWVyL2N1c3RvbWVyJztcclxuaW1wb3J0IHsgRHVtbXlEYXRhU2VydmljZSB9IGZyb20gJy4uL2RhdGEvZHVtbXktZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSURlZmF1bHRNb2RlbCB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9pLWRlZmF1bHQtbW9kZWwnO1xyXG5pbXBvcnQgeyBSZXN0YXVyYW50IH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL3Jlc3RhdXJhbnQvcmVzdGF1cmFudCc7XHJcbmltcG9ydCB7IENvdXJpZXIgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvY291cmllci9jb3VyaWVyJztcclxuaW1wb3J0IHsgTWVhbCB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9tZWFsL21lYWwnO1xyXG5pbXBvcnQgeyBFTlVNX1RBQkxFUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50L2NvbnN0LXZhbHVlJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL21pY3Mvbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPcmRlckl0ZW0gfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvb3JkZXJfaXRlbS9vcmRlci1pdGVtJztcclxuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvb3JkZXIvb3JkZXInO1xyXG5pbXBvcnQgeyBRdWVyeVBhcmFtTW9kZWwgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvcXVlcnktcGFyYW0tbW9kZWwnO1xyXG5pbXBvcnQgeyBEZWxpdmVyeSB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscyc7XHJcbmltcG9ydCB7IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9kZWxpdmVyeS9kZWxpdmVyeS1zdGF0dXMtaGlzdG9yeSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbmd1bGFyRmlyZURhdGFiYXNlIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9kYXRhYmFzZSc7XHJcbmltcG9ydCB7IEFuZ3VsYXJGaXJlQXV0aCB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvYXV0aCc7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEZpcmViYXNlRGF0YVNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfQW5ndWxhckZpcmVzdG9yZTtcclxuICAgIHByaXZhdGUgX0FuZ3VsYXJGaXJlRGF0YWJhc2U7XHJcbiAgICBwcml2YXRlIF9EdW1teURhdGFTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfTm90aWZpY2F0aW9uU2VydmljZTtcclxuICAgIHByaXZhdGUgX01hcFNlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9Bbmd1bGFyRmlyZUF1dGg7XHJcbiAgICByZWFkb25seSBUQUJMRVM6IHtcclxuICAgICAgICBjdXN0b21lcjoge1xyXG4gICAgICAgICAgICBuYW1lOiBFTlVNX1RBQkxFUztcclxuICAgICAgICAgICAgY2xhc3M6IHR5cGVvZiBDdXN0b21lcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvdXJpZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgQ291cmllcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlc3RhdXJhbnQ6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgUmVzdGF1cmFudDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG1lYWw6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgTWVhbDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9yZGVyOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIE9yZGVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGVsaXZlcnk6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgRGVsaXZlcnk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvcmRlcl9pdGVtOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIE9yZGVySXRlbTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIERlbGl2ZXJ5U3RhdHVzSGlzdG9yeTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIGNvbnN0cnVjdG9yKF9Bbmd1bGFyRmlyZXN0b3JlOiBBbmd1bGFyRmlyZXN0b3JlLCBfQW5ndWxhckZpcmVEYXRhYmFzZTogQW5ndWxhckZpcmVEYXRhYmFzZSwgX0R1bW15RGF0YVNlcnZpY2U6IER1bW15RGF0YVNlcnZpY2UsIF9Ob3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLCBfTWFwU2VydmljZTogTWFwU2VydmljZSwgX0FuZ3VsYXJGaXJlQXV0aDogQW5ndWxhckZpcmVBdXRoKTtcclxuICAgIC8qKlxyXG4gICAgICogcmVzZXQgREJcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICovXHJcbiAgICByZXNldERCKCk6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIGxpbmsgcmVzdGF1cmFudCBhbmQgbWVhbHMgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIGxpbmtSZXN0YXVyYW50TWVhbERCKCk6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIGFkZCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHVua25vd25bXT59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkREI7XHJcbiAgICAvKipcclxuICAgICAqIGdldCBjdXN0b21lciBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDdXN0b21lcltdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0Q3VzdG9tZXIoKTogUHJvbWlzZTxDdXN0b21lcltdPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGN1c3RvbWVyIGJ5IGVtYWlsXHJcbiAgICAgKiBAcGFyYW0gZW1haWxcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEN1c3RvbWVyPn1cclxuICAgICAqL1xyXG4gICAgZ2V0Q3VzdG9tZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPEN1c3RvbWVyPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGNvdXJpZXIgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Q291cmllcltdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0Q291cmllcigpOiBQcm9taXNlPENvdXJpZXJbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCBkZWxpdmVyeSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxEZWxpdmVyeVtdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0RGVsaXZlcmllcygpOiBQcm9taXNlPERlbGl2ZXJ5W10+O1xyXG4gICAgZ2V0RGVsaXZlcnlCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPERlbGl2ZXJ5PjtcclxuICAgIGdldERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSgpOiBQcm9taXNlPERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdPjtcclxuICAgIGdldFN0YXR1c0hpc3RvcnlPZkRlbGl2ZXJ5KHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10pOiBQcm9taXNlPERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHJlc3RhdXJhbnQgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UmVzdGF1cmFudFtdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UmVzdGF1cmFudCgpOiBQcm9taXNlPFJlc3RhdXJhbnRbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCBtZWFscyBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNZWFsW10+fVxyXG4gICAgICovXHJcbiAgICBnZXRNZWFscygpOiBQcm9taXNlPE1lYWxbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCBvcmRlciBpdGVtcyBkYXRhXHJcbiAgICAgKiBAcGFyYW0gcXVlcnlQYXJhbXNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1lYWxbXT59XHJcbiAgICAgKi9cclxuICAgIGdldE9yZGVySXRlbXMocXVlcnlQYXJhbXM/OiBRdWVyeVBhcmFtTW9kZWxbXSk6IFByb21pc2U8T3JkZXJJdGVtW10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgb3JkZXIgZGV0YWlsc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8T3JkZXJbXT59XHJcbiAgICAgKi9cclxuICAgIGdldE9yZGVycygpOiBQcm9taXNlPE9yZGVyW10+O1xyXG4gICAgZ2V0T3JkZXJCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPE9yZGVyPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGRhdGEgb2YgY29sbGVjdGlvblxyXG4gICAgICogQHBhcmFtIG9iamVjdFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERCO1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgb2JqZWN0IGJ5IGlkXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gaWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPElEZWZhdWx0TW9kZWxDb25zdHJ1Y3RvcltdPn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREQldpdGhJZDtcclxuICAgIC8qKlxyXG4gICAgICogY29udmVydCBkYXRhIHRvIGNsYXNzIG9iamVjdFxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqIEBwYXJhbSBtb2RlbENsYXNzXHJcbiAgICAgKiBAcmV0dXJucyB7YW55W119XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29udmVydFRvQ2xhc3NPYmplY3Q7XHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBkb2N1bWVudCwgc2V0IGlkXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgICAqL1xyXG4gICAgY3JlYXRlV2l0aE9iamVjdChvYmplY3Q6IElEZWZhdWx0TW9kZWwpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGUgZG9jdW1lbnRcclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgdXBkYXRlV2l0aE9iamVjdChvYmplY3Q6IElEZWZhdWx0TW9kZWwpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGFibGUgbmFtZSBmcm9tIGNsYXNzIG5hbWVcclxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcclxuICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgKi9cclxuICAgIGdldFRhYmxlKGNsYXNzTmFtZTogc3RyaW5nKTogYW55O1xyXG4gICAgZGVsZXRlT3JkZXIoKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIGRlbGV0ZU9yZGVySXRlbSgpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgZGVsZXRlRGVsaXZlcnkoKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIGRlbGV0ZURlbGl2ZXJ5U3RhdHVzKCk6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIGRlbGV0ZSBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZWxldGVUYWJsZTtcclxuICAgIGdldFBvaW50c1JlYWxUaW1lKGlkOiBhbnkpOiBpbXBvcnQoXCJyeGpzXCIpLk9ic2VydmFibGU8dW5rbm93bltdPjtcclxuICAgIGdldFJlYWxUaW1lREIobmFtZTogc3RyaW5nLCBpZDogc3RyaW5nKTogaW1wb3J0KFwicnhqc1wiKS5PYnNlcnZhYmxlPHVua25vd25bXT47XHJcbiAgICAvKipcclxuICAgICAqIFNpZ24gaW4gd2l0aCBlbWFpbC9wYXNzd29yZFxyXG4gICAgICogQHBhcmFtIHVzZXJcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxyXG4gICAgICovXHJcbiAgICBzaWduVXAodXNlcjogQ3VzdG9tZXIpOiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTaWduIGluIHdpdGggZW1haWwvcGFzc3dvcmRcclxuICAgICAqIEBwYXJhbSB1c2VyXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDdXN0b21lcj59XHJcbiAgICAgKi9cclxuICAgIHNpZ25Jbih1c2VyOiBDdXN0b21lcik6IFByb21pc2U8Q3VzdG9tZXI+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgcmFuZG9tXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHthbnkgfCBudWxsIHwgbnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXRSYW5kb20odmFsdWU6IGFueVtdIHwgbnVtYmVyKTogYW55O1xyXG4gICAgLyoqXHJcbiAgICAgKiBjaGVja291dFxyXG4gICAgICogQHBhcmFtIGN1c3RvbWVyXHJcbiAgICAgKiBAcGFyYW0gcmVzdGF1cmFudFxyXG4gICAgICogQHBhcmFtIG9yZGVySXRlbXNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICovXHJcbiAgICBjaGVja291dChjdXN0b21lcjogQ3VzdG9tZXIsIHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQsIG9yZGVySXRlbXM6IE9yZGVySXRlbVtdKTogUHJvbWlzZTxhbnk+O1xyXG59XHJcbiJdfQ==