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
     * delete data of collection
     * @param name
     * @returns {Promise<void>}
     */
    private deleteDB;
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FirebaseDataService, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmQudHMiLCJzb3VyY2VzIjpbImZpcmViYXNlLWRhdGEuc2VydmljZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuZ3VsYXJGaXJlc3RvcmUgfSBmcm9tICdAYW5ndWxhci9maXJlL2ZpcmVzdG9yZSc7XHJcbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2N1c3RvbWVyL2N1c3RvbWVyJztcclxuaW1wb3J0IHsgRHVtbXlEYXRhU2VydmljZSB9IGZyb20gJy4uL2RhdGEvZHVtbXktZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSURlZmF1bHRNb2RlbCB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9pLWRlZmF1bHQtbW9kZWwnO1xyXG5pbXBvcnQgeyBSZXN0YXVyYW50IH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL3Jlc3RhdXJhbnQvcmVzdGF1cmFudCc7XHJcbmltcG9ydCB7IENvdXJpZXIgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvY291cmllci9jb3VyaWVyJztcclxuaW1wb3J0IHsgTWVhbCB9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9tZWFsL21lYWwnO1xyXG5pbXBvcnQgeyBFTlVNX1RBQkxFUyB9IGZyb20gJy4uLy4uL2NvbnN0YW50L2NvbnN0LXZhbHVlJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL21pY3Mvbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPcmRlckl0ZW0gfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvb3JkZXJfaXRlbS9vcmRlci1pdGVtJztcclxuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvb3JkZXIvb3JkZXInO1xyXG5pbXBvcnQgeyBRdWVyeVBhcmFtTW9kZWwgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL3F1ZXJ5LXBhcmFtLW1vZGVsXCI7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEZpcmViYXNlRGF0YVNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBfQW5ndWxhckZpcmVzdG9yZTtcclxuICAgIHByaXZhdGUgX0R1bW15RGF0YVNlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9Ob3RpZmljYXRpb25TZXJ2aWNlO1xyXG4gICAgcmVhZG9ubHkgVEFCTEVTOiB7XHJcbiAgICAgICAgY3VzdG9tZXI6IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgQ3VzdG9tZXI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb3VyaWVyOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIENvdXJpZXI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXN0YXVyYW50OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIFJlc3RhdXJhbnQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBtZWFsOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IEVOVU1fVEFCTEVTO1xyXG4gICAgICAgICAgICBjbGFzczogdHlwZW9mIE1lYWw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvcmRlcjoge1xyXG4gICAgICAgICAgICBuYW1lOiBFTlVNX1RBQkxFUztcclxuICAgICAgICAgICAgY2xhc3M6IHR5cGVvZiBPcmRlcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9yZGVyX2l0ZW06IHtcclxuICAgICAgICAgICAgbmFtZTogRU5VTV9UQUJMRVM7XHJcbiAgICAgICAgICAgIGNsYXNzOiB0eXBlb2YgT3JkZXJJdGVtO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgY29uc3RydWN0b3IoX0FuZ3VsYXJGaXJlc3RvcmU6IEFuZ3VsYXJGaXJlc3RvcmUsIF9EdW1teURhdGFTZXJ2aWNlOiBEdW1teURhdGFTZXJ2aWNlLCBfTm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSk7XHJcbiAgICAvKipcclxuICAgICAqIHJlc2V0IERCXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgICAqL1xyXG4gICAgcmVzZXREQigpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBsaW5rIHJlc3RhdXJhbnQgYW5kIG1lYWxzIGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICovXHJcbiAgICBsaW5rUmVzdGF1cmFudE1lYWxEQigpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBkZWxldGUgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gbmFtZVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVsZXRlREI7XHJcbiAgICAvKipcclxuICAgICAqIGFkZCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHVua25vd25bXT59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkREI7XHJcbiAgICAvKipcclxuICAgICAqIGdldCBjdXN0b21lciBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDdXN0b21lcltdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0Q3VzdG9tZXIoKTogUHJvbWlzZTxDdXN0b21lcltdPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGNvdXJpZXIgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Q291cmllcltdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0Q291cmllcigpOiBQcm9taXNlPENvdXJpZXJbXT47XHJcbiAgICAvKipcclxuICAgICAqIGdldCByZXN0YXVyYW50IGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3RhdXJhbnRbXT59XHJcbiAgICAgKi9cclxuICAgIGdldFJlc3RhdXJhbnQoKTogUHJvbWlzZTxSZXN0YXVyYW50W10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgbWVhbHMgZGF0YVxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TWVhbFtdPn1cclxuICAgICAqL1xyXG4gICAgZ2V0TWVhbHMoKTogUHJvbWlzZTxNZWFsW10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgb3JkZXIgaXRlbXMgZGF0YVxyXG4gICAgICogQHBhcmFtIHF1ZXJ5UGFyYW1zXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNZWFsW10+fVxyXG4gICAgICovXHJcbiAgICBnZXRPcmRlckl0ZW1zKHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10pOiBQcm9taXNlPE9yZGVySXRlbVtdPjtcclxuICAgIC8qKlxyXG4gICAgICogZ2V0IG9yZGVyIGRldGFpbHNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE9yZGVyW10+fVxyXG4gICAgICovXHJcbiAgICBnZXRPcmRlcigpOiBQcm9taXNlPE9yZGVyW10+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXT59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0REI7XHJcbiAgICAvKipcclxuICAgICAqIGdldCBvYmplY3QgYnkgaWRcclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEBwYXJhbSBpZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldERCV2l0aElkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBjb252ZXJ0IGRhdGEgdG8gY2xhc3Mgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICogQHBhcmFtIG1vZGVsQ2xhc3NcclxuICAgICAqIEByZXR1cm5zIHthbnlbXX1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb252ZXJ0VG9DbGFzc09iamVjdDtcclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGRvY3VtZW50LCBzZXQgaWRcclxuICAgICAqIEBwYXJhbSBvYmplY3RcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVXaXRoT2JqZWN0KG9iamVjdDogSURlZmF1bHRNb2RlbCk6IFByb21pc2U8dm9pZD47XHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZSBkb2N1bWVudFxyXG4gICAgICogQHBhcmFtIG9iamVjdFxyXG4gICAgICovXHJcbiAgICB1cGRhdGVXaXRoT2JqZWN0KG9iamVjdDogSURlZmF1bHRNb2RlbCk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIGdldCB0YWJsZSBuYW1lIGZyb20gY2xhc3MgbmFtZVxyXG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxyXG4gICAgICogQHJldHVybnMge2FueX1cclxuICAgICAqL1xyXG4gICAgZ2V0VGFibGUoY2xhc3NOYW1lOiBzdHJpbmcpOiBhbnk7XHJcbn1cclxuIl19