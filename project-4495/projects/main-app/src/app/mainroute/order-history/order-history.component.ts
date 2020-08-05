import {Component, OnInit} from '@angular/core';
import {Delivery, FirebaseDataService, Order} from 'library-app';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  customerID: string;
  orders: Delivery[];
  customerOrders: Delivery[];
  restaurants


  constructor(private _FirebaseDataService: FirebaseDataService) {
  }

  ngOnInit(): void {

    const orderPromise = this._FirebaseDataService.getDeliveries();
    orderPromise.then((or) => {
      this.orders = or;

      this.customerOrders = [];

      this.customerID = localStorage.getItem('CustomerID');

      for (let i = 0; i < this.orders.length; i++) {

        if (this.customerID === this.orders[i].order.customer_id) {

          this.customerOrders.push(this.orders[i]);
        }
      }
      console.log(this.customerOrders);
    });

  }

}
