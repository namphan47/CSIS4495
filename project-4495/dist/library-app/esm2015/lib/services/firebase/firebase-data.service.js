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
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/firestore";
import * as i2 from "../data/dummy-data.service";
import * as i3 from "../mics/notification.service";
let FirebaseDataService = class FirebaseDataService {
    constructor(_AngularFirestore, _DummyDataService, _NotificationService) {
        this._AngularFirestore = _AngularFirestore;
        this._DummyDataService = _DummyDataService;
        this._NotificationService = _NotificationService;
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
                _.map(orders, (order) => __awaiter(this, void 0, void 0, function* () {
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
                }));
                return orders;
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
    /**
     * delete data of collection
     * @param name
     * @returns {Promise<void>}
     */
    deleteTable(name) {
        return this._AngularFirestore.collection(name).get().toPromise()
            .then(res => {
            return res.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                yield element.ref.delete();
                console.log(`delete ${name}`);
                this._NotificationService.pushMessage(`delete ${name}`);
            }));
        });
    }
};
FirebaseDataService.ctorParameters = () => [
    { type: AngularFirestore },
    { type: DummyDataService },
    { type: NotificationService }
];
FirebaseDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function FirebaseDataService_Factory() { return new FirebaseDataService(i0.ɵɵinject(i1.AngularFirestore), i0.ɵɵinject(i2.DummyDataService), i0.ɵɵinject(i3.NotificationService)); }, token: FirebaseDataService, providedIn: "root" });
FirebaseDataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FirebaseDataService);
export { FirebaseDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZmlyZWJhc2UvZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDckQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQzs7Ozs7QUFLN0YsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxt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QUFZO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUU7YUFDN0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1YsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQU0sT0FBTyxFQUFDLEVBQUU7Z0JBQ2pDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FHRixDQUFBOztZQTNWd0MsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNiLG1CQUFtQjs7O0FBdENsRCxtQkFBbUI7SUFIL0IsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLG1CQUFtQixDQStYL0I7U0EvWFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtBbmd1bGFyRmlyZXN0b3JlfSBmcm9tICdAYW5ndWxhci9maXJlL2ZpcmVzdG9yZSc7XHJcbmltcG9ydCB7Q3VzdG9tZXJ9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9jdXN0b21lci9jdXN0b21lcic7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7RHVtbXlEYXRhU2VydmljZX0gZnJvbSAnLi4vZGF0YS9kdW1teS1kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQge2ZpcnN0LCBtYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge0lEZWZhdWx0TW9kZWwsIElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2ktZGVmYXVsdC1tb2RlbCc7XHJcbmltcG9ydCB7UmVzdGF1cmFudH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL3Jlc3RhdXJhbnQvcmVzdGF1cmFudCc7XHJcbmltcG9ydCB7Q291cmllcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2NvdXJpZXIvY291cmllcic7XHJcbmltcG9ydCB7TWVhbH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL21lYWwvbWVhbCc7XHJcbmltcG9ydCB7RU5VTV9UQUJMRVN9IGZyb20gJy4uLy4uL2NvbnN0YW50L2NvbnN0LXZhbHVlJztcclxuaW1wb3J0IHtOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tICcuLi9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHtPcmRlckl0ZW19IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlcl9pdGVtL29yZGVyLWl0ZW0nO1xyXG5pbXBvcnQge09yZGVyfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvb3JkZXIvb3JkZXInO1xyXG5pbXBvcnQge1F1ZXJ5UGFyYW1Nb2RlbH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9xdWVyeS1wYXJhbS1tb2RlbFwiO1xyXG5pbXBvcnQge0RlbGl2ZXJ5fSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzXCI7XHJcbmltcG9ydCB7RGVsaXZlcnlTdGF0dXNIaXN0b3J5fSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL2RlbGl2ZXJ5L2RlbGl2ZXJ5LXN0YXR1cy1oaXN0b3J5XCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZURhdGFTZXJ2aWNlIHtcclxuICByZWFkb25seSBUQUJMRVMgPSB7XHJcbiAgICBbRU5VTV9UQUJMRVMuY3VzdG9tZXJdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLmN1c3RvbWVyLFxyXG4gICAgICBjbGFzczogQ3VzdG9tZXJcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMuY291cmllcl06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMuY291cmllcixcclxuICAgICAgY2xhc3M6IENvdXJpZXJcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMucmVzdGF1cmFudF06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMucmVzdGF1cmFudCxcclxuICAgICAgY2xhc3M6IFJlc3RhdXJhbnRcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMubWVhbF06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMubWVhbCxcclxuICAgICAgY2xhc3M6IE1lYWxcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMub3JkZXJdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLm9yZGVyLFxyXG4gICAgICBjbGFzczogT3JkZXJcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMuZGVsaXZlcnldOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLmRlbGl2ZXJ5LFxyXG4gICAgICBjbGFzczogRGVsaXZlcnlcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMub3JkZXJfaXRlbV06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMub3JkZXJfaXRlbSxcclxuICAgICAgY2xhc3M6IE9yZGVySXRlbVxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5kZWxpdmVyeV9zdGF0dXNfaGlzdG9yeV06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMuZGVsaXZlcnlfc3RhdHVzX2hpc3RvcnksXHJcbiAgICAgIGNsYXNzOiBEZWxpdmVyeVN0YXR1c0hpc3RvcnlcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9Bbmd1bGFyRmlyZXN0b3JlOiBBbmd1bGFyRmlyZXN0b3JlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX0R1bW15RGF0YVNlcnZpY2U6IER1bW15RGF0YVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfTm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmVzZXQgREJcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyByZXNldERCKCkge1xyXG4gICAgLy8gZGVsZXRlIHRhYmxlc1xyXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXy5tYXAodGhpcy5UQUJMRVMsIGFzeW5jICh4KSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuZGVsZXRlVGFibGUoeC5uYW1lKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvLyBhZGQgdGFibGVzXHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbChfLm1hcCh0aGlzLlRBQkxFUywgYXN5bmMgKHgpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5hZGREQih4KTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvLyBjb252ZXJzZU1lYWxcclxuICAgIGF3YWl0IHRoaXMubGlua1Jlc3RhdXJhbnRNZWFsREIoKTtcclxuXHJcbiAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKCdBbGwgZGF0YSBpcyByZXNldCEhJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBsaW5rIHJlc3RhdXJhbnQgYW5kIG1lYWxzIGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyBsaW5rUmVzdGF1cmFudE1lYWxEQigpIHtcclxuICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoJ0xpbmsgUmVzdGF1cmFudCAmIE1lYWwgZGF0YScpO1xyXG4gICAgYXdhaXQgdGhpcy5nZXRSZXN0YXVyYW50KClcclxuICAgICAgLnRoZW4oKHJlc3RhdXJhbnRzKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdGF1cmFudHMpO1xyXG4gICAgICAgIHRoaXMuZ2V0TWVhbHMoKVxyXG4gICAgICAgICAgLnRoZW4oKG1lYWxzKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lYWxzKTtcclxuICAgICAgICAgICAgXy5tYXAocmVzdGF1cmFudHMsIChyZXN0YXVyYW50OiBSZXN0YXVyYW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdGF1cmFudCk7XHJcbiAgICAgICAgICAgICAgcmVzdGF1cmFudC5tZWFsX2lkcyA9IF8ubWFwKF8uZmlsdGVyKG1lYWxzLCAobWVhbDogTWVhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3RhdXJhbnQubmFtZSA9PT0gbWVhbC5yZXN0YXVyYW50X25hbWU7XHJcbiAgICAgICAgICAgICAgfSksIHggPT4geC5pZCk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5yZXN0YXVyYW50XS5uYW1lKVxyXG4gICAgICAgICAgICAgICAgLmRvYyhyZXN0YXVyYW50LmlkKS5zZXQocmVzdGF1cmFudC5nZXREYXRhKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBhZGQgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHVua25vd25bXT59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGREQihvYmplY3QpIHtcclxuICAgIHJldHVybiB0aGlzLl9EdW1teURhdGFTZXJ2aWNlLmNvbnZlcnREdW1teURhdGFUb01vZGVsKG9iamVjdC5uYW1lLCBvYmplY3QuY2xhc3MpXHJcbiAgICAgIC50aGVuKGFzeW5jIChycykgPT4ge1xyXG4gICAgICAgIGlmICghcnMpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaXRlbXNDb2xsZWN0aW9uID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKG9iamVjdC5uYW1lKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwoXy5tYXAocnMsIGFzeW5jICh4KSA9PiB7XHJcbiAgICAgICAgICBhd2FpdCBpdGVtc0NvbGxlY3Rpb24uYWRkKHguZ2V0RGF0YSgpKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBhZGQgJHtvYmplY3QubmFtZX1gKTtcclxuICAgICAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYGFkZCAke29iamVjdC5uYW1lfWApO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgY3VzdG9tZXIgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEN1c3RvbWVyW10+fVxyXG4gICAqL1xyXG4gIGdldEN1c3RvbWVyKCk6IFByb21pc2U8Q3VzdG9tZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuY3VzdG9tZXJdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgQ3VzdG9tZXJbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgY291cmllciBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8Q291cmllcltdPn1cclxuICAgKi9cclxuICBnZXRDb3VyaWVyKCk6IFByb21pc2U8Q291cmllcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jb3VyaWVyXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIENvdXJpZXJbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgZGVsaXZlcnkgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPERlbGl2ZXJ5W10+fVxyXG4gICAqL1xyXG4gIGdldERlbGl2ZXJpZXMoKTogUHJvbWlzZTxEZWxpdmVyeVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBEZWxpdmVyeVtdKVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXREZWxpdmVyeVN0YXR1c0hpc3RvcnkoKVxyXG4gICAgICAgICAgLnRoZW4oKGhpc3RvcmllcykgPT4ge1xyXG4gICAgICAgICAgICBfLm1hcChycywgKGRlbGl2ZXJ5OiBEZWxpdmVyeSkgPT4ge1xyXG4gICAgICAgICAgICAgIGRlbGl2ZXJ5LnNldFN0YXR1c0hpc3RvcnkoXy5maWx0ZXIoaGlzdG9yaWVzLCAoeDogRGVsaXZlcnlTdGF0dXNIaXN0b3J5KSA9PiB4LmRlbGl2ZXJ5X2lkID09PSBkZWxpdmVyeS5pZCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJzO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXREZWxpdmVyeVN0YXR1c0hpc3RvcnkoKTogUHJvbWlzZTxEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnlfc3RhdHVzX2hpc3RvcnldKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgRGVsaXZlcnlTdGF0dXNIaXN0b3J5W10pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0U3RhdHVzSGlzdG9yeU9mRGVsaXZlcnkocXVlcnlQYXJhbXM/OiBRdWVyeVBhcmFtTW9kZWxbXSk6IFByb21pc2U8RGVsaXZlcnlTdGF0dXNIaXN0b3J5W10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5XSwgcXVlcnlQYXJhbXMpXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgcmVzdGF1cmFudCBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8UmVzdGF1cmFudFtdPn1cclxuICAgKi9cclxuICBnZXRSZXN0YXVyYW50KCk6IFByb21pc2U8UmVzdGF1cmFudFtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5yZXN0YXVyYW50XSlcclxuICAgICAgLnRoZW4oKHJlc3RhdXJhbnRzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWVhbHMoKVxyXG4gICAgICAgICAgLnRoZW4oKG1lYWxzKSA9PiB7XHJcbiAgICAgICAgICAgIF8ubWFwKHJlc3RhdXJhbnRzLCAocmVzdGF1cmFudDogUmVzdGF1cmFudCkgPT4ge1xyXG4gICAgICAgICAgICAgIHJlc3RhdXJhbnQubWVhbHMgPSBfLmZpbHRlcihtZWFscywgKG1lYWw6IE1lYWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN0YXVyYW50Lm1lYWxfaWRzLmluZGV4T2YobWVhbC5pZCkgPj0gMDtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN0YXVyYW50cyBhcyB1bmtub3duIGFzIFJlc3RhdXJhbnRbXTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBtZWFscyBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8TWVhbFtdPn1cclxuICAgKi9cclxuICBnZXRNZWFscygpOiBQcm9taXNlPE1lYWxbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMubWVhbF0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBNZWFsW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IG9yZGVyIGl0ZW1zIGRhdGFcclxuICAgKiBAcGFyYW0gcXVlcnlQYXJhbXNcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNZWFsW10+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGdldE9yZGVySXRlbXMocXVlcnlQYXJhbXM/OiBRdWVyeVBhcmFtTW9kZWxbXSk6IFByb21pc2U8T3JkZXJJdGVtW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm9yZGVyX2l0ZW1dLCBxdWVyeVBhcmFtcylcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIE9yZGVySXRlbVtdKVxyXG4gICAgICAudGhlbigob3JkZXJJdGVtcykgPT4ge1xyXG4gICAgICAgIF8ubWFwKG9yZGVySXRlbXMsIGFzeW5jIChvcmRlckl0ZW06IE9yZGVySXRlbSkgPT4ge1xyXG4gICAgICAgICAgLy8gZ2V0IG1lYWxcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0REJXaXRoSWQodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMubWVhbF0sIG9yZGVySXRlbS5tZWFsX2lkKVxyXG4gICAgICAgICAgICAudGhlbigobWVhbCkgPT4ge1xyXG4gICAgICAgICAgICAgIG9yZGVySXRlbS5tZWFsID0gbWVhbCBhcyB1bmtub3duIGFzIE1lYWw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvcmRlckl0ZW1zO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvcmRlciBkZXRhaWxzXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8T3JkZXJbXT59XHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0T3JkZXJzKCk6IFByb21pc2U8T3JkZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgT3JkZXJbXSlcclxuICAgICAgLnRoZW4oKG9yZGVycykgPT4ge1xyXG4gICAgICAgIG9yZGVycyA9IG9yZGVycyBhcyB1bmtub3duIGFzIE9yZGVyW11cclxuICAgICAgICBfLm1hcChvcmRlcnMsIGFzeW5jIChvcmRlcjogT3JkZXIpID0+IHtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgY3VzdG9tZXIgb2YgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jdXN0b21lcl0sIG9yZGVyLmN1c3RvbWVyX2lkKVxyXG4gICAgICAgICAgICAudGhlbigoY3VzdG9tZXIpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5jdXN0b21lciA9IGN1c3RvbWVyIGFzIHVua25vd24gYXMgQ3VzdG9tZXI7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIGdldCBpdGVtIG9mIGVhY2ggb3JkZXJcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0T3JkZXJJdGVtcyhbbmV3IFF1ZXJ5UGFyYW1Nb2RlbCgnb3JkZXJfaWQnLCBRdWVyeVBhcmFtTW9kZWwuT1BFUkFUSU9OUy5FUVVBTCwgb3JkZXIuaWQpXSlcclxuICAgICAgICAgICAgLnRoZW4oKGl0ZW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgb3JkZXIuaXRlbXMgPSBpdGVtcyBhcyB1bmtub3duIGFzIE9yZGVySXRlbVtdO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgcmVzdGF1cmFudCBmb3IgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5yZXN0YXVyYW50XSwgb3JkZXIucmVzdGF1cmFudF9pZClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5yZXN0YXVyYW50ID0gcmVzdGF1cmFudCBhcyB1bmtub3duIGFzIFJlc3RhdXJhbnQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gb3JkZXJzO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0REIob2JqZWN0LCBxdWVyeVBhcmFtcz86IFF1ZXJ5UGFyYW1Nb2RlbFtdLCBpZD86IHN0cmluZyk6IFByb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+IHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24ob2JqZWN0Lm5hbWUsIHJlZiA9PiB7XHJcbiAgICAgIGxldCBuZXdSZWYgPSBudWxsO1xyXG4gICAgICBpZiAoISFxdWVyeVBhcmFtcykge1xyXG4gICAgICAgIF8ubWFwKHF1ZXJ5UGFyYW1zLCAoeDogUXVlcnlQYXJhbU1vZGVsKSA9PiB7XHJcbiAgICAgICAgICBuZXdSZWYgPSBuZXdSZWYgPyBuZXdSZWYud2hlcmUoeC5rZXksIHgub3BlcmF0aW9uLCB4LnZhbHVlKSA6IHJlZi53aGVyZSh4LmtleSwgeC5vcGVyYXRpb24sIHgudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXdSZWYgfHwgcmVmO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb25cclxuICAgICAgLnNuYXBzaG90Q2hhbmdlcygpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChpdGVtcyA9PiBpdGVtcy5tYXAoYSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYS5wYXlsb2FkLmRvYy5kYXRhKCkgYXMgT2JqZWN0O1xyXG4gICAgICAgICAgY29uc3QgaWQgPSBhLnBheWxvYWQuZG9jLmlkO1xyXG4gICAgICAgICAgLy8gdXBkYXRlIGlkXHJcbiAgICAgICAgICBkYXRhWydpZCddID0gaWQ7XHJcbiAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KSksXHJcbiAgICAgICAgbWFwKChpdGVtcykgPT4gXy5maWx0ZXIoaXRlbXMsIGRvYyA9PiB7XHJcbiAgICAgICAgICBpZiAoISFpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jLmlkID09PSBpZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBkb2M7XHJcbiAgICAgICAgfSkpXHJcbiAgICAgIClcclxuICAgICAgLnBpcGUodGFwKCksIGZpcnN0KCkpLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb0NsYXNzT2JqZWN0KHJzLCBvYmplY3QuY2xhc3MpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvYmplY3QgYnkgaWRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0REJXaXRoSWQob2JqZWN0LCBpZDogc3RyaW5nKTogUHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3I+IHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmRvYyhgJHtvYmplY3QubmFtZX0vJHtpZH1gKTtcclxuICAgIHJldHVybiBjb2xsZWN0aW9uXHJcbiAgICAgIC5zbmFwc2hvdENoYW5nZXMoKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoYSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYS5wYXlsb2FkLmRhdGEoKSBhcyBPYmplY3Q7XHJcbiAgICAgICAgICBjb25zdCBpZCA9IGEucGF5bG9hZC5pZDtcclxuICAgICAgICAgIC8vIHVwZGF0ZSBpZFxyXG4gICAgICAgICAgZGF0YVsnaWQnXSA9IGlkO1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAucGlwZSh0YXAoKSwgZmlyc3QoKSkudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSB0aGlzLmNvbnZlcnRUb0NsYXNzT2JqZWN0KFtyc10sIG9iamVjdC5jbGFzcyk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5Lmxlbmd0aCA/IGFycmF5WzBdIDogbnVsbDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjb252ZXJ0IGRhdGEgdG8gY2xhc3Mgb2JqZWN0XHJcbiAgICogQHBhcmFtIGRhdGFcclxuICAgKiBAcGFyYW0gbW9kZWxDbGFzc1xyXG4gICAqIEByZXR1cm5zIHthbnlbXX1cclxuICAgKi9cclxuICBwcml2YXRlIGNvbnZlcnRUb0NsYXNzT2JqZWN0KGRhdGE6IGFueVtdLCBtb2RlbENsYXNzOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3IpOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXSB7XHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgXy5tYXAoZGF0YSwgKHgpID0+IHtcclxuICAgICAgY29uc3QgbW9kZWwgPSBuZXcgbW9kZWxDbGFzcyh4KTtcclxuICAgICAgYXJyYXkucHVzaChtb2RlbCk7XHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuICAgIHJldHVybiBhcnJheTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBkb2N1bWVudCwgc2V0IGlkXHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGNyZWF0ZVdpdGhPYmplY3Qob2JqZWN0OiBJRGVmYXVsdE1vZGVsKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY3JlYXRlSWQoKTtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5nZXRUYWJsZShvYmplY3QuY29uc3RydWN0b3IubmFtZSkpO1xyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uZG9jKGlkKS5zZXQob2JqZWN0LmdldERhdGEoKSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIG9iamVjdC5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYENyZWF0ZWQgJHtvYmplY3QuY29uc3RydWN0b3IubmFtZX1gKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB1cGRhdGUgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICovXHJcbiAgdXBkYXRlV2l0aE9iamVjdChvYmplY3Q6IElEZWZhdWx0TW9kZWwpIHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5nZXRUYWJsZShvYmplY3QuY29uc3RydWN0b3IubmFtZSkpO1xyXG4gICAgY29sbGVjdGlvbi5kb2Mob2JqZWN0LmlkKS51cGRhdGUob2JqZWN0LmdldERhdGEoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgdGFibGUgbmFtZSBmcm9tIGNsYXNzIG5hbWVcclxuICAgKiBAcGFyYW0gY2xhc3NOYW1lXHJcbiAgICogQHJldHVybnMge2FueX1cclxuICAgKi9cclxuICBnZXRUYWJsZShjbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIF8uZmluZCh0aGlzLlRBQkxFUywgKHRhYmxlKSA9PiB7XHJcbiAgICAgIHJldHVybiB0YWJsZS5jbGFzcy5uYW1lID09PSBjbGFzc05hbWU7XHJcbiAgICB9KS5uYW1lO1xyXG4gIH1cclxuXHJcbiAgLyo9PT09PT09PWRlbGV0ZT09PT09PT09PSovXHJcblxyXG4gIGRlbGV0ZU9yZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlVGFibGUodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJdLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlT3JkZXJJdGVtKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlVGFibGUodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJfaXRlbV0ubmFtZSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVEZWxpdmVyeSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlbGV0ZVRhYmxlKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5XS5uYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRlbGV0ZSBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gbmFtZVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGVsZXRlVGFibGUobmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKG5hbWUpLmdldCgpLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5mb3JFYWNoKGFzeW5jIGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgYXdhaXQgZWxlbWVudC5yZWYuZGVsZXRlKCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgZGVsZXRlICR7bmFtZX1gKTtcclxuICAgICAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYGRlbGV0ZSAke25hbWV9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiJdfQ==