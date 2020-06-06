import { __awaiter, __decorate, __generator, __read } from "tslib";
import { Injectable } from '@angular/core';
import _ from 'lodash';
import { FirebaseDataService } from "../firebase/firebase-data.service";
import { DefaultModel } from "../../constant/models/default-model";
import { Order } from "../../constant/models/order/order";
import { OrderItem } from "../../constant/models/order_item/order-item";
import * as i0 from "@angular/core";
import * as i1 from "../firebase/firebase-data.service";
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
    SimulatorDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SimulatorDataService_Factory() { return new SimulatorDataService(i0.ɵɵinject(i1.FirebaseDataService)); }, token: SimulatorDataService, providedIn: "root" });
    SimulatorDataService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], SimulatorDataService);
    return SimulatorDataService;
}());
export { SimulatorDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RhdGEvc2ltdWxhdG9yLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFJdEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sNkNBQTZDLENBQUM7OztBQUt0RTtJQUVFLDhCQUFvQixvQkFBeUM7UUFBekMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtJQUU3RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0csb0NBQUssR0FBWDs7OztnQkFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRTtvQkFDbEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7cUJBQzFDLElBQUksQ0FBQyxVQUFPLEVBQXdCO3dCQUF4QixrQkFBd0IsRUFBdkIsaUJBQVMsRUFBRSxtQkFBVzs7Ozs7O29DQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztvQ0FDOUIsUUFBUSxHQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7b0NBQy9DLFVBQVUsR0FBZSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29DQUNyRCxJQUFJLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQ0FDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLFlBQVksWUFBWSxDQUFDLENBQUM7b0NBR3hDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQzt3Q0FDdEIsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO3dDQUMvQixhQUFhLEVBQUUsVUFBVSxDQUFDLEVBQUU7d0NBQzVCLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRTtxQ0FDekIsQ0FBQyxDQUFDO29DQUVILHFCQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFBQTs7b0NBQXZELFNBQXVELENBQUM7b0NBR2xELFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FDN0I7d0NBQ0UsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFO3dDQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0NBQzNCLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRTtxQ0FDbkIsQ0FDRixDQUFDO29DQUNGLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29DQUN0QixTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQ0FFeEIscUJBQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFBOztvQ0FBM0QsU0FBMkQsQ0FBQztvQ0FDNUQsS0FBSyxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO29DQUN6RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7O2lCQUNuRCxDQUFDLENBQUM7Ozs7S0FDTjtJQUVELG1DQUFJLEdBQUo7SUFFQSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHdDQUFTLEdBQVQsVUFBVSxLQUFxQjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDM0I7YUFBTTtZQUNMLEtBQUssR0FBRyxLQUF5QixDQUFDO1lBQ2xDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Z0JBL0R5QyxtQkFBbUI7OztJQUZsRCxvQkFBb0I7UUFIaEMsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLG9CQUFvQixDQWtFaEM7K0JBL0VEO0NBK0VDLEFBbEVELElBa0VDO1NBbEVZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7RmlyZWJhc2VEYXRhU2VydmljZX0gZnJvbSBcIi4uL2ZpcmViYXNlL2ZpcmViYXNlLWRhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQge0N1c3RvbWVyfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL2N1c3RvbWVyL2N1c3RvbWVyXCI7XHJcbmltcG9ydCB7UmVzdGF1cmFudH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnRcIjtcclxuaW1wb3J0IHtNZWFsfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL21lYWwvbWVhbFwiO1xyXG5pbXBvcnQge0RlZmF1bHRNb2RlbH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9kZWZhdWx0LW1vZGVsXCI7XHJcbmltcG9ydCB7T3JkZXJ9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvb3JkZXIvb3JkZXJcIjtcclxuaW1wb3J0IHtPcmRlckl0ZW19IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvb3JkZXJfaXRlbS9vcmRlci1pdGVtXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaW11bGF0b3JEYXRhU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX0ZpcmViYXNlRGF0YVNlcnZpY2U6IEZpcmViYXNlRGF0YVNlcnZpY2UpIHtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzdGFydCBzaW11bGF0b3JcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyBzdGFydCgpIHtcclxuICAgIFByb21pc2UuYWxsKFt0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmdldEN1c3RvbWVyKCksXHJcbiAgICAgIHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuZ2V0UmVzdGF1cmFudCgpXSlcclxuICAgICAgLnRoZW4oYXN5bmMgKFtjdXN0b21lcnMsIHJlc3RhdXJhbnRzXSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbWVycywgcmVzdGF1cmFudHMpO1xyXG4gICAgICAgIGNvbnN0IGN1c3RvbWVyOiBDdXN0b21lciA9IHRoaXMuZ2V0UmFuZG9tKGN1c3RvbWVycyk7XHJcbiAgICAgICAgY29uc3QgcmVzdGF1cmFudDogUmVzdGF1cmFudCA9IHRoaXMuZ2V0UmFuZG9tKHJlc3RhdXJhbnRzKTtcclxuICAgICAgICBjb25zdCBtZWFsOiBNZWFsID0gdGhpcy5nZXRSYW5kb20ocmVzdGF1cmFudC5tZWFscyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY3VzdG9tZXIsIHJlc3RhdXJhbnQsIG1lYWwpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbWVyIGluc3RhbmNlb2YgRGVmYXVsdE1vZGVsKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIG9yZGVyXHJcbiAgICAgICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoe1xyXG4gICAgICAgICAgZGF0ZV90aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgICAgIHJlc3RhdXJhbnRfaWQ6IHJlc3RhdXJhbnQuaWQsXHJcbiAgICAgICAgICBjdXN0b21lcl9pZDogY3VzdG9tZXIuaWRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KG9yZGVyKTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIG9yZGVyIGl0ZW1cclxuICAgICAgICBjb25zdCBvcmRlckl0ZW0gPSBuZXcgT3JkZXJJdGVtKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtZWFsX2lkOiBtZWFsLmlkLFxyXG4gICAgICAgICAgICBxdWFudGl0eTogdGhpcy5nZXRSYW5kb20oNSksXHJcbiAgICAgICAgICAgIG9yZGVyX2lkOiBvcmRlci5pZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgb3JkZXJJdGVtLm1lYWwgPSBtZWFsO1xyXG4gICAgICAgIG9yZGVySXRlbS5vcmRlciA9IG9yZGVyO1xyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmNyZWF0ZVdpdGhPYmplY3Qob3JkZXJJdGVtKTtcclxuICAgICAgICBvcmRlci50b3RhbCArPSBvcmRlckl0ZW0ubWVhbC5wcmljZSAqIG9yZGVySXRlbS5xdWFudGl0eTtcclxuICAgICAgICB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLnVwZGF0ZVdpdGhPYmplY3Qob3JkZXIpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0b3AoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IHJhbmRvbVxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqIEByZXR1cm5zIHthbnkgfCBudWxsIHwgbnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldFJhbmRvbSh2YWx1ZTogYW55W10gfCBudW1iZXIpOiBhbnkge1xyXG4gICAgaWYgKCFpc05hTihOdW1iZXIodmFsdWUpKSkge1xyXG4gICAgICByZXR1cm4gXy5yYW5kb20oMCwgdmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZSBhcyB1bmtub3duIGFzIGFueVtdO1xyXG4gICAgICByZXR1cm4gdmFsdWVbXy5yYW5kb20oMCwgdmFsdWUubGVuZ3RoIC0gMSldO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=