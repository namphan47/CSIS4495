import {Component, OnInit} from '@angular/core';
import {
  Customer,
  DefaultComponent,
  FirebaseDataService,
  NotificationService,
  SimulatorDataService,
  MapService, OrderItem
} from 'library-app';
import {HttpClient} from '@angular/common/http';
import {UiControllerService} from '@app/shared/controller/ui-controller.service';
import {AngularFireAuth} from '@angular/fire/auth';

import _ from 'lodash';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent extends DefaultComponent implements OnInit {
  counterInterval;
  counter: number = 0;

  constructor(private _FirebaseDataService: FirebaseDataService,
              private _SimulatorDataService: SimulatorDataService,
              private _NotificationService: NotificationService,
              private _UiControllerService: UiControllerService,
              private _HttpClient: HttpClient,
              private _MapService: MapService,
              private _AngularFireAuth: AngularFireAuth) {
    super();
    // this.addSubscribes(
    //   this._NotificationService.getMessageOservable()
    //     .subscribe((rs) => {
    //       if (rs === SimulatorDataService.MESSAGE.STOP) {
    //         this.stopSimulator();
    //       }
    //     })
    // );
  }

  ngOnInit(): void {
  }

  /**
   * reset DB
   * clean all DBs
   * create default DBs
   */
  resetDB() {
    this._FirebaseDataService.resetDB()
      .then(() => {
        this._UiControllerService.nextMapController();
      });
  }

  /**
   * start simulator
   */
  startSimulator() {
    this._HttpClient.get(`http://${window.location.hostname}:3000/simulator/start`)
      .subscribe((rs) => {
        this._NotificationService.pushMessage(rs['message']);
      });
    // this._SimulatorDataService.start(5000);
    this.counter = 0;
    if (this.counterInterval) {
      clearInterval(this.counterInterval);
    }
    this.counterInterval = setInterval(() => {
      this.counter++;
    }, 1000);
  }

  /**
   * stop simulator
   */
  stopSimulator() {
    this._HttpClient.get(`http://${window.location.hostname}:3000/simulator/stop`)
      .subscribe((rs) => {
        this._NotificationService.pushMessage(rs['message']);
      });
    // this._SimulatorDataService.stop();
    if (this.counterInterval) {
      clearInterval(this.counterInterval);
    }
  }

  /**
   * generate 10 random order
   */
  generateOrder() {
    this._SimulatorDataService.generateOrder(1)
      .then(() => {
        this._NotificationService.pushMessage('|| Finish generating orders');
        this._UiControllerService.nextMapController();
      });
  }

  /**
   * delete all order
   */
  cleanOrder() {
    Promise.all([
      this._FirebaseDataService.deleteOrderItem(),
      this._FirebaseDataService.deleteOrder(),
      this._FirebaseDataService.deleteDelivery(),
      this._FirebaseDataService.deleteDeliveryStatus()
    ]).then(() => {
      this._NotificationService.pushMessage('|| Finish delete all orders');
      this._UiControllerService.nextMapController();
    });
  }

  signUp() {
    const time = new Date().getTime();
    const user = new Customer({
      email: 'a' + time + 'a@gc.com',
      password: 'a' + time,
      name: 'nam',
      address: '8264 Amberwood Pl, Burnaby, BC V5A 3V2',
      phone_no: '333',
    });
    console.log(user);
    this._FirebaseDataService.signUp(user);
    // this._MapService.getLatLngFromAddress('British Columbia V3N 3Z6');
  }

  // Sign in with email/password
  signIn() {
    const user = new Customer({
      email: 'a1594239014660a@gc.com',
      password: 'a1594f239014660',
    });
    this._FirebaseDataService.signIn(user)
      .then((rs) => {
        console.log(rs);
      });
  }

  checkout() {
    return Promise.all([
      this._FirebaseDataService.getCustomer(),
      this._FirebaseDataService.getRestaurant(),
    ])
      .then(async ([customers, restaurants]) => {
        const c = this.getRandom(customers);
        const r = this.getRandom(restaurants);
        const m = this.getRandom(r.meals);
        const o = new OrderItem({
          meal_id: m.id,
          quantity: this.getRandom(5),
        });
        o.meal = m;
        const o2 = new OrderItem({
          meal_id: m.id,
          quantity: this.getRandom(5),
        });
        o2.meal = m;
        this._FirebaseDataService.checkout(c, r, [o, o2])
          .then((rs) => {
            console.log(rs);
            this._UiControllerService.nextMapController();
          });
      });
  }

  /**
   * get random
   * @param value
   * @returns {any | null | number}
   */
  getRandom(value: any[] | number): any {
    if (!isNaN(Number(value))) {
      return _.random(0, value) + 1;
    } else {
      value = value as unknown as any[];
      return value[_.random(0, value.length - 1)];
    }

    return null;
  }
}
