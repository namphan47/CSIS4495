import { __awaiter, __decorate, __generator, __read } from "tslib";
import { Injectable } from '@angular/core';
import _ from 'lodash';
import { FirebaseDataService } from "../firebase/firebase-data.service";
import { Order } from "../../constant/models/order/order";
import { OrderItem } from "../../constant/models/order_item/order-item";
import { NotificationService } from "../mics/notification.service";
import { Delivery, Delivery_Status, QueryParamModel } from "../../constant/models";
import { DeliveryStatusHistory } from "../../constant/models/delivery/delivery-status-history";
import moment from "moment";
import { MapService } from "../map/map.service";
import * as i0 from "@angular/core";
import * as i1 from "../firebase/firebase-data.service";
import * as i2 from "../mics/notification.service";
import * as i3 from "../map/map.service";
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
                        deliveryList = _.filter(deliveryList, function (x) {
                            return x.currentStatus.status !== Delivery_Status.DELIVERED;
                        });
                        if (deliveryList.length === 0) {
                            this._NotificationService.pushMessage(SIMULATOR_MESSAGE.STOP);
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, this._FirebaseDataService.getOrders().then(function (rs) { return orderList = rs; })];
                    case 2:
                        _a.sent();
                        _.map(deliveryList, function (x) {
                            x.order = _.find(orderList, function (o) { return o.id == x.order_id; });
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
                            _.map(deliveryList, function (x) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.handleDelivery(x)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            deliveredDeliveryList = _.filter(deliveryList, function (x) {
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
                        delivery.timeToNextStatus = moment().valueOf() + _.random(5, 10) * 1000;
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
            return _.random(0, value) + 1;
        }
        else {
            value = value;
            return value[_.random(0, value.length - 1)];
        }
        return null;
    };
    SimulatorDataService.MESSAGE = SIMULATOR_MESSAGE;
    SimulatorDataService.ctorParameters = function () { return [
        { type: FirebaseDataService },
        { type: NotificationService },
        { type: MapService }
    ]; };
    SimulatorDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SimulatorDataService_Factory() { return new SimulatorDataService(i0.ɵɵinject(i1.FirebaseDataService), i0.ɵɵinject(i2.NotificationService), i0.ɵɵinject(i3.MapService)); }, token: SimulatorDataService, providedIn: "root" });
    SimulatorDataService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], SimulatorDataService);
    return SimulatorDataService;
}());
export { SimulatorDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RhdGEvc2ltdWxhdG9yLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFJdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQVUsUUFBUSxFQUFFLGVBQWUsRUFBUyxlQUFlLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUM3RixPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7OztBQUU5QyxJQUFLLGlCQUlKO0FBSkQsV0FBSyxpQkFBaUI7SUFDcEIsOENBQXlCLENBQUE7SUFDekIsNENBQXVCLENBQUE7SUFDdkIsNENBQXVCLENBQUE7QUFDekIsQ0FBQyxFQUpJLGlCQUFpQixLQUFqQixpQkFBaUIsUUFJckI7QUFBQSxDQUFDO0FBS0Y7SUFHRSw4QkFBb0Isb0JBQXlDLEVBQ3pDLG9CQUF5QyxFQUN6QyxXQUF1QjtRQUZ2Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFFM0MsQ0FBQztJQUVEOzs7T0FHRztJ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VyxFQUFFLFFBQVEsQ0FBQyxFQUFFOzRCQUN4QixTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFO3lCQUM5QixDQUFDLENBQUM7d0JBRUgscUJBQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLEVBQUE7O3dCQUF2RSxTQUF1RSxDQUFDOzs7OztLQUN6RTtJQUVEOzs7O09BSUc7SUFDSCx3Q0FBUyxHQUFULFVBQVUsS0FBcUI7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN6QixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMvQjthQUFNO1lBQ0wsS0FBSyxHQUFHLEtBQXlCLENBQUM7WUFDbEMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBL01NLDRCQUFPLEdBQUcsaUJBQWlCLENBQUM7O2dCQUVPLG1CQUFtQjtnQkFDbkIsbUJBQW1CO2dCQUM1QixVQUFVOzs7SUFMaEMsb0JBQW9CO1FBSGhDLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7T0FDVyxvQkFBb0IsQ0FpTmhDOytCQXhPRDtDQXdPQyxBQWpORCxJQWlOQztTQWpOWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQge0ZpcmViYXNlRGF0YVNlcnZpY2V9IGZyb20gXCIuLi9maXJlYmFzZS9maXJlYmFzZS1kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtDdXN0b21lcn0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9jdXN0b21lci9jdXN0b21lclwiO1xyXG5pbXBvcnQge1Jlc3RhdXJhbnR9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvcmVzdGF1cmFudC9yZXN0YXVyYW50XCI7XHJcbmltcG9ydCB7TWVhbH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9tZWFsL21lYWxcIjtcclxuaW1wb3J0IHtPcmRlcn0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlci9vcmRlclwiO1xyXG5pbXBvcnQge09yZGVySXRlbX0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlcl9pdGVtL29yZGVyLWl0ZW1cIjtcclxuaW1wb3J0IHtOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tIFwiLi4vbWljcy9ub3RpZmljYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQge0NvdXJpZXIsIERlbGl2ZXJ5LCBEZWxpdmVyeV9TdGF0dXMsIFBvaW50LCBRdWVyeVBhcmFtTW9kZWx9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHNcIjtcclxuaW1wb3J0IHtEZWxpdmVyeVN0YXR1c0hpc3Rvcnl9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnktc3RhdHVzLWhpc3RvcnlcIjtcclxuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcbmltcG9ydCB7TWFwU2VydmljZX0gZnJvbSBcIi4uL21hcC9tYXAuc2VydmljZVwiO1xyXG5cclxuZW51bSBTSU1VTEFUT1JfTUVTU0FHRSB7XHJcbiAgU1RBUlQgPSAnc2ltdWxhdG9yIHN0YXJ0JyxcclxuICBTVEVQID0gJ3NpbXVsYXRvciBzdGVwJyxcclxuICBTVE9QID0gJ3NpbXVsYXRvciBzdG9wJyxcclxufTtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNpbXVsYXRvckRhdGFTZXJ2aWNlIHtcclxuICBzdGF0aWMgTUVTU0FHRSA9IFNJTVVMQVRPUl9NRVNTQUdFO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9GaXJlYmFzZURhdGFTZXJ2aWNlOiBGaXJlYmFzZURhdGFTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX05vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfTWFwU2VydmljZTogTWFwU2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0YXJ0IHNpbXVsYXRvclxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIHN0YXJ0KHRpbWU6IG51bWJlciA9IDIwMDApIHtcclxuICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoU0lNVUxBVE9SX01FU1NBR0UuU1RBUlQpO1xyXG5cclxuICAgIC8vIGdldCBkZWxpdmVyeSBsaXN0XHJcbiAgICBsZXQgZGVsaXZlcnlMaXN0OiBEZWxpdmVyeVtdO1xyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5nZXREZWxpdmVyaWVzKCkudGhlbigocnMpID0+IGRlbGl2ZXJ5TGlzdCA9IHJzKTtcclxuICAgIGRlbGl2ZXJ5TGlzdCA9IF8uZmlsdGVyKGRlbGl2ZXJ5TGlzdCwgKHg6IERlbGl2ZXJ5KSA9PiB7XHJcbiAgICAgIHJldHVybiB4LmN1cnJlbnRTdGF0dXMuc3RhdHVzICE9PSBEZWxpdmVyeV9TdGF0dXMuREVMSVZFUkVEO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoZGVsaXZlcnlMaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKFNJTVVMQVRPUl9NRVNTQUdFLlNUT1ApO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2V0IG9yZGVyIGxpc3RcclxuICAgIGxldCBvcmRlckxpc3Q7XHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmdldE9yZGVycygpLnRoZW4oKHJzKSA9PiBvcmRlckxpc3QgPSBycyk7XHJcbiAgICBfLm1hcChkZWxpdmVyeUxpc3QsICh4OiBEZWxpdmVyeSkgPT4ge1xyXG4gICAgICB4Lm9yZGVyID0gXy5maW5kKG9yZGVyTGlzdCwgbyA9PiBvLmlkID09IHgub3JkZXJfaWQpO1xyXG4gICAgfSlcclxuXHJcbiAgICBsZXQgZGVsaXZlcmVkRGVsaXZlcnlMaXN0ID0gW107XHJcbiAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGlmIChkZWxpdmVyeUxpc3QubGVuZ3RoID09PSBkZWxpdmVyZWREZWxpdmVyeUxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKGludGVydmFsICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShTSU1VTEFUT1JfTUVTU0FHRS5TVE9QKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coJ3N0ZXAnKTtcclxuICAgICAgXy5tYXAoZGVsaXZlcnlMaXN0LCBhc3luYyAoeCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlRGVsaXZlcnkoeCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZGVsaXZlcmVkRGVsaXZlcnlMaXN0ID0gXy5maWx0ZXIoZGVsaXZlcnlMaXN0LCAoeDogRGVsaXZlcnkpID0+IHtcclxuICAgICAgICByZXR1cm4geC5jdXJyZW50U3RhdHVzLnN0YXR1cyA9PT0gRGVsaXZlcnlfU3RhdHVzLkRFTElWRVJFRDtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoU0lNVUxBVE9SX01FU1NBR0UuU1RFUCk7XHJcblxyXG4gICAgfSwgdGltZSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBoYW5kbGVEZWxpdmVyeShkZWxpdmVyeTogRGVsaXZlcnkpIHtcclxuICAgIGlmIChkZWxpdmVyeS50aW1lVG9OZXh0U3RhdHVzID49IG1vbWVudCgpLnZhbHVlT2YoKSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsaXZlcnkudGltZVRvTmV4dFN0YXR1cyA9IG1vbWVudCgpLnZhbHVlT2YoKSArIF8ucmFuZG9tKDUsIDEwKSAqIDEwMDA7XHJcblxyXG4gICAgbGV0IG5leHRTdGF0dXMgPSBudWxsO1xyXG5cclxuICAgIHN3aXRjaCAoZGVsaXZlcnkuY3VycmVudFN0YXR1cy5zdGF0dXMpIHtcclxuICAgICAgY2FzZSBEZWxpdmVyeV9TdGF0dXMuT1JERVJFRDpcclxuICAgICAgICBuZXh0U3RhdHVzID0gRGVsaXZlcnlfU3RhdHVzLlBSRVBBUklORztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBEZWxpdmVyeV9TdGF0dXMuUFJFUEFSSU5HOlxyXG4gICAgICAgIG5leHRTdGF0dXMgPSBEZWxpdmVyeV9TdGF0dXMuV0FJVF9GT1JfUElDS19VUDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBEZWxpdmVyeV9TdGF0dXMuV0FJVF9GT1JfUElDS19VUDpcclxuICAgICAgICBuZXh0U3RhdHVzID0gRGVsaXZlcnlfU3RhdHVzLkRFTElWRVJJTkc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRGVsaXZlcnlfU3RhdHVzLkRFTElWRVJJTkc6XHJcbiAgICAgICAgbmV4dFN0YXR1cyA9IERlbGl2ZXJ5X1N0YXR1cy5ERUxJVkVSRUQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RhdHVzSGlzdG9yeSA9IG5ldyBEZWxpdmVyeVN0YXR1c0hpc3Rvcnkoe1xyXG4gICAgICBzdGF0dXM6IG5leHRTdGF0dXMsXHJcbiAgICAgIGRlbGl2ZXJ5X2lkOiBkZWxpdmVyeS5pZCxcclxuICAgICAgZGF0ZV90aW1lOiBtb21lbnQoKS52YWx1ZU9mKClcclxuICAgIH0pO1xyXG5cclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuY3JlYXRlV2l0aE9iamVjdChzdGF0dXNIaXN0b3J5KTtcclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2VcclxuICAgICAgLmdldFN0YXR1c0hpc3RvcnlPZkRlbGl2ZXJ5KFtuZXcgUXVlcnlQYXJhbU1vZGVsKCdkZWxpdmVyeV9pZCcsIFF1ZXJ5UGFyYW1Nb2RlbC5PUEVSQVRJT05TLkVRVUFMLCBkZWxpdmVyeS5pZCldKVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICBkZWxpdmVyeS5zZXRTdGF0dXNIaXN0b3J5KHJzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkZWxpdmVyeSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIHN0b3AoKSB7XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIHJhbmRvbWx5IGdlbmVyYXRlIG4gbnVtYmVyIG9mIG9yZGVyc1xyXG4gICAqIEBwYXJhbSBuXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgZ2VuZXJhdGVPcmRlcihuOiBudW1iZXIgPSAxKSB7XHJcbiAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKGBnZW5lcmF0ZSAke259IG9yZGVyYCk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xyXG4gICAgICB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmdldEN1c3RvbWVyKCksXHJcbiAgICAgIHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuZ2V0UmVzdGF1cmFudCgpLFxyXG4gICAgICB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmdldENvdXJpZXIoKSxcclxuICAgIF0pXHJcbiAgICAgIC50aGVuKGFzeW5jIChbY3VzdG9tZXJzLCByZXN0YXVyYW50cywgY291cmllcnNdKSA9PiB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2VuZXJhdGVPbmVPcmRlcihjdXN0b21lcnMsIHJlc3RhdXJhbnRzLCBjb3VyaWVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZW5lcmF0ZSAxIG9yZGVyLCAxIG9yZGVyIGl0ZW0sIDEgZGVsaXZlcnksIDEgZGVsaXZlcnkgc3RhdHVzIGhpc3RvcnlcclxuICAgKiBAcGFyYW0gY3VzdG9tZXJzXHJcbiAgICogQHBhcmFtIHJlc3RhdXJhbnRzXHJcbiAgICogQHBhcmFtIGNvdXJpZXJzXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgZ2VuZXJhdGVPbmVPcmRlcihjdXN0b21lcnM6IEN1c3RvbWVyW10sIHJlc3RhdXJhbnRzOiBSZXN0YXVyYW50W10sIGNvdXJpZXJzOiBDb3VyaWVyW10pIHtcclxuICAgIGNvbnN0IGN1c3RvbWVyOiBDdXN0b21lciA9IHRoaXMuZ2V0UmFuZG9tKGN1c3RvbWVycyk7XHJcbiAgICBjb25zdCByZXN0YXVyYW50OiBSZXN0YXVyYW50ID0gdGhpcy5nZXRSYW5kb20ocmVzdGF1cmFudHMpO1xyXG4gICAgY29uc3QgbWVhbDogTWVhbCA9IHRoaXMuZ2V0UmFuZG9tKHJlc3RhdXJhbnQubWVhbHMpO1xyXG4gICAgY29uc3QgY291cmllcjogQ291cmllciA9IHRoaXMuZ2V0UmFuZG9tKGNvdXJpZXJzKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgb3JkZXJcclxuICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKHtcclxuICAgICAgZGF0ZV90aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgcmVzdGF1cmFudF9pZDogcmVzdGF1cmFudC5pZCxcclxuICAgICAgY3VzdG9tZXJfaWQ6IGN1c3RvbWVyLmlkXHJcbiAgICB9KTtcclxuXHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmNyZWF0ZVdpdGhPYmplY3Qob3JkZXIpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBvcmRlciBpdGVtXHJcbiAgICBjb25zdCBvcmRlckl0ZW0gPSBuZXcgT3JkZXJJdGVtKFxyXG4gICAgICB7XHJcbiAgICAgICAgbWVhbF9pZDogbWVhbC5pZCxcclxuICAgICAgICBxdWFudGl0eTogdGhpcy5nZXRSYW5kb20oNSksXHJcbiAgICAgICAgb3JkZXJfaWQ6IG9yZGVyLmlkXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBvcmRlckl0ZW0ubWVhbCA9IG1lYWw7XHJcbiAgICBvcmRlckl0ZW0ub3JkZXIgPSBvcmRlcjtcclxuXHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmNyZWF0ZVdpdGhPYmplY3Qob3JkZXJJdGVtKTtcclxuICAgIG9yZGVyLnRvdGFsICs9IG9yZGVySXRlbS5tZWFsLnByaWNlICogb3JkZXJJdGVtLnF1YW50aXR5O1xyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS51cGRhdGVXaXRoT2JqZWN0KG9yZGVyKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgZGVsaXZlcnlcclxuICAgIGNvbnN0IGRlbGl2ZXJ5ID0gbmV3IERlbGl2ZXJ5KFxyXG4gICAgICB7XHJcbiAgICAgICAgcG9pbnRzOiBbXSxcclxuICAgICAgICBjb3VyaWVyX2lkOiBjb3VyaWVyLmlkLFxyXG4gICAgICAgIG9yZGVyX2lkOiBvcmRlci5pZFxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIGFkZCBwYXRoc1xyXG4gICAgYXdhaXQgdGhpcy5fTWFwU2VydmljZS5yZW5kZXJEaXJlY3Rpb24obmV3IGdvb2dsZS5tYXBzLkxhdExuZyhjb3VyaWVyLmxhdCwgY291cmllci5sbmcpLCBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHJlc3RhdXJhbnQubGF0LCByZXN0YXVyYW50LmxuZykpXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIGRlbGl2ZXJ5LnBhdGhfdG9fcmVzdGF1cmFudCA9IHJzO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBhd2FpdCB0aGlzLl9NYXBTZXJ2aWNlLnJlbmRlckRpcmVjdGlvbihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHJlc3RhdXJhbnQubGF0LCByZXN0YXVyYW50LmxuZyksIG5ldyBnb29nbGUubWFwcy5MYXRMbmcoY3VzdG9tZXIubGF0LCBjdXN0b21lci5sbmcpKVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICBkZWxpdmVyeS5wYXRoX3RvX2N1c3RvbWVyID0gcnM7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGRlbGl2ZXJ5KTtcclxuICAgIGNvbnNvbGUubG9nKGRlbGl2ZXJ5LmdldERhdGEoKSk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KGRlbGl2ZXJ5KTtcclxuXHJcbiAgICAvLyBjcmVhdGUgZGVsaXZlcnkgc3RhdHVzXHJcbiAgICBjb25zdCBkZWxpdmVyeVN0YXR1c0hpc3RvcnkgPSBuZXcgRGVsaXZlcnlTdGF0dXNIaXN0b3J5KHtcclxuICAgICAgc3RhdHVzOiBEZWxpdmVyeV9TdGF0dXMuT1JERVJFRCxcclxuICAgICAgZGVsaXZlcnlfaWQ6IGRlbGl2ZXJ5LmlkLFxyXG4gICAgICBkYXRlX3RpbWU6IG1vbWVudCgpLnZhbHVlT2YoKVxyXG4gICAgfSk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KGRlbGl2ZXJ5U3RhdHVzSGlzdG9yeSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgcmFuZG9tXHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICogQHJldHVybnMge2FueSB8IG51bGwgfCBudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0UmFuZG9tKHZhbHVlOiBhbnlbXSB8IG51bWJlcik6IGFueSB7XHJcbiAgICBpZiAoIWlzTmFOKE51bWJlcih2YWx1ZSkpKSB7XHJcbiAgICAgIHJldHVybiBfLnJhbmRvbSgwLCB2YWx1ZSkgKyAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZSBhcyB1bmtub3duIGFzIGFueVtdO1xyXG4gICAgICByZXR1cm4gdmFsdWVbXy5yYW5kb20oMCwgdmFsdWUubGVuZ3RoIC0gMSldO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbiJdfQ==