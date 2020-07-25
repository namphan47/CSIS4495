import {DefaultModel} from '../default-model';

export enum Delivery_Status {
  ORDERED = 'ORDERED',
  PREPARING = 'PREPARING',
  WAIT_FOR_PICK_UP = 'WAIT_FOR_PICK_UP',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED'
}

export class DeliveryStatusHistory extends DefaultModel {
  id: string = '';
  status: Delivery_Status = null;
  delivery_id: string = '';
  date_time: number = 0;

  constructor(data: any) {
    super(data);
    super.copyInto(data);
  }
}

