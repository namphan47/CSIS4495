import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiControllerService {
  mapController = new BehaviorSubject(null);

  constructor() {
  }

  nextMapController() {
    this.mapController.next(new Date().getTime());
  }
}
