import {Component, OnInit} from '@angular/core';
import {FirebaseDataService} from "@app/services/firebase/firebase-data.service";
import {Order} from "@app/constant/models/order/order";
import {AngularFirestore} from "@angular/fire/firestore";

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

