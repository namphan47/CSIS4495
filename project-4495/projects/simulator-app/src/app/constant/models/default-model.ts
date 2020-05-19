import {IDefaultModel} from './i-default-model';

export class DefaultModel implements IDefaultModel {
  _raw: any;

  constructor(data: any) {
    this._raw = data;
  }

  copyInto(json): void {
    for (let key in json) {
      if (this.hasOwnProperty(key)) {
        this[key] = json[key];
      }
    }
  }
}
