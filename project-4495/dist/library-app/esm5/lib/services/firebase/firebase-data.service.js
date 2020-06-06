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
                                    case 0: return [4 /*yield*/, this.deleteDB(x.name)];
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
     * delete data of collection
     * @param name
     * @returns {Promise<void>}
     */
    FirebaseDataService.prototype.deleteDB = function (name) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZmlyZWJhc2UvZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDckQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDOzs7OztBQUt4RTtJQTRCRSw2QkFBb0IsaUJBQW1DLEVBQ25DLGlCQUFtQyxFQUNuQyxvQkFBeUM7O1FBRnpDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtR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bnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtBbmd1bGFyRmlyZXN0b3JlfSBmcm9tICdAYW5ndWxhci9maXJlL2ZpcmVzdG9yZSc7XHJcbmltcG9ydCB7Q3VzdG9tZXJ9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9jdXN0b21lci9jdXN0b21lcic7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7RHVtbXlEYXRhU2VydmljZX0gZnJvbSAnLi4vZGF0YS9kdW1teS1kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQge2ZpcnN0LCBtYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge0lEZWZhdWx0TW9kZWwsIElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2ktZGVmYXVsdC1tb2RlbCc7XHJcbmltcG9ydCB7UmVzdGF1cmFudH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL3Jlc3RhdXJhbnQvcmVzdGF1cmFudCc7XHJcbmltcG9ydCB7Q291cmllcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2NvdXJpZXIvY291cmllcic7XHJcbmltcG9ydCB7TWVhbH0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL21lYWwvbWVhbCc7XHJcbmltcG9ydCB7RU5VTV9UQUJMRVN9IGZyb20gJy4uLy4uL2NvbnN0YW50L2NvbnN0LXZhbHVlJztcclxuaW1wb3J0IHtOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tICcuLi9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHtPcmRlckl0ZW19IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlcl9pdGVtL29yZGVyLWl0ZW0nO1xyXG5pbXBvcnQge09yZGVyfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvb3JkZXIvb3JkZXInO1xyXG5pbXBvcnQge1F1ZXJ5UGFyYW1Nb2RlbH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9xdWVyeS1wYXJhbS1tb2RlbFwiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VEYXRhU2VydmljZSB7XHJcbiAgcmVhZG9ubHkgVEFCTEVTID0ge1xyXG4gICAgW0VOVU1fVEFCTEVTLmN1c3RvbWVyXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5jdXN0b21lcixcclxuICAgICAgY2xhc3M6IEN1c3RvbWVyXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLmNvdXJpZXJdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLmNvdXJpZXIsXHJcbiAgICAgIGNsYXNzOiBDb3VyaWVyXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLnJlc3RhdXJhbnQsXHJcbiAgICAgIGNsYXNzOiBSZXN0YXVyYW50XHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLm1lYWxdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLm1lYWwsXHJcbiAgICAgIGNsYXNzOiBNZWFsXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLm9yZGVyXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5vcmRlcixcclxuICAgICAgY2xhc3M6IE9yZGVyXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLm9yZGVyX2l0ZW1dOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLm9yZGVyX2l0ZW0sXHJcbiAgICAgIGNsYXNzOiBPcmRlckl0ZW1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9Bbmd1bGFyRmlyZXN0b3JlOiBBbmd1bGFyRmlyZXN0b3JlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX0R1bW15RGF0YVNlcnZpY2U6IER1bW15RGF0YVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfTm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlc2V0IERCXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgcmVzZXREQigpIHtcclxuICAgIC8vIGRlbGV0ZSB0YWJsZXNcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKF8ubWFwKHRoaXMuVEFCTEVTLCBhc3luYyAoeCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLmRlbGV0ZURCKHgubmFtZSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLy8gYWRkIHRhYmxlc1xyXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXy5tYXAodGhpcy5UQUJMRVMsIGFzeW5jICh4KSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuYWRkREIoeCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLy8gY29udmVyc2VNZWFsXHJcbiAgICBhd2FpdCB0aGlzLmxpbmtSZXN0YXVyYW50TWVhbERCKCk7XHJcblxyXG4gICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZSgnQWxsIGRhdGEgaXMgcmVzZXQhIScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbGluayByZXN0YXVyYW50IGFuZCBtZWFscyBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgbGlua1Jlc3RhdXJhbnRNZWFsREIoKSB7XHJcbiAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKCdMaW5rIFJlc3RhdXJhbnQgJiBNZWFsIGRhdGEnKTtcclxuICAgIGF3YWl0IHRoaXMuZ2V0UmVzdGF1cmFudCgpXHJcbiAgICAgIC50aGVuKChyZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3RhdXJhbnRzKTtcclxuICAgICAgICB0aGlzLmdldE1lYWxzKClcclxuICAgICAgICAgIC50aGVuKChtZWFscykgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZWFscyk7XHJcbiAgICAgICAgICAgIF8ubWFwKHJlc3RhdXJhbnRzLCAocmVzdGF1cmFudDogUmVzdGF1cmFudCkgPT4ge1xyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3RhdXJhbnQpO1xyXG4gICAgICAgICAgICAgIHJlc3RhdXJhbnQubWVhbF9pZHMgPSBfLm1hcChfLmZpbHRlcihtZWFscywgKG1lYWw6IE1lYWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN0YXVyYW50Lm5hbWUgPT09IG1lYWwucmVzdGF1cmFudF9uYW1lO1xyXG4gICAgICAgICAgICAgIH0pLCB4ID0+IHguaWQpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMucmVzdGF1cmFudF0ubmFtZSlcclxuICAgICAgICAgICAgICAgIC5kb2MocmVzdGF1cmFudC5pZCkuc2V0KHJlc3RhdXJhbnQuZ2V0RGF0YSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkZWxldGUgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIG5hbWVcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBwcml2YXRlIGRlbGV0ZURCKG5hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbihuYW1lKS5nZXQoKS50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXMuZm9yRWFjaChhc3luYyBlbGVtZW50ID0+IHtcclxuICAgICAgICAgIGF3YWl0IGVsZW1lbnQucmVmLmRlbGV0ZSgpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYGRlbGV0ZSAke25hbWV9YCk7XHJcbiAgICAgICAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKGBkZWxldGUgJHtuYW1lfWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBhZGQgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHVua25vd25bXT59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGREQihvYmplY3QpIHtcclxuICAgIHJldHVybiB0aGlzLl9EdW1teURhdGFTZXJ2aWNlLmNvbnZlcnREdW1teURhdGFUb01vZGVsKG9iamVjdC5uYW1lLCBvYmplY3QuY2xhc3MpXHJcbiAgICAgIC50aGVuKGFzeW5jIChycykgPT4ge1xyXG4gICAgICAgIGlmICghcnMpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaXRlbXNDb2xsZWN0aW9uID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKG9iamVjdC5uYW1lKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwoXy5tYXAocnMsIGFzeW5jICh4KSA9PiB7XHJcbiAgICAgICAgICBhd2FpdCBpdGVtc0NvbGxlY3Rpb24uYWRkKHguZ2V0RGF0YSgpKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBhZGQgJHtvYmplY3QubmFtZX1gKTtcclxuICAgICAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYGFkZCAke29iamVjdC5uYW1lfWApO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgY3VzdG9tZXIgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEN1c3RvbWVyW10+fVxyXG4gICAqL1xyXG4gIGdldEN1c3RvbWVyKCk6IFByb21pc2U8Q3VzdG9tZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuY3VzdG9tZXJdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgQ3VzdG9tZXJbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgY291cmllciBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8Q291cmllcltdPn1cclxuICAgKi9cclxuICBnZXRDb3VyaWVyKCk6IFByb21pc2U8Q291cmllcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jb3VyaWVyXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIENvdXJpZXJbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgcmVzdGF1cmFudCBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8UmVzdGF1cmFudFtdPn1cclxuICAgKi9cclxuICBnZXRSZXN0YXVyYW50KCk6IFByb21pc2U8UmVzdGF1cmFudFtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5yZXN0YXVyYW50XSlcclxuICAgICAgLnRoZW4oKHJlc3RhdXJhbnRzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWVhbHMoKVxyXG4gICAgICAgICAgLnRoZW4oKG1lYWxzKSA9PiB7XHJcbiAgICAgICAgICAgIF8ubWFwKHJlc3RhdXJhbnRzLCAocmVzdGF1cmFudDogUmVzdGF1cmFudCkgPT4ge1xyXG4gICAgICAgICAgICAgIHJlc3RhdXJhbnQubWVhbHMgPSBfLmZpbHRlcihtZWFscywgKG1lYWw6IE1lYWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN0YXVyYW50Lm1lYWxfaWRzLmluZGV4T2YobWVhbC5pZCkgPj0gMDtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN0YXVyYW50cyBhcyB1bmtub3duIGFzIFJlc3RhdXJhbnRbXTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBtZWFscyBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8TWVhbFtdPn1cclxuICAgKi9cclxuICBnZXRNZWFscygpOiBQcm9taXNlPE1lYWxbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMubWVhbF0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBNZWFsW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IG9yZGVyIGl0ZW1zIGRhdGFcclxuICAgKiBAcGFyYW0gcXVlcnlQYXJhbXNcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNZWFsW10+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGdldE9yZGVySXRlbXMocXVlcnlQYXJhbXM/OiBRdWVyeVBhcmFtTW9kZWxbXSk6IFByb21pc2U8T3JkZXJJdGVtW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm9yZGVyX2l0ZW1dLCBxdWVyeVBhcmFtcylcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIE9yZGVySXRlbVtdKVxyXG4gICAgICAudGhlbigob3JkZXJJdGVtcykgPT4ge1xyXG4gICAgICAgIF8ubWFwKG9yZGVySXRlbXMsIGFzeW5jIChvcmRlckl0ZW06IE9yZGVySXRlbSkgPT4ge1xyXG4gICAgICAgICAgLy8gZ2V0IG1lYWxcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0REJXaXRoSWQodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMubWVhbF0sIG9yZGVySXRlbS5tZWFsX2lkKVxyXG4gICAgICAgICAgICAudGhlbigobWVhbCkgPT4ge1xyXG4gICAgICAgICAgICAgIG9yZGVySXRlbS5tZWFsID0gbWVhbCBhcyB1bmtub3duIGFzIE1lYWw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvcmRlckl0ZW1zO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvcmRlciBkZXRhaWxzXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8T3JkZXJbXT59XHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0T3JkZXIoKTogUHJvbWlzZTxPcmRlcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBPcmRlcltdKVxyXG4gICAgICAudGhlbigob3JkZXJzKSA9PiB7XHJcbiAgICAgICAgb3JkZXJzID0gb3JkZXJzIGFzIHVua25vd24gYXMgT3JkZXJbXVxyXG4gICAgICAgIF8ubWFwKG9yZGVycywgYXN5bmMgKG9yZGVyOiBPcmRlcikgPT4ge1xyXG5cclxuICAgICAgICAgIC8vIGdldCBjdXN0b21lciBvZiBlYWNoIG9yZGVyXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmN1c3RvbWVyXSwgb3JkZXIuY3VzdG9tZXJfaWQpXHJcbiAgICAgICAgICAgIC50aGVuKChjdXN0b21lcikgPT4ge1xyXG4gICAgICAgICAgICAgIG9yZGVyLmN1c3RvbWVyID0gY3VzdG9tZXIgYXMgdW5rbm93biBhcyBDdXN0b21lcjtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gZ2V0IGl0ZW0gb2YgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXRPcmRlckl0ZW1zKFtuZXcgUXVlcnlQYXJhbU1vZGVsKCdvcmRlcl9pZCcsIFF1ZXJ5UGFyYW1Nb2RlbC5PUEVSQVRJT05TLkVRVUFMLCBvcmRlci5pZCldKVxyXG4gICAgICAgICAgICAudGhlbigoaXRlbXMpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5pdGVtcyA9IGl0ZW1zIGFzIHVua25vd24gYXMgT3JkZXJJdGVtW107XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIGdldCByZXN0YXVyYW50IGZvciBlYWNoIG9yZGVyXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdLCBvcmRlci5yZXN0YXVyYW50X2lkKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdGF1cmFudCkgPT4ge1xyXG4gICAgICAgICAgICAgIG9yZGVyLnJlc3RhdXJhbnQgPSByZXN0YXVyYW50IGFzIHVua25vd24gYXMgUmVzdGF1cmFudDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBvcmRlcnM7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGRhdGEgb2YgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXT59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXREQihvYmplY3QsIHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10sIGlkPzogc3RyaW5nKTogUHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXT4ge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbihvYmplY3QubmFtZSwgcmVmID0+IHtcclxuICAgICAgbGV0IG5ld1JlZiA9IG51bGw7XHJcbiAgICAgIGlmICghIXF1ZXJ5UGFyYW1zKSB7XHJcbiAgICAgICAgXy5tYXAocXVlcnlQYXJhbXMsICh4OiBRdWVyeVBhcmFtTW9kZWwpID0+IHtcclxuICAgICAgICAgIG5ld1JlZiA9IG5ld1JlZiA/IG5ld1JlZi53aGVyZSh4LmtleSwgeC5vcGVyYXRpb24sIHgudmFsdWUpIDogcmVmLndoZXJlKHgua2V5LCB4Lm9wZXJhdGlvbiwgeC52YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5ld1JlZiB8fCByZWY7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY29sbGVjdGlvblxyXG4gICAgICAuc25hcHNob3RDaGFuZ2VzKClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKGl0ZW1zID0+IGl0ZW1zLm1hcChhID0+IHtcclxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhLnBheWxvYWQuZG9jLmRhdGEoKSBhcyBPYmplY3Q7XHJcbiAgICAgICAgICBjb25zdCBpZCA9IGEucGF5bG9hZC5kb2MuaWQ7XHJcbiAgICAgICAgICAvLyB1cGRhdGUgaWRcclxuICAgICAgICAgIGRhdGFbJ2lkJ10gPSBpZDtcclxuICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pKSxcclxuICAgICAgICBtYXAoKGl0ZW1zKSA9PiBfLmZpbHRlcihpdGVtcywgZG9jID0+IHtcclxuICAgICAgICAgIGlmICghIWlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkb2MuaWQgPT09IGlkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGRvYztcclxuICAgICAgICB9KSlcclxuICAgICAgKVxyXG4gICAgICAucGlwZSh0YXAoKSwgZmlyc3QoKSkudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydFRvQ2xhc3NPYmplY3QocnMsIG9iamVjdC5jbGFzcyk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IG9iamVjdCBieSBpZFxyXG4gICAqIEBwYXJhbSBvYmplY3RcclxuICAgKiBAcGFyYW0gaWRcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXT59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXREQldpdGhJZChvYmplY3QsIGlkOiBzdHJpbmcpOiBQcm9taXNlPElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcj4ge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuZG9jKGAke29iamVjdC5uYW1lfS8ke2lkfWApO1xyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb25cclxuICAgICAgLnNuYXBzaG90Q2hhbmdlcygpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChhID0+IHtcclxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhLnBheWxvYWQuZGF0YSgpIGFzIE9iamVjdDtcclxuICAgICAgICAgIGNvbnN0IGlkID0gYS5wYXlsb2FkLmlkO1xyXG4gICAgICAgICAgLy8gdXBkYXRlIGlkXHJcbiAgICAgICAgICBkYXRhWydpZCddID0gaWQ7XHJcbiAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KVxyXG4gICAgICApXHJcbiAgICAgIC5waXBlKHRhcCgpLCBmaXJzdCgpKS50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICBjb25zdCBhcnJheSA9IHRoaXMuY29udmVydFRvQ2xhc3NPYmplY3QoW3JzXSwgb2JqZWN0LmNsYXNzKTtcclxuICAgICAgICByZXR1cm4gYXJyYXkubGVuZ3RoID8gYXJyYXlbMF0gOiBudWxsO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbnZlcnQgZGF0YSB0byBjbGFzcyBvYmplY3RcclxuICAgKiBAcGFyYW0gZGF0YVxyXG4gICAqIEBwYXJhbSBtb2RlbENsYXNzXHJcbiAgICogQHJldHVybnMge2FueVtdfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29udmVydFRvQ2xhc3NPYmplY3QoZGF0YTogYW55W10sIG1vZGVsQ2xhc3M6IElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcik6IElEZWZhdWx0TW9kZWxDb25zdHJ1Y3RvcltdIHtcclxuICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICBfLm1hcChkYXRhLCAoeCkgPT4ge1xyXG4gICAgICBjb25zdCBtb2RlbCA9IG5ldyBtb2RlbENsYXNzKHgpO1xyXG4gICAgICBhcnJheS5wdXNoKG1vZGVsKTtcclxuICAgIH0pO1xyXG4gICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xyXG4gICAgcmV0dXJuIGFycmF5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY3JlYXRlIGRvY3VtZW50LCBzZXQgaWRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgY3JlYXRlV2l0aE9iamVjdChvYmplY3Q6IElEZWZhdWx0TW9kZWwpIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jcmVhdGVJZCgpO1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbih0aGlzLmdldFRhYmxlKG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lKSk7XHJcbiAgICByZXR1cm4gY29sbGVjdGlvbi5kb2MoaWQpLnNldChvYmplY3QuZ2V0RGF0YSgpKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgb2JqZWN0LmlkID0gaWQ7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdXBkYXRlIGRvY3VtZW50XHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqL1xyXG4gIHVwZGF0ZVdpdGhPYmplY3Qob2JqZWN0OiBJRGVmYXVsdE1vZGVsKSB7XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKHRoaXMuZ2V0VGFibGUob2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUpKTtcclxuICAgIGNvbGxlY3Rpb24uZG9jKG9iamVjdC5pZCkudXBkYXRlKG9iamVjdC5nZXREYXRhKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IHRhYmxlIG5hbWUgZnJvbSBjbGFzcyBuYW1lXHJcbiAgICogQHBhcmFtIGNsYXNzTmFtZVxyXG4gICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICovXHJcbiAgZ2V0VGFibGUoY2xhc3NOYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBfLmZpbmQodGhpcy5UQUJMRVMsICh0YWJsZSkgPT4ge1xyXG4gICAgICByZXR1cm4gdGFibGUuY2xhc3MubmFtZSA9PT0gY2xhc3NOYW1lO1xyXG4gICAgfSkubmFtZTtcclxuICB9XHJcbn1cclxuIl19