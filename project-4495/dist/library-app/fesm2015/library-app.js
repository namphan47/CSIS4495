import { Subscription, BehaviorSubject } from 'rxjs';
import { __decorate, __awaiter } from 'tslib';
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

class DefaultComponent {
    constructor() {
        this.unsubscribeAll();
    }
    ngOnDestroy() {
        this.unsubscribeAll();
    }
    /**
     * unsubscribe all subscription which add into the component
     * it is important to prevent subscription still exist when component is destroyed
     */
    unsubscribeAll() {
        if (this._subscriptionList) {
            this._subscriptionList.unsubscribe();
        }
        this._subscriptionList = new Subscription();
    }
    /**
     * add subscriptions to component storage
     * @param subscriptions
     */
    addSubscribes(...subscriptions) {
        subscriptions.forEach((el) => {
            this._subscriptionList.add(el);
        });
    }
}

class DefaultModel {
    constructor(data) {
        if (data.hasOwnProperty('_raw')) {
            delete data['_raw'];
        }
        this._raw = data;
    }
    copyInto(json) {
        for (let key in json) {
            if (this.hasOwnProperty(key)) {
                this[key] = json[key];
            }
        }
    }
    getData() {
        const self = this;
        const result = {};
        Object.keys(this).map(key => {
            if (this[key] instanceof DefaultModel) {
                return;
            }
            switch (key) {
                case '_raw':
                case 'meals':
                case 'items':
                    return;
            }
            result[key] = this[key];
        });
        return result;
    }
}

class Courier extends DefaultModel {
    constructor(data) {
        super(data);
        this.id = '';
        this.name = '';
        this.vin = '';
        this.driver_license = '';
        this.email = '';
        this.phone_no = '';
        super.copyInto(data);
    }
}

class Customer extends DefaultModel {
    constructor(data) {
        super(data);
        this.id = '';
        this.name = '';
        this.address = '';
        this.lat = '';
        this.long = '';
        this.phone_no = '';
        this.email = '';
        super.copyInto(data);
    }
}

class Delivery {
}

class Meal extends DefaultModel {
    constructor(data) {
        super(data);
        this.id = '';
        this.name = '';
        this.description = '';
        this.price = 0;
        this.image = '';
        this.restaurant_name = '';
        super.copyInto(data);
    }
}

class Order extends DefaultModel {
    constructor(data) {
        super(data);
        this.id = '';
        this.date_time = 0;
        this.restaurant_id = '';
        this.customer_id = '';
        this.total = 0;
        super.copyInto(data);
    }
}

class OrderItem extends DefaultModel {
    constructor(data) {
        super(data);
        this.id = '';
        this.order_id = '';
        this.meal_id = '';
        this.quantity = 0;
        super.copyInto(data);
    }
}

class OrderStatusHistory {
}

class OrderStatusType {
}

class Point {
}

class Restaurant extends DefaultModel {
    constructor(data) {
        super(data);
        this.id = '';
        this.name = '';
        this.address = '';
        this.phone_no = '';
        this.lat = '';
        this.long = '';
        this.meal_ids = [];
        this.meals = [];
        super.copyInto(data);
    }
}

var EnumOperation;
(function (EnumOperation) {
    EnumOperation["LESS"] = "<";
    EnumOperation["LESS_EQUAL"] = "<=";
    EnumOperation["EQUAL"] = "==";
    EnumOperation["GREATER"] = ">";
    EnumOperation["GREATER_EQUAL"] = ">=";
})(EnumOperation || (EnumOperation = {}));
class QueryParamModel {
    constructor(key, operation, value) {
        this.key = key;
        this.operation = operation;
        this.value = value;
    }
}
QueryParamModel.OPERATIONS = EnumOperation;

let UtilsService = class UtilsService {
    constructor(_HttpClient) {
        this._HttpClient = _HttpClient;
    }
    getJSON(url) {
        return this._HttpClient.get(url);
    }
};
UtilsService.ctorParameters = () => [
    { type: HttpClient }
];
UtilsService.ɵprov = ɵɵdefineInjectable({ factory: function UtilsService_Factory() { return new UtilsService(ɵɵinject(HttpClient)); }, token: UtilsService, providedIn: "root" });
UtilsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UtilsService);

let DummyDataService = class DummyDataService {
    constructor(_UtilsService) {
        this._UtilsService = _UtilsService;
        this.CONSTANT_PATH = 'assets/dummy/';
        this.JSONS = {
            [ENUM_TABLES.restaurant]: 'restaurant.json',
            [ENUM_TABLES.customer]: 'customer.json',
            [ENUM_TABLES.meal]: 'meal.json',
            [ENUM_TABLES.courier]: 'courier.json',
        };
    }
    convertDummyDataToModel(table, modelClass) {
        if (!this.JSONS[table]) {
            return Promise.resolve([]);
        }
        return this._UtilsService.getJSON(this.CONSTANT_PATH + this.JSONS[table])
            .pipe(tap(), first())
            .toPromise()
            .then(data => {
            const array = [];
            _.map(data, (x) => {
                const model = new modelClass(x);
                array.push(model);
            });
            return array;
        });
    }
};
DummyDataService.TABLES = ENUM_TABLES;
DummyDataService.ctorParameters = () => [
    { type: UtilsService }
];
DummyDataService.ɵprov = ɵɵdefineInjectable({ factory: function DummyDataService_Factory() { return new DummyDataService(ɵɵinject(UtilsService)); }, token: DummyDataService, providedIn: "root" });
DummyDataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DummyDataService);

