import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseDataService, Meal, OrderItem, Restaurant} from 'library-app';


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
  cart = [];
  subtotal = 0;


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

    // console.log(me);

    if (this.checkCart(me)) {
      this.cart.push({
        id: me.id,
        name: me.name,
        price: me.price,
        quantity: 1,

      });
    }
    // console.log(this.cart);
    this.calculateSubtotal();

  }

  checkCart(me: Meal) {
    for (let i = 0; i < this.cart.length; i++) {

      console.log('mealID: ' + me.id);
      console.log('cartid: ' + this.cart[i].id);
      if (this.cart[i].id === me.id) {
        this.cart[i].quantity++;
        return false;

      }
    }
    return true;
  }


  removeItem(item: any) {
    // console.log('Item ID: ' + item.id);

    for (let j = 0; j < this.cart.length; j++) {

      if (this.cart[j].id === item.id) {
        this.cart.splice(j, 1);
      }

    }
    this.calculateSubtotal();

  }

  calculateSubtotal() {
    this.subtotal = 0;
    for (let k = 0; k < this.cart.length; k++) {
      this.subtotal += this.cart[k].quantity * this.cart[k].price;
      this.subtotal = Math.round(this.subtotal * 100) / 100.0;

    }

  }

  checkout() {
    const order = [];
    for (let k = 0; k < this.cart.length; k++) {


      order.push(new OrderItem({
        meal_id: this.cart[k].id,
        quantity: this.cart[k].quantity,
      }));
    }
    // this._FirebaseDataService.checkout(, this.detail.name,)

  }
}

