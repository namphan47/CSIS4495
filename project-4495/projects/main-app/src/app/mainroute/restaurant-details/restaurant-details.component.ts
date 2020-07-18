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
  flag;


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
    // this.cartCheck(me);
    // if (this.flag === 1) {
    //   this.cartMeal.push({
    //     id: me.id,
    //     name: me.name,
    //     price: me.price,
    //     quantity: 1,
    //
    //   });
    // }
    // console.log(this.cartMeal);

    for (let j = 0; j < this.cartMeal.length; j++) {

      console.log('dsds' + me.id);
      if (me.id === this.cartMeal[j].id) {
        this.cartMeal[j].quantity++;
      } else {
        this.cartMeal[j].id = me.id,
          this.cartMeal[j].name = me.name,
          this.cartMeal[j].price = me.price,
          this.cartMeal[j].quantity = 1;
          console.log(me);
        console.log('this is cart items' + this.cartMeal[j]);
      }

    }

  }

  // cartCheck(me: Meal) {
  //   for (let i = 0; i < this.cartMeal.length; i++) {
  //
  //     console.log('h' + me.id);
  //     if (this.cartMeal[i].id === me.id) {
  //       console.log('hi there' + this.cartMeal[i]);
  //       this.cartMeal[i].quantity += 1;
  //       return this.flag = 0;
  //     } else {
  //       return this.flag = 1;
  //     }
  //   }
  // }


}

