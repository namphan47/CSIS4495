(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('lodash'), require('@angular/core'), require('@angular/common/http'), require('@angular/fire/firestore'), require('rxjs/operators'), require('moment')) :
    typeof define === 'function' && define.amd ? define('library-app', ['exports', 'rxjs', 'lodash', '@angular/core', '@angular/common/http', '@angular/fire/firestore', 'rxjs/operators', 'moment'], factory) :
    (global = global || self, factory(global['library-app'] = {}, global.rxjs, global.lodash, global.ng.core, global.ng.common.http, global.ng.fire.firestore, global.rxjs.operators, global.moment));
}(this, (function (exports, rxjs, ___default, core, http, firestore, operators, moment) { 'use strict';

    var ___default__default = 'default' in ___default ? ___default['default'] : ___default;
    moment = moment && Object.prototype.hasOwnProperty.call(moment, 'default') ? moment['default'] : moment;

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

    (function (ENUM_TABLES) {
        ENUM_TABLES["courier"] = "courier";
        ENUM_TABLES["customer"] = "customer";
        ENUM_TABLES["delivery"] = "delivery";
        ENUM_TABLES["meal"] = "meal";
        ENUM_TABLES["order"] = "order";
        ENUM_TABLES["order_item"] = "order_item";
        ENUM_TABLES["point"] = "point";
        ENUM_TABLES["restaurant"] = "restaurant";
        ENUM_TABLES["delivery_status_history"] = "delivery_status_history";
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

    var Delivery = /** @class */ (function (_super) {
        __extends(Delivery, _super);
        function Delivery(data) {
            var _this = _super.call(this, data) || this;
            _this.id = '';
            _this.points = [];
            _this.courier_id = '';
            _this.order_id = '';
            _this.status_history = [];
            _this.currentStatus = null;
            _super.prototype.copyInto.call(_this, data);
            return _this;
        }
        Delivery.prototype.setStatusHistory = function (histories) {
            this.status_history = histories;
            this.currentStatus = ___default.maxBy(histories, function (x) { return x.date_time; });
        };
        return Delivery;
    }(DefaultModel));


    (function (Delivery_Status) {
        Delivery_Status[Delivery_Status["ORDERED"] = 0] = "ORDERED";
        Delivery_Status[Delivery_Status["PREPARING"] = 1] = "PREPARING";
        Delivery_Status[Delivery_Status["WAIT_FOR_PICK_UP"] = 2] = "WAIT_FOR_PICK_UP";
        Delivery_Status[Delivery_Status["DELIVERING"] = 3] = "DELIVERING";
        Delivery_Status[Delivery_Status["DELIVERED"] = 4] = "DELIVERED";
    })(exports.Delivery_Status || (exports.Delivery_Status = {}));
    var DeliveryStatusHistory = /** @class */ (function (_super) {
        __extends(DeliveryStatusHistory, _super);
        function DeliveryStatusHistory(data) {
            var _this = _super.call(this, data) || this;
            _this.id = '';
            _this.status = null;
            _this.delivery_id = '';
            _this.date_time = 0;
            _super.prototype.copyInto.call(_this, data);
            return _this;
        }
        return DeliveryStatusHistory;
    }(DefaultModel));

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
            { type: http.HttpClient }
        ]; };
        UtilsService.ɵprov = core.ɵɵdefineInjectable({ factory: function UtilsService_Factory() { return new UtilsService(core.ɵɵinject(http.HttpClient)); }, token: UtilsService, providedIn: "root" });
        UtilsService = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], UtilsService);
        return UtilsService;
    }());

    var restaurantData = [
    	{
    		name: "McDonald's",
    		address: "515 6th StNew Westminster, BC V3L 3B9",
    		lat: "49.212271",
    		long: "-122.918816",
    		phone_no: "(604) 718-1172"
    	},
    	{
    		name: "Indian Bombay Bistro",
    		address: " 7558 6th St, Burnaby, BC V3N 3M3",
    		lat: "49.223155",
    		long: "-122.932605",
    		phone_no: " (604) 553-1719"
    	},
    	{
    		name: "Manjal South Indian Kitchen",
    		address: "7613 Edmonds St, Burnaby, BC V3N 1B6",
    		lat: "49.223281",
    		long: "-122.943316",
    		phone_no: " (604) 515-4230"
    	},
    	{
    		name: "Bubble World",
    		address: "601 Agnes St, New Westminster, BC V3M 1G9",
    		lat: "49.204826",
    		long: "-122.910192",
    		phone_no: "(778) 397-7800"
    	},
    	{
    		name: "Miku Vancouver",
    		address: " 200 Granville St # 70, Vancouver, BC V6C 1S4",
    		lat: "49.286826",
    		long: "-123.112584",
    		phone_no: "(604) 568-3900"
    	},
    	{
    		name: "Banh Mi Bar",
    		address: "722 Carnarvon St, New Westminster, BC V3M 6V4",
    		lat: "49.202816",
    		long: "-122.911051",
    		phone_no: "(604) 553-9966"
    	},
    	{
    		name: "De Dutch Pannekoek House",
    		address: "1035 Columbia St #102, New Westminster, BC V3M 1C4",
    		lat: "49.200451",
    		long: "-122.917861",
    		phone_no: "(604) 521-2288"
    	},
    	{
    		name: "Pizza Hut",
    		address: "7515 Market Crossing #170, Burnaby, BC V5J 0A3",
    		lat: "49.198050",
    		long: "-122.978744",
    		phone_no: " (604) 433-8424"
    	},
    	{
    		name: "Donair & Sub House",
    		address: "7634 6th St, Burnaby, BC V3N 3M5",
    		lat: "49.222195",
    		long: "-122.931487",
    		phone_no: "(604) 525-5108"
    	},
    	{
    		name: "Subway",
    		address: "7155 Kingsway Suite# 110, Burnaby, BC V5E 2V1",
    		lat: "49.218681",
    		long: "-122.956770",
    		phone_no: "(604) 759-0016"
    	}
    ];

    var courierData = [
    	{
    		name: "Lizette Scourge",
    		vin: "WVGAV7AX1CW622064",
    		driver_license: 9470107268,
    		email: "lscourge0@php.net",
    		phone_no: "633-385-2282"
    	},
    	{
    		name: "Constantina Jude",
    		vin: "WAUKF68E15A253661",
    		driver_license: 2897719788,
    		email: "cjude1@amazon.co.jp",
    		phone_no: "100-897-4918"
    	},
    	{
    		name: "Elvis Kee",
    		vin: "JH4CU4F41BC617894",
    		driver_license: 4368855612,
    		email: "ekee2@house.gov",
    		phone_no: "314-262-4369"
    	},
    	{
    		name: "Bryce Barck",
    		vin: "WBA3B1C59EF926774",
    		driver_license: 933161220,
    		email: "bbarck3@yellowpages.com",
    		phone_no: "749-951-5984"
    	},
    	{
    		name: "Wyn Elleton",
    		vin: "1GYS4GEF3DR541915",
    		driver_license: 2959453573,
    		email: "welleton4@ask.com",
    		phone_no: "767-563-9023"
    	},
    	{
    		name: "Patrice Costello",
    		vin: "KM8NU4CC9AU096286",
    		driver_license: 3432604998,
    		email: "pcostello5@un.org",
    		phone_no: "722-500-6965"
    	},
    	{
    		name: "Tammy Lahiff",
    		vin: "2C3CCAJG7DH396665",
    		driver_license: 426260708,
    		email: "tlahiff6@ibm.com",
    		phone_no: "458-277-8003"
    	},
    	{
    		name: "Heddi Garci",
    		vin: "3D7TP2HT6AG956637",
    		driver_license: 432395245,
    		email: "hgarci7@google.co.jp",
    		phone_no: "826-314-5170"
    	},
    	{
    		name: "Maryann Matthew",
    		vin: "5UXKR0C56F0833637",
    		driver_license: 7489646901,
    		email: "mmatthew8@soundcloud.com",
    		phone_no: "209-327-5368"
    	},
    	{
    		name: "Inessa Ewells",
    		vin: "1FTWW3B55AE261371",
    		driver_license: 9318168349,
    		email: "iewells9@dell.com",
    		phone_no: "323-249-1314"
    	}
    ];

    var mealData = [
    	{
    		name: "Big Mac Extra Value Meal",
    		description: "Nothing compares to two 100% Canadian beef patties, special sauce, crisp lettuce, processed cheddar cheese, pickles and onions on a toasted sesame seed bun.",
    		price: 9.59,
    		image: "https://restaurants-static.skipthedishes.com/images/resized/medium-36a1f57fe155b3711615.jpg",
    		restaurant_name: "McDonald's"
    	},
    	{
    		name: "BLT with Crispy Chicken Extra Value Meal",
    		description: "Made with Canadian grain-fed chicken breast, with two full strips of bacon, crisp lettuce, tomato & creamy Mayo-Style Sauce on a Brioche-style bun. Grilled or crispy. It’s like seriously good chicken.",
    		price: 11.19,
    		image: "https://restaurants-static.skipthedishes.com/images/resized/medium-16f31925e82e69d1c2c3.jpg",
    		restaurant_name: "McDonald's"
    	},
    	{
    		name: "Quarter Pounder with Cheese Extra Value Meal",
    		description: "A quarter pound of 100% Canadian beef and two slices of melting processed cheddar cheese on a toasted sesame seed bun. That’s pure Canadian beefy cheesiness. Order today!",
    		price: 9.59,
    		image: "https://restaurants-static.skipthedishes.com/images/resized/medium-949e054bbf45e5511ea7.jpg",
    		restaurant_name: "McDonald's"
    	},
    	{
    		name: "McChicken Extra Value Meal",
    		description: "Breaded seasoned chicken and crisp lettuce, topped with our Mayo-Style Sauce. Some ingredients are just meant to be together.",
    		price: 9.19,
    		image: "https://restaurants-static.skipthedishes.com/images/resized/medium-70e6f49aa0e8043831a8.jpg",
    		restaurant_name: "McDonald's"
    	},
    	{
    		name: "10 McNuggets Extra Value Meal",
    		description: "No artificial flavours, colours or preservatives. Made with 100% seasoned chicken breast, the Chicken McNuggets you crave are still simply delicious, and a good source of protein*. *10 g of protein per 4-piece serving.",
    		price: 10.79,
    		image: "https://restaurants-static.skipthedishes.com/images/resized/medium-1de2df62362a5dbc7841.jpg",
    		restaurant_name: "McDonald's"
    	},
    	{
    		name: "Paneer Pakora",
    		description: "Fresh, homemade cheese marinated in yogurt, ginger, and garlic, dipped in chickpea batter and deep fried.",
    		price: 9.95,
    		image: "",
    		restaurant_name: "Indian Bombay Bistro"
    	},
    	{
    		name: "Tandoori Chicken",
    		description: "Chicken marinated in traditional spices and cooked to perfection.",
    		price: 14.95,
    		image: "",
    		restaurant_name: "Indian Bombay Bistro"
    	},
    	{
    		name: "Indian Bombay Bistro Dinner",
    		description: "This delicious dinner includes one plain naan, your choice of chicken curry or yellow dal fry, a small order of tandoori chicken, a small order of chicken tikka, and a lamb kebab.",
    		price: 24.95,
    		image: "",
    		restaurant_name: "Indian Bombay Bistro"
    	},
    	{
    		name: "Mattar Paneer",
    		description: "Fresh, homemade cheese and green peas in an onion and tomato-based sauce flavoured with traditional Indian spices.",
    		price: 12.95,
    		image: "",
    		restaurant_name: "Indian Bombay Bistro"
    	},
    	{
    		name: "Chicken Curry",
    		description: "Tender chunks of chicken in a homemade curry sauce",
    		price: 13.95,
    		image: "",
    		restaurant_name: "Indian Bombay Bistro"
    	},
    	{
    		name: "Tandoori Roti",
    		description: "Unleavened bread baked in a tandoor oven.",
    		price: 1.95,
    		image: "",
    		restaurant_name: "Indian Bombay Bistro"
    	},
    	{
    		name: "Pulao Rice",
    		description: "Perfectly cooked long grain rice with peas and spices.",
    		price: 5.95,
    		image: "",
    		restaurant_name: "Indian Bombay Bistro"
    	},
    	{
    		name: "Plain Idli (2 Pcs.)",
    		description: "Vegan. Savory steamed cake made from a batter of fermented black lentils and rice. Served with sambhar (a spicy lentil soup) and chutneys.",
    		price: 6.99,
    		image: "https://d1ralsognjng37.cloudfront.net/572f01c6-0891-4bf0-b8fb-fbb2c68331b2.jpeg",
    		restaurant_name: "Manjal South Indian Kitchen"
    	},
    	{
    		name: "Plain Dosa",
    		description: "Vegan. Dosa, a popular South Indian breakfast choice, is a crisp savory crepe made from a batter of black lentils and rice. Served with sambhar and chutneys.",
    		price: 8.99,
    		image: "https://d1ralsognjng37.cloudfront.net/8be71599-14db-47db-b9ce-fbeaebda83a0.jpeg",
    		restaurant_name: "Manjal South Indian Kitchen"
    	},
    	{
    		name: "Vegetable Biryani",
    		description: "Vegetarian. Biriyani is a renowned Indian dish made from aromatic basmati rice and exotic spices and layered with vegetables. Served with a side of gravy and raita.",
    		price: 13.99,
    		image: "https://d1ralsognjng37.cloudfront.net/49a96fd3-68b8-4f5c-9939-b8b52d08f499.jpeg",
    		restaurant_name: "Manjal South Indian Kitchen"
    	},
    	{
    		name: "Chicken Biryani",
    		description: "Biriyani is a renowned Indian dish made from aromatic basmati rice and exotic spices and layered with chicken. Served with a side of gravy and raita.",
    		price: 15.99,
    		image: "https://d1ralsognjng37.cloudfront.net/91a1adc9-fbfe-456a-9759-89a9e1082536.jpeg ",
    		restaurant_name: "Manjal South Indian Kitchen"
    	},
    	{
    		name: "Special Chicken 65 Biryani",
    		description: "Spice level one. Biriyani is a renowned Indian dish made from aromatic basmati rice and exotic spices and layered with tossed chicken 65. Served with a side of gravy and raita.",
    		price: 15.99,
    		image: "https://d1ralsognjng37.cloudfront.net/b1b87cea-46b6-4be7-b575-7406a6d0e771.jpeg",
    		restaurant_name: "Manjal South Indian Kitchen"
    	},
    	{
    		name: "Lamb Biryani",
    		description: "Biriyani is a renowned Indian dish made from aromatic basmati rice and exotic spices and layered with curried lamb. Served with a side of gravy and raita",
    		price: 16.99,
    		image: "https://d1ralsognjng37.cloudfront.net/5e860484-8386-4d14-aca0-d63cc53ffd0f.jpeg",
    		restaurant_name: "Manjal South Indian Kitchen"
    	},
    	{
    		name: "Chicken Pepper Masala",
    		description: "Spice level three Chicken cooked in a delicious and spicy pepper masala",
    		price: 14.99,
    		image: "https://d1ralsognjng37.cloudfront.net/06a4bb72-7d59-4dba-8329-8c979c26beae.jpeg",
    		restaurant_name: "Manjal South Indian Kitchen"
    	},
    	{
    		name: "Coconut Pudding",
    		description: "Light, cool and refreshing agar-based coconut milk pudding",
    		price: 5.99,
    		image: "https://d1ralsognjng37.cloudfront.net/e1cf5a21-e14b-4e8a-a371-a08ee74ae9e7.jpeg",
    		restaurant_name: "Manjal South Indian Kitchen"
    	},
    	{
    		name: "Kung Pao Chicken with Peanuts",
    		description: "Kung Pao chicken, also transcribed as Gong Bao or Kung Po, is a spicy, stir-fried Chinese dish made with cubes of chicken, peanuts, vegetables, and chili peppers.",
    		price: 10.95,
    		image: "https://d1ralsognjng37.cloudfront.net/84b276f7-3d57-4e46-936e-87a079c73db7.jpeg",
    		restaurant_name: "Bubble World"
    	},
    	{
    		name: "Hawaiian Fried Rice with Meat Floss",
    		description: "Fried rice is a dish of cooked rice that has been stir-fried in a wok or a frying pan and is usually mixed with other ingredients such as eggs, vegetables and choice of your meat",
    		price: 11.95,
    		image: "https://d1ralsognjng37.cloudfront.net/76d72a54-e637-46b1-a648-490b01fe8a63.jpeg",
    		restaurant_name: "Bubble World"
    	},
    	{
    		name: "Spicy Fish Hot Pot",
    		description: "Comes with assorted fish, shrimp balls, tofu, enoki mushroom, and mixed vegetables. Served with a bowl of rice",
    		price: 14.75,
    		image: "https://d1ralsognjng37.cloudfront.net/65f8afdb-c0ec-44f3-a275-3399867ecffc.jpeg",
    		restaurant_name: "Bubble World"
    	},
    	{
    		name: "Milky Chocolate Tea",
    		description: "A decadent combination of rich, chocolatey, and nutty all in one",
    		price: 4.25,
    		image: "https://d1ralsognjng37.cloudfront.net/fcdeb689-2e99-4cf0-ae8d-0581015e20fb.jpeg",
    		restaurant_name: "Bubble World"
    	},
    	{
    		name: "Milky Oreo Slush",
    		description: "A super easy milkshake made with vanilla ice cream, milk, and Oreo cookies!",
    		price: 5,
    		image: "https://d1ralsognjng37.cloudfront.net/bc4b69e6-d0c7-476c-9a49-8941a2d438e8.jpeg",
    		restaurant_name: "Bubble World"
    	},
    	{
    		name: "Honey Green Tea",
    		description: "Rich and refreshing green tea with an added touch of honey",
    		price: 5.5,
    		image: "https://d1ralsognjng37.cloudfront.net/2351bec7-fbee-4f24-adc1-08c8fc68d490.jpeg",
    		restaurant_name: "Bubble World"
    	},
    	{
    		name: "Salmon Oshi Sushi",
    		description: "wild sockeye salmon, Miku sauce, jalapeño, 6 pieces",
    		price: 15,
    		image: "",
    		restaurant_name: "Miku Vancouver"
    	},
    	{
    		name: "Ebi Oshi Sushi",
    		description: "pressed prawn, ume Miku sauce, lime zest, 6 pieces",
    		price: 15,
    		image: "",
    		restaurant_name: "Miku Vancouver"
    	},
    	{
    		name: "Saba Oshi Sushi",
    		description: "house cured mackerel, miso sauce, 6 pieces",
    		price: 14,
    		image: "",
    		restaurant_name: "Miku Vancouver"
    	},
    	{
    		name: "Aburi Sushi Bento",
    		description: "Aburi Salmon Oshi, Aburi Ebi Oshi, Aburi Saba Oshi, Maguro Nigiri, Tai Nigiri, Hamachi Nigiri, Ebi Fritters, Chef's Seasonal Salad",
    		price: 24,
    		image: "",
    		restaurant_name: "Miku Vancouver"
    	},
    	{
    		name: "Chef's Sushi Select",
    		description: "Aburi Salmon Oshi, Aburi Ebi Oshi, Aburi Saba Oshi, Bincho Nigiri, Maguro Nigiri, 5 pieces",
    		price: 13,
    		image: "",
    		restaurant_name: "Miku Vancouver"
    	},
    	{
    		name: "Chef's Deluxe Sushi Select",
    		description: "Aburi Salmon Oshi, Aburi Ebi Oshi, Spicy Tuna Roll, Bincho Nigiri, Maguro Nigiri, Hamachi Nigiri, 8 pieces",
    		price: 18,
    		image: "",
    		restaurant_name: "Miku Vancouver"
    	},
    	{
    		name: "THE CLASSIC",
    		description: "Assorted Vietnamese cold cuts (steamed pork loaf, head cheese, pork shoulder) & house made pâté",
    		price: 12,
    		image: "",
    		restaurant_name: "Banh Mi Bar"
    	},
    	{
    		name: "LEMONGRASS CHICKEN ",
    		description: "House marinated chicken thighs + sweet-chili aioli",
    		price: 12,
    		image: "",
    		restaurant_name: "Banh Mi Bar"
    	},
    	{
    		name: "BBQ PORK ",
    		description: "Sweet barbequed pork + kimchi + house aioli",
    		price: 12,
    		image: "",
    		restaurant_name: "Banh Mi Bar"
    	},
    	{
    		name: "HONEY GARLIC BEEF ",
    		description: "Sliced top sirloin beef + garlic aioli",
    		price: 12,
    		image: "",
    		restaurant_name: "Banh Mi Bar"
    	},
    	{
    		name: "GRILLED LEMONGRASS TOFU ",
    		description: "House marinated grilled tofu + sweet-chili aioli",
    		price: 12,
    		image: "",
    		restaurant_name: "Banh Mi Bar"
    	},
    	{
    		name: "Granola Pannekoek",
    		description: "Vegetarian friendly. Cooked with granola and raisins or craisins inside and served with honey and hot cinnamony apples.",
    		price: 18.97,
    		image: "",
    		restaurant_name: "De Dutch Pannekoek House"
    	},
    	{
    		name: "Abby Perogie Pannekoek",
    		description: "DeBakon, hash browns, and onions inside topped with cheddar and cheese.",
    		price: 20.62,
    		image: "",
    		restaurant_name: "De Dutch Pannekoek House"
    	},
    	{
    		name: "Meat Lovers Pannekoek",
    		description: "DeBakon, ham, sausage, and turkey bacon inside with Dutch cheese and tomato garnish.",
    		price: 20.62,
    		image: "",
    		restaurant_name: "De Dutch Pannekoek House"
    	},
    	{
    		name: "The Windmill Pannekoek",
    		description: "Shaved smoked wild B.C. salmon, hollandaise sauce, and Dutch cheese, all on top.",
    		price: 24.75,
    		image: "",
    		restaurant_name: "De Dutch Pannekoek House"
    	},
    	{
    		name: "Chocolate, Strawberry, and Whip Pannekoek",
    		description: "Vegetarian friendly. Your choice of chocolate hail or Nutella.",
    		price: 18.97,
    		image: "",
    		restaurant_name: "De Dutch Pannekoek House"
    	},
    	{
    		name: "6 Personal Hawaiian",
    		description: "Ham, pineapple and extra pizza mozzarella",
    		price: 5.49,
    		image: "",
    		restaurant_name: "Pizza Hut"
    	},
    	{
    		name: "6 Personal Veggie Lover's",
    		description: "Sliced mushrooms, green pepper, red onion, tomato and pizza mozzarella",
    		price: 5.69,
    		image: "",
    		restaurant_name: "Pizza Hut"
    	},
    	{
    		name: "9 Small Pepperoni Lovers",
    		description: "Double pepperoni and extra pizza mozzarella.",
    		price: 13.99,
    		image: "",
    		restaurant_name: "Pizza Hut"
    	},
    	{
    		name: "9 Small Cheese Lover's",
    		description: "Extra pizza mozzarella and choose two of your favourite toppings Includes up to 2 free toppings.",
    		price: 14.29,
    		image: "",
    		restaurant_name: "Pizza Hut"
    	},
    	{
    		name: "12 Medium Chicken Caesar",
    		description: "Alfredo sauce, seasoned grilled chicken breast, bacon crumble, roasted garlic, parmesan and pizza mozzarella",
    		price: 19.49,
    		image: "",
    		restaurant_name: "Pizza Hut"
    	},
    	{
    		name: "12 Medium Margherita",
    		description: "Pesto marinated tomatoes, parmesan and pizza mozzarella",
    		price: 18.49,
    		image: "",
    		restaurant_name: "Pizza Hut"
    	},
    	{
    		name: "14 Large Canadian",
    		description: "Pepperoni, bacon crumble, sliced mushrooms and pizza mozzarella",
    		price: 22.99,
    		image: "",
    		restaurant_name: "Pizza Hut"
    	},
    	{
    		name: "14 Large Veggie Lover's",
    		description: "Sliced mushrooms, green pepper, red onion, tomato and pizza mozzarella",
    		price: 23.09,
    		image: "",
    		restaurant_name: "Pizza Hut"
    	},
    	{
    		name: "XL Panormous Chicken Lovers",
    		description: "Seasoned grilled chicken breast, green peppers, red onion, sliced mushroom and pizza mozzarella ",
    		price: 25.99,
    		image: "",
    		restaurant_name: "Pizza Hut"
    	},
    	{
    		name: "XL Panormous Veggie Mediterranean",
    		description: "Roasted red peppers, baby spinach, red onion, tomato, black olives, feta and pizza mozzarella",
    		price: 25.99,
    		image: "",
    		restaurant_name: "Pizza Hut"
    	},
    	{
    		name: "Small Donair",
    		description: "Experience Donair & Sub House's delicious donair meat or falafel in a pita bread! All donairs are served with your choice of beef, lamb, chicken, falafel, or mixed.",
    		price: 6.99,
    		image: "",
    		restaurant_name: "Donair & Sub House"
    	},
    	{
    		name: "Medium Donair",
    		description: "Experience Donair & Sub House's delicious donair meat or falafel in a pita bread! All donairs are served with your choice of beef, lamb, chicken, falafel, or mixed.",
    		price: 7.99,
    		image: "",
    		restaurant_name: "Donair & Sub House"
    	},
    	{
    		name: "Large Donair",
    		description: "Experience Donair & Sub House's delicious donair meat or falafel in a pita bread! All donairs are served with your choice of beef, lamb, chicken, falafel, or mixed.",
    		price: 8.99,
    		image: "",
    		restaurant_name: "Donair & Sub House"
    	},
    	{
    		name: "Fries Special",
    		description: "Experience Donair & Sub House's delicious donair meat or falafel on a fries with one or mixed sauces!",
    		price: 9.99,
    		image: "",
    		restaurant_name: "Donair & Sub House"
    	},
    	{
    		name: "Poutine Special",
    		description: "Experience Donair & Sub House's delicious donair meat or falafel on poutine!",
    		price: 11.99,
    		image: "",
    		restaurant_name: "Donair & Sub House"
    	},
    	{
    		name: "6 Turkey Breast Sub",
    		description: "Succulent sliced turkey breast with 4 grams of fat. No need to hold back. You can gobble it up guilt free!",
    		price: 5.99,
    		image: "",
    		restaurant_name: "Subway"
    	},
    	{
    		name: "12 Turkey Breast Sub",
    		description: "Succulent sliced turkey breast with 4 grams of fat. No need to hold back. You can gobble it up guilt free!",
    		price: 8.99,
    		image: "",
    		restaurant_name: "Subway"
    	},
    	{
    		name: "6 Italian BMT Sub",
    		description: "Thin slices of Genoa salami, pepperoni, and ham, together with processed cheddar cheese. Mmmmmm, it’ll just melt in your mouth.",
    		price: 5.99,
    		image: "",
    		restaurant_name: "Subway"
    	},
    	{
    		name: "12 Italian BMT Sub",
    		description: "Thin slices of Genoa salami, pepperoni, and ham, together with processed cheddar cheese. Mmmmmm, it’ll just melt in your mouth.",
    		price: 8.99,
    		image: "",
    		restaurant_name: "Subway"
    	},
    	{
    		name: "6 Veggie Delite Sub",
    		description: "A banquet to celebrate your healthy lifestyle, stuffed full of delicious cool, crisp vegetables. Contains 2.5 grams of fat.",
    		price: 4.49,
    		image: "",
    		restaurant_name: "Subway"
    	},
    	{
    		name: "12 Veggie Delite Sub",
    		description: "A banquet to celebrate your healthy lifestyle, stuffed full of delicious cool, crisp vegetables. Contains 2.5 grams of fat",
    		price: 6.49,
    		image: "",
    		restaurant_name: "Subway"
    	},
    	{
    		name: "6 Subway Club Sub",
    		description: "The perfect combination of thinly sliced turkey breast, tender roast beef, and succulent ham! Satisfies every taste. Contains 4.5 grams of fat.",
    		price: 6.59,
    		image: "",
    		restaurant_name: "Subway"
    	},
    	{
    		name: "12 Subway Club Sub",
    		description: "The perfect combination of thinly sliced turkey breast, tender roast beef, and succulent ham! Satisfies every taste. Contains 4.5 grams of fat.",
    		price: 9.99,
    		image: "",
    		restaurant_name: "Subway"
    	}
    ];

    var customerData = [
    	{
    		name: "Courtnay",
    		address: "4194 Dominion St,Burnaby,BC,V5G 1C6",
    		lat: "49.256128",
    		long: "-123.012232",
    		phone_no: "817-681-0289",
    		email: "chawkeswood0@vkontakte.ru"
    	},
    	{
    		name: "Carlen",
    		address: "4360 Beresford St,Burnaby,BC,V5H 0G2",
    		lat: "49.226981",
    		long: "-123.007774",
    		phone_no: "778-727-2099",
    		email: "cdomenichelli1@economist.com"
    	},
    	{
    		name: "Kylen",
    		address: "2133 Douglas Rd,Burnaby,BC,V5C 0E9, 49.264296,-122.991842",
    		phone_no: "604-505-4586",
    		email: "kbentson2@mysql.com"
    	},
    	{
    		name: "Herbie",
    		address: "6688 Arcola St,Burnaby,BC,V5E 0B4",
    		lat: " 49.219039",
    		long: "-122.965729",
    		phone_no: "369-253-5221",
    		email: "hgough3@bbb.org"
    	},
    	{
    		name: "Issy",
    		address: "8066 18th Avenue,Burnaby,BC,V3N 1J8",
    		lat: "49.227500",
    		long: "-122.930111",
    		phone_no: "373-711-2168",
    		email: "ihegarty4@psu.edu"
    	},
    	{
    		name: "Michaelina",
    		address: "7007 Marlborough Avenue,Burnaby,BC,V5J 4G6",
    		lat: "49.219436",
    		long: "-122.991558",
    		phone_no: "921-117-8066",
    		email: "mmutlow5@cdc.gov"
    	},
    	{
    		name: "Kerry",
    		address: "7111 18th Avenue, Burnaby,BC,V3N 1H2,, -122.955665",
    		lat: " 49.214635",
    		long: "-122.991558",
    		phone_no: "746-507-2664",
    		email: "kmarval6@phoca.cz"
    	},
    	{
    		name: "Jeannie",
    		address: "7656 17th Ave, Burnaby,BC,V3N 1L7",
    		lat: "49.221472",
    		long: "-122.939420",
    		phone_no: "729-320-3289",
    		email: "jorneblow7@hibu.com"
    	},
    	{
    		name: "Tobe",
    		address: "9835 King George Blvd, Surrey,BC,T1J 4E1",
    		lat: "49.181111",
    		long: "-122.846641",
    		phone_no: "544-822-6534",
    		email: "thume8@paginegialle.it"
    	},
    	{
    		name: "Cecilio",
    		address: "12905 111 Ave,Surrey,BC,V3T 2R5",
    		lat: "49.204931",
    		long: "-122.864619",
    		phone_no: "321-437-1039",
    		email: "cstow9@google.pl"
    	}
    ];

    var DummyDataService = /** @class */ (function () {
        function DummyDataService(_UtilsService) {
            var _a;
            this._UtilsService = _UtilsService;
            this.JSONS = (_a = {},
                _a[exports.ENUM_TABLES.restaurant] = restaurantData,
                _a[exports.ENUM_TABLES.customer] = customerData,
                _a[exports.ENUM_TABLES.meal] = mealData,
                _a[exports.ENUM_TABLES.courier] = courierData,
                _a);
        }
        DummyDataService.prototype.convertDummyDataToModel = function (table, modelClass) {
            var _this = this;
            if (!this.JSONS[table]) {
                return Promise.resolve([]);
            }
            return rxjs.of()
                .toPromise()
                .then(function () {
                var data = _this.JSONS[table];
                var array = [];
                ___default__default.map(data, function (x) {
                    var model = new modelClass(x);
                    array.push(model);
                });
                return array;
            });
        };
        DummyDataService.ctorParameters = function () { return [
            { type: UtilsService }
        ]; };
        DummyDataService.ɵprov = core.ɵɵdefineInjectable({ factory: function DummyDataService_Factory() { return new DummyDataService(core.ɵɵinject(UtilsService)); }, token: DummyDataService, providedIn: "root" });
        DummyDataService = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], DummyDataService);
        return DummyDataService;
    }());

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
        NotificationService.ɵprov = core.ɵɵdefineInjectable({ factory: function NotificationService_Factory() { return new NotificationService(); }, token: NotificationService, providedIn: "root" });
        NotificationService = __decorate([
            core.Injectable({
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
                _a[exports.ENUM_TABLES.delivery] = {
                    name: exports.ENUM_TABLES.delivery,
                    class: Delivery
                },
                _a[exports.ENUM_TABLES.order_item] = {
                    name: exports.ENUM_TABLES.order_item,
                    class: OrderItem
                },
                _a[exports.ENUM_TABLES.delivery_status_history] = {
                    name: exports.ENUM_TABLES.delivery_status_history,
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
                        return [4 /*yield*/, Promise.all(___default__default.map(this.TABLES, function (x) { return __awaiter(_this, void 0, void 0, function () {
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
                            return [4 /*yield*/, Promise.all(___default__default.map(this.TABLES, function (x) { return __awaiter(_this, void 0, void 0, function () {
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
                                        ___default__default.map(restaurants, function (restaurant) {
                                            // console.log(restaurant);
                                            restaurant.meal_ids = ___default__default.map(___default__default.filter(meals, function (meal) {
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
                            return [4 /*yield*/, Promise.all(___default__default.map(rs, function (x) { return __awaiter(_this, void 0, void 0, function () {
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
         * get delivery data
         * @returns {Promise<Delivery[]>}
         */
        FirebaseDataService.prototype.getDelivery = function () {
            var _this = this;
            return this.getDB(this.TABLES[exports.ENUM_TABLES.delivery])
                .then(function (rs) { return rs; })
                .then(function (rs) {
                return _this.getDeliveryStatusHistory()
                    .then(function (histories) {
                    console.log(histories);
                    ___default__default.map(rs, function (delivery) {
                        delivery.setStatusHistory(___default__default.filter(histories, function (x) { return x.delivery_id === delivery.id; }));
                    });
                    return rs;
                });
            });
        };
        FirebaseDataService.prototype.getDeliveryStatusHistory = function () {
            return this.getDB(this.TABLES[exports.ENUM_TABLES.delivery_status_history])
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
                    ___default__default.map(restaurants, function (restaurant) {
                        restaurant.meals = ___default__default.filter(meals, function (meal) {
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
                            ___default__default.map(orderItems, function (orderItem) { return __awaiter(_this, void 0, void 0, function () {
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
                            ___default__default.map(orders, function (order) { return __awaiter(_this, void 0, void 0, function () {
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
                    ___default__default.map(queryParams, function (x) {
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
            }); }), operators.map(function (items) { return ___default__default.filter(items, function (doc) {
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
            ___default__default.map(data, function (x) {
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
            return ___default__default.find(this.TABLES, function (table) {
                return table.class.name === className;
            }).name;
        };
        /*========delete=========*/
        FirebaseDataService.prototype.deleteOrder = function () {
            return this.deleteTable(this.TABLES[exports.ENUM_TABLES.order].name);
        };
        FirebaseDataService.prototype.deleteOrderItem = function () {
            return this.deleteTable(this.TABLES[exports.ENUM_TABLES.order_item].name);
        };
        FirebaseDataService.prototype.deleteDelivery = function () {
            return this.deleteTable(this.TABLES[exports.ENUM_TABLES.delivery].name);
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
            { type: firestore.AngularFirestore },
            { type: DummyDataService },
            { type: NotificationService }
        ]; };
        FirebaseDataService.ɵprov = core.ɵɵdefineInjectable({ factory: function FirebaseDataService_Factory() { return new FirebaseDataService(core.ɵɵinject(firestore.AngularFirestore), core.ɵɵinject(DummyDataService), core.ɵɵinject(NotificationService)); }, token: FirebaseDataService, providedIn: "root" });
        FirebaseDataService = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], FirebaseDataService);
        return FirebaseDataService;
    }());

    var SimulatorDataService = /** @class */ (function () {
        function SimulatorDataService(_FirebaseDataService, _NotificationService) {
            this._FirebaseDataService = _FirebaseDataService;
            this._NotificationService = _NotificationService;
        }
        /**
         * start simulator
         * @returns {Promise<void>}
         */
        SimulatorDataService.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        SimulatorDataService.prototype.stop = function () {
        };
        /**
         * randomly generate n number of orders
         * @param n
         * @returns {Promise<void>}
         */
        SimulatorDataService.prototype.generateOrder = function (n) {
            if (n === void 0) { n = 1; }
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this._NotificationService.pushMessage("generate " + n + " order");
                    return [2 /*return*/, Promise.all([
                            this._FirebaseDataService.getCustomer(),
                            this._FirebaseDataService.getRestaurant(),
                            this._FirebaseDataService.getCourier(),
                        ])
                            .then(function (_a) {
                            var _b = __read(_a, 3), customers = _b[0], restaurants = _b[1], couriers = _b[2];
                            return __awaiter(_this, void 0, void 0, function () {
                                var i;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            i = 0;
                                            _c.label = 1;
                                        case 1:
                                            if (!(i < n)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this.generateOneOrder(customers, restaurants, couriers)];
                                        case 2:
                                            _c.sent();
                                            _c.label = 3;
                                        case 3:
                                            i++;
                                            return [3 /*break*/, 1];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            });
                        })];
                });
            });
        };
        /**
         * generate 1 order, 1 order item, 1 delivery, 1 delivery status history
         * @param customers
         * @param restaurants
         * @param couriers
         * @returns {Promise<void>}
         */
        SimulatorDataService.prototype.generateOneOrder = function (customers, restaurants, couriers) {
            return __awaiter(this, void 0, void 0, function () {
                var customer, restaurant, meal, courier, order, orderItem, delivery, deliveryStatusHistory;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            customer = this.getRandom(customers);
                            restaurant = this.getRandom(restaurants);
                            meal = this.getRandom(restaurant.meals);
                            courier = this.getRandom(couriers);
                            order = new Order({
                                date_time: new Date().getTime(),
                                restaurant_id: restaurant.id,
                                customer_id: customer.id
                            });
                            return [4 /*yield*/, this._FirebaseDataService.createWithObject(order)];
                        case 1:
                            _a.sent();
                            orderItem = new OrderItem({
                                meal_id: meal.id,
                                quantity: this.getRandom(5),
                                order_id: order.id
                            });
                            orderItem.meal = meal;
                            orderItem.order = order;
                            return [4 /*yield*/, this._FirebaseDataService.createWithObject(orderItem)];
                        case 2:
                            _a.sent();
                            order.total += orderItem.meal.price * orderItem.quantity;
                            this._FirebaseDataService.updateWithObject(order);
                            delivery = new Delivery({
                                points: [],
                                courier_id: courier.id,
                                order_id: order.id
                            });
                            return [4 /*yield*/, this._FirebaseDataService.createWithObject(delivery)];
                        case 3:
                            _a.sent();
                            deliveryStatusHistory = new DeliveryStatusHistory({
                                status: exports.Delivery_Status.ORDERED,
                                delivery_id: delivery.id,
                                date_time: moment().valueOf()
                            });
                            return [4 /*yield*/, this._FirebaseDataService.createWithObject(deliveryStatusHistory)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * get random
         * @param value
         * @returns {any | null | number}
         */
        SimulatorDataService.prototype.getRandom = function (value) {
            if (!isNaN(Number(value))) {
                return ___default__default.random(0, value) + 1;
            }
            else {
                value = value;
                return value[___default__default.random(0, value.length - 1)];
            }
            return null;
        };
        SimulatorDataService.ctorParameters = function () { return [
            { type: FirebaseDataService },
            { type: NotificationService }
        ]; };
        SimulatorDataService.ɵprov = core.ɵɵdefineInjectable({ factory: function SimulatorDataService_Factory() { return new SimulatorDataService(core.ɵɵinject(FirebaseDataService), core.ɵɵinject(NotificationService)); }, token: SimulatorDataService, providedIn: "root" });
        SimulatorDataService = __decorate([
            core.Injectable({
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
        LibraryAppService.ɵprov = core.ɵɵdefineInjectable({ factory: function LibraryAppService_Factory() { return new LibraryAppService(); }, token: LibraryAppService, providedIn: "root" });
        LibraryAppService = __decorate([
            core.Injectable({
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
            core.Component({
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
            core.NgModule({
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
        TestAppService.ɵprov = core.ɵɵdefineInjectable({ factory: function TestAppService_Factory() { return new TestAppService(); }, token: TestAppService, providedIn: "root" });
        TestAppService = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], TestAppService);
        return TestAppService;
    }());

    exports.Courier = Courier;
    exports.Customer = Customer;
    exports.DefaultComponent = DefaultComponent;
    exports.DefaultModel = DefaultModel;
    exports.Delivery = Delivery;
    exports.DeliveryStatusHistory = DeliveryStatusHistory;
    exports.DummyDataService = DummyDataService;
    exports.FirebaseDataService = FirebaseDataService;
    exports.LibraryAppComponent = LibraryAppComponent;
    exports.LibraryAppModule = LibraryAppModule;
    exports.LibraryAppService = LibraryAppService;
    exports.Meal = Meal;
    exports.NotificationService = NotificationService;
    exports.Order = Order;
    exports.OrderItem = OrderItem;
    exports.Point = Point;
    exports.QueryParamModel = QueryParamModel;
    exports.Restaurant = Restaurant;
    exports.SimulatorDataService = SimulatorDataService;
    exports.TestAppService = TestAppService;
    exports.UtilsService = UtilsService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=library-app.umd.js.map
