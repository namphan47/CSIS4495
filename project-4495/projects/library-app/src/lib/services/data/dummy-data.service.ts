import {Injectable} from '@angular/core';
import _ from 'lodash';
import {first, tap} from 'rxjs/operators';
import {ENUM_TABLES} from '../../constant/const-value';
import {UtilsService} from "../mics/utils.service";
import {IDefaultModelConstructor} from "../../constant/models/i-default-model";

@Injectable({
  providedIn: 'root'
})
export class DummyDataService {
  static TABLES = ENUM_TABLES;
  readonly CONSTANT_PATH = 'assets/dummy/';
  readonly JSONS = {
    [ENUM_TABLES.restaurant]: 'restaurant.json',
    [ENUM_TABLES.customer]: 'customer.json',
    [ENUM_TABLES.meal]: 'meal.json',
    [ENUM_TABLES.courier]: 'courier.json',
  };

  constructor(private _UtilsService: UtilsService) {
  }

  convertDummyDataToModel(table: ENUM_TABLES, modelClass: IDefaultModelConstructor): Promise<any[]> {
    if (!this.JSONS[table]) {
      return Promise.resolve([]);
    }
    return this._UtilsService.getJSON(this.CONSTANT_PATH + this.JSONS[table])
      .pipe(
        tap(),
        first()
      )
      .toPromise()
      .then(data => {
        const array = [];
        _.map(data, (x) => {
          const model = new modelClass(x);
          array.push(model);
        });
        return array;
      });
  }

}

