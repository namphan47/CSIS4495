import { __awaiter, __decorate, __generator } from "tslib";
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
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/firestore";
import * as i2 from "@angular/fire/database";
import * as i3 from "../data/dummy-data.service";
import * as i4 from "../mics/notification.service";
import * as i5 from "../map/map.service";
var FirebaseDataService = /** @class */ (function () {
    function FirebaseDataService(_AngularFirestore, _AngularFireDatabase, _DummyDataService, _NotificationService, _MapService) {
        var _a;
        this._AngularFirestore = _AngularFirestore;
        this._AngularFireDatabase = _AngularFireDatabase;
        this._DummyDataService = _DummyDataService;
        this._NotificationService = _NotificationService;
        this._MapService = _MapService;
        this.TABLES = (_a = {},
            _a[ENUM_TABLES.customer] = {
                name: ENUM_TABLES.customer,
                class: Customer
            },
            _a[ENUM_TABLES.courier] = {
                name: ENUM_TABLES.courier,
                class: Courier
            },
            _a[ENUM_TABLES.restaurant] = {
                name: ENUM_TABLES.restaurant,
                class: Restaurant
            },
            _a[ENUM_TABLES.meal] = {
                name: ENUM_TABLES.meal,
                class: Meal
            },
            _a[ENUM_TABLES.order] = {
                name: ENUM_TABLES.order,
                class: Order
            },
            _a[ENUM_TABLES.delivery] = {
                name: ENUM_TABLES.delivery,
                class: Delivery
            },
            _a[ENUM_TABLES.order_item] = {
                name: ENUM_TABLES.order_item,
                class: OrderItem
            },
            _a[ENUM_TABLES.delivery_status_history] = {
                name: ENUM_TABLES.delivery_status_history,
                class: DeliveryStatusHistory
            },
            _a);
    }
    /**
     * reset DB
     * @returns {Promise<void>}
     */
    FirebaseDataService.prototype.resetDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // delete tables
                    return [4 /*yield*/, Promise.all(_.map(this.TABLES, function (x) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.deleteTable(x.name)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 1:
                        // delete tables
                        _a.sent();
                        // add tables
                        return [4 /*yield*/, Promise.all(_.map(this.TABLES, function (x) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.addDB(x)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        // add tables
                        _a.sent();
                        // converseMeal
                        return [4 /*yield*/, this.linkRestaurantMealDB()];
                    case 3:
                        // converseMeal
                        _a.sent();
                        this._NotificationService.pushMessage('All data is reset!!');
                        return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    /**
     * link restaurant and meals data
     * @returns {Promise<void>}
     */
    FirebaseDataService.prototype.linkRestaurantMealDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._NotificationService.pushMessage('Link Restaurant & Meal data');
                        return [4 /*yield*/, this.getRestaurant()
                                .then(function (restaurants) {
                                // console.log(restaurants);
                                _this.getMeals()
                                    .then(function (meals) {
                                    // console.log(meals);
                                    _.map(restaurants, function (restaurant) {
                                        // console.log(restaurant);
                                        restaurant.meal_ids = _.map(_.filter(meals, function (meal) {
                                            return restaurant.name === meal.restaurant_name;
                                        }), function (x) { return x.id; });
                                        _this._AngularFirestore.collection(_this.TABLES[ENUM_TABLES.restaurant].name)
                                            .doc(restaurant.id).set(restaurant.getData());
                                    });
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * add data of collection
     * @param object
     * @returns {Promise<unknown[]>}
     */
    FirebaseDataService.prototype.addDB = function (object) {
        var _this = this;
        return this._DummyDataService.convertDummyDataToModel(object.name, object.class)
            .then(function (rs) { return __awaiter(_this, void 0, void 0, function () {
            var itemsCollection;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!rs) {
                            return [2 /*return*/];
                        }
                        itemsCollection = this._AngularFirestore.collection(object.name);
                        return [4 /*yield*/, Promise.all(_.map(rs, function (x) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, itemsCollection.add(x.getData())];
                                        case 1:
                                            _a.sent();
                                            console.log("add " + object.name);
                                            this._NotificationService.pushMessage("add " + object.name);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
    };
    /**
     * get customer data
     * @returns {Promise<Customer[]>}
     */
    FirebaseDataService.prototype.getCustomer = function () {
        return this.getDB(this.TABLES[ENUM_TABLES.customer])
            .then(function (rs) { return rs; });
    };
    /**
     * get courier data
     * @returns {Promise<Courier[]>}
     */
    FirebaseDataService.prototype.getCourier = function () {
        return this.getDB(this.TABLES[ENUM_TABLES.courier])
            .then(function (rs) { return rs; });
    };
    /**
     * get delivery data
     * @returns {Promise<Delivery[]>}
     */
    FirebaseDataService.prototype.getDeliveries = function () {
        var _this = this;
        return this.getDB(this.TABLES[ENUM_TABLES.delivery])
            .then(function (rs) { return rs; })
            .then(function (rs) {
            return _this.getDeliveryStatusHistory()
                .then(function (histories) {
                _.map(rs, function (delivery) {
                    delivery.setStatusHistory(_.filter(histories, function (x) { return x.delivery_id === delivery.id; }));
                });
                return rs;
            });
        });
    };
    FirebaseDataService.prototype.getDeliveryById = function (id) {
        var _this = this;
        return this.getDBWithId(this.TABLES[ENUM_TABLES.delivery], id)
            .then(function (rs) { return rs; })
            .then(function (rs) {
            return _this.getDeliveryStatusHistory()
                .then(function (histories) {
                rs.setStatusHistory(_.filter(histories, function (x) { return x.delivery_id === id; }));
                return rs;
            });
        });
    };
    FirebaseDataService.prototype.getDeliveryStatusHistory = function () {
        return this.getDB(this.TABLES[ENUM_TABLES.delivery_status_history])
            .then(function (rs) { return rs; });
    };
    FirebaseDataService.prototype.getStatusHistoryOfDelivery = function (queryParams) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getDB(this.TABLES[ENUM_TABLES.delivery_status_history], queryParams)
                        .then(function (rs) { return rs; })];
            });
        });
    };
    /**
     * get restaurant data
     * @returns {Promise<Restaurant[]>}
     */
    FirebaseDataService.prototype.getRestaurant = function () {
        var _this = this;
        return this.getDB(this.TABLES[ENUM_TABLES.restaurant])
            .then(function (restaurants) {
            return _this.getMeals()
                .then(function (meals) {
                _.map(restaurants, function (restaurant) {
                    restaurant.meals = _.filter(meals, function (meal) {
                        return restaurant.meal_ids.indexOf(meal.id) >= 0;
                    });
                });
                return restaurants;
            });
        });
    };
    /**
     * get meals data
     * @returns {Promise<Meal[]>}
     */
    FirebaseDataService.prototype.getMeals = function () {
        return this.getDB(this.TABLES[ENUM_TABLES.meal])
            .then(function (rs) { return rs; });
    };
    /**
     * get order items data
     * @param queryParams
     * @returns {Promise<Meal[]>}
     */
    FirebaseDataService.prototype.getOrderItems = function (queryParams) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getDB(this.TABLES[ENUM_TABLES.order_item], queryParams)
                        .then(function (rs) { return rs; })
                        .then(function (orderItems) {
                        _.map(orderItems, function (orderItem) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: 
                                    // get meal
                                    return [4 /*yield*/, this.getDBWithId(this.TABLES[ENUM_TABLES.meal], orderItem.meal_id)
                                            .then(function (meal) {
                                            orderItem.meal = meal;
                                        })];
                                    case 1:
                                        // get meal
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return orderItems;
                    })];
            });
        });
    };
    /**
     * get order details
     * @returns {Promise<Order[]>}
     */
    FirebaseDataService.prototype.getOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getDB(this.TABLES[ENUM_TABLES.order])
                        .then(function (rs) { return rs; })
                        .then(function (orders) {
                        orders = orders;
                        return Promise.all(_.map(orders, function (order) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: 
                                    // get customer of each order
                                    return [4 /*yield*/, this.getDBWithId(this.TABLES[ENUM_TABLES.customer], order.customer_id)
                                            .then(function (customer) {
                                            order.customer = customer;
                                        })];
                                    case 1:
                                        // get customer of each order
                                        _a.sent();
                                        // get item of each order
                                        return [4 /*yield*/, this.getOrderItems([new QueryParamModel('order_id', QueryParamModel.OPERATIONS.EQUAL, order.id)])
                                                .then(function (items) {
                                                order.items = items;
                                            })];
                                    case 2:
                                        // get item of each order
                                        _a.sent();
                                        // get restaurant for each order
                                        return [4 /*yield*/, this.getDBWithId(this.TABLES[ENUM_TABLES.restaurant], order.restaurant_id)
                                                .then(function (restaurant) {
                                                order.restaurant = restaurant;
                                            })];
                                    case 3:
                                        // get restaurant for each order
                                        _a.sent();
                                        return [2 /*return*/, Promise.resolve()];
                                }
                            });
                        }); })).then(function () {
                            return orders;
                        });
                    })];
            });
        });
    };
    /**
     * get data of collection
     * @param object
     * @returns {Promise<IDefaultModelConstructor[]>}
     */
    FirebaseDataService.prototype.getDB = function (object, queryParams, id) {
        var _this = this;
        var collection = this._AngularFirestore.collection(object.name, function (ref) {
            var newRef = null;
            if (!!queryParams) {
                _.map(queryParams, function (x) {
                    newRef = newRef ? newRef.where(x.key, x.operation, x.value) : ref.where(x.key, x.operation, x.value);
                });
            }
            return newRef || ref;
        });
        return collection
            .snapshotChanges()
            .pipe(map(function (items) { return items.map(function (a) {
            var data = a.payload.doc.data();
            var id = a.payload.doc.id;
            // update id
            data['id'] = id;
            return data;
        }); }), map(function (items) { return _.filter(items, function (doc) {
            if (!!id) {
                return doc.id === id;
            }
            return doc;
        }); }))
            .pipe(tap(), first()).toPromise()
            .then(function (rs) {
            return _this.convertToClassObject(rs, object.class);
        });
    };
    /**
     * get object by id
     * @param object
     * @param id
     * @returns {Promise<IDefaultModelConstructor[]>}
     */
    FirebaseDataService.prototype.getDBWithId = function (object, id) {
        var _this = this;
        var collection = this._AngularFirestore.doc(object.name + "/" + id);
        return collection
            .snapshotChanges()
            .pipe(map(function (a) {
            var data = a.payload.data();
            var id = a.payload.id;
            // update id
            data['id'] = id;
            return data;
        }))
            .pipe(tap(), first()).toPromise()
            .then(function (rs) {
            var array = _this.convertToClassObject([rs], object.class);
            return array.length ? array[0] : null;
        });
    };
    /**
     * convert data to class object
     * @param data
     * @param modelClass
     * @returns {any[]}
     */
    FirebaseDataService.prototype.convertToClassObject = function (data, modelClass) {
        var array = [];
        _.map(data, function (x) {
            var model = new modelClass(x);
            array.push(model);
        });
        // console.log(array);
        return array;
    };
    /**
     * create document, set id
     * @param object
     * @returns {Promise<void>}
     */
    FirebaseDataService.prototype.createWithObject = function (object) {
        var _this = this;
        var id = this._AngularFirestore.createId();
        var collection = this._AngularFirestore.collection(this.getTable(object.constructor.name));
        return collection.doc(id).set(object.getData())
            .then(function () {
            object.id = id;
            _this._NotificationService.pushMessage("Created " + object.constructor.name);
        });
    };
    /**
     * update document
     * @param object
     */
    FirebaseDataService.prototype.updateWithObject = function (object) {
        var collection = this._AngularFirestore.collection(this.getTable(object.constructor.name));
        collection.doc(object.id).update(object.getData());
    };
    /**
     * get table name from class name
     * @param className
     * @returns {any}
     */
    FirebaseDataService.prototype.getTable = function (className) {
        return _.find(this.TABLES, function (table) {
            return table.class.name === className;
        }).name;
    };
    /*========delete=========*/
    FirebaseDataService.prototype.deleteOrder = function () {
        return this.deleteTable(this.TABLES[ENUM_TABLES.order].name);
    };
    FirebaseDataService.prototype.deleteOrderItem = function () {
        return this.deleteTable(this.TABLES[ENUM_TABLES.order_item].name);
    };
    FirebaseDataService.prototype.deleteDelivery = function () {
        return this.deleteTable(this.TABLES[ENUM_TABLES.delivery].name);
    };
    FirebaseDataService.prototype.deleteDeliveryStatus = function () {
        return this.deleteTable(this.TABLES[ENUM_TABLES.delivery_status_history].name);
    };
    /**
     * delete data of collection
     * @param name
     * @returns {Promise<void>}
     */
    FirebaseDataService.prototype.deleteTable = function (name) {
        var _this = this;
        return this._AngularFirestore.collection(name).get().toPromise()
            .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            var array;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        array = [];
                        res.forEach(function (element) {
                            array.push(element);
                        });
                        return [4 /*yield*/, Promise.all(_.map(array, function (element) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, element.ref.delete()];
                                        case 1:
                                            _a.sent();
                                            console.log("delete " + name);
                                            this._NotificationService.pushMessage("delete " + name);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    FirebaseDataService.prototype.getPointsRealTime = function (id) {
        return this.getRealTimeDB('points', id);
    };
    FirebaseDataService.prototype.getRealTimeDB = function (name, id) {
        return this._AngularFireDatabase.list(name + "/" + id).valueChanges();
    };
    FirebaseDataService.ctorParameters = function () { return [
        { type: AngularFirestore },
        { type: AngularFireDatabase },
        { type: DummyDataService },
        { type: NotificationService },
        { type: MapService }
    ]; };
    FirebaseDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function FirebaseDataService_Factory() { return new FirebaseDataService(i0.ɵɵinject(i1.AngularFirestore), i0.ɵɵinject(i2.AngularFireDatabase), i0.ɵɵinject(i3.DummyDataService), i0.ɵɵinject(i4.NotificationService), i0.ɵɵinject(i5.MapService)); }, token: FirebaseDataService, providedIn: "root" });
    FirebaseDataService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], FirebaseDataService);
    return FirebaseDataService;
}());
export { FirebaseDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZmlyZWJhc2UvZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDckQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUM3RixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JB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QUFDLElBQUksQ0FBSSxJQUFJLFNBQUksRUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEUsQ0FBQzs7Z0JBMVhzQyxnQkFBZ0I7Z0JBQ2IsbUJBQW1CO2dCQUN0QixnQkFBZ0I7Z0JBQ2IsbUJBQW1CO2dCQUM1QixVQUFVOzs7SUF4Q2hDLG1CQUFtQjtRQUgvQixVQUFVLENBQUM7WUFDVixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDO09BQ1csbUJBQW1CLENBK1ovQjs4QkF0YkQ7Q0FzYkMsQUEvWkQsSUErWkM7U0EvWlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtBbmd1bGFyRmlyZXN0b3JlfSBmcm9tICdAYW5ndWxhci9maXJlL2ZpcmVzdG9yZSc7XHJcbmltcG9ydCB7Q3VzdG9tZXJ9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9jdXN0b21lci9jdXN0b21lcic7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7RHVtbXlEYXRhU2VydmljZX0gZnJvbSAnLi4vZGF0YS9kdW1teS1kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQge2ZpcnN0LCBtYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge0lEZWZhdWx0TW9kZWwsIElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2ktZGVmYXVsdC1tb2RlbCc7XHJcbmltcG9ydCB7UmVzdGF1cmFudH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL3Jlc3RhdXJhbnQvcmVzdGF1cmFudCc7XHJcbmltcG9ydCB7Q291cmllcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2NvdXJpZXIvY291cmllcic7XHJcbmltcG9ydCB7TWVhbH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL21lYWwvbWVhbCc7XHJcbmltcG9ydCB7RU5VTV9UQUJMRVN9IGZyb20gJy4uLy4uL2NvbnN0YW50L2NvbnN0LXZhbHVlJztcclxuaW1wb3J0IHtOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tICcuLi9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHtPcmRlckl0ZW19IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlcl9pdGVtL29yZGVyLWl0ZW0nO1xyXG5pbXBvcnQge09yZGVyfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvb3JkZXIvb3JkZXInO1xyXG5pbXBvcnQge1F1ZXJ5UGFyYW1Nb2RlbH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9xdWVyeS1wYXJhbS1tb2RlbFwiO1xyXG5pbXBvcnQge0RlbGl2ZXJ5fSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzXCI7XHJcbmltcG9ydCB7RGVsaXZlcnlTdGF0dXNIaXN0b3J5fSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL2RlbGl2ZXJ5L2RlbGl2ZXJ5LXN0YXR1cy1oaXN0b3J5XCI7XHJcbmltcG9ydCB7TWFwU2VydmljZX0gZnJvbSBcIi4uL21hcC9tYXAuc2VydmljZVwiO1xyXG5pbXBvcnQge0FuZ3VsYXJGaXJlRGF0YWJhc2V9IGZyb20gXCJAYW5ndWxhci9maXJlL2RhdGFiYXNlXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZURhdGFTZXJ2aWNlIHtcclxuICByZWFkb25seSBUQUJMRVMgPSB7XHJcbiAgICBbRU5VTV9UQUJMRVMuY3VzdG9tZXJdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLmN1c3RvbWVyLFxyXG4gICAgICBjbGFzczogQ3VzdG9tZXJcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMuY291cmllcl06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMuY291cmllcixcclxuICAgICAgY2xhc3M6IENvdXJpZXJcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMucmVzdGF1cmFudF06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMucmVzdGF1cmFudCxcclxuICAgICAgY2xhc3M6IFJlc3RhdXJhbnRcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMubWVhbF06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMubWVhbCxcclxuICAgICAgY2xhc3M6IE1lYWxcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMub3JkZXJdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLm9yZGVyLFxyXG4gICAgICBjbGFzczogT3JkZXJcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMuZGVsaXZlcnldOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLmRlbGl2ZXJ5LFxyXG4gICAgICBjbGFzczogRGVsaXZlcnlcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMub3JkZXJfaXRlbV06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMub3JkZXJfaXRlbSxcclxuICAgICAgY2xhc3M6IE9yZGVySXRlbVxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5kZWxpdmVyeV9zdGF0dXNfaGlzdG9yeV06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMuZGVsaXZlcnlfc3RhdHVzX2hpc3RvcnksXHJcbiAgICAgIGNsYXNzOiBEZWxpdmVyeVN0YXR1c0hpc3RvcnlcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9Bbmd1bGFyRmlyZXN0b3JlOiBBbmd1bGFyRmlyZXN0b3JlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX0FuZ3VsYXJGaXJlRGF0YWJhc2U6IEFuZ3VsYXJGaXJlRGF0YWJhc2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfRHVtbXlEYXRhU2VydmljZTogRHVtbXlEYXRhU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9Ob3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX01hcFNlcnZpY2U6IE1hcFNlcnZpY2UpIHtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlc2V0IERCXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgcmVzZXREQigpIHtcclxuICAgIC8vIGRlbGV0ZSB0YWJsZXNcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKF8ubWFwKHRoaXMuVEFCTEVTLCBhc3luYyAoeCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLmRlbGV0ZVRhYmxlKHgubmFtZSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLy8gYWRkIHRhYmxlc1xyXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXy5tYXAodGhpcy5UQUJMRVMsIGFzeW5jICh4KSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuYWRkREIoeCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLy8gY29udmVyc2VNZWFsXHJcbiAgICBhd2FpdCB0aGlzLmxpbmtSZXN0YXVyYW50TWVhbERCKCk7XHJcblxyXG4gICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZSgnQWxsIGRhdGEgaXMgcmVzZXQhIScpO1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbGluayByZXN0YXVyYW50IGFuZCBtZWFscyBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgbGlua1Jlc3RhdXJhbnRNZWFsREIoKSB7XHJcbiAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKCdMaW5rIFJlc3RhdXJhbnQgJiBNZWFsIGRhdGEnKTtcclxuICAgIGF3YWl0IHRoaXMuZ2V0UmVzdGF1cmFudCgpXHJcbiAgICAgIC50aGVuKChyZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3RhdXJhbnRzKTtcclxuICAgICAgICB0aGlzLmdldE1lYWxzKClcclxuICAgICAgICAgIC50aGVuKChtZWFscykgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZWFscyk7XHJcbiAgICAgICAgICAgIF8ubWFwKHJlc3RhdXJhbnRzLCAocmVzdGF1cmFudDogUmVzdGF1cmFudCkgPT4ge1xyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3RhdXJhbnQpO1xyXG4gICAgICAgICAgICAgIHJlc3RhdXJhbnQubWVhbF9pZHMgPSBfLm1hcChfLmZpbHRlcihtZWFscywgKG1lYWw6IE1lYWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN0YXVyYW50Lm5hbWUgPT09IG1lYWwucmVzdGF1cmFudF9uYW1lO1xyXG4gICAgICAgICAgICAgIH0pLCB4ID0+IHguaWQpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMucmVzdGF1cmFudF0ubmFtZSlcclxuICAgICAgICAgICAgICAgIC5kb2MocmVzdGF1cmFudC5pZCkuc2V0KHJlc3RhdXJhbnQuZ2V0RGF0YSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogYWRkIGRhdGEgb2YgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx1bmtub3duW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkREIob2JqZWN0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5fRHVtbXlEYXRhU2VydmljZS5jb252ZXJ0RHVtbXlEYXRhVG9Nb2RlbChvYmplY3QubmFtZSwgb2JqZWN0LmNsYXNzKVxyXG4gICAgICAudGhlbihhc3luYyAocnMpID0+IHtcclxuICAgICAgICBpZiAoIXJzKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGl0ZW1zQ29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbihvYmplY3QubmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKF8ubWFwKHJzLCBhc3luYyAoeCkgPT4ge1xyXG4gICAgICAgICAgYXdhaXQgaXRlbXNDb2xsZWN0aW9uLmFkZCh4LmdldERhdGEoKSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgYWRkICR7b2JqZWN0Lm5hbWV9YCk7XHJcbiAgICAgICAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKGBhZGQgJHtvYmplY3QubmFtZX1gKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGN1c3RvbWVyIGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDdXN0b21lcltdPn1cclxuICAgKi9cclxuICBnZXRDdXN0b21lcigpOiBQcm9taXNlPEN1c3RvbWVyW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmN1c3RvbWVyXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIEN1c3RvbWVyW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGNvdXJpZXIgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPENvdXJpZXJbXT59XHJcbiAgICovXHJcbiAgZ2V0Q291cmllcigpOiBQcm9taXNlPENvdXJpZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuY291cmllcl0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBDb3VyaWVyW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGRlbGl2ZXJ5IGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxEZWxpdmVyeVtdPn1cclxuICAgKi9cclxuICBnZXREZWxpdmVyaWVzKCk6IFByb21pc2U8RGVsaXZlcnlbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnldKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgRGVsaXZlcnlbXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVsaXZlcnlTdGF0dXNIaXN0b3J5KClcclxuICAgICAgICAgIC50aGVuKChoaXN0b3JpZXMpID0+IHtcclxuICAgICAgICAgICAgXy5tYXAocnMsIChkZWxpdmVyeTogRGVsaXZlcnkpID0+IHtcclxuICAgICAgICAgICAgICBkZWxpdmVyeS5zZXRTdGF0dXNIaXN0b3J5KF8uZmlsdGVyKGhpc3RvcmllcywgKHg6IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSkgPT4geC5kZWxpdmVyeV9pZCA9PT0gZGVsaXZlcnkuaWQpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBycztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldERlbGl2ZXJ5QnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxEZWxpdmVyeT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REJXaXRoSWQodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnldLCBpZClcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIERlbGl2ZXJ5KVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXREZWxpdmVyeVN0YXR1c0hpc3RvcnkoKVxyXG4gICAgICAgICAgLnRoZW4oKGhpc3RvcmllcykgPT4ge1xyXG4gICAgICAgICAgICBycy5zZXRTdGF0dXNIaXN0b3J5KF8uZmlsdGVyKGhpc3RvcmllcywgKHg6IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSkgPT4geC5kZWxpdmVyeV9pZCA9PT0gaWQpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJzO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGVsaXZlcnlTdGF0dXNIaXN0b3J5KCk6IFByb21pc2U8RGVsaXZlcnlTdGF0dXNIaXN0b3J5W10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5XSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFN0YXR1c0hpc3RvcnlPZkRlbGl2ZXJ5KHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10pOiBQcm9taXNlPERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV9zdGF0dXNfaGlzdG9yeV0sIHF1ZXJ5UGFyYW1zKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgRGVsaXZlcnlTdGF0dXNIaXN0b3J5W10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IHJlc3RhdXJhbnQgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3RhdXJhbnRbXT59XHJcbiAgICovXHJcbiAgZ2V0UmVzdGF1cmFudCgpOiBQcm9taXNlPFJlc3RhdXJhbnRbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMucmVzdGF1cmFudF0pXHJcbiAgICAgIC50aGVuKChyZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1lYWxzKClcclxuICAgICAgICAgIC50aGVuKChtZWFscykgPT4ge1xyXG4gICAgICAgICAgICBfLm1hcChyZXN0YXVyYW50cywgKHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICByZXN0YXVyYW50Lm1lYWxzID0gXy5maWx0ZXIobWVhbHMsIChtZWFsOiBNZWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudC5tZWFsX2lkcy5pbmRleE9mKG1lYWwuaWQpID49IDA7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudHMgYXMgdW5rbm93biBhcyBSZXN0YXVyYW50W107XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgbWVhbHMgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE1lYWxbXT59XHJcbiAgICovXHJcbiAgZ2V0TWVhbHMoKTogUHJvbWlzZTxNZWFsW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm1lYWxdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgTWVhbFtdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvcmRlciBpdGVtcyBkYXRhXHJcbiAgICogQHBhcmFtIHF1ZXJ5UGFyYW1zXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8TWVhbFtdPn1cclxuICAgKi9cclxuICBhc3luYyBnZXRPcmRlckl0ZW1zKHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10pOiBQcm9taXNlPE9yZGVySXRlbVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl9pdGVtXSwgcXVlcnlQYXJhbXMpXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBPcmRlckl0ZW1bXSlcclxuICAgICAgLnRoZW4oKG9yZGVySXRlbXMpID0+IHtcclxuICAgICAgICBfLm1hcChvcmRlckl0ZW1zLCBhc3luYyAob3JkZXJJdGVtOiBPcmRlckl0ZW0pID0+IHtcclxuICAgICAgICAgIC8vIGdldCBtZWFsXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm1lYWxdLCBvcmRlckl0ZW0ubWVhbF9pZClcclxuICAgICAgICAgICAgLnRoZW4oKG1lYWwpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlckl0ZW0ubWVhbCA9IG1lYWwgYXMgdW5rbm93biBhcyBNZWFsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gb3JkZXJJdGVtcztcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgb3JkZXIgZGV0YWlsc1xyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE9yZGVyW10+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGdldE9yZGVycygpOiBQcm9taXNlPE9yZGVyW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm9yZGVyXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIE9yZGVyW10pXHJcbiAgICAgIC50aGVuKChvcmRlcnMpID0+IHtcclxuICAgICAgICBvcmRlcnMgPSBvcmRlcnMgYXMgdW5rbm93biBhcyBPcmRlcltdO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChfLm1hcChvcmRlcnMsIGFzeW5jIChvcmRlcjogT3JkZXIpID0+IHtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgY3VzdG9tZXIgb2YgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jdXN0b21lcl0sIG9yZGVyLmN1c3RvbWVyX2lkKVxyXG4gICAgICAgICAgICAudGhlbigoY3VzdG9tZXIpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5jdXN0b21lciA9IGN1c3RvbWVyIGFzIHVua25vd24gYXMgQ3VzdG9tZXI7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIGdldCBpdGVtIG9mIGVhY2ggb3JkZXJcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0T3JkZXJJdGVtcyhbbmV3IFF1ZXJ5UGFyYW1Nb2RlbCgnb3JkZXJfaWQnLCBRdWVyeVBhcmFtTW9kZWwuT1BFUkFUSU9OUy5FUVVBTCwgb3JkZXIuaWQpXSlcclxuICAgICAgICAgICAgLnRoZW4oKGl0ZW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgb3JkZXIuaXRlbXMgPSBpdGVtcyBhcyB1bmtub3duIGFzIE9yZGVySXRlbVtdO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgcmVzdGF1cmFudCBmb3IgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5yZXN0YXVyYW50XSwgb3JkZXIucmVzdGF1cmFudF9pZClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5yZXN0YXVyYW50ID0gcmVzdGF1cmFudCBhcyB1bmtub3duIGFzIFJlc3RhdXJhbnQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBvcmRlcnM7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0REIob2JqZWN0LCBxdWVyeVBhcmFtcz86IFF1ZXJ5UGFyYW1Nb2RlbFtdLCBpZD86IHN0cmluZyk6IFByb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+IHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24ob2JqZWN0Lm5hbWUsIHJlZiA9PiB7XHJcbiAgICAgIGxldCBuZXdSZWYgPSBudWxsO1xyXG4gICAgICBpZiAoISFxdWVyeVBhcmFtcykge1xyXG4gICAgICAgIF8ubWFwKHF1ZXJ5UGFyYW1zLCAoeDogUXVlcnlQYXJhbU1vZGVsKSA9PiB7XHJcbiAgICAgICAgICBuZXdSZWYgPSBuZXdSZWYgPyBuZXdSZWYud2hlcmUoeC5rZXksIHgub3BlcmF0aW9uLCB4LnZhbHVlKSA6IHJlZi53aGVyZSh4LmtleSwgeC5vcGVyYXRpb24sIHgudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXdSZWYgfHwgcmVmO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb25cclxuICAgICAgLnNuYXBzaG90Q2hhbmdlcygpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChpdGVtcyA9PiBpdGVtcy5tYXAoYSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYS5wYXlsb2FkLmRvYy5kYXRhKCkgYXMgT2JqZWN0O1xyXG4gICAgICAgICAgY29uc3QgaWQgPSBhLnBheWxvYWQuZG9jLmlkO1xyXG4gICAgICAgICAgLy8gdXBkYXRlIGlkXHJcbiAgICAgICAgICBkYXRhWydpZCddID0gaWQ7XHJcbiAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KSksXHJcbiAgICAgICAgbWFwKChpdGVtcykgPT4gXy5maWx0ZXIoaXRlbXMsIGRvYyA9PiB7XHJcbiAgICAgICAgICBpZiAoISFpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jLmlkID09PSBpZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBkb2M7XHJcbiAgICAgICAgfSkpXHJcbiAgICAgIClcclxuICAgICAgLnBpcGUodGFwKCksIGZpcnN0KCkpLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb0NsYXNzT2JqZWN0KHJzLCBvYmplY3QuY2xhc3MpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvYmplY3QgYnkgaWRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0REJXaXRoSWQob2JqZWN0LCBpZDogc3RyaW5nKTogUHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3I+IHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmRvYyhgJHtvYmplY3QubmFtZX0vJHtpZH1gKTtcclxuICAgIHJldHVybiBjb2xsZWN0aW9uXHJcbiAgICAgIC5zbmFwc2hvdENoYW5nZXMoKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoYSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYS5wYXlsb2FkLmRhdGEoKSBhcyBPYmplY3Q7XHJcbiAgICAgICAgICBjb25zdCBpZCA9IGEucGF5bG9hZC5pZDtcclxuICAgICAgICAgIC8vIHVwZGF0ZSBpZFxyXG4gICAgICAgICAgZGF0YVsnaWQnXSA9IGlkO1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAucGlwZSh0YXAoKSwgZmlyc3QoKSkudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSB0aGlzLmNvbnZlcnRUb0NsYXNzT2JqZWN0KFtyc10sIG9iamVjdC5jbGFzcyk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5Lmxlbmd0aCA/IGFycmF5WzBdIDogbnVsbDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjb252ZXJ0IGRhdGEgdG8gY2xhc3Mgb2JqZWN0XHJcbiAgICogQHBhcmFtIGRhdGFcclxuICAgKiBAcGFyYW0gbW9kZWxDbGFzc1xyXG4gICAqIEByZXR1cm5zIHthbnlbXX1cclxuICAgKi9cclxuICBwcml2YXRlIGNvbnZlcnRUb0NsYXNzT2JqZWN0KGRhdGE6IGFueVtdLCBtb2RlbENsYXNzOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3IpOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXSB7XHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgXy5tYXAoZGF0YSwgKHgpID0+IHtcclxuICAgICAgY29uc3QgbW9kZWwgPSBuZXcgbW9kZWxDbGFzcyh4KTtcclxuICAgICAgYXJyYXkucHVzaChtb2RlbCk7XHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuICAgIHJldHVybiBhcnJheTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBkb2N1bWVudCwgc2V0IGlkXHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGNyZWF0ZVdpdGhPYmplY3Qob2JqZWN0OiBJRGVmYXVsdE1vZGVsKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY3JlYXRlSWQoKTtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5nZXRUYWJsZShvYmplY3QuY29uc3RydWN0b3IubmFtZSkpO1xyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uZG9jKGlkKS5zZXQob2JqZWN0LmdldERhdGEoKSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIG9iamVjdC5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYENyZWF0ZWQgJHtvYmplY3QuY29uc3RydWN0b3IubmFtZX1gKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB1cGRhdGUgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICovXHJcbiAgdXBkYXRlV2l0aE9iamVjdChvYmplY3Q6IElEZWZhdWx0TW9kZWwpIHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5nZXRUYWJsZShvYmplY3QuY29uc3RydWN0b3IubmFtZSkpO1xyXG4gICAgY29sbGVjdGlvbi5kb2Mob2JqZWN0LmlkKS51cGRhdGUob2JqZWN0LmdldERhdGEoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgdGFibGUgbmFtZSBmcm9tIGNsYXNzIG5hbWVcclxuICAgKiBAcGFyYW0gY2xhc3NOYW1lXHJcbiAgICogQHJldHVybnMge2FueX1cclxuICAgKi9cclxuICBnZXRUYWJsZShjbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIF8uZmluZCh0aGlzLlRBQkxFUywgKHRhYmxlKSA9PiB7XHJcbiAgICAgIHJldHVybiB0YWJsZS5jbGFzcy5uYW1lID09PSBjbGFzc05hbWU7XHJcbiAgICB9KS5uYW1lO1xyXG4gIH1cclxuXHJcbiAgLyo9PT09PT09PWRlbGV0ZT09PT09PT09PSovXHJcblxyXG4gIGRlbGV0ZU9yZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlVGFibGUodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJdLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlT3JkZXJJdGVtKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlVGFibGUodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJfaXRlbV0ubmFtZSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVEZWxpdmVyeSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlbGV0ZVRhYmxlKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5XS5uYW1lKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZURlbGl2ZXJ5U3RhdHVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlVGFibGUodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnlfc3RhdHVzX2hpc3RvcnldLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZGVsZXRlIGRhdGEgb2YgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBuYW1lXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkZWxldGVUYWJsZShuYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24obmFtZSkuZ2V0KCkudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oYXN5bmMgcmVzID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSBbXTtcclxuICAgICAgICByZXMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgIGFycmF5LnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXy5tYXAoYXJyYXksIGFzeW5jIGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgYXdhaXQgZWxlbWVudC5yZWYuZGVsZXRlKCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgZGVsZXRlICR7bmFtZX1gKTtcclxuICAgICAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYGRlbGV0ZSAke25hbWV9YCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFBvaW50c1JlYWxUaW1lKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRSZWFsVGltZURCKCdwb2ludHMnLCBpZCk7XHJcbiAgfVxyXG5cclxuICBnZXRSZWFsVGltZURCKG5hbWU6IHN0cmluZywgaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuX0FuZ3VsYXJGaXJlRGF0YWJhc2UubGlzdChgJHtuYW1lfS8ke2lkfWApLnZhbHVlQ2hhbmdlcygpO1xyXG4gIH1cclxufVxyXG4iXX0=