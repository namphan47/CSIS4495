import {Component, OnInit} from '@angular/core';
import {FirebaseDataService} from "library-app";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  options: any = {
    styles: [
      {
        featureType: "poi",
        stylers: [
          {visibility: "off"}
        ]
      }
    ]
  };

  constructor(private _FirebaseDataService: FirebaseDataService) {
    this._FirebaseDataService.getCustomer()
      .then((rs) => {
        console.log(rs);
      });

    this._FirebaseDataService.getRestaurant()
      .then((rs) => {
        console.log(rs);
      });

    // this._FirebaseDataService.linkRestaurantMealDB();
  }

  ngOnInit(): void {
  }

}
