import {DefaultModel} from "@app/constant/models/default-model";

export class Courier extends DefaultModel {
  name: string = "";
  vin: string = "";
  driver_license: string = "";
  email: string = "";
  phone_no: string = "";

  constructor(data: any) {
    super(data);
    super.copyInto(data);
  }
}
