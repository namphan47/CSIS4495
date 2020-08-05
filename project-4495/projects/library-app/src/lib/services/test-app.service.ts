import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestAppService {

  constructor() {
  }

  testString() {
    return 'Hello Test App';
  }
}
initializeApp
