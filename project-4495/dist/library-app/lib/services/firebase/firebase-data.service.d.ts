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
import * as ɵngcc0 from '@angular/core';
export declare class FirebaseDataService {
    private _AngularFirestore;
    private _DummyDataService;
    private _NotificationService;
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
    constructor(_AngularFirestore: AngularFirestore, _DummyDataService: DummyDataService, _NotificationService: NotificationService);
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
     * get courier data
     * @returns {Promise<Courier[]>}
     */
    getCourier(): Promise<Courier[]>;
    /**
     * get delivery data
     * @returns {Promise<Delivery[]>}
     */
    getDeliveries(): Promise<Delivery[]>;
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
    updateWithObject(object: IDefaultModel): void;
    /**
     * get table name from class name
     * @param className
     * @returns {any}
     */
    getTable(className: string): any;
    deleteOrder(): Promise<void>;
    deleteOrderItem(): Promise<void>;
    deleteDelivery(): Promise<void>;
    /**
     * delete data of collection
     * @param name
     * @returns {Promise<void>}
     */
    private deleteTable;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FirebaseDataService, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmQudHMiLCJzb3VyY2VzIjpbImZpcmViYXNlLWRhdGEuc2VydmljZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9maXJlc3RvcmUnO1xyXG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9jdXN0b21lci9jdXN0b21lcic7XHJcbmltcG9ydCB7IER1bW15RGF0YVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhL2R1bW15LWRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElEZWZhdWx0TW9kZWwgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvaS1kZWZhdWx0LW1vZGVsJztcclxuaW1wb3J0IHsgUmVzdGF1cmFudCB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnQnO1xyXG5pbXBvcnQgeyBDb3VyaWVyIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2NvdXJpZXIvY291cmllcic7XHJcbmltcG9ydCB7IE1lYWwgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvbWVhbC9tZWFsJztcclxuaW1wb3J0IHsgRU5VTV9UQUJMRVMgfSBmcm9tICcuLi8uLi9jb25zdGFudC9jb25zdC12YWx1ZSc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT3JkZXJJdGVtIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyX2l0ZW0vb3JkZXItaXRlbSc7XHJcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyL29yZGVyJztcclxuaW1wb3J0IHsgUXVlcnlQYXJhbU1vZGVsIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9xdWVyeS1wYXJhbS1tb2RlbFwiO1xyXG5pbXBvcnQgeyBEZWxpdmVyeSB9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHNcIjtcclxuaW1wb3J0IHsgRGVsaXZlcnlTdGF0dXNIaXN0b3J5IH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9kZWxpdmVyeS9kZWxpdmVyeS1zdGF0dXMtaGlzdG9yeVwiO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBGaXJlYmFzZURhdGFTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX0FuZ3VsYXJGaXJlc3RvcmU7XHJcbiAgICBwcml2YXRlIF9EdW1teURhdGFTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfTm90aWZpY2F0aW9uU2VydmljZTtcclxuICAgIHJlYWRvbmx5IFRBQkxFUzoge1xyXG4gICAgICAgIGN1c3RvbWVyOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIEN1c3RvbWVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY291cmllcjoge1xyXG4gICAgICAgICAgICBuYW1lOiBFTlVNX1RBQkxFUztcclxuICAgICAgICAgICAgY2xhc3M6IHR5cGVvZiBDb3VyaWVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVzdGF1cmFudDoge1xyXG4gICAgICAgICAgICBuYW1lOiBFTlVNX1RBQkxFUztcclxuICAgICAgICAgICAgY2xhc3M6IHR5cGVvZiBSZXN0YXVyYW50O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbWVhbDoge1xyXG4gICAgICAgICAgICBuYW1lOiBFTlVNX1RBQkxFUztcclxuICAgICAgICAgICAgY2xhc3M6IHR5cGVvZiBNZWFsO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgb3JkZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgT3JkZXI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBkZWxpdmVyeToge1xyXG4gICAgICAgICAgICBuYW1lOiBFTlVNX1RBQkxFUztcclxuICAgICAgICAgICAgY2xhc3M6IHR5cGVvZiBEZWxpdmVyeTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9yZGVyX2l0ZW06IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgT3JkZXJJdGVtO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGVsaXZlcnlfc3RhdHVzX2hpc3Rvcnk6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgRGVsaXZlcnlTdGF0dXNIaXN0b3J5O1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgY29uc3RydWN0b3IoX0FuZ3VsYXJGaXJlc3RvcmU6IEFuZ3VsYXJGaXJlc3RvcmUsIF9EdW1teURhdGFTZXJ2aWNlOiBEdW1teURhdGFTZXJ2aWNlLCBfTm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSk7XHJcbiAgICAvKipcclxuICAgICAqIHJlc2V0IERCXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgICAqL1xyXG4gICAgcmVzZXREQigpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBsaW5rIHJlc3RhdXJhbnQgYW5kIG1lYWxzIGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICovXHJcbiAgICBsaW5rUmVzdGF1cmFudE1lYWxEQigpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx1bmtub3duW10+fVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZERCO1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgY3VzdG9tZXIgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Q3VzdG9tZXJbXT59XHJcbiAgICAgKi9cclxuICAgIGdldEN1c3RvbWVyKCk6IFByb21pc2U8Q3VzdG9tZXJbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCBjb3VyaWVyIGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPENvdXJpZXJbXT59XHJcbiAgICAgKi9cclxuICAgIGdldENvdXJpZXIoKTogUHJvbWlzZTxDb3VyaWVyW10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgZGVsaXZlcnkgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8RGVsaXZlcnlbXT59XHJcbiAgICAgKi9cclxuICAgIGdldERlbGl2ZXJpZXMoKTogUHJvbWlzZTxEZWxpdmVyeVtdPjtcclxuICAgIGdldERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSgpOiBQcm9taXNlPERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdPjtcclxuICAgIGdldFN0YXR1c0hpc3RvcnlPZkRlbGl2ZXJ5KHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10pOiBQcm9taXNlPERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHJlc3RhdXJhbnQgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UmVzdGF1cmFudFtdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UmVzdGF1cmFudCgpOiBQcm9taXNlPFJlc3RhdXJhbnRbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCBtZWFscyBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNZWFsW10+fVxyXG4gICAgICovXHJcbiAgICBnZXRNZWFscygpOiBQcm9taXNlPE1lYWxbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCBvcmRlciBpdGVtcyBkYXRhXHJcbiAgICAgKiBAcGFyYW0gcXVlcnlQYXJhbXNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1lYWxbXT59XHJcbiAgICAgKi9cclxuICAgIGdldE9yZGVySXRlbXMocXVlcnlQYXJhbXM/OiBRdWVyeVBhcmFtTW9kZWxbXSk6IFByb21pc2U8T3JkZXJJdGVtW10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgb3JkZXIgZGV0YWlsc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8T3JkZXJbXT59XHJcbiAgICAgKi9cclxuICAgIGdldE9yZGVycygpOiBQcm9taXNlPE9yZGVyW10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXT59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0REI7XHJcbiAgICAvKipcclxuICAgICAqIGdldCBvYmplY3QgYnkgaWRcclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEBwYXJhbSBpZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERCV2l0aElkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBjb252ZXJ0IGRhdGEgdG8gY2xhc3Mgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICogQHBhcmFtIG1vZGVsQ2xhc3NcclxuICAgICAqIEByZXR1cm5zIHthbnlbXX1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb252ZXJ0VG9DbGFzc09iamVjdDtcclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGRvY3VtZW50LCBzZXQgaWRcclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVXaXRoT2JqZWN0KG9iamVjdDogSURlZmF1bHRNb2RlbCk6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZSBkb2N1bWVudFxyXG4gICAgICogQHBhcmFtIG9iamVjdFxyXG4gICAgICovXHJcbiAgICB1cGRhdGVXaXRoT2JqZWN0KG9iamVjdDogSURlZmF1bHRNb2RlbCk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIGdldCB0YWJsZSBuYW1lIGZyb20gY2xhc3MgbmFtZVxyXG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxyXG4gICAgICogQHJldHVybnMge2FueX1cclxuICAgICAqL1xyXG4gICAgZ2V0VGFibGUoY2xhc3NOYW1lOiBzdHJpbmcpOiBhbnk7XHJcbiAgICBkZWxldGVPcmRlcigpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgZGVsZXRlT3JkZXJJdGVtKCk6IFByb21pc2U8dm9pZD47XHJcbiAgICBkZWxldGVEZWxpdmVyeSgpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBkZWxldGUgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gbmFtZVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVsZXRlVGFibGU7XHJcbn1cclxuIl19