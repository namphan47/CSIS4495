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
import { QueryParamModel } from '../../constant/models/query-param-model';
import { Delivery, Delivery_Status } from '../../constant/models';
import { DeliveryStatusHistory } from '../../constant/models/delivery/delivery-status-history';
import { MapService } from '../map/map.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import moment from 'moment';
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
        })
            .then((rs) => {
            return Promise.all(_.map(rs, (d) => __awaiter(this, void 0, void 0, function* () {
                yield this.getOrderById(d.order_id)
                    .then((o) => {
                    d.order = o;
                });
                return Promise.resolve();
            })))
                .then(() => {
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
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getDBWithId(this.TABLES[ENUM_TABLES.order], id)
                .then((rs) => rs)
                .then((order) => __awaiter(this, void 0, void 0, function* () {
                order = order;
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
                return order;
            }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZmlyZWJhc2UvZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDckQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxRQUFRLEVBQUUsZUFBZSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0RBQXdELENBQUM7QUFDN0YsT0FBTyxFQUFDLFVBQVUsRUFB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O2dCQUV0Qyx5QkFBeUI7Z0JBQ3pCLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQztvQkFDdEQsTUFBTSxFQUFFLGVBQWUsQ0FBQyxPQUFPO29CQUMvQixXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUU7b0JBQ3hCLFNBQVMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7aUJBQzlCLENBQUMsQ0FBQztnQkFFSCxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQ3BEO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFO3FCQUNyQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckI7WUFFRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUU7aUJBQ3JCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQixDQUFDO0tBQUE7Q0FFRixDQUFBOztZQWxqQndDLGdCQUFnQjtZQUNiLG1CQUFtQjtZQUN0QixnQkFBZ0I7WUFDYixtQkFBbUI7WUFDNUIsVUFBVTtZQUNMLGVBQWU7OztBQXpDMUMsbUJBQW1CO0lBSC9CLFVBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7R0FDVyxtQkFBbUIsQ0FzbEIvQjtTQXRsQlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtBbmd1bGFyRmlyZXN0b3JlfSBmcm9tICdAYW5ndWxhci9maXJlL2ZpcmVzdG9yZSc7XHJcbmltcG9ydCB7Q3VzdG9tZXJ9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9jdXN0b21lci9jdXN0b21lcic7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7RHVtbXlEYXRhU2VydmljZX0gZnJvbSAnLi4vZGF0YS9kdW1teS1kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQge2ZpcnN0LCBtYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge0lEZWZhdWx0TW9kZWwsIElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2ktZGVmYXVsdC1tb2RlbCc7XHJcbmltcG9ydCB7UmVzdGF1cmFudH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL3Jlc3RhdXJhbnQvcmVzdGF1cmFudCc7XHJcbmltcG9ydCB7Q291cmllcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2NvdXJpZXIvY291cmllcic7XHJcbmltcG9ydCB7TWVhbH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL21lYWwvbWVhbCc7XHJcbmltcG9ydCB7RU5VTV9UQUJMRVN9IGZyb20gJy4uLy4uL2NvbnN0YW50L2NvbnN0LXZhbHVlJztcclxuaW1wb3J0IHtOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tICcuLi9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHtPcmRlckl0ZW19IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlcl9pdGVtL29yZGVyLWl0ZW0nO1xyXG5pbXBvcnQge09yZGVyfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvb3JkZXIvb3JkZXInO1xyXG5pbXBvcnQge1F1ZXJ5UGFyYW1Nb2RlbH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL3F1ZXJ5LXBhcmFtLW1vZGVsJztcclxuaW1wb3J0IHtEZWxpdmVyeSwgRGVsaXZlcnlfU3RhdHVzfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMnO1xyXG5pbXBvcnQge0RlbGl2ZXJ5U3RhdHVzSGlzdG9yeX0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2RlbGl2ZXJ5L2RlbGl2ZXJ5LXN0YXR1cy1oaXN0b3J5JztcclxuaW1wb3J0IHtNYXBTZXJ2aWNlfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQge0FuZ3VsYXJGaXJlRGF0YWJhc2V9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvZGF0YWJhc2UnO1xyXG5pbXBvcnQge0FuZ3VsYXJGaXJlQXV0aH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9hdXRoJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VEYXRhU2VydmljZSB7XHJcbiAgcmVhZG9ubHkgVEFCTEVTID0ge1xyXG4gICAgW0VOVU1fVEFCTEVTLmN1c3RvbWVyXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5jdXN0b21lcixcclxuICAgICAgY2xhc3M6IEN1c3RvbWVyXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLmNvdXJpZXJdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLmNvdXJpZXIsXHJcbiAgICAgIGNsYXNzOiBDb3VyaWVyXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLnJlc3RhdXJhbnQsXHJcbiAgICAgIGNsYXNzOiBSZXN0YXVyYW50XHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLm1lYWxdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLm1lYWwsXHJcbiAgICAgIGNsYXNzOiBNZWFsXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLm9yZGVyXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5vcmRlcixcclxuICAgICAgY2xhc3M6IE9yZGVyXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5XToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5kZWxpdmVyeSxcclxuICAgICAgY2xhc3M6IERlbGl2ZXJ5XHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLm9yZGVyX2l0ZW1dOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLm9yZGVyX2l0ZW0sXHJcbiAgICAgIGNsYXNzOiBPcmRlckl0ZW1cclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMuZGVsaXZlcnlfc3RhdHVzX2hpc3RvcnldOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5LFxyXG4gICAgICBjbGFzczogRGVsaXZlcnlTdGF0dXNIaXN0b3J5XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfQW5ndWxhckZpcmVzdG9yZTogQW5ndWxhckZpcmVzdG9yZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9Bbmd1bGFyRmlyZURhdGFiYXNlOiBBbmd1bGFyRmlyZURhdGFiYXNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX0R1bW15RGF0YVNlcnZpY2U6IER1bW15RGF0YVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfTm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9NYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX0FuZ3VsYXJGaXJlQXV0aDogQW5ndWxhckZpcmVBdXRoKSB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXNldCBEQlxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIHJlc2V0REIoKSB7XHJcbiAgICAvLyBkZWxldGUgdGFibGVzXHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbChfLm1hcCh0aGlzLlRBQkxFUywgYXN5bmMgKHgpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5kZWxldGVUYWJsZSh4Lm5hbWUpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIGFkZCB0YWJsZXNcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKF8ubWFwKHRoaXMuVEFCTEVTLCBhc3luYyAoeCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLmFkZERCKHgpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIGNvbnZlcnNlTWVhbFxyXG4gICAgYXdhaXQgdGhpcy5saW5rUmVzdGF1cmFudE1lYWxEQigpO1xyXG5cclxuICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoJ0FsbCBkYXRhIGlzIHJlc2V0ISEnKTtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGxpbmsgcmVzdGF1cmFudCBhbmQgbWVhbHMgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGxpbmtSZXN0YXVyYW50TWVhbERCKCkge1xyXG4gICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZSgnTGluayBSZXN0YXVyYW50ICYgTWVhbCBkYXRhJyk7XHJcbiAgICBhd2FpdCB0aGlzLmdldFJlc3RhdXJhbnQoKVxyXG4gICAgICAudGhlbigocmVzdGF1cmFudHMpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN0YXVyYW50cyk7XHJcbiAgICAgICAgdGhpcy5nZXRNZWFscygpXHJcbiAgICAgICAgICAudGhlbigobWVhbHMpID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVhbHMpO1xyXG4gICAgICAgICAgICBfLm1hcChyZXN0YXVyYW50cywgKHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN0YXVyYW50KTtcclxuICAgICAgICAgICAgICByZXN0YXVyYW50Lm1lYWxfaWRzID0gXy5tYXAoXy5maWx0ZXIobWVhbHMsIChtZWFsOiBNZWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudC5uYW1lID09PSBtZWFsLnJlc3RhdXJhbnRfbmFtZTtcclxuICAgICAgICAgICAgICB9KSwgeCA9PiB4LmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAuZG9jKHJlc3RhdXJhbnQuaWQpLnNldChyZXN0YXVyYW50LmdldERhdGEoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogYWRkIGRhdGEgb2YgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx1bmtub3duW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkREIob2JqZWN0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5fRHVtbXlEYXRhU2VydmljZS5jb252ZXJ0RHVtbXlEYXRhVG9Nb2RlbChvYmplY3QubmFtZSwgb2JqZWN0LmNsYXNzKVxyXG4gICAgICAudGhlbihhc3luYyAocnMpID0+IHtcclxuICAgICAgICBpZiAoIXJzKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGl0ZW1zQ29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbihvYmplY3QubmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKF8ubWFwKHJzLCBhc3luYyAoeCkgPT4ge1xyXG4gICAgICAgICAgYXdhaXQgaXRlbXNDb2xsZWN0aW9uLmFkZCh4LmdldERhdGEoKSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgYWRkICR7b2JqZWN0Lm5hbWV9YCk7XHJcbiAgICAgICAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKGBhZGQgJHtvYmplY3QubmFtZX1gKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGN1c3RvbWVyIGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDdXN0b21lcltdPn1cclxuICAgKi9cclxuICBnZXRDdXN0b21lcigpOiBQcm9taXNlPEN1c3RvbWVyW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmN1c3RvbWVyXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIEN1c3RvbWVyW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGN1c3RvbWVyIGJ5IGVtYWlsXHJcbiAgICogQHBhcmFtIGVtYWlsXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8Q3VzdG9tZXI+fVxyXG4gICAqL1xyXG4gIGdldEN1c3RvbWVyQnlFbWFpbChlbWFpbDogc3RyaW5nKTogUHJvbWlzZTxDdXN0b21lcj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q3VzdG9tZXIoKVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICByZXR1cm4gXy5maW5kKHJzLCB4ID0+IHguZW1haWwgPT09IGVtYWlsKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgY291cmllciBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8Q291cmllcltdPn1cclxuICAgKi9cclxuICBnZXRDb3VyaWVyKCk6IFByb21pc2U8Q291cmllcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jb3VyaWVyXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIENvdXJpZXJbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgZGVsaXZlcnkgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPERlbGl2ZXJ5W10+fVxyXG4gICAqL1xyXG4gIGdldERlbGl2ZXJpZXMoKTogUHJvbWlzZTxEZWxpdmVyeVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBEZWxpdmVyeVtdKVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXREZWxpdmVyeVN0YXR1c0hpc3RvcnkoKVxyXG4gICAgICAgICAgLnRoZW4oKGhpc3RvcmllcykgPT4ge1xyXG4gICAgICAgICAgICBfLm1hcChycywgKGRlbGl2ZXJ5OiBEZWxpdmVyeSkgPT4ge1xyXG4gICAgICAgICAgICAgIGRlbGl2ZXJ5LnNldFN0YXR1c0hpc3RvcnkoXy5maWx0ZXIoaGlzdG9yaWVzLCAoeDogRGVsaXZlcnlTdGF0dXNIaXN0b3J5KSA9PiB4LmRlbGl2ZXJ5X2lkID09PSBkZWxpdmVyeS5pZCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJzO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChfLm1hcChycywgYXN5bmMgKGQ6IERlbGl2ZXJ5KSA9PiB7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldE9yZGVyQnlJZChkLm9yZGVyX2lkKVxyXG4gICAgICAgICAgICAudGhlbigobykgPT4ge1xyXG4gICAgICAgICAgICAgIGQub3JkZXIgPSBvO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9KSlcclxuICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJzO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGVsaXZlcnlCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPERlbGl2ZXJ5PiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV0sIGlkKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgRGVsaXZlcnkpXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSgpXHJcbiAgICAgICAgICAudGhlbigoaGlzdG9yaWVzKSA9PiB7XHJcbiAgICAgICAgICAgIHJzLnNldFN0YXR1c0hpc3RvcnkoXy5maWx0ZXIoaGlzdG9yaWVzLCAoeDogRGVsaXZlcnlTdGF0dXNIaXN0b3J5KSA9PiB4LmRlbGl2ZXJ5X2lkID09PSBpZCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gcnM7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXREZWxpdmVyeVN0YXR1c0hpc3RvcnkoKTogUHJvbWlzZTxEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnlfc3RhdHVzX2hpc3RvcnldKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgRGVsaXZlcnlTdGF0dXNIaXN0b3J5W10pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0U3RhdHVzSGlzdG9yeU9mRGVsaXZlcnkocXVlcnlQYXJhbXM/OiBRdWVyeVBhcmFtTW9kZWxbXSk6IFByb21pc2U8RGVsaXZlcnlTdGF0dXNIaXN0b3J5W10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5XSwgcXVlcnlQYXJhbXMpXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgcmVzdGF1cmFudCBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8UmVzdGF1cmFudFtdPn1cclxuICAgKi9cclxuICBnZXRSZXN0YXVyYW50KCk6IFByb21pc2U8UmVzdGF1cmFudFtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5yZXN0YXVyYW50XSlcclxuICAgICAgLnRoZW4oKHJlc3RhdXJhbnRzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWVhbHMoKVxyXG4gICAgICAgICAgLnRoZW4oKG1lYWxzKSA9PiB7XHJcbiAgICAgICAgICAgIF8ubWFwKHJlc3RhdXJhbnRzLCAocmVzdGF1cmFudDogUmVzdGF1cmFudCkgPT4ge1xyXG4gICAgICAgICAgICAgIHJlc3RhdXJhbnQubWVhbHMgPSBfLmZpbHRlcihtZWFscywgKG1lYWw6IE1lYWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN0YXVyYW50Lm1lYWxfaWRzLmluZGV4T2YobWVhbC5pZCkgPj0gMDtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN0YXVyYW50cyBhcyB1bmtub3duIGFzIFJlc3RhdXJhbnRbXTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBtZWFscyBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8TWVhbFtdPn1cclxuICAgKi9cclxuICBnZXRNZWFscygpOiBQcm9taXNlPE1lYWxbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMubWVhbF0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBNZWFsW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IG9yZGVyIGl0ZW1zIGRhdGFcclxuICAgKiBAcGFyYW0gcXVlcnlQYXJhbXNcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNZWFsW10+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGdldE9yZGVySXRlbXMocXVlcnlQYXJhbXM/OiBRdWVyeVBhcmFtTW9kZWxbXSk6IFByb21pc2U8T3JkZXJJdGVtW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm9yZGVyX2l0ZW1dLCBxdWVyeVBhcmFtcylcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIE9yZGVySXRlbVtdKVxyXG4gICAgICAudGhlbigob3JkZXJJdGVtcykgPT4ge1xyXG4gICAgICAgIF8ubWFwKG9yZGVySXRlbXMsIGFzeW5jIChvcmRlckl0ZW06IE9yZGVySXRlbSkgPT4ge1xyXG4gICAgICAgICAgLy8gZ2V0IG1lYWxcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0REJXaXRoSWQodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMubWVhbF0sIG9yZGVySXRlbS5tZWFsX2lkKVxyXG4gICAgICAgICAgICAudGhlbigobWVhbCkgPT4ge1xyXG4gICAgICAgICAgICAgIG9yZGVySXRlbS5tZWFsID0gbWVhbCBhcyB1bmtub3duIGFzIE1lYWw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvcmRlckl0ZW1zO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvcmRlciBkZXRhaWxzXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8T3JkZXJbXT59XHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0T3JkZXJzKCk6IFByb21pc2U8T3JkZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgT3JkZXJbXSlcclxuICAgICAgLnRoZW4oKG9yZGVycykgPT4ge1xyXG4gICAgICAgIG9yZGVycyA9IG9yZGVycyBhcyB1bmtub3duIGFzIE9yZGVyW107XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKF8ubWFwKG9yZGVycywgYXN5bmMgKG9yZGVyOiBPcmRlcikgPT4ge1xyXG5cclxuICAgICAgICAgIC8vIGdldCBjdXN0b21lciBvZiBlYWNoIG9yZGVyXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmN1c3RvbWVyXSwgb3JkZXIuY3VzdG9tZXJfaWQpXHJcbiAgICAgICAgICAgIC50aGVuKChjdXN0b21lcikgPT4ge1xyXG4gICAgICAgICAgICAgIG9yZGVyLmN1c3RvbWVyID0gY3VzdG9tZXIgYXMgdW5rbm93biBhcyBDdXN0b21lcjtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gZ2V0IGl0ZW0gb2YgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXRPcmRlckl0ZW1zKFtuZXcgUXVlcnlQYXJhbU1vZGVsKCdvcmRlcl9pZCcsIFF1ZXJ5UGFyYW1Nb2RlbC5PUEVSQVRJT05TLkVRVUFMLCBvcmRlci5pZCldKVxyXG4gICAgICAgICAgICAudGhlbigoaXRlbXMpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5pdGVtcyA9IGl0ZW1zIGFzIHVua25vd24gYXMgT3JkZXJJdGVtW107XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIGdldCByZXN0YXVyYW50IGZvciBlYWNoIG9yZGVyXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdLCBvcmRlci5yZXN0YXVyYW50X2lkKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdGF1cmFudCkgPT4ge1xyXG4gICAgICAgICAgICAgIG9yZGVyLnJlc3RhdXJhbnQgPSByZXN0YXVyYW50IGFzIHVua25vd24gYXMgUmVzdGF1cmFudDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfSkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG9yZGVycztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0T3JkZXJCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPE9yZGVyPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl0sIGlkKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgT3JkZXIpXHJcbiAgICAgIC50aGVuKGFzeW5jIChvcmRlcikgPT4ge1xyXG4gICAgICAgIG9yZGVyID0gb3JkZXIgYXMgdW5rbm93biBhcyBPcmRlcjtcclxuXHJcbiAgICAgICAgLy8gZ2V0IGN1c3RvbWVyIG9mIGVhY2ggb3JkZXJcclxuICAgICAgICBhd2FpdCB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmN1c3RvbWVyXSwgb3JkZXIuY3VzdG9tZXJfaWQpXHJcbiAgICAgICAgICAudGhlbigoY3VzdG9tZXIpID0+IHtcclxuICAgICAgICAgICAgb3JkZXIuY3VzdG9tZXIgPSBjdXN0b21lciBhcyB1bmtub3duIGFzIEN1c3RvbWVyO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGdldCBpdGVtIG9mIGVhY2ggb3JkZXJcclxuICAgICAgICBhd2FpdCB0aGlzLmdldE9yZGVySXRlbXMoW25ldyBRdWVyeVBhcmFtTW9kZWwoJ29yZGVyX2lkJywgUXVlcnlQYXJhbU1vZGVsLk9QRVJBVElPTlMuRVFVQUwsIG9yZGVyLmlkKV0pXHJcbiAgICAgICAgICAudGhlbigoaXRlbXMpID0+IHtcclxuICAgICAgICAgICAgb3JkZXIuaXRlbXMgPSBpdGVtcyBhcyB1bmtub3duIGFzIE9yZGVySXRlbVtdO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGdldCByZXN0YXVyYW50IGZvciBlYWNoIG9yZGVyXHJcbiAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5yZXN0YXVyYW50XSwgb3JkZXIucmVzdGF1cmFudF9pZClcclxuICAgICAgICAgIC50aGVuKChyZXN0YXVyYW50KSA9PiB7XHJcbiAgICAgICAgICAgIG9yZGVyLnJlc3RhdXJhbnQgPSByZXN0YXVyYW50IGFzIHVua25vd24gYXMgUmVzdGF1cmFudDtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gb3JkZXI7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0REIob2JqZWN0LCBxdWVyeVBhcmFtcz86IFF1ZXJ5UGFyYW1Nb2RlbFtdLCBpZD86IHN0cmluZyk6IFByb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+IHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24ob2JqZWN0Lm5hbWUsIHJlZiA9PiB7XHJcbiAgICAgIGxldCBuZXdSZWYgPSBudWxsO1xyXG4gICAgICBpZiAoISFxdWVyeVBhcmFtcykge1xyXG4gICAgICAgIF8ubWFwKHF1ZXJ5UGFyYW1zLCAoeDogUXVlcnlQYXJhbU1vZGVsKSA9PiB7XHJcbiAgICAgICAgICBuZXdSZWYgPSBuZXdSZWYgPyBuZXdSZWYud2hlcmUoeC5rZXksIHgub3BlcmF0aW9uLCB4LnZhbHVlKSA6IHJlZi53aGVyZSh4LmtleSwgeC5vcGVyYXRpb24sIHgudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXdSZWYgfHwgcmVmO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb25cclxuICAgICAgLnNuYXBzaG90Q2hhbmdlcygpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChpdGVtcyA9PiBpdGVtcy5tYXAoYSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYS5wYXlsb2FkLmRvYy5kYXRhKCkgYXMgT2JqZWN0O1xyXG4gICAgICAgICAgY29uc3QgaWQgPSBhLnBheWxvYWQuZG9jLmlkO1xyXG4gICAgICAgICAgLy8gdXBkYXRlIGlkXHJcbiAgICAgICAgICBkYXRhWydpZCddID0gaWQ7XHJcbiAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KSksXHJcbiAgICAgICAgbWFwKChpdGVtcykgPT4gXy5maWx0ZXIoaXRlbXMsIGRvYyA9PiB7XHJcbiAgICAgICAgICBpZiAoISFpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jLmlkID09PSBpZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBkb2M7XHJcbiAgICAgICAgfSkpXHJcbiAgICAgIClcclxuICAgICAgLnBpcGUodGFwKCksIGZpcnN0KCkpLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb0NsYXNzT2JqZWN0KHJzLCBvYmplY3QuY2xhc3MpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvYmplY3QgYnkgaWRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0REJXaXRoSWQob2JqZWN0LCBpZDogc3RyaW5nKTogUHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3I+IHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmRvYyhgJHtvYmplY3QubmFtZX0vJHtpZH1gKTtcclxuICAgIHJldHVybiBjb2xsZWN0aW9uXHJcbiAgICAgIC5zbmFwc2hvdENoYW5nZXMoKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoYSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYS5wYXlsb2FkLmRhdGEoKSBhcyBPYmplY3Q7XHJcbiAgICAgICAgICBjb25zdCBpZCA9IGEucGF5bG9hZC5pZDtcclxuICAgICAgICAgIC8vIHVwZGF0ZSBpZFxyXG4gICAgICAgICAgZGF0YVsnaWQnXSA9IGlkO1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAucGlwZSh0YXAoKSwgZmlyc3QoKSkudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSB0aGlzLmNvbnZlcnRUb0NsYXNzT2JqZWN0KFtyc10sIG9iamVjdC5jbGFzcyk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5Lmxlbmd0aCA/IGFycmF5WzBdIDogbnVsbDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjb252ZXJ0IGRhdGEgdG8gY2xhc3Mgb2JqZWN0XHJcbiAgICogQHBhcmFtIGRhdGFcclxuICAgKiBAcGFyYW0gbW9kZWxDbGFzc1xyXG4gICAqIEByZXR1cm5zIHthbnlbXX1cclxuICAgKi9cclxuICBwcml2YXRlIGNvbnZlcnRUb0NsYXNzT2JqZWN0KGRhdGE6IGFueVtdLCBtb2RlbENsYXNzOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3IpOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXSB7XHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgXy5tYXAoZGF0YSwgKHgpID0+IHtcclxuICAgICAgY29uc3QgbW9kZWwgPSBuZXcgbW9kZWxDbGFzcyh4KTtcclxuICAgICAgYXJyYXkucHVzaChtb2RlbCk7XHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuICAgIHJldHVybiBhcnJheTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBkb2N1bWVudCwgc2V0IGlkXHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGNyZWF0ZVdpdGhPYmplY3Qob2JqZWN0OiBJRGVmYXVsdE1vZGVsKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY3JlYXRlSWQoKTtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5nZXRUYWJsZShvYmplY3QuY29uc3RydWN0b3IubmFtZSkpO1xyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uZG9jKGlkKS5zZXQob2JqZWN0LmdldERhdGEoKSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIG9iamVjdC5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYENyZWF0ZWQgJHtvYmplY3QuY29uc3RydWN0b3IubmFtZX1gKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB1cGRhdGUgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICovXHJcbiAgdXBkYXRlV2l0aE9iamVjdChvYmplY3Q6IElEZWZhdWx0TW9kZWwpIHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5nZXRUYWJsZShvYmplY3QuY29uc3RydWN0b3IubmFtZSkpO1xyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uZG9jKG9iamVjdC5pZCkudXBkYXRlKG9iamVjdC5nZXREYXRhKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IHRhYmxlIG5hbWUgZnJvbSBjbGFzcyBuYW1lXHJcbiAgICogQHBhcmFtIGNsYXNzTmFtZVxyXG4gICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICovXHJcbiAgZ2V0VGFibGUoY2xhc3NOYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBfLmZpbmQodGhpcy5UQUJMRVMsICh0YWJsZSkgPT4ge1xyXG4gICAgICByZXR1cm4gdGFibGUuY2xhc3MubmFtZSA9PT0gY2xhc3NOYW1lO1xyXG4gICAgfSkubmFtZTtcclxuICB9XHJcblxyXG4gIC8qPT09PT09PT1kZWxldGU9PT09PT09PT0qL1xyXG5cclxuICBkZWxldGVPcmRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLmRlbGV0ZVRhYmxlKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm9yZGVyXS5uYW1lKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZU9yZGVySXRlbSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlbGV0ZVRhYmxlKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm9yZGVyX2l0ZW1dLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlRGVsaXZlcnkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWxldGVUYWJsZSh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV0ubmFtZSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVEZWxpdmVyeVN0YXR1cygpIHtcclxuICAgIHJldHVybiB0aGlzLmRlbGV0ZVRhYmxlKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5XS5uYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRlbGV0ZSBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gbmFtZVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGVsZXRlVGFibGUobmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKG5hbWUpLmdldCgpLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKGFzeW5jIHJlcyA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICAgICAgcmVzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICBhcnJheS5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKF8ubWFwKGFycmF5LCBhc3luYyBlbGVtZW50ID0+IHtcclxuICAgICAgICAgIGF3YWl0IGVsZW1lbnQucmVmLmRlbGV0ZSgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYGRlbGV0ZSAke25hbWV9YCk7XHJcbiAgICAgICAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKGBkZWxldGUgJHtuYW1lfWApO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRQb2ludHNSZWFsVGltZShpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVhbFRpbWVEQigncG9pbnRzJywgaWQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVhbFRpbWVEQihuYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLl9Bbmd1bGFyRmlyZURhdGFiYXNlLmxpc3QoYCR7bmFtZX0vJHtpZH1gKS52YWx1ZUNoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIC8qYXV0aGVudGljYXRpb24qL1xyXG5cclxuICAvKipcclxuICAgKiBTaWduIGluIHdpdGggZW1haWwvcGFzc3dvcmRcclxuICAgKiBAcGFyYW0gdXNlclxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fVxyXG4gICAqL1xyXG4gIGFzeW5jIHNpZ25VcCh1c2VyOiBDdXN0b21lcikge1xyXG5cclxuICAgIGNvbnN0IGdlb1BvaW50ID0gYXdhaXQgdGhpcy5fTWFwU2VydmljZS5nZXRMYXRMbmdGcm9tQWRkcmVzcyh1c2VyLmFkZHJlc3MpO1xyXG4gICAgdXNlci5sYXQgPSBnZW9Qb2ludC5sYXQoKTtcclxuICAgIHVzZXIubG5nID0gZ2VvUG9pbnQubG5nKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX0FuZ3VsYXJGaXJlQXV0aC5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQodXNlci5lbWFpbCwgdXNlci5wYXNzd29yZClcclxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIC8vIGNyZWF0ZSBjdXN0b21lciBvYmplY3RcclxuICAgICAgICBkZWxldGUgdXNlci5wYXNzd29yZDtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVXaXRoT2JqZWN0KHVzZXIpXHJcbiAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5hbGVydChlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2lnbiBpbiB3aXRoIGVtYWlsL3Bhc3N3b3JkXHJcbiAgICogQHBhcmFtIHVzZXJcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDdXN0b21lcj59XHJcbiAgICovXHJcbiAgc2lnbkluKHVzZXI6IEN1c3RvbWVyKTogUHJvbWlzZTxDdXN0b21lcj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX0FuZ3VsYXJGaXJlQXV0aC5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCh1c2VyLmVtYWlsLCB1c2VyLnBhc3N3b3JkKVxyXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDdXN0b21lckJ5RW1haWwodXNlci5lbWFpbCk7XHJcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5hbGVydChlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgcmFuZG9tXHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICogQHJldHVybnMge2FueSB8IG51bGwgfCBudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0UmFuZG9tKHZhbHVlOiBhbnlbXSB8IG51bWJlcik6IGFueSB7XHJcbiAgICBpZiAoIWlzTmFOKE51bWJlcih2YWx1ZSkpKSB7XHJcbiAgICAgIHJldHVybiBfLnJhbmRvbSgwLCB2YWx1ZSkgKyAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZSBhcyB1bmtub3duIGFzIGFueVtdO1xyXG4gICAgICByZXR1cm4gdmFsdWVbXy5yYW5kb20oMCwgdmFsdWUubGVuZ3RoIC0gMSldO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2hlY2tvdXRcclxuICAgKiBAcGFyYW0gY3VzdG9tZXJcclxuICAgKiBAcGFyYW0gcmVzdGF1cmFudFxyXG4gICAqIEBwYXJhbSBvcmRlckl0ZW1zXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgY2hlY2tvdXQoY3VzdG9tZXI6IEN1c3RvbWVyLCByZXN0YXVyYW50OiBSZXN0YXVyYW50LCBvcmRlckl0ZW1zOiBPcmRlckl0ZW1bXSkge1xyXG4gICAgbGV0IGRlbGl2ZXJ5O1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY291cmllcjogQ291cmllciA9IHRoaXMuZ2V0UmFuZG9tKGF3YWl0IHRoaXMuZ2V0Q291cmllcigpKTtcclxuXHJcbiAgICAgIC8vIGNyZWF0ZSBvcmRlclxyXG4gICAgICBjb25zdCBvcmRlciA9IG5ldyBPcmRlcih7XHJcbiAgICAgICAgZGF0ZV90aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgICByZXN0YXVyYW50X2lkOiByZXN0YXVyYW50LmlkLFxyXG4gICAgICAgIGN1c3RvbWVyX2lkOiBjdXN0b21lci5pZFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGF3YWl0IHRoaXMuY3JlYXRlV2l0aE9iamVjdChvcmRlcik7XHJcblxyXG4gICAgICAvLyBjcmVhdGUgb3JkZXIgaXRlbXNcclxuICAgICAgXy5tYXAob3JkZXJJdGVtcywgYXN5bmMgeCA9PiB7XHJcbiAgICAgICAgeC5vcmRlcl9pZCA9IG9yZGVyLmlkO1xyXG4gICAgICAgIHgub3JkZXIgPSBvcmRlcjtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVdpdGhPYmplY3QoeCk7XHJcbiAgICAgICAgb3JkZXIudG90YWwgKz0geC5tZWFsLnByaWNlICogeC5xdWFudGl0eTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhd2FpdCB0aGlzLnVwZGF0ZVdpdGhPYmplY3Qob3JkZXIpO1xyXG5cclxuICAgICAgLy8gY3JlYXRlIGRlbGl2ZXJ5XHJcbiAgICAgIGRlbGl2ZXJ5ID0gbmV3IERlbGl2ZXJ5KFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBvaW50czogW10sXHJcbiAgICAgICAgICBjb3VyaWVyX2lkOiBjb3VyaWVyLmlkLFxyXG4gICAgICAgICAgb3JkZXJfaWQ6IG9yZGVyLmlkXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gYWRkIHBhdGhzXHJcbiAgICAgIGF3YWl0IHRoaXMuX01hcFNlcnZpY2UucmVuZGVyRGlyZWN0aW9uKG5ldyBnb29nbGUubWFwcy5MYXRMbmcoY291cmllci5sYXQsIGNvdXJpZXIubG5nKSwgbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhyZXN0YXVyYW50LmxhdCwgcmVzdGF1cmFudC5sbmcpKVxyXG4gICAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgICAgZGVsaXZlcnkucGF0aF90b19yZXN0YXVyYW50ID0gcnM7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICBhd2FpdCB0aGlzLl9NYXBTZXJ2aWNlLnJlbmRlckRpcmVjdGlvbihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHJlc3RhdXJhbnQubGF0LCByZXN0YXVyYW50LmxuZyksIG5ldyBnb29nbGUubWFwcy5MYXRMbmcoY3VzdG9tZXIubGF0LCBjdXN0b21lci5sbmcpKVxyXG4gICAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgICAgZGVsaXZlcnkucGF0aF90b19jdXN0b21lciA9IHJzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgYXdhaXQgdGhpcy5jcmVhdGVXaXRoT2JqZWN0KGRlbGl2ZXJ5KTtcclxuXHJcbiAgICAgIC8vIGNyZWF0ZSBkZWxpdmVyeSBzdGF0dXNcclxuICAgICAgY29uc3QgZGVsaXZlcnlTdGF0dXNIaXN0b3J5ID0gbmV3IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSh7XHJcbiAgICAgICAgc3RhdHVzOiBEZWxpdmVyeV9TdGF0dXMuT1JERVJFRCxcclxuICAgICAgICBkZWxpdmVyeV9pZDogZGVsaXZlcnkuaWQsXHJcbiAgICAgICAgZGF0ZV90aW1lOiBtb21lbnQoKS52YWx1ZU9mKClcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhd2FpdCB0aGlzLmNyZWF0ZVdpdGhPYmplY3QoZGVsaXZlcnlTdGF0dXNIaXN0b3J5KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4gbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgIC50aGVuKCgpID0+IGRlbGl2ZXJ5KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==