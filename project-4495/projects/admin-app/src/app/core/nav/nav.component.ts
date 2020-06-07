import {Component, OnInit} from '@angular/core';
import {FirebaseDataService, SimulatorDataService} from 'library-app';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private _FirebaseDataService: FirebaseDataService,
              private _SimulatorDataService: SimulatorDataService) {
  }

  ngOnInit(): void {
  }

  resetDB() {
    this._FirebaseDataService.resetDB();
  }

  startSimulator() {
    this._SimulatorDataService.start();
  }

  stopSimulator() {
    this._SimulatorDataService.stop();
  }

  generateOrder() {

  }

  cleanOrder() {
    this._FirebaseDataService.deleteOrderItem();
    this._FirebaseDataService.deleteOrder();
    this._FirebaseDataService.deleteDelivery();
  }
}
