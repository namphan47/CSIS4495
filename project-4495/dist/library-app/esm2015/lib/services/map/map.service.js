import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
let MapService = class MapService {
    constructor() {
        // setTimeout(() => {
        //   this.renderDirection(new google.maps.LatLng(49.205333, -122.920441), new google.maps.LatLng(49.206195, -122.911558))
        //     .then((rs) => {
        //       console.log(rs);
        //     });
        // },1000);
    }
    renderDirection(from, to) {
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
                }
                else {
                    window.alert('Directions request failed due to ' + status);
                    reject('error');
                }
            });
        });
    }
};
MapService.ɵprov = i0.ɵɵdefineInjectable({ factory: function MapService_Factory() { return new MapService(); }, token: MapService, providedIn: "root" });
MapService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MapService);
export { MapService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9tYXAvbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBUXpDLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFJckI7UUFDRSxxQkFBcUI7UUFDckIseUhBQXlIO1FBQ3pILHNCQUFzQjtRQUN0Qix5QkFBeUI7UUFDekIsVUFBVTtRQUNWLFdBQVc7SUFDYixDQUFDO0lBRUQsZUFBZSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFNUQsaUJBQWlCLENBQUMsS0FBSyxDQUFDO2dCQUN0QixNQUFNLEVBQUUsSUFBSTtnQkFDWixXQUFXLEVBQUUsRUFBRTtnQkFDZixVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2FBQzlDLEVBQUUsVUFBVSxRQUFRLEVBQUUsTUFBTTtnQkFDM0IsSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2lCQUNqRDtxQkFBTTtvQkFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO29CQUMzRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2pCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBOztBQWhDWSxVQUFVO0lBSHRCLFVBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7R0FDVyxVQUFVLENBZ0N0QjtTQWhDWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd1aU1hcE1vZHVsZX0gZnJvbSBcIkBuZ3VpL21hcFwiO1xuXG5kZWNsYXJlIGNvbnN0IGdvb2dsZTogYW55O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNYXBTZXJ2aWNlIHtcblxuICBtYXA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gICB0aGlzLnJlbmRlckRpcmVjdGlvbihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDQ5LjIwNTMzMywgLTEyMi45MjA0NDEpLCBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDQ5LjIwNjE5NSwgLTEyMi45MTE1NTgpKVxuICAgIC8vICAgICAudGhlbigocnMpID0+IHtcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhycyk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH0sMTAwMCk7XG4gIH1cblxuICByZW5kZXJEaXJlY3Rpb24oZnJvbSwgdG8pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3Rpb25zU2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zU2VydmljZTtcblxuICAgICAgZGlyZWN0aW9uc1NlcnZpY2Uucm91dGUoe1xuICAgICAgICBvcmlnaW46IGZyb20sXG4gICAgICAgIGRlc3RpbmF0aW9uOiB0byxcbiAgICAgICAgdHJhdmVsTW9kZTogZ29vZ2xlLm1hcHMuVHJhdmVsTW9kZVsnRFJJVklORyddXG4gICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UsIHN0YXR1cykge1xuICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzWydPSyddKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VbJ3JvdXRlcyddWzBdWydvdmVydmlld19wYXRoJ10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5hbGVydCgnRGlyZWN0aW9ucyByZXF1ZXN0IGZhaWxlZCBkdWUgdG8gJyArIHN0YXR1cyk7XG4gICAgICAgICAgcmVqZWN0KCdlcnJvcicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19