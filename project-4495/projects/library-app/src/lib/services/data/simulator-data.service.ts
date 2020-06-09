import {Injectable} from '@angular/core';
import _ from 'lodash';
import {FirebaseDataService} from "../firebase/firebase-data.service";
import {Customer} from "../../constant/models/customer/customer";
import {Restaurant} from "../../constant/models/restaurant/restaurant";
import {Meal} from "../../constant/models/meal/meal";
import {Order} from "../../constant/models/order/order";
import {OrderItem} from "../../constant/models/order_item/order-item";
import {NotificationService} from "../mics/notification.service";
import {Courier, Delivery, Delivery_Status, Point} from "../../constant/models";
import {DeliveryStatusHistory} from "../../constant/models/delivery/delivery-status-history";
import moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class SimulatorDataService {

  constructor(private _FirebaseDataService: FirebaseDataService,
              private _NotificationService: NotificationService) {

  }

  /**
   * start simulator
   * @returns {Promise<void>}
   */
  async start() {

  }

  stop() {

  }

  /**
   * randomly generate n number of orders
   * @param n
   * @returns {Promise<void>}
   */
  async generateOrder(n: number = 1) {
    this._NotificationService.pushMessage(`generate ${n} order`);
    return Promise.all([
      this._FirebaseDataService.getCustomer(),
      this._FirebaseDataService.getRestaurant(),
      this._FirebaseDataService.getCourier(),
    ])
      .then(async ([customers, restaurants, couriers]) => {
        for (let i = 0; i < n; i++) {
          await this.generateOneOrder(customers, restaurants, couriers);
        }
        return;
      });
  }

  /**
   * generate 1 order, 1 order item, 1 delivery, 1 delivery status history
   * @param customers
   * @param restaurants
   * @param couriers
   * @returns {Promise<void>}
   */
  async generateOneOrder(customers: Customer[], restaurants: Restaurant[], couriers: Courier[]) {
    const customer: Customer = this.getRandom(customers);
    const restaurant: Restaurant = this.getRandom(restaurants);
    const meal: Meal = this.getRandom(restaurant.meals);
    const courier: Courier = this.getRandom(couriers);

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

    // create delivery
    const delivery = new Delivery(
      {
        points: [],
        courier_id: courier.id,
        order_id: order.id
      }
    );

    await this._FirebaseDataService.createWithObject(delivery);

    // create delivery status
    const deliveryStatusHistory = new DeliveryStatusHistory({
      status: Delivery_Status.ORDERED,
      delivery_id: delivery.id,
      date_time: moment().valueOf()
    });

    await this._FirebaseDataService.createWithObject(deliveryStatusHistory);
  }

  /**
   * get random
   * @param value
   * @returns {any | null | number}
   */
  getRandom(value: any[] | number): any {
    if (!isNaN(Number(value))) {
      return _.random(0, value) + 1;
    } else {
      value = value as unknown as any[];
      return value[_.random(0, value.length - 1)];
    }

    return null;
  }
}
