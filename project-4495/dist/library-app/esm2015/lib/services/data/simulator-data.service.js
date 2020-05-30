import { __awaiter } from "tslib";
import { Injectable } from '@angular/core';
import _ from 'lodash';
import { DefaultModel } from "../../constant/models/default-model";
import { Order } from "../../constant/models/order/order";
import { OrderItem } from "../../constant/models/order_item/order-item";
import * as i0 from "@angular/core";
import * as i1 from "../firebase/firebase-data.service";
export class SimulatorDataService {
    constructor(_FirebaseDataService) {
        this._FirebaseDataService = _FirebaseDataService;
    }
    /**
     * start simulator
     * @returns {Promise<void>}
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            Promise.all([this._FirebaseDataService.getCustomer(),
                this._FirebaseDataService.getRestaurant()])
                .then(([customers, restaurants]) => __awaiter(this, void 0, void 0, function* () {
                console.log(customers, restaurants);
                const customer = this.getRandom(customers);
                const restaurant = this.getRandom(restaurants);
                const meal = this.getRandom(restaurant.meals);
                console.log(customer, restaurant, meal);
                console.log(customer instanceof DefaultModel);
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
            }));
        });
    }
    stop() {
    }
    /**
     * get random
     * @param value
     * @returns {any | null | number}
     */
    getRandom(value) {
        if (!isNaN(Number(value))) {
            return _.random(0, value);
        }
        else {
            value = value;
            return value[_.random(0, value.length - 1)];
        }
        return null;
    }
}
SimulatorDataService.ɵfac = function SimulatorDataService_Factory(t) { return new (t || SimulatorDataService)(i0.ɵɵinject(i1.FirebaseDataService)); };
SimulatorDataService.ɵprov = i0.ɵɵdefineInjectable({ token: SimulatorDataService, factory: SimulatorDataService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SimulatorDataService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.FirebaseDataService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RhdGEvc2ltdWxhdG9yLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFLdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sNkNBQTZDLENBQUM7OztBQUt0RSxNQUFNLE9BQU8sb0JBQW9CO0lBRS9CLFlBQW9CLG9CQUF5QztRQUF6Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO0lBRTdELENBQUM7SUFFRDs7O09BR0c7SUFDRyxLQUFLOztZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFO2dCQUNsRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztpQkFDMUMsSUFBSSxDQUFDLENBQU8sQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLEVBQUUsRUFBRTtnQkFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sUUFBUSxHQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JELE1BQU0sVUFBVSxHQUFlLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzNELE1BQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxZQUFZLFlBQVksQ0FBQyxDQUFDO2dCQUU5QyxlQUFlO2dCQUNmLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDO29CQUN0QixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7b0JBQy9CLGFBQWEsRUFBRSxVQUFVLENBQUMsRUFBRTtvQkFDNUIsV0FBVyxFQUFFLFFBQVEsQ0FBQyxFQUFFO2lCQUN6QixDQUFDLENBQUM7Z0JBRUgsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXhELG9CQUFvQjtnQkFDcEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQzdCO29CQUNFLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUMzQixRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUU7aUJBQ25CLENBQ0YsQ0FBQztnQkFDRixTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDdEIsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBRXhCLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM1RCxLQUFLLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0lBRUQsSUFBSTtJQUVKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsU0FBUyxDQUFDLEtBQXFCO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDekIsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzQjthQUFNO1lBQ0wsS0FBSyxHQUFHLEtBQXlCLENBQUM7WUFDbEMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzt3RkFqRVUsb0JBQW9COzREQUFwQixvQkFBb0IsV0FBcEIsb0JBQW9CLG1CQUZuQixNQUFNO2tEQUVQLG9CQUFvQjtjQUhoQyxVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQge0ZpcmViYXNlRGF0YVNlcnZpY2V9IGZyb20gXCIuLi9maXJlYmFzZS9maXJlYmFzZS1kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtDdXN0b21lcn0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9jdXN0b21lci9jdXN0b21lclwiO1xyXG5pbXBvcnQge1Jlc3RhdXJhbnR9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvcmVzdGF1cmFudC9yZXN0YXVyYW50XCI7XHJcbmltcG9ydCB7TWVhbH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9tZWFsL21lYWxcIjtcclxuaW1wb3J0IHtEZWZhdWx0TW9kZWx9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvZGVmYXVsdC1tb2RlbFwiO1xyXG5pbXBvcnQge09yZGVyfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyL29yZGVyXCI7XHJcbmltcG9ydCB7T3JkZXJJdGVtfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL29yZGVyX2l0ZW0vb3JkZXItaXRlbVwiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2ltdWxhdG9yRGF0YVNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9GaXJlYmFzZURhdGFTZXJ2aWNlOiBGaXJlYmFzZURhdGFTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc3RhcnQgc2ltdWxhdG9yXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICovXHJcbiAgYXN5bmMgc3RhcnQoKSB7XHJcbiAgICBQcm9taXNlLmFsbChbdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5nZXRDdXN0b21lcigpLFxyXG4gICAgICB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmdldFJlc3RhdXJhbnQoKV0pXHJcbiAgICAgIC50aGVuKGFzeW5jIChbY3VzdG9tZXJzLCByZXN0YXVyYW50c10pID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21lcnMsIHJlc3RhdXJhbnRzKTtcclxuICAgICAgICBjb25zdCBjdXN0b21lcjogQ3VzdG9tZXIgPSB0aGlzLmdldFJhbmRvbShjdXN0b21lcnMpO1xyXG4gICAgICAgIGNvbnN0IHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQgPSB0aGlzLmdldFJhbmRvbShyZXN0YXVyYW50cyk7XHJcbiAgICAgICAgY29uc3QgbWVhbDogTWVhbCA9IHRoaXMuZ2V0UmFuZG9tKHJlc3RhdXJhbnQubWVhbHMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbWVyLCByZXN0YXVyYW50LCBtZWFsKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21lciBpbnN0YW5jZW9mIERlZmF1bHRNb2RlbCk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBvcmRlclxyXG4gICAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKHtcclxuICAgICAgICAgIGRhdGVfdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcbiAgICAgICAgICByZXN0YXVyYW50X2lkOiByZXN0YXVyYW50LmlkLFxyXG4gICAgICAgICAgY3VzdG9tZXJfaWQ6IGN1c3RvbWVyLmlkXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuY3JlYXRlV2l0aE9iamVjdChvcmRlcik7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBvcmRlciBpdGVtXHJcbiAgICAgICAgY29uc3Qgb3JkZXJJdGVtID0gbmV3IE9yZGVySXRlbShcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbWVhbF9pZDogbWVhbC5pZCxcclxuICAgICAgICAgICAgcXVhbnRpdHk6IHRoaXMuZ2V0UmFuZG9tKDUpLFxyXG4gICAgICAgICAgICBvcmRlcl9pZDogb3JkZXIuaWRcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIG9yZGVySXRlbS5tZWFsID0gbWVhbDtcclxuICAgICAgICBvcmRlckl0ZW0ub3JkZXIgPSBvcmRlcjtcclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5jcmVhdGVXaXRoT2JqZWN0KG9yZGVySXRlbSk7XHJcbiAgICAgICAgb3JkZXIudG90YWwgKz0gb3JkZXJJdGVtLm1lYWwucHJpY2UgKiBvcmRlckl0ZW0ucXVhbnRpdHk7XHJcbiAgICAgICAgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS51cGRhdGVXaXRoT2JqZWN0KG9yZGVyKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdG9wKCkge1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCByYW5kb21cclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKiBAcmV0dXJucyB7YW55IHwgbnVsbCB8IG51bWJlcn1cclxuICAgKi9cclxuICBnZXRSYW5kb20odmFsdWU6IGFueVtdIHwgbnVtYmVyKTogYW55IHtcclxuICAgIGlmICghaXNOYU4oTnVtYmVyKHZhbHVlKSkpIHtcclxuICAgICAgcmV0dXJuIF8ucmFuZG9tKDAsIHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gdmFsdWUgYXMgdW5rbm93biBhcyBhbnlbXTtcclxuICAgICAgcmV0dXJuIHZhbHVlW18ucmFuZG9tKDAsIHZhbHVlLmxlbmd0aCAtIDEpXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuIl19