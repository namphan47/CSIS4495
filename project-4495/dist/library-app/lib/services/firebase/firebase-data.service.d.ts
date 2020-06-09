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
    getOrder(): Promise<Order[]>;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmQudHMiLCJzb3VyY2VzIjpbImZpcmViYXNlLWRhdGEuc2VydmljZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5ndWxhckZpcmVzdG9yZSB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlJztcclxuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvY3VzdG9tZXIvY3VzdG9tZXInO1xyXG5pbXBvcnQgeyBEdW1teURhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS9kdW1teS1kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJRGVmYXVsdE1vZGVsIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2ktZGVmYXVsdC1tb2RlbCc7XHJcbmltcG9ydCB7IFJlc3RhdXJhbnQgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvcmVzdGF1cmFudC9yZXN0YXVyYW50JztcclxuaW1wb3J0IHsgQ291cmllciB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9jb3VyaWVyL2NvdXJpZXInO1xyXG5pbXBvcnQgeyBNZWFsIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL21lYWwvbWVhbCc7XHJcbmltcG9ydCB7IEVOVU1fVEFCTEVTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvY29uc3QtdmFsdWUnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vbWljcy9ub3RpZmljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IE9yZGVySXRlbSB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlcl9pdGVtL29yZGVyLWl0ZW0nO1xyXG5pbXBvcnQgeyBPcmRlciB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlci9vcmRlcic7XHJcbmltcG9ydCB7IFF1ZXJ5UGFyYW1Nb2RlbCB9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvcXVlcnktcGFyYW0tbW9kZWxcIjtcclxuaW1wb3J0IHsgRGVsaXZlcnkgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzXCI7XHJcbmltcG9ydCB7IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSB9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnktc3RhdHVzLWhpc3RvcnlcIjtcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgRmlyZWJhc2VEYXRhU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9Bbmd1bGFyRmlyZXN0b3JlO1xyXG4gICAgcHJpdmF0ZSBfRHVtbXlEYXRhU2VydmljZTtcclxuICAgIHByaXZhdGUgX05vdGlmaWNhdGlvblNlcnZpY2U7XHJcbiAgICByZWFkb25seSBUQUJMRVM6IHtcclxuICAgICAgICBjdXN0b21lcjoge1xyXG4gICAgICAgICAgICBuYW1lOiBFTlVNX1RBQkxFUztcclxuICAgICAgICAgICAgY2xhc3M6IHR5cGVvZiBDdXN0b21lcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvdXJpZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgQ291cmllcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlc3RhdXJhbnQ6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgUmVzdGF1cmFudDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG1lYWw6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgTWVhbDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9yZGVyOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIE9yZGVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGVsaXZlcnk6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgRGVsaXZlcnk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvcmRlcl9pdGVtOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIE9yZGVySXRlbTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIERlbGl2ZXJ5U3RhdHVzSGlzdG9yeTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIGNvbnN0cnVjdG9yKF9Bbmd1bGFyRmlyZXN0b3JlOiBBbmd1bGFyRmlyZXN0b3JlLCBfRHVtbXlEYXRhU2VydmljZTogRHVtbXlEYXRhU2VydmljZSwgX05vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpO1xyXG4gICAgLyoqXHJcbiAgICAgKiByZXNldCBEQlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIHJlc2V0REIoKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIC8qKlxyXG4gICAgICogbGluayByZXN0YXVyYW50IGFuZCBtZWFscyBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgICAqL1xyXG4gICAgbGlua1Jlc3RhdXJhbnRNZWFsREIoKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIC8qKlxyXG4gICAgICogYWRkIGRhdGEgb2YgY29sbGVjdGlvblxyXG4gICAgICogQHBhcmFtIG9iamVjdFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dW5rbm93bltdPn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGREQjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGN1c3RvbWVyIGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEN1c3RvbWVyW10+fVxyXG4gICAgICovXHJcbiAgICBnZXRDdXN0b21lcigpOiBQcm9taXNlPEN1c3RvbWVyW10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgY291cmllciBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDb3VyaWVyW10+fVxyXG4gICAgICovXHJcbiAgICBnZXRDb3VyaWVyKCk6IFByb21pc2U8Q291cmllcltdPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHJlc3RhdXJhbnQgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UmVzdGF1cmFudFtdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0UmVzdGF1cmFudCgpOiBQcm9taXNlPFJlc3RhdXJhbnRbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCBtZWFscyBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNZWFsW10+fVxyXG4gICAgICovXHJcbiAgICBnZXRNZWFscygpOiBQcm9taXNlPE1lYWxbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCBvcmRlciBpdGVtcyBkYXRhXHJcbiAgICAgKiBAcGFyYW0gcXVlcnlQYXJhbXNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE1lYWxbXT59XHJcbiAgICAgKi9cclxuICAgIGdldE9yZGVySXRlbXMocXVlcnlQYXJhbXM/OiBRdWVyeVBhcmFtTW9kZWxbXSk6IFByb21pc2U8T3JkZXJJdGVtW10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgb3JkZXIgZGV0YWlsc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8T3JkZXJbXT59XHJcbiAgICAgKi9cclxuICAgIGdldE9yZGVyKCk6IFByb21pc2U8T3JkZXJbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPElEZWZhdWx0TW9kZWxDb25zdHJ1Y3RvcltdPn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXREQjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IG9iamVjdCBieSBpZFxyXG4gICAgICogQHBhcmFtIG9iamVjdFxyXG4gICAgICogQHBhcmFtIGlkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXT59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0REJXaXRoSWQ7XHJcbiAgICAvKipcclxuICAgICAqIGNvbnZlcnQgZGF0YSB0byBjbGFzcyBvYmplY3RcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gbW9kZWxDbGFzc1xyXG4gICAgICogQHJldHVybnMge2FueVtdfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnZlcnRUb0NsYXNzT2JqZWN0O1xyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgZG9jdW1lbnQsIHNldCBpZFxyXG4gICAgICogQHBhcmFtIG9iamVjdFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVdpdGhPYmplY3Qob2JqZWN0OiBJRGVmYXVsdE1vZGVsKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlIGRvY3VtZW50XHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVdpdGhPYmplY3Qob2JqZWN0OiBJRGVmYXVsdE1vZGVsKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHRhYmxlIG5hbWUgZnJvbSBjbGFzcyBuYW1lXHJcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICovXHJcbiAgICBnZXRUYWJsZShjbGFzc05hbWU6IHN0cmluZyk6IGFueTtcclxuICAgIGRlbGV0ZU9yZGVyKCk6IFByb21pc2U8dm9pZD47XHJcbiAgICBkZWxldGVPcmRlckl0ZW0oKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIGRlbGV0ZURlbGl2ZXJ5KCk6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIGRlbGV0ZSBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZWxldGVUYWJsZTtcclxufVxyXG4iXX0=