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
import { AngularFireAuth } from "@angular/fire/auth";
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/firestore";
import * as i2 from "@angular/fire/database";
import * as i3 from "../data/dummy-data.service";
import * as i4 from "../mics/notification.service";
import * as i5 from "../map/map.service";
import * as i6 from "@angular/fire/auth";
var FirebaseDataService = /** @class */ (function () {
    function FirebaseDataService(_AngularFirestore, _AngularFireDatabase, _DummyDataService, _NotificationService, _MapService, _AngularFireAuth) {
        var _a;
        this._AngularFirestore = _AngularFirestore;
        this._AngularFireDatabase = _AngularFireDatabase;
        this._DummyDataService = _DummyDataService;
        this._NotificationService = _NotificationService;
        this._MapService = _MapService;
        this._AngularFireAuth = _AngularFireAuth;
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
    /*authentication*/
    FirebaseDataService.prototype.signUp = function (user) {
        return this._AngularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
            .then(function (result) {
            window.alert("You have been successfully registered!");
            console.log(result);
        }).catch(function (error) {
            window.alert(error.message);
        });
    };
    // Sign in with email/password
    FirebaseDataService.prototype.signIn = function (user) {
        return this._AngularFireAuth.signInWithEmailAndPassword(user.email, user.password)
            .then(function (result) {
            console.log(result);
            // this.router.navigate(['<!-- enter your route name here -->']);
            return user;
        }).catch(function (error) {
            window.alert(error.message);
        });
    };
    FirebaseDataService.ctorParameters = function () { return [
        { type: AngularFirestore },
        { type: AngularFireDatabase },
        { type: DummyDataService },
        { type: NotificationService },
        { type: MapService },
        { type: AngularFireAuth }
    ]; };
    FirebaseDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function FirebaseDataService_Factory() { return new FirebaseDataService(i0.ɵɵinject(i1.AngularFirestore), i0.ɵɵinject(i2.AngularFireDatabase), i0.ɵɵinject(i3.DummyDataService), i0.ɵɵinject(i4.NotificationService), i0.ɵɵinject(i5.MapService), i0.ɵɵinject(i6.AngularFireAuth)); }, token: FirebaseDataService, providedIn: "root" });
    FirebaseDataService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], FirebaseDataService);
    return FirebaseDataService;
}());
export { FirebaseDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZmlyZWJhc2UvZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDckQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUM3RixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7OztBQUtuRDtJQW9DRSw2QkFBb0IsaUJBQW1DLEVBQ25DLG9CQUF5QyxFQUN6QyxpQkFBbUMsRUFDbkMsb0JBQXlDLEVBQ3pDLFdBQXVCLEVBQ3ZCLGdCQUFpQzs7UUFMakMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQUN6QyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBeEM1QyxXQUFNO1lBQ2IsR0FBQyxXQUFXLENBQUMsUUFBUSxJQUFHO2dCQUN0QixJQUFJLEVBQUUsV0FBVyxDQUFDLFFBQVE7Z0JBQzFCLEtBQUssRUFBRSxRQUFRO2FBQ2hCO1lBQ0QsR0FBQyxXQUFXLENBQUMsT0FBTyxJQUFHO2dCQUNyQixJQUFJLEVBQUUsV0FBVyxDQUFDLE9BQU87Z0JBQ3pCLEtBQUssRUFBRSxPQUFPO2FBQ2Y7WUFDRCxHQUFDLFdBQVcsQ0FBQyxVQUFVLElBQUc7Z0JBQ3hCLElBQUksRUFBRSxXQUFXLENBQUMsVUFBVTtnQkFDNUIsS0FBSyxFQUFFLFVBQVU7YUFDbEI7WUFDRCxHQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUc7Z0JBQ2xCLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTtnQkFDdEIsS0FBSyxFQUFFLElBQUk7YUFDWjtZQUNELEdBQUMsV0FBVyxDQUFDLEtBQUssSUFBRztnQkFDbkIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxLQUFLO2dCQUN2QixLQUFLLEVBQUUsS0FBSzthQUNiO1lBQ0QsR0FBQyxXQUFXLENBQUMsUUFBUSxJQUFHO2dCQUN0QixJQUFJLEVBQUUsV0FBVyxDQUFDLFFBQVE7Z0JBQzFCLEtBQUssRUFBRSxRQUFRO2FBQ2hCO1lBQ0QsR0FBQyxXQUFXLENBQUMsVUFBVSxJQUFHO2dCQUN4QixJQUFJLEVBQUUsV0FBVyxDQUFDLFVBQVU7Z0JBQzVCLEtBQUssRUFBRSxTQUFTO2FBQ2pCO1lBQ0QsR0FBQyxXQUFXLENBQUMsdUJBQXVCLElBQUc7Z0JBQ3JDLElBQUksRUFBRSxXQUFXLENBQUMsdUJBQXVCO2dCQUN6QyxLQUFLLEVBQUUscUJBQXFCO2FBQzdCO2dCQUNEO0lBUUYsQ0FBQztJQUVEOzs7T0FHRztJQUNHLHFDQUFPLEdBQWI7Ozs7OztvQkFDRSxnQkFBZ0I7b0JBQ2hCLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQU8sQ0FBQzs7OzRDQUMzQyxxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0NBQTlCLFNBQThCLENBQUM7Ozs7NkJBQ2hDLENBQUMsQ0FBQyxFQUFBOzt3QkFISCxnQkFBZ0I7d0JBQ2hCLFNBRUcsQ0FBQzt3QkFFSixhQUFhO3dCQUNiLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQU8sQ0FBQzs7O2dEQUMzQyxxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFBOzs0Q0FBbkIsU0FBbUIsQ0FBQzs7OztpQ0FDckIsQ0FBQyxDQUFDLEVBQUE7O3dCQUhILGFBQWE7d0JBQ2IsU0FFRyxDQUFDO3dCQUVKLGVBQWU7d0JBQ2YscUJBQU0sSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUE7O3dCQURqQyxlQUFlO3dCQUNmLFNBQWlDLENBQUM7d0JBRWxDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQzt3QkFDN0Qsc0JBQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFDOzs7O0tBQzFCO0lBRUQ7OztPQUdHO0lBQ0csa0RBQW9CLEdBQTFCOzs7Ozs7d0JBQ0UsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO3dCQUNyRSxxQkFBTSxJQUFJLENBQUMsYUFBYSxFQUFFO2lDQUN2QixJQUFJLENBQUMsVUFBQyxXQUFXO2dDQUNoQiw0QkFBNEI7Z0NBQzVCLEtBQUksQ0FBQyxRQUFRLEVBQUU7cUNBQ1osSUFBSSxDQUFDLFVBQUMsS0FBSztvQ0FDVixzQkFBc0I7b0NBQ3RCLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQUMsVUFBc0I7d0NBQ3hDLDJCQUEyQjt3Q0FDM0IsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQUMsSUFBVTs0Q0FDckQsT0FBTyxVQUFVLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxlQUFlLENBQUM7d0NBQ2xELENBQUMsQ0FBQyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsRUFBSixDQUFJLENBQUMsQ0FBQzt3Q0FFZixLQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQzs2Q0FDeEUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0NBQ2xELENBQUMsQ0FBQyxDQUFDO2dDQUNMLENBQUMsQ0FBQyxDQUFDOzRCQUNQLENBQUMsQ0FBQyxFQUFBOzt3QkFoQkosU0FnQkksQ0FBQzs7Ozs7S0FDTjtJQUdEOzs7O09BSUc7SUFDSyxtQ0FBSyxHQUFiLFVBQWMsTUFBTTtRQUFwQixpQkFhQztRQVpDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUM3RSxJQUFJLENBQUMsVUFBTyxFQUFFOzs7Ozs7d0JBQ2IsSUFBSSxDQUFDLEVBQUUsRUFBRTs0QkFDUCxzQkFBTzt5QkFDUjt3QkFDSyxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2hFLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsVUFBTyxDQUFDOzs7Z0RBQ3pDLHFCQUFNLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUE7OzRDQUF0QyxTQUFzQyxDQUFDOzRDQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQU8sTUFBTSxDQUFDLElBQU0sQ0FBQyxDQUFDOzRDQUNsQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLFNBQU8sTUFBTSxDQUFDLElBQU0sQ0FBQyxDQUFDOzs7O2lDQUM3RCxDQUFDLENBQUMsRUFBQTs0QkFKSCxzQkFBTyxTQUlKLEVBQUM7OzthQUNMLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCx5Q0FBVyxHQUFYO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2pELElBQUksQ0FBQyxVQUFDLEVBQUUsSUFBSyxPQUFBLEVBQTJCLEVBQTNCLENBQTJCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsd0NBQVUsR0FBVjtRQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoRCxJQUFJLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxFQUEwQixFQUExQixDQUEwQixDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7T0FHRztJQUNILDJDQUFhLEdBQWI7UUFBQSxpQkFZQztRQVhDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNqRCxJQUFJLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxFQUEyQixFQUEzQixDQUEyQixDQUFDO2FBQ3pDLElBQUksQ0FBQyxVQUFDLEVBQUU7WUFDUCxPQUFPLEtBQUksQ0FBQyx3QkFBd0IsRUFBRTtpQkFDbkMsSUFBSSxDQUFDLFVBQUMsU0FBUztnQkFDZCxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxVQUFDLFFBQWtCO29CQUMzQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBQyxDQUF3QixJQUFLLE9BQUEsQ0FBQyxDQUFDLFdBQVcsS0FBSyxRQUFRLENBQUMsRUFBRSxFQUE3QixDQUE2QixDQUFDLENBQUMsQ0FBQztnQkFDOUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZDQUFlLEdBQWYsVUFBZ0IsRUFBVTtRQUExQixpQkFVQztRQVRDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUM7YUFDM0QsSUFBSSxDQUFDLFVBQUMsRUFBRSxJQUFLLE9BQUEsRUFBeUIsRUFBekIsQ0FBeUIsQ0FBQzthQUN2QyxJQUFJLENBQUMsVUFBQyxFQUFFO1lBQ1AsT0FBTyxLQUFJLENBQUMsd0JBQXdCLEVBQUU7aUJBQ25DLElBQUksQ0FBQyxVQUFDLFNBQVM7Z0JBQ2QsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBd0IsSUFBSyxPQUFBLENBQUMsQ0FBQyxXQUFXLEtBQUssRUFBRSxFQUFwQixDQUFvQixDQUFDLENBQUMsQ0FBQztnQkFDN0YsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHNEQUF3QixHQUF4QjtRQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2FBQ2hFLElBQUksQ0FBQyxVQUFDLEVBQUUsSUFBSyxPQUFBLEVBQXdDLEVBQXhDLENBQXdDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUssd0RBQTBCLEdBQWhDLFVBQWlDLFdBQStCOzs7Z0JBQzlELHNCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsRUFBRSxXQUFXLENBQUM7eUJBQzdFLElBQUksQ0FBQyxVQUFDLEVBQUUsSUFBSyxPQUFBLEVBQXdDLEVBQXhDLENBQXdDLENBQUMsRUFBQzs7O0tBQzNEO0lBRUQ7OztPQUdHO0lBQ0gsMkNBQWEsR0FBYjtRQUFBLGlCQWFDO1FBWkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ25ELElBQUksQ0FBQyxVQUFDLFdBQVc7WUFDaEIsT0FBTyxLQUFJLENBQUMsUUFBUSxFQUFFO2lCQUNuQixJQUFJLENBQUMsVUFBQyxLQUFLO2dCQUNWLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQUMsVUFBc0I7b0JBQ3hDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFVO3dCQUM1QyxPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25ELENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sV0FBc0MsQ0FBQztZQUNoRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRztJQUNILHNDQUFRLEdBQVI7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0MsSUFBSSxDQUFDLFVBQUMsRUFBRSxJQUFLLE9BQUEsRUFBdUIsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0csMkNBQWEsR0FBbkIsVUFBb0IsV0FBK0I7Ozs7Z0JBQ2pELHNCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxDQUFDO3lCQUNoRSxJQUFJLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxFQUE0QixFQUE1QixDQUE0QixDQUFDO3lCQUMxQyxJQUFJLENBQUMsVUFBQyxVQUFVO3dCQUNmLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQU8sU0FBb0I7Ozs7b0NBQzNDLFdBQVc7b0NBQ1gscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDOzZDQUNyRSxJQUFJLENBQUMsVUFBQyxJQUFJOzRDQUNULFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBdUIsQ0FBQzt3Q0FDM0MsQ0FBQyxDQUFDLEVBQUE7O3dDQUpKLFdBQVc7d0NBQ1gsU0FHSSxDQUFDOzs7OzZCQUNOLENBQUMsQ0FBQzt3QkFDSCxPQUFPLFVBQVUsQ0FBQztvQkFDcEIsQ0FBQyxDQUFDLEVBQUM7OztLQUNOO0lBRUQ7OztPQUdHO0lBQ0csdUNBQVMsR0FBZjs7OztnQkFDRSxzQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUM5QyxJQUFJLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxFQUF3QixFQUF4QixDQUF3QixDQUFDO3lCQUN0QyxJQUFJLENBQUMsVUFBQyxNQUFNO3dCQUNYLE1BQU0sR0FBRyxNQUE0QixDQUFDO3dCQUN0QyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBTyxLQUFZOzs7O29DQUVsRCw2QkFBNkI7b0NBQzdCLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQzs2Q0FDekUsSUFBSSxDQUFDLFVBQUMsUUFBUTs0Q0FDYixLQUFLLENBQUMsUUFBUSxHQUFHLFFBQStCLENBQUM7d0NBQ25ELENBQUMsQ0FBQyxFQUFBOzt3Q0FKSiw2QkFBNkI7d0NBQzdCLFNBR0ksQ0FBQzt3Q0FFTCx5QkFBeUI7d0NBQ3pCLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aURBQ3BHLElBQUksQ0FBQyxVQUFDLEtBQUs7Z0RBQ1YsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUErQixDQUFDOzRDQUNoRCxDQUFDLENBQUMsRUFBQTs7d0NBSkoseUJBQXlCO3dDQUN6QixTQUdJLENBQUM7d0NBRUwsZ0NBQWdDO3dDQUNoQyxxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxhQUFhLENBQUM7aURBQzdFLElBQUksQ0FBQyxVQUFDLFVBQVU7Z0RBQ2YsS0FBSyxDQUFDLFVBQVUsR0FBRyxVQUFtQyxDQUFDOzRDQUN6RCxDQUFDLENBQUMsRUFBQTs7d0NBSkosZ0NBQWdDO3dDQUNoQyxTQUdJLENBQUM7d0NBQ0wsc0JBQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFDOzs7NkJBQzFCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDUCxPQUFPLE1BQU0sQ0FBQzt3QkFDaEIsQ0FBQyxDQUFDLENBQUM7b0JBRUwsQ0FBQyxDQUFDLEVBQUM7OztLQUNOO0lBRUQ7Ozs7T0FJRztJQUNLLG1DQUFLLEdBQWIsVUFBYyxNQUFNLEVBQUUsV0FBK0IsRUFBRSxFQUFXO1FBQWxFLGlCQWdDQztRQS9CQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsVUFBQSxHQUFHO1lBQ25FLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUU7Z0JBQ2pCLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQUMsQ0FBa0I7b0JBQ3BDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2RyxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQ0QsT0FBTyxNQUFNLElBQUksR0FBRyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxVQUFVO2FBQ2QsZUFBZSxFQUFFO2FBQ2pCLElBQUksQ0FDSCxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztZQUN0QixJQUFNLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQVksQ0FBQztZQUM1QyxJQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDNUIsWUFBWTtZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDaEIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsRUFOVyxDQU1YLENBQUMsRUFDSCxHQUFHLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxVQUFBLEdBQUc7WUFDaEMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNSLE9BQU8sR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDdEI7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsQ0FBQyxFQUxhLENBS2IsQ0FBQyxDQUNKO2FBQ0EsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFO2FBQ2hDLElBQUksQ0FBQyxVQUFDLEVBQUU7WUFDUCxPQUFPLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0sseUNBQVcsR0FBbkIsVUFBb0IsTUFBTSxFQUFFLEVBQVU7UUFBdEMsaUJBa0JDO1FBakJDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUksTUFBTSxDQUFDLElBQUksU0FBSSxFQUFJLENBQUMsQ0FBQztRQUN0RSxPQUFPLFVBQVU7YUFDZCxlQUFlLEVBQUU7YUFDakIsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFBLENBQUM7WUFDSCxJQUFNLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBWSxDQUFDO1lBQ3hDLElBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ3hCLFlBQVk7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQ0g7YUFDQSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUU7YUFDaEMsSUFBSSxDQUFDLFVBQUMsRUFBRTtZQUNQLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1RCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssa0RBQW9CLEdBQTVCLFVBQTZCLElBQVcsRUFBRSxVQUFvQztRQUM1RSxJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBQyxDQUFDO1lBQ1osSUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztRQUNILHNCQUFzQjtRQUN0QixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsOENBQWdCLEdBQWhCLFVBQWlCLE1BQXFCO1FBQXRDLGlCQVFDO1FBUEMsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0YsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDNUMsSUFBSSxDQUFDO1lBQ0osTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDZixLQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLGFBQVcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFNLENBQUMsQ0FBQztRQUM5RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCw4Q0FBZ0IsR0FBaEIsVUFBaUIsTUFBcUI7UUFDcEMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3RixVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxzQ0FBUSxHQUFSLFVBQVMsU0FBaUI7UUFDeEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFLO1lBQy9CLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNWLENBQUM7SUFFRCwyQkFBMkI7SUFFM0IseUNBQVcsR0FBWDtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsNkNBQWUsR0FBZjtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsNENBQWMsR0FBZDtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsa0RBQW9CLEdBQXBCO1FBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyx5Q0FBVyxHQUFuQixVQUFvQixJQUFZO1FBQWhDLGlCQWNDO1FBYkMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBRTthQUM3RCxJQUFJLENBQUMsVUFBTSxHQUFHOzs7Ozs7d0JBRVAsS0FBSyxHQUFHLEVBQUUsQ0FBQzt3QkFDakIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87NEJBQ2pCLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3RCLENBQUMsQ0FBQyxDQUFDO3dCQUNILHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBTSxPQUFPOzs7Z0RBQzFDLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUE7OzRDQUExQixTQUEwQixDQUFDOzRDQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVUsSUFBTSxDQUFDLENBQUM7NENBQzlCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsWUFBVSxJQUFNLENBQUMsQ0FBQzs7OztpQ0FDekQsQ0FBQyxDQUFDLEVBQUE7O3dCQUpILFNBSUcsQ0FBQzs7OzthQUNMLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwrQ0FBaUIsR0FBakIsVUFBa0IsRUFBRTtRQUNsQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCwyQ0FBYSxHQUFiLFVBQWMsSUFBWSxFQUFFLEVBQVU7UUFDcEMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFJLElBQUksU0FBSSxFQUFJLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4RSxDQUFDO0lBRUQsa0JBQWtCO0lBRWxCLG9DQUFNLEdBQU4sVUFBTyxJQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNuRixJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ1gsTUFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsS0FBSztZQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDhCQUE4QjtJQUM5QixvQ0FBTSxHQUFOLFVBQU8sSUFBYztRQUNuQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDL0UsSUFBSSxDQUFDLFVBQUMsTUFBTTtZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsaUVBQWlFO1lBQ2pFLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsS0FBSztZQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBblpzQyxnQkFBZ0I7Z0JBQ2IsbUJBQW1CO2dCQUN0QixnQkFBZ0I7Z0JBQ2IsbUJBQW1CO2dCQUM1QixVQUFVO2dCQUNMLGVBQWU7OztJQXpDMUMsbUJBQW1CO1FBSC9CLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7T0FDVyxtQkFBbUIsQ0F3Yi9COzhCQWhkRDtDQWdkQyxBQXhiRCxJQXdiQztTQXhiWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0FuZ3VsYXJGaXJlc3RvcmV9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlJztcclxuaW1wb3J0IHtDdXN0b21lcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2N1c3RvbWVyL2N1c3RvbWVyJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHtEdW1teURhdGFTZXJ2aWNlfSBmcm9tICcuLi9kYXRhL2R1bW15LWRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7Zmlyc3QsIG1hcCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7SURlZmF1bHRNb2RlbCwgSURlZmF1bHRNb2RlbENvbnN0cnVjdG9yfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvaS1kZWZhdWx0LW1vZGVsJztcclxuaW1wb3J0IHtSZXN0YXVyYW50fSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvcmVzdGF1cmFudC9yZXN0YXVyYW50JztcclxuaW1wb3J0IHtDb3VyaWVyfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvY291cmllci9jb3VyaWVyJztcclxuaW1wb3J0IHtNZWFsfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvbWVhbC9tZWFsJztcclxuaW1wb3J0IHtFTlVNX1RBQkxFU30gZnJvbSAnLi4vLi4vY29uc3RhbnQvY29uc3QtdmFsdWUnO1xyXG5pbXBvcnQge05vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJy4uL21pY3Mvbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQge09yZGVySXRlbX0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyX2l0ZW0vb3JkZXItaXRlbSc7XHJcbmltcG9ydCB7T3JkZXJ9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlci9vcmRlcic7XHJcbmltcG9ydCB7UXVlcnlQYXJhbU1vZGVsfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL3F1ZXJ5LXBhcmFtLW1vZGVsXCI7XHJcbmltcG9ydCB7RGVsaXZlcnl9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHNcIjtcclxuaW1wb3J0IHtEZWxpdmVyeVN0YXR1c0hpc3Rvcnl9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnktc3RhdHVzLWhpc3RvcnlcIjtcclxuaW1wb3J0IHtNYXBTZXJ2aWNlfSBmcm9tIFwiLi4vbWFwL21hcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7QW5ndWxhckZpcmVEYXRhYmFzZX0gZnJvbSBcIkBhbmd1bGFyL2ZpcmUvZGF0YWJhc2VcIjtcclxuaW1wb3J0IHtBbmd1bGFyRmlyZUF1dGh9IGZyb20gXCJAYW5ndWxhci9maXJlL2F1dGhcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZpcmViYXNlRGF0YVNlcnZpY2Uge1xyXG4gIHJlYWRvbmx5IFRBQkxFUyA9IHtcclxuICAgIFtFTlVNX1RBQkxFUy5jdXN0b21lcl06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMuY3VzdG9tZXIsXHJcbiAgICAgIGNsYXNzOiBDdXN0b21lclxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5jb3VyaWVyXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5jb3VyaWVyLFxyXG4gICAgICBjbGFzczogQ291cmllclxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5yZXN0YXVyYW50XToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5yZXN0YXVyYW50LFxyXG4gICAgICBjbGFzczogUmVzdGF1cmFudFxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5tZWFsXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5tZWFsLFxyXG4gICAgICBjbGFzczogTWVhbFxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5vcmRlcl06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMub3JkZXIsXHJcbiAgICAgIGNsYXNzOiBPcmRlclxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5kZWxpdmVyeV06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMuZGVsaXZlcnksXHJcbiAgICAgIGNsYXNzOiBEZWxpdmVyeVxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5vcmRlcl9pdGVtXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5vcmRlcl9pdGVtLFxyXG4gICAgICBjbGFzczogT3JkZXJJdGVtXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5XToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5kZWxpdmVyeV9zdGF0dXNfaGlzdG9yeSxcclxuICAgICAgY2xhc3M6IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX0FuZ3VsYXJGaXJlc3RvcmU6IEFuZ3VsYXJGaXJlc3RvcmUsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfQW5ndWxhckZpcmVEYXRhYmFzZTogQW5ndWxhckZpcmVEYXRhYmFzZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9EdW1teURhdGFTZXJ2aWNlOiBEdW1teURhdGFTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX05vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfTWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9Bbmd1bGFyRmlyZUF1dGg6IEFuZ3VsYXJGaXJlQXV0aCkge1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmVzZXQgREJcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyByZXNldERCKCkge1xyXG4gICAgLy8gZGVsZXRlIHRhYmxlc1xyXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXy5tYXAodGhpcy5UQUJMRVMsIGFzeW5jICh4KSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuZGVsZXRlVGFibGUoeC5uYW1lKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvLyBhZGQgdGFibGVzXHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbChfLm1hcCh0aGlzLlRBQkxFUywgYXN5bmMgKHgpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5hZGREQih4KTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvLyBjb252ZXJzZU1lYWxcclxuICAgIGF3YWl0IHRoaXMubGlua1Jlc3RhdXJhbnRNZWFsREIoKTtcclxuXHJcbiAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKCdBbGwgZGF0YSBpcyByZXNldCEhJyk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBsaW5rIHJlc3RhdXJhbnQgYW5kIG1lYWxzIGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyBsaW5rUmVzdGF1cmFudE1lYWxEQigpIHtcclxuICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoJ0xpbmsgUmVzdGF1cmFudCAmIE1lYWwgZGF0YScpO1xyXG4gICAgYXdhaXQgdGhpcy5nZXRSZXN0YXVyYW50KClcclxuICAgICAgLnRoZW4oKHJlc3RhdXJhbnRzKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdGF1cmFudHMpO1xyXG4gICAgICAgIHRoaXMuZ2V0TWVhbHMoKVxyXG4gICAgICAgICAgLnRoZW4oKG1lYWxzKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lYWxzKTtcclxuICAgICAgICAgICAgXy5tYXAocmVzdGF1cmFudHMsIChyZXN0YXVyYW50OiBSZXN0YXVyYW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdGF1cmFudCk7XHJcbiAgICAgICAgICAgICAgcmVzdGF1cmFudC5tZWFsX2lkcyA9IF8ubWFwKF8uZmlsdGVyKG1lYWxzLCAobWVhbDogTWVhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3RhdXJhbnQubmFtZSA9PT0gbWVhbC5yZXN0YXVyYW50X25hbWU7XHJcbiAgICAgICAgICAgICAgfSksIHggPT4geC5pZCk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5yZXN0YXVyYW50XS5uYW1lKVxyXG4gICAgICAgICAgICAgICAgLmRvYyhyZXN0YXVyYW50LmlkKS5zZXQocmVzdGF1cmFudC5nZXREYXRhKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBhZGQgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHVua25vd25bXT59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGREQihvYmplY3QpIHtcclxuICAgIHJldHVybiB0aGlzLl9EdW1teURhdGFTZXJ2aWNlLmNvbnZlcnREdW1teURhdGFUb01vZGVsKG9iamVjdC5uYW1lLCBvYmplY3QuY2xhc3MpXHJcbiAgICAgIC50aGVuKGFzeW5jIChycykgPT4ge1xyXG4gICAgICAgIGlmICghcnMpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaXRlbXNDb2xsZWN0aW9uID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKG9iamVjdC5uYW1lKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwoXy5tYXAocnMsIGFzeW5jICh4KSA9PiB7XHJcbiAgICAgICAgICBhd2FpdCBpdGVtc0NvbGxlY3Rpb24uYWRkKHguZ2V0RGF0YSgpKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBhZGQgJHtvYmplY3QubmFtZX1gKTtcclxuICAgICAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYGFkZCAke29iamVjdC5uYW1lfWApO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgY3VzdG9tZXIgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEN1c3RvbWVyW10+fVxyXG4gICAqL1xyXG4gIGdldEN1c3RvbWVyKCk6IFByb21pc2U8Q3VzdG9tZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuY3VzdG9tZXJdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgQ3VzdG9tZXJbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgY291cmllciBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8Q291cmllcltdPn1cclxuICAgKi9cclxuICBnZXRDb3VyaWVyKCk6IFByb21pc2U8Q291cmllcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jb3VyaWVyXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIENvdXJpZXJbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgZGVsaXZlcnkgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPERlbGl2ZXJ5W10+fVxyXG4gICAqL1xyXG4gIGdldERlbGl2ZXJpZXMoKTogUHJvbWlzZTxEZWxpdmVyeVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBEZWxpdmVyeVtdKVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXREZWxpdmVyeVN0YXR1c0hpc3RvcnkoKVxyXG4gICAgICAgICAgLnRoZW4oKGhpc3RvcmllcykgPT4ge1xyXG4gICAgICAgICAgICBfLm1hcChycywgKGRlbGl2ZXJ5OiBEZWxpdmVyeSkgPT4ge1xyXG4gICAgICAgICAgICAgIGRlbGl2ZXJ5LnNldFN0YXR1c0hpc3RvcnkoXy5maWx0ZXIoaGlzdG9yaWVzLCAoeDogRGVsaXZlcnlTdGF0dXNIaXN0b3J5KSA9PiB4LmRlbGl2ZXJ5X2lkID09PSBkZWxpdmVyeS5pZCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJzO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGVsaXZlcnlCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPERlbGl2ZXJ5PiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV0sIGlkKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgRGVsaXZlcnkpXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSgpXHJcbiAgICAgICAgICAudGhlbigoaGlzdG9yaWVzKSA9PiB7XHJcbiAgICAgICAgICAgIHJzLnNldFN0YXR1c0hpc3RvcnkoXy5maWx0ZXIoaGlzdG9yaWVzLCAoeDogRGVsaXZlcnlTdGF0dXNIaXN0b3J5KSA9PiB4LmRlbGl2ZXJ5X2lkID09PSBpZCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gcnM7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXREZWxpdmVyeVN0YXR1c0hpc3RvcnkoKTogUHJvbWlzZTxEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnlfc3RhdHVzX2hpc3RvcnldKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgRGVsaXZlcnlTdGF0dXNIaXN0b3J5W10pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0U3RhdHVzSGlzdG9yeU9mRGVsaXZlcnkocXVlcnlQYXJhbXM/OiBRdWVyeVBhcmFtTW9kZWxbXSk6IFByb21pc2U8RGVsaXZlcnlTdGF0dXNIaXN0b3J5W10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5XSwgcXVlcnlQYXJhbXMpXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgcmVzdGF1cmFudCBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8UmVzdGF1cmFudFtdPn1cclxuICAgKi9cclxuICBnZXRSZXN0YXVyYW50KCk6IFByb21pc2U8UmVzdGF1cmFudFtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5yZXN0YXVyYW50XSlcclxuICAgICAgLnRoZW4oKHJlc3RhdXJhbnRzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWVhbHMoKVxyXG4gICAgICAgICAgLnRoZW4oKG1lYWxzKSA9PiB7XHJcbiAgICAgICAgICAgIF8ubWFwKHJlc3RhdXJhbnRzLCAocmVzdGF1cmFudDogUmVzdGF1cmFudCkgPT4ge1xyXG4gICAgICAgICAgICAgIHJlc3RhdXJhbnQubWVhbHMgPSBfLmZpbHRlcihtZWFscywgKG1lYWw6IE1lYWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN0YXVyYW50Lm1lYWxfaWRzLmluZGV4T2YobWVhbC5pZCkgPj0gMDtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN0YXVyYW50cyBhcyB1bmtub3duIGFzIFJlc3RhdXJhbnRbXTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBtZWFscyBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8TWVhbFtdPn1cclxuICAgKi9cclxuICBnZXRNZWFscygpOiBQcm9taXNlPE1lYWxbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMubWVhbF0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBNZWFsW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IG9yZGVyIGl0ZW1zIGRhdGFcclxuICAgKiBAcGFyYW0gcXVlcnlQYXJhbXNcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNZWFsW10+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGdldE9yZGVySXRlbXMocXVlcnlQYXJhbXM/OiBRdWVyeVBhcmFtTW9kZWxbXSk6IFByb21pc2U8T3JkZXJJdGVtW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm9yZGVyX2l0ZW1dLCBxdWVyeVBhcmFtcylcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIE9yZGVySXRlbVtdKVxyXG4gICAgICAudGhlbigob3JkZXJJdGVtcykgPT4ge1xyXG4gICAgICAgIF8ubWFwKG9yZGVySXRlbXMsIGFzeW5jIChvcmRlckl0ZW06IE9yZGVySXRlbSkgPT4ge1xyXG4gICAgICAgICAgLy8gZ2V0IG1lYWxcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0REJXaXRoSWQodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMubWVhbF0sIG9yZGVySXRlbS5tZWFsX2lkKVxyXG4gICAgICAgICAgICAudGhlbigobWVhbCkgPT4ge1xyXG4gICAgICAgICAgICAgIG9yZGVySXRlbS5tZWFsID0gbWVhbCBhcyB1bmtub3duIGFzIE1lYWw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvcmRlckl0ZW1zO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvcmRlciBkZXRhaWxzXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8T3JkZXJbXT59XHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0T3JkZXJzKCk6IFByb21pc2U8T3JkZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgT3JkZXJbXSlcclxuICAgICAgLnRoZW4oKG9yZGVycykgPT4ge1xyXG4gICAgICAgIG9yZGVycyA9IG9yZGVycyBhcyB1bmtub3duIGFzIE9yZGVyW107XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKF8ubWFwKG9yZGVycywgYXN5bmMgKG9yZGVyOiBPcmRlcikgPT4ge1xyXG5cclxuICAgICAgICAgIC8vIGdldCBjdXN0b21lciBvZiBlYWNoIG9yZGVyXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmN1c3RvbWVyXSwgb3JkZXIuY3VzdG9tZXJfaWQpXHJcbiAgICAgICAgICAgIC50aGVuKChjdXN0b21lcikgPT4ge1xyXG4gICAgICAgICAgICAgIG9yZGVyLmN1c3RvbWVyID0gY3VzdG9tZXIgYXMgdW5rbm93biBhcyBDdXN0b21lcjtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gZ2V0IGl0ZW0gb2YgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXRPcmRlckl0ZW1zKFtuZXcgUXVlcnlQYXJhbU1vZGVsKCdvcmRlcl9pZCcsIFF1ZXJ5UGFyYW1Nb2RlbC5PUEVSQVRJT05TLkVRVUFMLCBvcmRlci5pZCldKVxyXG4gICAgICAgICAgICAudGhlbigoaXRlbXMpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5pdGVtcyA9IGl0ZW1zIGFzIHVua25vd24gYXMgT3JkZXJJdGVtW107XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIGdldCByZXN0YXVyYW50IGZvciBlYWNoIG9yZGVyXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdLCBvcmRlci5yZXN0YXVyYW50X2lkKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdGF1cmFudCkgPT4ge1xyXG4gICAgICAgICAgICAgIG9yZGVyLnJlc3RhdXJhbnQgPSByZXN0YXVyYW50IGFzIHVua25vd24gYXMgUmVzdGF1cmFudDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfSkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG9yZGVycztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGRhdGEgb2YgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXT59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXREQihvYmplY3QsIHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10sIGlkPzogc3RyaW5nKTogUHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXT4ge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbihvYmplY3QubmFtZSwgcmVmID0+IHtcclxuICAgICAgbGV0IG5ld1JlZiA9IG51bGw7XHJcbiAgICAgIGlmICghIXF1ZXJ5UGFyYW1zKSB7XHJcbiAgICAgICAgXy5tYXAocXVlcnlQYXJhbXMsICh4OiBRdWVyeVBhcmFtTW9kZWwpID0+IHtcclxuICAgICAgICAgIG5ld1JlZiA9IG5ld1JlZiA/IG5ld1JlZi53aGVyZSh4LmtleSwgeC5vcGVyYXRpb24sIHgudmFsdWUpIDogcmVmLndoZXJlKHgua2V5LCB4Lm9wZXJhdGlvbiwgeC52YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5ld1JlZiB8fCByZWY7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY29sbGVjdGlvblxyXG4gICAgICAuc25hcHNob3RDaGFuZ2VzKClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKGl0ZW1zID0+IGl0ZW1zLm1hcChhID0+IHtcclxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhLnBheWxvYWQuZG9jLmRhdGEoKSBhcyBPYmplY3Q7XHJcbiAgICAgICAgICBjb25zdCBpZCA9IGEucGF5bG9hZC5kb2MuaWQ7XHJcbiAgICAgICAgICAvLyB1cGRhdGUgaWRcclxuICAgICAgICAgIGRhdGFbJ2lkJ10gPSBpZDtcclxuICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pKSxcclxuICAgICAgICBtYXAoKGl0ZW1zKSA9PiBfLmZpbHRlcihpdGVtcywgZG9jID0+IHtcclxuICAgICAgICAgIGlmICghIWlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkb2MuaWQgPT09IGlkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGRvYztcclxuICAgICAgICB9KSlcclxuICAgICAgKVxyXG4gICAgICAucGlwZSh0YXAoKSwgZmlyc3QoKSkudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydFRvQ2xhc3NPYmplY3QocnMsIG9iamVjdC5jbGFzcyk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IG9iamVjdCBieSBpZFxyXG4gICAqIEBwYXJhbSBvYmplY3RcclxuICAgKiBAcGFyYW0gaWRcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXT59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXREQldpdGhJZChvYmplY3QsIGlkOiBzdHJpbmcpOiBQcm9taXNlPElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcj4ge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuZG9jKGAke29iamVjdC5uYW1lfS8ke2lkfWApO1xyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb25cclxuICAgICAgLnNuYXBzaG90Q2hhbmdlcygpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChhID0+IHtcclxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhLnBheWxvYWQuZGF0YSgpIGFzIE9iamVjdDtcclxuICAgICAgICAgIGNvbnN0IGlkID0gYS5wYXlsb2FkLmlkO1xyXG4gICAgICAgICAgLy8gdXBkYXRlIGlkXHJcbiAgICAgICAgICBkYXRhWydpZCddID0gaWQ7XHJcbiAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KVxyXG4gICAgICApXHJcbiAgICAgIC5waXBlKHRhcCgpLCBmaXJzdCgpKS50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICBjb25zdCBhcnJheSA9IHRoaXMuY29udmVydFRvQ2xhc3NPYmplY3QoW3JzXSwgb2JqZWN0LmNsYXNzKTtcclxuICAgICAgICByZXR1cm4gYXJyYXkubGVuZ3RoID8gYXJyYXlbMF0gOiBudWxsO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbnZlcnQgZGF0YSB0byBjbGFzcyBvYmplY3RcclxuICAgKiBAcGFyYW0gZGF0YVxyXG4gICAqIEBwYXJhbSBtb2RlbENsYXNzXHJcbiAgICogQHJldHVybnMge2FueVtdfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29udmVydFRvQ2xhc3NPYmplY3QoZGF0YTogYW55W10sIG1vZGVsQ2xhc3M6IElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcik6IElEZWZhdWx0TW9kZWxDb25zdHJ1Y3RvcltdIHtcclxuICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICBfLm1hcChkYXRhLCAoeCkgPT4ge1xyXG4gICAgICBjb25zdCBtb2RlbCA9IG5ldyBtb2RlbENsYXNzKHgpO1xyXG4gICAgICBhcnJheS5wdXNoKG1vZGVsKTtcclxuICAgIH0pO1xyXG4gICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xyXG4gICAgcmV0dXJuIGFycmF5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY3JlYXRlIGRvY3VtZW50LCBzZXQgaWRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgY3JlYXRlV2l0aE9iamVjdChvYmplY3Q6IElEZWZhdWx0TW9kZWwpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jcmVhdGVJZCgpO1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbih0aGlzLmdldFRhYmxlKG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lKSk7XHJcbiAgICByZXR1cm4gY29sbGVjdGlvbi5kb2MoaWQpLnNldChvYmplY3QuZ2V0RGF0YSgpKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgb2JqZWN0LmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShgQ3JlYXRlZCAke29iamVjdC5jb25zdHJ1Y3Rvci5uYW1lfWApO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHVwZGF0ZSBkb2N1bWVudFxyXG4gICAqIEBwYXJhbSBvYmplY3RcclxuICAgKi9cclxuICB1cGRhdGVXaXRoT2JqZWN0KG9iamVjdDogSURlZmF1bHRNb2RlbCkge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbih0aGlzLmdldFRhYmxlKG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lKSk7XHJcbiAgICBjb2xsZWN0aW9uLmRvYyhvYmplY3QuaWQpLnVwZGF0ZShvYmplY3QuZ2V0RGF0YSgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCB0YWJsZSBuYW1lIGZyb20gY2xhc3MgbmFtZVxyXG4gICAqIEBwYXJhbSBjbGFzc05hbWVcclxuICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAqL1xyXG4gIGdldFRhYmxlKGNsYXNzTmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gXy5maW5kKHRoaXMuVEFCTEVTLCAodGFibGUpID0+IHtcclxuICAgICAgcmV0dXJuIHRhYmxlLmNsYXNzLm5hbWUgPT09IGNsYXNzTmFtZTtcclxuICAgIH0pLm5hbWU7XHJcbiAgfVxyXG5cclxuICAvKj09PT09PT09ZGVsZXRlPT09PT09PT09Ki9cclxuXHJcbiAgZGVsZXRlT3JkZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWxldGVUYWJsZSh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl0ubmFtZSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVPcmRlckl0ZW0oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWxldGVUYWJsZSh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl9pdGVtXS5uYW1lKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZURlbGl2ZXJ5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlVGFibGUodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnldLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlRGVsaXZlcnlTdGF0dXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWxldGVUYWJsZSh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV9zdGF0dXNfaGlzdG9yeV0ubmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkZWxldGUgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIG5hbWVcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBwcml2YXRlIGRlbGV0ZVRhYmxlKG5hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbihuYW1lKS5nZXQoKS50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihhc3luYyByZXMgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgICAgIHJlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgYXJyYXkucHVzaChlbGVtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChfLm1hcChhcnJheSwgYXN5bmMgZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICBhd2FpdCBlbGVtZW50LnJlZi5kZWxldGUoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBkZWxldGUgJHtuYW1lfWApO1xyXG4gICAgICAgICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShgZGVsZXRlICR7bmFtZX1gKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UG9pbnRzUmVhbFRpbWUoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFJlYWxUaW1lREIoJ3BvaW50cycsIGlkKTtcclxuICB9XHJcblxyXG4gIGdldFJlYWxUaW1lREIobmFtZTogc3RyaW5nLCBpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQW5ndWxhckZpcmVEYXRhYmFzZS5saXN0KGAke25hbWV9LyR7aWR9YCkudmFsdWVDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICAvKmF1dGhlbnRpY2F0aW9uKi9cclxuXHJcbiAgc2lnblVwKHVzZXI6IEN1c3RvbWVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQW5ndWxhckZpcmVBdXRoLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCh1c2VyLmVtYWlsLCB1c2VyLnBhc3N3b3JkKVxyXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgd2luZG93LmFsZXJ0KFwiWW91IGhhdmUgYmVlbiBzdWNjZXNzZnVsbHkgcmVnaXN0ZXJlZCFcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgd2luZG93LmFsZXJ0KGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIFNpZ24gaW4gd2l0aCBlbWFpbC9wYXNzd29yZFxyXG4gIHNpZ25Jbih1c2VyOiBDdXN0b21lcikge1xyXG4gICAgcmV0dXJuIHRoaXMuX0FuZ3VsYXJGaXJlQXV0aC5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCh1c2VyLmVtYWlsLCB1c2VyLnBhc3N3b3JkKVxyXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJzwhLS0gZW50ZXIgeW91ciByb3V0ZSBuYW1lIGhlcmUgLS0+J10pO1xyXG4gICAgICAgIHJldHVybiB1c2VyO1xyXG4gICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICB3aW5kb3cuYWxlcnQoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=