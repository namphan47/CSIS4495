import {Component, OnInit} from '@angular/core';
import {FirebaseDataService} from "@app/services/firebase/firebase-data.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private _FirebaseDataService: FirebaseDataService) {
  }

  ngOnInit(): void {
  }

  resetDB() {
    this._FirebaseDataService.resetDB();
  }
}
