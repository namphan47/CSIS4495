import {Component, OnInit} from '@angular/core';
import {Delivery, FirebaseDataService} from 'library-app';
import _ from 'lodash';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  deliveries: Delivery[] = [];

  constructor(private _FirebaseDataService: FirebaseDataService) {

  }

  ngOnInit(): void {
    this.onRefresh();
  }


  onRefresh() {
    this._FirebaseDataService.getDeliveries()
      .then((rs) => {
        console.log(rs);
        this.deliveries = _.orderBy(rs, x => x.order.date_time, 'desc');
      });
  }
}
