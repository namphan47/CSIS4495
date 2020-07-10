import {Component, OnInit} from '@angular/core';
import {FirebaseDataService, Meal, Restaurant} from 'library-app';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[];
  rest;
  searchData = {
    RestaurantName: ''
  };

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
    const promise = this._FirebaseDataService.getRestaurant();
    promise
      .then((rs) => {
        this.restaurants = rs;
        // console.log(this.restaurants);
        // console.log(this.restaurants[2].lat);
        // console.log(this.restaurants[2].lng);
      });

  }

  search() {

    for (let i = 0; i < this.restaurants.length; i++) {
      if (this.restaurants[i].name.toLowerCase().includes(this.searchData.RestaurantName)) {
        console.log('it is true');
        this.rest = this.restaurants[i];


      }
      this.restaurants[i] = this.rest;
    }
  
    console.log(this.rest);

  }
}
