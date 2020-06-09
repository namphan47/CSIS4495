import { __awaiter, __decorate } from "tslib";
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
let SimulatorDataService = class SimulatorDataService {
    constructor(_FirebaseDataService, _NotificationService) {
        this._FirebaseDataService = _FirebaseDataService;
        this._NotificationService = _NotificationService;
    }
    /**
     * start simulator
     * @returns {Promise<void>}
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    stop() {
    }
    /**
     * randomly generate n number of orders
     * @param n
     * @returns {Promise<void>}
     */
    generateOrder(n = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            this._NotificationService.pushMessage(`generate ${n} order`);
            return Promise.all([
                this._FirebaseDataService.getCustomer(),
                this._FirebaseDataService.getRestaurant(),
                this._FirebaseDataService.getCourier(),
            ])
                .then(([customers, restaurants, couriers]) => __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < n; i++) {
                    yield this.generateOneOrder(customers, restaurants, couriers);
                }
                return;
            }));
        });
    }
    /**
     * generate 1 order, 1 order item, 1 delivery, 1 delivery status history
     * @param customers
     * @param restaurants
     * @param couriers
     * @returns {Promise<void>}
     */
    generateOneOrder(customers, restaurants, couriers) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = this.getRandom(customers);
            const restaurant = this.getRandom(restaurants);
            const meal = this.getRandom(restaurant.meals);
            const courier = this.getRandom(couriers);
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
            // create delivery
            const delivery = new Delivery({
                points: [],
                courier_id: courier.id,
                order_id: order.id
            });
            yield this._FirebaseDataService.createWithObject(delivery);
            // create delivery status
            const deliveryStatusHistory = new DeliveryStatusHistory({
                status: Delivery_Status.ORDERED,
                delivery_id: delivery.id,
                date_time: moment().valueOf()
            });
            yield this._FirebaseDataService.createWithObject(deliveryStatusHistory);
        });
    }
    /**
     * get random
     * @param value
     * @returns {any | null | number}
     */
    getRandom(value) {
        if (!isNaN(Number(value))) {
            return _.random(0, value) + 1;
        }
        else {
            value = value;
            return value[_.random(0, value.length - 1)];
        }
        return null;
    }
};
SimulatorDataService.ctorParameters = () => [
    { type: FirebaseDataService },
    { type: NotificationService }
];
SimulatorDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SimulatorDataService_Factory() { return new SimulatorDataService(i0.ɵɵinject(i1.FirebaseDataService), i0.ɵɵinject(i2.NotificationService)); }, token: SimulatorDataService, providedIn: "root" });
SimulatorDataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SimulatorDataService);
export { SimulatorDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RhdGEvc2ltdWxhdG9yLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFJdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQVUsUUFBUSxFQUFFLGVBQWUsRUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdEQUF3RCxDQUFDO0FBQzdGLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQzs7OztBQUs1QixJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQUUvQixZQUFvQixvQkFBeUMsRUFDekMsb0JBQXlDO1FBRHpDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtJQUU3RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0csS0FBSzs7UUFFWCxDQUFDO0tBQUE7SUFFRCxJQUFJO0lBRUosQ0FBQztJQUVEOzs7O09BSUc7SUFDRyxhQUFhLENBQUMsSUFBWSxDQUFDOztZQUMvQixJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3RCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxvQkFBb0Is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Ozs7T0FJRztJQUNILFNBQVMsQ0FBQyxLQUFxQjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxLQUFLLEdBQUcsS0FBeUIsQ0FBQztZQUNsQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRixDQUFBOztZQTlHMkMsbUJBQW1CO1lBQ25CLG1CQUFtQjs7O0FBSGxELG9CQUFvQjtJQUhoQyxVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0dBQ1csb0JBQW9CLENBZ0hoQztTQWhIWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQge0ZpcmViYXNlRGF0YVNlcnZpY2V9IGZyb20gXCIuLi9maXJlYmFzZS9maXJlYmFzZS1kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtDdXN0b21lcn0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9jdXN0b21lci9jdXN0b21lclwiO1xyXG5pbXBvcnQge1Jlc3RhdXJhbnR9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvcmVzdGF1cmFudC9yZXN0YXVyYW50XCI7XHJcbmltcG9ydCB7TWVhbH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9tZWFsL21lYWxcIjtcclxuaW1wb3J0IHtPcmRlcn0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlci9vcmRlclwiO1xyXG5pbXBvcnQge09yZGVySXRlbX0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlcl9pdGVtL29yZGVyLWl0ZW1cIjtcclxuaW1wb3J0IHtOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tIFwiLi4vbWljcy9ub3RpZmljYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQge0NvdXJpZXIsIERlbGl2ZXJ5LCBEZWxpdmVyeV9TdGF0dXMsIFBvaW50fSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzXCI7XHJcbmltcG9ydCB7RGVsaXZlcnlTdGF0dXNIaXN0b3J5fSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL2RlbGl2ZXJ5L2RlbGl2ZXJ5LXN0YXR1cy1oaXN0b3J5XCI7XHJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2ltdWxhdG9yRGF0YVNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9GaXJlYmFzZURhdGFTZXJ2aWNlOiBGaXJlYmFzZURhdGFTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX05vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzdGFydCBzaW11bGF0b3JcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyBzdGFydCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICBzdG9wKCkge1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJhbmRvbWx5IGdlbmVyYXRlIG4gbnVtYmVyIG9mIG9yZGVyc1xyXG4gICAqIEBwYXJhbSBuXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgZ2VuZXJhdGVPcmRlcihuOiBudW1iZXIgPSAxKSB7XHJcbiAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKGBnZW5lcmF0ZSAke259IG9yZGVyYCk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xyXG4gICAgICB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmdldEN1c3RvbWVyKCksXHJcbiAgICAgIHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuZ2V0UmVzdGF1cmFudCgpLFxyXG4gICAgICB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmdldENvdXJpZXIoKSxcclxuICAgIF0pXHJcbiAgICAgIC50aGVuKGFzeW5jIChbY3VzdG9tZXJzLCByZXN0YXVyYW50cywgY291cmllcnNdKSA9PiB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgIGF3YWl0IHRoaXMuZ2VuZXJhdGVPbmVPcmRlcihjdXN0b21lcnMsIHJlc3RhdXJhbnRzLCBjb3VyaWVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZW5lcmF0ZSAxIG9yZGVyLCAxIG9yZGVyIGl0ZW0sIDEgZGVsaXZlcnksIDEgZGVsaXZlcnkgc3RhdHVzIGhpc3RvcnlcclxuICAgKiBAcGFyYW0gY3VzdG9tZXJzXHJcbiAgICogQHBhcmFtIHJlc3RhdXJhbnRzXHJcbiAgICogQHBhcmFtIGNvdXJpZXJzXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgZ2VuZXJhdGVPbmVPcmRlcihjdXN0b21lcnM6IEN1c3RvbWVyW10sIHJlc3RhdXJhbnRzOiBSZXN0YXVyYW50W10sIGNvdXJpZXJzOiBDb3VyaWVyW10pIHtcclxuICAgIGNvbnN0IGN1c3RvbWVyOiBDdXN0b21lciA9IHRoaXMuZ2V0UmFuZG9tKGN1c3RvbWVycyk7XHJcbiAgICBjb25zdCByZXN0YXVyYW50OiBSZXN0YXVyYW50ID0gdGhpcy5nZXRSYW5kb20ocmVzdGF1cmFudHMpO1xyXG4gICAgY29uc3QgbWVhbDogTWVhbCA9IHRoaXMuZ2V0UmFuZG9tKHJlc3RhdXJhbnQubWVhbHMpO1xyXG4gICAgY29uc3QgY291cmllcjogQ291cmllciA9IHRoaXMuZ2V0UmFuZG9tKGNvdXJpZXJzKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgb3JkZXJcclxuICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKHtcclxuICAgICAgZGF0ZV90aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgcmVzdGF1cmFudF9pZDogcmVzdGF1cmFudC5pZCxcclxuICAgICAgY3VzdG9tZXJfaWQ6IGN1c3RvbWVyLmlkXHJcbiAgICB9KTtcclxuXHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmNyZWF0ZVdpdGhPYmplY3Qob3JkZXIpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBvcmRlciBpdGVtXHJcbiAgICBjb25zdCBvcmRlckl0ZW0gPSBuZXcgT3JkZXJJdGVtKFxyXG4gICAgICB7XHJcbiAgICAgICAgbWVhbF9pZDogbWVhbC5pZCxcclxuICAgICAgICBxdWFudGl0eTogdGhpcy5nZXRSYW5kb20oNSksXHJcbiAgICAgICAgb3JkZXJfaWQ6IG9yZGVyLmlkXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBvcmRlckl0ZW0ubWVhbCA9IG1lYWw7XHJcbiAgICBvcmRlckl0ZW0ub3JkZXIgPSBvcmRlcjtcclxuXHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmNyZWF0ZVdpdGhPYmplY3Qob3JkZXJJdGVtKTtcclxuICAgIG9yZGVyLnRvdGFsICs9IG9yZGVySXRlbS5tZWFsLnByaWNlICogb3JkZXJJdGVtLnF1YW50aXR5O1xyXG4gICAgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS51cGRhdGVXaXRoT2JqZWN0KG9yZGVyKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgZGVsaXZlcnlcclxuICAgIGNvbnN0IGRlbGl2ZXJ5ID0gbmV3IERlbGl2ZXJ5KFxyXG4gICAgICB7XHJcbiAgICAgICAgcG9pbnRzOiBbXSxcclxuICAgICAgICBjb3VyaWVyX2lkOiBjb3VyaWVyLmlkLFxyXG4gICAgICAgIG9yZGVyX2lkOiBvcmRlci5pZFxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuY3JlYXRlV2l0aE9iamVjdChkZWxpdmVyeSk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGRlbGl2ZXJ5IHN0YXR1c1xyXG4gICAgY29uc3QgZGVsaXZlcnlTdGF0dXNIaXN0b3J5ID0gbmV3IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSh7XHJcbiAgICAgIHN0YXR1czogRGVsaXZlcnlfU3RhdHVzLk9SREVSRUQsXHJcbiAgICAgIGRlbGl2ZXJ5X2lkOiBkZWxpdmVyeS5pZCxcclxuICAgICAgZGF0ZV90aW1lOiBtb21lbnQoKS52YWx1ZU9mKClcclxuICAgIH0pO1xyXG5cclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuY3JlYXRlV2l0aE9iamVjdChkZWxpdmVyeVN0YXR1c0hpc3RvcnkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IHJhbmRvbVxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqIEByZXR1cm5zIHthbnkgfCBudWxsIHwgbnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldFJhbmRvbSh2YWx1ZTogYW55W10gfCBudW1iZXIpOiBhbnkge1xyXG4gICAgaWYgKCFpc05hTihOdW1iZXIodmFsdWUpKSkge1xyXG4gICAgICByZXR1cm4gXy5yYW5kb20oMCwgdmFsdWUpICsgMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gdmFsdWUgYXMgdW5rbm93biBhcyBhbnlbXTtcclxuICAgICAgcmV0dXJuIHZhbHVlW18ucmFuZG9tKDAsIHZhbHVlLmxlbmd0aCAtIDEpXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuIl19