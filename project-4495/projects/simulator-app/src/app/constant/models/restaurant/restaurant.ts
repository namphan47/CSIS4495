import {DefaultModel} from "@app/constant/models/default-model";

export class Restaurant extends DefaultModel {
  id: string;
  name: string;
  address: string;
  phone_no: string;

  constructor(data: any) {
    super(data);
    super.copyInto(data);
  }

}
