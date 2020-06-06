import { Subscription, BehaviorSubject } from 'rxjs';
import { __extends, __decorate, __awaiter, __generator, __read } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable, Component, NgModule } from '@angular/core';
import _ from 'lodash';
import { tap, first, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

var ENUM_TABLES;
(function (ENUM_TABLES) {
    ENUM_TABLES["customer"] = "customer";
    ENUM_TABLES["restaurant"] = "restaurant";
    ENUM_TABLES["meal"] = "meal";
    ENUM_TABLES["courier"] = "courier";
    ENUM_TABLES["order_item"] = "order_item";
    ENUM_TABLES["order"] = "order";
})(ENUM_TABLES || (ENUM_TABLES = {}));

var DefaultComponent = /** @class */ (function () {
    function DefaultComponent() {
        this.unsubscribeAll();
    }
    DefaultComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeAll();
    };
    /**
     * unsubscribe all subscription which add into the component
     * it is important to prevent subscription still exist when component is destroyed
     */
    DefaultComponent.prototype.unsubscribeAll = function () {
        if (this._subscriptionList) {
            this._subscriptionList.unsubscribe();
        }
        this._subscriptionList = new Subscription();
    };
    /**
     * add subscriptions to component storage
     * @param subscriptions
     */
    DefaultComponent.prototype.addSubscribes = function () {
        var _this = this;
        var subscriptions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            subscriptions[_i] = arguments[_i];
        }
        subscriptions.forEach(function (el) {
            _this._subscriptionList.add(el);
        });
    };
    return DefaultComponent;
}());

var DefaultModel = /** @class */ (function () {
    function DefaultModel(data) {
        if (data.hasOwnProperty('_raw')) {
            delete data['_raw'];
        }
        this._raw = data;
    }
    DefaultModel.prototype.copyInto = function (json) {
        for (var key in json) {
            if (this.hasOwnProperty(key)) {
                this[key] = json[key];
            }
        }
    };
    DefaultModel.prototype.getData = function () {
        var _this = this;
        var self = this;
        var result = {};
        Object.keys(this).map(function (key) {
            if (_this[key] instanceof DefaultModel) {
                return;
            }
            switch (key) {
                case '_raw':
                case 'meals':
                case 'items':
                    return;
            }
            result[key] = _this[key];
        });
        return result;
    };
    return DefaultModel;
}());

