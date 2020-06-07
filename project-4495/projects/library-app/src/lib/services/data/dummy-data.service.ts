import {Injectable} from '@angular/core';
import _ from 'lodash';
import {ENUM_TABLES} from "../../constant/const-value";
import {IDefaultModelConstructor} from "../../constant/models/i-default-model";
import {UtilsService} from "../mics/utils.service";

import restaurantData from "../../dummy/restaurant.json";
import courierData from "../../dummy/courier.json";
import mealData from "../../dummy/meal.json";
import customerData from "../../dummy/customer.json";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DummyDataService {
  readonly JSONS = {
    [ENUM_TABLES.restaurant]: restaurantData,
    [ENUM_TABLES.customer]: customerData,
    [ENUM_TABLES.meal]: mealData,
    [ENUM_TABLES.courier]: courierData,
  };

  constructor(private _UtilsService: UtilsService) {
  }

  convertDummyDataToModel(table: ENUM_TABLES, modelClass: IDefaultModelConstructor): Promise<any[]> {
    if (!this.JSONS[table]) {
      return Promise.resolve([]);
    }
    return of()
      .toPromise()
      .then(() => {
        const data = this.JSONS[table];
        const array = [];
        _.map(data, (x) => {
          const model = new modelClass(x);
          array.push(model);
        });
        return array;
      });
  }

}

