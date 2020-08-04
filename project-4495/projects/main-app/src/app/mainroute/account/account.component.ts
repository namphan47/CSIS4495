import {Component, OnInit} from '@angular/core';
import {Customer, FirebaseDataService} from 'library-app';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  customers: Customer[];
  customerID: String;
  customer;

  constructor(private _FirebaseDataService: FirebaseDataService) {
  }

  ngOnInit(): void {
    // Retrieve customers by calling  API using promise

    const customerPromise = this._FirebaseDataService.getCustomer();

    customerPromise.then((cx) => {

      this.customers = cx;

      // getting authorised customer id from local storage

      this.customerID = localStorage.getItem('CustomerID');
      // getting details of the current customer by comparing customer id with customers array
      for (let i = 0; i < this.customers.length; i++) {

        if (this.customerID === this.customers[i].id) {
          this.customer = this.customers[i];
        }

      }


    });

  }

}
