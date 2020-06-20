import {Component, OnInit} from '@angular/core';
import {
  DefaultComponent,
  FirebaseDataService,
  NotificationService,
  SimulatorDataService,
} from 'library-app';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {UiControllerService} from "@app/shared/controller/ui-controller.service";

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
              private _HttpClient: HttpClient) {
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
}
