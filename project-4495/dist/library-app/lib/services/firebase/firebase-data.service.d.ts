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
import * as ɵngcc0 from '@angular/core';
export declare class FirebaseDataService {
    private _AngularFirestore;
    private _DummyDataService;
    private _NotificationService;
    private _MapService;
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
    constructor(_AngularFirestore: AngularFirestore, _DummyDataService: DummyDataService, _NotificationService: NotificationService, _MapService: MapService);
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
    deleteDeliveryStatus(): Promise<void>;
    /**
     * delete data of collection
     * @param name
     * @returns {Promise<void>}
     */
    private deleteTable;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FirebaseDataService, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmQudHMiLCJzb3VyY2VzIjpbImZpcmViYXNlLWRhdGEuc2VydmljZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9maXJlc3RvcmUnO1xyXG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9jdXN0b21lci9jdXN0b21lcic7XHJcbmltcG9ydCB7IER1bW15RGF0YVNlcnZpY2UgfSBmcm9tICcuLi9kYXRhL2R1bW15LWRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IElEZWZhdWx0TW9kZWwgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvaS1kZWZhdWx0LW1vZGVsJztcclxuaW1wb3J0IHsgUmVzdGF1cmFudCB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnQnO1xyXG5pbXBvcnQgeyBDb3VyaWVyIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2NvdXJpZXIvY291cmllcic7XHJcbmltcG9ydCB7IE1lYWwgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvbWVhbC9tZWFsJztcclxuaW1wb3J0IHsgRU5VTV9UQUJMRVMgfSBmcm9tICcuLi8uLi9jb25zdGFudC9jb25zdC12YWx1ZSc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT3JkZXJJdGVtIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyX2l0ZW0vb3JkZXItaXRlbSc7XHJcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyL29yZGVyJztcclxuaW1wb3J0IHsgUXVlcnlQYXJhbU1vZGVsIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9xdWVyeS1wYXJhbS1tb2RlbFwiO1xyXG5pbXBvcnQgeyBEZWxpdmVyeSB9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHNcIjtcclxuaW1wb3J0IHsgRGVsaXZlcnlTdGF0dXNIaXN0b3J5IH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9kZWxpdmVyeS9kZWxpdmVyeS1zdGF0dXMtaGlzdG9yeVwiO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSBcIi4uL21hcC9tYXAuc2VydmljZVwiO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBGaXJlYmFzZURhdGFTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX0FuZ3VsYXJGaXJlc3RvcmU7XHJcbiAgICBwcml2YXRlIF9EdW1teURhdGFTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfTm90aWZpY2F0aW9uU2VydmljZTtcclxuICAgIHByaXZhdGUgX01hcFNlcnZpY2U7XHJcbiAgICByZWFkb25seSBUQUJMRVM6IHtcclxuICAgICAgICBjdXN0b21lcjoge1xyXG4gICAgICAgICAgICBuYW1lOiBFTlVNX1RBQkxFUztcclxuICAgICAgICAgICAgY2xhc3M6IHR5cGVvZiBDdXN0b21lcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvdXJpZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgQ291cmllcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlc3RhdXJhbnQ6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgUmVzdGF1cmFudDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG1lYWw6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgTWVhbDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9yZGVyOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIE9yZGVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGVsaXZlcnk6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgRGVsaXZlcnk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvcmRlcl9pdGVtOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIE9yZGVySXRlbTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIERlbGl2ZXJ5U3RhdHVzSGlzdG9yeTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIGNvbnN0cnVjdG9yKF9Bbmd1bGFyRmlyZXN0b3JlOiBBbmd1bGFyRmlyZXN0b3JlLCBfRHVtbXlEYXRhU2VydmljZTogRHVtbXlEYXRhU2VydmljZSwgX05vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsIF9NYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlKTtcclxuICAgIC8qKlxyXG4gICAgICogcmVzZXQgREJcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICovXHJcbiAgICByZXNldERCKCk6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIGxpbmsgcmVzdGF1cmFudCBhbmQgbWVhbHMgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIGxpbmtSZXN0YXVyYW50TWVhbERCKCk6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIGFkZCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHVua25vd25bXT59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkREI7XHJcbiAgICAvKipcclxuICAgICAqIGdldCBjdXN0b21lciBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDdXN0b21lcltdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0Q3VzdG9tZXIoKTogUHJvbWlzZTxDdXN0b21lcltdPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGNvdXJpZXIgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Q291cmllcltdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0Q291cmllcigpOiBQcm9taXNlPENvdXJpZXJbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCBkZWxpdmVyeSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxEZWxpdmVyeVtdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0RGVsaXZlcmllcygpOiBQcm9taXNlPERlbGl2ZXJ5W10+O1xyXG4gICAgZ2V0RGVsaXZlcnlTdGF0dXNIaXN0b3J5KCk6IFByb21pc2U8RGVsaXZlcnlTdGF0dXNIaXN0b3J5W10+O1xyXG4gICAgZ2V0U3RhdHVzSGlzdG9yeU9mRGVsaXZlcnkocXVlcnlQYXJhbXM/OiBRdWVyeVBhcmFtTW9kZWxbXSk6IFByb21pc2U8RGVsaXZlcnlTdGF0dXNIaXN0b3J5W10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgcmVzdGF1cmFudCBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZXN0YXVyYW50W10+fVxyXG4gICAgICovXHJcbiAgICBnZXRSZXN0YXVyYW50KCk6IFByb21pc2U8UmVzdGF1cmFudFtdPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IG1lYWxzIGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1lYWxbXT59XHJcbiAgICAgKi9cclxuICAgIGdldE1lYWxzKCk6IFByb21pc2U8TWVhbFtdPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IG9yZGVyIGl0ZW1zIGRhdGFcclxuICAgICAqIEBwYXJhbSBxdWVyeVBhcmFtc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWVhbFtdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0T3JkZXJJdGVtcyhxdWVyeVBhcmFtcz86IFF1ZXJ5UGFyYW1Nb2RlbFtdKTogUHJvbWlzZTxPcmRlckl0ZW1bXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCBvcmRlciBkZXRhaWxzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxPcmRlcltdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0T3JkZXJzKCk6IFByb21pc2U8T3JkZXJbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPElEZWZhdWx0TW9kZWxDb25zdHJ1Y3RvcltdPn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREQjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IG9iamVjdCBieSBpZFxyXG4gICAgICogQHBhcmFtIG9iamVjdFxyXG4gICAgICogQHBhcmFtIGlkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXT59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0REJXaXRoSWQ7XHJcbiAgICAvKipcclxuICAgICAqIGNvbnZlcnQgZGF0YSB0byBjbGFzcyBvYmplY3RcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gbW9kZWxDbGFzc1xyXG4gICAgICogQHJldHVybnMge2FueVtdfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnZlcnRUb0NsYXNzT2JqZWN0O1xyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgZG9jdW1lbnQsIHNldCBpZFxyXG4gICAgICogQHBhcmFtIG9iamVjdFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVdpdGhPYmplY3Qob2JqZWN0OiBJRGVmYXVsdE1vZGVsKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlIGRvY3VtZW50XHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVdpdGhPYmplY3Qob2JqZWN0OiBJRGVmYXVsdE1vZGVsKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRhYmxlIG5hbWUgZnJvbSBjbGFzcyBuYW1lXHJcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICovXHJcbiAgICBnZXRUYWJsZShjbGFzc05hbWU6IHN0cmluZyk6IGFueTtcclxuICAgIGRlbGV0ZU9yZGVyKCk6IFByb21pc2U8dm9pZD47XHJcbiAgICBkZWxldGVPcmRlckl0ZW0oKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIGRlbGV0ZURlbGl2ZXJ5KCk6IFByb21pc2U8dm9pZD47XHJcbiAgICBkZWxldGVEZWxpdmVyeVN0YXR1cygpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBkZWxldGUgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gbmFtZVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVsZXRlVGFibGU7XHJcbn1cclxuIl19