let NotificationService = class NotificationService {
    constructor() {
        this._Observable_Message = new BehaviorSubject(null);
    }
    reset() {
        this._Observable_Message.next(null);
    }
    pushMessage(message) {
        this._Observable_Message.next(message);
    }
    getMessageOservable() {
        return this._Observable_Message;
    }
};
NotificationService.ɵprov = ɵɵdefineInjectable({ factory: function NotificationService_Factory() { return new NotificationService(); }, token: NotificationService, providedIn: "root" });
NotificationService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], NotificationService);

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
            [ENUM_TABLES.order_item]: {
                name: ENUM_TABLES.order_item,
                class: OrderItem
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
                yield this.deleteDB(x.name);
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
     * delete data of collection
     * @param name
     * @returns {Promise<void>}
     */
    deleteDB(name) {
        return this._AngularFirestore.collection(name).get().toPromise()
            .then(res => {
            return res.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                yield element.ref.delete();
                console.log(`delete ${name}`);
                this._NotificationService.pushMessage(`delete ${name}`);
            }));
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
    getOrder() {
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
};
FirebaseDataService.ctorParameters = () => [
    { type: AngularFirestore },
    { type: DummyDataService },
    { type: NotificationService }
];
FirebaseDataService.ɵprov = ɵɵdefineInjectable({ factory: function FirebaseDataService_Factory() { return new FirebaseDataService(ɵɵinject(AngularFirestore), ɵɵinject(DummyDataService), ɵɵinject(NotificationService)); }, token: FirebaseDataService, providedIn: "root" });
FirebaseDataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FirebaseDataService);

let SimulatorDataService = class SimulatorDataService {
    constructor(_FirebaseDataService) {
        this._FirebaseDataService = _FirebaseDataService;
    }
    /**
     * start simulator
     * @returns {Promise<void>}
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            Promise.all([this._FirebaseDataService.getCustomer(),
                this._FirebaseDataService.getRestaurant()])
                .then(([customers, restaurants]) => __awaiter(this, void 0, void 0, function* () {
                console.log(customers, restaurants);
                const customer = this.getRandom(customers);
                const restaurant = this.getRandom(restaurants);
                const meal = this.getRandom(restaurant.meals);
                console.log(customer, restaurant, meal);
                console.log(customer instanceof DefaultModel);
                // create order
                const order = new Order({
                    date_time: new Date().getTime(),
                    restaurant_id: restaurant.id,
                    customer_id: customer.id
                });
                yield this._FirebaseDataService.createWithObject(order);
                // create order item
                const orderItem = new OrderItem({
                    meal_id: meal.id,
                    quantity: this.getRandom(5),
                    order_id: order.id
                });
                orderItem.meal = meal;
                orderItem.order = order;
                yield this._FirebaseDataService.createWithObject(orderItem);
                order.total += orderItem.meal.price * orderItem.quantity;
                this._FirebaseDataService.updateWithObject(order);
            }));
        });
    }
    stop() {
    }
    /**
     * get random
     * @param value
     * @returns {any | null | number}
     */
    getRandom(value) {
        if (!isNaN(Number(value))) {
            return _.random(0, value);
        }
        else {
            value = value;
            return value[_.random(0, value.length - 1)];
        }
        return null;
    }
};
SimulatorDataService.ctorParameters = () => [
    { type: FirebaseDataService }
];
SimulatorDataService.ɵprov = ɵɵdefineInjectable({ factory: function SimulatorDataService_Factory() { return new SimulatorDataService(ɵɵinject(FirebaseDataService)); }, token: SimulatorDataService, providedIn: "root" });
SimulatorDataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SimulatorDataService);

let LibraryAppService = class LibraryAppService {
    constructor() {
    }
    testString() {
        return 'Hello';
    }
};
LibraryAppService.ɵprov = ɵɵdefineInjectable({ factory: function LibraryAppService_Factory() { return new LibraryAppService(); }, token: LibraryAppService, providedIn: "root" });
LibraryAppService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], LibraryAppService);

let LibraryAppComponent = class LibraryAppComponent {
    constructor() { }
    ngOnInit() {
    }
};
LibraryAppComponent = __decorate([
    Component({
        selector: 'lib-library-app',
        template: `
    <p>
      library-app works!
    </p>
  `
    })
], LibraryAppComponent);

let LibraryAppModule = class LibraryAppModule {
};
LibraryAppModule = __decorate([
    NgModule({
        declarations: [LibraryAppComponent],
        imports: [],
        exports: [LibraryAppComponent]
    })
], LibraryAppModule);

let TestAppService = class TestAppService {
    constructor() {
    }
    testString() {
        return 'Hello Test App';
    }
};
TestAppService.ɵprov = ɵɵdefineInjectable({ factory: function TestAppService_Factory() { return new TestAppService(); }, token: TestAppService, providedIn: "root" });
TestAppService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TestAppService);

/*
 * Public API Surface of library-app
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Courier, Customer, DefaultComponent, DefaultModel, Delivery, DummyDataService, ENUM_TABLES, FirebaseDataService, LibraryAppComponent, LibraryAppModule, LibraryAppService, Meal, NotificationService, Order, OrderItem, OrderStatusHistory, OrderStatusType, Point, QueryParamModel, Restaurant, SimulatorDataService, TestAppService, UtilsService };
//# sourceMappingURL=library-app.js.map
