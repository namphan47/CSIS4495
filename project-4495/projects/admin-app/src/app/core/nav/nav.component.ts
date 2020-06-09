import {Component, OnInit} from '@angular/core';
import {FirebaseDataService, NotificationService, SimulatorDataService} from 'library-app';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private _FirebaseDataService: FirebaseDataService,
              private _SimulatorDataService: SimulatorDataService,
              private _NotificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  /**
   * reset DB
   * clean all DBs
   * create default DBs
   */
  resetDB() {
    this._FirebaseDataService.resetDB();
  }

  /**
   * start simulator
   */
  startSimulator() {
    this._SimulatorDataService.start();
  }

  /**
   * stop simulator
   */
  stopSimulator() {
    this._SimulatorDataService.stop();
  }

  /**
   * generate 10 random order
   */
  generateOrder() {
    this._SimulatorDataService.generateOrder(10)
      .then(() => {
        this._NotificationService.pushMessage('|| Finish generating orders');
      });
  }

  /**
   * delete all order
   */
  cleanOrder() {
    Promise.all([
      this._FirebaseDataService.deleteOrderItem(),
      this._FirebaseDataService.deleteOrder(),
      this._FirebaseDataService.deleteDelivery()
    ]).then(() => {
      this._NotificationService.pushMessage('|| Finish delete all orders');
    })
  }
}
