import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryAppService {

  constructor() {
  }

  testString() {
    return 'Hello';
  }
}
