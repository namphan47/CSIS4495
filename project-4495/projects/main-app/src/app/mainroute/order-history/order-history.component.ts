import {Component, OnInit} from '@angular/core';
import {Delivery, FirebaseDataService,} from 'library-app';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  customerID: string;
  orders: Delivery[];
  customerOrders: Delivery[];
  restaurants;
  deliveryID: String;


  constructor(private _FirebaseDataService: FirebaseDataService, private route: ActivatedRoute, private router: Router) {
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
          this.deliveryID = this.orders[i].id;
          this.customerOrders =  this.customerOrders.slice().sort((a, b) => b.order.date_time - a.order.date_time);
        }
      }
      console.log(this.customerOrders);
    });

  }

  gotoDelivery() {

    this.router.navigate(['/main/', 'delivery'], {queryParams: {deliveryID: this.deliveryID}});

  }

}
