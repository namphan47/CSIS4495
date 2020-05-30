import {DefaultModel} from "../default-model";

export class Customer extends DefaultModel {
  id: string = '';
  name: string = '';
  address: string = '';
  lat: string = '';
  long: string = '';
  phone_no: string = '';
  email: string = '';

  constructor(data: any) {
    super(data);
    super.copyInto(data);
  }

}
