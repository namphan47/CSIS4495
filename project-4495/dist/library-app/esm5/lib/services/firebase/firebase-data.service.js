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
                        _b.trys.push([0, 9, , 10]);
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
                        return [4 /*yield*/, Promise.all(_.map(orderItems, function (x) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            x.order_id = order_1.id;
                                            x.order = order_1;
                                            return [4 /*yield*/, this.createWithObject(x)];
                                        case 1:
                                            _a.sent();
                                            order_1.total += x.meal.price * x.quantity;
                                            return [2 /*return*/, Promise.resolve()];
                                    }
                                });
                            }); }))];
                    case 3:
                        // create order items
                        _b.sent();
                        order_1.total = Math.round(order_1.total * 100) / 100.0;
                        return [4 /*yield*/, this.updateWithObject(order_1)];
                    case 4:
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
                    case 5:
                        // add paths
                        _b.sent();
                        return [4 /*yield*/, this._MapService.renderDirection(new google.maps.LatLng(restaurant.lat, restaurant.lng), new google.maps.LatLng(customer.lat, customer.lng))
                                .then(function (rs) {
                                delivery.path_to_customer = rs;
                            })];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.createWithObject(delivery)];
                    case 7:
                        _b.sent();
                        deliveryStatusHistory = new DeliveryStatusHistory({
                            status: Delivery_Status.ORDERED,
                            delivery_id: delivery.id,
                            date_time: moment().valueOf()
                        });
                        return [4 /*yield*/, this.createWithObject(deliveryStatusHistory)];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        e_1 = _b.sent();
                        console.log(e_1);
                        return [2 /*return*/, Promise.resolve()
                                .then(function () { return null; })];
                    case 10: return [2 /*return*/, Promise.resolve()
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZmlyZWJhc2UvZmlyZWJhc2UtZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDckQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxRQUFRLEVBQUUsZUFBZSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0RBQXdELENBQUM7QUFDN0YsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7Ozs7Ozs7O0FBSzVCO0lBb0NFLDZCQUFvQixpQkFBbUMsRUFDbkMsb0JBQXlDLEVBQ3pDLGlCQUFtQyxFQUNuQyxvQkFBeUMsRUFDekMsV0FBdUIsRUFDdkIsZ0JBQWlDOztRQUxqQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUF4QzVDLFdBQU07WUFDYixHQUFDLFdBQVcsQ0FBQyxRQUFRLElBQUc7Z0JBQ3RCLElBQUksRUFBRSxXQUFXLENBQUMsUUFBUTtnQkFDMUIsS0FBSyxFQUFFLFFBQVE7YUFDaEI7WUFDRCxHQUFDLFdBQVcsQ0FBQyxPQUFPLElBQUc7Z0JBQ3JCLElBQUksRUFBRSxXQUFXLENBQUMsT0FBTztnQkFDekIsS0FBSyxFQUFFLE9BQU87YUFDZjtZQUNELEdBQUMsV0FBVyxDQUFDLFVBQVUsSUFBRztnQkFDeEIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxVQUFVO2dCQUM1QixLQUFLLEVBQUUsVUFBVTthQUNsQjtZQUNELEdBQUMsV0FBVyxDQUFDLElBQUksSUFBRztnQkFDbEIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO2dCQUN0QixLQUFLLEVBQUUsSUFBSTthQUNaO1lBQ0QsR0FBQyxXQUFXLENBQUMsS0FBSyxJQUFHO2dCQUNuQixJQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUs7Z0JBQ3ZCLEtBQUssRUFBRSxLQUFLO2FBQ2I7WUFDRCxHQUFDLFdBQVcsQ0FBQyxRQUFRLElBQUc7Z0JBQ3RCLElBQUksRUFBRSxXQUFXLENBQUMsUUFBUTtnQkFDMUIsS0FBSyxFQUFFLFFBQVE7YUFDaEI7WUFDRCxHQUFDLFdBQVcsQ0FBQyxVQUFVLElBQUc7Z0JBQ3hCLElBQUksRUFBRSxXQUFXLENBQUMsVUFBVTtnQkFDNUIsS0FBSyxFQUFFLFNBQVM7YUFDakI7WUFDRCxHQUFDLFdBQVcsQ0FBQyx1QkFBdUIsSUFBRztnQkFDckMsSUFBSSxFQUFFLFdBQVcsQ0FBQyx1QkFBdUI7Z0JBQ3pDLEtBQUssRUFBRSxxQkFBcUI7YUFDN0I7Z0JBQ0Q7SUFRRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0cscUNBQU8sR0FBYjs7Ozs7O29CQUNFLGdCQUFnQjtvQkFDaEIscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBTyxDQUFDOzs7NENBQzNDLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFBOzt3Q0FBOUIsU0FBOEIsQ0FBQzs7Ozs2QkFDaEMsQ0FBQyxDQUFDLEVBQUE7O3dCQUhILGdCQUFnQjt3QkFDaEIsU0FFRyxDQUFDO3dCQUVKLGFBQWE7d0JBQ2IscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBTyxDQUFDOzs7Z0RBQzNDLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUE7OzRDQUFuQixTQUFtQixDQUFDOzs7O2lDQUNyQixDQUFDLENBQUMsRUFBQTs7d0JBSEgsYUFBYTt3QkFDYixTQUVHLENBQUM7d0JBRUosZUFBZTt3QkFDZixxQkFBTSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBQTs7d0JBRGpDLGVBQWU7d0JBQ2YsU0FBaUMsQ0FBQzt3QkFFbEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO3dCQUM3RCxzQkFBTyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUM7Ozs7S0FDMUI7SUFFRDs7O09BR0c7SUFDRyxrREFBb0IsR0FBMUI7Ozs7Ozt3QkFDRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLDZCQUE2QixDQUFDLENBQUM7d0JBQ3JFLHFCQUFNLElBQUksQ0FBQyxhQUFhLEVBQUU7aUNBQ3ZCLElBQUksQ0FBQyxVQUFDLFdBQVc7Z0NBQ2hCLDRCQUE0QjtnQ0FDNUIsS0FBSSxDQUFDLFFBQVEsRUFBRTtxQ0FDWixJQUFJLENBQUMsVUFBQyxLQUFLO29DQUNWLHNCQUFzQjtvQ0FDdEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBQyxVQUFzQjt3Q0FDeEMsMkJBQTJCO3dDQUMzQixVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFVOzRDQUNyRCxPQUFPLFVBQVUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQzt3Q0FDbEQsQ0FBQyxDQUFDLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxFQUFKLENBQUksQ0FBQyxDQUFDO3dDQUVmLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDOzZDQUN4RSxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQ0FDbEQsQ0FBQyxDQUFDLENBQUM7Z0NBQ0wsQ0FBQyxDQUFDLENBQUM7NEJBQ1AsQ0FBQyxDQUFDLEVBQUE7O3dCQWhCSixTQWdCSSxDQUFDOzs7OztLQUNOO0lBRUQ7Ozs7T0FJRztJQUNLLG1DQUFLLEdBQWIsVUFBYyxNQUFNO1FBQXBCLGlCQWFDO1FBWkMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQzdFLElBQUksQ0FBQyxVQUFPLEVBQUU7Ozs7Ozt3QkFDYixJQUFJLENBQUMsRUFBRSxFQUFFOzRCQUNQLHNCQUFPO3lCQUNSO3dCQUNLLGVBQWUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDaEUscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxVQUFPLENBQUM7OztnREFDekMscUJBQU0sZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBQTs7NENBQXRDLFNBQXNDLENBQUM7NENBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBTyxNQUFNLENBQUMsSUFBTSxDQUFDLENBQUM7NENBQ2xDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsU0FBTyxNQUFNLENBQUMsSUFBTSxDQUFDLENBQUM7Ozs7aUNBQzdELENBQUMsQ0FBQyxFQUFBOzRCQUpILHNCQUFPLFNBSUosRUFBQzs7O2FBQ0wsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRztJQUNILHlDQUFXLEdBQVg7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDakQsSUFBSSxDQUFDLFVBQUMsRUFBRSxJQUFLLE9BQUEsRUFBMkIsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZ0RBQWtCLEdBQWxCLFVBQW1CLEtBQWE7UUFDOUIsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFO2FBQ3RCLElBQUksQ0FBQyxVQUFDLEVBQUU7WUFDUCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQWpCLENBQWlCLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCx3Q0FBVSxHQUFWO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hELElBQUksQ0FBQyxVQUFDLEVBQUUsSUFBSyxPQUFBLEVBQTBCLEVBQTFCLENBQTBCLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMkNBQWEsR0FBYjtRQUFBLGlCQXdCQztRQXZCQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDakQsSUFBSSxDQUFDLFVBQUMsRUFBRSxJQUFLLE9BQUEsRUFBMkIsRUFBM0IsQ0FBMkIsQ0FBQzthQUN6QyxJQUFJLENBQUMsVUFBQyxFQUFFO1lBQ1AsT0FBTyxLQUFJLENBQUMsd0JBQXdCLEVBQUU7aUJBQ25DLElBQUksQ0FBQyxVQUFDLFNBQVM7Z0JBQ2QsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsVUFBQyxRQUFrQjtvQkFDM0IsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBd0IsSUFBSyxPQUFBLENBQUMsQ0FBQyxXQUFXLEtBQUssUUFBUSxDQUFDLEVBQUUsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDLENBQUM7Z0JBQzlHLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsVUFBQyxFQUFFO1lBQ1AsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFVBQU8sQ0FBVzs7O2dDQUM3QyxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7aUNBQ2hDLElBQUksQ0FBQyxVQUFDLENBQUM7Z0NBQ04sQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7NEJBQ2QsQ0FBQyxDQUFDLEVBQUE7OzRCQUhKLFNBR0ksQ0FBQzs0QkFDTCxzQkFBTyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUM7OztpQkFDMUIsQ0FBQyxDQUFDO2lCQUNBLElBQUksQ0FBQztnQkFDSixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNkNBQWUsR0FBZixVQUFnQixFQUFVO1FBQTFCLGlCQVVDO1FBVEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQzthQUMzRCxJQUFJLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxFQUF5QixFQUF6QixDQUF5QixDQUFDO2FBQ3ZDLElBQUksQ0FBQyxVQUFDLEVBQUU7WUFDUCxPQUFPLEtBQUksQ0FBQyx3QkFBd0IsRUFBRTtpQkFDbkMsSUFBSSxDQUFDLFVBQUMsU0FBUztnQkFDZCxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBQyxDQUF3QixJQUFLLE9BQUEsQ0FBQyxDQUFDLFdBQVcsS0FBSyxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxDQUFDO2dCQUM3RixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsc0RBQXdCLEdBQXhCO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLENBQUM7YUFDaEUsSUFBSSxDQUFDLFVBQUMsRUFBRSxJQUFLLE9BQUEsRUFBd0MsRUFBeEMsQ0FBd0MsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFSyx3REFBMEIsR0FBaEMsVUFBaUMsV0FBK0I7OztnQkFDOUQsc0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLFdBQVcsQ0FBQzt5QkFDN0UsSUFBSSxDQUFDLFVBQUMsRUFBRSxJQUFLLE9BQUEsRUFBd0MsRUFBeEMsQ0FBd0MsQ0FBQyxFQUFDOzs7S0FDM0Q7SUFFRDs7O09BR0c7SUFDSCwyQ0FBYSxHQUFiO1FBQUEsaUJBYUM7UUFaQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbkQsSUFBSSxDQUFDLFVBQUMsV0FBVztZQUNoQixPQUFPLEtBQUksQ0FBQyxRQUFRLEVBQUU7aUJBQ25CLElBQUksQ0FBQyxVQUFDLEtBQUs7Z0JBQ1YsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBQyxVQUFzQjtvQkFDeEMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxVQUFDLElBQVU7d0JBQzVDLE9BQU8sVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxXQUFzQyxDQUFDO1lBQ2hELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsc0NBQVEsR0FBUjtRQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3QyxJQUFJLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxFQUF1QixFQUF2QixDQUF1QixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDRywyQ0FBYSxHQUFuQixVQUFvQixXQUErQjs7OztnQkFDakQsc0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLENBQUM7eUJBQ2hFLElBQUksQ0FBQyxVQUFDLEVBQUUsSUFBSyxPQUFBLEVBQTRCLEVBQTVCLENBQTRCLENBQUM7eUJBQzFDLElBQUksQ0FBQyxVQUFDLFVBQVU7d0JBQ2YsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBTyxTQUFvQjs7OztvQ0FDM0MsV0FBVztvQ0FDWCxxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUM7NkNBQ3JFLElBQUksQ0FBQyxVQUFDLElBQUk7NENBQ1QsU0FBUyxDQUFDLElBQUksR0FBRyxJQUF1QixDQUFDO3dDQUMzQyxDQUFDLENBQUMsRUFBQTs7d0NBSkosV0FBVzt3Q0FDWCxTQUdJLENBQUM7Ozs7NkJBQ04sQ0FBQyxDQUFDO3dCQUNILE9BQU8sVUFBVSxDQUFDO29CQUNwQixDQUFDLENBQUMsRUFBQzs7O0tBQ047SUFFRDs7O09BR0c7SUFDRyx1Q0FBUyxHQUFmOzs7O2dCQUNFLHNCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQzlDLElBQUksQ0FBQyxVQUFDLEVBQUUsSUFBSyxPQUFBLEVBQXdCLEVBQXhCLENBQXdCLENBQUM7eUJBQ3RDLElBQUksQ0FBQyxVQUFDLE1BQU07d0JBQ1gsTUFBTSxHQUFHLE1BQTRCLENBQUM7d0JBQ3RDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFPLEtBQVk7Ozs7b0NBRWxELDZCQUE2QjtvQ0FDN0IscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDOzZDQUN6RSxJQUFJLENBQUMsVUFBQyxRQUFROzRDQUNiLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBK0IsQ0FBQzt3Q0FDbkQsQ0FBQyxDQUFDLEVBQUE7O3dDQUpKLDZCQUE2Qjt3Q0FDN0IsU0FHSSxDQUFDO3dDQUVMLHlCQUF5Qjt3Q0FDekIscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksZUFBZSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpREFDcEcsSUFBSSxDQUFDLFVBQUMsS0FBSztnREFDVixLQUFLLENBQUMsS0FBSyxHQUFHLEtBQStCLENBQUM7NENBQ2hELENBQUMsQ0FBQyxFQUFBOzt3Q0FKSix5QkFBeUI7d0NBQ3pCLFNBR0ksQ0FBQzt3Q0FFTCxnQ0FBZ0M7d0NBQ2hDLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQztpREFDN0UsSUFBSSxDQUFDLFVBQUMsVUFBVTtnREFDZixLQUFLLENBQUMsVUFBVSxHQUFHLFVBQW1DLENBQUM7NENBQ3pELENBQUMsQ0FBQyxFQUFBOzt3Q0FKSixnQ0FBZ0M7d0NBQ2hDLFNBR0ksQ0FBQzt3Q0FDTCxzQkFBTyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUM7Ozs2QkFDMUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUNQLE9BQU8sTUFBTSxDQUFDO3dCQUNoQixDQUFDLENBQUMsQ0FBQztvQkFFTCxDQUFDLENBQUMsRUFBQzs7O0tBQ047SUFFSywwQ0FBWSxHQUFsQixVQUFtQixFQUFVOzs7O2dCQUMzQixzQkFBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQzt5QkFDeEQsSUFBSSxDQUFDLFVBQUMsRUFBRSxJQUFLLE9BQUEsRUFBc0IsRUFBdEIsQ0FBc0IsQ0FBQzt5QkFDcEMsSUFBSSxDQUFDLFVBQU8sS0FBSzs7OztvQ0FDaEIsS0FBSyxHQUFHLEtBQXlCLENBQUM7b0NBRWxDLDZCQUE2QjtvQ0FDN0IscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDOzZDQUN6RSxJQUFJLENBQUMsVUFBQyxRQUFROzRDQUNiLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBK0IsQ0FBQzt3Q0FDbkQsQ0FBQyxDQUFDLEVBQUE7O29DQUpKLDZCQUE2QjtvQ0FDN0IsU0FHSSxDQUFDO29DQUVMLHlCQUF5QjtvQ0FDekIscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksZUFBZSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs2Q0FDcEcsSUFBSSxDQUFDLFVBQUMsS0FBSzs0Q0FDVixLQUFLLENBQUMsS0FBSyxHQUFHLEtBQStCLENBQUM7d0NBQ2hELENBQUMsQ0FBQyxFQUFBOztvQ0FKSix5QkFBeUI7b0NBQ3pCLFNBR0ksQ0FBQztvQ0FFTCxnQ0FBZ0M7b0NBQ2hDLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQzs2Q0FDN0UsSUFBSSxDQUFDLFVBQUMsVUFBVTs0Q0FDZixLQUFLLENBQUMsVUFBVSxHQUFHLFVBQW1DLENBQUM7d0NBQ3pELENBQUMsQ0FBQyxFQUFBOztvQ0FKSixnQ0FBZ0M7b0NBQ2hDLFNBR0ksQ0FBQztvQ0FFTCxzQkFBTyxLQUFLLEVBQUM7Ozt5QkFDZCxDQUFDLEVBQUM7OztLQUVOO0lBRUQ7Ozs7T0FJRztJQUNLLG1DQUFLLEdBQWIsVUFBYyxNQUFNLEVBQUUsV0FBK0IsRUFBRSxFQUFXO1FBQWxFLGlCQWdDQztRQS9CQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsVUFBQSxHQUFHO1lBQ25FLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUU7Z0JBQ2pCLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQUMsQ0FBa0I7b0JBQ3BDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2RyxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQ0QsT0FBTyxNQUFNLElBQUksR0FBRyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxVQUFVO2FBQ2QsZUFBZSxFQUFFO2FBQ2pCLElBQUksQ0FDSCxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztZQUN0QixJQUFNLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQVksQ0FBQztZQUM1QyxJQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDNUIsWUFBWTtZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDaEIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsRUFOVyxDQU1YLENBQUMsRUFDSCxHQUFHLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxVQUFBLEdBQUc7WUFDaEMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNSLE9BQU8sR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDdEI7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsQ0FBQyxFQUxhLENBS2IsQ0FBQyxDQUNKO2FBQ0EsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFO2FBQ2hDLElBQUksQ0FBQyxVQUFDLEVBQUU7WUFDUCxPQUFPLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0sseUNBQVcsR0FBbkIsVUFBb0IsTUFBTSxFQUFFLEVBQVU7UUFBdEMsaUJBa0JDO1FBakJDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUksTUFBTSxDQUFDLElBQUksU0FBSSxFQUFJLENBQUMsQ0FBQztRQUN0RSxPQUFPLFVBQVU7YUFDZCxlQUFlLEVBQUU7YUFDakIsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFBLENBQUM7WUFDSCxJQUFNLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBWSxDQUFDO1lBQ3hDLElBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ3hCLFlBQVk7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQ0g7YUFDQSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUU7YUFDaEMsSUFBSSxDQUFDLFVBQUMsRUFBRTtZQUNQLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1RCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssa0RBQW9CLEdBQTVCLFVBQTZCLElBQVcsRUFBRSxVQUFvQztRQUM1RSxJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBQyxDQUFDO1lBQ1osSUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztRQUNILHNCQUFzQjtRQUN0QixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsOENBQWdCLEdBQWhCLFVBQWlCLE1BQXFCO1FBQXRDLGlCQVFDO1FBUEMsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0YsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDNUMsSUFBSSxDQUFDO1lBQ0osTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDZixLQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLGFBQVcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFNLENBQUMsQ0FBQztRQUM5RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCw4Q0FBZ0IsR0FBaEIsVUFBaUIsTUFBcUI7UUFDcEMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3RixPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHNDQUFRLEdBQVIsVUFBUyxTQUFpQjtRQUN4QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQUs7WUFDL0IsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ1YsQ0FBQztJQUVELDJCQUEyQjtJQUUzQix5Q0FBVyxHQUFYO1FBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCw2Q0FBZSxHQUFmO1FBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCw0Q0FBYyxHQUFkO1FBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxrREFBb0IsR0FBcEI7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLHlDQUFXLEdBQW5CLFVBQW9CLElBQVk7UUFBaEMsaUJBY0M7UUFiQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFO2FBQzdELElBQUksQ0FBQyxVQUFNLEdBQUc7Ozs7Ozt3QkFFUCxLQUFLLEdBQUcsRUFBRSxDQUFDO3dCQUNqQixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTzs0QkFDakIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdEIsQ0FBQyxDQUFDLENBQUM7d0JBQ0gscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxVQUFNLE9BQU87OztnREFDMUMscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBQTs7NENBQTFCLFNBQTBCLENBQUM7NENBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBVSxJQUFNLENBQUMsQ0FBQzs0Q0FDOUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxZQUFVLElBQU0sQ0FBQyxDQUFDOzs7O2lDQUN6RCxDQUFDLENBQUMsRUFBQTs7d0JBSkgsU0FJRyxDQUFDOzs7O2FBQ0wsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELCtDQUFpQixHQUFqQixVQUFrQixFQUFFO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELDJDQUFhLEdBQWIsVUFBYyxJQUFZLEVBQUUsRUFBVTtRQUNwQyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUksSUFBSSxTQUFJLEVBQUksQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hFLENBQUM7SUFFRCxrQkFBa0I7SUFFbEI7Ozs7T0FJRztJQUNHLG9DQUFNLEdBQVosVUFBYSxJQUFjOzs7Ozs7NEJBRVIscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUFwRSxRQUFRLEdBQUcsU0FBeUQ7d0JBQzFFLElBQUksQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUMxQixJQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFFMUIsc0JBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQ0FDbkYsSUFBSSxDQUFDLFVBQUMsTUFBTTtnQ0FDWCx5QkFBeUI7Z0NBQ3pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztnQ0FDckIsT0FBTyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO3FDQUMvQixJQUFJLENBQUM7b0NBQ0osT0FBTyxJQUFJLENBQUM7Z0NBQ2QsQ0FBQyxDQUFDLENBQUM7NEJBQ1AsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsS0FBSztnQ0FDYixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQ0FDNUIsT0FBTyxLQUFLLENBQUM7NEJBQ2YsQ0FBQyxDQUFDLEVBQUM7Ozs7S0FDTjtJQUVEOzs7O09BSUc7SUFDSCxvQ0FBTSxHQUFOLFVBQU8sSUFBYztRQUFyQixpQkFTQztRQVJDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUMvRSxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ1gsdUJBQXVCO1lBQ3ZCLE9BQU8sS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxLQUFLO1lBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsdUNBQVMsR0FBVCxVQUFVLEtBQXFCO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDekIsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0I7YUFBTTtZQUNMLEtBQUssR0FBRyxLQUF5QixDQUFDO1lBQ2xDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNHLHNDQUFRLEdBQWQsVUFBZSxRQUFrQixFQUFFLFVBQXNCLEVBQUUsVUFBdUI7Ozs7Ozs7O3dCQUdyRCxLQUFBLElBQUksQ0FBQyxTQUFTLENBQUE7d0JBQUMscUJBQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFBOzt3QkFBekQsT0FBTyxHQUFZLFNBQUEsSUFBSSxHQUFXLFNBQXVCLEVBQUM7d0JBRzFELFVBQVEsSUFBSSxLQUFLLENBQUM7NEJBQ3RCLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRTs0QkFDL0IsYUFBYSxFQUFFLFVBQVUsQ0FBQyxFQUFFOzRCQUM1QixXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUU7eUJBQ3pCLENBQUMsQ0FBQzt3QkFFSCxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBSyxDQUFDLEVBQUE7O3dCQUFsQyxTQUFrQyxDQUFDO3dCQUVuQyxxQkFBcUI7d0JBQ3JCLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBTSxDQUFDOzs7OzRDQUN6QyxDQUFDLENBQUMsUUFBUSxHQUFHLE9BQUssQ0FBQyxFQUFFLENBQUM7NENBQ3RCLENBQUMsQ0FBQyxLQUFLLEdBQUcsT0FBSyxDQUFDOzRDQUNoQixxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUE7OzRDQUE5QixTQUE4QixDQUFDOzRDQUMvQixPQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7NENBQ3pDLHNCQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBQzs7O2lDQUMxQixDQUFDLENBQUMsRUFBQTs7d0JBUEgscUJBQXFCO3dCQUNyQixTQU1HLENBQUM7d0JBRUosT0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO3dCQUVwRCxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBSyxDQUFDLEVBQUE7O3dCQUFsQyxTQUFrQyxDQUFDO3dCQUVuQyxrQkFBa0I7d0JBQ2xCLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FDckI7NEJBQ0UsTUFBTSxFQUFFLEVBQUU7NEJBQ1YsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFOzRCQUN0QixRQUFRLEVBQUUsT0FBSyxDQUFDLEVBQUU7eUJBQ25CLENBQ0YsQ0FBQzt3QkFFRixZQUFZO3dCQUNaLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQ0FDN0ksSUFBSSxDQUFDLFVBQUMsRUFBRTtnQ0FDUCxRQUFRLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDOzRCQUNuQyxDQUFDLENBQUMsRUFBQTs7d0JBSkosWUFBWTt3QkFDWixTQUdJLENBQUM7d0JBRUwscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lDQUMvSSxJQUFJLENBQUMsVUFBQyxFQUFFO2dDQUNQLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7NEJBQ2pDLENBQUMsQ0FBQyxFQUFBOzt3QkFISixTQUdJLENBQUM7d0JBRUwscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBckMsU0FBcUMsQ0FBQzt3QkFHaEMscUJBQXFCLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQzs0QkFDdEQsTUFBTSxFQUFFLGVBQWUsQ0FBQyxPQUFPOzRCQUMvQixXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUU7NEJBQ3hCLFNBQVMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7eUJBQzlCLENBQUMsQ0FBQzt3QkFFSCxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsRUFBQTs7d0JBQWxELFNBQWtELENBQUM7Ozs7d0JBRW5ELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUM7d0JBQ2Ysc0JBQU8sT0FBTyxDQUFDLE9BQU8sRUFBRTtpQ0FDckIsSUFBSSxDQUFDLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLEVBQUM7NkJBR3RCLHNCQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUU7NkJBQ3JCLElBQUksQ0FBQyxjQUFNLE9BQUEsUUFBUSxFQUFSLENBQVEsQ0FBQyxFQUFDOzs7O0tBQ3pCOztnQkFwakJzQyxnQkFBZ0I7Z0JBQ2IsbUJBQW1CO2dCQUN0QixnQkFBZ0I7Z0JBQ2IsbUJBQW1CO2dCQUM1QixVQUFVO2dCQUNMLGVBQWU7OztJQXpDMUMsbUJBQW1CO1FBSC9CLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7T0FDVyxtQkFBbUIsQ0EwbEIvQjs4QkFubkJEO0NBbW5CQyxBQTFsQkQsSUEwbEJDO1NBMWxCWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0FuZ3VsYXJGaXJlc3RvcmV9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlJztcclxuaW1wb3J0IHtDdXN0b21lcn0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL2N1c3RvbWVyL2N1c3RvbWVyJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHtEdW1teURhdGFTZXJ2aWNlfSBmcm9tICcuLi9kYXRhL2R1bW15LWRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7Zmlyc3QsIG1hcCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7SURlZmF1bHRNb2RlbCwgSURlZmF1bHRNb2RlbENvbnN0cnVjdG9yfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvaS1kZWZhdWx0LW1vZGVsJztcclxuaW1wb3J0IHtSZXN0YXVyYW50fSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvcmVzdGF1cmFudC9yZXN0YXVyYW50JztcclxuaW1wb3J0IHtDb3VyaWVyfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvY291cmllci9jb3VyaWVyJztcclxuaW1wb3J0IHtNZWFsfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvbWVhbC9tZWFsJztcclxuaW1wb3J0IHtFTlVNX1RBQkxFU30gZnJvbSAnLi4vLi4vY29uc3RhbnQvY29uc3QtdmFsdWUnO1xyXG5pbXBvcnQge05vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJy4uL21pY3Mvbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQge09yZGVySXRlbX0gZnJvbSAnLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyX2l0ZW0vb3JkZXItaXRlbSc7XHJcbmltcG9ydCB7T3JkZXJ9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlci9vcmRlcic7XHJcbmltcG9ydCB7UXVlcnlQYXJhbU1vZGVsfSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvcXVlcnktcGFyYW0tbW9kZWwnO1xyXG5pbXBvcnQge0RlbGl2ZXJ5LCBEZWxpdmVyeV9TdGF0dXN9IGZyb20gJy4uLy4uL2NvbnN0YW50L21vZGVscyc7XHJcbmltcG9ydCB7RGVsaXZlcnlTdGF0dXNIaXN0b3J5fSBmcm9tICcuLi8uLi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnktc3RhdHVzLWhpc3RvcnknO1xyXG5pbXBvcnQge01hcFNlcnZpY2V9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7QW5ndWxhckZpcmVEYXRhYmFzZX0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9kYXRhYmFzZSc7XHJcbmltcG9ydCB7QW5ndWxhckZpcmVBdXRofSBmcm9tICdAYW5ndWxhci9maXJlL2F1dGgnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZURhdGFTZXJ2aWNlIHtcclxuICByZWFkb25seSBUQUJMRVMgPSB7XHJcbiAgICBbRU5VTV9UQUJMRVMuY3VzdG9tZXJdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLmN1c3RvbWVyLFxyXG4gICAgICBjbGFzczogQ3VzdG9tZXJcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMuY291cmllcl06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMuY291cmllcixcclxuICAgICAgY2xhc3M6IENvdXJpZXJcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMucmVzdGF1cmFudF06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMucmVzdGF1cmFudCxcclxuICAgICAgY2xhc3M6IFJlc3RhdXJhbnRcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMubWVhbF06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMubWVhbCxcclxuICAgICAgY2xhc3M6IE1lYWxcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMub3JkZXJdOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLm9yZGVyLFxyXG4gICAgICBjbGFzczogT3JkZXJcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMuZGVsaXZlcnldOiB7XHJcbiAgICAgIG5hbWU6IEVOVU1fVEFCTEVTLmRlbGl2ZXJ5LFxyXG4gICAgICBjbGFzczogRGVsaXZlcnlcclxuICAgIH0sXHJcbiAgICBbRU5VTV9UQUJMRVMub3JkZXJfaXRlbV06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMub3JkZXJfaXRlbSxcclxuICAgICAgY2xhc3M6IE9yZGVySXRlbVxyXG4gICAgfSxcclxuICAgIFtFTlVNX1RBQkxFUy5kZWxpdmVyeV9zdGF0dXNfaGlzdG9yeV06IHtcclxuICAgICAgbmFtZTogRU5VTV9UQUJMRVMuZGVsaXZlcnlfc3RhdHVzX2hpc3RvcnksXHJcbiAgICAgIGNsYXNzOiBEZWxpdmVyeVN0YXR1c0hpc3RvcnlcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9Bbmd1bGFyRmlyZXN0b3JlOiBBbmd1bGFyRmlyZXN0b3JlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX0FuZ3VsYXJGaXJlRGF0YWJhc2U6IEFuZ3VsYXJGaXJlRGF0YWJhc2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfRHVtbXlEYXRhU2VydmljZTogRHVtbXlEYXRhU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9Ob3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX01hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfQW5ndWxhckZpcmVBdXRoOiBBbmd1bGFyRmlyZUF1dGgpIHtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlc2V0IERCXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgcmVzZXREQigpIHtcclxuICAgIC8vIGRlbGV0ZSB0YWJsZXNcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKF8ubWFwKHRoaXMuVEFCTEVTLCBhc3luYyAoeCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLmRlbGV0ZVRhYmxlKHgubmFtZSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLy8gYWRkIHRhYmxlc1xyXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXy5tYXAodGhpcy5UQUJMRVMsIGFzeW5jICh4KSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuYWRkREIoeCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLy8gY29udmVyc2VNZWFsXHJcbiAgICBhd2FpdCB0aGlzLmxpbmtSZXN0YXVyYW50TWVhbERCKCk7XHJcblxyXG4gICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZSgnQWxsIGRhdGEgaXMgcmVzZXQhIScpO1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbGluayByZXN0YXVyYW50IGFuZCBtZWFscyBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgbGlua1Jlc3RhdXJhbnRNZWFsREIoKSB7XHJcbiAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKCdMaW5rIFJlc3RhdXJhbnQgJiBNZWFsIGRhdGEnKTtcclxuICAgIGF3YWl0IHRoaXMuZ2V0UmVzdGF1cmFudCgpXHJcbiAgICAgIC50aGVuKChyZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3RhdXJhbnRzKTtcclxuICAgICAgICB0aGlzLmdldE1lYWxzKClcclxuICAgICAgICAgIC50aGVuKChtZWFscykgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZWFscyk7XHJcbiAgICAgICAgICAgIF8ubWFwKHJlc3RhdXJhbnRzLCAocmVzdGF1cmFudDogUmVzdGF1cmFudCkgPT4ge1xyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3RhdXJhbnQpO1xyXG4gICAgICAgICAgICAgIHJlc3RhdXJhbnQubWVhbF9pZHMgPSBfLm1hcChfLmZpbHRlcihtZWFscywgKG1lYWw6IE1lYWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN0YXVyYW50Lm5hbWUgPT09IG1lYWwucmVzdGF1cmFudF9uYW1lO1xyXG4gICAgICAgICAgICAgIH0pLCB4ID0+IHguaWQpO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24odGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMucmVzdGF1cmFudF0ubmFtZSlcclxuICAgICAgICAgICAgICAgIC5kb2MocmVzdGF1cmFudC5pZCkuc2V0KHJlc3RhdXJhbnQuZ2V0RGF0YSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBhZGQgZGF0YSBvZiBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHVua25vd25bXT59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGREQihvYmplY3QpIHtcclxuICAgIHJldHVybiB0aGlzLl9EdW1teURhdGFTZXJ2aWNlLmNvbnZlcnREdW1teURhdGFUb01vZGVsKG9iamVjdC5uYW1lLCBvYmplY3QuY2xhc3MpXHJcbiAgICAgIC50aGVuKGFzeW5jIChycykgPT4ge1xyXG4gICAgICAgIGlmICghcnMpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaXRlbXNDb2xsZWN0aW9uID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jb2xsZWN0aW9uKG9iamVjdC5uYW1lKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwoXy5tYXAocnMsIGFzeW5jICh4KSA9PiB7XHJcbiAgICAgICAgICBhd2FpdCBpdGVtc0NvbGxlY3Rpb24uYWRkKHguZ2V0RGF0YSgpKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBhZGQgJHtvYmplY3QubmFtZX1gKTtcclxuICAgICAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYGFkZCAke29iamVjdC5uYW1lfWApO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgY3VzdG9tZXIgZGF0YVxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEN1c3RvbWVyW10+fVxyXG4gICAqL1xyXG4gIGdldEN1c3RvbWVyKCk6IFByb21pc2U8Q3VzdG9tZXJbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuY3VzdG9tZXJdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgQ3VzdG9tZXJbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgY3VzdG9tZXIgYnkgZW1haWxcclxuICAgKiBAcGFyYW0gZW1haWxcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDdXN0b21lcj59XHJcbiAgICovXHJcbiAgZ2V0Q3VzdG9tZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPEN1c3RvbWVyPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDdXN0b21lcigpXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIHJldHVybiBfLmZpbmQocnMsIHggPT4geC5lbWFpbCA9PT0gZW1haWwpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBjb3VyaWVyIGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDb3VyaWVyW10+fVxyXG4gICAqL1xyXG4gIGdldENvdXJpZXIoKTogUHJvbWlzZTxDb3VyaWVyW10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmNvdXJpZXJdKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgQ291cmllcltdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBkZWxpdmVyeSBkYXRhXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8RGVsaXZlcnlbXT59XHJcbiAgICovXHJcbiAgZ2V0RGVsaXZlcmllcygpOiBQcm9taXNlPERlbGl2ZXJ5W10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5XSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIERlbGl2ZXJ5W10pXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSgpXHJcbiAgICAgICAgICAudGhlbigoaGlzdG9yaWVzKSA9PiB7XHJcbiAgICAgICAgICAgIF8ubWFwKHJzLCAoZGVsaXZlcnk6IERlbGl2ZXJ5KSA9PiB7XHJcbiAgICAgICAgICAgICAgZGVsaXZlcnkuc2V0U3RhdHVzSGlzdG9yeShfLmZpbHRlcihoaXN0b3JpZXMsICh4OiBEZWxpdmVyeVN0YXR1c0hpc3RvcnkpID0+IHguZGVsaXZlcnlfaWQgPT09IGRlbGl2ZXJ5LmlkKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcnM7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKF8ubWFwKHJzLCBhc3luYyAoZDogRGVsaXZlcnkpID0+IHtcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0T3JkZXJCeUlkKGQub3JkZXJfaWQpXHJcbiAgICAgICAgICAgIC50aGVuKChvKSA9PiB7XHJcbiAgICAgICAgICAgICAgZC5vcmRlciA9IG87XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pKVxyXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcnM7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXREZWxpdmVyeUJ5SWQoaWQ6IHN0cmluZyk6IFByb21pc2U8RGVsaXZlcnk+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5XSwgaWQpXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBEZWxpdmVyeSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVsaXZlcnlTdGF0dXNIaXN0b3J5KClcclxuICAgICAgICAgIC50aGVuKChoaXN0b3JpZXMpID0+IHtcclxuICAgICAgICAgICAgcnMuc2V0U3RhdHVzSGlzdG9yeShfLmZpbHRlcihoaXN0b3JpZXMsICh4OiBEZWxpdmVyeVN0YXR1c0hpc3RvcnkpID0+IHguZGVsaXZlcnlfaWQgPT09IGlkKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBycztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSgpOiBQcm9taXNlPERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5kZWxpdmVyeV9zdGF0dXNfaGlzdG9yeV0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRTdGF0dXNIaXN0b3J5T2ZEZWxpdmVyeShxdWVyeVBhcmFtcz86IFF1ZXJ5UGFyYW1Nb2RlbFtdKTogUHJvbWlzZTxEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnlfc3RhdHVzX2hpc3RvcnldLCBxdWVyeVBhcmFtcylcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCByZXN0YXVyYW50IGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZXN0YXVyYW50W10+fVxyXG4gICAqL1xyXG4gIGdldFJlc3RhdXJhbnQoKTogUHJvbWlzZTxSZXN0YXVyYW50W10+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdKVxyXG4gICAgICAudGhlbigocmVzdGF1cmFudHMpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRNZWFscygpXHJcbiAgICAgICAgICAudGhlbigobWVhbHMpID0+IHtcclxuICAgICAgICAgICAgXy5tYXAocmVzdGF1cmFudHMsIChyZXN0YXVyYW50OiBSZXN0YXVyYW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgcmVzdGF1cmFudC5tZWFscyA9IF8uZmlsdGVyKG1lYWxzLCAobWVhbDogTWVhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3RhdXJhbnQubWVhbF9pZHMuaW5kZXhPZihtZWFsLmlkKSA+PSAwO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3RhdXJhbnRzIGFzIHVua25vd24gYXMgUmVzdGF1cmFudFtdO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IG1lYWxzIGRhdGFcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxNZWFsW10+fVxyXG4gICAqL1xyXG4gIGdldE1lYWxzKCk6IFByb21pc2U8TWVhbFtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5tZWFsXSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiBycyBhcyB1bmtub3duIGFzIE1lYWxbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgb3JkZXIgaXRlbXMgZGF0YVxyXG4gICAqIEBwYXJhbSBxdWVyeVBhcmFtc1xyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE1lYWxbXT59XHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0T3JkZXJJdGVtcyhxdWVyeVBhcmFtcz86IFF1ZXJ5UGFyYW1Nb2RlbFtdKTogUHJvbWlzZTxPcmRlckl0ZW1bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0REIodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJfaXRlbV0sIHF1ZXJ5UGFyYW1zKVxyXG4gICAgICAudGhlbigocnMpID0+IHJzIGFzIHVua25vd24gYXMgT3JkZXJJdGVtW10pXHJcbiAgICAgIC50aGVuKChvcmRlckl0ZW1zKSA9PiB7XHJcbiAgICAgICAgXy5tYXAob3JkZXJJdGVtcywgYXN5bmMgKG9yZGVySXRlbTogT3JkZXJJdGVtKSA9PiB7XHJcbiAgICAgICAgICAvLyBnZXQgbWVhbFxyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZXREQldpdGhJZCh0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5tZWFsXSwgb3JkZXJJdGVtLm1lYWxfaWQpXHJcbiAgICAgICAgICAgIC50aGVuKChtZWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgb3JkZXJJdGVtLm1lYWwgPSBtZWFsIGFzIHVua25vd24gYXMgTWVhbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG9yZGVySXRlbXM7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IG9yZGVyIGRldGFpbHNcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxPcmRlcltdPn1cclxuICAgKi9cclxuICBhc3luYyBnZXRPcmRlcnMoKTogUHJvbWlzZTxPcmRlcltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREQih0aGlzLlRBQkxFU1tFTlVNX1RBQkxFUy5vcmRlcl0pXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBPcmRlcltdKVxyXG4gICAgICAudGhlbigob3JkZXJzKSA9PiB7XHJcbiAgICAgICAgb3JkZXJzID0gb3JkZXJzIGFzIHVua25vd24gYXMgT3JkZXJbXTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXy5tYXAob3JkZXJzLCBhc3luYyAob3JkZXI6IE9yZGVyKSA9PiB7XHJcblxyXG4gICAgICAgICAgLy8gZ2V0IGN1c3RvbWVyIG9mIGVhY2ggb3JkZXJcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0REJXaXRoSWQodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuY3VzdG9tZXJdLCBvcmRlci5jdXN0b21lcl9pZClcclxuICAgICAgICAgICAgLnRoZW4oKGN1c3RvbWVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgb3JkZXIuY3VzdG9tZXIgPSBjdXN0b21lciBhcyB1bmtub3duIGFzIEN1c3RvbWVyO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyBnZXQgaXRlbSBvZiBlYWNoIG9yZGVyXHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdldE9yZGVySXRlbXMoW25ldyBRdWVyeVBhcmFtTW9kZWwoJ29yZGVyX2lkJywgUXVlcnlQYXJhbU1vZGVsLk9QRVJBVElPTlMuRVFVQUwsIG9yZGVyLmlkKV0pXHJcbiAgICAgICAgICAgIC50aGVuKChpdGVtcykgPT4ge1xyXG4gICAgICAgICAgICAgIG9yZGVyLml0ZW1zID0gaXRlbXMgYXMgdW5rbm93biBhcyBPcmRlckl0ZW1bXTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gZ2V0IHJlc3RhdXJhbnQgZm9yIGVhY2ggb3JkZXJcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0REJXaXRoSWQodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMucmVzdGF1cmFudF0sIG9yZGVyLnJlc3RhdXJhbnRfaWQpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN0YXVyYW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgb3JkZXIucmVzdGF1cmFudCA9IHJlc3RhdXJhbnQgYXMgdW5rbm93biBhcyBSZXN0YXVyYW50O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9KSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gb3JkZXJzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRPcmRlckJ5SWQoaWQ6IHN0cmluZyk6IFByb21pc2U8T3JkZXI+IHtcclxuICAgIHJldHVybiB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLm9yZGVyXSwgaWQpXHJcbiAgICAgIC50aGVuKChycykgPT4gcnMgYXMgdW5rbm93biBhcyBPcmRlcilcclxuICAgICAgLnRoZW4oYXN5bmMgKG9yZGVyKSA9PiB7XHJcbiAgICAgICAgb3JkZXIgPSBvcmRlciBhcyB1bmtub3duIGFzIE9yZGVyO1xyXG5cclxuICAgICAgICAvLyBnZXQgY3VzdG9tZXIgb2YgZWFjaCBvcmRlclxyXG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0REJXaXRoSWQodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuY3VzdG9tZXJdLCBvcmRlci5jdXN0b21lcl9pZClcclxuICAgICAgICAgIC50aGVuKChjdXN0b21lcikgPT4ge1xyXG4gICAgICAgICAgICBvcmRlci5jdXN0b21lciA9IGN1c3RvbWVyIGFzIHVua25vd24gYXMgQ3VzdG9tZXI7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IGl0ZW0gb2YgZWFjaCBvcmRlclxyXG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0T3JkZXJJdGVtcyhbbmV3IFF1ZXJ5UGFyYW1Nb2RlbCgnb3JkZXJfaWQnLCBRdWVyeVBhcmFtTW9kZWwuT1BFUkFUSU9OUy5FUVVBTCwgb3JkZXIuaWQpXSlcclxuICAgICAgICAgIC50aGVuKChpdGVtcykgPT4ge1xyXG4gICAgICAgICAgICBvcmRlci5pdGVtcyA9IGl0ZW1zIGFzIHVua25vd24gYXMgT3JkZXJJdGVtW107XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHJlc3RhdXJhbnQgZm9yIGVhY2ggb3JkZXJcclxuICAgICAgICBhd2FpdCB0aGlzLmdldERCV2l0aElkKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdLCBvcmRlci5yZXN0YXVyYW50X2lkKVxyXG4gICAgICAgICAgLnRoZW4oKHJlc3RhdXJhbnQpID0+IHtcclxuICAgICAgICAgICAgb3JkZXIucmVzdGF1cmFudCA9IHJlc3RhdXJhbnQgYXMgdW5rbm93biBhcyBSZXN0YXVyYW50O1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBvcmRlcjtcclxuICAgICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGRhdGEgb2YgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXT59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXREQihvYmplY3QsIHF1ZXJ5UGFyYW1zPzogUXVlcnlQYXJhbU1vZGVsW10sIGlkPzogc3RyaW5nKTogUHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXT4ge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbihvYmplY3QubmFtZSwgcmVmID0+IHtcclxuICAgICAgbGV0IG5ld1JlZiA9IG51bGw7XHJcbiAgICAgIGlmICghIXF1ZXJ5UGFyYW1zKSB7XHJcbiAgICAgICAgXy5tYXAocXVlcnlQYXJhbXMsICh4OiBRdWVyeVBhcmFtTW9kZWwpID0+IHtcclxuICAgICAgICAgIG5ld1JlZiA9IG5ld1JlZiA/IG5ld1JlZi53aGVyZSh4LmtleSwgeC5vcGVyYXRpb24sIHgudmFsdWUpIDogcmVmLndoZXJlKHgua2V5LCB4Lm9wZXJhdGlvbiwgeC52YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5ld1JlZiB8fCByZWY7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY29sbGVjdGlvblxyXG4gICAgICAuc25hcHNob3RDaGFuZ2VzKClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKGl0ZW1zID0+IGl0ZW1zLm1hcChhID0+IHtcclxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhLnBheWxvYWQuZG9jLmRhdGEoKSBhcyBPYmplY3Q7XHJcbiAgICAgICAgICBjb25zdCBpZCA9IGEucGF5bG9hZC5kb2MuaWQ7XHJcbiAgICAgICAgICAvLyB1cGRhdGUgaWRcclxuICAgICAgICAgIGRhdGFbJ2lkJ10gPSBpZDtcclxuICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pKSxcclxuICAgICAgICBtYXAoKGl0ZW1zKSA9PiBfLmZpbHRlcihpdGVtcywgZG9jID0+IHtcclxuICAgICAgICAgIGlmICghIWlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkb2MuaWQgPT09IGlkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGRvYztcclxuICAgICAgICB9KSlcclxuICAgICAgKVxyXG4gICAgICAucGlwZSh0YXAoKSwgZmlyc3QoKSkudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydFRvQ2xhc3NPYmplY3QocnMsIG9iamVjdC5jbGFzcyk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IG9iamVjdCBieSBpZFxyXG4gICAqIEBwYXJhbSBvYmplY3RcclxuICAgKiBAcGFyYW0gaWRcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3JbXT59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXREQldpdGhJZChvYmplY3QsIGlkOiBzdHJpbmcpOiBQcm9taXNlPElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcj4ge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuZG9jKGAke29iamVjdC5uYW1lfS8ke2lkfWApO1xyXG4gICAgcmV0dXJuIGNvbGxlY3Rpb25cclxuICAgICAgLnNuYXBzaG90Q2hhbmdlcygpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcChhID0+IHtcclxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhLnBheWxvYWQuZGF0YSgpIGFzIE9iamVjdDtcclxuICAgICAgICAgIGNvbnN0IGlkID0gYS5wYXlsb2FkLmlkO1xyXG4gICAgICAgICAgLy8gdXBkYXRlIGlkXHJcbiAgICAgICAgICBkYXRhWydpZCddID0gaWQ7XHJcbiAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KVxyXG4gICAgICApXHJcbiAgICAgIC5waXBlKHRhcCgpLCBmaXJzdCgpKS50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICBjb25zdCBhcnJheSA9IHRoaXMuY29udmVydFRvQ2xhc3NPYmplY3QoW3JzXSwgb2JqZWN0LmNsYXNzKTtcclxuICAgICAgICByZXR1cm4gYXJyYXkubGVuZ3RoID8gYXJyYXlbMF0gOiBudWxsO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbnZlcnQgZGF0YSB0byBjbGFzcyBvYmplY3RcclxuICAgKiBAcGFyYW0gZGF0YVxyXG4gICAqIEBwYXJhbSBtb2RlbENsYXNzXHJcbiAgICogQHJldHVybnMge2FueVtdfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29udmVydFRvQ2xhc3NPYmplY3QoZGF0YTogYW55W10sIG1vZGVsQ2xhc3M6IElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcik6IElEZWZhdWx0TW9kZWxDb25zdHJ1Y3RvcltdIHtcclxuICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICBfLm1hcChkYXRhLCAoeCkgPT4ge1xyXG4gICAgICBjb25zdCBtb2RlbCA9IG5ldyBtb2RlbENsYXNzKHgpO1xyXG4gICAgICBhcnJheS5wdXNoKG1vZGVsKTtcclxuICAgIH0pO1xyXG4gICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xyXG4gICAgcmV0dXJuIGFycmF5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY3JlYXRlIGRvY3VtZW50LCBzZXQgaWRcclxuICAgKiBAcGFyYW0gb2JqZWN0XHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgY3JlYXRlV2l0aE9iamVjdChvYmplY3Q6IElEZWZhdWx0TW9kZWwpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5fQW5ndWxhckZpcmVzdG9yZS5jcmVhdGVJZCgpO1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbih0aGlzLmdldFRhYmxlKG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lKSk7XHJcbiAgICByZXR1cm4gY29sbGVjdGlvbi5kb2MoaWQpLnNldChvYmplY3QuZ2V0RGF0YSgpKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgb2JqZWN0LmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShgQ3JlYXRlZCAke29iamVjdC5jb25zdHJ1Y3Rvci5uYW1lfWApO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHVwZGF0ZSBkb2N1bWVudFxyXG4gICAqIEBwYXJhbSBvYmplY3RcclxuICAgKi9cclxuICB1cGRhdGVXaXRoT2JqZWN0KG9iamVjdDogSURlZmF1bHRNb2RlbCkge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IHRoaXMuX0FuZ3VsYXJGaXJlc3RvcmUuY29sbGVjdGlvbih0aGlzLmdldFRhYmxlKG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lKSk7XHJcbiAgICByZXR1cm4gY29sbGVjdGlvbi5kb2Mob2JqZWN0LmlkKS51cGRhdGUob2JqZWN0LmdldERhdGEoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgdGFibGUgbmFtZSBmcm9tIGNsYXNzIG5hbWVcclxuICAgKiBAcGFyYW0gY2xhc3NOYW1lXHJcbiAgICogQHJldHVybnMge2FueX1cclxuICAgKi9cclxuICBnZXRUYWJsZShjbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIF8uZmluZCh0aGlzLlRBQkxFUywgKHRhYmxlKSA9PiB7XHJcbiAgICAgIHJldHVybiB0YWJsZS5jbGFzcy5uYW1lID09PSBjbGFzc05hbWU7XHJcbiAgICB9KS5uYW1lO1xyXG4gIH1cclxuXHJcbiAgLyo9PT09PT09PWRlbGV0ZT09PT09PT09PSovXHJcblxyXG4gIGRlbGV0ZU9yZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlVGFibGUodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJdLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlT3JkZXJJdGVtKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlVGFibGUodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMub3JkZXJfaXRlbV0ubmFtZSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVEZWxpdmVyeSgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlbGV0ZVRhYmxlKHRoaXMuVEFCTEVTW0VOVU1fVEFCTEVTLmRlbGl2ZXJ5XS5uYW1lKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZURlbGl2ZXJ5U3RhdHVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlVGFibGUodGhpcy5UQUJMRVNbRU5VTV9UQUJMRVMuZGVsaXZlcnlfc3RhdHVzX2hpc3RvcnldLm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZGVsZXRlIGRhdGEgb2YgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBuYW1lXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkZWxldGVUYWJsZShuYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLl9Bbmd1bGFyRmlyZXN0b3JlLmNvbGxlY3Rpb24obmFtZSkuZ2V0KCkudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oYXN5bmMgcmVzID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSBbXTtcclxuICAgICAgICByZXMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgIGFycmF5LnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXy5tYXAoYXJyYXksIGFzeW5jIGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgYXdhaXQgZWxlbWVudC5yZWYuZGVsZXRlKCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgZGVsZXRlICR7bmFtZX1gKTtcclxuICAgICAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYGRlbGV0ZSAke25hbWV9YCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFBvaW50c1JlYWxUaW1lKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRSZWFsVGltZURCKCdwb2ludHMnLCBpZCk7XHJcbiAgfVxyXG5cclxuICBnZXRSZWFsVGltZURCKG5hbWU6IHN0cmluZywgaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuX0FuZ3VsYXJGaXJlRGF0YWJhc2UubGlzdChgJHtuYW1lfS8ke2lkfWApLnZhbHVlQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgLyphdXRoZW50aWNhdGlvbiovXHJcblxyXG4gIC8qKlxyXG4gICAqIFNpZ24gaW4gd2l0aCBlbWFpbC9wYXNzd29yZFxyXG4gICAqIEBwYXJhbSB1c2VyXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59XHJcbiAgICovXHJcbiAgYXN5bmMgc2lnblVwKHVzZXI6IEN1c3RvbWVyKSB7XHJcblxyXG4gICAgY29uc3QgZ2VvUG9pbnQgPSBhd2FpdCB0aGlzLl9NYXBTZXJ2aWNlLmdldExhdExuZ0Zyb21BZGRyZXNzKHVzZXIuYWRkcmVzcyk7XHJcbiAgICB1c2VyLmxhdCA9IGdlb1BvaW50LmxhdCgpO1xyXG4gICAgdXNlci5sbmcgPSBnZW9Qb2ludC5sbmcoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fQW5ndWxhckZpcmVBdXRoLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCh1c2VyLmVtYWlsLCB1c2VyLnBhc3N3b3JkKVxyXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgLy8gY3JlYXRlIGN1c3RvbWVyIG9iamVjdFxyXG4gICAgICAgIGRlbGV0ZSB1c2VyLnBhc3N3b3JkO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVdpdGhPYmplY3QodXNlcilcclxuICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgd2luZG93LmFsZXJ0KGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaWduIGluIHdpdGggZW1haWwvcGFzc3dvcmRcclxuICAgKiBAcGFyYW0gdXNlclxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEN1c3RvbWVyPn1cclxuICAgKi9cclxuICBzaWduSW4odXNlcjogQ3VzdG9tZXIpOiBQcm9taXNlPEN1c3RvbWVyPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fQW5ndWxhckZpcmVBdXRoLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKHVzZXIuZW1haWwsIHVzZXIucGFzc3dvcmQpXHJcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEN1c3RvbWVyQnlFbWFpbCh1c2VyLmVtYWlsKTtcclxuICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgd2luZG93LmFsZXJ0KGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCByYW5kb21cclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKiBAcmV0dXJucyB7YW55IHwgbnVsbCB8IG51bWJlcn1cclxuICAgKi9cclxuICBnZXRSYW5kb20odmFsdWU6IGFueVtdIHwgbnVtYmVyKTogYW55IHtcclxuICAgIGlmICghaXNOYU4oTnVtYmVyKHZhbHVlKSkpIHtcclxuICAgICAgcmV0dXJuIF8ucmFuZG9tKDAsIHZhbHVlKSArIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWx1ZSA9IHZhbHVlIGFzIHVua25vd24gYXMgYW55W107XHJcbiAgICAgIHJldHVybiB2YWx1ZVtfLnJhbmRvbSgwLCB2YWx1ZS5sZW5ndGggLSAxKV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjaGVja291dFxyXG4gICAqIEBwYXJhbSBjdXN0b21lclxyXG4gICAqIEBwYXJhbSByZXN0YXVyYW50XHJcbiAgICogQHBhcmFtIG9yZGVySXRlbXNcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyBjaGVja291dChjdXN0b21lcjogQ3VzdG9tZXIsIHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQsIG9yZGVySXRlbXM6IE9yZGVySXRlbVtdKSB7XHJcbiAgICBsZXQgZGVsaXZlcnk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjb3VyaWVyOiBDb3VyaWVyID0gdGhpcy5nZXRSYW5kb20oYXdhaXQgdGhpcy5nZXRDb3VyaWVyKCkpO1xyXG5cclxuICAgICAgLy8gY3JlYXRlIG9yZGVyXHJcbiAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKHtcclxuICAgICAgICBkYXRlX3RpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG4gICAgICAgIHJlc3RhdXJhbnRfaWQ6IHJlc3RhdXJhbnQuaWQsXHJcbiAgICAgICAgY3VzdG9tZXJfaWQ6IGN1c3RvbWVyLmlkXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgYXdhaXQgdGhpcy5jcmVhdGVXaXRoT2JqZWN0KG9yZGVyKTtcclxuXHJcbiAgICAgIC8vIGNyZWF0ZSBvcmRlciBpdGVtc1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChfLm1hcChvcmRlckl0ZW1zLCBhc3luYyB4ID0+IHtcclxuICAgICAgICB4Lm9yZGVyX2lkID0gb3JkZXIuaWQ7XHJcbiAgICAgICAgeC5vcmRlciA9IG9yZGVyO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlV2l0aE9iamVjdCh4KTtcclxuICAgICAgICBvcmRlci50b3RhbCArPSB4Lm1lYWwucHJpY2UgKiB4LnF1YW50aXR5O1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgfSkpO1xyXG5cclxuICAgICAgb3JkZXIudG90YWwgPSBNYXRoLnJvdW5kKG9yZGVyLnRvdGFsICogMTAwKSAvIDEwMC4wO1xyXG5cclxuICAgICAgYXdhaXQgdGhpcy51cGRhdGVXaXRoT2JqZWN0KG9yZGVyKTtcclxuXHJcbiAgICAgIC8vIGNyZWF0ZSBkZWxpdmVyeVxyXG4gICAgICBkZWxpdmVyeSA9IG5ldyBEZWxpdmVyeShcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwb2ludHM6IFtdLFxyXG4gICAgICAgICAgY291cmllcl9pZDogY291cmllci5pZCxcclxuICAgICAgICAgIG9yZGVyX2lkOiBvcmRlci5pZFxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIGFkZCBwYXRoc1xyXG4gICAgICBhd2FpdCB0aGlzLl9NYXBTZXJ2aWNlLnJlbmRlckRpcmVjdGlvbihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGNvdXJpZXIubGF0LCBjb3VyaWVyLmxuZyksIG5ldyBnb29nbGUubWFwcy5MYXRMbmcocmVzdGF1cmFudC5sYXQsIHJlc3RhdXJhbnQubG5nKSlcclxuICAgICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICAgIGRlbGl2ZXJ5LnBhdGhfdG9fcmVzdGF1cmFudCA9IHJzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgYXdhaXQgdGhpcy5fTWFwU2VydmljZS5yZW5kZXJEaXJlY3Rpb24obmV3IGdvb2dsZS5tYXBzLkxhdExuZyhyZXN0YXVyYW50LmxhdCwgcmVzdGF1cmFudC5sbmcpLCBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGN1c3RvbWVyLmxhdCwgY3VzdG9tZXIubG5nKSlcclxuICAgICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICAgIGRlbGl2ZXJ5LnBhdGhfdG9fY3VzdG9tZXIgPSBycztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIGF3YWl0IHRoaXMuY3JlYXRlV2l0aE9iamVjdChkZWxpdmVyeSk7XHJcblxyXG4gICAgICAvLyBjcmVhdGUgZGVsaXZlcnkgc3RhdHVzXHJcbiAgICAgIGNvbnN0IGRlbGl2ZXJ5U3RhdHVzSGlzdG9yeSA9IG5ldyBEZWxpdmVyeVN0YXR1c0hpc3Rvcnkoe1xyXG4gICAgICAgIHN0YXR1czogRGVsaXZlcnlfU3RhdHVzLk9SREVSRUQsXHJcbiAgICAgICAgZGVsaXZlcnlfaWQ6IGRlbGl2ZXJ5LmlkLFxyXG4gICAgICAgIGRhdGVfdGltZTogbW9tZW50KCkudmFsdWVPZigpXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgYXdhaXQgdGhpcy5jcmVhdGVXaXRoT2JqZWN0KGRlbGl2ZXJ5U3RhdHVzSGlzdG9yeSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICAudGhlbigoKSA9PiBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgLnRoZW4oKCkgPT4gZGVsaXZlcnkpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19