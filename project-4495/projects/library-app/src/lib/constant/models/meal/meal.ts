import {DefaultModel} from "../default-model";

export class Meal extends DefaultModel {
  id: string = '';
  name: string = '';
  description: string = '';
  price: number = 0;
  image: string = '';
  restaurant_name: string = '';

  constructor(data: any) {
    super(data);
    super.copyInto(data);
  }
}
