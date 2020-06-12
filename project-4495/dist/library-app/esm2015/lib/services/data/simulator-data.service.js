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
let SimulatorDataService = class SimulatorDataService {
    constructor(_FirebaseDataService, _NotificationService) {
        this._FirebaseDataService = _FirebaseDataService;
        this._NotificationService = _NotificationService;
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
    { type: NotificationService }
];
SimulatorDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SimulatorDataService_Factory() { return new SimulatorDataService(i0.ɵɵinject(i1.FirebaseDataService), i0.ɵɵinject(i2.NotificationService)); }, token: SimulatorDataService, providedIn: "root" });
SimulatorDataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SimulatorDataService);
export { SimulatorDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RhdGEvc2ltdWxhdG9yLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFJdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQVUsUUFBUSxFQUFFLGVBQWUsRUFBUyxlQUFlLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUM3RixPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7Ozs7QUFFNUIsSUFBSyxpQkFJSjtBQUpELFdBQUssaUJBQWlCO0lBQ3BCLDhDQUF5QixDQUFBO0lBQ3pCLDRDQUF1QixDQUFBO0lBQ3ZCLDRDQUF1QixDQUFBO0FBQ3pCLENBQUMsRUFKSSxpQkFBaUIsS0FBakIsaUJBQWlCLFFBSXJCO0FBQUEsQ0FBQztBQUtGLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBRy9CLFlBQW9CLG9CQUF5QyxFQUN6QyxvQkFBeUM7UUFEekMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQUN6Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO0lBRTdELENBQUM7SUFFRDs7O09BR0c7SUFDRyxLQUFLLENBQUMsT0FBZSxJQUFJOztZQUM3QixJQUFJLENBQUMsb0JBQW9CLENBQUMs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QUU7YUFDOUIsQ0FBQyxDQUFDO1lBRUgsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUMxRSxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ0gsU0FBUyxDQUFDLEtBQXFCO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDekIsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0I7YUFBTTtZQUNMLEtBQUssR0FBRyxLQUF5QixDQUFDO1lBQ2xDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGLENBQUE7QUEvTFEsNEJBQU8sR0FBRyxpQkFBaUIsQ0FBQzs7WUFFTyxtQkFBbUI7WUFDbkIsbUJBQW1COzs7QUFKbEQsb0JBQW9CO0lBSGhDLFVBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7R0FDVyxvQkFBb0IsQ0FnTWhDO1NBaE1ZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7RmlyZWJhc2VEYXRhU2VydmljZX0gZnJvbSBcIi4uL2ZpcmViYXNlL2ZpcmViYXNlLWRhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQge0N1c3RvbWVyfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL2N1c3RvbWVyL2N1c3RvbWVyXCI7XHJcbmltcG9ydCB7UmVzdGF1cmFudH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnRcIjtcclxuaW1wb3J0IHtNZWFsfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL21lYWwvbWVhbFwiO1xyXG5pbXBvcnQge09yZGVyfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyL29yZGVyXCI7XHJcbmltcG9ydCB7T3JkZXJJdGVtfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyX2l0ZW0vb3JkZXItaXRlbVwiO1xyXG5pbXBvcnQge05vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gXCIuLi9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7Q291cmllciwgRGVsaXZlcnksIERlbGl2ZXJ5X1N0YXR1cywgUG9pbnQsIFF1ZXJ5UGFyYW1Nb2RlbH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVsc1wiO1xyXG5pbXBvcnQge0RlbGl2ZXJ5U3RhdHVzSGlzdG9yeX0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9kZWxpdmVyeS9kZWxpdmVyeS1zdGF0dXMtaGlzdG9yeVwiO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuXHJcbmVudW0gU0lNVUxBVE9SX01FU1NBR0Uge1xyXG4gIFNUQVJUID0gJ3NpbXVsYXRvciBzdGFydCcsXHJcbiAgU1RFUCA9ICdzaW11bGF0b3Igc3RlcCcsXHJcbiAgU1RPUCA9ICdzaW11bGF0b3Igc3RvcCcsXHJcbn07XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaW11bGF0b3JEYXRhU2VydmljZSB7XHJcbiAgc3RhdGljIE1FU1NBR0UgPSBTSU1VTEFUT1JfTUVTU0FHRTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfRmlyZWJhc2VEYXRhU2VydmljZTogRmlyZWJhc2VEYXRhU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9Ob3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc3RhcnQgc2ltdWxhdG9yXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgc3RhcnQodGltZTogbnVtYmVyID0gMjAwMCkge1xyXG4gICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShTSU1VTEFUT1JfTUVTU0FHRS5TVEFSVCk7XHJcblxyXG4gICAgLy8gZ2V0IGRlbGl2ZXJ5IGxpc3RcclxuICAgIGxldCBkZWxpdmVyeUxpc3Q6IERlbGl2ZXJ5W107XHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmdldERlbGl2ZXJpZXMoKS50aGVuKChycykgPT4gZGVsaXZlcnlMaXN0ID0gcnMpO1xyXG4gICAgZGVsaXZlcnlMaXN0ID0gXy5maWx0ZXIoZGVsaXZlcnlMaXN0LCAoeDogRGVsaXZlcnkpID0+IHtcclxuICAgICAgcmV0dXJuIHguY3VycmVudFN0YXR1cy5zdGF0dXMgIT09IERlbGl2ZXJ5X1N0YXR1cy5ERUxJVkVSRUQ7XHJcbiAgICB9KTtcclxuICAgIGlmIChkZWxpdmVyeUxpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXQgb3JkZXIgbGlzdFxyXG4gICAgbGV0IG9yZGVyTGlzdDtcclxuICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuZ2V0T3JkZXJzKCkudGhlbigocnMpID0+IG9yZGVyTGlzdCA9IHJzKTtcclxuICAgIF8ubWFwKGRlbGl2ZXJ5TGlzdCwgKHg6IERlbGl2ZXJ5KSA9PiB7XHJcbiAgICAgIHgub3JkZXIgPSBfLmZpbmQob3JkZXJMaXN0LCBvID0+IG8uaWQgPT0geC5vcmRlcl9pZCk7XHJcbiAgICB9KVxyXG5cclxuICAgIGxldCBkZWxpdmVyZWREZWxpdmVyeUxpc3QgPSBbXTtcclxuICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgaWYgKGRlbGl2ZXJ5TGlzdC5sZW5ndGggPT09IGRlbGl2ZXJlZERlbGl2ZXJ5TGlzdC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoaW50ZXJ2YWwgIT09IG51bGwpIHtcclxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9Ob3RpZmljYXRpb25TZXJ2aWNlLnB1c2hNZXNzYWdlKFNJTVVMQVRPUl9NRVNTQUdFLlNUT1ApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zb2xlLmxvZygnc3RlcCcpO1xyXG4gICAgICBfLm1hcChkZWxpdmVyeUxpc3QsIGFzeW5jICh4KSA9PiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVEZWxpdmVyeSh4KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBkZWxpdmVyZWREZWxpdmVyeUxpc3QgPSBfLmZpbHRlcihkZWxpdmVyeUxpc3QsICh4OiBEZWxpdmVyeSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB4LmN1cnJlbnRTdGF0dXMuc3RhdHVzID09PSBEZWxpdmVyeV9TdGF0dXMuREVMSVZFUkVEO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShTSU1VTEFUT1JfTUVTU0FHRS5TVEVQKTtcclxuXHJcbiAgICB9LCB0aW1lKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGhhbmRsZURlbGl2ZXJ5KGRlbGl2ZXJ5OiBEZWxpdmVyeSkge1xyXG4gICAgaWYgKGRlbGl2ZXJ5LnRpbWVUb05leHRTdGF0dXMgPj0gbW9tZW50KCkudmFsdWVPZigpKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxpdmVyeS50aW1lVG9OZXh0U3RhdHVzID0gbW9tZW50KCkudmFsdWVPZigpICsgXy5yYW5kb20oNSwgMTApICogMTAwMDtcclxuXHJcbiAgICBsZXQgbmV4dFN0YXR1cyA9IG51bGw7XHJcblxyXG4gICAgc3dpdGNoIChkZWxpdmVyeS5jdXJyZW50U3RhdHVzLnN0YXR1cykge1xyXG4gICAgICBjYXNlIERlbGl2ZXJ5X1N0YXR1cy5PUkRFUkVEOlxyXG4gICAgICAgIG5leHRTdGF0dXMgPSBEZWxpdmVyeV9TdGF0dXMuUFJFUEFSSU5HO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERlbGl2ZXJ5X1N0YXR1cy5QUkVQQVJJTkc6XHJcbiAgICAgICAgbmV4dFN0YXR1cyA9IERlbGl2ZXJ5X1N0YXR1cy5XQUlUX0ZPUl9QSUNLX1VQO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERlbGl2ZXJ5X1N0YXR1cy5XQUlUX0ZPUl9QSUNLX1VQOlxyXG4gICAgICAgIG5leHRTdGF0dXMgPSBEZWxpdmVyeV9TdGF0dXMuREVMSVZFUklORztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBEZWxpdmVyeV9TdGF0dXMuREVMSVZFUklORzpcclxuICAgICAgICBuZXh0U3RhdHVzID0gRGVsaXZlcnlfU3RhdHVzLkRFTElWRVJFRDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGF0dXNIaXN0b3J5ID0gbmV3IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSh7XHJcbiAgICAgIHN0YXR1czogbmV4dFN0YXR1cyxcclxuICAgICAgZGVsaXZlcnlfaWQ6IGRlbGl2ZXJ5LmlkLFxyXG4gICAgICBkYXRlX3RpbWU6IG1vbWVudCgpLnZhbHVlT2YoKVxyXG4gICAgfSk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KHN0YXR1c0hpc3RvcnkpO1xyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZVxyXG4gICAgICAuZ2V0U3RhdHVzSGlzdG9yeU9mRGVsaXZlcnkoW25ldyBRdWVyeVBhcmFtTW9kZWwoJ2RlbGl2ZXJ5X2lkJywgUXVlcnlQYXJhbU1vZGVsLk9QRVJBVElPTlMuRVFVQUwsIGRlbGl2ZXJ5LmlkKV0pXHJcbiAgICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgICAgIGRlbGl2ZXJ5LnNldFN0YXR1c0hpc3RvcnkocnMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRlbGl2ZXJ5KTtcclxuICAgICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgc3RvcCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByYW5kb21seSBnZW5lcmF0ZSBuIG51bWJlciBvZiBvcmRlcnNcclxuICAgKiBAcGFyYW0gblxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGdlbmVyYXRlT3JkZXIobjogbnVtYmVyID0gMSkge1xyXG4gICAgdGhpcy5fTm90aWZpY2F0aW9uU2VydmljZS5wdXNoTWVzc2FnZShgZ2VuZXJhdGUgJHtufSBvcmRlcmApO1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtcclxuICAgICAgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5nZXRDdXN0b21lcigpLFxyXG4gICAgICB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmdldFJlc3RhdXJhbnQoKSxcclxuICAgICAgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5nZXRDb3VyaWVyKCksXHJcbiAgICBdKVxyXG4gICAgICAudGhlbihhc3luYyAoW2N1c3RvbWVycywgcmVzdGF1cmFudHMsIGNvdXJpZXJzXSkgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLmdlbmVyYXRlT25lT3JkZXIoY3VzdG9tZXJzLCByZXN0YXVyYW50cywgY291cmllcnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2VuZXJhdGUgMSBvcmRlciwgMSBvcmRlciBpdGVtLCAxIGRlbGl2ZXJ5LCAxIGRlbGl2ZXJ5IHN0YXR1cyBoaXN0b3J5XHJcbiAgICogQHBhcmFtIGN1c3RvbWVyc1xyXG4gICAqIEBwYXJhbSByZXN0YXVyYW50c1xyXG4gICAqIEBwYXJhbSBjb3VyaWVyc1xyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGdlbmVyYXRlT25lT3JkZXIoY3VzdG9tZXJzOiBDdXN0b21lcltdLCByZXN0YXVyYW50czogUmVzdGF1cmFudFtdLCBjb3VyaWVyczogQ291cmllcltdKSB7XHJcbiAgICBjb25zdCBjdXN0b21lcjogQ3VzdG9tZXIgPSB0aGlzLmdldFJhbmRvbShjdXN0b21lcnMpO1xyXG4gICAgY29uc3QgcmVzdGF1cmFudDogUmVzdGF1cmFudCA9IHRoaXMuZ2V0UmFuZG9tKHJlc3RhdXJhbnRzKTtcclxuICAgIGNvbnN0IG1lYWw6IE1lYWwgPSB0aGlzLmdldFJhbmRvbShyZXN0YXVyYW50Lm1lYWxzKTtcclxuICAgIGNvbnN0IGNvdXJpZXI6IENvdXJpZXIgPSB0aGlzLmdldFJhbmRvbShjb3VyaWVycyk7XHJcblxyXG4gICAgLy8gY3JlYXRlIG9yZGVyXHJcbiAgICBjb25zdCBvcmRlciA9IG5ldyBPcmRlcih7XHJcbiAgICAgIGRhdGVfdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcbiAgICAgIHJlc3RhdXJhbnRfaWQ6IHJlc3RhdXJhbnQuaWQsXHJcbiAgICAgIGN1c3RvbWVyX2lkOiBjdXN0b21lci5pZFxyXG4gICAgfSk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KG9yZGVyKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgb3JkZXIgaXRlbVxyXG4gICAgY29uc3Qgb3JkZXJJdGVtID0gbmV3IE9yZGVySXRlbShcclxuICAgICAge1xyXG4gICAgICAgIG1lYWxfaWQ6IG1lYWwuaWQsXHJcbiAgICAgICAgcXVhbnRpdHk6IHRoaXMuZ2V0UmFuZG9tKDUpLFxyXG4gICAgICAgIG9yZGVyX2lkOiBvcmRlci5pZFxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgb3JkZXJJdGVtLm1lYWwgPSBtZWFsO1xyXG4gICAgb3JkZXJJdGVtLm9yZGVyID0gb3JkZXI7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KG9yZGVySXRlbSk7XHJcbiAgICBvcmRlci50b3RhbCArPSBvcmRlckl0ZW0ubWVhbC5wcmljZSAqIG9yZGVySXRlbS5xdWFudGl0eTtcclxuICAgIHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UudXBkYXRlV2l0aE9iamVjdChvcmRlcik7XHJcblxyXG4gICAgLy8gY3JlYXRlIGRlbGl2ZXJ5XHJcbiAgICBjb25zdCBkZWxpdmVyeSA9IG5ldyBEZWxpdmVyeShcclxuICAgICAge1xyXG4gICAgICAgIHBvaW50czogW10sXHJcbiAgICAgICAgY291cmllcl9pZDogY291cmllci5pZCxcclxuICAgICAgICBvcmRlcl9pZDogb3JkZXIuaWRcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmNyZWF0ZVdpdGhPYmplY3QoZGVsaXZlcnkpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBkZWxpdmVyeSBzdGF0dXNcclxuICAgIGNvbnN0IGRlbGl2ZXJ5U3RhdHVzSGlzdG9yeSA9IG5ldyBEZWxpdmVyeVN0YXR1c0hpc3Rvcnkoe1xyXG4gICAgICBzdGF0dXM6IERlbGl2ZXJ5X1N0YXR1cy5PUkRFUkVELFxyXG4gICAgICBkZWxpdmVyeV9pZDogZGVsaXZlcnkuaWQsXHJcbiAgICAgIGRhdGVfdGltZTogbW9tZW50KCkudmFsdWVPZigpXHJcbiAgICB9KTtcclxuXHJcbiAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmNyZWF0ZVdpdGhPYmplY3QoZGVsaXZlcnlTdGF0dXNIaXN0b3J5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCByYW5kb21cclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKiBAcmV0dXJucyB7YW55IHwgbnVsbCB8IG51bWJlcn1cclxuICAgKi9cclxuICBnZXRSYW5kb20odmFsdWU6IGFueVtdIHwgbnVtYmVyKTogYW55IHtcclxuICAgIGlmICghaXNOYU4oTnVtYmVyKHZhbHVlKSkpIHtcclxuICAgICAgcmV0dXJuIF8ucmFuZG9tKDAsIHZhbHVlKSArIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWx1ZSA9IHZhbHVlIGFzIHVua25vd24gYXMgYW55W107XHJcbiAgICAgIHJldHVybiB2YWx1ZVtfLnJhbmRvbSgwLCB2YWx1ZS5sZW5ndGggLSAxKV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuIl19