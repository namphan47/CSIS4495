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
     * get customer by email
     * @param email
     * @returns {Promise<Customer>}
     */
    FirebaseDataService.prototype.getCustomerByEmail = function (email) {
        return this.getCustomer()
            .then(function (rs) {
            return _.find(rs, function (x) { return x.email === email; });
        });
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
        })
            .then(function (rs) {
            return Promise.all(_.map(rs, function (d) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrderById(d.order_id)
                                .then(function (o) {
                                d.order = o;
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, Promise.resolve()];
                    }
                });
            }); }))
                .then(function () {
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
    FirebaseDataService.prototype.getOrderById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getDBWithId(this.TABLES[ENUM_TABLES.order], id)
                        .then(function (rs) { return rs; })
                        .then(function (order) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    order = order;
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
                                    return [2 /*return*/, order];
                            }
                        });
                    }); })];
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
        return collection.doc(object.id).update(object.getData());
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
    /**
     * Sign in with email/password
     * @param user
     * @returns {Promise<boolean>}
     */
    FirebaseDataService.prototype.signUp = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var geoPoint;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._MapService.getLatLngFromAddress(user.address)];
                    case 1:
                        geoPoint = _a.sent();
                        user.lat = geoPoint.lat();
                        user.lng = geoPoint.lng();
                        return [2 /*return*/, this._AngularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
                                .then(function (result) {
                                // create customer object
                                delete user.password;
                                return _this.createWithObject(user)
                                    .then(function () {
                                    return true;
                                });
                            }).catch(function (error) {
                                window.alert(error.message);
                                return false;
                            })];
                }
            });
        });
    };
    /**
     * Sign in with email/password
     * @param user
     * @returns {Promise<Customer>}
     */
    FirebaseDataService.prototype.signIn = function (user) {
        var _this = this;
        return this._AngularFireAuth.signInWithEmailAndPassword(user.email, user.password)
            .then(function (result) {
            // console.log(result);
            return _this.getCustomerByEmail(user.email);
        }).catch(function (error) {
            window.alert(error.message);
            return null;
        });
    };
    /**
     * get random
     * @param value
     * @returns {any | null | number}
     */
    FirebaseDataService.prototype.getRandom = function (value) {
        if (!isNaN(Number(value))) {
            return _.random(0, value) + 1;
        }
        else {
            value = value;
            return value[_.random(0, value.length - 1)];
        }
        return null;
    };
    /**
     * checkout
     * @param customer
     * @param restaurant
     * @param orderItems
     * @returns {Promise<void>}
     */
    FirebaseDataService.prototype.checkout = function (customer, restaurant, orderItems) {
        return __awaiter(this, void 0, void 0, function () {
            var delivery, courier, _a, order_1, deliveryStatusHistory, e_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        _a = this.getRandom;
                        return [4 /*yield*/, this.getCourier()];
                    case 1:
                        courier = _a.apply(this, [_b.sent()]);
                        order_1 = new Order({
                            date_time: new Date().getTime(),
                            restaurant_id: restaurant.id,
                            customer_id: customer.id
                        });
                        return [4 /*yield*/, this.createWithObject(order_1)];
                    case 2:
                        _b.sent();
                        // create order items
                        _.map(orderItems, function (x) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        x.order_id = order_1.id;
                                        x.order = order_1;
                                        return [4 /*yield*/, this.createWithObject(x)];
                                    case 1:
                                        _a.sent();
                                        order_1.total += x.meal.price * x.quantity;
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, this.updateWithObject(order_1)];
                    case 3:
                        _b.sent();
                        // create delivery
                        delivery = new Delivery({
                            points: [],
                            courier_id: courier.id,
                            order_id: order_1.id
                        });
                        // add paths
                        return [4 /*yield*/, this._MapService.renderDirection(new google.maps.LatLng(courier.lat, courier.lng), new google.maps.LatLng(restaurant.lat, restaurant.lng))
                                .then(function (rs) {
                                delivery.path_to_restaurant = rs;
                            })];
                    case 4:
                        // add paths
                        _b.sent();
                        return [4 /*yield*/, this._MapService.renderDirection(new google.maps.LatLng(restaurant.lat, restaurant.lng), new google.maps.LatLng(customer.lat, customer.lng))
                                .then(function (rs) {
                                delivery.path_to_customer = rs;
                            })];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.createWithObject(delivery)];
                    case 6:
                        _b.sent();
                        deliveryStatusHistory = new DeliveryStatusHistory({
                            status: Delivery_Status.ORDERED,
                            delivery_id: delivery.id,
                            date_time: moment().valueOf()
                        });
                        return [4 /*yield*/, this.createWithObject(deliveryStatusHistory)];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        e_1 = _b.sent();
                        return [2 /*return*/, Promise.resolve()
                                .then(function () { return null; })];
                    case 9: return [2 /*return*/, Promise.resolve()
                            .then(function () { return delivery; })];
                }
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZmlyZWJhc2UvZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDckQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxRQUFRLEVBQUUsZUFBZSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0RBQXdELENBQUM7QUFDN0YsT0FBTyxFQUFDLFVBQVUsRUFB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dGxCRCxJQXNsQkM7U0F0bEJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7QW5ndWxhckZpcmVzdG9yZX0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9maXJlc3RvcmUnO1xyXG5pbXBvcnQge0N1c3RvbWVyfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvY3VzdG9tZXIvY3VzdG9tZXInO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQge0R1bW15RGF0YVNlcnZpY2V9IGZyb20gJy4uL2RhdGEvZHVtbXktZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHtmaXJzdCwgbWFwLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtJRGVmYXVsdE1vZGVsLCBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3J9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9pLWRlZmF1bHQtbW9kZWwnO1xyXG5pbXBvcnQge1Jlc3RhdXJhbnR9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnQnO1xyXG5pbXBvcnQge0NvdXJpZXJ9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9jb3VyaWVyL2NvdXJpZXInO1xyXG5pbXBvcnQge01lYWx9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9tZWFsL21lYWwnO1xyXG5pbXBvcnQge0VOVU1fVEFCTEVTfSBmcm9tICcuLi8uLi9jb25zdGFudC9jb25zdC12YWx1ZSc7XHJcbmltcG9ydCB7Tm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnLi4vbWljcy9ub3RpZmljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7T3JkZXJJdGVtfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvb3JkZXJfaXRlbS9vcmRlci1pdGVtJztcclxuaW1wb3J0IHtPcmRlcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyL29yZGVyJztcclxuaW1wb3J0IHtRdWVyeVBhcmFtTW9kZWx9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9xdWVyeS1wYXJhbS1tb2RlbCc7XHJcbmltcG9ydCB7RGVsaXZlcnksIERlbGl2ZXJ5X1N0YXR1c30gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzJztcclxuaW1wb3J0IHtEZWxpdmVyeVN0YXR1c0hpc3Rvcnl9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9kZWxpdmVyeS9kZWxpdmVyeS1zdGF0dXMtaGlzdG9yeSc7XHJcbmltcG9ydCB7TWFwU2VydmljZX0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHtBbmd1bGFyRmlyZURhdGFiYXNlfSBmcm9tICdAYW5ndWxhci9maXJlL2RhdGFiYXNlJztcclxuaW1wb3J0IHtBbmd1bGFyRmlyZUF1dGh9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvYXV0aCc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZpcmViYXNlRGF0YVNlcnZpY2Uge1xyXG4gIHJlYWRvbmx5IFRBQkxFUyA9IHtcclxuICAgIFtFTlVNX1RBQkxFUy5jdXN0b21lcl06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMuY3VzdG9tZXIsXHJcbiAgICAgIGNsYXNzOiBDdXN0b21lclxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5jb3VyaWVyXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5jb3VyaWVyLFxyXG4gICAgICBjbGFzczogQ291cmllclxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5yZXN0YXVyYW50XToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5yZXN0YXVyYW50LFxyXG4gICAgICBjbGFzczogUmVzdGF1cmFudFxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5tZWFsXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5tZWFsLFxyXG4gICAgICBjbGFzczogTWVhbFxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5vcmRlcl06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMub3JkZXIsXHJcbiAgICAgIGNsYXNzOiBPcmRlclxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5kZWxpdmVyeV06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMuZGVsaXZlcnksXHJcbiAgICAgIGNsYXNzOiBEZWxpdmVyeVxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5vcmRlcl9pdGVtXToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5vcmRlcl9pdGVtLFxyXG4gICAgICBjbGFzczogT3JkZXJJdGVtXHJcbiAgICB9LFxyXG4gICAgW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5XToge1xyXG4gICAgICBuYW1lOiBFTlVNX1RBQkxFUy5kZWxpdmVyeV9zdGF0dXNfaGlzdG9yeSxcclxuICAgICAgY2xhc3M6IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX0FuZ3VsYXJGaXJlc3RvcmU6IEFuZ3VsYXJGaXJlc3RvcmUsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfQW5ndWxhckZpcmVEYXRhYmFzZTogQW5ndWxhckZpcmVEYXRhYmFzZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9EdW1teURhdGFTZXJ2aWNlOiBEdW1teURhdGFTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX05vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfTWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9Bbmd1bGFyRmlyZUF1dGg6IEFuZ3VsYXJGaXJlQXV0aCkge1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmVzZXQgREJcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyByZXNldERCKCkge1xyXG4gICAgLy8gZGVsZXRlIHRhYmxlc1xyXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXy5tYXAodGhpcy5UQUJMRVMsIGFzeW5jICh4KSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuZGVsZXRlVGFibGUoeC5uYW1lKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvLyBhZGQgdGFibGVzXHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbChfLm1hcCh0aGlzLlRBQkxFUywgYXN5bmMgKHgpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5hZGREQih4KTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvLyBjb252ZXJzZU1lYWxcclxuICAgIGF3YWl0IHRoaXMubGlua1Jlc3RhdXJhbnRNZWFsREIoKTtcclxuXHJcbiAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKCdBbGwgZGF0YSBpcyByZXNldCEhJyk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBsaW5rIHJlc3RhdXJhbnQgYW5kIG1lYWxzIGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyBsaW5rUmVzdGF1cmFudE1lYWxEQigpIHtcclxuICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoJ0xpbmsgUmVzdGF1cmFudCAmIE1lYWwgZGF0YScpO1xyXG4gICAgYXdhaXQgdGhpcy5nZXRSZXN0YXVyYW50KClcclxuICAgICAgLnRoZW4oKHJlc3RhdXJhbnRzKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdGF1cmFudHMpO1xyXG4gICAgICAgIHRoaXMuZ2V0TWVhbHMoKVxyXG4gICAgICAgICAgLnRoZW4oKG1lYWxzKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lYWxzKTtcclxuICAgICAgICAgICAgXy5tYXAocmVzdGF1cmFudHMsIChyZXN0YXVyYW50OiBSZXN0YXVyYW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdGF1cmFudCk7XHJcbiAgICAgICAgICAgICAgcmVzdGF1cmFudC5tZWFsX2lkcyA9IF8ubWFwKF8uZmlsdGVyKG1lYWxzLCAobWVhbDogTWVhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3RhdXJhbnQubmFtZSA9PT0gbWVhbC5yZXN0YXVyYW50X25hbWU7XHJcbiAgICAgICAgICAgICAgfSksIHggPT4geC5pZCk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5yZXN0YXVyYW50XS5uYW1lKVxyXG4gICAgICAgICAgICAgICAgLmRvYyhyZXN0YXVyYW50LmlkKS5zZXQocmVzdGF1cmFudC5nZXREYXRhKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGFkZCBkYXRhIG9mIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dW5rbm93bltdPn1cclxuICAgKi9cclxuICBwcml2YXRlIGFkZERCKG9iamVjdCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX0R1bW15RGF0YVNlcnZpY2UuY29udmVydER1bW15RGF0YVRvTW9kZWwob2JqZWN0Lm5hbWUsIG9iamVjdC5jbGFzcylcclxuICAgICAgLnRoZW4oYXN5bmMgKHJzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFycykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpdGVtc0NvbGxlY3Rpb24gPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24ob2JqZWN0Lm5hbWUpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChfLm1hcChycywgYXN5bmMgKHgpID0+IHtcclxuICAgICAgICAgIGF3YWl0IGl0ZW1zQ29sbGVjdGlvbi5hZGQoeC5nZXREYXRhKCkpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYGFkZCAke29iamVjdC5uYW1lfWApO1xyXG4gICAgICAgICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShgYWRkICR7b2JqZWN0Lm5hbWV9YCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBjdXN0b21lciBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8Q3VzdG9tZXJbXT59XHJcbiAgICovXHJcbiAgZ2V0Q3VzdG9tZXIoKTogUHJvbWlzZTxDdXN0b21lcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jdXN0b21lcl0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBDdXN0b21lcltdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBjdXN0b21lciBieSBlbWFpbFxyXG4gICAqIEBwYXJhbSBlbWFpbFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEN1c3RvbWVyPn1cclxuICAgKi9cclxuICBnZXRDdXN0b21lckJ5RW1haWwoZW1haWw6IHN0cmluZyk6IFByb21pc2U8Q3VzdG9tZXI+IHtcclxuICAgIHJldHVybiB0aGlzLmdldEN1c3RvbWVyKClcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIF8uZmluZChycywgeCA9PiB4LmVtYWlsID09PSBlbWFpbCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGNvdXJpZXIgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPENvdXJpZXJbXT59XHJcbiAgICovXHJcbiAgZ2V0Q291cmllcigpOiBQcm9taXNlPENvdXJpZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuY291cmllcl0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBDb3VyaWVyW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGRlbGl2ZXJ5IGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxEZWxpdmVyeVtdPn1cclxuICAgKi9cclxuICBnZXREZWxpdmVyaWVzKCk6IFByb21pc2U8RGVsaXZlcnlbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnldKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgRGVsaXZlcnlbXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVsaXZlcnlTdGF0dXNIaXN0b3J5KClcclxuICAgICAgICAgIC50aGVuKChoaXN0b3JpZXMpID0+IHtcclxuICAgICAgICAgICAgXy5tYXAocnMsIChkZWxpdmVyeTogRGVsaXZlcnkpID0+IHtcclxuICAgICAgICAgICAgICBkZWxpdmVyeS5zZXRTdGF0dXNIaXN0b3J5KF8uZmlsdGVyKGhpc3RvcmllcywgKHg6IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSkgPT4geC5kZWxpdmVyeV9pZCA9PT0gZGVsaXZlcnkuaWQpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBycztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXy5tYXAocnMsIGFzeW5jIChkOiBEZWxpdmVyeSkgPT4ge1xyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXRPcmRlckJ5SWQoZC5vcmRlcl9pZClcclxuICAgICAgICAgICAgLnRoZW4oKG8pID0+IHtcclxuICAgICAgICAgICAgICBkLm9yZGVyID0gbztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBycztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldERlbGl2ZXJ5QnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxEZWxpdmVyeT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REJXaXRoSWQodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnldLCBpZClcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIERlbGl2ZXJ5KVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXREZWxpdmVyeVN0YXR1c0hpc3RvcnkoKVxyXG4gICAgICAgICAgLnRoZW4oKGhpc3RvcmllcykgPT4ge1xyXG4gICAgICAgICAgICBycy5zZXRTdGF0dXNIaXN0b3J5KF8uZmlsdGVyKGhpc3RvcmllcywgKHg6IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSkgPT4geC5kZWxpdmVyeV9pZCA9PT0gaWQpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJzO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGVsaXZlcnlTdGF0dXNIaXN0b3J5KCk6IFByb21pc2U8RGVsaXZlcnlTdGF0dXNIaXN0b3J5W10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5X3N0YXR1c19oaXN0b3J5XSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFN0YXR1c0hpc3RvcnlPZkRlbGl2ZXJ5KHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10pOiBQcm9taXNlPERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV9zdGF0dXNfaGlzdG9yeV0sIHF1ZXJ5UGFyYW1zKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgRGVsaXZlcnlTdGF0dXNIaXN0b3J5W10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IHJlc3RhdXJhbnQgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3RhdXJhbnRbXT59XHJcbiAgICovXHJcbiAgZ2V0UmVzdGF1cmFudCgpOiBQcm9taXNlPFJlc3RhdXJhbnRbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMucmVzdGF1cmFudF0pXHJcbiAgICAgIC50aGVuKChyZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1lYWxzKClcclxuICAgICAgICAgIC50aGVuKChtZWFscykgPT4ge1xyXG4gICAgICAgICAgICBfLm1hcChyZXN0YXVyYW50cywgKHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICByZXN0YXVyYW50Lm1lYWxzID0gXy5maWx0ZXIobWVhbHMsIChtZWFsOiBNZWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudC5tZWFsX2lkcy5pbmRleE9mKG1lYWwuaWQpID49IDA7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdGF1cmFudHMgYXMgdW5rbm93biBhcyBSZXN0YXVyYW50W107XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgbWVhbHMgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE1lYWxbXT59XHJcbiAgICovXHJcbiAgZ2V0TWVhbHMoKTogUHJvbWlzZTxNZWFsW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm1lYWxdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgTWVhbFtdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBvcmRlciBpdGVtcyBkYXRhXHJcbiAgICogQHBhcmFtIHF1ZXJ5UGFyYW1zXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8TWVhbFtdPn1cclxuICAgKi9cclxuICBhc3luYyBnZXRPcmRlckl0ZW1zKHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10pOiBQcm9taXNlPE9yZGVySXRlbVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl9pdGVtXSwgcXVlcnlQYXJhbXMpXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBPcmRlckl0ZW1bXSlcclxuICAgICAgLnRoZW4oKG9yZGVySXRlbXMpID0+IHtcclxuICAgICAgICBfLm1hcChvcmRlckl0ZW1zLCBhc3luYyAob3JkZXJJdGVtOiBPcmRlckl0ZW0pID0+IHtcclxuICAgICAgICAgIC8vIGdldCBtZWFsXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm1lYWxdLCBvcmRlckl0ZW0ubWVhbF9pZClcclxuICAgICAgICAgICAgLnRoZW4oKG1lYWwpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlckl0ZW0ubWVhbCA9IG1lYWwgYXMgdW5rbm93biBhcyBNZWFsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gb3JkZXJJdGVtcztcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgb3JkZXIgZGV0YWlsc1xyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE9yZGVyW10+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGdldE9yZGVycygpOiBQcm9taXNlPE9yZGVyW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm9yZGVyXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIE9yZGVyW10pXHJcbiAgICAgIC50aGVuKChvcmRlcnMpID0+IHtcclxuICAgICAgICBvcmRlcnMgPSBvcmRlcnMgYXMgdW5rbm93biBhcyBPcmRlcltdO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChfLm1hcChvcmRlcnMsIGFzeW5jIChvcmRlcjogT3JkZXIpID0+IHtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgY3VzdG9tZXIgb2YgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jdXN0b21lcl0sIG9yZGVyLmN1c3RvbWVyX2lkKVxyXG4gICAgICAgICAgICAudGhlbigoY3VzdG9tZXIpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5jdXN0b21lciA9IGN1c3RvbWVyIGFzIHVua25vd24gYXMgQ3VzdG9tZXI7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIGdldCBpdGVtIG9mIGVhY2ggb3JkZXJcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0T3JkZXJJdGVtcyhbbmV3IFF1ZXJ5UGFyYW1Nb2RlbCgnb3JkZXJfaWQnLCBRdWVyeVBhcmFtTW9kZWwuT1BFUkFUSU9OUy5FUVVBTCwgb3JkZXIuaWQpXSlcclxuICAgICAgICAgICAgLnRoZW4oKGl0ZW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgb3JkZXIuaXRlbXMgPSBpdGVtcyBhcyB1bmtub3duIGFzIE9yZGVySXRlbVtdO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgcmVzdGF1cmFudCBmb3IgZWFjaCBvcmRlclxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5yZXN0YXVyYW50XSwgb3JkZXIucmVzdGF1cmFudF9pZClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgICBvcmRlci5yZXN0YXVyYW50ID0gcmVzdGF1cmFudCBhcyB1bmtub3duIGFzIFJlc3RhdXJhbnQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBvcmRlcnM7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldE9yZGVyQnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxPcmRlcj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REJXaXRoSWQodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJdLCBpZClcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIE9yZGVyKVxyXG4gICAgICAudGhlbihhc3luYyAob3JkZXIpID0+IHtcclxuICAgICAgICBvcmRlciA9IG9yZGVyIGFzIHVua25vd24gYXMgT3JkZXI7XHJcblxyXG4gICAgICAgIC8vIGdldCBjdXN0b21lciBvZiBlYWNoIG9yZGVyXHJcbiAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5jdXN0b21lcl0sIG9yZGVyLmN1c3RvbWVyX2lkKVxyXG4gICAgICAgICAgLnRoZW4oKGN1c3RvbWVyKSA9PiB7XHJcbiAgICAgICAgICAgIG9yZGVyLmN1c3RvbWVyID0gY3VzdG9tZXIgYXMgdW5rbm93biBhcyBDdXN0b21lcjtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBnZXQgaXRlbSBvZiBlYWNoIG9yZGVyXHJcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRPcmRlckl0ZW1zKFtuZXcgUXVlcnlQYXJhbU1vZGVsKCdvcmRlcl9pZCcsIFF1ZXJ5UGFyYW1Nb2RlbC5PUEVSQVRJT05TLkVRVUFMLCBvcmRlci5pZCldKVxyXG4gICAgICAgICAgLnRoZW4oKGl0ZW1zKSA9PiB7XHJcbiAgICAgICAgICAgIG9yZGVyLml0ZW1zID0gaXRlbXMgYXMgdW5rbm93biBhcyBPcmRlckl0ZW1bXTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBnZXQgcmVzdGF1cmFudCBmb3IgZWFjaCBvcmRlclxyXG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0REJXaXRoSWQodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMucmVzdGF1cmFudF0sIG9yZGVyLnJlc3RhdXJhbnRfaWQpXHJcbiAgICAgICAgICAudGhlbigocmVzdGF1cmFudCkgPT4ge1xyXG4gICAgICAgICAgICBvcmRlci5yZXN0YXVyYW50ID0gcmVzdGF1cmFudCBhcyB1bmtub3duIGFzIFJlc3RhdXJhbnQ7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9yZGVyO1xyXG4gICAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPElEZWZhdWx0TW9kZWxDb25zdHJ1Y3RvcltdPn1cclxuICAgKi9cclxuICBwcml2YXRlIGdldERCKG9iamVjdCwgcXVlcnlQYXJhbXM/OiBRdWVyeVBhcmFtTW9kZWxbXSwgaWQ/OiBzdHJpbmcpOiBQcm9taXNlPElEZWZhdWx0TW9kZWxDb25zdHJ1Y3RvcltdPiB7XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKG9iamVjdC5uYW1lLCByZWYgPT4ge1xyXG4gICAgICBsZXQgbmV3UmVmID0gbnVsbDtcclxuICAgICAgaWYgKCEhcXVlcnlQYXJhbXMpIHtcclxuICAgICAgICBfLm1hcChxdWVyeVBhcmFtcywgKHg6IFF1ZXJ5UGFyYW1Nb2RlbCkgPT4ge1xyXG4gICAgICAgICAgbmV3UmVmID0gbmV3UmVmID8gbmV3UmVmLndoZXJlKHgua2V5LCB4Lm9wZXJhdGlvbiwgeC52YWx1ZSkgOiByZWYud2hlcmUoeC5rZXksIHgub3BlcmF0aW9uLCB4LnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV3UmVmIHx8IHJlZjtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBjb2xsZWN0aW9uXHJcbiAgICAgIC5zbmFwc2hvdENoYW5nZXMoKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoaXRlbXMgPT4gaXRlbXMubWFwKGEgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZGF0YSA9IGEucGF5bG9hZC5kb2MuZGF0YSgpIGFzIE9iamVjdDtcclxuICAgICAgICAgIGNvbnN0IGlkID0gYS5wYXlsb2FkLmRvYy5pZDtcclxuICAgICAgICAgIC8vIHVwZGF0ZSBpZFxyXG4gICAgICAgICAgZGF0YVsnaWQnXSA9IGlkO1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSkpLFxyXG4gICAgICAgIG1hcCgoaXRlbXMpID0+IF8uZmlsdGVyKGl0ZW1zLCBkb2MgPT4ge1xyXG4gICAgICAgICAgaWYgKCEhaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRvYy5pZCA9PT0gaWQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZG9jO1xyXG4gICAgICAgIH0pKVxyXG4gICAgICApXHJcbiAgICAgIC5waXBlKHRhcCgpLCBmaXJzdCgpKS50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0VG9DbGFzc09iamVjdChycywgb2JqZWN0LmNsYXNzKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgb2JqZWN0IGJ5IGlkXHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEBwYXJhbSBpZFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPElEZWZhdWx0TW9kZWxDb25zdHJ1Y3RvcltdPn1cclxuICAgKi9cclxuICBwcml2YXRlIGdldERCV2l0aElkKG9iamVjdCwgaWQ6IHN0cmluZyk6IFByb21pc2U8SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yPiB7XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5kb2MoYCR7b2JqZWN0Lm5hbWV9LyR7aWR9YCk7XHJcbiAgICByZXR1cm4gY29sbGVjdGlvblxyXG4gICAgICAuc25hcHNob3RDaGFuZ2VzKClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKGEgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZGF0YSA9IGEucGF5bG9hZC5kYXRhKCkgYXMgT2JqZWN0O1xyXG4gICAgICAgICAgY29uc3QgaWQgPSBhLnBheWxvYWQuaWQ7XHJcbiAgICAgICAgICAvLyB1cGRhdGUgaWRcclxuICAgICAgICAgIGRhdGFbJ2lkJ10gPSBpZDtcclxuICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLnBpcGUodGFwKCksIGZpcnN0KCkpLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gdGhpcy5jb252ZXJ0VG9DbGFzc09iamVjdChbcnNdLCBvYmplY3QuY2xhc3MpO1xyXG4gICAgICAgIHJldHVybiBhcnJheS5sZW5ndGggPyBhcnJheVswXSA6IG51bGw7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY29udmVydCBkYXRhIHRvIGNsYXNzIG9iamVjdFxyXG4gICAqIEBwYXJhbSBkYXRhXHJcbiAgICogQHBhcmFtIG1vZGVsQ2xhc3NcclxuICAgKiBAcmV0dXJucyB7YW55W119XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb252ZXJ0VG9DbGFzc09iamVjdChkYXRhOiBhbnlbXSwgbW9kZWxDbGFzczogSURlZmF1bHRNb2RlbENvbnN0cnVjdG9yKTogSURlZmF1bHRNb2RlbENvbnN0cnVjdG9yW10ge1xyXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcclxuICAgIF8ubWFwKGRhdGEsICh4KSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vZGVsID0gbmV3IG1vZGVsQ2xhc3MoeCk7XHJcbiAgICAgIGFycmF5LnB1c2gobW9kZWwpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhhcnJheSk7XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjcmVhdGUgZG9jdW1lbnQsIHNldCBpZFxyXG4gICAqIEBwYXJhbSBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBjcmVhdGVXaXRoT2JqZWN0KG9iamVjdDogSURlZmF1bHRNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNyZWF0ZUlkKCk7XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKHRoaXMuZ2V0VGFibGUob2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUpKTtcclxuICAgIHJldHVybiBjb2xsZWN0aW9uLmRvYyhpZCkuc2V0KG9iamVjdC5nZXREYXRhKCkpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBvYmplY3QuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKGBDcmVhdGVkICR7b2JqZWN0LmNvbnN0cnVjdG9yLm5hbWV9YCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdXBkYXRlIGRvY3VtZW50XHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqL1xyXG4gIHVwZGF0ZVdpdGhPYmplY3Qob2JqZWN0OiBJRGVmYXVsdE1vZGVsKSB7XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKHRoaXMuZ2V0VGFibGUob2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUpKTtcclxuICAgIHJldHVybiBjb2xsZWN0aW9uLmRvYyhvYmplY3QuaWQpLnVwZGF0ZShvYmplY3QuZ2V0RGF0YSgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCB0YWJsZSBuYW1lIGZyb20gY2xhc3MgbmFtZVxyXG4gICAqIEBwYXJhbSBjbGFzc05hbWVcclxuICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAqL1xyXG4gIGdldFRhYmxlKGNsYXNzTmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gXy5maW5kKHRoaXMuVEFCTEVTLCAodGFibGUpID0+IHtcclxuICAgICAgcmV0dXJuIHRhYmxlLmNsYXNzLm5hbWUgPT09IGNsYXNzTmFtZTtcclxuICAgIH0pLm5hbWU7XHJcbiAgfVxyXG5cclxuICAvKj09PT09PT09ZGVsZXRlPT09PT09PT09Ki9cclxuXHJcbiAgZGVsZXRlT3JkZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWxldGVUYWJsZSh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl0ubmFtZSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVPcmRlckl0ZW0oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWxldGVUYWJsZSh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl9pdGVtXS5uYW1lKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZURlbGl2ZXJ5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlVGFibGUodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnldLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlRGVsaXZlcnlTdGF0dXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWxldGVUYWJsZSh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV9zdGF0dXNfaGlzdG9yeV0ubmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkZWxldGUgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIG5hbWVcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBwcml2YXRlIGRlbGV0ZVRhYmxlKG5hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbihuYW1lKS5nZXQoKS50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihhc3luYyByZXMgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgICAgIHJlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgYXJyYXkucHVzaChlbGVtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChfLm1hcChhcnJheSwgYXN5bmMgZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICBhd2FpdCBlbGVtZW50LnJlZi5kZWxldGUoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBkZWxldGUgJHtuYW1lfWApO1xyXG4gICAgICAgICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShgZGVsZXRlICR7bmFtZX1gKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UG9pbnRzUmVhbFRpbWUoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFJlYWxUaW1lREIoJ3BvaW50cycsIGlkKTtcclxuICB9XHJcblxyXG4gIGdldFJlYWxUaW1lREIobmFtZTogc3RyaW5nLCBpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fQW5ndWxhckZpcmVEYXRhYmFzZS5saXN0KGAke25hbWV9LyR7aWR9YCkudmFsdWVDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICAvKmF1dGhlbnRpY2F0aW9uKi9cclxuXHJcbiAgLyoqXHJcbiAgICogU2lnbiBpbiB3aXRoIGVtYWlsL3Bhc3N3b3JkXHJcbiAgICogQHBhcmFtIHVzZXJcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cclxuICAgKi9cclxuICBhc3luYyBzaWduVXAodXNlcjogQ3VzdG9tZXIpIHtcclxuXHJcbiAgICBjb25zdCBnZW9Qb2ludCA9IGF3YWl0IHRoaXMuX01hcFNlcnZpY2UuZ2V0TGF0TG5nRnJvbUFkZHJlc3ModXNlci5hZGRyZXNzKTtcclxuICAgIHVzZXIubGF0ID0gZ2VvUG9pbnQubGF0KCk7XHJcbiAgICB1c2VyLmxuZyA9IGdlb1BvaW50LmxuZygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9Bbmd1bGFyRmlyZUF1dGguY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKHVzZXIuZW1haWwsIHVzZXIucGFzc3dvcmQpXHJcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAvLyBjcmVhdGUgY3VzdG9tZXIgb2JqZWN0XHJcbiAgICAgICAgZGVsZXRlIHVzZXIucGFzc3dvcmQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlV2l0aE9iamVjdCh1c2VyKVxyXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICB3aW5kb3cuYWxlcnQoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNpZ24gaW4gd2l0aCBlbWFpbC9wYXNzd29yZFxyXG4gICAqIEBwYXJhbSB1c2VyXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8Q3VzdG9tZXI+fVxyXG4gICAqL1xyXG4gIHNpZ25Jbih1c2VyOiBDdXN0b21lcik6IFByb21pc2U8Q3VzdG9tZXI+IHtcclxuICAgIHJldHVybiB0aGlzLl9Bbmd1bGFyRmlyZUF1dGguc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQodXNlci5lbWFpbCwgdXNlci5wYXNzd29yZClcclxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q3VzdG9tZXJCeUVtYWlsKHVzZXIuZW1haWwpO1xyXG4gICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICB3aW5kb3cuYWxlcnQoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IHJhbmRvbVxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqIEByZXR1cm5zIHthbnkgfCBudWxsIHwgbnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldFJhbmRvbSh2YWx1ZTogYW55W10gfCBudW1iZXIpOiBhbnkge1xyXG4gICAgaWYgKCFpc05hTihOdW1iZXIodmFsdWUpKSkge1xyXG4gICAgICByZXR1cm4gXy5yYW5kb20oMCwgdmFsdWUpICsgMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gdmFsdWUgYXMgdW5rbm93biBhcyBhbnlbXTtcclxuICAgICAgcmV0dXJuIHZhbHVlW18ucmFuZG9tKDAsIHZhbHVlLmxlbmd0aCAtIDEpXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNoZWNrb3V0XHJcbiAgICogQHBhcmFtIGN1c3RvbWVyXHJcbiAgICogQHBhcmFtIHJlc3RhdXJhbnRcclxuICAgKiBAcGFyYW0gb3JkZXJJdGVtc1xyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGNoZWNrb3V0KGN1c3RvbWVyOiBDdXN0b21lciwgcmVzdGF1cmFudDogUmVzdGF1cmFudCwgb3JkZXJJdGVtczogT3JkZXJJdGVtW10pIHtcclxuICAgIGxldCBkZWxpdmVyeTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNvdXJpZXI6IENvdXJpZXIgPSB0aGlzLmdldFJhbmRvbShhd2FpdCB0aGlzLmdldENvdXJpZXIoKSk7XHJcblxyXG4gICAgICAvLyBjcmVhdGUgb3JkZXJcclxuICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoe1xyXG4gICAgICAgIGRhdGVfdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcbiAgICAgICAgcmVzdGF1cmFudF9pZDogcmVzdGF1cmFudC5pZCxcclxuICAgICAgICBjdXN0b21lcl9pZDogY3VzdG9tZXIuaWRcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhd2FpdCB0aGlzLmNyZWF0ZVdpdGhPYmplY3Qob3JkZXIpO1xyXG5cclxuICAgICAgLy8gY3JlYXRlIG9yZGVyIGl0ZW1zXHJcbiAgICAgIF8ubWFwKG9yZGVySXRlbXMsIGFzeW5jIHggPT4ge1xyXG4gICAgICAgIHgub3JkZXJfaWQgPSBvcmRlci5pZDtcclxuICAgICAgICB4Lm9yZGVyID0gb3JkZXI7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVXaXRoT2JqZWN0KHgpO1xyXG4gICAgICAgIG9yZGVyLnRvdGFsICs9IHgubWVhbC5wcmljZSAqIHgucXVhbnRpdHk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgYXdhaXQgdGhpcy51cGRhdGVXaXRoT2JqZWN0KG9yZGVyKTtcclxuXHJcbiAgICAgIC8vIGNyZWF0ZSBkZWxpdmVyeVxyXG4gICAgICBkZWxpdmVyeSA9IG5ldyBEZWxpdmVyeShcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwb2ludHM6IFtdLFxyXG4gICAgICAgICAgY291cmllcl9pZDogY291cmllci5pZCxcclxuICAgICAgICAgIG9yZGVyX2lkOiBvcmRlci5pZFxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIGFkZCBwYXRoc1xyXG4gICAgICBhd2FpdCB0aGlzLl9NYXBTZXJ2aWNlLnJlbmRlckRpcmVjdGlvbihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGNvdXJpZXIubGF0LCBjb3VyaWVyLmxuZyksIG5ldyBnb29nbGUubWFwcy5MYXRMbmcocmVzdGF1cmFudC5sYXQsIHJlc3RhdXJhbnQubG5nKSlcclxuICAgICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICAgIGRlbGl2ZXJ5LnBhdGhfdG9fcmVzdGF1cmFudCA9IHJzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgYXdhaXQgdGhpcy5fTWFwU2VydmljZS5yZW5kZXJEaXJlY3Rpb24obmV3IGdvb2dsZS5tYXBzLkxhdExuZyhyZXN0YXVyYW50LmxhdCwgcmVzdGF1cmFudC5sbmcpLCBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGN1c3RvbWVyLmxhdCwgY3VzdG9tZXIubG5nKSlcclxuICAgICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICAgIGRlbGl2ZXJ5LnBhdGhfdG9fY3VzdG9tZXIgPSBycztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIGF3YWl0IHRoaXMuY3JlYXRlV2l0aE9iamVjdChkZWxpdmVyeSk7XHJcblxyXG4gICAgICAvLyBjcmVhdGUgZGVsaXZlcnkgc3RhdHVzXHJcbiAgICAgIGNvbnN0IGRlbGl2ZXJ5U3RhdHVzSGlzdG9yeSA9IG5ldyBEZWxpdmVyeVN0YXR1c0hpc3Rvcnkoe1xyXG4gICAgICAgIHN0YXR1czogRGVsaXZlcnlfU3RhdHVzLk9SREVSRUQsXHJcbiAgICAgICAgZGVsaXZlcnlfaWQ6IGRlbGl2ZXJ5LmlkLFxyXG4gICAgICAgIGRhdGVfdGltZTogbW9tZW50KCkudmFsdWVPZigpXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgYXdhaXQgdGhpcy5jcmVhdGVXaXRoT2JqZWN0KGRlbGl2ZXJ5U3RhdHVzSGlzdG9yeSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgIC50aGVuKCgpID0+IG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAudGhlbigoKSA9PiBkZWxpdmVyeSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=