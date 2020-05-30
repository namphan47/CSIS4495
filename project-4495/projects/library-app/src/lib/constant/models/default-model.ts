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
    const self = this;
    const result = {};

    Object.keys(this).map(key => {
      if (this[key] instanceof DefaultModel) {
        return;
      }

      switch (key) {
        case '_raw':
        case 'meals':
        case 'items':
          return;
      }

      result[key] = this[key];
    });
    return result;
  }
}
