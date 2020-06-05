import {Component, OnInit} from '@angular/core';
import {Courier, FirebaseDataService} from "library-app";

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
    this.onRefresh();
  }

  onRefresh() {
    this._FirebaseDataService.getCourier()
      .then((rs) => {
        this.couriers = rs;
        console.log(rs);
      });
  }
}
