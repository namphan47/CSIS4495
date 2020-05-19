import {Injectable} from '@angular/core';
import {UtilsService} from '@app/services/mics/utils.service';
import {IDefaultModelConstructor} from '@app/constant/models/i-default-model';
import _ from 'lodash';
import {first, tap} from 'rxjs/operators';

enum ENUM_TABLES {
  customer = 'customer',
  restaurant = 'restaurant'
}

@Injectable({
  providedIn: 'root'
})
export class DummyDataService {
  static TABLES = ENUM_TABLES;
  readonly CONSTANT_PATH = 'assets/dummy/';
  readonly JSONS = {
    [ENUM_TABLES.restaurant]: 'restaurant.json',
    [ENUM_TABLES.customer]: 'customer.json',
  };

  constructor(private _UtilsService: UtilsService) {
    // this._UtilsService.getJSON(this.CONSTANT_PATH + this.JSONS.restaurant)
    //   .subscribe(data => {
    //     console.log(data);
    //   }, error => console.log(error));
  }

  convertDummyDataToModel(table: ENUM_TABLES, modelClass: IDefaultModelConstructor) {
    return this._UtilsService.getJSON(this.CONSTANT_PATH + this.JSONS[table])
      .pipe(
        tap(data => {
          console.log(data);
          const array = [];
          _.map(data, (x) => {
            const model = new modelClass(x);
            array.push(model);

          });
          console.log(array);
          return array;
        }),
        first()
      ).toPromise();
  }

}

