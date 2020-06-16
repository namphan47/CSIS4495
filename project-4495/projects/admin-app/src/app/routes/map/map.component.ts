import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Courier, Customer, Delivery, FirebaseDataService, Order, Restaurant, SimulatorDataService} from "library-app";
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
  map;
  polylines: DeliveryPolyline[] = [];

  drivers: Courier[] = [];
  customers: Customer[] = [];
  deliveries: Delivery[] = [];
  orders: Order[] = [];

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

  }

  getDeliveries() {
    const deliveryPromise = this._FirebaseDataService.getDeliveries()
      .then((rs) => {
        this.orderCounts = {
          [Delivery_Status.ORDERED]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.ORDERED).length,
          [Delivery_Status.DELIVERED]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.DELIVERED).length,
          [Delivery_Status.DELIVERING]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.DELIVERING).length,
          [Delivery_Status.PREPARING]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.PREPARING).length,
          [Delivery_Status.WAIT_FOR_PICK_UP]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.WAIT_FOR_PICK_UP).length,
        };
        this.deliveries = _.filter(rs, (x: Delivery) => x.currentStatus.status !== Delivery_Status.DELIVERED);

        console.log(this.orderCounts);
      });

    Promise.all([
      this._FirebaseDataService.getCourier(),
      this._FirebaseDataService.getOrders(),
      deliveryPromise]
    )
      .then(([couriers, orders]) => {
        this.drivers = couriers;
        this.orders = orders;
        _.map(this.deliveries, (d: Delivery) => {
          d.courier = _.find(this.drivers, x => x.id === d.courier_id);
          d.order = _.find(this.orders, x => x.id === d.order_id);
          d.restaurant = d.order.restaurant;
          d.customer = d.order.customer;

          this.renderDirection(this.map, new google.maps.LatLng(d.courier.lat, d.courier.long), new google.maps.LatLng(d.restaurant.lat, d.restaurant.long))
            .then((rs) => {
              d.path_to_restaurant = rs;
            });
          this.renderDirection(this.map, new google.maps.LatLng(d.restaurant.lat, d.restaurant.long), new google.maps.LatLng(d.customer.lat, d.customer.long))
            .then((rs) => {
              d.path_to_customer = rs;
            });
        });
        console.log(this.drivers);
        console.log(this.deliveries);
      });

  }

  ready(map) {
    this.map = map;
    this.renderDirection(this.map, new google.maps.LatLng(49.205333, -122.920441), new google.maps.LatLng(49.206195, -122.911558))
      .then((rs) => {
        console.log(rs);
        this.polylines = [];
        this.polylines.push(new DeliveryPolyline(rs));
      });
    this.getDeliveries();
  }

  renderDirection(map, from, to): Promise<any> {
    return new Promise((resolve, reject) => {
      const directionsService = new google.maps.DirectionsService;

      directionsService.route({
        origin: from,
        destination: to,
        travelMode: google.maps.TravelMode['DRIVING']
      }, function (response, status) {
        if (status === google.maps.DirectionsStatus['OK']) {
          console.log(response);
          let array = response['routes'][0]['overview_path'];
          resolve(array);
        } else {
          window.alert('Directions request failed due to ' + status);
          reject('error');
        }
      });
    });
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {

  }

}

class DeliveryPolyline {
  points: any[];

  constructor(array) {
    this.points = array;
  }
}
