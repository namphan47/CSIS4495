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
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDef<FirebaseDataService, never>;
    static ɵprov: i0.ɵɵInjectableDef<FirebaseDataService>;
}