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
            _a[ENUM_TABLES.order_item] = {
                name: ENUM_TABLES.order_item,
                class: OrderItem
            },
            _a[ENUM_TABLES.order_status_history] = {
                name: ENUM_TABLES.order_status_history,
                class: OrderItem
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
        var id = this._AngularFirestore.createId();
        var collection = this._AngularFirestore.collection(this.getTable(object.constructor.name));
        return collection.doc(id).set(object.getData())
            .then(function () {
            object.id = id;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZmlyZWJhc2UvZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDckQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDOzs7OztBQUt4RTtJQWdDRSw2QkFBb0IsaUJBQW1DLEVBQ25DLGlCQUFtQyxFQUNuQyxvQkFBeUM7O1FBRnpDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtR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LENBQUMsVUFBQSxHQUFHO1lBQ1AsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQU0sT0FBTzs7O2dDQUM5QixxQkFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFBOzs0QkFBMUIsU0FBMEIsQ0FBQzs0QkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFVLElBQU0sQ0FBQyxDQUFDOzRCQUM5QixJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLFlBQVUsSUFBTSxDQUFDLENBQUM7Ozs7aUJBQ3pELENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBM1RzQyxnQkFBZ0I7Z0JBQ2hCLGdCQUFnQjtnQkFDYixtQkFBbUI7OztJQWxDbEQsbUJBQW1CO1FBSC9CLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7T0FDVyxtQkFBbUIsQ0E4Vi9COzhCQWpYRDtDQWlYQyxBQTlWRCxJQThWQztTQTlWWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0FuZ3VsYXJGaXJlc3RvcmV9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlJztcclxuaW1wb3J0IHtDdXN0b21lcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2N1c3RvbWVyL2N1c3RvbWVyJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHtEdW1teURhdGFTZXJ2aWNlfSBmcm9tICcuLi9kYXRhL2R1bW15LWRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7Zmlyc3QsIG1hcCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7SURlZmF1bHRNb2RlbCwgSURlZmF1bHRNb2RlbENvbnN0cnVjdG9yfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvaS1kZWZhdWx0LW1vZGVsJztcclxuaW1wb3J0IHtSZXN0YXVyYW50fSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvcmVzdGF1cmFudC9yZXN0YXVyYW50JztcclxuaW1wb3J0IHtDb3VyaWVyfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvY291cmllci9jb3VyaWVyJztcclxuaW1wb3J0IHtNZWFsfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvbWVhbC9tZWFsJztcclxuaW1wb3J0IHtFTlVNX1RBQkxFU30gZnJvbSAnLi4vLi4vY29uc3RhbnQvY29uc3QtdmFsdWUnO1xyXG5pbXBvcnQge05vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJy4uL21pY3Mvbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQge09yZGVySXRlbX0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyX2l0ZW0vb3JkZXItaXRlbSc7XHJcbmltcG9ydCB7T3JkZXJ9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlci9vcmRlcic7XHJcbmltcG9ydCB7UXVlcnlQYXJhbU1vZGVsfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL3F1ZXJ5LXBhcmFtLW1vZGVsXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZURhdGFTZXJ2aWNlIHtcclxuICByZWFkb25seSBUQUJMRVMgPSB7XHJcbiAgICBbRU5VTV9UQUJMRVMuY3VzdG9tZXJdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLmN1c3RvbWVyLFxyXG4gICAgICBjbGFzczogQ3VzdG9tZXJcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMuY291cmllcl06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMuY291cmllcixcclxuICAgICAgY2xhc3M6IENvdXJpZXJcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMucmVzdGF1cmFudF06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMucmVzdGF1cmFudCxcclxuICAgICAgY2xhc3M6IFJlc3RhdXJhbnRcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMubWVhbF06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMubWVhbCxcclxuICAgICAgY2xhc3M6IE1lYWxcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMub3JkZXJdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLm9yZGVyLFxyXG4gICAgICBjbGFzczogT3JkZXJcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMub3JkZXJfaXRlbV06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMub3JkZXJfaXRlbSxcclxuICAgICAgY2xhc3M6IE9yZGVySXRlbVxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5vcmRlcl9zdGF0dXNfaGlzdG9yeV06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMub3JkZXJfc3RhdHVzX2hpc3RvcnksXHJcbiAgICAgIGNsYXNzOiBPcmRlckl0ZW1cclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfQW5ndWxhckZpcmVzdG9yZTogQW5ndWxhckZpcmVzdG9yZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9EdW1teURhdGFTZXJ2aWNlOiBEdW1teURhdGFTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX05vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlc2V0IERCXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgcmVzZXREQigpIHtcclxuICAgIC8vIGRlbGV0ZSB0YWJsZXNcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKF8ubWFwKHRoaXMuVEFCTEVTLCBhc3luYyAoeCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLmRlbGV0ZVRhYmxlKHgubmFtZSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLy8gYWRkIHRhYmxlc1xyXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXy5tYXAodGhpcy5UQUJMRVMsIGFzeW5jICh4KSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuYWRkREIoeCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLy8gY29udmVyc2VNZWFsXHJcbiAgICBhd2FpdCB0aGlzLmxpbmtSZXN0YXVyYW50TWVhbERCKCk7XHJcblxyXG4gICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZSgnQWxsIGRhdGEgaXMgcmVzZXQhIScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbGluayByZXN0YXVyYW50IGFuZCBtZWFscyBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgbGlua1Jlc3RhdXJhbnRNZWFsREIoKSB7XHJcbiAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKCdMaW5rIFJlc3RhdXJhbnQgJiBNZWFsIGRhdGEnKTtcclxuICAgIGF3YWl0IHRoaXMuZ2V0UmVzdGF1cmFudCgpXHJcbiAgICAgIC50aGVuKChyZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3RhdXJhbnRzKTtcclxuICAgICAgICB0aGlzLmdldE1lYWxzKClcclxuICAgICAgICAgIC50aGVuKChtZWFscykgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZWFscyk7XHJcbiAgICAgICAgICAgIF8ubWFwKHJlc3RhdXJhbnRzLCAocmVzdGF1cmFudDogUmVzdGF1cmFudCkgPT4ge1xyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3RhdXJhbnQpO1xyXG4gICAgICAgICAgICAgIHJlc3RhdXJhbnQubWVhbF9pZHMgPSBfLm1hcChfLmZpbHRlcihtZWFscywgKG1lYWw6IE1lYWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN0YXVyYW50Lm5hbWUgPT09IG1lYWwucmVzdGF1cmFudF9uYW1lO1xyXG4gICAgICAgICAgICAgIH0pLCB4ID0+IHguaWQpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMucmVzdGF1cmFudF0ubmFtZSlcclxuICAgICAgICAgICAgICAgIC5kb2MocmVzdGF1cmFudC5pZCkuc2V0KHJlc3RhdXJhbnQuZ2V0RGF0YSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogYWRkIGRhdGEgb2YgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx1bmtub3duW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkREIob2JqZWN0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5fRHVtbXlEYXRhU2VydmljZS5jb252ZXJ0RHVtbXlEYXRhVG9Nb2RlbChvYmplY3QubmFtZSwgb2JqZWN0LmNsYXNzKVxyXG4gICAgICAudGhlbihhc3luYyAocnMpID0+IHtcclxuICAgICAgICBpZiAoIXJzKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGl0ZW1zQ29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbihvYmplY3QubmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKF8ubWFwKHJzLCBhc3luYyAoeCkgPT4ge1xyXG4gICAgICAgICAgYXdhaXQgaXRlbXNDb2xsZWN0aW9uLmFkZCh4LmdldERhdGEoKSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgYWRkICR7b2JqZWN0Lm5hbWV9YCk7XHJcbiAgICAgICAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKGBhZGQgJHtvYmplY3QubmFtZX1gKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGN1c3RvbWVyIGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDdXN0b21lcltdPn1cclxuICAgKi9cclxuICBnZXRDdXN0b21lcigpOiBQcm9taXNlPEN1c3RvbWVyW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmN1c3RvbWVyXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIEN1c3RvbWVyW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGNvdXJpZXIgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPENvdXJpZXJbXT59XHJcbiAgICovXHJcbiAgZ2V0Q291cmllcigpOiBQcm9taXNlPENvdXJpZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuY291cmllcl0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBDb3VyaWVyW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IHJlc3RhdXJhbnQgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3RhdXJhbnRbXT59XHJcbiAgICovXHJcbiAgZ2V0UmVzdGF1cmFudCgpOiBQcm9taXNlPFJlc3RhdXJhbnRbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMucmVzdGF1cmFudF0pXHJcbiAgICAgIC50aGVuKChyZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1lYWxzKClcclxuICAgICAgICAgIC50aGVuKChtZWFscykgPT4ge1xyXG4gICAgICAgICAgICBfLm1hcChyZXN0YXVyYW50cywgKHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICByZXN0YXVyYW50Lm1lYWxzID0gXy5maWx0ZXIobWVhbHMsIChtZWFsOiBNZWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudC5tZWFsX2lkcy5pbmRleE9mKG1lYWwuaWQpID49IDA7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudHMgYXMgdW5rbm93biBhcyBSZXN0YXVyYW50W107XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgbWVhbHMgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE1lYWxbXT59XHJcbiAgICovXHJcbiAgZ2V0TWVhbHMoKTogUHJvbWlzZTxNZWFsW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm1lYWxdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgTWVhbFtdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvcmRlciBpdGVtcyBkYXRhXHJcbiAgICogQHBhcmFtIHF1ZXJ5UGFyYW1zXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8TWVhbFtdPn1cclxuICAgKi9cclxuICBhc3luYyBnZXRPcmRlckl0ZW1zKHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10pOiBQcm9taXNlPE9yZGVySXRlbVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl9pdGVtXSwgcXVlcnlQYXJhbXMpXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBPcmRlckl0ZW1bXSlcclxuICAgICAgLnRoZW4oKG9yZGVySXRlbXMpID0+IHtcclxuICAgICAgICBfLm1hcChvcmRlckl0ZW1zLCBhc3luYyAob3JkZXJJdGVtOiBPcmRlckl0ZW0pID0+IHtcclxuICAgICAgICAgIC8vIGdldCBtZWFsXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm1lYWxdLCBvcmRlckl0ZW0ubWVhbF9pZClcclxuICAgICAgICAgICAgLnRoZW4oKG1lYWwpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlckl0ZW0ubWVhbCA9IG1lYWwgYXMgdW5rbm93biBhcyBNZWFsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gb3JkZXJJdGVtcztcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgb3JkZXIgZGV0YWlsc1xyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE9yZGVyW10+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGdldE9yZGVyKCk6IFByb21pc2U8T3JkZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgT3JkZXJbXSlcclxuICAgICAgLnRoZW4oKG9yZGVycykgPT4ge1xyXG4gICAgICAgIG9yZGVycyA9IG9yZGVycyBhcyB1bmtub3duIGFzIE9yZGVyW11cclxuICAgICAgICBfLm1hcChvcmRlcnMsIGFzeW5jIChvcmRlcjogT3JkZXIpID0+IHtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgY3VzdG9tZXIgb2YgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jdXN0b21lcl0sIG9yZGVyLmN1c3RvbWVyX2lkKVxyXG4gICAgICAgICAgICAudGhlbigoY3VzdG9tZXIpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5jdXN0b21lciA9IGN1c3RvbWVyIGFzIHVua25vd24gYXMgQ3VzdG9tZXI7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIGdldCBpdGVtIG9mIGVhY2ggb3JkZXJcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0T3JkZXJJdGVtcyhbbmV3IFF1ZXJ5UGFyYW1Nb2RlbCgnb3JkZXJfaWQnLCBRdWVyeVBhcmFtTW9kZWwuT1BFUkFUSU9OUy5FUVVBTCwgb3JkZXIuaWQpXSlcclxuICAgICAgICAgICAgLnRoZW4oKGl0ZW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgb3JkZXIuaXRlbXMgPSBpdGVtcyBhcyB1bmtub3duIGFzIE9yZGVySXRlbVtdO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgcmVzdGF1cmFudCBmb3IgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5yZXN0YXVyYW50XSwgb3JkZXIucmVzdGF1cmFudF9pZClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5yZXN0YXVyYW50ID0gcmVzdGF1cmFudCBhcyB1bmtub3duIGFzIFJlc3RhdXJhbnQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gb3JkZXJzO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0REIob2JqZWN0LCBxdWVyeVBhcmFtcz86IFF1ZXJ5UGFyYW1Nb2RlbFtdLCBpZD86IHN0cmluZyk6IFByb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+IHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24ob2JqZWN0Lm5hbWUsIHJlZiA9PiB7XHJcbiAgICAgIGxldCBuZXdSZWYgPSBudWxsO1xyXG4gICAgICBpZiAoISFxdWVyeVBhcmFtcykge1xyXG4gICAgICAgIF8ubWFwKHF1ZXJ5UGFyYW1zLCAoeDogUXVlcnlQYXJhbU1vZGVsKSA9PiB7XHJcbiAgICAgICAgICBuZXdSZWYgPSBuZXdSZWYgPyBuZXdSZWYud2hlcmUoeC5rZXksIHgub3BlcmF0aW9uLCB4LnZhbHVlKSA6IHJlZi53aGVyZSh4LmtleSwgeC5vcGVyYXRpb24sIHgudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXdSZWYgfHwgcmVmO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb25cclxuICAgICAgLnNuYXBzaG90Q2hhbmdlcygpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChpdGVtcyA9PiBpdGVtcy5tYXAoYSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYS5wYXlsb2FkLmRvYy5kYXRhKCkgYXMgT2JqZWN0O1xyXG4gICAgICAgICAgY29uc3QgaWQgPSBhLnBheWxvYWQuZG9jLmlkO1xyXG4gICAgICAgICAgLy8gdXBkYXRlIGlkXHJcbiAgICAgICAgICBkYXRhWydpZCddID0gaWQ7XHJcbiAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KSksXHJcbiAgICAgICAgbWFwKChpdGVtcykgPT4gXy5maWx0ZXIoaXRlbXMsIGRvYyA9PiB7XHJcbiAgICAgICAgICBpZiAoISFpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jLmlkID09PSBpZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBkb2M7XHJcbiAgICAgICAgfSkpXHJcbiAgICAgIClcclxuICAgICAgLnBpcGUodGFwKCksIGZpcnN0KCkpLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb0NsYXNzT2JqZWN0KHJzLCBvYmplY3QuY2xhc3MpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvYmplY3QgYnkgaWRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0REJXaXRoSWQob2JqZWN0LCBpZDogc3RyaW5nKTogUHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3I+IHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmRvYyhgJHtvYmplY3QubmFtZX0vJHtpZH1gKTtcclxuICAgIHJldHVybiBjb2xsZWN0aW9uXHJcbiAgICAgIC5zbmFwc2hvdENoYW5nZXMoKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoYSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYS5wYXlsb2FkLmRhdGEoKSBhcyBPYmplY3Q7XHJcbiAgICAgICAgICBjb25zdCBpZCA9IGEucGF5bG9hZC5pZDtcclxuICAgICAgICAgIC8vIHVwZGF0ZSBpZFxyXG4gICAgICAgICAgZGF0YVsnaWQnXSA9IGlkO1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAucGlwZSh0YXAoKSwgZmlyc3QoKSkudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSB0aGlzLmNvbnZlcnRUb0NsYXNzT2JqZWN0KFtyc10sIG9iamVjdC5jbGFzcyk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5Lmxlbmd0aCA/IGFycmF5WzBdIDogbnVsbDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjb252ZXJ0IGRhdGEgdG8gY2xhc3Mgb2JqZWN0XHJcbiAgICogQHBhcmFtIGRhdGFcclxuICAgKiBAcGFyYW0gbW9kZWxDbGFzc1xyXG4gICAqIEByZXR1cm5zIHthbnlbXX1cclxuICAgKi9cclxuICBwcml2YXRlIGNvbnZlcnRUb0NsYXNzT2JqZWN0KGRhdGE6IGFueVtdLCBtb2RlbENsYXNzOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3IpOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXSB7XHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgXy5tYXAoZGF0YSwgKHgpID0+IHtcclxuICAgICAgY29uc3QgbW9kZWwgPSBuZXcgbW9kZWxDbGFzcyh4KTtcclxuICAgICAgYXJyYXkucHVzaChtb2RlbCk7XHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuICAgIHJldHVybiBhcnJheTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBkb2N1bWVudCwgc2V0IGlkXHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGNyZWF0ZVdpdGhPYmplY3Qob2JqZWN0OiBJRGVmYXVsdE1vZGVsKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY3JlYXRlSWQoKTtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5nZXRUYWJsZShvYmplY3QuY29uc3RydWN0b3IubmFtZSkpO1xyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb24uZG9jKGlkKS5zZXQob2JqZWN0LmdldERhdGEoKSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIG9iamVjdC5pZCA9IGlkO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHVwZGF0ZSBkb2N1bWVudFxyXG4gICAqIEBwYXJhbSBvYmplY3RcclxuICAgKi9cclxuICB1cGRhdGVXaXRoT2JqZWN0KG9iamVjdDogSURlZmF1bHRNb2RlbCkge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbih0aGlzLmdldFRhYmxlKG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lKSk7XHJcbiAgICBjb2xsZWN0aW9uLmRvYyhvYmplY3QuaWQpLnVwZGF0ZShvYmplY3QuZ2V0RGF0YSgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCB0YWJsZSBuYW1lIGZyb20gY2xhc3MgbmFtZVxyXG4gICAqIEBwYXJhbSBjbGFzc05hbWVcclxuICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAqL1xyXG4gIGdldFRhYmxlKGNsYXNzTmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gXy5maW5kKHRoaXMuVEFCTEVTLCAodGFibGUpID0+IHtcclxuICAgICAgcmV0dXJuIHRhYmxlLmNsYXNzLm5hbWUgPT09IGNsYXNzTmFtZTtcclxuICAgIH0pLm5hbWU7XHJcbiAgfVxyXG5cclxuICAvKj09PT09PT09ZGVsZXRlPT09PT09PT09Ki9cclxuXHJcbiAgZGVsZXRlT3JkZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWxldGVUYWJsZSh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl0ubmFtZSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVPcmRlckl0ZW0oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWxldGVUYWJsZSh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl9pdGVtXS5uYW1lKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZURlbGl2ZXJ5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlVGFibGUodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnldLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZGVsZXRlIGRhdGEgb2YgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBuYW1lXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkZWxldGVUYWJsZShuYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24obmFtZSkuZ2V0KCkudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLmZvckVhY2goYXN5bmMgZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICBhd2FpdCBlbGVtZW50LnJlZi5kZWxldGUoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBkZWxldGUgJHtuYW1lfWApO1xyXG4gICAgICAgICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShgZGVsZXRlICR7bmFtZX1gKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuIl19