import { Subscription, of, BehaviorSubject } from 'rxjs';
import { __extends, __decorate, __awaiter, __generator, __read } from 'tslib';
import ___default, { map, maxBy } from 'lodash';
import { ɵɵdefineInjectable, Injectable, ɵɵinject, Component, NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map as map$1, tap, first } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import moment from 'moment';
import { NguiMapModule } from '@ngui/map';

var ENUM_TABLES;
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
        _this.lat = 49.206762;
        _this.lng = -122.918458;
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
        _this.lat = 0;
        _this.lng = 0;
        _this.phone_no = '';
        _this.email = '';
        _this.password = '';
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
        _this.timeToNextStatus = 0;
        _this.path_to_restaurant = [];
        _this.path_to_customer = [];
        _super.prototype.copyInto.call(_this, data);
        if (_this.path_to_customer.length) {
            _this.path_to_customer = map(_this.path_to_customer, function (x) { return JSON.parse(x); });
        }
        if (_this.path_to_restaurant.length) {
            _this.path_to_restaurant = map(_this.path_to_restaurant, function (x) { return JSON.parse(x); });
        }
        return _this;
    }
    Delivery.prototype.getData = function () {
        var _this = this;
        var self = this;
        var result = {};
        Object.keys(this).map(function (key) {
            if (_this[key] instanceof DefaultModel) {
                return;
            }
            switch (key) {
                case '_raw':
                case 'order':
                case 'restaurant':
                case 'customer':
                case 'courier':
                case 'points':
                case 'subscription':
                    return;
                case 'path_to_restaurant':
                case 'path_to_customer': {
                    result[key] = map(self[key], function (x) {
                        return JSON.stringify(x);
                    });
                    // console.log(result[key]);
                    return;
                }
            }
            result[key] = self[key];
        });
        return result;
    };
    Delivery.prototype.setStatusHistory = function (histories) {
        this.status_history = histories;
        this.currentStatus = maxBy(histories, function (x) { return x.date_time; });
    };
    return Delivery;
}(DefaultModel));

var Delivery_Status;
(function (Delivery_Status) {
    Delivery_Status["ORDERED"] = "ORDERED";
    Delivery_Status["PREPARING"] = "PREPARING";
    Delivery_Status["WAIT_FOR_PICK_UP"] = "WAIT_FOR_PICK_UP";
    Delivery_Status["DELIVERING"] = "DELIVERING";
    Delivery_Status["DELIVERED"] = "DELIVERED";
})(Delivery_Status || (Delivery_Status = {}));
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
        _this.img1 = '';
        _this.img2 = '';
        _this.del_time = '';
        _this.del_fee = '';
        _this.rating = 0;
        _this.lat = 0;
        _this.lng = 0;
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

var restaurantData = [
	{
		name: "McDonald's",
		address: "515 6th StNew Westminster, BC V3L 3B9",
		img1: "https://restaurants-static.skipthedishes.com/images/resized/small-052deb1f3ae55ac65bec.jpg",
		img2: "https://restaurants-static.skipthedishes.com/images/resized/mobile-a415e23b3a4a919bb34e.png",
		lat: 49.212271,
		lng: -122.918816,
		phone_no: "(604)-718-1172",
		del_time: "44-55 mins",
		del_fee: "$2.49 Delivery",
		rating: 9.2
	},
	{
		name: "Indian Bombay Bistro",
		address: " 7558 6th St, Burnaby, BC V3N 3M3",
		img1: "https://static.skipthedishes.com/indian-bombay-bistro-menu-image-small-1470363342212.jpg",
		img2: "https://static.skipthedishes.com/indian-bombay-bistro-list-image-mobile-1490966940146.png",
		lat: 49.223155,
		lng: -122.932605,
		phone_no: "(604)-553-1719",
		del_time: "35-55 mins",
		del_fee: "$3.49 Delivery",
		rating: 9.4
	},
	{
		name: "Manjal South Indian Kitchen",
		address: "7613 Edmonds St, Burnaby, BC V3N 1B6",
		img1: "https://static.skipthedishes.com/baba-sweets-and-restaurant-menu-image-small-1529343317142.jpg",
		img2: "https://restaurants-static.skipthedishes.com/images/resized/mobile-646b00287c87d93df6e6.png",
		lat: 49.223281,
		lng: -122.943316,
		phone_no: "(604)-515-4230",
		del_time: "40-60 mins",
		del_fee: "$3.49 Delivery",
		rating: 9.1
	},
	{
		name: "Bubble World",
		address: "601 Agnes St, New Westminster, BC V3M 1G9",
		img1: "https://restaurants-static.skipthedishes.com/images/resized/small-f1381e01aa6dc424e2b4.jpg",
		img2: "https://restaurants-static.skipthedishes.com/images/resized/mobile-c86295f6aeb01e431414.png",
		lat: 49.204826,
		lng: -122.910192,
		phone_no: "(778)-397-7800",
		del_time: "15-30 mins",
		del_fee: "$4.29 Delivery",
		rating: 8.5
	},
	{
		name: "Miku Vancouver",
		address: " 200 Granville St # 70, Vancouver, BC V6C 1S4",
		img1: "https://restaurants-static.skipthedishes.com/images/resized/small-fbe36404df951ecccbc1.jpg",
		img2: "https://static.skipthedishes.com/hon-sushi-list-image-mobile-1491230537653.jpg",
		lat: 49.286826,
		lng: -123.112584,
		phone_no: "(604)-568-3900",
		del_time: "35-55 mins",
		del_fee: "$4.29 Delivery",
		rating: 9.4
	},
	{
		name: "Banh Mi Bar",
		address: "722 Carnarvon St, New Westminster, BC V3M 6V4",
		img1: "https://restaurants-static.skipthedishes.com/images/resized/small-fc24c6064188563c7bae.png",
		img2: "https://restaurants-static.skipthedishes.com/images/resized/mobile-ff0221a21117f2c6780f.jpg",
		lat: 49.202816,
		lng: -122.911051,
		phone_no: "(604)-553-9966",
		del_time: "27-47 mins",
		del_fee: "$4.49 Delivery / Free Over $20",
		rating: 8.7
	},
	{
		name: "De Dutch Pannekoek House",
		address: "1035 Columbia St #102, New Westminster, BC V3M 1C4",
		img1: "https://restaurants-static.skipthedishes.com/images/resized/small-12a63687e66ed6108c27.jpg",
		img2: "https://restaurants-static.skipthedishes.com/images/resized/mobile-0e0339ecb35a072239ff.png",
		lat: 49.200451,
		lng: -122.917861,
		phone_no: "(604)-521-2288",
		del_time: "27-47 mins",
		del_fee: "$3.49 Delivery",
		rating: 9.3
	},
	{
		name: "Pizza Hut",
		address: "7515 Market Crossing #170, Burnaby, BC V5J 0A3",
		img1: "https://restaurants-static.skipthedishes.com/images/resized/small-7b55cf0da25ce6764b7d.jpg",
		img2: "https://restaurants-static.skipthedishes.com/images/resized/mobile-0c87f8fdef4fefe787d6.png",
		lat: 49.19805,
		lng: -122.978744,
		phone_no: "(604)-433-8424",
		del_time: "25-45 mins",
		del_fee: "$4.50 Delivery",
		rating: 8.9
	},
	{
		name: "Donair & Sub House",
		address: "7634 6th St, Burnaby, BC V3N 3M5",
		img1: "https://restaurants-static.skipthedishes.com/images/resized/small-7cf3d494d42a0ac8f772.png",
		img2: "https://restaurants-static.skipthedishes.com/images/resized/mobile-a32c6ec3f143ef49b40f.png",
		lat: 49.222195,
		lng: -122.931487,
		phone_no: "(604)-525-5108",
		del_time: "32-52 mins",
		del_fee: "$2.49 Delivery / Free Over $20",
		rating: 9.7
	},
	{
		name: "Subway",
		address: "7155 Kingsway Suite# 110, Burnaby, BC V5E 2V1",
		img1: "https://restaurants-static.skipthedishes.com/images/resized/small-1990bd85e70162a48a42.jpg",
		img2: "https://restaurants-static.skipthedishes.com/images/resized/mobile-e7550a65a1ee298b4958.png",
		lat: 49.218681,
		lng: -122.95677,
		phone_no: "(604)-759-0016",
		del_time: "19-39 mins",
		del_fee: "$2.49 Delivery",
		rating: 9.7
	}
];

