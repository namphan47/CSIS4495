(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('lodash'), require('rxjs/operators'), require('@angular/common/http'), require('@angular/fire/firestore')) :
    typeof define === 'function' && define.amd ? define('library-app', ['exports', '@angular/core', 'rxjs', 'lodash', 'rxjs/operators', '@angular/common/http', '@angular/fire/firestore'], factory) :
    (global = global || self, factory(global['library-app'] = {}, global.ng.core, global.rxjs, global._, global.rxjs.operators, global.ng.common.http, global.ng.fire.firestore));
}(this, (function (exports, core, rxjs, _, operators, http, firestore) { 'use strict';

    _ = _ && Object.prototype.hasOwnProperty.call(_, 'default') ? _['default'] : _;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var LibraryAppService = /** @class */ (function () {
        function LibraryAppService() {
        }
        LibraryAppService.prototype.testString = function () {
            return 'Hello';
        };
        LibraryAppService.ɵfac = function LibraryAppService_Factory(t) { return new (t || LibraryAppService)(); };
        LibraryAppService.ɵprov = core.ɵɵdefineInjectable({ token: LibraryAppService, factory: LibraryAppService.ɵfac, providedIn: 'root' });
        return LibraryAppService;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(LibraryAppService, [{
            type: core.Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], function () { return []; }, null); })();

    var LibraryAppComponent = /** @class */ (function () {
        function LibraryAppComponent() {
        }
        LibraryAppComponent.prototype.ngOnInit = function () {
        };
        LibraryAppComponent.ɵfac = function LibraryAppComponent_Factory(t) { return new (t || LibraryAppComponent)(); };
        LibraryAppComponent.ɵcmp = core.ɵɵdefineComponent({ type: LibraryAppComponent, selectors: [["lib-library-app"]], decls: 2, vars: 0, template: function LibraryAppComponent_Template(rf, ctx) { if (rf & 1) {
                core.ɵɵelementStart(0, "p");
                core.ɵɵtext(1, " library-app works! ");
                core.ɵɵelementEnd();
            } }, encapsulation: 2 });
        return LibraryAppComponent;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(LibraryAppComponent, [{
            type: core.Component,
            args: [{
                    selector: 'lib-library-app',
                    template: "\n    <p>\n      library-app works!\n    </p>\n  ",
                    styles: []
                }]
        }], function () { return []; }, null); })();

    var LibraryAppModule = /** @class */ (function () {
        function LibraryAppModule() {
        }
        LibraryAppModule.ɵmod = core.ɵɵdefineNgModule({ type: LibraryAppModule });
        LibraryAppModule.ɵinj = core.ɵɵdefineInjector({ factory: function LibraryAppModule_Factory(t) { return new (t || LibraryAppModule)(); }, imports: [[]] });
        return LibraryAppModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(LibraryAppModule, { declarations: [LibraryAppComponent], exports: [LibraryAppComponent] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(LibraryAppModule, [{
            type: core.NgModule,
            args: [{
                    declarations: [LibraryAppComponent],
                    imports: [],
                    exports: [LibraryAppComponent]
                }]
        }], null, null); })();

    var TestAppService = /** @class */ (function () {
        function TestAppService() {
        }
        TestAppService.prototype.testString = function () {
            return 'Hello Test App';
        };
        TestAppService.ɵfac = function TestAppService_Factory(t) { return new (t || TestAppService)(); };
        TestAppService.ɵprov = core.ɵɵdefineInjectable({ token: TestAppService, factory: TestAppService.ɵfac, providedIn: 'root' });
        return TestAppService;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(TestAppService, [{
            type: core.Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], function () { return []; }, null); })();


    (function (ENUM_TABLES) {
        ENUM_TABLES["customer"] = "customer";
        ENUM_TABLES["restaurant"] = "restaurant";
        ENUM_TABLES["meal"] = "meal";
        ENUM_TABLES["courier"] = "courier";
        ENUM_TABLES["order_item"] = "order_item";
        ENUM_TABLES["order"] = "order";
    })(exports.ENUM_TABLES || (exports.ENUM_TABLES = {}));

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
            this._subscriptionList = new rxjs.Subscription();
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
        DefaultComponent.ɵfac = function DefaultComponent_Factory(t) { return new (t || DefaultComponent)(); };
        DefaultComponent.ɵdir = core.ɵɵdefineDirective({ type: DefaultComponent });
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
        UtilsService.ɵfac = function UtilsService_Factory(t) { return new (t || UtilsService)(core.ɵɵinject(http.HttpClient)); };
        UtilsService.ɵprov = core.ɵɵdefineInjectable({ token: UtilsService, factory: UtilsService.ɵfac, providedIn: 'root' });
        return UtilsService;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(UtilsService, [{
            type: core.Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], function () { return [{ type: http.HttpClient }]; }, null); })();

    var DummyDataService = /** @class */ (function () {
        function DummyDataService(_UtilsService) {
            var _a;
            this._UtilsService = _UtilsService;
            this.CONSTANT_PATH = 'assets/dummy/';
            this.JSONS = (_a = {},
                _a[exports.ENUM_TABLES.restaurant] = 'restaurant.json',
                _a[exports.ENUM_TABLES.customer] = 'customer.json',
                _a[exports.ENUM_TABLES.meal] = 'meal.json',
                _a[exports.ENUM_TABLES.courier] = 'courier.json',
                _a);
        }
        DummyDataService.prototype.convertDummyDataToModel = function (table, modelClass) {
            if (!this.JSONS[table]) {
                return Promise.resolve([]);
            }
            return this._UtilsService.getJSON(this.CONSTANT_PATH + this.JSONS[table])
                .pipe(operators.tap(), operators.first())
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
        DummyDataService.TABLES = exports.ENUM_TABLES;
        DummyDataService.ɵfac = function DummyDataService_Factory(t) { return new (t || DummyDataService)(core.ɵɵinject(UtilsService)); };
        DummyDataService.ɵprov = core.ɵɵdefineInjectable({ token: DummyDataService, factory: DummyDataService.ɵfac, providedIn: 'root' });
        return DummyDataService;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(DummyDataService, [{
            type: core.Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], function () { return [{ type: UtilsService }]; }, null); })();

    var NotificationService = /** @class */ (function () {
        function NotificationService() {
            this._Observable_Message = new rxjs.BehaviorSubject(null);
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
        NotificationService.ɵfac = function NotificationService_Factory(t) { return new (t || NotificationService)(); };
        NotificationService.ɵprov = core.ɵɵdefineInjectable({ token: NotificationService, factory: NotificationService.ɵfac, providedIn: 'root' });
        return NotificationService;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(NotificationService, [{
            type: core.Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], function () { return []; }, null); })();

    var FirebaseDataService = /** @class */ (function () {
        function FirebaseDataService(_AngularFirestore, _DummyDataService, _NotificationService) {
            var _a;
            this._AngularFirestore = _AngularFirestore;
            this._DummyDataService = _DummyDataService;
            this._NotificationService = _NotificationService;
            this.TABLES = (_a = {},
                _a[exports.ENUM_TABLES.customer] = {
                    name: exports.ENUM_TABLES.customer,
                    class: Customer
                },
                _a[exports.ENUM_TABLES.courier] = {
                    name: exports.ENUM_TABLES.courier,
                    class: Courier
                },
                _a[exports.ENUM_TABLES.restaurant] = {
                    name: exports.ENUM_TABLES.restaurant,
                    class: Restaurant
                },
                _a[exports.ENUM_TABLES.meal] = {
                    name: exports.ENUM_TABLES.meal,
                    class: Meal
                },
                _a[exports.ENUM_TABLES.order] = {
                    name: exports.ENUM_TABLES.order,
                    class: Order
                },
                _a[exports.ENUM_TABLES.order_item] = {
                    name: exports.ENUM_TABLES.order_item,
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
                                            _this._AngularFirestore.collection(_this.TABLES[exports.ENUM_TABLES.restaurant].name)
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
            return this.getDB(this.TABLES[exports.ENUM_TABLES.customer])
                .then(function (rs) { return rs; });
        };
        /**
         * get courier data
         * @returns {Promise<Courier[]>}
         */
        FirebaseDataService.prototype.getCourier = function () {
            return this.getDB(this.TABLES[exports.ENUM_TABLES.courier])
                .then(function (rs) { return rs; });
        };
        /**
         * get restaurant data
         * @returns {Promise<Restaurant[]>}
         */
        FirebaseDataService.prototype.getRestaurant = function () {
            var _this = this;
            return this.getDB(this.TABLES[exports.ENUM_TABLES.restaurant])
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
            return this.getDB(this.TABLES[exports.ENUM_TABLES.meal])
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
                    return [2 /*return*/, this.getDB(this.TABLES[exports.ENUM_TABLES.order_item], queryParams)
                            .then(function (rs) { return rs; })
                            .then(function (orderItems) {
                            _.map(orderItems, function (orderItem) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: 
                                        // get meal
                                        return [4 /*yield*/, this.getDBWithId(this.TABLES[exports.ENUM_TABLES.meal], orderItem.meal_id)
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
                    return [2 /*return*/, this.getDB(this.TABLES[exports.ENUM_TABLES.order])
                            .then(function (rs) { return rs; })
                            .then(function (orders) {
                            orders = orders;
                            _.map(orders, function (order) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: 
                                        // get customer of each order
                                        return [4 /*yield*/, this.getDBWithId(this.TABLES[exports.ENUM_TABLES.customer], order.customer_id)
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
                                            return [4 /*yield*/, this.getDBWithId(this.TABLES[exports.ENUM_TABLES.restaurant], order.restaurant_id)
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
                .pipe(operators.map(function (items) { return items.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                // update id
                data['id'] = id;
                return data;
            }); }), operators.map(function (items) { return _.filter(items, function (doc) {
                if (!!id) {
                    return doc.id === id;
                }
                return doc;
            }); }))
                .pipe(operators.tap(), operators.first()).toPromise()
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
                .pipe(operators.map(function (a) {
                var data = a.payload.data();
                var id = a.payload.id;
                // update id
                data['id'] = id;
                return data;
            }))
                .pipe(operators.tap(), operators.first()).toPromise()
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
        FirebaseDataService.ɵfac = function FirebaseDataService_Factory(t) { return new (t || FirebaseDataService)(core.ɵɵinject(firestore.AngularFirestore), core.ɵɵinject(DummyDataService), core.ɵɵinject(NotificationService)); };
        FirebaseDataService.ɵprov = core.ɵɵdefineInjectable({ token: FirebaseDataService, factory: FirebaseDataService.ɵfac, providedIn: 'root' });
        return FirebaseDataService;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(FirebaseDataService, [{
            type: core.Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], function () { return [{ type: firestore.AngularFirestore }, { type: DummyDataService }, { type: NotificationService }]; }, null); })();

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
        SimulatorDataService.ɵfac = function SimulatorDataService_Factory(t) { return new (t || SimulatorDataService)(core.ɵɵinject(FirebaseDataService)); };
        SimulatorDataService.ɵprov = core.ɵɵdefineInjectable({ token: SimulatorDataService, factory: SimulatorDataService.ɵfac, providedIn: 'root' });
        return SimulatorDataService;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(SimulatorDataService, [{
            type: core.Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], function () { return [{ type: FirebaseDataService }]; }, null); })();

    exports.Courier = Courier;
    exports.Customer = Customer;
    exports.DefaultComponent = DefaultComponent;
    exports.DefaultModel = DefaultModel;
    exports.Delivery = Delivery;
    exports.DummyDataService = DummyDataService;
    exports.FirebaseDataService = FirebaseDataService;
    exports.LibraryAppComponent = LibraryAppComponent;
    exports.LibraryAppModule = LibraryAppModule;
    exports.LibraryAppService = LibraryAppService;
    exports.Meal = Meal;
    exports.NotificationService = NotificationService;
    exports.Order = Order;
    exports.OrderItem = OrderItem;
    exports.OrderStatusHistory = OrderStatusHistory;
    exports.OrderStatusType = OrderStatusType;
    exports.Point = Point;
    exports.QueryParamModel = QueryParamModel;
    exports.Restaurant = Restaurant;
    exports.SimulatorDataService = SimulatorDataService;
    exports.TestAppService = TestAppService;
    exports.UtilsService = UtilsService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=library-app.umd.js.map
