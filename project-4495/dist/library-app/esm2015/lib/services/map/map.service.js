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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9tYXAvbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBUXpDLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFJckI7UUFDRSxxQkFBcUI7UUFDckIseUhBQXlIO1FBQ3pILHNCQUFzQjtRQUN0Qix5QkFBeUI7UUFDekIsVUFBVTtRQUNWLFdBQVc7SUFDYixDQUFDO0lBRUQsZUFBZSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFNUQsaUJBQWlCLENBQUMsS0FBSyxDQUFDO2dCQUN0QixNQUFNLEVBQUUsSUFBSTtnQkFDWixXQUFXLEVBQUUsRUFBRTtnQkFDZixVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2FBQzlDLEVBQUUsVUFBVSxRQUFRLEVBQUUsTUFBTTtnQkFDM0IsSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2lCQUNqRDtxQkFBTTtvQkFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO29CQUMzRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2pCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBOztBQWhDWSxVQUFVO0lBSHRCLFVBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7R0FDVyxVQUFVLENBZ0N0QjtTQWhDWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ3VpTWFwTW9kdWxlfSBmcm9tIFwiQG5ndWkvbWFwXCI7XHJcblxyXG5kZWNsYXJlIGNvbnN0IGdvb2dsZTogYW55O1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwU2VydmljZSB7XHJcblxyXG4gIG1hcDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIC8vICAgdGhpcy5yZW5kZXJEaXJlY3Rpb24obmV3IGdvb2dsZS5tYXBzLkxhdExuZyg0OS4yMDUzMzMsIC0xMjIuOTIwNDQxKSwgbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg0OS4yMDYxOTUsIC0xMjIuOTExNTU4KSlcclxuICAgIC8vICAgICAudGhlbigocnMpID0+IHtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKHJzKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH0sMTAwMCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJEaXJlY3Rpb24oZnJvbSwgdG8pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgZGlyZWN0aW9uc1NlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1NlcnZpY2U7XHJcblxyXG4gICAgICBkaXJlY3Rpb25zU2VydmljZS5yb3V0ZSh7XHJcbiAgICAgICAgb3JpZ2luOiBmcm9tLFxyXG4gICAgICAgIGRlc3RpbmF0aW9uOiB0byxcclxuICAgICAgICB0cmF2ZWxNb2RlOiBnb29nbGUubWFwcy5UcmF2ZWxNb2RlWydEUklWSU5HJ11cclxuICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlLCBzdGF0dXMpIHtcclxuICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzWydPSyddKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlWydyb3V0ZXMnXVswXVsnb3ZlcnZpZXdfcGF0aCddKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd2luZG93LmFsZXJ0KCdEaXJlY3Rpb25zIHJlcXVlc3QgZmFpbGVkIGR1ZSB0byAnICsgc3RhdHVzKTtcclxuICAgICAgICAgIHJlamVjdCgnZXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==