var courierData = [
	{
		name: "Lizette Scourge",
		vin: "WVGAV7AX1CW622064",
		driver_license: 9470107268,
		email: "lscourge0@php.net",
		phone_no: "633-385-2282",
		lat: 49.211149,
		lng: -122.942574
	},
	{
		name: "Constantina Jude",
		vin: "WAUKF68E15A253661",
		driver_license: 2897719788,
		email: "cjude1@amazon.co.jp",
		phone_no: "100-897-4918",
		lat: 49.210589,
		lng: -122.931072
	},
	{
		name: "Elvis Kee",
		vin: "JH4CU4F41BC617894",
		driver_license: 4368855612,
		email: "ekee2@house.gov",
		phone_no: "314-262-4369",
		lat: 49.208872,
		lng: -122.919184
	},
	{
		name: "Bryce Barck",
		vin: "WBA3B1C59EF926774",
		driver_license: 933161220,
		email: "bbarck3@yellowpages.com",
		phone_no: "749-951-5984",
		lat: 49.243703,
		lng: -122.988951
	},
	{
		name: "Wyn Elleton",
		vin: "1GYS4GEF3DR541915",
		driver_license: 2959453573,
		email: "welleton4@ask.com",
		phone_no: "767-563-9023",
		lat: 49.222311,
		lng: -122.997079
	},
	{
		name: "Patrice Costello",
		vin: "KM8NU4CC9AU096286",
		driver_license: 3432604998,
		email: "pcostello5@un.org",
		phone_no: "722-500-6965",
		lat: 49.223544,
		lng: -122.992841
	},
	{
		name: "Tammy Lahiff",
		vin: "2C3CCAJG7DH396665",
		driver_license: 426260708,
		email: "tlahiff6@ibm.com",
		phone_no: "458-277-8003",
		lat: 49.230003,
		lng: -122.964729
	},
	{
		name: "Heddi Garci",
		vin: "3D7TP2HT6AG956637",
		driver_license: 432395245,
		email: "hgarci7@google.co.jp",
		phone_no: "826-314-5170",
		lat: 49.245021,
		lng: -122.973886
	},
	{
		name: "Maryann Matthew",
		vin: "5UXKR0C56F0833637",
		driver_license: 7489646901,
		email: "mmatthew8@soundcloud.com",
		phone_no: "209-327-5368",
		lat: 49.251335,
		lng: -123.004277
	},
	{
		name: "Inessa Ewells",
		vin: "1FTWW3B55AE261371",
		driver_license: 9318168349,
		email: "iewells9@dell.com",
		phone_no: "323-249-1314",
		lat: 49.226187,
		lng: -122.937293
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
		lat: 49.256128,
		lng: -123.012232,
		phone_no: "817-681-0289",
		email: "chawkeswood0@vkontakte.ru"
	},
	{
		name: "Carlen",
		address: "4360 Beresford St,Burnaby,BC,V5H 0G2",
		lat: 49.226981,
		lng: -123.007774,
		phone_no: "778-727-2099",
		email: "cdomenichelli1@economist.com"
	},
	{
		name: "Kylen",
		address: "2133 Douglas Rd,Burnaby,BC,V5C 0E9, 49.264296,-122.991842",
		lat: 49.21413,
		lng: -122.975091,
		phone_no: "604-505-4586",
		email: "kbentson2@mysql.com"
	},
	{
		name: "Herbie",
		address: "6688 Arcola St,Burnaby,BC,V5E 0B4",
		lat: 49.219039,
		lng: -122.965729,
		phone_no: "369-253-5221",
		email: "hgough3@bbb.org"
	},
	{
		name: "Issy",
		address: "8066 18th Avenue,Burnaby,BC,V3N 1J8",
		lat: 49.2275,
		lng: -122.930111,
		phone_no: "373-711-2168",
		email: "ihegarty4@psu.edu"
	},
	{
		name: "Michaelina",
		address: "7007 Marlborough Avenue,Burnaby,BC,V5J 4G6",
		lat: 49.219436,
		lng: -122.991558,
		phone_no: "921-117-8066",
		email: "mmutlow5@cdc.gov"
	},
	{
		name: "Kerry",
		address: "7111 18th Avenue, Burnaby,BC,V3N 1H2,, -122.955665",
		lat: 49.214635,
		lng: -122.991558,
		phone_no: "746-507-2664",
		email: "kmarval6@phoca.cz"
	},
	{
		name: "Jeannie",
		address: "7656 17th Ave, Burnaby,BC,V3N 1L7",
		lat: 49.221472,
		lng: -122.93942,
		phone_no: "729-320-3289",
		email: "jorneblow7@hibu.com"
	},
	{
		name: "Tobe",
		address: "9835 King George Blvd, Surrey,BC,T1J 4E1",
		lat: 49.181111,
		lng: -122.846641,
		phone_no: "544-822-6534",
		email: "thume8@paginegialle.it"
	},
	{
		name: "Cecilio",
		address: "12905 111 Ave,Surrey,BC,V3T 2R5",
		lat: 49.204931,
		lng: -122.864619,
		phone_no: "321-437-1039",
		email: "cstow9@google.pl"
	}
];

