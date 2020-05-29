import {Component, OnInit} from '@angular/core';
import {FirebaseDataService} from "@app/services/firebase/firebase-data.service";
import {Courier} from "@app/constant/models/courier/courier";

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss']
})
export class CourierComponent implements OnInit {
  couriers: Courier[];

  constructor(private _FirebaseDataService: FirebaseDataService) {

  }

  ngOnInit(): void {
    this._FirebaseDataService.getCourier()
      .then((rs) => {
        this.couriers = rs;
        console.log(rs);
      });
  }
}
