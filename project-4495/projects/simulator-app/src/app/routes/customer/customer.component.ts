import {Component, OnInit} from '@angular/core';
import {FirebaseDataService} from "@app/services/firebase/firebase-data.service";
import {Customer} from "@app/constant/models/customer/customer";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customers: Customer[];

  constructor(private _FirebaseDataService: FirebaseDataService) {

  }

  ngOnInit(): void {
    this._FirebaseDataService.getCustomer()
      .then((rs) => {
        this.customers = rs;
        console.log(rs);
      });
  }
}

