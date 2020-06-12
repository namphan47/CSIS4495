import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Delivery, FirebaseDataService, SimulatorDataService} from "library-app";
import {Delivery_Status, DefaultComponent, NotificationService} from "library-app";
import * as _ from 'lodash';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends DefaultComponent implements OnInit, AfterViewInit {
  Delivery_Status = Delivery_Status;

  orderCounts = {
    [Delivery_Status.ORDERED]: 0,
    [Delivery_Status.DELIVERED]: 0,
    [Delivery_Status.DELIVERING]: 0,
    [Delivery_Status.PREPARING]: 0,
    [Delivery_Status.WAIT_FOR_PICK_UP]: 0,
  };

  options: any = {
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [
      {
        featureType: "poi",
        stylers: [
          {visibility: "off"}
        ]
      }
    ]
  };

  constructor(private _FirebaseDataService: FirebaseDataService,
              private _NotificationService: NotificationService) {
    super();
    this.addSubscribes(
      this._NotificationService.getMessageOservable()
        .subscribe((rs) => {
          if (rs === SimulatorDataService.MESSAGE.STEP) {
            this.getDeliveries();
          }
        })
    );

    //
    this.getDeliveries();
  }

  getDeliveries() {
    this._FirebaseDataService.getDeliveries()
      .then((rs) => {
        console.log(rs);
        this.orderCounts = {
          [Delivery_Status.ORDERED]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.ORDERED).length,
          [Delivery_Status.DELIVERED]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.DELIVERED).length,
          [Delivery_Status.DELIVERING]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.DELIVERING).length,
          [Delivery_Status.PREPARING]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.PREPARING).length,
          [Delivery_Status.WAIT_FOR_PICK_UP]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.WAIT_FOR_PICK_UP).length,
        };
        console.log(this.orderCounts);
      });

    // this._FirebaseDataService.getCustomer()
    //   .then((rs) => {
    //     console.log(rs);
    //   });
    //
    // this._FirebaseDataService.getRestaurant()
    //   .then((rs) => {
    //     console.log(rs);
    //   });

  }

  ready(map) {
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {

  }

}
