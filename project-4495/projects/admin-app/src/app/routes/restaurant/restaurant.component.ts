import {Component, OnInit} from '@angular/core';
import {FirebaseDataService, Restaurant} from "library-app";

@Component({
    selector: 'app-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
    restaurants: Restaurant[];

    constructor(private _FirebaseDataService: FirebaseDataService) {

    }

    ngOnInit(): void {
        this.onRefresh();
    }

    onRefresh() {
        this._FirebaseDataService.getRestaurant()
            .then((rs) => {
                this.restaurants = rs;
                console.log(rs);
            });
    }
}
