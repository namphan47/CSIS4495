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
            this._FirebaseDataService.updateWithObject(order);
            // create delivery
            const delivery = new Delivery({
                points: [],
                courier_id: courier.id,
                order_id: order.id
            });
            // add paths
            yield this._MapService.renderDirection(new google.maps.LatLng(courier.lat, courier.long), new google.maps.LatLng(parseInt(restaurant.lat), parseInt(restaurant.long)))
                .then((rs) => {
                delivery.path_to_restaurant = rs;
            });
            yield this._MapService.renderDirection(new google.maps.LatLng(parseInt(restaurant.lat), parseInt(restaurant.long)), new google.maps.LatLng(parseInt(customer.lat), parseInt(customer.long)))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RhdGEvc2ltdWxhdG9yLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFJdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQVUsUUFBUSxFQUFFLGVBQWUsRUFBUyxlQUFlLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUM3RixPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7OztBQUU5QyxJQUFLLGlCQUlKO0FBSkQsV0FBSyxpQkFBaUI7SUFDcEIsOENBQXlCLENBQUE7SUFDekIsNENBQXVCLENBQUE7SUFDdkIsNENBQXVCLENBQUE7QUFDekIsQ0FBQyxFQUpJLGlCQUFpQixLQUFqQixpQkFBaUIsUUFJckI7QUFBQSxDQUFDO0FBS0YsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFHL0IsWUFBb0Isb0JBQXlDLEVBQ3pDLG9CQUF5QyxFQUN6QyxXQUF1QjtRQUZ2Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsZ0JBQVcsR0FBWCxXQUFX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QkFDeEIsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRTthQUM5QixDQUFDLENBQUM7WUFFSCxNQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzFFLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDSCxTQUFTLENBQUMsS0FBcUI7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN6QixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMvQjthQUFNO1lBQ0wsS0FBSyxHQUFHLEtBQXlCLENBQUM7WUFDbEMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YsQ0FBQTtBQS9NUSw0QkFBTyxHQUFHLGlCQUFpQixDQUFDOztZQUVPLG1CQUFtQjtZQUNuQixtQkFBbUI7WUFDNUIsVUFBVTs7O0FBTGhDLG9CQUFvQjtJQUhoQyxVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0dBQ1csb0JBQW9CLENBZ05oQztTQWhOWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQge0ZpcmViYXNlRGF0YVNlcnZpY2V9IGZyb20gXCIuLi9maXJlYmFzZS9maXJlYmFzZS1kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtDdXN0b21lcn0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9jdXN0b21lci9jdXN0b21lclwiO1xyXG5pbXBvcnQge1Jlc3RhdXJhbnR9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvcmVzdGF1cmFudC9yZXN0YXVyYW50XCI7XHJcbmltcG9ydCB7TWVhbH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9tZWFsL21lYWxcIjtcclxuaW1wb3J0IHtPcmRlcn0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlci9vcmRlclwiO1xyXG5pbXBvcnQge09yZGVySXRlbX0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlcl9pdGVtL29yZGVyLWl0ZW1cIjtcclxuaW1wb3J0IHtOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tIFwiLi4vbWljcy9ub3RpZmljYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQge0NvdXJpZXIsIERlbGl2ZXJ5LCBEZWxpdmVyeV9TdGF0dXMsIFBvaW50LCBRdWVyeVBhcmFtTW9kZWx9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHNcIjtcclxuaW1wb3J0IHtEZWxpdmVyeVN0YXR1c0hpc3Rvcnl9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnktc3RhdHVzLWhpc3RvcnlcIjtcclxuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcbmltcG9ydCB7TWFwU2VydmljZX0gZnJvbSBcIi4uL21hcC9tYXAuc2VydmljZVwiO1xyXG5cclxuZW51bSBTSU1VTEFUT1JfTUVTU0FHRSB7XHJcbiAgU1RBUlQgPSAnc2ltdWxhdG9yIHN0YXJ0JyxcclxuICBTVEVQID0gJ3NpbXVsYXRvciBzdGVwJyxcclxuICBTVE9QID0gJ3NpbXVsYXRvciBzdG9wJyxcclxufTtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNpbXVsYXRvckRhdGFTZXJ2aWNlIHtcclxuICBzdGF0aWMgTUVTU0FHRSA9IFNJTVVMQVRPUl9NRVNTQUdFO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9GaXJlYmFzZURhdGFTZXJ2aWNlOiBGaXJlYmFzZURhdGFTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX05vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfTWFwU2VydmljZTogTWFwU2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0YXJ0IHNpbXVsYXRvclxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIHN0YXJ0KHRpbWU6IG51bWJlciA9IDIwMDApIHtcclxuICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoU0lNVUxBVE9SX01FU1NBR0UuU1RBUlQpO1xyXG5cclxuICAgIC8vIGdldCBkZWxpdmVyeSBsaXN0XHJcbiAgICBsZXQgZGVsaXZlcnlMaXN0OiBEZWxpdmVyeVtdO1xyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5nZXREZWxpdmVyaWVzKCkudGhlbigocnMpID0+IGRlbGl2ZXJ5TGlzdCA9IHJzKTtcclxuICAgIGRlbGl2ZXJ5TGlzdCA9IF8uZmlsdGVyKGRlbGl2ZXJ5TGlzdCwgKHg6IERlbGl2ZXJ5KSA9PiB7XHJcbiAgICAgIHJldHVybiB4LmN1cnJlbnRTdGF0dXMuc3RhdHVzICE9PSBEZWxpdmVyeV9TdGF0dXMuREVMSVZFUkVEO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoZGVsaXZlcnlMaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKFNJTVVMQVRPUl9NRVNTQUdFLlNUT1ApO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2V0IG9yZGVyIGxpc3RcclxuICAgIGxldCBvcmRlckxpc3Q7XHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmdldE9yZGVycygpLnRoZW4oKHJzKSA9PiBvcmRlckxpc3QgPSBycyk7XHJcbiAgICBfLm1hcChkZWxpdmVyeUxpc3QsICh4OiBEZWxpdmVyeSkgPT4ge1xyXG4gICAgICB4Lm9yZGVyID0gXy5maW5kKG9yZGVyTGlzdCwgbyA9PiBvLmlkID09IHgub3JkZXJfaWQpO1xyXG4gICAgfSlcclxuXHJcbiAgICBsZXQgZGVsaXZlcmVkRGVsaXZlcnlMaXN0ID0gW107XHJcbiAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGlmIChkZWxpdmVyeUxpc3QubGVuZ3RoID09PSBkZWxpdmVyZWREZWxpdmVyeUxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKGludGVydmFsICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShTSU1VTEFUT1JfTUVTU0FHRS5TVE9QKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coJ3N0ZXAnKTtcclxuICAgICAgXy5tYXAoZGVsaXZlcnlMaXN0LCBhc3luYyAoeCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlRGVsaXZlcnkoeCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZGVsaXZlcmVkRGVsaXZlcnlMaXN0ID0gXy5maWx0ZXIoZGVsaXZlcnlMaXN0LCAoeDogRGVsaXZlcnkpID0+IHtcclxuICAgICAgICByZXR1cm4geC5jdXJyZW50U3RhdHVzLnN0YXR1cyA9PT0gRGVsaXZlcnlfU3RhdHVzLkRFTElWRVJFRDtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoU0lNVUxBVE9SX01FU1NBR0UuU1RFUCk7XHJcblxyXG4gICAgfSwgdGltZSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBoYW5kbGVEZWxpdmVyeShkZWxpdmVyeTogRGVsaXZlcnkpIHtcclxuICAgIGlmIChkZWxpdmVyeS50aW1lVG9OZXh0U3RhdHVzID49IG1vbWVudCgpLnZhbHVlT2YoKSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsaXZlcnkudGltZVRvTmV4dFN0YXR1cyA9IG1vbWVudCgpLnZhbHVlT2YoKSArIF8ucmFuZG9tKDUsIDEwKSAqIDEwMDA7XHJcblxyXG4gICAgbGV0IG5leHRTdGF0dXMgPSBudWxsO1xyXG5cclxuICAgIHN3aXRjaCAoZGVsaXZlcnkuY3VycmVudFN0YXR1cy5zdGF0dXMpIHtcclxuICAgICAgY2FzZSBEZWxpdmVyeV9TdGF0dXMuT1JERVJFRDpcclxuICAgICAgICBuZXh0U3RhdHVzID0gRGVsaXZlcnlfU3RhdHVzLlBSRVBBUklORztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBEZWxpdmVyeV9TdGF0dXMuUFJFUEFSSU5HOlxyXG4gICAgICAgIG5leHRTdGF0dXMgPSBEZWxpdmVyeV9TdGF0dXMuV0FJVF9GT1JfUElDS19VUDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBEZWxpdmVyeV9TdGF0dXMuV0FJVF9GT1JfUElDS19VUDpcclxuICAgICAgICBuZXh0U3RhdHVzID0gRGVsaXZlcnlfU3RhdHVzLkRFTElWRVJJTkc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRGVsaXZlcnlfU3RhdHVzLkRFTElWRVJJTkc6XHJcbiAgICAgICAgbmV4dFN0YXR1cyA9IERlbGl2ZXJ5X1N0YXR1cy5ERUxJVkVSRUQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RhdHVzSGlzdG9yeSA9IG5ldyBEZWxpdmVyeVN0YXR1c0hpc3Rvcnkoe1xyXG4gICAgICBzdGF0dXM6IG5leHRTdGF0dXMsXHJcbiAgICAgIGRlbGl2ZXJ5X2lkOiBkZWxpdmVyeS5pZCxcclxuICAgICAgZGF0ZV90aW1lOiBtb21lbnQoKS52YWx1ZU9mKClcclxuICAgIH0pO1xyXG5cclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuY3JlYXRlV2l0aE9iamVjdChzdGF0dXNIaXN0b3J5KTtcclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2VcclxuICAgICAgLmdldFN0YXR1c0hpc3RvcnlPZkRlbGl2ZXJ5KFtuZXcgUXVlcnlQYXJhbU1vZGVsKCdkZWxpdmVyeV9pZCcsIFF1ZXJ5UGFyYW1Nb2RlbC5PUEVSQVRJT05TLkVRVUFMLCBkZWxpdmVyeS5pZCldKVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICBkZWxpdmVyeS5zZXRTdGF0dXNIaXN0b3J5KHJzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkZWxpdmVyeSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIHN0b3AoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmFuZG9tbHkgZ2VuZXJhdGUgbiBudW1iZXIgb2Ygb3JkZXJzXHJcbiAgICogQHBhcmFtIG5cclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyBnZW5lcmF0ZU9yZGVyKG46IG51bWJlciA9IDEpIHtcclxuICAgIHRoaXMuX05vdGlmaWNhdGlvblNlcnZpY2UucHVzaE1lc3NhZ2UoYGdlbmVyYXRlICR7bn0gb3JkZXJgKTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChbXHJcbiAgICAgIHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuZ2V0Q3VzdG9tZXIoKSxcclxuICAgICAgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5nZXRSZXN0YXVyYW50KCksXHJcbiAgICAgIHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuZ2V0Q291cmllcigpLFxyXG4gICAgXSlcclxuICAgICAgLnRoZW4oYXN5bmMgKFtjdXN0b21lcnMsIHJlc3RhdXJhbnRzLCBjb3VyaWVyc10pID0+IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgYXdhaXQgdGhpcy5nZW5lcmF0ZU9uZU9yZGVyKGN1c3RvbWVycywgcmVzdGF1cmFudHMsIGNvdXJpZXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdlbmVyYXRlIDEgb3JkZXIsIDEgb3JkZXIgaXRlbSwgMSBkZWxpdmVyeSwgMSBkZWxpdmVyeSBzdGF0dXMgaGlzdG9yeVxyXG4gICAqIEBwYXJhbSBjdXN0b21lcnNcclxuICAgKiBAcGFyYW0gcmVzdGF1cmFudHNcclxuICAgKiBAcGFyYW0gY291cmllcnNcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyBnZW5lcmF0ZU9uZU9yZGVyKGN1c3RvbWVyczogQ3VzdG9tZXJbXSwgcmVzdGF1cmFudHM6IFJlc3RhdXJhbnRbXSwgY291cmllcnM6IENvdXJpZXJbXSkge1xyXG4gICAgY29uc3QgY3VzdG9tZXI6IEN1c3RvbWVyID0gdGhpcy5nZXRSYW5kb20oY3VzdG9tZXJzKTtcclxuICAgIGNvbnN0IHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQgPSB0aGlzLmdldFJhbmRvbShyZXN0YXVyYW50cyk7XHJcbiAgICBjb25zdCBtZWFsOiBNZWFsID0gdGhpcy5nZXRSYW5kb20ocmVzdGF1cmFudC5tZWFscyk7XHJcbiAgICBjb25zdCBjb3VyaWVyOiBDb3VyaWVyID0gdGhpcy5nZXRSYW5kb20oY291cmllcnMpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBvcmRlclxyXG4gICAgY29uc3Qgb3JkZXIgPSBuZXcgT3JkZXIoe1xyXG4gICAgICBkYXRlX3RpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG4gICAgICByZXN0YXVyYW50X2lkOiByZXN0YXVyYW50LmlkLFxyXG4gICAgICBjdXN0b21lcl9pZDogY3VzdG9tZXIuaWRcclxuICAgIH0pO1xyXG5cclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuY3JlYXRlV2l0aE9iamVjdChvcmRlcik7XHJcblxyXG4gICAgLy8gY3JlYXRlIG9yZGVyIGl0ZW1cclxuICAgIGNvbnN0IG9yZGVySXRlbSA9IG5ldyBPcmRlckl0ZW0oXHJcbiAgICAgIHtcclxuICAgICAgICBtZWFsX2lkOiBtZWFsLmlkLFxyXG4gICAgICAgIHF1YW50aXR5OiB0aGlzLmdldFJhbmRvbSg1KSxcclxuICAgICAgICBvcmRlcl9pZDogb3JkZXIuaWRcclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIG9yZGVySXRlbS5tZWFsID0gbWVhbDtcclxuICAgIG9yZGVySXRlbS5vcmRlciA9IG9yZGVyO1xyXG5cclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuY3JlYXRlV2l0aE9iamVjdChvcmRlckl0ZW0pO1xyXG4gICAgb3JkZXIudG90YWwgKz0gb3JkZXJJdGVtLm1lYWwucHJpY2UgKiBvcmRlckl0ZW0ucXVhbnRpdHk7XHJcbiAgICB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLnVwZGF0ZVdpdGhPYmplY3Qob3JkZXIpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBkZWxpdmVyeVxyXG4gICAgY29uc3QgZGVsaXZlcnkgPSBuZXcgRGVsaXZlcnkoXHJcbiAgICAgIHtcclxuICAgICAgICBwb2ludHM6IFtdLFxyXG4gICAgICAgIGNvdXJpZXJfaWQ6IGNvdXJpZXIuaWQsXHJcbiAgICAgICAgb3JkZXJfaWQ6IG9yZGVyLmlkXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgLy8gYWRkIHBhdGhzXHJcbiAgICBhd2FpdCB0aGlzLl9NYXBTZXJ2aWNlLnJlbmRlckRpcmVjdGlvbihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGNvdXJpZXIubGF0LCBjb3VyaWVyLmxvbmcpLCBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHBhcnNlSW50KHJlc3RhdXJhbnQubGF0KSwgcGFyc2VJbnQocmVzdGF1cmFudC5sb25nKSkpXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIGRlbGl2ZXJ5LnBhdGhfdG9fcmVzdGF1cmFudCA9IHJzO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBhd2FpdCB0aGlzLl9NYXBTZXJ2aWNlLnJlbmRlckRpcmVjdGlvbihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHBhcnNlSW50KHJlc3RhdXJhbnQubGF0KSwgcGFyc2VJbnQocmVzdGF1cmFudC5sb25nKSksIG5ldyBnb29nbGUubWFwcy5MYXRMbmcocGFyc2VJbnQoY3VzdG9tZXIubGF0KSwgcGFyc2VJbnQoY3VzdG9tZXIubG9uZykpKVxyXG4gICAgICAudGhlbigocnMpID0+IHtcclxuICAgICAgICBkZWxpdmVyeS5wYXRoX3RvX2N1c3RvbWVyID0gcnM7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGRlbGl2ZXJ5KTtcclxuICAgIGNvbnNvbGUubG9nKGRlbGl2ZXJ5LmdldERhdGEoKSk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KGRlbGl2ZXJ5KTtcclxuXHJcbiAgICAvLyBjcmVhdGUgZGVsaXZlcnkgc3RhdHVzXHJcbiAgICBjb25zdCBkZWxpdmVyeVN0YXR1c0hpc3RvcnkgPSBuZXcgRGVsaXZlcnlTdGF0dXNIaXN0b3J5KHtcclxuICAgICAgc3RhdHVzOiBEZWxpdmVyeV9TdGF0dXMuT1JERVJFRCxcclxuICAgICAgZGVsaXZlcnlfaWQ6IGRlbGl2ZXJ5LmlkLFxyXG4gICAgICBkYXRlX3RpbWU6IG1vbWVudCgpLnZhbHVlT2YoKVxyXG4gICAgfSk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KGRlbGl2ZXJ5U3RhdHVzSGlzdG9yeSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgcmFuZG9tXHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICogQHJldHVybnMge2FueSB8IG51bGwgfCBudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0UmFuZG9tKHZhbHVlOiBhbnlbXSB8IG51bWJlcik6IGFueSB7XHJcbiAgICBpZiAoIWlzTmFOKE51bWJlcih2YWx1ZSkpKSB7XHJcbiAgICAgIHJldHVybiBfLnJhbmRvbSgwLCB2YWx1ZSkgKyAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZSBhcyB1bmtub3duIGFzIGFueVtdO1xyXG4gICAgICByZXR1cm4gdmFsdWVbXy5yYW5kb20oMCwgdmFsdWUubGVuZ3RoIC0gMSldO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbiJdfQ==