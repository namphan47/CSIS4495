import {DefaultModel} from "@app/constant/models/default-model";

export class Meal extends DefaultModel {
  constructor(data: any) {
    super(data);
    super.copyInto(data);
  }
}
