import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Courier, Customer, Delivery, FirebaseDataService, Order, Restaurant, SimulatorDataService} from 'library-app';
import {Delivery_Status, DefaultComponent, NotificationService} from 'library-app';
import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase} from '@angular/fire/database';
import {CustomMarker} from '@ngui/map';
import {DeliveryStatusHistory} from '../../../../../library-app/src/lib/constant/models';
import {UiControllerService} from '@app/shared/controller/ui-controller.service';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends DefaultComponent implements OnInit, AfterViewInit {
  @ViewChild('carMarker') carMarker;
  Delivery_Status = Delivery_Status;
  map;
  // polylines: DeliveryPolyline[] = [];

  drivers: Courier[] = [];
  customers: Customer[] = [];
  deliveries: Delivery[] = [];
  displayDeliveries: Delivery[] = [];
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
        featureType: 'poi',
        stylers: [
          {visibility: 'off'}
        ]
      }
    ]
  };

  constructor(private _FirebaseDataService: FirebaseDataService,
              private _NotificationService: NotificationService,
              private _HttpClient: HttpClient,
              private _AngularFireDatabase: AngularFireDatabase,
              private _UiControllerService: UiControllerService) {
    super();
    this.addSubscribes(
      this._NotificationService.getMessageOservable()
        .subscribe((rs) => {
          if (rs === SimulatorDataService.MESSAGE.STEP) {
            this.getDeliveries();
          }
        })
    );

    this.addSubscribes(
      this._UiControllerService.mapController.subscribe((rs) => {
        if (rs) {
          this.getDeliveries();
        }
      })
    );

    // this.points = this._FirebaseDataService.getPointsRealTime();
    // this.addSubscribes(this.points.subscribe((rs) => {
    //     console.log(rs);
    //   })
    // );

    //
    // this._AngularFireDatabase.list('points/u6Mnyt1o8ZDCh44zhXks').valueChanges()
    //   .subscribe((rs) => {
    //     console.log(rs);
    //   });
  }

  getSummary() {
    return this._FirebaseDataService.getDeliveries()
      .then((rs) => {
        this.orderCounts = {
          [Delivery_Status.ORDERED]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.ORDERED).length,
          [Delivery_Status.DELIVERED]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.DELIVERED).length,
          [Delivery_Status.DELIVERING]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.DELIVERING).length,
          [Delivery_Status.PREPARING]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.PREPARING).length,
          [Delivery_Status.WAIT_FOR_PICK_UP]: _.filter(rs, (x: Delivery) => x.currentStatus.status === Delivery_Status.WAIT_FOR_PICK_UP).length,
        };

        // console.log(this.orderCounts);
        return rs;
      });
  }

  getDeliveries() {
    _.map(this.deliveries, (delivery: Delivery) => {
      if (delivery.subscription) {
        delivery.subscription.unsubscribe();
      }
    });
    const deliveryPromise = this.getSummary();

    Promise.all([
      this._FirebaseDataService.getCourier(),
      this._FirebaseDataService.getOrders(),
      deliveryPromise]
    )
      .then(([couriers, orders, rs]) => {
        this.deliveries = _.filter(rs, (x: Delivery) => x.currentStatus.status !== Delivery_Status.DELIVERED);

        this.drivers = couriers;
        this.orders = orders;
        _.map(this.deliveries, (d: Delivery) => {
          d.courier = _.find(this.drivers, x => x.id === d.courier_id);
          d.order = _.find(this.orders, x => x.id === d.order_id);
          d.restaurant = d.order.restaurant;
          d.customer = d.order.customer;
          // default for filter
          d.checked = true;
        });
        console.log(this.drivers);
        console.log(this.deliveries);
        this.onOrderCheckChanged();
      })
      .then(() => {
        this.listenPoints();
      });

  }

  ready(map) {
    this.map = map;
    // this.renderDirection(this.map, new google.maps.LatLng(49.205333, -122.920441), new google.maps.LatLng(49.206195, -122.911558))
    //   .then((rs) => {
    //     console.log(rs);
    //     this.polylines = [];
    //     this.polylines.push(new DeliveryPolyline(rs));
    //   });
    this.getDeliveries();
  }

  listenPoints() {
    _.map(this.deliveries, (delivery: Delivery) => {
      delivery.subscription = this._FirebaseDataService.getPointsRealTime(delivery.id)
        .subscribe((rs) => {
          console.log(rs);
          if (rs && rs.length) {
            if (rs[0]['lat'] !== 0 && rs[0]['lng'] !== 0) {
              delivery.courier.lat = rs[0]['lat'];
              delivery.courier.lng = rs[0]['lng'];
            }
            if (rs[2] === Delivery_Status.DELIVERED) {
              this.deliveries.splice(this.deliveries.indexOf(delivery), 1);
              delivery.subscription.unsubscribe();
            }
            if (rs[2] !== delivery.currentStatus.status) {
              this._FirebaseDataService.getDeliveryStatusHistory()
                .then((histories) => {
                  delivery.setStatusHistory(_.filter(histories, (x: DeliveryStatusHistory) => x.delivery_id === delivery.id));
                  // console.log(delivery);
                });
              this.getSummary();
              this.onOrderCheckChanged();
            }
          }
        });
      this.addSubscribes(delivery.subscription);
    });
  }

  renderDirection(from, to): Promise<any> {
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


  onOrderCheckChanged($event?: any) {
    console.log($event);
    this.displayDeliveries = _.filter(this.deliveries, x => x.checked);
  }
}

class DeliveryPolyline {
  points: any[];

  constructor(array) {
    this.points = array;
  }
}
