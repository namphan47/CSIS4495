import {Injectable} from '@angular/core';
import {UtilsService} from '@app/services/mics/utils.service';

@Injectable({
  providedIn: 'root'
})
export class DummyDataService {
  readonly CONSTANT_PATH = 'assets/dummy/';
  readonly JSONS = {
    restaurant: 'restaurant.json'
  };

  constructor(private _UtilsService: UtilsService) {
    this._UtilsService.getJSON(this.CONSTANT_PATH + this.JSONS.restaurant)
      .subscribe(data => {
        console.log(data);
      }, error => console.log(error));
  }


}
