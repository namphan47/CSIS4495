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
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/firestore";
import * as i2 from "../data/dummy-data.service";
import * as i3 from "../mics/notification.service";
var FirebaseDataService = /** @class */ (function () {
    function FirebaseDataService(_AngularFirestore, _DummyDataService, _NotificationService) {
        var _a;
        this._AngularFirestore = _AngularFirestore;
        this._DummyDataService = _DummyDataService;
        this._NotificationService = _NotificationService;
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
                        return [2 /*return*/];
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
    FirebaseDataService.prototype.getDelivery = function () {
        var _this = this;
        return this.getDB(this.TABLES[ENUM_TABLES.delivery])
            .then(function (rs) { return rs; })
            .then(function (rs) {
            return _this.getDeliveryStatusHistory()
                .then(function (histories) {
                console.log(histories);
                _.map(rs, function (delivery) {
                    delivery.setStatusHistory(_.filter(histories, function (x) { return x.delivery_id === delivery.id; }));
                });
                return rs;
            });
        });
    };
    FirebaseDataService.prototype.getDeliveryStatusHistory = function () {
        return this.getDB(this.TABLES[ENUM_TABLES.delivery_status_history])
            .then(function (rs) { return rs; });
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
    FirebaseDataService.prototype.getOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getDB(this.TABLES[ENUM_TABLES.order])
                        .then(function (rs) { return rs; })
                        .then(function (orders) {
                        orders = orders;
                        _.map(orders, function (order) { return __awaiter(_this, void 0, void 0, function () {
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
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return orders;
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
    /**
     * delete data of collection
     * @param name
     * @returns {Promise<void>}
     */
    FirebaseDataService.prototype.deleteTable = function (name) {
        var _this = this;
        return this._AngularFirestore.collection(name).get().toPromise()
            .then(function (res) {
            return res.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
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
            }); });
        });
    };
    FirebaseDataService.ctorParameters = function () { return [
        { type: AngularFirestore },
        { type: DummyDataService },
        { type: NotificationService }
    ]; };
    FirebaseDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function FirebaseDataService_Factory() { return new FirebaseDataService(i0.ɵɵinject(i1.AngularFirestore), i0.ɵɵinject(i2.DummyDataService), i0.ɵɵinject(i3.NotificationService)); }, token: FirebaseDataService, providedIn: "root" });
    FirebaseDataService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], FirebaseDataService);
    return FirebaseDataService;
}());
export { FirebaseDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZmlyZWJhc2UvZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDckQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQzs7Ozs7QUFLN0Y7SUFvQ0UsNkJBQW9CLGlCQUFtQyxFQUNu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QUFuQixVQUFvQixJQUFZO1FBQWhDLGlCQVNDO1FBUkMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBRTthQUM3RCxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQ1AsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQU0sT0FBTzs7O2dDQUM5QixxQkFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFBOzs0QkFBMUIsU0FBMEIsQ0FBQzs0QkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFVLElBQU0sQ0FBQyxDQUFDOzRCQUM5QixJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLFlBQVUsSUFBTSxDQUFDLENBQUM7Ozs7aUJBQ3pELENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBcFZzQyxnQkFBZ0I7Z0JBQ2hCLGdCQUFnQjtnQkFDYixtQkFBbUI7OztJQXRDbEQsbUJBQW1CO1FBSC9CLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7T0FDVyxtQkFBbUIsQ0EyWC9COzhCQWhaRDtDQWdaQyxBQTNYRCxJQTJYQztTQTNYWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0FuZ3VsYXJGaXJlc3RvcmV9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlJztcclxuaW1wb3J0IHtDdXN0b21lcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2N1c3RvbWVyL2N1c3RvbWVyJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHtEdW1teURhdGFTZXJ2aWNlfSBmcm9tICcuLi9kYXRhL2R1bW15LWRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7Zmlyc3QsIG1hcCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7SURlZmF1bHRNb2RlbCwgSURlZmF1bHRNb2RlbENvbnN0cnVjdG9yfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvaS1kZWZhdWx0LW1vZGVsJztcclxuaW1wb3J0IHtSZXN0YXVyYW50fSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvcmVzdGF1cmFudC9yZXN0YXVyYW50JztcclxuaW1wb3J0IHtDb3VyaWVyfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvY291cmllci9jb3VyaWVyJztcclxuaW1wb3J0IHtNZWFsfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvbWVhbC9tZWFsJztcclxuaW1wb3J0IHtFTlVNX1RBQkxFU30gZnJvbSAnLi4vLi4vY29uc3RhbnQvY29uc3QtdmFsdWUnO1xyXG5pbXBvcnQge05vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJy4uL21pY3Mvbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQge09yZGVySXRlbX0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyX2l0ZW0vb3JkZXItaXRlbSc7XHJcbmltcG9ydCB7T3JkZXJ9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlci9vcmRlcic7XHJcbmltcG9ydCB7UXVlcnlQYXJhbU1vZGVsfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL3F1ZXJ5LXBhcmFtLW1vZGVsXCI7XHJcbmltcG9ydCB7RGVsaXZlcnl9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHNcIjtcclxuaW1wb3J0IHtEZWxpdmVyeVN0YXR1c0hpc3Rvcnl9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnktc3RhdHVzLWhpc3RvcnlcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZpcmViYXNlRGF0YVNlcnZpY2Uge1xyXG4gIHJlYWRvbmx5IFRBQkxFUyA9IHtcclxuICAgIFtFTlVNX1RBQkxFUy5jdXN0b21lcl06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMuY3VzdG9tZXIsXHJcbiAgICAgIGNsYXNzOiBDdXN0b21lclxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5jb3VyaWVyXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5jb3VyaWVyLFxyXG4gICAgICBjbGFzczogQ291cmllclxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5yZXN0YXVyYW50XToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5yZXN0YXVyYW50LFxyXG4gICAgICBjbGFzczogUmVzdGF1cmFudFxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5tZWFsXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5tZWFsLFxyXG4gICAgICBjbGFzczogTWVhbFxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5vcmRlcl06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMub3JkZXIsXHJcbiAgICAgIGNsYXNzOiBPcmRlclxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5kZWxpdmVyeV06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMuZGVsaXZlcnksXHJcbiAgICAgIGNsYXNzOiBEZWxpdmVyeVxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5vcmRlcl9pdGVtXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5vcmRlcl9pdGVtLFxyXG4gICAgICBjbGFzczogT3JkZXJJdGVtXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5XToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5kZWxpdmVyeV9zdGF0dXNfaGlzdG9yeSxcclxuICAgICAgY2xhc3M6IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX0FuZ3VsYXJGaXJlc3RvcmU6IEFuZ3VsYXJGaXJlc3RvcmUsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfRHVtbXlEYXRhU2VydmljZTogRHVtbXlEYXRhU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9Ob3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXNldCBEQlxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIHJlc2V0REIoKSB7XHJcbiAgICAvLyBkZWxldGUgdGFibGVzXHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbChfLm1hcCh0aGlzLlRBQkxFUywgYXN5bmMgKHgpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5kZWxldGVUYWJsZSh4Lm5hbWUpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIGFkZCB0YWJsZXNcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKF8ubWFwKHRoaXMuVEFCTEVTLCBhc3luYyAoeCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLmFkZERCKHgpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIGNvbnZlcnNlTWVhbFxyXG4gICAgYXdhaXQgdGhpcy5saW5rUmVzdGF1cmFudE1lYWxEQigpO1xyXG5cclxuICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoJ0FsbCBkYXRhIGlzIHJlc2V0ISEnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGxpbmsgcmVzdGF1cmFudCBhbmQgbWVhbHMgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGxpbmtSZXN0YXVyYW50TWVhbERCKCkge1xyXG4gICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZSgnTGluayBSZXN0YXVyYW50ICYgTWVhbCBkYXRhJyk7XHJcbiAgICBhd2FpdCB0aGlzLmdldFJlc3RhdXJhbnQoKVxyXG4gICAgICAudGhlbigocmVzdGF1cmFudHMpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN0YXVyYW50cyk7XHJcbiAgICAgICAgdGhpcy5nZXRNZWFscygpXHJcbiAgICAgICAgICAudGhlbigobWVhbHMpID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVhbHMpO1xyXG4gICAgICAgICAgICBfLm1hcChyZXN0YXVyYW50cywgKHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN0YXVyYW50KTtcclxuICAgICAgICAgICAgICByZXN0YXVyYW50Lm1lYWxfaWRzID0gXy5tYXAoXy5maWx0ZXIobWVhbHMsIChtZWFsOiBNZWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudC5uYW1lID09PSBtZWFsLnJlc3RhdXJhbnRfbmFtZTtcclxuICAgICAgICAgICAgICB9KSwgeCA9PiB4LmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAuZG9jKHJlc3RhdXJhbnQuaWQpLnNldChyZXN0YXVyYW50LmdldERhdGEoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGFkZCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dW5rbm93bltdPn1cclxuICAgKi9cclxuICBwcml2YXRlIGFkZERCKG9iamVjdCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX0R1bW15RGF0YVNlcnZpY2UuY29udmVydER1bW15RGF0YVRvTW9kZWwob2JqZWN0Lm5hbWUsIG9iamVjdC5jbGFzcylcclxuICAgICAgLnRoZW4oYXN5bmMgKHJzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFycykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpdGVtc0NvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24ob2JqZWN0Lm5hbWUpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChfLm1hcChycywgYXN5bmMgKHgpID0+IHtcclxuICAgICAgICAgIGF3YWl0IGl0ZW1zQ29sbGVjdGlvbi5hZGQoeC5nZXREYXRhKCkpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYGFkZCAke29iamVjdC5uYW1lfWApO1xyXG4gICAgICAgICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShgYWRkICR7b2JqZWN0Lm5hbWV9YCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBjdXN0b21lciBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8Q3VzdG9tZXJbXT59XHJcbiAgICovXHJcbiAgZ2V0Q3VzdG9tZXIoKTogUHJvbWlzZTxDdXN0b21lcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jdXN0b21lcl0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBDdXN0b21lcltdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBjb3VyaWVyIGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDb3VyaWVyW10+fVxyXG4gICAqL1xyXG4gIGdldENvdXJpZXIoKTogUHJvbWlzZTxDb3VyaWVyW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmNvdXJpZXJdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgQ291cmllcltdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBkZWxpdmVyeSBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8RGVsaXZlcnlbXT59XHJcbiAgICovXHJcbiAgZ2V0RGVsaXZlcnkoKTogUHJvbWlzZTxEZWxpdmVyeVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBEZWxpdmVyeVtdKVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXREZWxpdmVyeVN0YXR1c0hpc3RvcnkoKVxyXG4gICAgICAgICAgLnRoZW4oKGhpc3RvcmllcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhoaXN0b3JpZXMpO1xyXG4gICAgICAgICAgICBfLm1hcChycywgKGRlbGl2ZXJ5OiBEZWxpdmVyeSkgPT4ge1xyXG4gICAgICAgICAgICAgIGRlbGl2ZXJ5LnNldFN0YXR1c0hpc3RvcnkoXy5maWx0ZXIoaGlzdG9yaWVzLCAoeDogRGVsaXZlcnlTdGF0dXNIaXN0b3J5KSA9PiB4LmRlbGl2ZXJ5X2lkID09PSBkZWxpdmVyeS5pZCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJzO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXREZWxpdmVyeVN0YXR1c0hpc3RvcnkoKTogUHJvbWlzZTxEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnlfc3RhdHVzX2hpc3RvcnldKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgRGVsaXZlcnlTdGF0dXNIaXN0b3J5W10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IHJlc3RhdXJhbnQgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3RhdXJhbnRbXT59XHJcbiAgICovXHJcbiAgZ2V0UmVzdGF1cmFudCgpOiBQcm9taXNlPFJlc3RhdXJhbnRbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMucmVzdGF1cmFudF0pXHJcbiAgICAgIC50aGVuKChyZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1lYWxzKClcclxuICAgICAgICAgIC50aGVuKChtZWFscykgPT4ge1xyXG4gICAgICAgICAgICBfLm1hcChyZXN0YXVyYW50cywgKHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICByZXN0YXVyYW50Lm1lYWxzID0gXy5maWx0ZXIobWVhbHMsIChtZWFsOiBNZWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudC5tZWFsX2lkcy5pbmRleE9mKG1lYWwuaWQpID49IDA7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudHMgYXMgdW5rbm93biBhcyBSZXN0YXVyYW50W107XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgbWVhbHMgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE1lYWxbXT59XHJcbiAgICovXHJcbiAgZ2V0TWVhbHMoKTogUHJvbWlzZTxNZWFsW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm1lYWxdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgTWVhbFtdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvcmRlciBpdGVtcyBkYXRhXHJcbiAgICogQHBhcmFtIHF1ZXJ5UGFyYW1zXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8TWVhbFtdPn1cclxuICAgKi9cclxuICBhc3luYyBnZXRPcmRlckl0ZW1zKHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10pOiBQcm9taXNlPE9yZGVySXRlbVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl9pdGVtXSwgcXVlcnlQYXJhbXMpXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBPcmRlckl0ZW1bXSlcclxuICAgICAgLnRoZW4oKG9yZGVySXRlbXMpID0+IHtcclxuICAgICAgICBfLm1hcChvcmRlckl0ZW1zLCBhc3luYyAob3JkZXJJdGVtOiBPcmRlckl0ZW0pID0+IHtcclxuICAgICAgICAgIC8vIGdldCBtZWFsXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm1lYWxdLCBvcmRlckl0ZW0ubWVhbF9pZClcclxuICAgICAgICAgICAgLnRoZW4oKG1lYWwpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlckl0ZW0ubWVhbCA9IG1lYWwgYXMgdW5rbm93biBhcyBNZWFsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gb3JkZXJJdGVtcztcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgb3JkZXIgZGV0YWlsc1xyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE9yZGVyW10+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGdldE9yZGVyKCk6IFByb21pc2U8T3JkZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgT3JkZXJbXSlcclxuICAgICAgLnRoZW4oKG9yZGVycykgPT4ge1xyXG4gICAgICAgIG9yZGVycyA9IG9yZGVycyBhcyB1bmtub3duIGFzIE9yZGVyW11cclxuICAgICAgICBfLm1hcChvcmRlcnMsIGFzeW5jIChvcmRlcjogT3JkZXIpID0+IHtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgY3VzdG9tZXIgb2YgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jdXN0b21lcl0sIG9yZGVyLmN1c3RvbWVyX2lkKVxyXG4gICAgICAgICAgICAudGhlbigoY3VzdG9tZXIpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5jdXN0b21lciA9IGN1c3RvbWVyIGFzIHVua25vd24gYXMgQ3VzdG9tZXI7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIGdldCBpdGVtIG9mIGVhY2ggb3JkZXJcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0T3JkZXJJdGVtcyhbbmV3IFF1ZXJ5UGFyYW1Nb2RlbCgnb3JkZXJfaWQnLCBRdWVyeVBhcmFtTW9kZWwuT1BFUkFUSU9OUy5FUVVBTCwgb3JkZXIuaWQpXSlcclxuICAgICAgICAgICAgLnRoZW4oKGl0ZW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgb3JkZXIuaXRlbXMgPSBpdGVtcyBhcyB1bmtub3duIGFzIE9yZGVySXRlbVtdO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgcmVzdGF1cmFudCBmb3IgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5yZXN0YXVyYW50XSwgb3JkZXIucmVzdGF1cmFudF9pZClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5yZXN0YXVyYW50ID0gcmVzdGF1cmFudCBhcyB1bmtub3duIGFzIFJlc3RhdXJhbnQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gb3JkZXJzO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0REIob2JqZWN0LCBxdWVyeVBhcmFtcz86IFF1ZXJ5UGFyYW1Nb2RlbFtdLCBpZD86IHN0cmluZyk6IFByb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+IHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24ob2JqZWN0Lm5hbWUsIHJlZiA9PiB7XHJcbiAgICAgIGxldCBuZXdSZWYgPSBudWxsO1xyXG4gICAgICBpZiAoISFxdWVyeVBhcmFtcykge1xyXG4gICAgICAgIF8ubWFwKHF1ZXJ5UGFyYW1zLCAoeDogUXVlcnlQYXJhbU1vZGVsKSA9PiB7XHJcbiAgICAgICAgICBuZXdSZWYgPSBuZXdSZWYgPyBuZXdSZWYud2hlcmUoeC5rZXksIHgub3BlcmF0aW9uLCB4LnZhbHVlKSA6IHJlZi53aGVyZSh4LmtleSwgeC5vcGVyYXRpb24sIHgudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXdSZWYgfHwgcmVmO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb25cclxuICAgICAgLnNuYXBzaG90Q2hhbmdlcygpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChpdGVtcyA9PiBpdGVtcy5tYXAoYSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYS5wYXlsb2FkLmRvYy5kYXRhKCkgYXMgT2JqZWN0O1xyXG4gICAgICAgICAgY29uc3QgaWQgPSBhLnBheWxvYWQuZG9jLmlkO1xyXG4gICAgICAgICAgLy8gdXBkYXRlIGlkXHJcbiAgICAgICAgICBkYXRhWydpZCddID0gaWQ7XHJcbiAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KSksXHJcbiAgICAgICAgbWFwKChpdGVtcykgPT4gXy5maWx0ZXIoaXRlbXMsIGRvYyA9PiB7XHJcbiAgICAgICAgICBpZiAoISFpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jLmlkID09PSBpZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBkb2M7XHJcbiAgICAgICAgfSkpXHJcbiAgICAgIClcclxuICAgICAgLnBpcGUodGFwKCksIGZpcnN0KCkpLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb0NsYXNzT2JqZWN0KHJzLCBvYmplY3QuY2xhc3MpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvYmplY3QgYnkgaWRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0REJXaXRoSWQob2JqZWN0LCBpZDogc3RyaW5nKTogUHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3I+IHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmRvYyhgJHtvYmplY3QubmFtZX0vJHtpZH1gKTtcclxuICAgIHJldHVybiBjb2xsZWN0aW9uXHJcbiAgICAgIC5zbmFwc2hvdENoYW5nZXMoKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoYSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYS5wYXlsb2FkLmRhdGEoKSBhcyBPYmplY3Q7XHJcbiAgICAgICAgICBjb25zdCBpZCA9IGEucGF5bG9hZC5pZDtcclxuICAgICAgICAgIC8vIHVwZGF0ZSBpZFxyXG4gICAgICAgICAgZGF0YVsnaWQnXSA9IGlkO1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAucGlwZSh0YXAoKSwgZmlyc3QoKSkudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSB0aGlzLmNvbnZlcnRUb0NsYXNzT2JqZWN0KFtyc10sIG9iamVjdC5jbGFzcyk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5Lmxlbmd0aCA/IGFycmF5WzBdIDogbnVsbDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjb252ZXJ0IGRhdGEgdG8gY2xhc3Mgb2JqZWN0XHJcbiAgICogQHBhcmFtIGRhdGFcclxuICAgKiBAcGFyYW0gbW9kZWxDbGFzc1xyXG4gICAqIEByZXR1cm5zIHthbnlbXX1cclxuICAgKi9cclxuICBwcml2YXRlIGNvbnZlcnRUb0NsYXNzT2JqZWN0KGRhdGE6IGFueVtdLCBtb2RlbENsYXNzOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3IpOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXSB7XHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgXy5tYXAoZGF0YSwgKHgpID0+IHtcclxuICAgICAgY29uc3QgbW9kZWwgPSBuZXcgbW9kZWxDbGFzcyh4KTtcclxuICAgICAgYXJyYXkucHVzaChtb2RlbCk7XHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuICAgIHJldHVybiBhcnJheTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBkb2N1bWVudCwgc2V0IGlkXHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGNyZWF0ZVdpdGhPYmplY3Qob2JqZWN0OiBJRGVmYXVsdE1vZGVsKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY3JlYXRlSWQoKTtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5nZXRUYWJsZShvYmplY3QuY29uc3RydWN0b3IubmFtZSkpO1xyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uZG9jKGlkKS5zZXQob2JqZWN0LmdldERhdGEoKSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIG9iamVjdC5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYENyZWF0ZWQgJHtvYmplY3QuY29uc3RydWN0b3IubmFtZX1gKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB1cGRhdGUgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICovXHJcbiAgdXBkYXRlV2l0aE9iamVjdChvYmplY3Q6IElEZWZhdWx0TW9kZWwpIHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5nZXRUYWJsZShvYmplY3QuY29uc3RydWN0b3IubmFtZSkpO1xyXG4gICAgY29sbGVjdGlvbi5kb2Mob2JqZWN0LmlkKS51cGRhdGUob2JqZWN0LmdldERhdGEoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgdGFibGUgbmFtZSBmcm9tIGNsYXNzIG5hbWVcclxuICAgKiBAcGFyYW0gY2xhc3NOYW1lXHJcbiAgICogQHJldHVybnMge2FueX1cclxuICAgKi9cclxuICBnZXRUYWJsZShjbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIF8uZmluZCh0aGlzLlRBQkxFUywgKHRhYmxlKSA9PiB7XHJcbiAgICAgIHJldHVybiB0YWJsZS5jbGFzcy5uYW1lID09PSBjbGFzc05hbWU7XHJcbiAgICB9KS5uYW1lO1xyXG4gIH1cclxuXHJcbiAgLyo9PT09PT09PWRlbGV0ZT09PT09PT09PSovXHJcblxyXG4gIGRlbGV0ZU9yZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlVGFibGUodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJdLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlT3JkZXJJdGVtKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlVGFibGUodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJfaXRlbV0ubmFtZSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVEZWxpdmVyeSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlbGV0ZVRhYmxlKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5XS5uYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRlbGV0ZSBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gbmFtZVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGVsZXRlVGFibGUobmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKG5hbWUpLmdldCgpLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5mb3JFYWNoKGFzeW5jIGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgYXdhaXQgZWxlbWVudC5yZWYuZGVsZXRlKCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgZGVsZXRlICR7bmFtZX1gKTtcclxuICAgICAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYGRlbGV0ZSAke25hbWV9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiJdfQ==