import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Customer} from '../../constant/models/customer/customer';
import _ from 'lodash';
import {DummyDataService} from '../data/dummy-data.service';
import {first, map, tap} from 'rxjs/operators';
import {IDefaultModel, IDefaultModelConstructor} from '../../constant/models/i-default-model';
import {Restaurant} from '../../constant/models/restaurant/restaurant';
import {Courier} from '../../constant/models/courier/courier';
import {Meal} from '../../constant/models/meal/meal';
import {ENUM_TABLES} from '../../constant/const-value';
import {NotificationService} from '../mics/notification.service';
import {OrderItem} from '../../constant/models/order_item/order-item';
import {Order} from '../../constant/models/order/order';
import {QueryParamModel} from '../../constant/models/query-param-model';
import {Delivery, Delivery_Status} from '../../constant/models';
import {DeliveryStatusHistory} from '../../constant/models/delivery/delivery-status-history';
import {MapService} from '../map/map.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  readonly TABLES = {
    [ENUM_TABLES.customer]: {
      name: ENUM_TABLES.customer,
      class: Customer
    },
    [ENUM_TABLES.courier]: {
      name: ENUM_TABLES.courier,
      class: Courier
    },
    [ENUM_TABLES.restaurant]: {
      name: ENUM_TABLES.restaurant,
      class: Restaurant
    },
    [ENUM_TABLES.meal]: {
      name: ENUM_TABLES.meal,
      class: Meal
    },
    [ENUM_TABLES.order]: {
      name: ENUM_TABLES.order,
      class: Order
    },
    [ENUM_TABLES.delivery]: {
      name: ENUM_TABLES.delivery,
      class: Delivery
    },
    [ENUM_TABLES.order_item]: {
      name: ENUM_TABLES.order_item,
      class: OrderItem
    },
    [ENUM_TABLES.delivery_status_history]: {
      name: ENUM_TABLES.delivery_status_history,
      class: DeliveryStatusHistory
    }
  };

  constructor(private _AngularFirestore: AngularFirestore,
              private _AngularFireDatabase: AngularFireDatabase,
              private _DummyDataService: DummyDataService,
              private _NotificationService: NotificationService,
              private _MapService: MapService,
              private _AngularFireAuth: AngularFireAuth) {
  }

  /**
   * reset DB
   * @returns {Promise<void>}
   */
  async resetDB() {
    // delete tables
    await Promise.all(_.map(this.TABLES, async (x) => {
      await this.deleteTable(x.name);
    }));

    // add tables
    await Promise.all(_.map(this.TABLES, async (x) => {
      await this.addDB(x);
    }));

    // converseMeal
    await this.linkRestaurantMealDB();

    this._NotificationService.pushMessage('All data is reset!!');
    return Promise.resolve();
  }

  /**
   * link restaurant and meals data
   * @returns {Promise<void>}
   */
  async linkRestaurantMealDB() {
    this._NotificationService.pushMessage('Link Restaurant & Meal data');
    await this.getRestaurant()
      .then((restaurants) => {
        // console.log(restaurants);
        this.getMeals()
          .then((meals) => {
            // console.log(meals);
            _.map(restaurants, (restaurant: Restaurant) => {
              // console.log(restaurant);
              restaurant.meal_ids = _.map(_.filter(meals, (meal: Meal) => {
                return restaurant.name === meal.restaurant_name;
              }), x => x.id);

              this._AngularFirestore.collection(this.TABLES[ENUM_TABLES.restaurant].name)
                .doc(restaurant.id).set(restaurant.getData());
            });
          });
      });
  }

  /**
   * add data of collection
   * @param object
   * @returns {Promise<unknown[]>}
   */
  private addDB(object) {
    return this._DummyDataService.convertDummyDataToModel(object.name, object.class)
      .then(async (rs) => {
        if (!rs) {
          return;
        }
        const itemsCollection = this._AngularFirestore.collection(object.name);
        return await Promise.all(_.map(rs, async (x) => {
          await itemsCollection.add(x.getData());
          console.log(`add ${object.name}`);
          this._NotificationService.pushMessage(`add ${object.name}`);
        }));
      });
  }

  /**
   * get customer data
   * @returns {Promise<Customer[]>}
   */
  getCustomer(): Promise<Customer[]> {
    return this.getDB(this.TABLES[ENUM_TABLES.customer])
      .then((rs) => rs as unknown as Customer[]);
  }

  /**
   * get customer by email
   * @param email
   * @returns {Promise<Customer>}
   */
  getCustomerByEmail(email: string): Promise<Customer> {
    return this.getCustomer()
      .then((rs) => {
        return _.find(rs, x => x.email === email);
      });
  }

  /**
   * get courier data
   * @returns {Promise<Courier[]>}
   */
  getCourier(): Promise<Courier[]> {
    return this.getDB(this.TABLES[ENUM_TABLES.courier])
      .then((rs) => rs as unknown as Courier[]);
  }

  /**
   * get delivery data
   * @returns {Promise<Delivery[]>}
   */
  getDeliveries(): Promise<Delivery[]> {
    return this.getDB(this.TABLES[ENUM_TABLES.delivery])
      .then((rs) => rs as unknown as Delivery[])
      .then((rs) => {
        return this.getDeliveryStatusHistory()
          .then((histories) => {
            _.map(rs, (delivery: Delivery) => {
              delivery.setStatusHistory(_.filter(histories, (x: DeliveryStatusHistory) => x.delivery_id === delivery.id));
            });
            return rs;
          });
      })
      .then((rs) => {
        return Promise.all(_.map(rs, async (d: Delivery) => {
          await this.getOrderById(d.order_id)
            .then((o) => {
              d.order = o;
            });
          return Promise.resolve();
        }))
          .then(() => {
            return rs;
          });
      });
  }

  getDeliveryById(id: string): Promise<Delivery> {
    return this.getDBWithId(this.TABLES[ENUM_TABLES.delivery], id)
      .then((rs) => rs as unknown as Delivery)
      .then((rs) => {
        return this.getDeliveryStatusHistory()
          .then((histories) => {
            rs.setStatusHistory(_.filter(histories, (x: DeliveryStatusHistory) => x.delivery_id === id));
            return rs;
          });
      });
  }

  getDeliveryStatusHistory(): Promise<DeliveryStatusHistory[]> {
    return this.getDB(this.TABLES[ENUM_TABLES.delivery_status_history])
      .then((rs) => rs as unknown as DeliveryStatusHistory[]);
  }

  async getStatusHistoryOfDelivery(queryParams?: QueryParamModel[]): Promise<DeliveryStatusHistory[]> {
    return this.getDB(this.TABLES[ENUM_TABLES.delivery_status_history], queryParams)
      .then((rs) => rs as unknown as DeliveryStatusHistory[]);
  }

  /**
   * get restaurant data
   * @returns {Promise<Restaurant[]>}
   */
  getRestaurant(): Promise<Restaurant[]> {
    return this.getDB(this.TABLES[ENUM_TABLES.restaurant])
      .then((restaurants) => {
        return this.getMeals()
          .then((meals) => {
            _.map(restaurants, (restaurant: Restaurant) => {
              restaurant.meals = _.filter(meals, (meal: Meal) => {
                return restaurant.meal_ids.indexOf(meal.id) >= 0;
              });
            });
            return restaurants as unknown as Restaurant[];
          });
      });
  }

  /**
   * get meals data
   * @returns {Promise<Meal[]>}
   */
  getMeals(): Promise<Meal[]> {
    return this.getDB(this.TABLES[ENUM_TABLES.meal])
      .then((rs) => rs as unknown as Meal[]);
  }

  /**
   * get order items data
   * @param queryParams
   * @returns {Promise<Meal[]>}
   */
  async getOrderItems(queryParams?: QueryParamModel[]): Promise<OrderItem[]> {
    return this.getDB(this.TABLES[ENUM_TABLES.order_item], queryParams)
      .then((rs) => rs as unknown as OrderItem[])
      .then((orderItems) => {
        _.map(orderItems, async (orderItem: OrderItem) => {
          // get meal
          await this.getDBWithId(this.TABLES[ENUM_TABLES.meal], orderItem.meal_id)
            .then((meal) => {
              orderItem.meal = meal as unknown as Meal;
            });
        });
        return orderItems;
      });
  }

  /**
   * get order details
   * @returns {Promise<Order[]>}
   */
  async getOrders(): Promise<Order[]> {
    return this.getDB(this.TABLES[ENUM_TABLES.order])
      .then((rs) => rs as unknown as Order[])
      .then((orders) => {
        orders = orders as unknown as Order[];
        return Promise.all(_.map(orders, async (order: Order) => {

          // get customer of each order
          await this.getDBWithId(this.TABLES[ENUM_TABLES.customer], order.customer_id)
            .then((customer) => {
              order.customer = customer as unknown as Customer;
            });

          // get item of each order
          await this.getOrderItems([new QueryParamModel('order_id', QueryParamModel.OPERATIONS.EQUAL, order.id)])
            .then((items) => {
              order.items = items as unknown as OrderItem[];
            });

          // get restaurant for each order
          await this.getDBWithId(this.TABLES[ENUM_TABLES.restaurant], order.restaurant_id)
            .then((restaurant) => {
              order.restaurant = restaurant as unknown as Restaurant;
            });
          return Promise.resolve();
        })).then(() => {
          return orders;
        });

      });
  }

  async getOrderById(id: string): Promise<Order> {
    return this.getDBWithId(this.TABLES[ENUM_TABLES.order], id)
      .then((rs) => rs as unknown as Order)
      .then(async (order) => {
        order = order as unknown as Order;

        // get customer of each order
        await this.getDBWithId(this.TABLES[ENUM_TABLES.customer], order.customer_id)
          .then((customer) => {
            order.customer = customer as unknown as Customer;
          });

        // get item of each order
        await this.getOrderItems([new QueryParamModel('order_id', QueryParamModel.OPERATIONS.EQUAL, order.id)])
          .then((items) => {
            order.items = items as unknown as OrderItem[];
          });

        // get restaurant for each order
        await this.getDBWithId(this.TABLES[ENUM_TABLES.restaurant], order.restaurant_id)
          .then((restaurant) => {
            order.restaurant = restaurant as unknown as Restaurant;
          });

        return order;
      });

  }

  /**
   * get data of collection
   * @param object
   * @returns {Promise<IDefaultModelConstructor[]>}
   */
  private getDB(object, queryParams?: QueryParamModel[], id?: string): Promise<IDefaultModelConstructor[]> {
    const collection = this._AngularFirestore.collection(object.name, ref => {
      let newRef = null;
      if (!!queryParams) {
        _.map(queryParams, (x: QueryParamModel) => {
          newRef = newRef ? newRef.where(x.key, x.operation, x.value) : ref.where(x.key, x.operation, x.value);
        });
      }
      return newRef || ref;
    });

    return collection
      .snapshotChanges()
      .pipe(
        map(items => items.map(a => {
          const data = a.payload.doc.data() as Object;
          const id = a.payload.doc.id;
          // update id
          data['id'] = id;
          return data;
        })),
        map((items) => _.filter(items, doc => {
          if (!!id) {
            return doc.id === id;
          }
          return doc;
        }))
      )
      .pipe(tap(), first()).toPromise()
      .then((rs) => {
        return this.convertToClassObject(rs, object.class);
      });
  }

  /**
   * get object by id
   * @param object
   * @param id
   * @returns {Promise<IDefaultModelConstructor[]>}
   */
  private getDBWithId(object, id: string): Promise<IDefaultModelConstructor> {
    const collection = this._AngularFirestore.doc(`${object.name}/${id}`);
    return collection
      .snapshotChanges()
      .pipe(
        map(a => {
          const data = a.payload.data() as Object;
          const id = a.payload.id;
          // update id
          data['id'] = id;
          return data;
        })
      )
      .pipe(tap(), first()).toPromise()
      .then((rs) => {
        const array = this.convertToClassObject([rs], object.class);
        return array.length ? array[0] : null;
      });
  }

  /**
   * convert data to class object
   * @param data
   * @param modelClass
   * @returns {any[]}
   */
  private convertToClassObject(data: any[], modelClass: IDefaultModelConstructor): IDefaultModelConstructor[] {
    const array = [];
    _.map(data, (x) => {
      const model = new modelClass(x);
      array.push(model);
    });
    // console.log(array);
    return array;
  }

  /**
   * create document, set id
   * @param object
   * @returns {Promise<void>}
   */
  createWithObject(object: IDefaultModel): Promise<void> {
    const id = this._AngularFirestore.createId();
    const collection = this._AngularFirestore.collection(this.getTable(object.constructor.name));
    return collection.doc(id).set(object.getData())
      .then(() => {
        object.id = id;
        this._NotificationService.pushMessage(`Created ${object.constructor.name}`);
      });
  }

  /**
   * update document
   * @param object
   */
  updateWithObject(object: IDefaultModel) {
    const collection = this._AngularFirestore.collection(this.getTable(object.constructor.name));
    return collection.doc(object.id).update(object.getData());
  }

  /**
   * get table name from class name
   * @param className
   * @returns {any}
   */
  getTable(className: string) {
    return _.find(this.TABLES, (table) => {
      return table.class.name === className;
    }).name;
  }

  /*========delete=========*/

  deleteOrder() {
    return this.deleteTable(this.TABLES[ENUM_TABLES.order].name);
  }

  deleteOrderItem() {
    return this.deleteTable(this.TABLES[ENUM_TABLES.order_item].name);
  }

  deleteDelivery() {
    return this.deleteTable(this.TABLES[ENUM_TABLES.delivery].name);
  }

  deleteDeliveryStatus() {
    return this.deleteTable(this.TABLES[ENUM_TABLES.delivery_status_history].name);
  }

  /**
   * delete data of collection
   * @param name
   * @returns {Promise<void>}
   */
  private deleteTable(name: string) {
    return this._AngularFirestore.collection(name).get().toPromise()
      .then(async res => {

        const array = [];
        res.forEach(element => {
          array.push(element);
        });
        await Promise.all(_.map(array, async element => {
          await element.ref.delete();
          console.log(`delete ${name}`);
          this._NotificationService.pushMessage(`delete ${name}`);
        }));
      });
  }

  getPointsRealTime(id) {
    return this.getRealTimeDB('points', id);
  }

  getRealTimeDB(name: string, id: string) {
    return this._AngularFireDatabase.list(`${name}/${id}`).valueChanges();
  }

  /*authentication*/

  /**
   * Sign up with email/password
   * @param user
   * @returns {Promise<boolean>}
   */
  async signUp(user: Customer) {

    const geoPoint = await this._MapService.getLatLngFromAddress(user.address);
    user.lat = geoPoint.lat();
    user.lng = geoPoint.lng();

    return this._AngularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        // create customer object
        delete user.password;
        return this.createWithObject(user)
          .then(() => {
            return true;
          });
      }).catch((error) => {
        window.alert(error.message);
        return false;
      });
  }

  /**
   * Sign in with email/password
   * @param user
   * @returns {Promise<Customer>}
   */
  signIn(user: Customer): Promise<Customer> {
    return this._AngularFireAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        // console.log(result);
        return this.getCustomerByEmail(user.email);
      }).catch((error) => {
        window.alert(error.message);
        return null;
      });
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

  /**
   * checkout
   * @param customer
   * @param restaurant
   * @param orderItems
   * @returns {Promise<void>}
   */
  async checkout(customer: Customer, restaurant: Restaurant, orderItems: OrderItem[]) {
    let delivery;
    try {
      const courier: Courier = this.getRandom(await this.getCourier());

      // create order
      const order = new Order({
        date_time: new Date().getTime(),
        restaurant_id: restaurant.id,
        customer_id: customer.id
      });

      await this.createWithObject(order);

      // create order items
      await Promise.all(_.map(orderItems, async x => {
        x.order_id = order.id;
        x.order = order;
        await this.createWithObject(x);
        order.total += x.meal.price * x.quantity;
        return Promise.resolve();
      }));

      order.total = Math.round(order.total * 100) / 100.0;

      await this.updateWithObject(order);

      // create delivery
      delivery = new Delivery(
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

      await this.createWithObject(delivery);

      // create delivery status
      const deliveryStatusHistory = new DeliveryStatusHistory({
        status: Delivery_Status.ORDERED,
        delivery_id: delivery.id,
        date_time: moment().valueOf()
      });

      await this.createWithObject(deliveryStatusHistory);
    } catch (e) {
      console.log(e);
      return Promise.resolve()
        .then(() => null);
    }

    return Promise.resolve()
      .then(() => delivery);
  }

}