var Courier = /** @class */ (function (_super) {
    __extends(Courier, _super);
    function Courier(data) {
        var _this = _super.call(this, data) || this;
        _this.id = '';
        _this.name = '';
        _this.vin = '';
        _this.driver_license = '';
        _this.email = '';
        _this.phone_no = '';
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    return Courier;
}(DefaultModel));

var Customer = /** @class */ (function (_super) {
    __extends(Customer, _super);
    function Customer(data) {
        var _this = _super.call(this, data) || this;
        _this.id = '';
        _this.name = '';
        _this.address = '';
        _this.lat = '';
        _this.long = '';
        _this.phone_no = '';
        _this.email = '';
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    return Customer;
}(DefaultModel));

var Delivery = /** @class */ (function () {
    function Delivery() {
    }
    return Delivery;
}());

var Meal = /** @class */ (function (_super) {
    __extends(Meal, _super);
    function Meal(data) {
        var _this = _super.call(this, data) || this;
        _this.id = '';
        _this.name = '';
        _this.description = '';
        _this.price = 0;
        _this.image = '';
        _this.restaurant_name = '';
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    return Meal;
}(DefaultModel));

var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order(data) {
        var _this = _super.call(this, data) || this;
        _this.id = '';
        _this.date_time = 0;
        _this.restaurant_id = '';
        _this.customer_id = '';
        _this.total = 0;
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    return Order;
}(DefaultModel));

var OrderItem = /** @class */ (function (_super) {
    __extends(OrderItem, _super);
    function OrderItem(data) {
        var _this = _super.call(this, data) || this;
        _this.id = '';
        _this.order_id = '';
        _this.meal_id = '';
        _this.quantity = 0;
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    return OrderItem;
}(DefaultModel));

var OrderStatusHistory = /** @class */ (function () {
    function OrderStatusHistory() {
    }
    return OrderStatusHistory;
}());

var OrderStatusType = /** @class */ (function () {
    function OrderStatusType() {
    }
    return OrderStatusType;
}());

var Point = /** @class */ (function () {
    function Point() {
    }
    return Point;
}());

var Restaurant = /** @class */ (function (_super) {
    __extends(Restaurant, _super);
    function Restaurant(data) {
        var _this = _super.call(this, data) || this;
        _this.id = '';
        _this.name = '';
        _this.address = '';
        _this.phone_no = '';
        _this.lat = '';
        _this.long = '';
        _this.meal_ids = [];
        _this.meals = [];
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    return Restaurant;
}(DefaultModel));

var EnumOperation;
(function (EnumOperation) {
    EnumOperation["LESS"] = "<";
    EnumOperation["LESS_EQUAL"] = "<=";
    EnumOperation["EQUAL"] = "==";
    EnumOperation["GREATER"] = ">";
    EnumOperation["GREATER_EQUAL"] = ">=";
})(EnumOperation || (EnumOperation = {}));
var QueryParamModel = /** @class */ (function () {
    function QueryParamModel(key, operation, value) {
        this.key = key;
        this.operation = operation;
        this.value = value;
    }
    QueryParamModel.OPERATIONS = EnumOperation;
    return QueryParamModel;
}());

var UtilsService = /** @class */ (function () {
    function UtilsService(_HttpClient) {
        this._HttpClient = _HttpClient;
    }
    UtilsService.prototype.getJSON = function (url) {
        return this._HttpClient.get(url);
    };
    UtilsService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    UtilsService.ɵprov = ɵɵdefineInjectable({ factory: function UtilsService_Factory() { return new UtilsService(ɵɵinject(HttpClient)); }, token: UtilsService, providedIn: "root" });
    UtilsService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], UtilsService);
    return UtilsService;
}());

var DummyDataService = /** @class */ (function () {
    function DummyDataService(_UtilsService) {
        var _a;
        this._UtilsService = _UtilsService;
        this.CONSTANT_PATH = 'assets/dummy/';
        this.JSONS = (_a = {},
            _a[ENUM_TABLES.restaurant] = 'restaurant.json',
            _a[ENUM_TABLES.customer] = 'customer.json',
            _a[ENUM_TABLES.meal] = 'meal.json',
            _a[ENUM_TABLES.courier] = 'courier.json',
            _a);
    }
    DummyDataService.prototype.convertDummyDataToModel = function (table, modelClass) {
        if (!this.JSONS[table]) {
            return Promise.resolve([]);
        }
        return this._UtilsService.getJSON(this.CONSTANT_PATH + this.JSONS[table])
            .pipe(tap(), first())
            .toPromise()
            .then(function (data) {
            var array = [];
            _.map(data, function (x) {
                var model = new modelClass(x);
                array.push(model);
            });
            return array;
        });
    };
    DummyDataService.TABLES = ENUM_TABLES;
    DummyDataService.ctorParameters = function () { return [
        { type: UtilsService }
    ]; };
    DummyDataService.ɵprov = ɵɵdefineInjectable({ factory: function DummyDataService_Factory() { return new DummyDataService(ɵɵinject(UtilsService)); }, token: DummyDataService, providedIn: "root" });
    DummyDataService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], DummyDataService);
    return DummyDataService;
}());

var NotificationService = /** @class */ (function () {
    function NotificationService() {
        this._Observable_Message = new BehaviorSubject(null);
    }
    NotificationService.prototype.reset = function () {
        this._Observable_Message.next(null);
    };
    NotificationService.prototype.pushMessage = function (message) {
        this._Observable_Message.next(message);
    };
    NotificationService.prototype.getMessageOservable = function () {
        return this._Observable_Message;
    };
    NotificationService.ɵprov = ɵɵdefineInjectable({ factory: function NotificationService_Factory() { return new NotificationService(); }, token: NotificationService, providedIn: "root" });
    NotificationService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], NotificationService);
    return NotificationService;
}());

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
    FirebaseDataService.ɵprov = ɵɵdefineInjectable({ factory: function FirebaseDataService_Factory() { return new FirebaseDataService(ɵɵinject(AngularFirestore), ɵɵinject(DummyDataService), ɵɵinject(NotificationService)); }, token: FirebaseDataService, providedIn: "root" });
    FirebaseDataService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], FirebaseDataService);
    return FirebaseDataService;
}());

