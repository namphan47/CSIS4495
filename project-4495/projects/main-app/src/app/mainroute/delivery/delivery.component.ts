import {Component, OnInit} from '@angular/core';
import {Courier, Delivery, FirebaseDataService, Order} from 'library-app';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  sub;

  deliveryID: string;
  orderID: string;
  courierID: string;
  customerID: string;
  delivery: Delivery;
  orders: Order[];
  couriers: Courier[];
  order;
  courier;
  customer;
  restaurant;

  constructor(private  router: Router, private route: ActivatedRoute, private _FirebaseDataService: FirebaseDataService) {

  }

  ngOnInit(): void {

    this.sub = this.route.queryParamMap.subscribe(queryParams => {
      this.deliveryID = queryParams.get('deliveryID');

      console.log(this.deliveryID);

      const promise = this._FirebaseDataService.getDeliveryById(this.deliveryID);

      promise.then((de) => {

        this.delivery = de;
        this.orderID = this.delivery.order_id;
        this.courierID = this.delivery.courier_id;


        console.log(this.delivery);

// order retreival from all orders
        const ordersPromise = this._FirebaseDataService.getOrders();

        ordersPromise.then((or) => {

          this.orders = or;
          // console.log(this.orders);

          for (let i = 0; i < this.orders.length; i++) {
            if (this.orderID === this.orders[i].id) {
              this.order = this.orders[i];
            }

          }

          // console.log(this.order);

          // Courier retreival for couriers
          const courierPromise = this._FirebaseDataService.getCourier();

          courierPromise.then((cr) => {

            this.couriers = cr;

            console.log(this.couriers);
            for (let i = 0; i < this.couriers.length; i++) {
              if (this.courierID === this.couriers[i].id) {
                this.courier = this.couriers[i];
              }
            }

            //   console.log(this.courier);

// Customer retrieval from order

            this.customer = this.order.customer;
            //  console.log(this.customer);
            // console.log('customer location');
            // console.log(this.customer.lat);
            // console.log(this.customer.lng);

            // Restaurant retrieval from order
            this.restaurant = this.order.restaurant;
            //    console.log(this.restaurant);
            // console.log('restaurant Location');
            // console.log(this.restaurant.lat);
            // console.log(this.restaurant.lng);

          });

        });


      });


    });

    this._FirebaseDataService.getPointsRealTime(this.delivery.id)
      .subscribe((rs) => {
            console.log(rs);

      });


  }
}
