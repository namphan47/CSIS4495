import {Injectable} from '@angular/core';
import _ from 'lodash';
import {FirebaseDataService} from "../firebase/firebase-data.service";
import {Customer} from "../../constant/models/customer/customer";
import {Restaurant} from "../../constant/models/restaurant/restaurant";
import {Meal} from "../../constant/models/meal/meal";
import {Order} from "../../constant/models/order/order";
import {OrderItem} from "../../constant/models/order_item/order-item";
import {NotificationService} from "../mics/notification.service";
import {Courier, Delivery, Delivery_Status, Point, QueryParamModel} from "../../constant/models";
import {DeliveryStatusHistory} from "../../constant/models/delivery/delivery-status-history";
import moment from "moment";
import {MapService} from "../map/map.service";

enum SIMULATOR_MESSAGE {
  START = 'simulator start',
  STEP = 'simulator step',
  STOP = 'simulator stop',
};

@Injectable({
  providedIn: 'root'
})
export class SimulatorDataService {
  static MESSAGE = SIMULATOR_MESSAGE;

  constructor(private _FirebaseDataService: FirebaseDataService,
              private _NotificationService: NotificationService,
              private _MapService: MapService) {

  }

  /**
   * start simulator
   * @returns {Promise<void>}
   */
  async start(time: number = 2000) {
    this._NotificationService.pushMessage(SIMULATOR_MESSAGE.START);

    // get delivery list
    let deliveryList: Delivery[];
    await this._FirebaseDataService.getDeliveries().then((rs) => deliveryList = rs);
    deliveryList = _.filter(deliveryList, (x: Delivery) => {
      return x.currentStatus.status !== Delivery_Status.DELIVERED;
    });
    if (deliveryList.length === 0) {
      this._NotificationService.pushMessage(SIMULATOR_MESSAGE.STOP);
      return Promise.resolve();
    }

    // get order list
    let orderList;
    await this._FirebaseDataService.getOrders().then((rs) => orderList = rs);
    _.map(deliveryList, (x: Delivery) => {
      x.order = _.find(orderList, o => o.id == x.order_id);
    })

    let deliveredDeliveryList = [];
    let interval = setInterval(() => {
      if (deliveryList.length === deliveredDeliveryList.length) {
        if (interval !== null) {
          clearInterval(interval);
        }
        this._NotificationService.pushMessage(SIMULATOR_MESSAGE.STOP);
      }

      console.log('step');
      _.map(deliveryList, async (x) => {
        await this.handleDelivery(x);
      });

      deliveredDeliveryList = _.filter(deliveryList, (x: Delivery) => {
        return x.currentStatus.status === Delivery_Status.DELIVERED;
      });
      this._NotificationService.pushMessage(SIMULATOR_MESSAGE.STEP);

    }, time);
  }

  async handleDelivery(delivery: Delivery) {
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

    await this._FirebaseDataService.createWithObject(statusHistory);
    await this._FirebaseDataService
      .getStatusHistoryOfDelivery([new QueryParamModel('delivery_id', QueryParamModel.OPERATIONS.EQUAL, delivery.id)])
      .then((rs) => {
        delivery.setStatusHistory(rs);
        console.log(delivery);
      });

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

    // add paths
    await this._MapService.renderDirection(new google.maps.LatLng(courier.lat, courier.lng), new google.maps.LatLng(restaurant.lat, restaurant.lng))
      .then((rs) => {
        delivery.path_to_restaurant = rs;
      });

    await this._MapService.renderDirection(new google.maps.LatLng(restaurant.lat, restaurant.lng), new google.maps.LatLng(customer.lat, customer.lng))
      .then((rs) => {
        delivery.path_to_customer = rs;
      });

    console.log(delivery);
    console.log(delivery.getData());

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


