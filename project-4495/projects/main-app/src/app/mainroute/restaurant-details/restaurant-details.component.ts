import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseDataService, Meal, Restaurant} from 'library-app';


@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit, OnDestroy {
  private sub: any;
  id: string;
  private restaurants: Restaurant[];
  private meals: Meal[];
  private restaurantDetail: Restaurant;
  private detail;


  constructor(private route: ActivatedRoute, private _FirebaseDataService: FirebaseDataService) {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      const promise = this._FirebaseDataService.getRestaurant();
      promise
        .then((rs) => {
          this.restaurants = rs;
          console.log(this.detail);
          console.log(this.restaurants);

          for (let i = 0 ; i < this.restaurants.length; i++) {
            if (this.restaurants[i].id = this.id) {
              this.detail = this.restaurants[i];
            }
          }
          console.log(this.detail);
        });


    });


  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}

