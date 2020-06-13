import {Component, OnInit} from '@angular/core';
import {FirebaseDataService, Meal, Restaurant} from "library-app";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[];

  constructor(
    private _FirebaseDataService: FirebaseDataService
  ) {
    // call some function after component is created
    // console.log(1);
  }

  ngOnInit(): void {
    // call after ui is rendered
    // console.log(2);

    // start to call api to load restaurants
    let promise = this._FirebaseDataService.getRestaurant();
    promise
      .then((rs) => {
        this.restaurants = rs;
        console.log(this.restaurants);
      });

  }

}
