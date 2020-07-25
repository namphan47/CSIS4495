import {Component, OnInit} from '@angular/core';
import {Customer, FirebaseDataService, Meal, Restaurant} from 'library-app';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[];
  customers: Customer[];
  searchedRestaurant: Restaurant[];
  customer;
  customerID: string;
  sub;
  searchData = {
    RestaurantName: ''
  };

  constructor(private _FirebaseDataService: FirebaseDataService, private router: Router, private activatedRouter: ActivatedRoute) {

   this.customerID = localStorage.getItem('CustomerID');

  }

  ngOnInit(): void {
    // call after ui is rendered
    // console.log(2);

    // start to call api to load restaurants
    const promise = this._FirebaseDataService.getRestaurant();
    promise
      .then((rs) => {
        this.restaurants = rs;
        this.searchedRestaurant = this.restaurants;
        // console.log(this.restaurants);
        // console.log(this.restaurants[2].lat);
        // console.log(this.restaurants[2].lng);
      });
    // start to call api to load customers

    const customerPromise = this._FirebaseDataService.getCustomer();

    customerPromise.then((cx) => {
      this.customers = cx;

      // retreive customer from customers

      for (let i = 0; i < this.customers.length; i++) {

        if (this.customerID === this.customers[i].id) {
          this.customer = this.customers[i];
        }

      }

      console.log('lat:' + this.customer.lat + '\nlng:' + this.customer.lng);
    });

  }

  search() {

    this.searchedRestaurant = [];
    for (let i = 0; i < this.restaurants.length; i++) {
      if (this.restaurants[i].name.toLowerCase().includes(this.searchData.RestaurantName)) {
        console.log('it is true');
        this.searchedRestaurant.push(this.restaurants[i]);

      }
    }

    console.log(this.searchedRestaurant);

  }

  onSearchValueChanged($event: any) {
    if ($event.length === 0) {
      this.searchedRestaurant = this.restaurants;

    }
  }
}
