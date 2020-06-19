import {DefaultModel} from "../default-model";
import {Meal} from "../meal/meal";

export class Restaurant extends DefaultModel {
  id: string = '';
  name: string = '';
  address: string = '';
  phone_no: string = '';
  img1: string = '';
  img2: string = '';

  lat: number = 0;
  lng: number = 0;

  meal_ids: string[] = [];
  meals: Meal[] = [];

  constructor(data: any) {
    super(data);
    super.copyInto(data);
  }

}
