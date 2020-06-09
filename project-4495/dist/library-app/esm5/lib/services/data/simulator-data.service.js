import { __awaiter, __decorate, __generator, __read } from "tslib";
import { Injectable } from '@angular/core';
import _ from 'lodash';
import { FirebaseDataService } from "../firebase/firebase-data.service";
import { Order } from "../../constant/models/order/order";
import { OrderItem } from "../../constant/models/order_item/order-item";
import { NotificationService } from "../mics/notification.service";
import { Delivery, Delivery_Status } from "../../constant/models";
import { DeliveryStatusHistory } from "../../constant/models/delivery/delivery-status-history";
import moment from "moment";
import * as i0 from "@angular/core";
import * as i1 from "../firebase/firebase-data.service";
import * as i2 from "../mics/notification.service";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RhdGEvc2ltdWxhdG9yLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFJdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQVUsUUFBUSxFQUFFLGVBQWUsRUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdEQUF3RCxDQUFDO0FBQzdGLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQzs7OztBQUs1QjtJQUVFLDhCQUFvQixvQkFBeUMsRUFDekMsb0JBQXlDO1FBRHpDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtJQUU3RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0csb0NBQUssR0FBWDs7Ozs7O0tBRUM7SUFFRCxtQ0FBSSxHQUFKO0lBRUEsQ0FBQztJQUVEOzs7O09BSUc7SUFDRyw0Q0FBYSxHQUFuQixVQUFvQixDQUFhO1FBQWIsa0JBQUEsRUFBQSxLQUFhOzs7O2dCQUMvQixJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLGNBQVksQ0FBQyxXQUFRLENBQUMsQ0FBQztnQkFDN0Qsc0JBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDakIsSUFBSSxDQUFDLG9C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LENBQUMsRUFBQTs7d0JBQXZFLFNBQXVFLENBQUM7Ozs7O0tBQ3pFO0lBRUQ7Ozs7T0FJRztJQUNILHdDQUFTLEdBQVQsVUFBVSxLQUFxQjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxLQUFLLEdBQUcsS0FBeUIsQ0FBQztZQUNsQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7O2dCQTdHeUMsbUJBQW1CO2dCQUNuQixtQkFBbUI7OztJQUhsRCxvQkFBb0I7UUFIaEMsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLG9CQUFvQixDQWdIaEM7K0JBaElEO0NBZ0lDLEFBaEhELElBZ0hDO1NBaEhZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7RmlyZWJhc2VEYXRhU2VydmljZX0gZnJvbSBcIi4uL2ZpcmViYXNlL2ZpcmViYXNlLWRhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQge0N1c3RvbWVyfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL2N1c3RvbWVyL2N1c3RvbWVyXCI7XHJcbmltcG9ydCB7UmVzdGF1cmFudH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnRcIjtcclxuaW1wb3J0IHtNZWFsfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL21lYWwvbWVhbFwiO1xyXG5pbXBvcnQge09yZGVyfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyL29yZGVyXCI7XHJcbmltcG9ydCB7T3JkZXJJdGVtfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyX2l0ZW0vb3JkZXItaXRlbVwiO1xyXG5pbXBvcnQge05vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gXCIuLi9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7Q291cmllciwgRGVsaXZlcnksIERlbGl2ZXJ5X1N0YXR1cywgUG9pbnR9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHNcIjtcclxuaW1wb3J0IHtEZWxpdmVyeVN0YXR1c0hpc3Rvcnl9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnktc3RhdHVzLWhpc3RvcnlcIjtcclxuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaW11bGF0b3JEYXRhU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX0ZpcmViYXNlRGF0YVNlcnZpY2U6IEZpcmViYXNlRGF0YVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfTm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0YXJ0IHNpbXVsYXRvclxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIHN0YXJ0KCkge1xyXG5cclxuICB9XHJcblxyXG4gIHN0b3AoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmFuZG9tbHkgZ2VuZXJhdGUgbiBudW1iZXIgb2Ygb3JkZXJzXHJcbiAgICogQHBhcmFtIG5cclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyBnZW5lcmF0ZU9yZGVyKG46IG51bWJlciA9IDEpIHtcclxuICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYGdlbmVyYXRlICR7bn0gb3JkZXJgKTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChbXHJcbiAgICAgIHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuZ2V0Q3VzdG9tZXIoKSxcclxuICAgICAgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5nZXRSZXN0YXVyYW50KCksXHJcbiAgICAgIHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuZ2V0Q291cmllcigpLFxyXG4gICAgXSlcclxuICAgICAgLnRoZW4oYXN5bmMgKFtjdXN0b21lcnMsIHJlc3RhdXJhbnRzLCBjb3VyaWVyc10pID0+IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZW5lcmF0ZU9uZU9yZGVyKGN1c3RvbWVycywgcmVzdGF1cmFudHMsIGNvdXJpZXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdlbmVyYXRlIDEgb3JkZXIsIDEgb3JkZXIgaXRlbSwgMSBkZWxpdmVyeSwgMSBkZWxpdmVyeSBzdGF0dXMgaGlzdG9yeVxyXG4gICAqIEBwYXJhbSBjdXN0b21lcnNcclxuICAgKiBAcGFyYW0gcmVzdGF1cmFudHNcclxuICAgKiBAcGFyYW0gY291cmllcnNcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyBnZW5lcmF0ZU9uZU9yZGVyKGN1c3RvbWVyczogQ3VzdG9tZXJbXSwgcmVzdGF1cmFudHM6IFJlc3RhdXJhbnRbXSwgY291cmllcnM6IENvdXJpZXJbXSkge1xyXG4gICAgY29uc3QgY3VzdG9tZXI6IEN1c3RvbWVyID0gdGhpcy5nZXRSYW5kb20oY3VzdG9tZXJzKTtcclxuICAgIGNvbnN0IHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQgPSB0aGlzLmdldFJhbmRvbShyZXN0YXVyYW50cyk7XHJcbiAgICBjb25zdCBtZWFsOiBNZWFsID0gdGhpcy5nZXRSYW5kb20ocmVzdGF1cmFudC5tZWFscyk7XHJcbiAgICBjb25zdCBjb3VyaWVyOiBDb3VyaWVyID0gdGhpcy5nZXRSYW5kb20oY291cmllcnMpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBvcmRlclxyXG4gICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoe1xyXG4gICAgICBkYXRlX3RpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG4gICAgICByZXN0YXVyYW50X2lkOiByZXN0YXVyYW50LmlkLFxyXG4gICAgICBjdXN0b21lcl9pZDogY3VzdG9tZXIuaWRcclxuICAgIH0pO1xyXG5cclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuY3JlYXRlV2l0aE9iamVjdChvcmRlcik7XHJcblxyXG4gICAgLy8gY3JlYXRlIG9yZGVyIGl0ZW1cclxuICAgIGNvbnN0IG9yZGVySXRlbSA9IG5ldyBPcmRlckl0ZW0oXHJcbiAgICAgIHtcclxuICAgICAgICBtZWFsX2lkOiBtZWFsLmlkLFxyXG4gICAgICAgIHF1YW50aXR5OiB0aGlzLmdldFJhbmRvbSg1KSxcclxuICAgICAgICBvcmRlcl9pZDogb3JkZXIuaWRcclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIG9yZGVySXRlbS5tZWFsID0gbWVhbDtcclxuICAgIG9yZGVySXRlbS5vcmRlciA9IG9yZGVyO1xyXG5cclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuY3JlYXRlV2l0aE9iamVjdChvcmRlckl0ZW0pO1xyXG4gICAgb3JkZXIudG90YWwgKz0gb3JkZXJJdGVtLm1lYWwucHJpY2UgKiBvcmRlckl0ZW0ucXVhbnRpdHk7XHJcbiAgICB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLnVwZGF0ZVdpdGhPYmplY3Qob3JkZXIpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBkZWxpdmVyeVxyXG4gICAgY29uc3QgZGVsaXZlcnkgPSBuZXcgRGVsaXZlcnkoXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IFtdLFxyXG4gICAgICAgIGNvdXJpZXJfaWQ6IGNvdXJpZXIuaWQsXHJcbiAgICAgICAgb3JkZXJfaWQ6IG9yZGVyLmlkXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KGRlbGl2ZXJ5KTtcclxuXHJcbiAgICAvLyBjcmVhdGUgZGVsaXZlcnkgc3RhdHVzXHJcbiAgICBjb25zdCBkZWxpdmVyeVN0YXR1c0hpc3RvcnkgPSBuZXcgRGVsaXZlcnlTdGF0dXNIaXN0b3J5KHtcclxuICAgICAgc3RhdHVzOiBEZWxpdmVyeV9TdGF0dXMuT1JERVJFRCxcclxuICAgICAgZGVsaXZlcnlfaWQ6IGRlbGl2ZXJ5LmlkLFxyXG4gICAgICBkYXRlX3RpbWU6IG1vbWVudCgpLnZhbHVlT2YoKVxyXG4gICAgfSk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KGRlbGl2ZXJ5U3RhdHVzSGlzdG9yeSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgcmFuZG9tXHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICogQHJldHVybnMge2FueSB8IG51bGwgfCBudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0UmFuZG9tKHZhbHVlOiBhbnlbXSB8IG51bWJlcik6IGFueSB7XHJcbiAgICBpZiAoIWlzTmFOKE51bWJlcih2YWx1ZSkpKSB7XHJcbiAgICAgIHJldHVybiBfLnJhbmRvbSgwLCB2YWx1ZSkgKyAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZSBhcyB1bmtub3duIGFzIGFueVtdO1xyXG4gICAgICByZXR1cm4gdmFsdWVbXy5yYW5kb20oMCwgdmFsdWUubGVuZ3RoIC0gMSldO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=