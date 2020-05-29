import {Component, OnInit} from '@angular/core';
import {FirebaseDataService} from "../../services/firebase/firebase-data.service";
import {Restaurant} from "@app/constant/models/restaurant/restaurant";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  restaurants: Restaurant[];

  constructor(private _FirebaseDataService: FirebaseDataService) {

  }

  ngOnInit(): void {
    this._FirebaseDataService.getRestaurant()
      .then((rs) => {
        this.restaurants = rs;
        console.log(rs);
      });
  }

}
