import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Customer} from "@app/constant/models/customer/customer";
import _ from 'lodash';
import {DummyDataService} from "@app/services/data/dummy-data.service";
import {first, tap} from "rxjs/operators";
import {IDefaultModelConstructor} from "@app/constant/models/i-default-model";
import {Restaurant} from "@app/constant/models/restaurant/restaurant";
import {Courier} from "@app/constant/models/courier/courier";
import {Meal} from "@app/constant/models/meal/meal";
import {ENUM_TABLES} from "@app/constant/const-value";

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
              private _DummyDataService: DummyDataService) {

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

    await this.getCustomer()
      .then((rs) => {
        console.log(rs);
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
        }));
      });
  }

  /**
   * get customer data
   * @returns {Promise<IDefaultModelConstructor[]>}
   */
  getCustomer(): Promise<IDefaultModelConstructor[]> {
    return this.getDB(this.TABLES.customer);
  }

  /**
   * get data of collection
   * @param object
   * @returns {Promise<IDefaultModelConstructor[]>}
   */
  private getDB(object): Promise<IDefaultModelConstructor[]> {
    return this._AngularFirestore.collection('customer')
      .valueChanges().pipe(tap(), first()).toPromise()
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
    return array;
  }


}
