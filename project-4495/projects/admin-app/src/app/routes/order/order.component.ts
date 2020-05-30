import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirebaseDataService, Order} from "library-app";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: Order[];

  constructor(private _FirebaseDataService: FirebaseDataService,
              private _AngularFirestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this._FirebaseDataService.getOrder()
      .then((rs) => {
        this.orders = rs;
        console.log(rs);
      });
  }
}

