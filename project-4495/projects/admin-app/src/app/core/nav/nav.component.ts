import {Component, OnInit} from '@angular/core';
import {DefaultComponent, FirebaseDataService, NotificationService, SimulatorDataService} from 'library-app';

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
              private _NotificationService: NotificationService) {
    super();
    this.addSubscribes(
      this._NotificationService.getMessageOservable()
        .subscribe((rs) => {
          if (rs === SimulatorDataService.MESSAGE.STOP) {
            this.stopSimulator();
          }
        })
    );
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
    this._SimulatorDataService.start(5000);
    this.counter = 0;
    this.counterInterval = setInterval(() => {
      this.counter++;
    }, 1000);
  }

  /**
   * stop simulator
   */
  stopSimulator() {
    this._SimulatorDataService.stop();
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
