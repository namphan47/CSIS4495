import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireDatabase} from "@angular/fire/database";
import {FirebaseDataService} from "../../services/firebase/firebase-data.service";
import {DummyDataService} from "../../services/data/dummy-data.service";
import {Customer} from "@app/constant/models/customer/customer";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  item: Observable<any>;
  items: Observable<any[]>;
  itemsRT: Observable<any[]>;

  constructor(private _AngularFirestore: AngularFirestore,
              private db: AngularFireDatabase,
              private _FirebaseDataService: FirebaseDataService,
              private _DummyDataService: DummyDataService) {
    // this.items = firestore.collection('items').valueChanges();

    // this.itemsRT = db.list('items').valueChanges();
    this._DummyDataService.convertDummyDataToModel(DummyDataService.TABLES.customer, Customer)
      .then((rs) => {
        let itemsCollection = _AngularFirestore.collection('items');
        console.log(itemsCollection.valueChanges());
        itemsCollection.add(rs[0]);
      });
    // let itemDoc = _AngularFirestore.doc<Customer>('items');
    let itemsCollection = _AngularFirestore.collection('items');
    console.log(itemsCollection.valueChanges());

  }

  ngOnInit(): void {
    //   const itemRef = this.db.object('item');
    //   itemRef.set({name: 'new name!'});
    //
    //   this.item = this.db.object('item').valueChanges();
    //
    //   const itemsRef = this.db.list('items');
    //   itemsRef.push({size: 3});
  }

}
