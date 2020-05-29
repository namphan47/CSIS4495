import {Injectable} from '@angular/core';
import {FirebaseDataService} from "../firebase/firebase-data.service";
import _ from 'lodash';
import {Restaurant} from "@app/constant/models/restaurant/restaurant";
import {Customer} from "@app/constant/models/customer/customer";
import {Meal} from "@app/constant/models/meal/meal";
import {OrderItem} from "@app/constant/models/order_item/order-item";
import {Order} from "@app/constant/models/order/order";
import {DefaultModel} from "@app/constant/models/default-model";

@Injectable({
  providedIn: 'root'
})
export class SimulatorDataService {

  constructor(private _FirebaseDataService: FirebaseDataService) {

  }

  /**
   * start simulator
   * @returns {Promise<void>}
   */
  async start() {
    Promise.all([this._FirebaseDataService.getCustomer(),
      this._FirebaseDataService.getRestaurant()])
      .then(async ([customers, restaurants]) => {
        console.log(customers, restaurants);
        const customer: Customer = this.getRandom(customers);
        const restaurant: Restaurant = this.getRandom(restaurants);
        const meal: Meal = this.getRandom(restaurant.meals);
        console.log(customer, restaurant, meal);
        console.log(customer instanceof DefaultModel);

        // create order
        const order = new Order({
          date_time: new Date().getTime(),
          restaurant_id: restaurant.id,
          customer_id: customer.id
        });

        await this._FirebaseDataService.createWithObject(order);

        // create order item
        const orderItem = new OrderItem(
          {
            meal_id: meal.id,
            quantity: this.getRandom(5),
            order_id: order.id
          }
        );
        orderItem.meal = meal;
        orderItem.order = order;

        await this._FirebaseDataService.createWithObject(orderItem);
        order.total += orderItem.meal.price * orderItem.quantity;
        this._FirebaseDataService.updateWithObject(order);
      });
  }

  stop() {

  }

  /**
   * get random
   * @param value
   * @returns {any | null | number}
   */
  getRandom(value: any[] | number): any {
    if (!isNaN(Number(value))) {
      return _.random(0, value);
    } else {
      value = value as unknown as any[];
      return value[_.random(0, value.length - 1)];
    }

    return null;
  }
}
