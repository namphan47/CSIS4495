import { __awaiter, __decorate } from "tslib";
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
let SimulatorDataService = class SimulatorDataService {
    constructor(_FirebaseDataService, _NotificationService, _MapService) {
        this._FirebaseDataService = _FirebaseDataService;
        this._NotificationService = _NotificationService;
        this._MapService = _MapService;
    }
    /**
     * start simulator
     * @returns {Promise<void>}
     */
    start(time = 2000) {
        return __awaiter(this, void 0, void 0, function* () {
            this._NotificationService.pushMessage(SIMULATOR_MESSAGE.START);
            // get delivery list
            let deliveryList;
            yield this._FirebaseDataService.getDeliveries().then((rs) => deliveryList = rs);
            deliveryList = _.filter(deliveryList, (x) => {
                return x.currentStatus.status !== Delivery_Status.DELIVERED;
            });
            if (deliveryList.length === 0) {
                this._NotificationService.pushMessage(SIMULATOR_MESSAGE.STOP);
                return Promise.resolve();
            }
            // get order list
            let orderList;
            yield this._FirebaseDataService.getOrders().then((rs) => orderList = rs);
            _.map(deliveryList, (x) => {
                x.order = _.find(orderList, o => o.id == x.order_id);
            });
            let deliveredDeliveryList = [];
            let interval = setInterval(() => {
                if (deliveryList.length === deliveredDeliveryList.length) {
                    if (interval !== null) {
                        clearInterval(interval);
                    }
                    this._NotificationService.pushMessage(SIMULATOR_MESSAGE.STOP);
                }
                console.log('step');
                _.map(deliveryList, (x) => __awaiter(this, void 0, void 0, function* () {
                    yield this.handleDelivery(x);
                }));
                deliveredDeliveryList = _.filter(deliveryList, (x) => {
                    return x.currentStatus.status === Delivery_Status.DELIVERED;
                });
                this._NotificationService.pushMessage(SIMULATOR_MESSAGE.STEP);
            }, time);
        });
    }
    handleDelivery(delivery) {
        return __awaiter(this, void 0, void 0, function* () {
            if (delivery.timeToNextStatus >= moment().valueOf()) {
                return Promise.resolve();
            }
            delivery.timeToNextStatus = moment().valueOf() + _.random(5, 10) * 1000;
            let nextStatus = null;
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
                    return Promise.resolve();
            }
            const statusHistory = new DeliveryStatusHistory({
                status: nextStatus,
                delivery_id: delivery.id,
                date_time: moment().valueOf()
            });
            yield this._FirebaseDataService.createWithObject(statusHistory);
            yield this._FirebaseDataService
                .getStatusHistoryOfDelivery([new QueryParamModel('delivery_id', QueryParamModel.OPERATIONS.EQUAL, delivery.id)])
                .then((rs) => {
                delivery.setStatusHistory(rs);
                console.log(delivery);
            });
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
            yield this._FirebaseDataService.updateWithObject(order);
            // create delivery
            const delivery = new Delivery({
                points: [],
                courier_id: courier.id,
                order_id: order.id
            });
            // add paths
            yield this._MapService.renderDirection(new google.maps.LatLng(courier.lat, courier.lng), new google.maps.LatLng(restaurant.lat, restaurant.lng))
                .then((rs) => {
                delivery.path_to_restaurant = rs;
            });
            yield this._MapService.renderDirection(new google.maps.LatLng(restaurant.lat, restaurant.lng), new google.maps.LatLng(customer.lat, customer.lng))
                .then((rs) => {
                delivery.path_to_customer = rs;
            });
            console.log(delivery);
            console.log(delivery.getData());
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
SimulatorDataService.MESSAGE = SIMULATOR_MESSAGE;
SimulatorDataService.ctorParameters = () => [
    { type: FirebaseDataService },
    { type: NotificationService },
    { type: MapService }
];
SimulatorDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SimulatorDataService_Factory() { return new SimulatorDataService(i0.ɵɵinject(i1.FirebaseDataService), i0.ɵɵinject(i2.NotificationService), i0.ɵɵinject(i3.MapService)); }, token: SimulatorDataService, providedIn: "root" });
SimulatorDataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SimulatorDataService);
export { SimulatorDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RhdGEvc2ltdWxhdG9yLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFJdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQVUsUUFBUSxFQUFFLGVBQWUsRUFBUyxlQUFlLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUM3RixPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7OztBQUU5QyxJQUFLLGlCQUlKO0FBSkQsV0FBSyxpQkFBaUI7SUFDcEIsOENBQXlCLENBQUE7SUFDekIsNENBQXVCLENBQUE7SUFDdkIsNENBQXVCLENBQUE7QUFDekIsQ0FBQyxFQUpJLGlCQUFpQixLQUFqQixpQkFBaUIsUUFJckI7QUFBQSxDQUFDO0FBS0YsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFHL0IsWUFBb0Isb0JBQXlDLEVBQ3pDLG9CQUF5QyxFQUN6QyxXQUF1QjtRQUZ2Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsZ0JBQVcsR0FBWCxXQUFX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QUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDMUUsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNILFNBQVMsQ0FBQyxLQUFxQjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxLQUFLLEdBQUcsS0FBeUIsQ0FBQztZQUNsQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRixDQUFBO0FBaE5RLDRCQUFPLEdBQUcsaUJBQWlCLENBQUM7O1lBRU8sbUJBQW1CO1lBQ25CLG1CQUFtQjtZQUM1QixVQUFVOzs7QUFMaEMsb0JBQW9CO0lBSGhDLFVBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7R0FDVyxvQkFBb0IsQ0FpTmhDO1NBak5ZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7RmlyZWJhc2VEYXRhU2VydmljZX0gZnJvbSBcIi4uL2ZpcmViYXNlL2ZpcmViYXNlLWRhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQge0N1c3RvbWVyfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL2N1c3RvbWVyL2N1c3RvbWVyXCI7XHJcbmltcG9ydCB7UmVzdGF1cmFudH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnRcIjtcclxuaW1wb3J0IHtNZWFsfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL21lYWwvbWVhbFwiO1xyXG5pbXBvcnQge09yZGVyfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyL29yZGVyXCI7XHJcbmltcG9ydCB7T3JkZXJJdGVtfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyX2l0ZW0vb3JkZXItaXRlbVwiO1xyXG5pbXBvcnQge05vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gXCIuLi9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7Q291cmllciwgRGVsaXZlcnksIERlbGl2ZXJ5X1N0YXR1cywgUG9pbnQsIFF1ZXJ5UGFyYW1Nb2RlbH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVsc1wiO1xyXG5pbXBvcnQge0RlbGl2ZXJ5U3RhdHVzSGlzdG9yeX0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9kZWxpdmVyeS9kZWxpdmVyeS1zdGF0dXMtaGlzdG9yeVwiO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IHtNYXBTZXJ2aWNlfSBmcm9tIFwiLi4vbWFwL21hcC5zZXJ2aWNlXCI7XHJcblxyXG5lbnVtIFNJTVVMQVRPUl9NRVNTQUdFIHtcclxuICBTVEFSVCA9ICdzaW11bGF0b3Igc3RhcnQnLFxyXG4gIFNURVAgPSAnc2ltdWxhdG9yIHN0ZXAnLFxyXG4gIFNUT1AgPSAnc2ltdWxhdG9yIHN0b3AnLFxyXG59O1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2ltdWxhdG9yRGF0YVNlcnZpY2Uge1xyXG4gIHN0YXRpYyBNRVNTQUdFID0gU0lNVUxBVE9SX01FU1NBR0U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX0ZpcmViYXNlRGF0YVNlcnZpY2U6IEZpcmViYXNlRGF0YVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfTm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9NYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc3RhcnQgc2ltdWxhdG9yXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgc3RhcnQodGltZTogbnVtYmVyID0gMjAwMCkge1xyXG4gICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShTSU1VTEFUT1JfTUVTU0FHRS5TVEFSVCk7XHJcblxyXG4gICAgLy8gZ2V0IGRlbGl2ZXJ5IGxpc3RcclxuICAgIGxldCBkZWxpdmVyeUxpc3Q6IERlbGl2ZXJ5W107XHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmdldERlbGl2ZXJpZXMoKS50aGVuKChycykgPT4gZGVsaXZlcnlMaXN0ID0gcnMpO1xyXG4gICAgZGVsaXZlcnlMaXN0ID0gXy5maWx0ZXIoZGVsaXZlcnlMaXN0LCAoeDogRGVsaXZlcnkpID0+IHtcclxuICAgICAgcmV0dXJuIHguY3VycmVudFN0YXR1cy5zdGF0dXMgIT09IERlbGl2ZXJ5X1N0YXR1cy5ERUxJVkVSRUQ7XHJcbiAgICB9KTtcclxuICAgIGlmIChkZWxpdmVyeUxpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoU0lNVUxBVE9SX01FU1NBR0UuU1RPUCk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXQgb3JkZXIgbGlzdFxyXG4gICAgbGV0IG9yZGVyTGlzdDtcclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuZ2V0T3JkZXJzKCkudGhlbigocnMpID0+IG9yZGVyTGlzdCA9IHJzKTtcclxuICAgIF8ubWFwKGRlbGl2ZXJ5TGlzdCwgKHg6IERlbGl2ZXJ5KSA9PiB7XHJcbiAgICAgIHgub3JkZXIgPSBfLmZpbmQob3JkZXJMaXN0LCBvID0+IG8uaWQgPT0geC5vcmRlcl9pZCk7XHJcbiAgICB9KVxyXG5cclxuICAgIGxldCBkZWxpdmVyZWREZWxpdmVyeUxpc3QgPSBbXTtcclxuICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgaWYgKGRlbGl2ZXJ5TGlzdC5sZW5ndGggPT09IGRlbGl2ZXJlZERlbGl2ZXJ5TGlzdC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgIT09IG51bGwpIHtcclxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKFNJTVVMQVRPUl9NRVNTQUdFLlNUT1ApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZygnc3RlcCcpO1xyXG4gICAgICBfLm1hcChkZWxpdmVyeUxpc3QsIGFzeW5jICh4KSA9PiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVEZWxpdmVyeSh4KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBkZWxpdmVyZWREZWxpdmVyeUxpc3QgPSBfLmZpbHRlcihkZWxpdmVyeUxpc3QsICh4OiBEZWxpdmVyeSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB4LmN1cnJlbnRTdGF0dXMuc3RhdHVzID09PSBEZWxpdmVyeV9TdGF0dXMuREVMSVZFUkVEO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShTSU1VTEFUT1JfTUVTU0FHRS5TVEVQKTtcclxuXHJcbiAgICB9LCB0aW1lKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGhhbmRsZURlbGl2ZXJ5KGRlbGl2ZXJ5OiBEZWxpdmVyeSkge1xyXG4gICAgaWYgKGRlbGl2ZXJ5LnRpbWVUb05leHRTdGF0dXMgPj0gbW9tZW50KCkudmFsdWVPZigpKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxpdmVyeS50aW1lVG9OZXh0U3RhdHVzID0gbW9tZW50KCkudmFsdWVPZigpICsgXy5yYW5kb20oNSwgMTApICogMTAwMDtcclxuXHJcbiAgICBsZXQgbmV4dFN0YXR1cyA9IG51bGw7XHJcblxyXG4gICAgc3dpdGNoIChkZWxpdmVyeS5jdXJyZW50U3RhdHVzLnN0YXR1cykge1xyXG4gICAgICBjYXNlIERlbGl2ZXJ5X1N0YXR1cy5PUkRFUkVEOlxyXG4gICAgICAgIG5leHRTdGF0dXMgPSBEZWxpdmVyeV9TdGF0dXMuUFJFUEFSSU5HO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERlbGl2ZXJ5X1N0YXR1cy5QUkVQQVJJTkc6XHJcbiAgICAgICAgbmV4dFN0YXR1cyA9IERlbGl2ZXJ5X1N0YXR1cy5XQUlUX0ZPUl9QSUNLX1VQO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERlbGl2ZXJ5X1N0YXR1cy5XQUlUX0ZPUl9QSUNLX1VQOlxyXG4gICAgICAgIG5leHRTdGF0dXMgPSBEZWxpdmVyeV9TdGF0dXMuREVMSVZFUklORztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBEZWxpdmVyeV9TdGF0dXMuREVMSVZFUklORzpcclxuICAgICAgICBuZXh0U3RhdHVzID0gRGVsaXZlcnlfU3RhdHVzLkRFTElWRVJFRDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGF0dXNIaXN0b3J5ID0gbmV3IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSh7XHJcbiAgICAgIHN0YXR1czogbmV4dFN0YXR1cyxcclxuICAgICAgZGVsaXZlcnlfaWQ6IGRlbGl2ZXJ5LmlkLFxyXG4gICAgICBkYXRlX3RpbWU6IG1vbWVudCgpLnZhbHVlT2YoKVxyXG4gICAgfSk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KHN0YXR1c0hpc3RvcnkpO1xyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZVxyXG4gICAgICAuZ2V0U3RhdHVzSGlzdG9yeU9mRGVsaXZlcnkoW25ldyBRdWVyeVBhcmFtTW9kZWwoJ2RlbGl2ZXJ5X2lkJywgUXVlcnlQYXJhbU1vZGVsLk9QRVJBVElPTlMuRVFVQUwsIGRlbGl2ZXJ5LmlkKV0pXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIGRlbGl2ZXJ5LnNldFN0YXR1c0hpc3RvcnkocnMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRlbGl2ZXJ5KTtcclxuICAgICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgc3RvcCgpIHtcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogcmFuZG9tbHkgZ2VuZXJhdGUgbiBudW1iZXIgb2Ygb3JkZXJzXHJcbiAgICogQHBhcmFtIG5cclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyBnZW5lcmF0ZU9yZGVyKG46IG51bWJlciA9IDEpIHtcclxuICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYGdlbmVyYXRlICR7bn0gb3JkZXJgKTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChbXHJcbiAgICAgIHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuZ2V0Q3VzdG9tZXIoKSxcclxuICAgICAgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5nZXRSZXN0YXVyYW50KCksXHJcbiAgICAgIHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuZ2V0Q291cmllcigpLFxyXG4gICAgXSlcclxuICAgICAgLnRoZW4oYXN5bmMgKFtjdXN0b21lcnMsIHJlc3RhdXJhbnRzLCBjb3VyaWVyc10pID0+IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZW5lcmF0ZU9uZU9yZGVyKGN1c3RvbWVycywgcmVzdGF1cmFudHMsIGNvdXJpZXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdlbmVyYXRlIDEgb3JkZXIsIDEgb3JkZXIgaXRlbSwgMSBkZWxpdmVyeSwgMSBkZWxpdmVyeSBzdGF0dXMgaGlzdG9yeVxyXG4gICAqIEBwYXJhbSBjdXN0b21lcnNcclxuICAgKiBAcGFyYW0gcmVzdGF1cmFudHNcclxuICAgKiBAcGFyYW0gY291cmllcnNcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyBnZW5lcmF0ZU9uZU9yZGVyKGN1c3RvbWVyczogQ3VzdG9tZXJbXSwgcmVzdGF1cmFudHM6IFJlc3RhdXJhbnRbXSwgY291cmllcnM6IENvdXJpZXJbXSkge1xyXG4gICAgY29uc3QgY3VzdG9tZXI6IEN1c3RvbWVyID0gdGhpcy5nZXRSYW5kb20oY3VzdG9tZXJzKTtcclxuICAgIGNvbnN0IHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQgPSB0aGlzLmdldFJhbmRvbShyZXN0YXVyYW50cyk7XHJcbiAgICBjb25zdCBtZWFsOiBNZWFsID0gdGhpcy5nZXRSYW5kb20ocmVzdGF1cmFudC5tZWFscyk7XHJcbiAgICBjb25zdCBjb3VyaWVyOiBDb3VyaWVyID0gdGhpcy5nZXRSYW5kb20oY291cmllcnMpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBvcmRlclxyXG4gICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoe1xyXG4gICAgICBkYXRlX3RpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG4gICAgICByZXN0YXVyYW50X2lkOiByZXN0YXVyYW50LmlkLFxyXG4gICAgICBjdXN0b21lcl9pZDogY3VzdG9tZXIuaWRcclxuICAgIH0pO1xyXG5cclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuY3JlYXRlV2l0aE9iamVjdChvcmRlcik7XHJcblxyXG4gICAgLy8gY3JlYXRlIG9yZGVyIGl0ZW1cclxuICAgIGNvbnN0IG9yZGVySXRlbSA9IG5ldyBPcmRlckl0ZW0oXHJcbiAgICAgIHtcclxuICAgICAgICBtZWFsX2lkOiBtZWFsLmlkLFxyXG4gICAgICAgIHF1YW50aXR5OiB0aGlzLmdldFJhbmRvbSg1KSxcclxuICAgICAgICBvcmRlcl9pZDogb3JkZXIuaWRcclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIG9yZGVySXRlbS5tZWFsID0gbWVhbDtcclxuICAgIG9yZGVySXRlbS5vcmRlciA9IG9yZGVyO1xyXG5cclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuY3JlYXRlV2l0aE9iamVjdChvcmRlckl0ZW0pO1xyXG4gICAgb3JkZXIudG90YWwgKz0gb3JkZXJJdGVtLm1lYWwucHJpY2UgKiBvcmRlckl0ZW0ucXVhbnRpdHk7XHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLnVwZGF0ZVdpdGhPYmplY3Qob3JkZXIpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBkZWxpdmVyeVxyXG4gICAgY29uc3QgZGVsaXZlcnkgPSBuZXcgRGVsaXZlcnkoXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IFtdLFxyXG4gICAgICAgIGNvdXJpZXJfaWQ6IGNvdXJpZXIuaWQsXHJcbiAgICAgICAgb3JkZXJfaWQ6IG9yZGVyLmlkXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgLy8gYWRkIHBhdGhzXHJcbiAgICBhd2FpdCB0aGlzLl9NYXBTZXJ2aWNlLnJlbmRlckRpcmVjdGlvbihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGNvdXJpZXIubGF0LCBjb3VyaWVyLmxuZyksIG5ldyBnb29nbGUubWFwcy5MYXRMbmcocmVzdGF1cmFudC5sYXQsIHJlc3RhdXJhbnQubG5nKSlcclxuICAgICAgLnRoZW4oKHJzKSA9PiB7XHJcbiAgICAgICAgZGVsaXZlcnkucGF0aF90b19yZXN0YXVyYW50ID0gcnM7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGF3YWl0IHRoaXMuX01hcFNlcnZpY2UucmVuZGVyRGlyZWN0aW9uKG5ldyBnb29nbGUubWFwcy5MYXRMbmcocmVzdGF1cmFudC5sYXQsIHJlc3RhdXJhbnQubG5nKSwgbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhjdXN0b21lci5sYXQsIGN1c3RvbWVyLmxuZykpXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIGRlbGl2ZXJ5LnBhdGhfdG9fY3VzdG9tZXIgPSBycztcclxuICAgICAgfSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coZGVsaXZlcnkpO1xyXG4gICAgY29uc29sZS5sb2coZGVsaXZlcnkuZ2V0RGF0YSgpKTtcclxuXHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmNyZWF0ZVdpdGhPYmplY3QoZGVsaXZlcnkpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBkZWxpdmVyeSBzdGF0dXNcclxuICAgIGNvbnN0IGRlbGl2ZXJ5U3RhdHVzSGlzdG9yeSA9IG5ldyBEZWxpdmVyeVN0YXR1c0hpc3Rvcnkoe1xyXG4gICAgICBzdGF0dXM6IERlbGl2ZXJ5X1N0YXR1cy5PUkRFUkVELFxyXG4gICAgICBkZWxpdmVyeV9pZDogZGVsaXZlcnkuaWQsXHJcbiAgICAgIGRhdGVfdGltZTogbW9tZW50KCkudmFsdWVPZigpXHJcbiAgICB9KTtcclxuXHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmNyZWF0ZVdpdGhPYmplY3QoZGVsaXZlcnlTdGF0dXNIaXN0b3J5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCByYW5kb21cclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKiBAcmV0dXJucyB7YW55IHwgbnVsbCB8IG51bWJlcn1cclxuICAgKi9cclxuICBnZXRSYW5kb20odmFsdWU6IGFueVtdIHwgbnVtYmVyKTogYW55IHtcclxuICAgIGlmICghaXNOYU4oTnVtYmVyKHZhbHVlKSkpIHtcclxuICAgICAgcmV0dXJuIF8ucmFuZG9tKDAsIHZhbHVlKSArIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWx1ZSA9IHZhbHVlIGFzIHVua25vd24gYXMgYW55W107XHJcbiAgICAgIHJldHVybiB2YWx1ZVtfLnJhbmRvbSgwLCB2YWx1ZS5sZW5ndGggLSAxKV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuIl19