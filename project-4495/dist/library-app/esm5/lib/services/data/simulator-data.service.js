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
import * as i0 from "@angular/core";
import * as i1 from "../firebase/firebase-data.service";
import * as i2 from "../mics/notification.service";
var SIMULATOR_MESSAGE;
(function (SIMULATOR_MESSAGE) {
    SIMULATOR_MESSAGE["START"] = "simulator start";
    SIMULATOR_MESSAGE["STEP"] = "simulator step";
    SIMULATOR_MESSAGE["STOP"] = "simulator stop";
})(SIMULATOR_MESSAGE || (SIMULATOR_MESSAGE = {}));
;
var SimulatorDataService = /** @class */ (function () {
    function SimulatorDataService(_FirebaseDataService, _NotificationService) {
        this._FirebaseDataService = _FirebaseDataService;
        this._NotificationService = _NotificationService;
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
                            status: Delivery_Status.ORDERED,
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
        { type: NotificationService }
    ]; };
    SimulatorDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SimulatorDataService_Factory() { return new SimulatorDataService(i0.ɵɵinject(i1.FirebaseDataService), i0.ɵɵinject(i2.NotificationService)); }, token: SimulatorDataService, providedIn: "root" });
    SimulatorDataService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], SimulatorDataService);
    return SimulatorDataService;
}());
export { SimulatorDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RhdGEvc2ltdWxhdG9yLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFJdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQVUsUUFBUSxFQUFFLGVBQWUsRUFBUyxlQUFlLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUM3RixPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7Ozs7QUFFNUIsSUFBSyxpQkFJSjtBQUpELFdBQUssaUJBQWlCO0lBQ3BCLDhDQUF5QixDQUFBO0lBQ3pCLDRDQUF1QixDQUFBO0lBQ3ZCLDRDQUF1QixDQUFBO0FBQ3pCLENBQUMsRUFKSSxpQkFBaUIsS0FBakIsaUJBQWlCLFFBSXJCO0FBQUEsQ0FBQztBQUtGO0lBR0UsOEJBQW9CLG9CQUF5QyxFQUN6QyxvQkFBeUM7UUFEekMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQUN6Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO0lBRTdELENBQUM7SUFFRDs7O09BR0c7SUFDRyxvQ0FBSyxHQUFYLFVBQVksSUFBbUI7UUFBbkIscUJBQUEsRUFBQSxXQUFtQjs7Ozs7Ozt3QkFDN0IsSUFBSSxDQUFDLG9CQUFvQixDQUFD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UUFBUSxDQUFDLEVBQUU7NEJBQ3hCLFNBQVMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7eUJBQzlCLENBQUMsQ0FBQzt3QkFFSCxxQkFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsRUFBQTs7d0JBQXZFLFNBQXVFLENBQUM7Ozs7O0tBQ3pFO0lBRUQ7Ozs7T0FJRztJQUNILHdDQUFTLEdBQVQsVUFBVSxLQUFxQjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxLQUFLLEdBQUcsS0FBeUIsQ0FBQztZQUNsQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUE5TE0sNEJBQU8sR0FBRyxpQkFBaUIsQ0FBQzs7Z0JBRU8sbUJBQW1CO2dCQUNuQixtQkFBbUI7OztJQUpsRCxvQkFBb0I7UUFIaEMsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLG9CQUFvQixDQWdNaEM7K0JBdE5EO0NBc05DLEFBaE1ELElBZ01DO1NBaE1ZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7RmlyZWJhc2VEYXRhU2VydmljZX0gZnJvbSBcIi4uL2ZpcmViYXNlL2ZpcmViYXNlLWRhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQge0N1c3RvbWVyfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL2N1c3RvbWVyL2N1c3RvbWVyXCI7XHJcbmltcG9ydCB7UmVzdGF1cmFudH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnRcIjtcclxuaW1wb3J0IHtNZWFsfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL21lYWwvbWVhbFwiO1xyXG5pbXBvcnQge09yZGVyfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyL29yZGVyXCI7XHJcbmltcG9ydCB7T3JkZXJJdGVtfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyX2l0ZW0vb3JkZXItaXRlbVwiO1xyXG5pbXBvcnQge05vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gXCIuLi9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7Q291cmllciwgRGVsaXZlcnksIERlbGl2ZXJ5X1N0YXR1cywgUG9pbnQsIFF1ZXJ5UGFyYW1Nb2RlbH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVsc1wiO1xyXG5pbXBvcnQge0RlbGl2ZXJ5U3RhdHVzSGlzdG9yeX0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9kZWxpdmVyeS9kZWxpdmVyeS1zdGF0dXMtaGlzdG9yeVwiO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuXHJcbmVudW0gU0lNVUxBVE9SX01FU1NBR0Uge1xyXG4gIFNUQVJUID0gJ3NpbXVsYXRvciBzdGFydCcsXHJcbiAgU1RFUCA9ICdzaW11bGF0b3Igc3RlcCcsXHJcbiAgU1RPUCA9ICdzaW11bGF0b3Igc3RvcCcsXHJcbn07XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaW11bGF0b3JEYXRhU2VydmljZSB7XHJcbiAgc3RhdGljIE1FU1NBR0UgPSBTSU1VTEFUT1JfTUVTU0FHRTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfRmlyZWJhc2VEYXRhU2VydmljZTogRmlyZWJhc2VEYXRhU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9Ob3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc3RhcnQgc2ltdWxhdG9yXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgc3RhcnQodGltZTogbnVtYmVyID0gMjAwMCkge1xyXG4gICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShTSU1VTEFUT1JfTUVTU0FHRS5TVEFSVCk7XHJcblxyXG4gICAgLy8gZ2V0IGRlbGl2ZXJ5IGxpc3RcclxuICAgIGxldCBkZWxpdmVyeUxpc3Q6IERlbGl2ZXJ5W107XHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmdldERlbGl2ZXJpZXMoKS50aGVuKChycykgPT4gZGVsaXZlcnlMaXN0ID0gcnMpO1xyXG4gICAgZGVsaXZlcnlMaXN0ID0gXy5maWx0ZXIoZGVsaXZlcnlMaXN0LCAoeDogRGVsaXZlcnkpID0+IHtcclxuICAgICAgcmV0dXJuIHguY3VycmVudFN0YXR1cy5zdGF0dXMgIT09IERlbGl2ZXJ5X1N0YXR1cy5ERUxJVkVSRUQ7XHJcbiAgICB9KTtcclxuICAgIGlmIChkZWxpdmVyeUxpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXQgb3JkZXIgbGlzdFxyXG4gICAgbGV0IG9yZGVyTGlzdDtcclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuZ2V0T3JkZXJzKCkudGhlbigocnMpID0+IG9yZGVyTGlzdCA9IHJzKTtcclxuICAgIF8ubWFwKGRlbGl2ZXJ5TGlzdCwgKHg6IERlbGl2ZXJ5KSA9PiB7XHJcbiAgICAgIHgub3JkZXIgPSBfLmZpbmQob3JkZXJMaXN0LCBvID0+IG8uaWQgPT0geC5vcmRlcl9pZCk7XHJcbiAgICB9KVxyXG5cclxuICAgIGxldCBkZWxpdmVyZWREZWxpdmVyeUxpc3QgPSBbXTtcclxuICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgaWYgKGRlbGl2ZXJ5TGlzdC5sZW5ndGggPT09IGRlbGl2ZXJlZERlbGl2ZXJ5TGlzdC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgIT09IG51bGwpIHtcclxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKFNJTVVMQVRPUl9NRVNTQUdFLlNUT1ApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZygnc3RlcCcpO1xyXG4gICAgICBfLm1hcChkZWxpdmVyeUxpc3QsIGFzeW5jICh4KSA9PiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVEZWxpdmVyeSh4KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBkZWxpdmVyZWREZWxpdmVyeUxpc3QgPSBfLmZpbHRlcihkZWxpdmVyeUxpc3QsICh4OiBEZWxpdmVyeSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB4LmN1cnJlbnRTdGF0dXMuc3RhdHVzID09PSBEZWxpdmVyeV9TdGF0dXMuREVMSVZFUkVEO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShTSU1VTEFUT1JfTUVTU0FHRS5TVEVQKTtcclxuXHJcbiAgICB9LCB0aW1lKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGhhbmRsZURlbGl2ZXJ5KGRlbGl2ZXJ5OiBEZWxpdmVyeSkge1xyXG4gICAgaWYgKGRlbGl2ZXJ5LnRpbWVUb05leHRTdGF0dXMgPj0gbW9tZW50KCkudmFsdWVPZigpKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxpdmVyeS50aW1lVG9OZXh0U3RhdHVzID0gbW9tZW50KCkudmFsdWVPZigpICsgXy5yYW5kb20oNSwgMTApICogMTAwMDtcclxuXHJcbiAgICBsZXQgbmV4dFN0YXR1cyA9IG51bGw7XHJcblxyXG4gICAgc3dpdGNoIChkZWxpdmVyeS5jdXJyZW50U3RhdHVzLnN0YXR1cykge1xyXG4gICAgICBjYXNlIERlbGl2ZXJ5X1N0YXR1cy5PUkRFUkVEOlxyXG4gICAgICAgIG5leHRTdGF0dXMgPSBEZWxpdmVyeV9TdGF0dXMuUFJFUEFSSU5HO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERlbGl2ZXJ5X1N0YXR1cy5QUkVQQVJJTkc6XHJcbiAgICAgICAgbmV4dFN0YXR1cyA9IERlbGl2ZXJ5X1N0YXR1cy5XQUlUX0ZPUl9QSUNLX1VQO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERlbGl2ZXJ5X1N0YXR1cy5XQUlUX0ZPUl9QSUNLX1VQOlxyXG4gICAgICAgIG5leHRTdGF0dXMgPSBEZWxpdmVyeV9TdGF0dXMuREVMSVZFUklORztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBEZWxpdmVyeV9TdGF0dXMuREVMSVZFUklORzpcclxuICAgICAgICBuZXh0U3RhdHVzID0gRGVsaXZlcnlfU3RhdHVzLkRFTElWRVJFRDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGF0dXNIaXN0b3J5ID0gbmV3IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSh7XHJcbiAgICAgIHN0YXR1czogbmV4dFN0YXR1cyxcclxuICAgICAgZGVsaXZlcnlfaWQ6IGRlbGl2ZXJ5LmlkLFxyXG4gICAgICBkYXRlX3RpbWU6IG1vbWVudCgpLnZhbHVlT2YoKVxyXG4gICAgfSk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KHN0YXR1c0hpc3RvcnkpO1xyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZVxyXG4gICAgICAuZ2V0U3RhdHVzSGlzdG9yeU9mRGVsaXZlcnkoW25ldyBRdWVyeVBhcmFtTW9kZWwoJ2RlbGl2ZXJ5X2lkJywgUXVlcnlQYXJhbU1vZGVsLk9QRVJBVElPTlMuRVFVQUwsIGRlbGl2ZXJ5LmlkKV0pXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIGRlbGl2ZXJ5LnNldFN0YXR1c0hpc3RvcnkocnMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRlbGl2ZXJ5KTtcclxuICAgICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgc3RvcCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByYW5kb21seSBnZW5lcmF0ZSBuIG51bWJlciBvZiBvcmRlcnNcclxuICAgKiBAcGFyYW0gblxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGdlbmVyYXRlT3JkZXIobjogbnVtYmVyID0gMSkge1xyXG4gICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShgZ2VuZXJhdGUgJHtufSBvcmRlcmApO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtcclxuICAgICAgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5nZXRDdXN0b21lcigpLFxyXG4gICAgICB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmdldFJlc3RhdXJhbnQoKSxcclxuICAgICAgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5nZXRDb3VyaWVyKCksXHJcbiAgICBdKVxyXG4gICAgICAudGhlbihhc3luYyAoW2N1c3RvbWVycywgcmVzdGF1cmFudHMsIGNvdXJpZXJzXSkgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdlbmVyYXRlT25lT3JkZXIoY3VzdG9tZXJzLCByZXN0YXVyYW50cywgY291cmllcnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2VuZXJhdGUgMSBvcmRlciwgMSBvcmRlciBpdGVtLCAxIGRlbGl2ZXJ5LCAxIGRlbGl2ZXJ5IHN0YXR1cyBoaXN0b3J5XHJcbiAgICogQHBhcmFtIGN1c3RvbWVyc1xyXG4gICAqIEBwYXJhbSByZXN0YXVyYW50c1xyXG4gICAqIEBwYXJhbSBjb3VyaWVyc1xyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGdlbmVyYXRlT25lT3JkZXIoY3VzdG9tZXJzOiBDdXN0b21lcltdLCByZXN0YXVyYW50czogUmVzdGF1cmFudFtdLCBjb3VyaWVyczogQ291cmllcltdKSB7XHJcbiAgICBjb25zdCBjdXN0b21lcjogQ3VzdG9tZXIgPSB0aGlzLmdldFJhbmRvbShjdXN0b21lcnMpO1xyXG4gICAgY29uc3QgcmVzdGF1cmFudDogUmVzdGF1cmFudCA9IHRoaXMuZ2V0UmFuZG9tKHJlc3RhdXJhbnRzKTtcclxuICAgIGNvbnN0IG1lYWw6IE1lYWwgPSB0aGlzLmdldFJhbmRvbShyZXN0YXVyYW50Lm1lYWxzKTtcclxuICAgIGNvbnN0IGNvdXJpZXI6IENvdXJpZXIgPSB0aGlzLmdldFJhbmRvbShjb3VyaWVycyk7XHJcblxyXG4gICAgLy8gY3JlYXRlIG9yZGVyXHJcbiAgICBjb25zdCBvcmRlciA9IG5ldyBPcmRlcih7XHJcbiAgICAgIGRhdGVfdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcbiAgICAgIHJlc3RhdXJhbnRfaWQ6IHJlc3RhdXJhbnQuaWQsXHJcbiAgICAgIGN1c3RvbWVyX2lkOiBjdXN0b21lci5pZFxyXG4gICAgfSk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KG9yZGVyKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgb3JkZXIgaXRlbVxyXG4gICAgY29uc3Qgb3JkZXJJdGVtID0gbmV3IE9yZGVySXRlbShcclxuICAgICAge1xyXG4gICAgICAgIG1lYWxfaWQ6IG1lYWwuaWQsXHJcbiAgICAgICAgcXVhbnRpdHk6IHRoaXMuZ2V0UmFuZG9tKDUpLFxyXG4gICAgICAgIG9yZGVyX2lkOiBvcmRlci5pZFxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgb3JkZXJJdGVtLm1lYWwgPSBtZWFsO1xyXG4gICAgb3JkZXJJdGVtLm9yZGVyID0gb3JkZXI7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KG9yZGVySXRlbSk7XHJcbiAgICBvcmRlci50b3RhbCArPSBvcmRlckl0ZW0ubWVhbC5wcmljZSAqIG9yZGVySXRlbS5xdWFudGl0eTtcclxuICAgIHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UudXBkYXRlV2l0aE9iamVjdChvcmRlcik7XHJcblxyXG4gICAgLy8gY3JlYXRlIGRlbGl2ZXJ5XHJcbiAgICBjb25zdCBkZWxpdmVyeSA9IG5ldyBEZWxpdmVyeShcclxuICAgICAge1xyXG4gICAgICAgIHBvaW50czogW10sXHJcbiAgICAgICAgY291cmllcl9pZDogY291cmllci5pZCxcclxuICAgICAgICBvcmRlcl9pZDogb3JkZXIuaWRcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmNyZWF0ZVdpdGhPYmplY3QoZGVsaXZlcnkpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBkZWxpdmVyeSBzdGF0dXNcclxuICAgIGNvbnN0IGRlbGl2ZXJ5U3RhdHVzSGlzdG9yeSA9IG5ldyBEZWxpdmVyeVN0YXR1c0hpc3Rvcnkoe1xyXG4gICAgICBzdGF0dXM6IERlbGl2ZXJ5X1N0YXR1cy5PUkRFUkVELFxyXG4gICAgICBkZWxpdmVyeV9pZDogZGVsaXZlcnkuaWQsXHJcbiAgICAgIGRhdGVfdGltZTogbW9tZW50KCkudmFsdWVPZigpXHJcbiAgICB9KTtcclxuXHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmNyZWF0ZVdpdGhPYmplY3QoZGVsaXZlcnlTdGF0dXNIaXN0b3J5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCByYW5kb21cclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKiBAcmV0dXJucyB7YW55IHwgbnVsbCB8IG51bWJlcn1cclxuICAgKi9cclxuICBnZXRSYW5kb20odmFsdWU6IGFueVtdIHwgbnVtYmVyKTogYW55IHtcclxuICAgIGlmICghaXNOYU4oTnVtYmVyKHZhbHVlKSkpIHtcclxuICAgICAgcmV0dXJuIF8ucmFuZG9tKDAsIHZhbHVlKSArIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWx1ZSA9IHZhbHVlIGFzIHVua25vd24gYXMgYW55W107XHJcbiAgICAgIHJldHVybiB2YWx1ZVtfLnJhbmRvbSgwLCB2YWx1ZS5sZW5ndGggLSAxKV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuIl19