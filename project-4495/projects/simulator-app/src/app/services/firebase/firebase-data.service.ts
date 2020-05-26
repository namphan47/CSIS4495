import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Customer} from "@app/constant/models/customer/customer";
import _ from 'lodash';
import {DummyDataService} from "@app/services/data/dummy-data.service";
import {first, map, tap} from "rxjs/operators";
import {IDefaultModelConstructor} from "@app/constant/models/i-default-model";
import {Restaurant} from "@app/constant/models/restaurant/restaurant";
import {Courier} from "@app/constant/models/courier/courier";
import {Meal} from "@app/constant/models/meal/meal";
import {ENUM_TABLES} from "@app/constant/const-value";
import {NotificationService} from "@app/services/mics/notification.service";

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
    }
  };

  constructor(private _AngularFirestore: AngularFirestore,
              private _DummyDataService: DummyDataService,
              private _NotificationService: NotificationService) {

  }

  /**
   * reset DB
   * @returns {Promise<void>}
   */
  async resetDB() {
    // delete tables
    await Promise.all(_.map(this.TABLES, async (x) => {
      await this.deleteDB(x.name);
    }));

    // add tables
    await Promise.all(_.map(this.TABLES, async (x) => {
      await this.addDB(x);
    }));

    // converseMeal
    await this.linkRestaurantMealDB();

    this._NotificationService.pushMessage('All data is reset!!');
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
   * delete data of collection
   * @param name
   * @returns {Promise<void>}
   */
  private deleteDB(name: string) {
    return this._AngularFirestore.collection(name).get().toPromise()
      .then(res => {
        return res.forEach(async element => {
          await element.ref.delete();
          console.log(`delete ${name}`);
          this._NotificationService.pushMessage(`delete ${name}`);
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
   * @returns {Promise<IDefaultModelConstructor[]>}
   */
  getCustomer(): Promise<IDefaultModelConstructor[]> {
    return this.getDB(this.TABLES[ENUM_TABLES.customer]);
  }

  /**
   * get restaurant data
   * @returns {Promise<IDefaultModelConstructor[]>}
   */
  getRestaurant(): Promise<IDefaultModelConstructor[]> {
    return this.getDB(this.TABLES[ENUM_TABLES.restaurant])
      .then((restaurants) => {
        return this.getMeals()
          .then((meals) => {
            _.map(restaurants, (restaurant: Restaurant) => {
              restaurant.meals = _.filter(meals, (meal: Meal) => {
                return restaurant.meal_ids.indexOf(meal.id) >= 0;
              });
            });
            return restaurants;
          });
      });
  }

  /**
   * get meals data
   * @returns {Promise<IDefaultModelConstructor[]>}
   */
  getMeals(): Promise<IDefaultModelConstructor[]> {
    return this.getDB(this.TABLES[ENUM_TABLES.meal]);
  }

  /**
   * get data of collection
   * @param object
   * @returns {Promise<IDefaultModelConstructor[]>}
   */
  private getDB(object): Promise<IDefaultModelConstructor[]> {
    return this._AngularFirestore.collection(object.name)
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          data['id'] = id;
          return data;
        }))
      )
      .pipe(tap(), first()).toPromise()
      .then((rs) => {
        return this.convertToClassObject(rs, object.class);
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


}
