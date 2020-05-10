import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  item: Observable<any>;
  items: Observable<any[]>;
  itemsRT: Observable<any[]>;

  constructor(private firestore: AngularFirestore,
              private db: AngularFireDatabase) {
    this.items = firestore.collection('items').valueChanges();

    // this.itemsRT = db.list('items').valueChanges();
  }

  ngOnInit(): void {
    const itemRef = this.db.object('item');
    itemRef.set({name: 'new name!'});

    this.item = this.db.object('item').valueChanges();

    const itemsRef = this.db.list('items');
    itemsRef.push({size: 3});
  }

}
