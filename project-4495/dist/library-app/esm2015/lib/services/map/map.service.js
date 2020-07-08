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
    getLatLngFromAddress(address) {
        return new Promise((resolve, reject) => {
            const geocoder = new google.maps.Geocoder;
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status === 'OK') {
                    console.log(results);
                    resolve(results[0]['geometry']['location']);
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9tYXAvbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBUXpDLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFJckI7UUFDRSxxQkFBcUI7UUFDckIseUhBQXlIO1FBQ3pILHNCQUFzQjtRQUN0Qix5QkFBeUI7UUFDekIsVUFBVTtRQUNWLFdBQVc7SUFDYixDQUFDO0lBRUQsZUFBZSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFNUQsaUJBQWlCLENBQUMsS0FBSyxDQUFDO2dCQUN0QixNQUFNLEVBQUUsSUFBSTtnQkFDWixXQUFXLEVBQUUsRUFBRTtnQkFDZixVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2FBQzlDLEVBQUUsVUFBVSxRQUFRLEVBQUUsTUFBTTtnQkFDM0IsSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2lCQUNqRDtxQkFBTTtvQkFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO29CQUMzRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2pCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxPQUFlO1FBQ2xDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsTUFBTSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMxQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU07Z0JBQzlELElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtvQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2lCQUM3QztxQkFBTTtvQkFDTCxLQUFLLENBQUMsdURBQXVELEdBQUcsTUFBTSxDQUFDLENBQUM7b0JBQ3hFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDakI7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7O0FBL0NZLFVBQVU7SUFIdEIsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLFVBQVUsQ0ErQ3RCO1NBL0NZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05ndWlNYXBNb2R1bGV9IGZyb20gXCJAbmd1aS9tYXBcIjtcclxuXHJcbmRlY2xhcmUgY29uc3QgZ29vZ2xlOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBTZXJ2aWNlIHtcclxuXHJcbiAgbWFwO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgLy8gICB0aGlzLnJlbmRlckRpcmVjdGlvbihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDQ5LjIwNTMzMywgLTEyMi45MjA0NDEpLCBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDQ5LjIwNjE5NSwgLTEyMi45MTE1NTgpKVxyXG4gICAgLy8gICAgIC50aGVuKChycykgPT4ge1xyXG4gICAgLy8gICAgICAgY29uc29sZS5sb2cocnMpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfSwxMDAwKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckRpcmVjdGlvbihmcm9tLCB0byk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBkaXJlY3Rpb25zU2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zU2VydmljZTtcclxuXHJcbiAgICAgIGRpcmVjdGlvbnNTZXJ2aWNlLnJvdXRlKHtcclxuICAgICAgICBvcmlnaW46IGZyb20sXHJcbiAgICAgICAgZGVzdGluYXRpb246IHRvLFxyXG4gICAgICAgIHRyYXZlbE1vZGU6IGdvb2dsZS5tYXBzLlRyYXZlbE1vZGVbJ0RSSVZJTkcnXVxyXG4gICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UsIHN0YXR1cykge1xyXG4gICAgICAgIGlmIChzdGF0dXMgPT09IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTdGF0dXNbJ09LJ10pIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VbJ3JvdXRlcyddWzBdWydvdmVydmlld19wYXRoJ10pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3aW5kb3cuYWxlcnQoJ0RpcmVjdGlvbnMgcmVxdWVzdCBmYWlsZWQgZHVlIHRvICcgKyBzdGF0dXMpO1xyXG4gICAgICAgICAgcmVqZWN0KCdlcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldExhdExuZ0Zyb21BZGRyZXNzKGFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBnZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcjtcclxuICAgICAgZ2VvY29kZXIuZ2VvY29kZSh7J2FkZHJlc3MnOiBhZGRyZXNzfSwgZnVuY3Rpb24gKHJlc3VsdHMsIHN0YXR1cykge1xyXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdPSycpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xyXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHRzWzBdWydnZW9tZXRyeSddWydsb2NhdGlvbiddKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYWxlcnQoJ0dlb2NvZGUgd2FzIG5vdCBzdWNjZXNzZnVsIGZvciB0aGUgZm9sbG93aW5nIHJlYXNvbjogJyArIHN0YXR1cyk7XHJcbiAgICAgICAgICByZWplY3QoJ2Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=