var DummyDataService = /** @class */ (function () {
    function DummyDataService() {
        var _a;
        this.JSONS = (_a = {},
            _a[ENUM_TABLES.restaurant] = restaurantData,
            _a[ENUM_TABLES.customer] = customerData,
            _a[ENUM_TABLES.meal] = mealData,
            _a[ENUM_TABLES.courier] = courierData,
            _a);
    }
    DummyDataService.prototype.convertDummyDataToModel = function (table, modelClass) {
        var _this = this;
        if (!this.JSONS[table]) {
            return Promise.resolve([]);
        }
        return of()
            .toPromise()
            .then(function () {
            var data = _this.JSONS[table];
            var array = [];
            ___default.map(data, function (x) {
                var model = new modelClass(x);
                array.push(model);
            });
            return array;
        });
    };
    DummyDataService.ɵprov = ɵɵdefineInjectable({ factory: function DummyDataService_Factory() { return new DummyDataService(); }, token: DummyDataService, providedIn: "root" });
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

var MapService = /** @class */ (function () {
    function MapService() {
        // setTimeout(() => {
        //   this.renderDirection(new google.maps.LatLng(49.205333, -122.920441), new google.maps.LatLng(49.206195, -122.911558))
        //     .then((rs) => {
        //       console.log(rs);
        //     });
        // },1000);
    }
    MapService.prototype.renderDirection = function (from, to) {
        return new Promise(function (resolve, reject) {
            var directionsService = new google.maps.DirectionsService;
            directionsService.route({
                origin: from,
                destination: to,
                travelMode: google.maps.TravelMode['DRIVING']
            }, function (response, status) {
                if (status === google.maps.DirectionsStatus['OK']) {
                    console.log(response);
                    resolve(response['routes'][0]['overview_path']);
                }
                else {
                    window.alert('Directions request failed due to ' + status);
                    reject('error');
                }
            });
        });
    };
    MapService.prototype.getLatLngFromAddress = function (address) {
        return new Promise(function (resolve, reject) {
            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status === 'OK') {
                    console.log(results);
                    resolve(results[0]['geometry']['location']);
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                    reject('error');
                }
            });
        });
    };
    MapService.ɵprov = ɵɵdefineInjectable({ factory: function MapService_Factory() { return new MapService(); }, token: MapService, providedIn: "root" });
    MapService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], MapService);
    return MapService;
}());

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
                    return [4 /*yield*/, Promise.all(___default.map(this.TABLES, function (x) { return __awaiter(_this, void 0, void 0, function () {
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
                        return [4 /*yield*/, Promise.all(___default.map(this.TABLES, function (x) { return __awaiter(_this, void 0, void 0, function () {
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
                                    ___default.map(restaurants, function (restaurant) {
                                        // console.log(restaurant);
                                        restaurant.meal_ids = ___default.map(___default.filter(meals, function (meal) {
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
                        return [4 /*yield*/, Promise.all(___default.map(rs, function (x) { return __awaiter(_this, void 0, void 0, function () {
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
            return ___default.find(rs, function (x) { return x.email === email; });
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
                ___default.map(rs, function (delivery) {
                    delivery.setStatusHistory(___default.filter(histories, function (x) { return x.delivery_id === delivery.id; }));
                });
                return rs;
            });
        })
            .then(function (rs) {
            return Promise.all(___default.map(rs, function (d) { return __awaiter(_this, void 0, void 0, function () {
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
                rs.setStatusHistory(___default.filter(histories, function (x) { return x.delivery_id === id; }));
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
                ___default.map(restaurants, function (restaurant) {
                    restaurant.meals = ___default.filter(meals, function (meal) {
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
                        ___default.map(orderItems, function (orderItem) { return __awaiter(_this, void 0, void 0, function () {
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
                        return Promise.all(___default.map(orders, function (order) { return __awaiter(_this, void 0, void 0, function () {
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
                ___default.map(queryParams, function (x) {
                    newRef = newRef ? newRef.where(x.key, x.operation, x.value) : ref.where(x.key, x.operation, x.value);
                });
            }
            return newRef || ref;
        });
        return collection
            .snapshotChanges()
            .pipe(map$1(function (items) { return items.map(function (a) {
            var data = a.payload.doc.data();
            var id = a.payload.doc.id;
            // update id
            data['id'] = id;
            return data;
        }); }), map$1(function (items) { return ___default.filter(items, function (doc) {
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
            .pipe(map$1(function (a) {
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
        ___default.map(data, function (x) {
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
        return ___default.find(this.TABLES, function (table) {
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
                        return [4 /*yield*/, Promise.all(___default.map(array, function (element) { return __awaiter(_this, void 0, void 0, function () {
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
            return ___default.random(0, value) + 1;
        }
        else {
            value = value;
            return value[___default.random(0, value.length - 1)];
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
                        return [4 /*yield*/, Promise.all(___default.map(orderItems, function (x) { return __awaiter(_this, void 0, void 0, function () {
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
    FirebaseDataService.ɵprov = ɵɵdefineInjectable({ factory: function FirebaseDataService_Factory() { return new FirebaseDataService(ɵɵinject(AngularFirestore), ɵɵinject(AngularFireDatabase), ɵɵinject(DummyDataService), ɵɵinject(NotificationService), ɵɵinject(MapService), ɵɵinject(AngularFireAuth)); }, token: FirebaseDataService, providedIn: "root" });
    FirebaseDataService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], FirebaseDataService);
    return FirebaseDataService;
}());

var SIMULATOR_MESSAGE;
(function (SIMULATOR_MESSAGE) {
    SIMULATOR_MESSAGE["START"] = "simulator start";
    SIMULATOR_MESSAGE["STEP"] = "simulator step";
    SIMULATOR_MESSAGE["STOP"] = "simulator stop";
})(SIMULATOR_MESSAGE || (SIMULATOR_MESSAGE = {}));
;
var SimulatorDataService = /** @class */ (function () {
    function SimulatorDataService(_FirebaseDataService, _NotificationService, _MapService) {
        this._FirebaseDataService = _FirebaseDataService;
        this._NotificationService = _NotificationService;
        this._MapService = _MapService;
    }
    /**
     * start simulator
     * @returns {Promise<void>}
     */
    SimulatorDataService.prototype.start = function (time) {
        if (time === void 0) { time = 2000; }
        return __awaiter(this, void 0, void 0, function () {
            var deliveryList, orderList, deliveredDeliveryList, interval;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._NotificationService.pushMessage(SIMULATOR_MESSAGE.START);
                        return [4 /*yield*/, this._FirebaseDataService.getDeliveries().then(function (rs) { return deliveryList = rs; })];
                    case 1:
                        _a.sent();
                        deliveryList = ___default.filter(deliveryList, function (x) {
                            return x.currentStatus.status !== Delivery_Status.DELIVERED;
                        });
                        if (deliveryList.length === 0) {
                            this._NotificationService.pushMessage(SIMULATOR_MESSAGE.STOP);
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, this._FirebaseDataService.getOrders().then(function (rs) { return orderList = rs; })];
                    case 2:
                        _a.sent();
                        ___default.map(deliveryList, function (x) {
                            x.order = ___default.find(orderList, function (o) { return o.id == x.order_id; });
                        });
                        deliveredDeliveryList = [];
                        interval = setInterval(function () {
                            if (deliveryList.length === deliveredDeliveryList.length) {
                                if (interval !== null) {
                                    clearInterval(interval);
                                }
                                _this._NotificationService.pushMessage(SIMULATOR_MESSAGE.STOP);
                            }
                            console.log('step');
                            ___default.map(deliveryList, function (x) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.handleDelivery(x)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            deliveredDeliveryList = ___default.filter(deliveryList, function (x) {
                                return x.currentStatus.status === Delivery_Status.DELIVERED;
                            });
                            _this._NotificationService.pushMessage(SIMULATOR_MESSAGE.STEP);
                        }, time);
                        return [2 /*return*/];
                }
            });
        });
    };
    SimulatorDataService.prototype.handleDelivery = function (delivery) {
        return __awaiter(this, void 0, void 0, function () {
            var nextStatus, statusHistory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (delivery.timeToNextStatus >= moment().valueOf()) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        delivery.timeToNextStatus = moment().valueOf() + ___default.random(5, 10) * 1000;
                        nextStatus = null;
                        switch (delivery.currentStatus.status) {
                            case Delivery_Status.ORDERED:
                                nextStatus = Delivery_Status.PREPARING;
                                break;
                            case Delivery_Status.PREPARING:
                                nextStatus = Delivery_Status.WAIT_FOR_PICK_UP;
                                break;
                            case Delivery_Status.WAIT_FOR_PICK_UP:
                                nextStatus = Delivery_Status.DELIVERING;
                                break;
                            case Delivery_Status.DELIVERING:
                                nextStatus = Delivery_Status.DELIVERED;
                                break;
                            default:
                                return [2 /*return*/, Promise.resolve()];
                        }
                        statusHistory = new DeliveryStatusHistory({
                            status: nextStatus,
                            delivery_id: delivery.id,
                            date_time: moment().valueOf()
                        });
                        return [4 /*yield*/, this._FirebaseDataService.createWithObject(statusHistory)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._FirebaseDataService
                                .getStatusHistoryOfDelivery([new QueryParamModel('delivery_id', QueryParamModel.OPERATIONS.EQUAL, delivery.id)])
                                .then(function (rs) {
                                delivery.setStatusHistory(rs);
                                console.log(delivery);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
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
                        return [4 /*yield*/, this._FirebaseDataService.updateWithObject(order)];
                    case 3:
                        _a.sent();
                        delivery = new Delivery({
                            points: [],
                            courier_id: courier.id,
                            order_id: order.id
                        });
                        // add paths
                        return [4 /*yield*/, this._MapService.renderDirection(new google.maps.LatLng(courier.lat, courier.lng), new google.maps.LatLng(restaurant.lat, restaurant.lng))
                                .then(function (rs) {
                                delivery.path_to_restaurant = rs;
                            })];
                    case 4:
                        // add paths
                        _a.sent();
                        return [4 /*yield*/, this._MapService.renderDirection(new google.maps.LatLng(restaurant.lat, restaurant.lng), new google.maps.LatLng(customer.lat, customer.lng))
                                .then(function (rs) {
                                delivery.path_to_customer = rs;
                            })];
                    case 5:
                        _a.sent();
                        console.log(delivery);
                        console.log(delivery.getData());
                        return [4 /*yield*/, this._FirebaseDataService.createWithObject(delivery)];
                    case 6:
                        _a.sent();
                        deliveryStatusHistory = new DeliveryStatusHistory({
                            status: Delivery_Status.ORDERED,
                            delivery_id: delivery.id,
                            date_time: moment().valueOf()
                        });
                        return [4 /*yield*/, this._FirebaseDataService.createWithObject(deliveryStatusHistory)];
                    case 7:
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
            return ___default.random(0, value) + 1;
        }
        else {
            value = value;
            return value[___default.random(0, value.length - 1)];
        }
        return null;
    };
    SimulatorDataService.MESSAGE = SIMULATOR_MESSAGE;
    SimulatorDataService.ctorParameters = function () { return [
        { type: FirebaseDataService },
        { type: NotificationService },
        { type: MapService }
    ]; };
    SimulatorDataService.ɵprov = ɵɵdefineInjectable({ factory: function SimulatorDataService_Factory() { return new SimulatorDataService(ɵɵinject(FirebaseDataService), ɵɵinject(NotificationService), ɵɵinject(MapService)); }, token: SimulatorDataService, providedIn: "root" });
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
            imports: [
                NguiMapModule.forRoot({
                    apiUrl: "https://maps.google.com/maps/api/js?libraries=drawing&key=AIzaSyDrnDCTwDNyiqxi-qkY1wMRCpbBMA8LFYc"
                })
            ],
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

export { Courier, Customer, DefaultComponent, DefaultModel, Delivery, DeliveryStatusHistory, Delivery_Status, DummyDataService, ENUM_TABLES, FirebaseDataService, LibraryAppComponent, LibraryAppModule, LibraryAppService, MapService, Meal, NotificationService, Order, OrderItem, Point, QueryParamModel, Restaurant, SimulatorDataService, TestAppService };
//# sourceMappingURL=library-app.js.map
