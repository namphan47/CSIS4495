import {Component, OnInit} from '@angular/core';
import {FirebaseDataService} from "@app/services/firebase/firebase-data.service";
import {SimulatorDataService} from "@app/services/data/simulator-data.service";

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
}
