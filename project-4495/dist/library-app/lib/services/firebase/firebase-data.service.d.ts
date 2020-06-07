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
        order_item: {
            name: ENUM_TABLES;
            class: typeof OrderItem;
        };
        order_status_history: {
            name: ENUM_TABLES;
            class: typeof OrderItem;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmQudHMiLCJzb3VyY2VzIjpbImZpcmViYXNlLWRhdGEuc2VydmljZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5ndWxhckZpcmVzdG9yZSB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlJztcclxuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvY3VzdG9tZXIvY3VzdG9tZXInO1xyXG5pbXBvcnQgeyBEdW1teURhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0YS9kdW1teS1kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJRGVmYXVsdE1vZGVsIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2ktZGVmYXVsdC1tb2RlbCc7XHJcbmltcG9ydCB7IFJlc3RhdXJhbnQgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvcmVzdGF1cmFudC9yZXN0YXVyYW50JztcclxuaW1wb3J0IHsgQ291cmllciB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9jb3VyaWVyL2NvdXJpZXInO1xyXG5pbXBvcnQgeyBNZWFsIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL21lYWwvbWVhbCc7XHJcbmltcG9ydCB7IEVOVU1fVEFCTEVTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvY29uc3QtdmFsdWUnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vbWljcy9ub3RpZmljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IE9yZGVySXRlbSB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlcl9pdGVtL29yZGVyLWl0ZW0nO1xyXG5pbXBvcnQgeyBPcmRlciB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlci9vcmRlcic7XHJcbmltcG9ydCB7IFF1ZXJ5UGFyYW1Nb2RlbCB9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvcXVlcnktcGFyYW0tbW9kZWxcIjtcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgRmlyZWJhc2VEYXRhU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9Bbmd1bGFyRmlyZXN0b3JlO1xyXG4gICAgcHJpdmF0ZSBfRHVtbXlEYXRhU2VydmljZTtcclxuICAgIHByaXZhdGUgX05vdGlmaWNhdGlvblNlcnZpY2U7XHJcbiAgICByZWFkb25seSBUQUJMRVM6IHtcclxuICAgICAgICBjdXN0b21lcjoge1xyXG4gICAgICAgICAgICBuYW1lOiBFTlVNX1RBQkxFUztcclxuICAgICAgICAgICAgY2xhc3M6IHR5cGVvZiBDdXN0b21lcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvdXJpZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgQ291cmllcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlc3RhdXJhbnQ6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgUmVzdGF1cmFudDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG1lYWw6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgTWVhbDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9yZGVyOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIE9yZGVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgb3JkZXJfaXRlbToge1xyXG4gICAgICAgICAgICBuYW1lOiBFTlVNX1RBQkxFUztcclxuICAgICAgICAgICAgY2xhc3M6IHR5cGVvZiBPcmRlckl0ZW07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvcmRlcl9zdGF0dXNfaGlzdG9yeToge1xyXG4gICAgICAgICAgICBuYW1lOiBFTlVNX1RBQkxFUztcclxuICAgICAgICAgICAgY2xhc3M6IHR5cGVvZiBPcmRlckl0ZW07XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBjb25zdHJ1Y3RvcihfQW5ndWxhckZpcmVzdG9yZTogQW5ndWxhckZpcmVzdG9yZSwgX0R1bW15RGF0YVNlcnZpY2U6IER1bW15RGF0YVNlcnZpY2UsIF9Ob3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKTtcclxuICAgIC8qKlxyXG4gICAgICogcmVzZXQgREJcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICovXHJcbiAgICByZXNldERCKCk6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIGxpbmsgcmVzdGF1cmFudCBhbmQgbWVhbHMgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIGxpbmtSZXN0YXVyYW50TWVhbERCKCk6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIGFkZCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHVua25vd25bXT59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkREI7XHJcbiAgICAvKipcclxuICAgICAqIGdldCBjdXN0b21lciBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDdXN0b21lcltdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0Q3VzdG9tZXIoKTogUHJvbWlzZTxDdXN0b21lcltdPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGNvdXJpZXIgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Q291cmllcltdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0Q291cmllcigpOiBQcm9taXNlPENvdXJpZXJbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCByZXN0YXVyYW50IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3RhdXJhbnRbXT59XHJcbiAgICAgKi9cclxuICAgIGdldFJlc3RhdXJhbnQoKTogUHJvbWlzZTxSZXN0YXVyYW50W10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgbWVhbHMgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWVhbFtdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0TWVhbHMoKTogUHJvbWlzZTxNZWFsW10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgb3JkZXIgaXRlbXMgZGF0YVxyXG4gICAgICogQHBhcmFtIHF1ZXJ5UGFyYW1zXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNZWFsW10+fVxyXG4gICAgICovXHJcbiAgICBnZXRPcmRlckl0ZW1zKHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10pOiBQcm9taXNlPE9yZGVySXRlbVtdPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IG9yZGVyIGRldGFpbHNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE9yZGVyW10+fVxyXG4gICAgICovXHJcbiAgICBnZXRPcmRlcigpOiBQcm9taXNlPE9yZGVyW10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXT59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0REI7XHJcbiAgICAvKipcclxuICAgICAqIGdldCBvYmplY3QgYnkgaWRcclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEBwYXJhbSBpZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERCV2l0aElkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBjb252ZXJ0IGRhdGEgdG8gY2xhc3Mgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICogQHBhcmFtIG1vZGVsQ2xhc3NcclxuICAgICAqIEByZXR1cm5zIHthbnlbXX1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb252ZXJ0VG9DbGFzc09iamVjdDtcclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGRvY3VtZW50LCBzZXQgaWRcclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVXaXRoT2JqZWN0KG9iamVjdDogSURlZmF1bHRNb2RlbCk6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZSBkb2N1bWVudFxyXG4gICAgICogQHBhcmFtIG9iamVjdFxyXG4gICAgICovXHJcbiAgICB1cGRhdGVXaXRoT2JqZWN0KG9iamVjdDogSURlZmF1bHRNb2RlbCk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIGdldCB0YWJsZSBuYW1lIGZyb20gY2xhc3MgbmFtZVxyXG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxyXG4gICAgICogQHJldHVybnMge2FueX1cclxuICAgICAqL1xyXG4gICAgZ2V0VGFibGUoY2xhc3NOYW1lOiBzdHJpbmcpOiBhbnk7XHJcbiAgICBkZWxldGVPcmRlcigpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgZGVsZXRlT3JkZXJJdGVtKCk6IFByb21pc2U8dm9pZD47XHJcbiAgICBkZWxldGVEZWxpdmVyeSgpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBkZWxldGUgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gbmFtZVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVsZXRlVGFibGU7XHJcbn1cclxuIl19