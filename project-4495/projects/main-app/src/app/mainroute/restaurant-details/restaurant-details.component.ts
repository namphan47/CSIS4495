import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseDataService, Meal, Restaurant} from 'library-app';


@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit, OnDestroy {
  private sub: any;
  id: string;
  restaurants: Restaurant[];
  detail;
  meal: Meal[];
  cartMeal = [];


  constructor(private route: ActivatedRoute, private _FirebaseDataService: FirebaseDataService) {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      const promise = this._FirebaseDataService.getRestaurant();
      promise
        .then((rs) => {
          this.restaurants = rs;

          // console.log(this.restaurants);
          for (let i = 0; i < this.restaurants.length; i++) {
            if (this.restaurants[i].id === this.id) {
              this.detail = this.restaurants[i];
            }
          }
          // console.log(this.detail);
          for (let i = 0, len = this.detail.meals.length; i < len; i++) {
            this.meal = this.detail.meals;
          }
          // console.log(this.meal);
          // console.log(this.meal);
        });


    });


  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

// creating an  json object inside an array

  addToCart(me: Meal) {
    this.cartCheck(me);
    if (true) {
      this.cartMeal.push({
        id: me.id,
        name: me.name,
        price: me.price,
        quantity: 1,

      });
    }
    console.log(this.cartMeal);
  }

  cartCheck(me: Meal) {
    for (let i = 0; i < this.cartMeal.length; i++) {

      console.log('h'+me.id);
      if (this.cartMeal[i] === me) {
        console.log('hi there' + this.cartMeal[i]);
        this.cartMeal[i].quantity += 1;
        return false;
      } else {
        return true;
      }
    }
  }


}

