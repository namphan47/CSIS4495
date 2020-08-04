import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Courier, Customer, Delivery, FirebaseDataService, Meal, OrderItem, Restaurant} from 'library-app';


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
  meals: Meal[];
  cart = [];
  subtotal = 0;
  delivery: Delivery;
  customerID: string;
  customers: Customer[];
  customer;


  constructor(private route: ActivatedRoute, private router: Router, private _FirebaseDataService: FirebaseDataService) {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      // getting customerID from local storage
      this.customerID = localStorage.getItem('CustomerID');

      console.log('CustomerID:' + this.customerID);

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
            this.meals = this.detail.meals;
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
        meal: me,

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


    const orders = [];
    for (let k = 0; k < this.cart.length; k++) {

      const item =
        new OrderItem({
          meal_id: this.cart[k].id,
          quantity: this.cart[k].quantity,
        });
      item.meal = this.cart[k].meal;
      orders.push(item);
    }

    // getting customer from api

    const getCustomer = this._FirebaseDataService.getCustomer();
    getCustomer.then((cx) => {

      this.customers = cx;

      for (let i = 0; i < this.customers.length; i++) {

        if (this.customerID === this.customers[i].id) {
          this.customer = this.customers[i];
        }
      }

      console.log(this.customer);
      const promise = this._FirebaseDataService.checkout(this.customer, this.detail, orders);

      promise
        .then((cr) => {
          this.delivery = cr;
          console.log(this.delivery);
          this.router.navigate(['/main/', 'delivery'], {queryParams: {deliveryID: this.delivery.id}});
        });
    });


  }


}