var SimulatorDataService = /** @class */ (function () {
    function SimulatorDataService(_FirebaseDataService) {
        this._FirebaseDataService = _FirebaseDataService;
    }
    /**
     * start simulator
     * @returns {Promise<void>}
     */
    SimulatorDataService.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Promise.all([this._FirebaseDataService.getCustomer(),
                    this._FirebaseDataService.getRestaurant()])
                    .then(function (_a) {
                    var _b = __read(_a, 2), customers = _b[0], restaurants = _b[1];
                    return __awaiter(_this, void 0, void 0, function () {
                        var customer, restaurant, meal, order, orderItem;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    console.log(customers, restaurants);
                                    customer = this.getRandom(customers);
                                    restaurant = this.getRandom(restaurants);
                                    meal = this.getRandom(restaurant.meals);
                                    console.log(customer, restaurant, meal);
                                    console.log(customer instanceof DefaultModel);
                                    order = new Order({
                                        date_time: new Date().getTime(),
                                        restaurant_id: restaurant.id,
                                        customer_id: customer.id
                                    });
                                    return [4 /*yield*/, this._FirebaseDataService.createWithObject(order)];
                                case 1:
                                    _c.sent();
                                    orderItem = new OrderItem({
                                        meal_id: meal.id,
                                        quantity: this.getRandom(5),
                                        order_id: order.id
                                    });
                                    orderItem.meal = meal;
                                    orderItem.order = order;
                                    return [4 /*yield*/, this._FirebaseDataService.createWithObject(orderItem)];
                                case 2:
                                    _c.sent();
                                    order.total += orderItem.meal.price * orderItem.quantity;
                                    this._FirebaseDataService.updateWithObject(order);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    SimulatorDataService.prototype.stop = function () {
    };
    /**
     * get random
     * @param value
     * @returns {any | null | number}
     */
    SimulatorDataService.prototype.getRandom = function (value) {
        if (!isNaN(Number(value))) {
            return _.random(0, value);
        }
        else {
            value = value;
            return value[_.random(0, value.length - 1)];
        }
        return null;
    };
    SimulatorDataService.ctorParameters = function () { return [
        { type: FirebaseDataService }
    ]; };
    SimulatorDataService.ɵprov = ɵɵdefineInjectable({ factory: function SimulatorDataService_Factory() { return new SimulatorDataService(ɵɵinject(FirebaseDataService)); }, token: SimulatorDataService, providedIn: "root" });
    SimulatorDataService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], SimulatorDataService);
    return SimulatorDataService;
}());

var LibraryAppService = /** @class */ (function () {
    function LibraryAppService() {
    }
    LibraryAppService.prototype.testString = function () {
        return 'Hello';
    };
    LibraryAppService.ɵprov = ɵɵdefineInjectable({ factory: function LibraryAppService_Factory() { return new LibraryAppService(); }, token: LibraryAppService, providedIn: "root" });
    LibraryAppService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], LibraryAppService);
    return LibraryAppService;
}());

var LibraryAppComponent = /** @class */ (function () {
    function LibraryAppComponent() {
    }
    LibraryAppComponent.prototype.ngOnInit = function () {
    };
    LibraryAppComponent = __decorate([
        Component({
            selector: 'lib-library-app',
            template: "\n    <p>\n      library-app works!\n    </p>\n  "
        })
    ], LibraryAppComponent);
    return LibraryAppComponent;
}());

var LibraryAppModule = /** @class */ (function () {
    function LibraryAppModule() {
    }
    LibraryAppModule = __decorate([
        NgModule({
            declarations: [LibraryAppComponent],
            imports: [],
            exports: [LibraryAppComponent]
        })
    ], LibraryAppModule);
    return LibraryAppModule;
}());

var TestAppService = /** @class */ (function () {
    function TestAppService() {
    }
    TestAppService.prototype.testString = function () {
        return 'Hello Test App';
    };
    TestAppService.ɵprov = ɵɵdefineInjectable({ factory: function TestAppService_Factory() { return new TestAppService(); }, token: TestAppService, providedIn: "root" });
    TestAppService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], TestAppService);
    return TestAppService;
}());

/*
 * Public API Surface of library-app
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Courier, Customer, DefaultComponent, DefaultModel, Delivery, DummyDataService, ENUM_TABLES, FirebaseDataService, LibraryAppComponent, LibraryAppModule, LibraryAppService, Meal, NotificationService, Order, OrderItem, OrderStatusHistory, OrderStatusType, Point, QueryParamModel, Restaurant, SimulatorDataService, TestAppService, UtilsService };
//# sourceMappingURL=library-app.js.map
