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
import { QueryParamModel } from "../../constant/models/query-param-model";
import { Delivery } from "../../constant/models";
import { DeliveryStatusHistory } from "../../constant/models/delivery/delivery-status-history";
import { MapService } from "../map/map.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmQudHMiLCJzb3VyY2VzIjpbImZpcmViYXNlLWRhdGEuc2VydmljZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9maXJlc3RvcmUnO1xyXG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9jdXN0b21lci9jdXN0b21lcic7XHJcbmltcG9ydCB7IER1bW15RGF0YVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhL2R1bW15LWRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElEZWZhdWx0TW9kZWwgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvaS1kZWZhdWx0LW1vZGVsJztcclxuaW1wb3J0IHsgUmVzdGF1cmFudCB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnQnO1xyXG5pbXBvcnQgeyBDb3VyaWVyIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2NvdXJpZXIvY291cmllcic7XHJcbmltcG9ydCB7IE1lYWwgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvbWVhbC9tZWFsJztcclxuaW1wb3J0IHsgRU5VTV9UQUJMRVMgfSBmcm9tICcuLi8uLi9jb25zdGFudC9jb25zdC12YWx1ZSc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT3JkZXJJdGVtIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyX2l0ZW0vb3JkZXItaXRlbSc7XHJcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyL29yZGVyJztcclxuaW1wb3J0IHsgUXVlcnlQYXJhbU1vZGVsIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9xdWVyeS1wYXJhbS1tb2RlbFwiO1xyXG5pbXBvcnQgeyBEZWxpdmVyeSB9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHNcIjtcclxuaW1wb3J0IHsgRGVsaXZlcnlTdGF0dXNIaXN0b3J5IH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9kZWxpdmVyeS9kZWxpdmVyeS1zdGF0dXMtaGlzdG9yeVwiO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSBcIi4uL21hcC9tYXAuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBbmd1bGFyRmlyZURhdGFiYXNlIH0gZnJvbSBcIkBhbmd1bGFyL2ZpcmUvZGF0YWJhc2VcIjtcclxuaW1wb3J0IHsgQW5ndWxhckZpcmVBdXRoIH0gZnJvbSBcIkBhbmd1bGFyL2ZpcmUvYXV0aFwiO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBGaXJlYmFzZURhdGFTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX0FuZ3VsYXJGaXJlc3RvcmU7XHJcbiAgICBwcml2YXRlIF9Bbmd1bGFyRmlyZURhdGFiYXNlO1xyXG4gICAgcHJpdmF0ZSBfRHVtbXlEYXRhU2VydmljZTtcclxuICAgIHByaXZhdGUgX05vdGlmaWNhdGlvblNlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9NYXBTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfQW5ndWxhckZpcmVBdXRoO1xyXG4gICAgcmVhZG9ubHkgVEFCTEVTOiB7XHJcbiAgICAgICAgY3VzdG9tZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgQ3VzdG9tZXI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb3VyaWVyOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIENvdXJpZXI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXN0YXVyYW50OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIFJlc3RhdXJhbnQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBtZWFsOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIE1lYWw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvcmRlcjoge1xyXG4gICAgICAgICAgICBuYW1lOiBFTlVNX1RBQkxFUztcclxuICAgICAgICAgICAgY2xhc3M6IHR5cGVvZiBPcmRlcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRlbGl2ZXJ5OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIERlbGl2ZXJ5O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgb3JkZXJfaXRlbToge1xyXG4gICAgICAgICAgICBuYW1lOiBFTlVNX1RBQkxFUztcclxuICAgICAgICAgICAgY2xhc3M6IHR5cGVvZiBPcmRlckl0ZW07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBkZWxpdmVyeV9zdGF0dXNfaGlzdG9yeToge1xyXG4gICAgICAgICAgICBuYW1lOiBFTlVNX1RBQkxFUztcclxuICAgICAgICAgICAgY2xhc3M6IHR5cGVvZiBEZWxpdmVyeVN0YXR1c0hpc3Rvcnk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBjb25zdHJ1Y3RvcihfQW5ndWxhckZpcmVzdG9yZTogQW5ndWxhckZpcmVzdG9yZSwgX0FuZ3VsYXJGaXJlRGF0YWJhc2U6IEFuZ3VsYXJGaXJlRGF0YWJhc2UsIF9EdW1teURhdGFTZXJ2aWNlOiBEdW1teURhdGFTZXJ2aWNlLCBfTm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSwgX01hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIF9Bbmd1bGFyRmlyZUF1dGg6IEFuZ3VsYXJGaXJlQXV0aCk7XHJcbiAgICAvKipcclxuICAgICAqIHJlc2V0IERCXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgICAqL1xyXG4gICAgcmVzZXREQigpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBsaW5rIHJlc3RhdXJhbnQgYW5kIG1lYWxzIGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICovXHJcbiAgICBsaW5rUmVzdGF1cmFudE1lYWxEQigpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx1bmtub3duW10+fVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZERCO1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgY3VzdG9tZXIgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Q3VzdG9tZXJbXT59XHJcbiAgICAgKi9cclxuICAgIGdldEN1c3RvbWVyKCk6IFByb21pc2U8Q3VzdG9tZXJbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCBjdXN0b21lciBieSBlbWFpbFxyXG4gICAgICogQHBhcmFtIGVtYWlsXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDdXN0b21lcj59XHJcbiAgICAgKi9cclxuICAgIGdldEN1c3RvbWVyQnlFbWFpbChlbWFpbDogc3RyaW5nKTogUHJvbWlzZTxDdXN0b21lcj47XHJcbiAgICAvKipcclxuICAgICAqIGdldCBjb3VyaWVyIGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPENvdXJpZXJbXT59XHJcbiAgICAgKi9cclxuICAgIGdldENvdXJpZXIoKTogUHJvbWlzZTxDb3VyaWVyW10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgZGVsaXZlcnkgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8RGVsaXZlcnlbXT59XHJcbiAgICAgKi9cclxuICAgIGdldERlbGl2ZXJpZXMoKTogUHJvbWlzZTxEZWxpdmVyeVtdPjtcclxuICAgIGdldERlbGl2ZXJ5QnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxEZWxpdmVyeT47XHJcbiAgICBnZXREZWxpdmVyeVN0YXR1c0hpc3RvcnkoKTogUHJvbWlzZTxEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXT47XHJcbiAgICBnZXRTdGF0dXNIaXN0b3J5T2ZEZWxpdmVyeShxdWVyeVBhcmFtcz86IFF1ZXJ5UGFyYW1Nb2RlbFtdKTogUHJvbWlzZTxEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCByZXN0YXVyYW50IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3RhdXJhbnRbXT59XHJcbiAgICAgKi9cclxuICAgIGdldFJlc3RhdXJhbnQoKTogUHJvbWlzZTxSZXN0YXVyYW50W10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgbWVhbHMgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWVhbFtdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0TWVhbHMoKTogUHJvbWlzZTxNZWFsW10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgb3JkZXIgaXRlbXMgZGF0YVxyXG4gICAgICogQHBhcmFtIHF1ZXJ5UGFyYW1zXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNZWFsW10+fVxyXG4gICAgICovXHJcbiAgICBnZXRPcmRlckl0ZW1zKHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10pOiBQcm9taXNlPE9yZGVySXRlbVtdPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IG9yZGVyIGRldGFpbHNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE9yZGVyW10+fVxyXG4gICAgICovXHJcbiAgICBnZXRPcmRlcnMoKTogUHJvbWlzZTxPcmRlcltdPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGRhdGEgb2YgY29sbGVjdGlvblxyXG4gICAgICogQHBhcmFtIG9iamVjdFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERCO1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgb2JqZWN0IGJ5IGlkXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gaWRcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPElEZWZhdWx0TW9kZWxDb25zdHJ1Y3RvcltdPn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREQldpdGhJZDtcclxuICAgIC8qKlxyXG4gICAgICogY29udmVydCBkYXRhIHRvIGNsYXNzIG9iamVjdFxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqIEBwYXJhbSBtb2RlbENsYXNzXHJcbiAgICAgKiBAcmV0dXJucyB7YW55W119XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29udmVydFRvQ2xhc3NPYmplY3Q7XHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBkb2N1bWVudCwgc2V0IGlkXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgICAqL1xyXG4gICAgY3JlYXRlV2l0aE9iamVjdChvYmplY3Q6IElEZWZhdWx0TW9kZWwpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGUgZG9jdW1lbnRcclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgdXBkYXRlV2l0aE9iamVjdChvYmplY3Q6IElEZWZhdWx0TW9kZWwpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgdGFibGUgbmFtZSBmcm9tIGNsYXNzIG5hbWVcclxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcclxuICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgKi9cclxuICAgIGdldFRhYmxlKGNsYXNzTmFtZTogc3RyaW5nKTogYW55O1xyXG4gICAgZGVsZXRlT3JkZXIoKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIGRlbGV0ZU9yZGVySXRlbSgpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgZGVsZXRlRGVsaXZlcnkoKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIGRlbGV0ZURlbGl2ZXJ5U3RhdHVzKCk6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIGRlbGV0ZSBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZWxldGVUYWJsZTtcclxuICAgIGdldFBvaW50c1JlYWxUaW1lKGlkOiBhbnkpOiBpbXBvcnQoXCJyeGpzXCIpLk9ic2VydmFibGU8dW5rbm93bltdPjtcclxuICAgIGdldFJlYWxUaW1lREIobmFtZTogc3RyaW5nLCBpZDogc3RyaW5nKTogaW1wb3J0KFwicnhqc1wiKS5PYnNlcnZhYmxlPHVua25vd25bXT47XHJcbiAgICAvKipcclxuICAgICAqIFNpZ24gaW4gd2l0aCBlbWFpbC9wYXNzd29yZFxyXG4gICAgICogQHBhcmFtIHVzZXJcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxyXG4gICAgICovXHJcbiAgICBzaWduVXAodXNlcjogQ3VzdG9tZXIpOiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTaWduIGluIHdpdGggZW1haWwvcGFzc3dvcmRcclxuICAgICAqIEBwYXJhbSB1c2VyXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDdXN0b21lcj59XHJcbiAgICAgKi9cclxuICAgIHNpZ25Jbih1c2VyOiBDdXN0b21lcik6IFByb21pc2U8Q3VzdG9tZXI+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgcmFuZG9tXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHthbnkgfCBudWxsIHwgbnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXRSYW5kb20odmFsdWU6IGFueVtdIHwgbnVtYmVyKTogYW55O1xyXG4gICAgLyoqXHJcbiAgICAgKiBjaGVja291dFxyXG4gICAgICogQHBhcmFtIGN1c3RvbWVyXHJcbiAgICAgKiBAcGFyYW0gcmVzdGF1cmFudFxyXG4gICAgICogQHBhcmFtIG9yZGVySXRlbXNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICovXHJcbiAgICBjaGVja291dChjdXN0b21lcjogQ3VzdG9tZXIsIHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQsIG9yZGVySXRlbXM6IE9yZGVySXRlbVtdKTogUHJvbWlzZTxhbnk+O1xyXG59XHJcbiJdfQ==