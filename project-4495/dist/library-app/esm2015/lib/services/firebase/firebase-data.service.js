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
import { Delivery, Delivery_Status } from "../../constant/models";
import { DeliveryStatusHistory } from "../../constant/models/delivery/delivery-status-history";
import { MapService } from "../map/map.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import moment from "moment";
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
     * get customer by email
     * @param email
     * @returns {Promise<Customer>}
     */
    getCustomerByEmail(email) {
        return this.getCustomer()
            .then((rs) => {
            return _.find(rs, x => x.email === email);
        });
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
        return collection.doc(object.id).update(object.getData());
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
    /**
     * Sign in with email/password
     * @param user
     * @returns {Promise<boolean>}
     */
    signUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const geoPoint = yield this._MapService.getLatLngFromAddress(user.address);
            user.lat = geoPoint.lat();
            user.lng = geoPoint.lng();
            return this._AngularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
                .then((result) => {
                // create customer object
                delete user.password;
                return this.createWithObject(user)
                    .then(() => {
                    return true;
                });
            }).catch((error) => {
                window.alert(error.message);
                return false;
            });
        });
    }
    /**
     * Sign in with email/password
     * @param user
     * @returns {Promise<Customer>}
     */
    signIn(user) {
        return this._AngularFireAuth.signInWithEmailAndPassword(user.email, user.password)
            .then((result) => {
            // console.log(result);
            return this.getCustomerByEmail(user.email);
        }).catch((error) => {
            window.alert(error.message);
            return null;
        });
    }
    /**
     * get random
     * @param value
     * @returns {any | null | number}
     */
    getRandom(value) {
        if (!isNaN(Number(value))) {
            return _.random(0, value) + 1;
        }
        else {
            value = value;
            return value[_.random(0, value.length - 1)];
        }
        return null;
    }
    /**
     * checkout
     * @param customer
     * @param restaurant
     * @param orderItems
     * @returns {Promise<void>}
     */
    checkout(customer, restaurant, orderItems) {
        return __awaiter(this, void 0, void 0, function* () {
            let delivery;
            try {
                const courier = this.getRandom(yield this.getCourier());
                // create order
                const order = new Order({
                    date_time: new Date().getTime(),
                    restaurant_id: restaurant.id,
                    customer_id: customer.id
                });
                yield this.createWithObject(order);
                // create order items
                _.map(orderItems, (x) => __awaiter(this, void 0, void 0, function* () {
                    x.order_id = order.id;
                    x.order = order;
                    yield this.createWithObject(x);
                    order.total += x.meal.price * x.quantity;
                }));
                yield this.updateWithObject(order);
                // create delivery
                delivery = new Delivery({
                    points: [],
                    courier_id: courier.id,
                    order_id: order.id
                });
                // add paths
                yield this._MapService.renderDirection(new google.maps.LatLng(courier.lat, courier.lng), new google.maps.LatLng(restaurant.lat, restaurant.lng))
                    .then((rs) => {
                    delivery.path_to_restaurant = rs;
                });
                yield this._MapService.renderDirection(new google.maps.LatLng(restaurant.lat, restaurant.lng), new google.maps.LatLng(customer.lat, customer.lng))
                    .then((rs) => {
                    delivery.path_to_customer = rs;
                });
                yield this.createWithObject(delivery);
                // create delivery status
                const deliveryStatusHistory = new DeliveryStatusHistory({
                    status: Delivery_Status.ORDERED,
                    delivery_id: delivery.id,
                    date_time: moment().valueOf()
                });
                yield this.createWithObject(deliveryStatusHistory);
            }
            catch (e) {
                return Promise.resolve()
                    .then(() => null);
            }
            return Promise.resolve()
                .then(() => delivery);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZmlyZWJhc2UvZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDckQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxRQUFRLEVBQUUsZUFBZSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0RBQXdELENBQUM7QUFDN0YsT0FBTyxFQUFDLFVBQVUsRUFB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Q0FBQTs7WUExZ0J3QyxnQkFBZ0I7WUFDYixtQkFBbUI7WUFDdEIsZ0JBQWdCO1lBQ2IsbUJBQW1CO1lBQzVCLFVBQVU7WUFDTCxlQUFlOzs7QUF6QzFDLG1CQUFtQjtJQUgvQixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0dBQ1csbUJBQW1CLENBOGlCL0I7U0E5aUJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7QW5ndWxhckZpcmVzdG9yZX0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9maXJlc3RvcmUnO1xyXG5pbXBvcnQge0N1c3RvbWVyfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvY3VzdG9tZXIvY3VzdG9tZXInO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQge0R1bW15RGF0YVNlcnZpY2V9IGZyb20gJy4uL2RhdGEvZHVtbXktZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHtmaXJzdCwgbWFwLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtJRGVmYXVsdE1vZGVsLCBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3J9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9pLWRlZmF1bHQtbW9kZWwnO1xyXG5pbXBvcnQge1Jlc3RhdXJhbnR9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnQnO1xyXG5pbXBvcnQge0NvdXJpZXJ9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9jb3VyaWVyL2NvdXJpZXInO1xyXG5pbXBvcnQge01lYWx9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9tZWFsL21lYWwnO1xyXG5pbXBvcnQge0VOVU1fVEFCTEVTfSBmcm9tICcuLi8uLi9jb25zdGFudC9jb25zdC12YWx1ZSc7XHJcbmltcG9ydCB7Tm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnLi4vbWljcy9ub3RpZmljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7T3JkZXJJdGVtfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvb3JkZXJfaXRlbS9vcmRlci1pdGVtJztcclxuaW1wb3J0IHtPcmRlcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyL29yZGVyJztcclxuaW1wb3J0IHtRdWVyeVBhcmFtTW9kZWx9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvcXVlcnktcGFyYW0tbW9kZWxcIjtcclxuaW1wb3J0IHtEZWxpdmVyeSwgRGVsaXZlcnlfU3RhdHVzfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzXCI7XHJcbmltcG9ydCB7RGVsaXZlcnlTdGF0dXNIaXN0b3J5fSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL2RlbGl2ZXJ5L2RlbGl2ZXJ5LXN0YXR1cy1oaXN0b3J5XCI7XHJcbmltcG9ydCB7TWFwU2VydmljZX0gZnJvbSBcIi4uL21hcC9tYXAuc2VydmljZVwiO1xyXG5pbXBvcnQge0FuZ3VsYXJGaXJlRGF0YWJhc2V9IGZyb20gXCJAYW5ndWxhci9maXJlL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7QW5ndWxhckZpcmVBdXRofSBmcm9tIFwiQGFuZ3VsYXIvZmlyZS9hdXRoXCI7XHJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VEYXRhU2VydmljZSB7XHJcbiAgcmVhZG9ubHkgVEFCTEVTID0ge1xyXG4gICAgW0VOVU1fVEFCTEVTLmN1c3RvbWVyXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5jdXN0b21lcixcclxuICAgICAgY2xhc3M6IEN1c3RvbWVyXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLmNvdXJpZXJdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLmNvdXJpZXIsXHJcbiAgICAgIGNsYXNzOiBDb3VyaWVyXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLnJlc3RhdXJhbnQsXHJcbiAgICAgIGNsYXNzOiBSZXN0YXVyYW50XHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLm1lYWxdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLm1lYWwsXHJcbiAgICAgIGNsYXNzOiBNZWFsXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLm9yZGVyXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5vcmRlcixcclxuICAgICAgY2xhc3M6IE9yZGVyXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5XToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5kZWxpdmVyeSxcclxuICAgICAgY2xhc3M6IERlbGl2ZXJ5XHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLm9yZGVyX2l0ZW1dOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLm9yZGVyX2l0ZW0sXHJcbiAgICAgIGNsYXNzOiBPcmRlckl0ZW1cclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMuZGVsaXZlcnlfc3RhdHVzX2hpc3RvcnldOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5LFxyXG4gICAgICBjbGFzczogRGVsaXZlcnlTdGF0dXNIaXN0b3J5XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfQW5ndWxhckZpcmVzdG9yZTogQW5ndWxhckZpcmVzdG9yZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9Bbmd1bGFyRmlyZURhdGFiYXNlOiBBbmd1bGFyRmlyZURhdGFiYXNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX0R1bW15RGF0YVNlcnZpY2U6IER1bW15RGF0YVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfTm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9NYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX0FuZ3VsYXJGaXJlQXV0aDogQW5ndWxhckZpcmVBdXRoKSB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXNldCBEQlxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIHJlc2V0REIoKSB7XHJcbiAgICAvLyBkZWxldGUgdGFibGVzXHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbChfLm1hcCh0aGlzLlRBQkxFUywgYXN5bmMgKHgpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5kZWxldGVUYWJsZSh4Lm5hbWUpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIGFkZCB0YWJsZXNcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKF8ubWFwKHRoaXMuVEFCTEVTLCBhc3luYyAoeCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLmFkZERCKHgpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIGNvbnZlcnNlTWVhbFxyXG4gICAgYXdhaXQgdGhpcy5saW5rUmVzdGF1cmFudE1lYWxEQigpO1xyXG5cclxuICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoJ0FsbCBkYXRhIGlzIHJlc2V0ISEnKTtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGxpbmsgcmVzdGF1cmFudCBhbmQgbWVhbHMgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGxpbmtSZXN0YXVyYW50TWVhbERCKCkge1xyXG4gICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZSgnTGluayBSZXN0YXVyYW50ICYgTWVhbCBkYXRhJyk7XHJcbiAgICBhd2FpdCB0aGlzLmdldFJlc3RhdXJhbnQoKVxyXG4gICAgICAudGhlbigocmVzdGF1cmFudHMpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN0YXVyYW50cyk7XHJcbiAgICAgICAgdGhpcy5nZXRNZWFscygpXHJcbiAgICAgICAgICAudGhlbigobWVhbHMpID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVhbHMpO1xyXG4gICAgICAgICAgICBfLm1hcChyZXN0YXVyYW50cywgKHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN0YXVyYW50KTtcclxuICAgICAgICAgICAgICByZXN0YXVyYW50Lm1lYWxfaWRzID0gXy5tYXAoXy5maWx0ZXIobWVhbHMsIChtZWFsOiBNZWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudC5uYW1lID09PSBtZWFsLnJlc3RhdXJhbnRfbmFtZTtcclxuICAgICAgICAgICAgICB9KSwgeCA9PiB4LmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAuZG9jKHJlc3RhdXJhbnQuaWQpLnNldChyZXN0YXVyYW50LmdldERhdGEoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGFkZCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dW5rbm93bltdPn1cclxuICAgKi9cclxuICBwcml2YXRlIGFkZERCKG9iamVjdCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX0R1bW15RGF0YVNlcnZpY2UuY29udmVydER1bW15RGF0YVRvTW9kZWwob2JqZWN0Lm5hbWUsIG9iamVjdC5jbGFzcylcclxuICAgICAgLnRoZW4oYXN5bmMgKHJzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFycykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpdGVtc0NvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24ob2JqZWN0Lm5hbWUpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChfLm1hcChycywgYXN5bmMgKHgpID0+IHtcclxuICAgICAgICAgIGF3YWl0IGl0ZW1zQ29sbGVjdGlvbi5hZGQoeC5nZXREYXRhKCkpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYGFkZCAke29iamVjdC5uYW1lfWApO1xyXG4gICAgICAgICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShgYWRkICR7b2JqZWN0Lm5hbWV9YCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBjdXN0b21lciBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8Q3VzdG9tZXJbXT59XHJcbiAgICovXHJcbiAgZ2V0Q3VzdG9tZXIoKTogUHJvbWlzZTxDdXN0b21lcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jdXN0b21lcl0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBDdXN0b21lcltdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBjdXN0b21lciBieSBlbWFpbFxyXG4gICAqIEBwYXJhbSBlbWFpbFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEN1c3RvbWVyPn1cclxuICAgKi9cclxuICBnZXRDdXN0b21lckJ5RW1haWwoZW1haWw6IHN0cmluZyk6IFByb21pc2U8Q3VzdG9tZXI+IHtcclxuICAgIHJldHVybiB0aGlzLmdldEN1c3RvbWVyKClcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIF8uZmluZChycywgeCA9PiB4LmVtYWlsID09PSBlbWFpbCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGNvdXJpZXIgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPENvdXJpZXJbXT59XHJcbiAgICovXHJcbiAgZ2V0Q291cmllcigpOiBQcm9taXNlPENvdXJpZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuY291cmllcl0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBDb3VyaWVyW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGRlbGl2ZXJ5IGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxEZWxpdmVyeVtdPn1cclxuICAgKi9cclxuICBnZXREZWxpdmVyaWVzKCk6IFByb21pc2U8RGVsaXZlcnlbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnldKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgRGVsaXZlcnlbXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVsaXZlcnlTdGF0dXNIaXN0b3J5KClcclxuICAgICAgICAgIC50aGVuKChoaXN0b3JpZXMpID0+IHtcclxuICAgICAgICAgICAgXy5tYXAocnMsIChkZWxpdmVyeTogRGVsaXZlcnkpID0+IHtcclxuICAgICAgICAgICAgICBkZWxpdmVyeS5zZXRTdGF0dXNIaXN0b3J5KF8uZmlsdGVyKGhpc3RvcmllcywgKHg6IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSkgPT4geC5kZWxpdmVyeV9pZCA9PT0gZGVsaXZlcnkuaWQpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBycztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldERlbGl2ZXJ5QnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxEZWxpdmVyeT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REJXaXRoSWQodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnldLCBpZClcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIERlbGl2ZXJ5KVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXREZWxpdmVyeVN0YXR1c0hpc3RvcnkoKVxyXG4gICAgICAgICAgLnRoZW4oKGhpc3RvcmllcykgPT4ge1xyXG4gICAgICAgICAgICBycy5zZXRTdGF0dXNIaXN0b3J5KF8uZmlsdGVyKGhpc3RvcmllcywgKHg6IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSkgPT4geC5kZWxpdmVyeV9pZCA9PT0gaWQpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJzO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGVsaXZlcnlTdGF0dXNIaXN0b3J5KCk6IFByb21pc2U8RGVsaXZlcnlTdGF0dXNIaXN0b3J5W10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5XSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFN0YXR1c0hpc3RvcnlPZkRlbGl2ZXJ5KHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10pOiBQcm9taXNlPERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV9zdGF0dXNfaGlzdG9yeV0sIHF1ZXJ5UGFyYW1zKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgRGVsaXZlcnlTdGF0dXNIaXN0b3J5W10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IHJlc3RhdXJhbnQgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3RhdXJhbnRbXT59XHJcbiAgICovXHJcbiAgZ2V0UmVzdGF1cmFudCgpOiBQcm9taXNlPFJlc3RhdXJhbnRbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMucmVzdGF1cmFudF0pXHJcbiAgICAgIC50aGVuKChyZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1lYWxzKClcclxuICAgICAgICAgIC50aGVuKChtZWFscykgPT4ge1xyXG4gICAgICAgICAgICBfLm1hcChyZXN0YXVyYW50cywgKHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICByZXN0YXVyYW50Lm1lYWxzID0gXy5maWx0ZXIobWVhbHMsIChtZWFsOiBNZWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudC5tZWFsX2lkcy5pbmRleE9mKG1lYWwuaWQpID49IDA7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudHMgYXMgdW5rbm93biBhcyBSZXN0YXVyYW50W107XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgbWVhbHMgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE1lYWxbXT59XHJcbiAgICovXHJcbiAgZ2V0TWVhbHMoKTogUHJvbWlzZTxNZWFsW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm1lYWxdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgTWVhbFtdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvcmRlciBpdGVtcyBkYXRhXHJcbiAgICogQHBhcmFtIHF1ZXJ5UGFyYW1zXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8TWVhbFtdPn1cclxuICAgKi9cclxuICBhc3luYyBnZXRPcmRlckl0ZW1zKHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10pOiBQcm9taXNlPE9yZGVySXRlbVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl9pdGVtXSwgcXVlcnlQYXJhbXMpXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBPcmRlckl0ZW1bXSlcclxuICAgICAgLnRoZW4oKG9yZGVySXRlbXMpID0+IHtcclxuICAgICAgICBfLm1hcChvcmRlckl0ZW1zLCBhc3luYyAob3JkZXJJdGVtOiBPcmRlckl0ZW0pID0+IHtcclxuICAgICAgICAgIC8vIGdldCBtZWFsXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm1lYWxdLCBvcmRlckl0ZW0ubWVhbF9pZClcclxuICAgICAgICAgICAgLnRoZW4oKG1lYWwpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlckl0ZW0ubWVhbCA9IG1lYWwgYXMgdW5rbm93biBhcyBNZWFsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gb3JkZXJJdGVtcztcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgb3JkZXIgZGV0YWlsc1xyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE9yZGVyW10+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGdldE9yZGVycygpOiBQcm9taXNlPE9yZGVyW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm9yZGVyXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIE9yZGVyW10pXHJcbiAgICAgIC50aGVuKChvcmRlcnMpID0+IHtcclxuICAgICAgICBvcmRlcnMgPSBvcmRlcnMgYXMgdW5rbm93biBhcyBPcmRlcltdO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChfLm1hcChvcmRlcnMsIGFzeW5jIChvcmRlcjogT3JkZXIpID0+IHtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgY3VzdG9tZXIgb2YgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jdXN0b21lcl0sIG9yZGVyLmN1c3RvbWVyX2lkKVxyXG4gICAgICAgICAgICAudGhlbigoY3VzdG9tZXIpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5jdXN0b21lciA9IGN1c3RvbWVyIGFzIHVua25vd24gYXMgQ3VzdG9tZXI7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIGdldCBpdGVtIG9mIGVhY2ggb3JkZXJcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0T3JkZXJJdGVtcyhbbmV3IFF1ZXJ5UGFyYW1Nb2RlbCgnb3JkZXJfaWQnLCBRdWVyeVBhcmFtTW9kZWwuT1BFUkFUSU9OUy5FUVVBTCwgb3JkZXIuaWQpXSlcclxuICAgICAgICAgICAgLnRoZW4oKGl0ZW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgb3JkZXIuaXRlbXMgPSBpdGVtcyBhcyB1bmtub3duIGFzIE9yZGVySXRlbVtdO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgcmVzdGF1cmFudCBmb3IgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5yZXN0YXVyYW50XSwgb3JkZXIucmVzdGF1cmFudF9pZClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5yZXN0YXVyYW50ID0gcmVzdGF1cmFudCBhcyB1bmtub3duIGFzIFJlc3RhdXJhbnQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBvcmRlcnM7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0REIob2JqZWN0LCBxdWVyeVBhcmFtcz86IFF1ZXJ5UGFyYW1Nb2RlbFtdLCBpZD86IHN0cmluZyk6IFByb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+IHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24ob2JqZWN0Lm5hbWUsIHJlZiA9PiB7XHJcbiAgICAgIGxldCBuZXdSZWYgPSBudWxsO1xyXG4gICAgICBpZiAoISFxdWVyeVBhcmFtcykge1xyXG4gICAgICAgIF8ubWFwKHF1ZXJ5UGFyYW1zLCAoeDogUXVlcnlQYXJhbU1vZGVsKSA9PiB7XHJcbiAgICAgICAgICBuZXdSZWYgPSBuZXdSZWYgPyBuZXdSZWYud2hlcmUoeC5rZXksIHgub3BlcmF0aW9uLCB4LnZhbHVlKSA6IHJlZi53aGVyZSh4LmtleSwgeC5vcGVyYXRpb24sIHgudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXdSZWYgfHwgcmVmO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb25cclxuICAgICAgLnNuYXBzaG90Q2hhbmdlcygpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChpdGVtcyA9PiBpdGVtcy5tYXAoYSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYS5wYXlsb2FkLmRvYy5kYXRhKCkgYXMgT2JqZWN0O1xyXG4gICAgICAgICAgY29uc3QgaWQgPSBhLnBheWxvYWQuZG9jLmlkO1xyXG4gICAgICAgICAgLy8gdXBkYXRlIGlkXHJcbiAgICAgICAgICBkYXRhWydpZCddID0gaWQ7XHJcbiAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KSksXHJcbiAgICAgICAgbWFwKChpdGVtcykgPT4gXy5maWx0ZXIoaXRlbXMsIGRvYyA9PiB7XHJcbiAgICAgICAgICBpZiAoISFpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jLmlkID09PSBpZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBkb2M7XHJcbiAgICAgICAgfSkpXHJcbiAgICAgIClcclxuICAgICAgLnBpcGUodGFwKCksIGZpcnN0KCkpLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb0NsYXNzT2JqZWN0KHJzLCBvYmplY3QuY2xhc3MpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvYmplY3QgYnkgaWRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0REJXaXRoSWQob2JqZWN0LCBpZDogc3RyaW5nKTogUHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3I+IHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmRvYyhgJHtvYmplY3QubmFtZX0vJHtpZH1gKTtcclxuICAgIHJldHVybiBjb2xsZWN0aW9uXHJcbiAgICAgIC5zbmFwc2hvdENoYW5nZXMoKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoYSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYS5wYXlsb2FkLmRhdGEoKSBhcyBPYmplY3Q7XHJcbiAgICAgICAgICBjb25zdCBpZCA9IGEucGF5bG9hZC5pZDtcclxuICAgICAgICAgIC8vIHVwZGF0ZSBpZFxyXG4gICAgICAgICAgZGF0YVsnaWQnXSA9IGlkO1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAucGlwZSh0YXAoKSwgZmlyc3QoKSkudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSB0aGlzLmNvbnZlcnRUb0NsYXNzT2JqZWN0KFtyc10sIG9iamVjdC5jbGFzcyk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5Lmxlbmd0aCA/IGFycmF5WzBdIDogbnVsbDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjb252ZXJ0IGRhdGEgdG8gY2xhc3Mgb2JqZWN0XHJcbiAgICogQHBhcmFtIGRhdGFcclxuICAgKiBAcGFyYW0gbW9kZWxDbGFzc1xyXG4gICAqIEByZXR1cm5zIHthbnlbXX1cclxuICAgKi9cclxuICBwcml2YXRlIGNvbnZlcnRUb0NsYXNzT2JqZWN0KGRhdGE6IGFueVtdLCBtb2RlbENsYXNzOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3IpOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXSB7XHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgXy5tYXAoZGF0YSwgKHgpID0+IHtcclxuICAgICAgY29uc3QgbW9kZWwgPSBuZXcgbW9kZWxDbGFzcyh4KTtcclxuICAgICAgYXJyYXkucHVzaChtb2RlbCk7XHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuICAgIHJldHVybiBhcnJheTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBkb2N1bWVudCwgc2V0IGlkXHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGNyZWF0ZVdpdGhPYmplY3Qob2JqZWN0OiBJRGVmYXVsdE1vZGVsKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY3JlYXRlSWQoKTtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5nZXRUYWJsZShvYmplY3QuY29uc3RydWN0b3IubmFtZSkpO1xyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uZG9jKGlkKS5zZXQob2JqZWN0LmdldERhdGEoKSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIG9iamVjdC5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYENyZWF0ZWQgJHtvYmplY3QuY29uc3RydWN0b3IubmFtZX1gKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB1cGRhdGUgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICovXHJcbiAgdXBkYXRlV2l0aE9iamVjdChvYmplY3Q6IElEZWZhdWx0TW9kZWwpIHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5nZXRUYWJsZShvYmplY3QuY29uc3RydWN0b3IubmFtZSkpO1xyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uZG9jKG9iamVjdC5pZCkudXBkYXRlKG9iamVjdC5nZXREYXRhKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IHRhYmxlIG5hbWUgZnJvbSBjbGFzcyBuYW1lXHJcbiAgICogQHBhcmFtIGNsYXNzTmFtZVxyXG4gICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICovXHJcbiAgZ2V0VGFibGUoY2xhc3NOYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBfLmZpbmQodGhpcy5UQUJMRVMsICh0YWJsZSkgPT4ge1xyXG4gICAgICByZXR1cm4gdGFibGUuY2xhc3MubmFtZSA9PT0gY2xhc3NOYW1lO1xyXG4gICAgfSkubmFtZTtcclxuICB9XHJcblxyXG4gIC8qPT09PT09PT1kZWxldGU9PT09PT09PT0qL1xyXG5cclxuICBkZWxldGVPcmRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLmRlbGV0ZVRhYmxlKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm9yZGVyXS5uYW1lKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZU9yZGVySXRlbSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlbGV0ZVRhYmxlKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm9yZGVyX2l0ZW1dLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlRGVsaXZlcnkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWxldGVUYWJsZSh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV0ubmFtZSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVEZWxpdmVyeVN0YXR1cygpIHtcclxuICAgIHJldHVybiB0aGlzLmRlbGV0ZVRhYmxlKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5XS5uYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRlbGV0ZSBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gbmFtZVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGVsZXRlVGFibGUobmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKG5hbWUpLmdldCgpLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKGFzeW5jIHJlcyA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICAgICAgcmVzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICBhcnJheS5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKF8ubWFwKGFycmF5LCBhc3luYyBlbGVtZW50ID0+IHtcclxuICAgICAgICAgIGF3YWl0IGVsZW1lbnQucmVmLmRlbGV0ZSgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYGRlbGV0ZSAke25hbWV9YCk7XHJcbiAgICAgICAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKGBkZWxldGUgJHtuYW1lfWApO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRQb2ludHNSZWFsVGltZShpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVhbFRpbWVEQigncG9pbnRzJywgaWQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVhbFRpbWVEQihuYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLl9Bbmd1bGFyRmlyZURhdGFiYXNlLmxpc3QoYCR7bmFtZX0vJHtpZH1gKS52YWx1ZUNoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIC8qYXV0aGVudGljYXRpb24qL1xyXG5cclxuICAvKipcclxuICAgKiBTaWduIGluIHdpdGggZW1haWwvcGFzc3dvcmRcclxuICAgKiBAcGFyYW0gdXNlclxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxyXG4gICAqL1xyXG4gIGFzeW5jIHNpZ25VcCh1c2VyOiBDdXN0b21lcikge1xyXG5cclxuICAgIGNvbnN0IGdlb1BvaW50ID0gYXdhaXQgdGhpcy5fTWFwU2VydmljZS5nZXRMYXRMbmdGcm9tQWRkcmVzcyh1c2VyLmFkZHJlc3MpO1xyXG4gICAgdXNlci5sYXQgPSBnZW9Qb2ludC5sYXQoKTtcclxuICAgIHVzZXIubG5nID0gZ2VvUG9pbnQubG5nKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX0FuZ3VsYXJGaXJlQXV0aC5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQodXNlci5lbWFpbCwgdXNlci5wYXNzd29yZClcclxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIC8vIGNyZWF0ZSBjdXN0b21lciBvYmplY3RcclxuICAgICAgICBkZWxldGUgdXNlci5wYXNzd29yZDtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVXaXRoT2JqZWN0KHVzZXIpXHJcbiAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5hbGVydChlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2lnbiBpbiB3aXRoIGVtYWlsL3Bhc3N3b3JkXHJcbiAgICogQHBhcmFtIHVzZXJcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDdXN0b21lcj59XHJcbiAgICovXHJcbiAgc2lnbkluKHVzZXI6IEN1c3RvbWVyKTogUHJvbWlzZTxDdXN0b21lcj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX0FuZ3VsYXJGaXJlQXV0aC5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCh1c2VyLmVtYWlsLCB1c2VyLnBhc3N3b3JkKVxyXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDdXN0b21lckJ5RW1haWwodXNlci5lbWFpbCk7XHJcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5hbGVydChlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgcmFuZG9tXHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICogQHJldHVybnMge2FueSB8IG51bGwgfCBudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0UmFuZG9tKHZhbHVlOiBhbnlbXSB8IG51bWJlcik6IGFueSB7XHJcbiAgICBpZiAoIWlzTmFOKE51bWJlcih2YWx1ZSkpKSB7XHJcbiAgICAgIHJldHVybiBfLnJhbmRvbSgwLCB2YWx1ZSkgKyAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZSBhcyB1bmtub3duIGFzIGFueVtdO1xyXG4gICAgICByZXR1cm4gdmFsdWVbXy5yYW5kb20oMCwgdmFsdWUubGVuZ3RoIC0gMSldO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2hlY2tvdXRcclxuICAgKiBAcGFyYW0gY3VzdG9tZXJcclxuICAgKiBAcGFyYW0gcmVzdGF1cmFudFxyXG4gICAqIEBwYXJhbSBvcmRlckl0ZW1zXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgY2hlY2tvdXQoY3VzdG9tZXI6IEN1c3RvbWVyLCByZXN0YXVyYW50OiBSZXN0YXVyYW50LCBvcmRlckl0ZW1zOiBPcmRlckl0ZW1bXSkge1xyXG4gICAgbGV0IGRlbGl2ZXJ5O1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY291cmllcjogQ291cmllciA9IHRoaXMuZ2V0UmFuZG9tKGF3YWl0IHRoaXMuZ2V0Q291cmllcigpKTtcclxuXHJcbiAgICAgIC8vIGNyZWF0ZSBvcmRlclxyXG4gICAgICBjb25zdCBvcmRlciA9IG5ldyBPcmRlcih7XHJcbiAgICAgICAgZGF0ZV90aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgICByZXN0YXVyYW50X2lkOiByZXN0YXVyYW50LmlkLFxyXG4gICAgICAgIGN1c3RvbWVyX2lkOiBjdXN0b21lci5pZFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGF3YWl0IHRoaXMuY3JlYXRlV2l0aE9iamVjdChvcmRlcik7XHJcblxyXG4gICAgICAvLyBjcmVhdGUgb3JkZXIgaXRlbXNcclxuICAgICAgXy5tYXAob3JkZXJJdGVtcywgYXN5bmMgeCA9PiB7XHJcbiAgICAgICAgeC5vcmRlcl9pZCA9IG9yZGVyLmlkO1xyXG4gICAgICAgIHgub3JkZXIgPSBvcmRlcjtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVdpdGhPYmplY3QoeCk7XHJcbiAgICAgICAgb3JkZXIudG90YWwgKz0geC5tZWFsLnByaWNlICogeC5xdWFudGl0eTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhd2FpdCB0aGlzLnVwZGF0ZVdpdGhPYmplY3Qob3JkZXIpO1xyXG5cclxuICAgICAgLy8gY3JlYXRlIGRlbGl2ZXJ5XHJcbiAgICAgIGRlbGl2ZXJ5ID0gbmV3IERlbGl2ZXJ5KFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBvaW50czogW10sXHJcbiAgICAgICAgICBjb3VyaWVyX2lkOiBjb3VyaWVyLmlkLFxyXG4gICAgICAgICAgb3JkZXJfaWQ6IG9yZGVyLmlkXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gYWRkIHBhdGhzXHJcbiAgICAgIGF3YWl0IHRoaXMuX01hcFNlcnZpY2UucmVuZGVyRGlyZWN0aW9uKG5ldyBnb29nbGUubWFwcy5MYXRMbmcoY291cmllci5sYXQsIGNvdXJpZXIubG5nKSwgbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhyZXN0YXVyYW50LmxhdCwgcmVzdGF1cmFudC5sbmcpKVxyXG4gICAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgICAgZGVsaXZlcnkucGF0aF90b19yZXN0YXVyYW50ID0gcnM7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICBhd2FpdCB0aGlzLl9NYXBTZXJ2aWNlLnJlbmRlckRpcmVjdGlvbihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHJlc3RhdXJhbnQubGF0LCByZXN0YXVyYW50LmxuZyksIG5ldyBnb29nbGUubWFwcy5MYXRMbmcoY3VzdG9tZXIubGF0LCBjdXN0b21lci5sbmcpKVxyXG4gICAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgICAgZGVsaXZlcnkucGF0aF90b19jdXN0b21lciA9IHJzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgYXdhaXQgdGhpcy5jcmVhdGVXaXRoT2JqZWN0KGRlbGl2ZXJ5KTtcclxuXHJcbiAgICAgIC8vIGNyZWF0ZSBkZWxpdmVyeSBzdGF0dXNcclxuICAgICAgY29uc3QgZGVsaXZlcnlTdGF0dXNIaXN0b3J5ID0gbmV3IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSh7XHJcbiAgICAgICAgc3RhdHVzOiBEZWxpdmVyeV9TdGF0dXMuT1JERVJFRCxcclxuICAgICAgICBkZWxpdmVyeV9pZDogZGVsaXZlcnkuaWQsXHJcbiAgICAgICAgZGF0ZV90aW1lOiBtb21lbnQoKS52YWx1ZU9mKClcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhd2FpdCB0aGlzLmNyZWF0ZVdpdGhPYmplY3QoZGVsaXZlcnlTdGF0dXNIaXN0b3J5KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4gbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgIC50aGVuKCgpID0+IGRlbGl2ZXJ5KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==