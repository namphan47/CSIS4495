import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly _Observable_Message: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() {
  }

  reset(): void {
    this._Observable_Message.next(null);
  }

  pushMessage(message: string) {
    this._Observable_Message.next(message);
  }

  getMessageOservable() {
    return this._Observable_Message;
  }
}
