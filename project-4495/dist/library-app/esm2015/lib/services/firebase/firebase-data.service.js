import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../../constant/models/customer/customer';
import _ from 'lodash';
import { DummyDataService } from '../data/dummy-data.service';
import { first, map, tap } from 'rxjs/operators';
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
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/firestore";
import * as i2 from "@angular/fire/database";
import * as i3 from "../data/dummy-data.service";
import * as i4 from "../mics/notification.service";
import * as i5 from "../map/map.service";
import * as i6 from "@angular/fire/auth";
let FirebaseDataService = class FirebaseDataService {
    constructor(_AngularFirestore, _AngularFireDatabase, _DummyDataService, _NotificationService, _MapService, _AngularFireAuth) {
        this._AngularFirestore = _AngularFirestore;
        this._AngularFireDatabase = _AngularFireDatabase;
        this._DummyDataService = _DummyDataService;
        this._NotificationService = _NotificationService;
        this._MapService = _MapService;
        this._AngularFireAuth = _AngularFireAuth;
        this.TABLES = {
            [ENUM_TABLES.customer]: {
                name: ENUM_TABLES.customer,
                class: Customer
            },
            [ENUM_TABLES.courier]: {
                name: ENUM_TABLES.courier,
                class: Courier
            },
            [ENUM_TABLES.restaurant]: {
                name: ENUM_TABLES.restaurant,
                class: Restaurant
            },
            [ENUM_TABLES.meal]: {
                name: ENUM_TABLES.meal,
                class: Meal
            },
            [ENUM_TABLES.order]: {
                name: ENUM_TABLES.order,
                class: Order
            },
            [ENUM_TABLES.delivery]: {
                name: ENUM_TABLES.delivery,
                class: Delivery
            },
            [ENUM_TABLES.order_item]: {
                name: ENUM_TABLES.order_item,
                class: OrderItem
            },
            [ENUM_TABLES.delivery_status_history]: {
                name: ENUM_TABLES.delivery_status_history,
                class: DeliveryStatusHistory
            }
        };
    }
    /**
     * reset DB
     * @returns {Promise<void>}
     */
    resetDB() {
        return __awaiter(this, void 0, void 0, function* () {
            // delete tables
            yield Promise.all(_.map(this.TABLES, (x) => __awaiter(this, void 0, void 0, function* () {
                yield this.deleteTable(x.name);
            })));
            // add tables
            yield Promise.all(_.map(this.TABLES, (x) => __awaiter(this, void 0, void 0, function* () {
                yield this.addDB(x);
            })));
            // converseMeal
            yield this.linkRestaurantMealDB();
            this._NotificationService.pushMessage('All data is reset!!');
            return Promise.resolve();
        });
    }
    /**
     * link restaurant and meals data
     * @returns {Promise<void>}
     */
    linkRestaurantMealDB() {
        return __awaiter(this, void 0, void 0, function* () {
            this._NotificationService.pushMessage('Link Restaurant & Meal data');
            yield this.getRestaurant()
                .then((restaurants) => {
                // console.log(restaurants);
                this.getMeals()
                    .then((meals) => {
                    // console.log(meals);
                    _.map(restaurants, (restaurant) => {
                        // console.log(restaurant);
                        restaurant.meal_ids = _.map(_.filter(meals, (meal) => {
                            return restaurant.name === meal.restaurant_name;
                        }), x => x.id);
                        this._AngularFirestore.collection(this.TABLES[ENUM_TABLES.restaurant].name)
                            .doc(restaurant.id).set(restaurant.getData());
                    });
                });
            });
        });
    }
    /**
     * add data of collection
     * @param object
     * @returns {Promise<unknown[]>}
     */
    addDB(object) {
        return this._DummyDataService.convertDummyDataToModel(object.name, object.class)
            .then((rs) => __awaiter(this, void 0, void 0, function* () {
            if (!rs) {
                return;
            }
            const itemsCollection = this._AngularFirestore.collection(object.name);
            return yield Promise.all(_.map(rs, (x) => __awaiter(this, void 0, void 0, function* () {
                yield itemsCollection.add(x.getData());
                console.log(`add ${object.name}`);
                this._NotificationService.pushMessage(`add ${object.name}`);
            })));
        }));
    }
    /**
     * get customer data
     * @returns {Promise<Customer[]>}
     */
    getCustomer() {
        return this.getDB(this.TABLES[ENUM_TABLES.customer])
            .then((rs) => rs);
    }
    /**
     * get courier data
     * @returns {Promise<Courier[]>}
     */
    getCourier() {
        return this.getDB(this.TABLES[ENUM_TABLES.courier])
            .then((rs) => rs);
    }
    /**
     * get delivery data
     * @returns {Promise<Delivery[]>}
     */
    getDeliveries() {
        return this.getDB(this.TABLES[ENUM_TABLES.delivery])
            .then((rs) => rs)
            .then((rs) => {
            return this.getDeliveryStatusHistory()
                .then((histories) => {
                _.map(rs, (delivery) => {
                    delivery.setStatusHistory(_.filter(histories, (x) => x.delivery_id === delivery.id));
                });
                return rs;
            });
        });
    }
    getDeliveryById(id) {
        return this.getDBWithId(this.TABLES[ENUM_TABLES.delivery], id)
            .then((rs) => rs)
            .then((rs) => {
            return this.getDeliveryStatusHistory()
                .then((histories) => {
                rs.setStatusHistory(_.filter(histories, (x) => x.delivery_id === id));
                return rs;
            });
        });
    }
    getDeliveryStatusHistory() {
        return this.getDB(this.TABLES[ENUM_TABLES.delivery_status_history])
            .then((rs) => rs);
    }
    getStatusHistoryOfDelivery(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getDB(this.TABLES[ENUM_TABLES.delivery_status_history], queryParams)
                .then((rs) => rs);
        });
    }
    /**
     * get restaurant data
     * @returns {Promise<Restaurant[]>}
     */
    getRestaurant() {
        return this.getDB(this.TABLES[ENUM_TABLES.restaurant])
            .then((restaurants) => {
            return this.getMeals()
                .then((meals) => {
                _.map(restaurants, (restaurant) => {
                    restaurant.meals = _.filter(meals, (meal) => {
                        return restaurant.meal_ids.indexOf(meal.id) >= 0;
                    });
                });
                return restaurants;
            });
        });
    }
    /**
     * get meals data
     * @returns {Promise<Meal[]>}
     */
    getMeals() {
        return this.getDB(this.TABLES[ENUM_TABLES.meal])
            .then((rs) => rs);
    }
    /**
     * get order items data
     * @param queryParams
     * @returns {Promise<Meal[]>}
     */
    getOrderItems(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getDB(this.TABLES[ENUM_TABLES.order_item], queryParams)
                .then((rs) => rs)
                .then((orderItems) => {
                _.map(orderItems, (orderItem) => __awaiter(this, void 0, void 0, function* () {
                    // get meal
                    yield this.getDBWithId(this.TABLES[ENUM_TABLES.meal], orderItem.meal_id)
                        .then((meal) => {
                        orderItem.meal = meal;
                    });
                }));
                return orderItems;
            });
        });
    }
    /**
     * get order details
     * @returns {Promise<Order[]>}
     */
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getDB(this.TABLES[ENUM_TABLES.order])
                .then((rs) => rs)
                .then((orders) => {
                orders = orders;
                return Promise.all(_.map(orders, (order) => __awaiter(this, void 0, void 0, function* () {
                    // get customer of each order
                    yield this.getDBWithId(this.TABLES[ENUM_TABLES.customer], order.customer_id)
                        .then((customer) => {
                        order.customer = customer;
                    });
                    // get item of each order
                    yield this.getOrderItems([new QueryParamModel('order_id', QueryParamModel.OPERATIONS.EQUAL, order.id)])
                        .then((items) => {
                        order.items = items;
                    });
                    // get restaurant for each order
                    yield this.getDBWithId(this.TABLES[ENUM_TABLES.restaurant], order.restaurant_id)
                        .then((restaurant) => {
                        order.restaurant = restaurant;
                    });
                    return Promise.resolve();
                }))).then(() => {
                    return orders;
                });
            });
        });
    }
    /**
     * get data of collection
     * @param object
     * @returns {Promise<IDefaultModelConstructor[]>}
     */
    getDB(object, queryParams, id) {
        const collection = this._AngularFirestore.collection(object.name, ref => {
            let newRef = null;
            if (!!queryParams) {
                _.map(queryParams, (x) => {
                    newRef = newRef ? newRef.where(x.key, x.operation, x.value) : ref.where(x.key, x.operation, x.value);
                });
            }
            return newRef || ref;
        });
        return collection
            .snapshotChanges()
            .pipe(map(items => items.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            // update id
            data['id'] = id;
            return data;
        })), map((items) => _.filter(items, doc => {
            if (!!id) {
                return doc.id === id;
            }
            return doc;
        })))
            .pipe(tap(), first()).toPromise()
            .then((rs) => {
            return this.convertToClassObject(rs, object.class);
        });
    }
    /**
     * get object by id
     * @param object
     * @param id
     * @returns {Promise<IDefaultModelConstructor[]>}
     */
    getDBWithId(object, id) {
        const collection = this._AngularFirestore.doc(`${object.name}/${id}`);
        return collection
            .snapshotChanges()
            .pipe(map(a => {
            const data = a.payload.data();
            const id = a.payload.id;
            // update id
            data['id'] = id;
            return data;
        }))
            .pipe(tap(), first()).toPromise()
            .then((rs) => {
            const array = this.convertToClassObject([rs], object.class);
            return array.length ? array[0] : null;
        });
    }
    /**
     * convert data to class object
     * @param data
     * @param modelClass
     * @returns {any[]}
     */
    convertToClassObject(data, modelClass) {
        const array = [];
        _.map(data, (x) => {
            const model = new modelClass(x);
            array.push(model);
        });
        // console.log(array);
        return array;
    }
    /**
     * create document, set id
     * @param object
     * @returns {Promise<void>}
     */
    createWithObject(object) {
        const id = this._AngularFirestore.createId();
        const collection = this._AngularFirestore.collection(this.getTable(object.constructor.name));
        return collection.doc(id).set(object.getData())
            .then(() => {
            object.id = id;
            this._NotificationService.pushMessage(`Created ${object.constructor.name}`);
        });
    }
    /**
     * update document
     * @param object
     */
    updateWithObject(object) {
        const collection = this._AngularFirestore.collection(this.getTable(object.constructor.name));
        collection.doc(object.id).update(object.getData());
    }
    /**
     * get table name from class name
     * @param className
     * @returns {any}
     */
    getTable(className) {
        return _.find(this.TABLES, (table) => {
            return table.class.name === className;
        }).name;
    }
    /*========delete=========*/
    deleteOrder() {
        return this.deleteTable(this.TABLES[ENUM_TABLES.order].name);
    }
    deleteOrderItem() {
        return this.deleteTable(this.TABLES[ENUM_TABLES.order_item].name);
    }
    deleteDelivery() {
        return this.deleteTable(this.TABLES[ENUM_TABLES.delivery].name);
    }
    deleteDeliveryStatus() {
        return this.deleteTable(this.TABLES[ENUM_TABLES.delivery_status_history].name);
    }
    /**
     * delete data of collection
     * @param name
     * @returns {Promise<void>}
     */
    deleteTable(name) {
        return this._AngularFirestore.collection(name).get().toPromise()
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            const array = [];
            res.forEach(element => {
                array.push(element);
            });
            yield Promise.all(_.map(array, (element) => __awaiter(this, void 0, void 0, function* () {
                yield element.ref.delete();
                console.log(`delete ${name}`);
                this._NotificationService.pushMessage(`delete ${name}`);
            })));
        }));
    }
    getPointsRealTime(id) {
        return this.getRealTimeDB('points', id);
    }
    getRealTimeDB(name, id) {
        return this._AngularFireDatabase.list(`${name}/${id}`).valueChanges();
    }
    /*authentication*/
    signUp(user) {
        return this._AngularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
            .then((result) => {
            window.alert("You have been successfully registered!");
            console.log(result);
        }).catch((error) => {
            window.alert(error.message);
        });
    }
    // Sign in with email/password
    signIn(user) {
        return this._AngularFireAuth.signInWithEmailAndPassword(user.email, user.password)
            .then((result) => {
            console.log(result);
            // this.router.navigate(['<!-- enter your route name here -->']);
            return user;
        }).catch((error) => {
            window.alert(error.message);
        });
    }
};
FirebaseDataService.ctorParameters = () => [
    { type: AngularFirestore },
    { type: AngularFireDatabase },
    { type: DummyDataService },
    { type: NotificationService },
    { type: MapService },
    { type: AngularFireAuth }
];
FirebaseDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function FirebaseDataService_Factory() { return new FirebaseDataService(i0.ɵɵinject(i1.AngularFirestore), i0.ɵɵinject(i2.AngularFireDatabase), i0.ɵɵinject(i3.DummyDataService), i0.ɵɵinject(i4.NotificationService), i0.ɵɵinject(i5.MapService), i0.ɵɵinject(i6.AngularFireAuth)); }, token: FirebaseDataService, providedIn: "root" });
FirebaseDataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FirebaseDataService);
export { FirebaseDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZmlyZWJhc2UvZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDckQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUM3RixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JB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ImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7QW5ndWxhckZpcmVzdG9yZX0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9maXJlc3RvcmUnO1xyXG5pbXBvcnQge0N1c3RvbWVyfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvY3VzdG9tZXIvY3VzdG9tZXInO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQge0R1bW15RGF0YVNlcnZpY2V9IGZyb20gJy4uL2RhdGEvZHVtbXktZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHtmaXJzdCwgbWFwLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtJRGVmYXVsdE1vZGVsLCBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3J9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9pLWRlZmF1bHQtbW9kZWwnO1xyXG5pbXBvcnQge1Jlc3RhdXJhbnR9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnQnO1xyXG5pbXBvcnQge0NvdXJpZXJ9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9jb3VyaWVyL2NvdXJpZXInO1xyXG5pbXBvcnQge01lYWx9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9tZWFsL21lYWwnO1xyXG5pbXBvcnQge0VOVU1fVEFCTEVTfSBmcm9tICcuLi8uLi9jb25zdGFudC9jb25zdC12YWx1ZSc7XHJcbmltcG9ydCB7Tm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnLi4vbWljcy9ub3RpZmljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7T3JkZXJJdGVtfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvb3JkZXJfaXRlbS9vcmRlci1pdGVtJztcclxuaW1wb3J0IHtPcmRlcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyL29yZGVyJztcclxuaW1wb3J0IHtRdWVyeVBhcmFtTW9kZWx9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvcXVlcnktcGFyYW0tbW9kZWxcIjtcclxuaW1wb3J0IHtEZWxpdmVyeX0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVsc1wiO1xyXG5pbXBvcnQge0RlbGl2ZXJ5U3RhdHVzSGlzdG9yeX0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9kZWxpdmVyeS9kZWxpdmVyeS1zdGF0dXMtaGlzdG9yeVwiO1xyXG5pbXBvcnQge01hcFNlcnZpY2V9IGZyb20gXCIuLi9tYXAvbWFwLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtBbmd1bGFyRmlyZURhdGFiYXNlfSBmcm9tIFwiQGFuZ3VsYXIvZmlyZS9kYXRhYmFzZVwiO1xyXG5pbXBvcnQge0FuZ3VsYXJGaXJlQXV0aH0gZnJvbSBcIkBhbmd1bGFyL2ZpcmUvYXV0aFwiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VEYXRhU2VydmljZSB7XHJcbiAgcmVhZG9ubHkgVEFCTEVTID0ge1xyXG4gICAgW0VOVU1fVEFCTEVTLmN1c3RvbWVyXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5jdXN0b21lcixcclxuICAgICAgY2xhc3M6IEN1c3RvbWVyXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLmNvdXJpZXJdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLmNvdXJpZXIsXHJcbiAgICAgIGNsYXNzOiBDb3VyaWVyXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLnJlc3RhdXJhbnQsXHJcbiAgICAgIGNsYXNzOiBSZXN0YXVyYW50XHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLm1lYWxdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLm1lYWwsXHJcbiAgICAgIGNsYXNzOiBNZWFsXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLm9yZGVyXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5vcmRlcixcclxuICAgICAgY2xhc3M6IE9yZGVyXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5XToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5kZWxpdmVyeSxcclxuICAgICAgY2xhc3M6IERlbGl2ZXJ5XHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLm9yZGVyX2l0ZW1dOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLm9yZGVyX2l0ZW0sXHJcbiAgICAgIGNsYXNzOiBPcmRlckl0ZW1cclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMuZGVsaXZlcnlfc3RhdHVzX2hpc3RvcnldOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5LFxyXG4gICAgICBjbGFzczogRGVsaXZlcnlTdGF0dXNIaXN0b3J5XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfQW5ndWxhckZpcmVzdG9yZTogQW5ndWxhckZpcmVzdG9yZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9Bbmd1bGFyRmlyZURhdGFiYXNlOiBBbmd1bGFyRmlyZURhdGFiYXNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX0R1bW15RGF0YVNlcnZpY2U6IER1bW15RGF0YVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfTm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9NYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX0FuZ3VsYXJGaXJlQXV0aDogQW5ndWxhckZpcmVBdXRoKSB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXNldCBEQlxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIHJlc2V0REIoKSB7XHJcbiAgICAvLyBkZWxldGUgdGFibGVzXHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbChfLm1hcCh0aGlzLlRBQkxFUywgYXN5bmMgKHgpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5kZWxldGVUYWJsZSh4Lm5hbWUpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIGFkZCB0YWJsZXNcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKF8ubWFwKHRoaXMuVEFCTEVTLCBhc3luYyAoeCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLmFkZERCKHgpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIGNvbnZlcnNlTWVhbFxyXG4gICAgYXdhaXQgdGhpcy5saW5rUmVzdGF1cmFudE1lYWxEQigpO1xyXG5cclxuICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoJ0FsbCBkYXRhIGlzIHJlc2V0ISEnKTtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGxpbmsgcmVzdGF1cmFudCBhbmQgbWVhbHMgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGxpbmtSZXN0YXVyYW50TWVhbERCKCkge1xyXG4gICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZSgnTGluayBSZXN0YXVyYW50ICYgTWVhbCBkYXRhJyk7XHJcbiAgICBhd2FpdCB0aGlzLmdldFJlc3RhdXJhbnQoKVxyXG4gICAgICAudGhlbigocmVzdGF1cmFudHMpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN0YXVyYW50cyk7XHJcbiAgICAgICAgdGhpcy5nZXRNZWFscygpXHJcbiAgICAgICAgICAudGhlbigobWVhbHMpID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVhbHMpO1xyXG4gICAgICAgICAgICBfLm1hcChyZXN0YXVyYW50cywgKHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN0YXVyYW50KTtcclxuICAgICAgICAgICAgICByZXN0YXVyYW50Lm1lYWxfaWRzID0gXy5tYXAoXy5maWx0ZXIobWVhbHMsIChtZWFsOiBNZWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudC5uYW1lID09PSBtZWFsLnJlc3RhdXJhbnRfbmFtZTtcclxuICAgICAgICAgICAgICB9KSwgeCA9PiB4LmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAuZG9jKHJlc3RhdXJhbnQuaWQpLnNldChyZXN0YXVyYW50LmdldERhdGEoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGFkZCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dW5rbm93bltdPn1cclxuICAgKi9cclxuICBwcml2YXRlIGFkZERCKG9iamVjdCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX0R1bW15RGF0YVNlcnZpY2UuY29udmVydER1bW15RGF0YVRvTW9kZWwob2JqZWN0Lm5hbWUsIG9iamVjdC5jbGFzcylcclxuICAgICAgLnRoZW4oYXN5bmMgKHJzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFycykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpdGVtc0NvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24ob2JqZWN0Lm5hbWUpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChfLm1hcChycywgYXN5bmMgKHgpID0+IHtcclxuICAgICAgICAgIGF3YWl0IGl0ZW1zQ29sbGVjdGlvbi5hZGQoeC5nZXREYXRhKCkpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYGFkZCAke29iamVjdC5uYW1lfWApO1xyXG4gICAgICAgICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShgYWRkICR7b2JqZWN0Lm5hbWV9YCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBjdXN0b21lciBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8Q3VzdG9tZXJbXT59XHJcbiAgICovXHJcbiAgZ2V0Q3VzdG9tZXIoKTogUHJvbWlzZTxDdXN0b21lcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jdXN0b21lcl0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBDdXN0b21lcltdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBjb3VyaWVyIGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDb3VyaWVyW10+fVxyXG4gICAqL1xyXG4gIGdldENvdXJpZXIoKTogUHJvbWlzZTxDb3VyaWVyW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmNvdXJpZXJdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgQ291cmllcltdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBkZWxpdmVyeSBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8RGVsaXZlcnlbXT59XHJcbiAgICovXHJcbiAgZ2V0RGVsaXZlcmllcygpOiBQcm9taXNlPERlbGl2ZXJ5W10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5XSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIERlbGl2ZXJ5W10pXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSgpXHJcbiAgICAgICAgICAudGhlbigoaGlzdG9yaWVzKSA9PiB7XHJcbiAgICAgICAgICAgIF8ubWFwKHJzLCAoZGVsaXZlcnk6IERlbGl2ZXJ5KSA9PiB7XHJcbiAgICAgICAgICAgICAgZGVsaXZlcnkuc2V0U3RhdHVzSGlzdG9yeShfLmZpbHRlcihoaXN0b3JpZXMsICh4OiBEZWxpdmVyeVN0YXR1c0hpc3RvcnkpID0+IHguZGVsaXZlcnlfaWQgPT09IGRlbGl2ZXJ5LmlkKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcnM7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXREZWxpdmVyeUJ5SWQoaWQ6IHN0cmluZyk6IFByb21pc2U8RGVsaXZlcnk+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5XSwgaWQpXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBEZWxpdmVyeSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVsaXZlcnlTdGF0dXNIaXN0b3J5KClcclxuICAgICAgICAgIC50aGVuKChoaXN0b3JpZXMpID0+IHtcclxuICAgICAgICAgICAgcnMuc2V0U3RhdHVzSGlzdG9yeShfLmZpbHRlcihoaXN0b3JpZXMsICh4OiBEZWxpdmVyeVN0YXR1c0hpc3RvcnkpID0+IHguZGVsaXZlcnlfaWQgPT09IGlkKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBycztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSgpOiBQcm9taXNlPERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV9zdGF0dXNfaGlzdG9yeV0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRTdGF0dXNIaXN0b3J5T2ZEZWxpdmVyeShxdWVyeVBhcmFtcz86IFF1ZXJ5UGFyYW1Nb2RlbFtdKTogUHJvbWlzZTxEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnlfc3RhdHVzX2hpc3RvcnldLCBxdWVyeVBhcmFtcylcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCByZXN0YXVyYW50IGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZXN0YXVyYW50W10+fVxyXG4gICAqL1xyXG4gIGdldFJlc3RhdXJhbnQoKTogUHJvbWlzZTxSZXN0YXVyYW50W10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdKVxyXG4gICAgICAudGhlbigocmVzdGF1cmFudHMpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNZWFscygpXHJcbiAgICAgICAgICAudGhlbigobWVhbHMpID0+IHtcclxuICAgICAgICAgICAgXy5tYXAocmVzdGF1cmFudHMsIChyZXN0YXVyYW50OiBSZXN0YXVyYW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgcmVzdGF1cmFudC5tZWFscyA9IF8uZmlsdGVyKG1lYWxzLCAobWVhbDogTWVhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3RhdXJhbnQubWVhbF9pZHMuaW5kZXhPZihtZWFsLmlkKSA+PSAwO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3RhdXJhbnRzIGFzIHVua25vd24gYXMgUmVzdGF1cmFudFtdO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IG1lYWxzIGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNZWFsW10+fVxyXG4gICAqL1xyXG4gIGdldE1lYWxzKCk6IFByb21pc2U8TWVhbFtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5tZWFsXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIE1lYWxbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgb3JkZXIgaXRlbXMgZGF0YVxyXG4gICAqIEBwYXJhbSBxdWVyeVBhcmFtc1xyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE1lYWxbXT59XHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0T3JkZXJJdGVtcyhxdWVyeVBhcmFtcz86IFF1ZXJ5UGFyYW1Nb2RlbFtdKTogUHJvbWlzZTxPcmRlckl0ZW1bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJfaXRlbV0sIHF1ZXJ5UGFyYW1zKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgT3JkZXJJdGVtW10pXHJcbiAgICAgIC50aGVuKChvcmRlckl0ZW1zKSA9PiB7XHJcbiAgICAgICAgXy5tYXAob3JkZXJJdGVtcywgYXN5bmMgKG9yZGVySXRlbTogT3JkZXJJdGVtKSA9PiB7XHJcbiAgICAgICAgICAvLyBnZXQgbWVhbFxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5tZWFsXSwgb3JkZXJJdGVtLm1lYWxfaWQpXHJcbiAgICAgICAgICAgIC50aGVuKChtZWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgb3JkZXJJdGVtLm1lYWwgPSBtZWFsIGFzIHVua25vd24gYXMgTWVhbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG9yZGVySXRlbXM7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IG9yZGVyIGRldGFpbHNcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxPcmRlcltdPn1cclxuICAgKi9cclxuICBhc3luYyBnZXRPcmRlcnMoKTogUHJvbWlzZTxPcmRlcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBPcmRlcltdKVxyXG4gICAgICAudGhlbigob3JkZXJzKSA9PiB7XHJcbiAgICAgICAgb3JkZXJzID0gb3JkZXJzIGFzIHVua25vd24gYXMgT3JkZXJbXTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXy5tYXAob3JkZXJzLCBhc3luYyAob3JkZXI6IE9yZGVyKSA9PiB7XHJcblxyXG4gICAgICAgICAgLy8gZ2V0IGN1c3RvbWVyIG9mIGVhY2ggb3JkZXJcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0REJXaXRoSWQodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuY3VzdG9tZXJdLCBvcmRlci5jdXN0b21lcl9pZClcclxuICAgICAgICAgICAgLnRoZW4oKGN1c3RvbWVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgb3JkZXIuY3VzdG9tZXIgPSBjdXN0b21lciBhcyB1bmtub3duIGFzIEN1c3RvbWVyO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgaXRlbSBvZiBlYWNoIG9yZGVyXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldE9yZGVySXRlbXMoW25ldyBRdWVyeVBhcmFtTW9kZWwoJ29yZGVyX2lkJywgUXVlcnlQYXJhbU1vZGVsLk9QRVJBVElPTlMuRVFVQUwsIG9yZGVyLmlkKV0pXHJcbiAgICAgICAgICAgIC50aGVuKChpdGVtcykgPT4ge1xyXG4gICAgICAgICAgICAgIG9yZGVyLml0ZW1zID0gaXRlbXMgYXMgdW5rbm93biBhcyBPcmRlckl0ZW1bXTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gZ2V0IHJlc3RhdXJhbnQgZm9yIGVhY2ggb3JkZXJcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0REJXaXRoSWQodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMucmVzdGF1cmFudF0sIG9yZGVyLnJlc3RhdXJhbnRfaWQpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN0YXVyYW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgb3JkZXIucmVzdGF1cmFudCA9IHJlc3RhdXJhbnQgYXMgdW5rbm93biBhcyBSZXN0YXVyYW50O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9KSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gb3JkZXJzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPElEZWZhdWx0TW9kZWxDb25zdHJ1Y3RvcltdPn1cclxuICAgKi9cclxuICBwcml2YXRlIGdldERCKG9iamVjdCwgcXVlcnlQYXJhbXM/OiBRdWVyeVBhcmFtTW9kZWxbXSwgaWQ/OiBzdHJpbmcpOiBQcm9taXNlPElEZWZhdWx0TW9kZWxDb25zdHJ1Y3RvcltdPiB7XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKG9iamVjdC5uYW1lLCByZWYgPT4ge1xyXG4gICAgICBsZXQgbmV3UmVmID0gbnVsbDtcclxuICAgICAgaWYgKCEhcXVlcnlQYXJhbXMpIHtcclxuICAgICAgICBfLm1hcChxdWVyeVBhcmFtcywgKHg6IFF1ZXJ5UGFyYW1Nb2RlbCkgPT4ge1xyXG4gICAgICAgICAgbmV3UmVmID0gbmV3UmVmID8gbmV3UmVmLndoZXJlKHgua2V5LCB4Lm9wZXJhdGlvbiwgeC52YWx1ZSkgOiByZWYud2hlcmUoeC5rZXksIHgub3BlcmF0aW9uLCB4LnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV3UmVmIHx8IHJlZjtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBjb2xsZWN0aW9uXHJcbiAgICAgIC5zbmFwc2hvdENoYW5nZXMoKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoaXRlbXMgPT4gaXRlbXMubWFwKGEgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZGF0YSA9IGEucGF5bG9hZC5kb2MuZGF0YSgpIGFzIE9iamVjdDtcclxuICAgICAgICAgIGNvbnN0IGlkID0gYS5wYXlsb2FkLmRvYy5pZDtcclxuICAgICAgICAgIC8vIHVwZGF0ZSBpZFxyXG4gICAgICAgICAgZGF0YVsnaWQnXSA9IGlkO1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSkpLFxyXG4gICAgICAgIG1hcCgoaXRlbXMpID0+IF8uZmlsdGVyKGl0ZW1zLCBkb2MgPT4ge1xyXG4gICAgICAgICAgaWYgKCEhaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRvYy5pZCA9PT0gaWQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZG9jO1xyXG4gICAgICAgIH0pKVxyXG4gICAgICApXHJcbiAgICAgIC5waXBlKHRhcCgpLCBmaXJzdCgpKS50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0VG9DbGFzc09iamVjdChycywgb2JqZWN0LmNsYXNzKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgb2JqZWN0IGJ5IGlkXHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEBwYXJhbSBpZFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPElEZWZhdWx0TW9kZWxDb25zdHJ1Y3RvcltdPn1cclxuICAgKi9cclxuICBwcml2YXRlIGdldERCV2l0aElkKG9iamVjdCwgaWQ6IHN0cmluZyk6IFByb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yPiB7XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5kb2MoYCR7b2JqZWN0Lm5hbWV9LyR7aWR9YCk7XHJcbiAgICByZXR1cm4gY29sbGVjdGlvblxyXG4gICAgICAuc25hcHNob3RDaGFuZ2VzKClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKGEgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZGF0YSA9IGEucGF5bG9hZC5kYXRhKCkgYXMgT2JqZWN0O1xyXG4gICAgICAgICAgY29uc3QgaWQgPSBhLnBheWxvYWQuaWQ7XHJcbiAgICAgICAgICAvLyB1cGRhdGUgaWRcclxuICAgICAgICAgIGRhdGFbJ2lkJ10gPSBpZDtcclxuICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLnBpcGUodGFwKCksIGZpcnN0KCkpLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gdGhpcy5jb252ZXJ0VG9DbGFzc09iamVjdChbcnNdLCBvYmplY3QuY2xhc3MpO1xyXG4gICAgICAgIHJldHVybiBhcnJheS5sZW5ndGggPyBhcnJheVswXSA6IG51bGw7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY29udmVydCBkYXRhIHRvIGNsYXNzIG9iamVjdFxyXG4gICAqIEBwYXJhbSBkYXRhXHJcbiAgICogQHBhcmFtIG1vZGVsQ2xhc3NcclxuICAgKiBAcmV0dXJucyB7YW55W119XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb252ZXJ0VG9DbGFzc09iamVjdChkYXRhOiBhbnlbXSwgbW9kZWxDbGFzczogSURlZmF1bHRNb2RlbENvbnN0cnVjdG9yKTogSURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10ge1xyXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcclxuICAgIF8ubWFwKGRhdGEsICh4KSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vZGVsID0gbmV3IG1vZGVsQ2xhc3MoeCk7XHJcbiAgICAgIGFycmF5LnB1c2gobW9kZWwpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhhcnJheSk7XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjcmVhdGUgZG9jdW1lbnQsIHNldCBpZFxyXG4gICAqIEBwYXJhbSBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBjcmVhdGVXaXRoT2JqZWN0KG9iamVjdDogSURlZmF1bHRNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNyZWF0ZUlkKCk7XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKHRoaXMuZ2V0VGFibGUob2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUpKTtcclxuICAgIHJldHVybiBjb2xsZWN0aW9uLmRvYyhpZCkuc2V0KG9iamVjdC5nZXREYXRhKCkpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBvYmplY3QuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKGBDcmVhdGVkICR7b2JqZWN0LmNvbnN0cnVjdG9yLm5hbWV9YCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdXBkYXRlIGRvY3VtZW50XHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqL1xyXG4gIHVwZGF0ZVdpdGhPYmplY3Qob2JqZWN0OiBJRGVmYXVsdE1vZGVsKSB7XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKHRoaXMuZ2V0VGFibGUob2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUpKTtcclxuICAgIGNvbGxlY3Rpb24uZG9jKG9iamVjdC5pZCkudXBkYXRlKG9iamVjdC5nZXREYXRhKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IHRhYmxlIG5hbWUgZnJvbSBjbGFzcyBuYW1lXHJcbiAgICogQHBhcmFtIGNsYXNzTmFtZVxyXG4gICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICovXHJcbiAgZ2V0VGFibGUoY2xhc3NOYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBfLmZpbmQodGhpcy5UQUJMRVMsICh0YWJsZSkgPT4ge1xyXG4gICAgICByZXR1cm4gdGFibGUuY2xhc3MubmFtZSA9PT0gY2xhc3NOYW1lO1xyXG4gICAgfSkubmFtZTtcclxuICB9XHJcblxyXG4gIC8qPT09PT09PT1kZWxldGU9PT09PT09PT0qL1xyXG5cclxuICBkZWxldGVPcmRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLmRlbGV0ZVRhYmxlKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm9yZGVyXS5uYW1lKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZU9yZGVySXRlbSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlbGV0ZVRhYmxlKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm9yZGVyX2l0ZW1dLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlRGVsaXZlcnkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWxldGVUYWJsZSh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV0ubmFtZSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVEZWxpdmVyeVN0YXR1cygpIHtcclxuICAgIHJldHVybiB0aGlzLmRlbGV0ZVRhYmxlKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5XS5uYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRlbGV0ZSBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gbmFtZVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGVsZXRlVGFibGUobmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKG5hbWUpLmdldCgpLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKGFzeW5jIHJlcyA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICAgICAgcmVzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICBhcnJheS5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKF8ubWFwKGFycmF5LCBhc3luYyBlbGVtZW50ID0+IHtcclxuICAgICAgICAgIGF3YWl0IGVsZW1lbnQucmVmLmRlbGV0ZSgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYGRlbGV0ZSAke25hbWV9YCk7XHJcbiAgICAgICAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKGBkZWxldGUgJHtuYW1lfWApO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRQb2ludHNSZWFsVGltZShpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVhbFRpbWVEQigncG9pbnRzJywgaWQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVhbFRpbWVEQihuYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLl9Bbmd1bGFyRmlyZURhdGFiYXNlLmxpc3QoYCR7bmFtZX0vJHtpZH1gKS52YWx1ZUNoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIC8qYXV0aGVudGljYXRpb24qL1xyXG5cclxuICBzaWduVXAodXNlcjogQ3VzdG9tZXIpIHtcclxuICAgIHJldHVybiB0aGlzLl9Bbmd1bGFyRmlyZUF1dGguY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKHVzZXIuZW1haWwsIHVzZXIucGFzc3dvcmQpXHJcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICB3aW5kb3cuYWxlcnQoXCJZb3UgaGF2ZSBiZWVuIHN1Y2Nlc3NmdWxseSByZWdpc3RlcmVkIVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICB3aW5kb3cuYWxlcnQoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gU2lnbiBpbiB3aXRoIGVtYWlsL3Bhc3N3b3JkXHJcbiAgc2lnbkluKHVzZXI6IEN1c3RvbWVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQW5ndWxhckZpcmVBdXRoLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKHVzZXIuZW1haWwsIHVzZXIucGFzc3dvcmQpXHJcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnPCEtLSBlbnRlciB5b3VyIHJvdXRlIG5hbWUgaGVyZSAtLT4nXSk7XHJcbiAgICAgICAgcmV0dXJuIHVzZXI7XHJcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5hbGVydChlcnJvci5tZXNzYWdlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==