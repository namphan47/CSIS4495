import {DefaultModel} from "../default-model";

export class Customer extends DefaultModel {
  id: string = '';
  name: string = '';
  address: string = '';
  lat: number = 0;
  lng: number = 0;

  phone_no: string = '';
  email: string = '';

  constructor(data: any) {
    super(data);
    super.copyInto(data);
  }

}
