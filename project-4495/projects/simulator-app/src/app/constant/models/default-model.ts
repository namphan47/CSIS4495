import {IDefaultModel} from './i-default-model';

export class DefaultModel implements IDefaultModel {
  _raw: any;

  constructor(data: any) {
    if (data.hasOwnProperty('_raw')) {
      delete data['_raw'];
    }
    this._raw = data;
  }

  copyInto(json): void {
    for (let key in json) {
      if (this.hasOwnProperty(key)) {
        this[key] = json[key];
      }
    }
  }

  getData(): object {
    const result = {};
    Object.keys(this).map(key => result[key] = this[key]);
    if (result.hasOwnProperty('_raw')) {
      delete result['_raw'];
    }
    return result;
  }
}
