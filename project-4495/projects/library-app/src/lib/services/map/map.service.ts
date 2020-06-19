import {Injectable} from '@angular/core';
import {NguiMapModule} from "@ngui/map";

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map;

  constructor() {
    // setTimeout(() => {
    //   this.renderDirection(new google.maps.LatLng(49.205333, -122.920441), new google.maps.LatLng(49.206195, -122.911558))
    //     .then((rs) => {
    //       console.log(rs);
    //     });
    // },1000);
  }

  renderDirection(from, to): Promise<any> {
    return new Promise((resolve, reject) => {
      const directionsService = new google.maps.DirectionsService;

      directionsService.route({
        origin: from,
        destination: to,
        travelMode: google.maps.TravelMode['DRIVING']
      }, function (response, status) {
        if (status === google.maps.DirectionsStatus['OK']) {
          console.log(response);
          resolve(response['routes'][0]['overview_path']);
        } else {
          window.alert('Directions request failed due to ' + status);
          reject('error');
        }
      });
    });
  }
}
