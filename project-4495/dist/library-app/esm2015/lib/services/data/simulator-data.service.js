import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import _ from 'lodash';
import { FirebaseDataService } from "../firebase/firebase-data.service";
import { DefaultModel } from "../../constant/models/default-model";
import { Order } from "../../constant/models/order/order";
import { OrderItem } from "../../constant/models/order_item/order-item";
import * as i0 from "@angular/core";
import * as i1 from "../firebase/firebase-data.service";
let SimulatorDataService = class SimulatorDataService {
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
};
SimulatorDataService.ctorParameters = () => [
    { type: FirebaseDataService }
];
SimulatorDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SimulatorDataService_Factory() { return new SimulatorDataService(i0.ɵɵinject(i1.FirebaseDataService)); }, token: SimulatorDataService, providedIn: "root" });
SimulatorDataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SimulatorDataService);
export { SimulatorDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdG9yLWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RhdGEvc2ltdWxhdG9yLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFJdEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sNkNBQTZDLENBQUM7OztBQUt0RSxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQUUvQixZQUFvQixvQkFBeUM7UUFBekMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtJQUU3RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0csS0FBSzs7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7aUJBQzFDLElBQUksQ0FBQyxDQUFPLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLFFBQVEsR0FBYSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyRCxNQUFNLFVBQVUsR0FBZSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMzRCxNQUFNLElBQUksR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsWUFBWSxZQUFZLENBQUMsQ0FBQztnQkFFOUMsZUFBZTtnQkFDZixNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQztvQkFDdEIsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO29CQUMvQixhQUFhLEVBQUUsVUFBVSxDQUFDLEVBQUU7b0JBQzVCLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRTtpQkFDekIsQ0FBQyxDQUFDO2dCQUVILE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV4RCxvQkFBb0I7Z0JBQ3BCLE1BQU0sU0FBUyxHQUFHLElBQUksU0FBUyxDQUM3QjtvQkFDRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUU7b0JBQ2hCLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDM0IsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFO2lCQUNuQixDQUNGLENBQUM7Z0JBQ0YsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUV4QixNQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUQsS0FBSyxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO2dCQUN6RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtJQUVELElBQUk7SUFFSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFNBQVMsQ0FBQyxLQUFxQjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDM0I7YUFBTTtZQUNMLEtBQUssR0FBRyxLQUF5QixDQUFDO1lBQ2xDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGLENBQUE7O1lBaEUyQyxtQkFBbUI7OztBQUZsRCxvQkFBb0I7SUFIaEMsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLG9CQUFvQixDQWtFaEM7U0FsRVksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHtGaXJlYmFzZURhdGFTZXJ2aWNlfSBmcm9tIFwiLi4vZmlyZWJhc2UvZmlyZWJhc2UtZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7Q3VzdG9tZXJ9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvY3VzdG9tZXIvY3VzdG9tZXJcIjtcclxuaW1wb3J0IHtSZXN0YXVyYW50fSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL3Jlc3RhdXJhbnQvcmVzdGF1cmFudFwiO1xyXG5pbXBvcnQge01lYWx9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvbWVhbC9tZWFsXCI7XHJcbmltcG9ydCB7RGVmYXVsdE1vZGVsfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL2RlZmF1bHQtbW9kZWxcIjtcclxuaW1wb3J0IHtPcmRlcn0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlci9vcmRlclwiO1xyXG5pbXBvcnQge09yZGVySXRlbX0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9vcmRlcl9pdGVtL29yZGVyLWl0ZW1cIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNpbXVsYXRvckRhdGFTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfRmlyZWJhc2VEYXRhU2VydmljZTogRmlyZWJhc2VEYXRhU2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0YXJ0IHNpbXVsYXRvclxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgUHJvbWlzZS5hbGwoW3RoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuZ2V0Q3VzdG9tZXIoKSxcclxuICAgICAgdGhpcy5fRmlyZWJhc2VEYXRhU2VydmljZS5nZXRSZXN0YXVyYW50KCldKVxyXG4gICAgICAudGhlbihhc3luYyAoW2N1c3RvbWVycywgcmVzdGF1cmFudHNdKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coY3VzdG9tZXJzLCByZXN0YXVyYW50cyk7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tZXI6IEN1c3RvbWVyID0gdGhpcy5nZXRSYW5kb20oY3VzdG9tZXJzKTtcclxuICAgICAgICBjb25zdCByZXN0YXVyYW50OiBSZXN0YXVyYW50ID0gdGhpcy5nZXRSYW5kb20ocmVzdGF1cmFudHMpO1xyXG4gICAgICAgIGNvbnN0IG1lYWw6IE1lYWwgPSB0aGlzLmdldFJhbmRvbShyZXN0YXVyYW50Lm1lYWxzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21lciwgcmVzdGF1cmFudCwgbWVhbCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY3VzdG9tZXIgaW5zdGFuY2VvZiBEZWZhdWx0TW9kZWwpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgb3JkZXJcclxuICAgICAgICBjb25zdCBvcmRlciA9IG5ldyBPcmRlcih7XHJcbiAgICAgICAgICBkYXRlX3RpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG4gICAgICAgICAgcmVzdGF1cmFudF9pZDogcmVzdGF1cmFudC5pZCxcclxuICAgICAgICAgIGN1c3RvbWVyX2lkOiBjdXN0b21lci5pZFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLl9GaXJlYmFzZURhdGFTZXJ2aWNlLmNyZWF0ZVdpdGhPYmplY3Qob3JkZXIpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgb3JkZXIgaXRlbVxyXG4gICAgICAgIGNvbnN0IG9yZGVySXRlbSA9IG5ldyBPcmRlckl0ZW0oXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG1lYWxfaWQ6IG1lYWwuaWQsXHJcbiAgICAgICAgICAgIHF1YW50aXR5OiB0aGlzLmdldFJhbmRvbSg1KSxcclxuICAgICAgICAgICAgb3JkZXJfaWQ6IG9yZGVyLmlkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBvcmRlckl0ZW0ubWVhbCA9IG1lYWw7XHJcbiAgICAgICAgb3JkZXJJdGVtLm9yZGVyID0gb3JkZXI7XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UuY3JlYXRlV2l0aE9iamVjdChvcmRlckl0ZW0pO1xyXG4gICAgICAgIG9yZGVyLnRvdGFsICs9IG9yZGVySXRlbS5tZWFsLnByaWNlICogb3JkZXJJdGVtLnF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMuX0ZpcmViYXNlRGF0YVNlcnZpY2UudXBkYXRlV2l0aE9iamVjdChvcmRlcik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RvcCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgcmFuZG9tXHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICogQHJldHVybnMge2FueSB8IG51bGwgfCBudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0UmFuZG9tKHZhbHVlOiBhbnlbXSB8IG51bWJlcik6IGFueSB7XHJcbiAgICBpZiAoIWlzTmFOKE51bWJlcih2YWx1ZSkpKSB7XHJcbiAgICAgIHJldHVybiBfLnJhbmRvbSgwLCB2YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWx1ZSA9IHZhbHVlIGFzIHVua25vd24gYXMgYW55W107XHJcbiAgICAgIHJldHVybiB2YWx1ZVtfLnJhbmRvbSgwLCB2YWx1ZS5sZW5ndGggLSAxKV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==