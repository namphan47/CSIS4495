import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import _ from 'lodash';
import { ENUM_TABLES } from "../../constant/const-value";
import { UtilsService } from "../mics/utils.service";
import restaurantData from "../../dummy/restaurant.json";
import courierData from "../../dummy/courier.json";
import mealData from "../../dummy/meal.json";
import customerData from "../../dummy/customer.json";
import { of } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "../mics/utils.service";
let DummyDataService = class DummyDataService {
    constructor(_UtilsService) {
        this._UtilsService = _UtilsService;
        this.CONSTANT_PATH = 'assets/dummy/';
        this.JSONS = {
            [ENUM_TABLES.restaurant]: restaurantData,
            [ENUM_TABLES.customer]: customerData,
            [ENUM_TABLES.meal]: mealData,
            [ENUM_TABLES.courier]: courierData,
        };
    }
    convertDummyDataToModel(table, modelClass) {
        if (!this.JSONS[table]) {
            return Promise.resolve([]);
        }
        return of()
            .toPromise()
            .then(() => {
            const data = this.JSONS[table];
            const array = [];
            _.map(data, (x) => {
                const model = new modelClass(x);
                array.push(model);
            });
            return array;
        });
        // return this._UtilsService.getJSON(this.CONSTANT_PATH + this.JSONS[table])
        //   .pipe(
        //     tap(),
        //     first()
        //   )
        //   .toPromise()
        //   .then(data => {
        //     const array = [];
        //     _.map(data, (x) => {
        //       const model = new modelClass(x);
        //       array.push(model);
        //     });
        //     return array;
        //   });
    }
};
DummyDataService.ctorParameters = () => [
    { type: UtilsService }
];
DummyDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DummyDataService_Factory() { return new DummyDataService(i0.ɵɵinject(i1.UtilsService)); }, token: DummyDataService, providedIn: "root" });
DummyDataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DummyDataService);
export { DummyDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZGF0YS9kdW1teS1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUV2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFbkQsT0FBTyxjQUFjLE1BQU0sNkJBQTZCLENBQUM7QUFDekQsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxFQUFDLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7O0FBS3hCLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBUzNCLFlBQW9CLGFBQTJCO1FBQTNCLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBUnRDLGtCQUFhLEdBQUcsZUFBZSxDQUFDO1FBQ2hDLFVBQUssR0FBRztZQUNmLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLGNBQWM7WUFDeEMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsWUFBWTtZQUNwQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRO1lBQzVCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFdBQVc7U0FDbkMsQ0FBQztJQUdGLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxLQUFrQixFQUFFLFVBQW9DO1FBQzlFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1QjtRQUNELE9BQU8sRUFBRSxFQUFFO2FBQ1IsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNULE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztRQUNMLDRFQUE0RTtRQUM1RSxXQUFXO1FBQ1gsYUFBYTtRQUNiLGNBQWM7UUFDZCxNQUFNO1FBQ04saUJBQWlCO1FBQ2pCLG9CQUFvQjtRQUNwQix3QkFBd0I7UUFDeEIsMkJBQTJCO1FBQzNCLHlDQUF5QztRQUN6QywyQkFBMkI7UUFDM0IsVUFBVTtRQUNWLG9CQUFvQjtRQUNwQixRQUFRO0lBQ1YsQ0FBQztDQUVGLENBQUE7O1lBbENvQyxZQUFZOzs7QUFUcEMsZ0JBQWdCO0lBSDVCLFVBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7R0FDVyxnQkFBZ0IsQ0EyQzVCO1NBM0NZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7Zmlyc3QsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge0VOVU1fVEFCTEVTfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvY29uc3QtdmFsdWVcIjtcclxuaW1wb3J0IHtJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3J9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvaS1kZWZhdWx0LW1vZGVsXCI7XHJcbmltcG9ydCB7VXRpbHNTZXJ2aWNlfSBmcm9tIFwiLi4vbWljcy91dGlscy5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgcmVzdGF1cmFudERhdGEgZnJvbSBcIi4uLy4uL2R1bW15L3Jlc3RhdXJhbnQuanNvblwiO1xyXG5pbXBvcnQgY291cmllckRhdGEgZnJvbSBcIi4uLy4uL2R1bW15L2NvdXJpZXIuanNvblwiO1xyXG5pbXBvcnQgbWVhbERhdGEgZnJvbSBcIi4uLy4uL2R1bW15L21lYWwuanNvblwiO1xyXG5pbXBvcnQgY3VzdG9tZXJEYXRhIGZyb20gXCIuLi8uLi9kdW1teS9jdXN0b21lci5qc29uXCI7XHJcbmltcG9ydCB7b2Z9IGZyb20gXCJyeGpzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEdW1teURhdGFTZXJ2aWNlIHtcclxuICByZWFkb25seSBDT05TVEFOVF9QQVRIID0gJ2Fzc2V0cy9kdW1teS8nO1xyXG4gIHJlYWRvbmx5IEpTT05TID0ge1xyXG4gICAgW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdOiByZXN0YXVyYW50RGF0YSxcclxuICAgIFtFTlVNX1RBQkxFUy5jdXN0b21lcl06IGN1c3RvbWVyRGF0YSxcclxuICAgIFtFTlVNX1RBQkxFUy5tZWFsXTogbWVhbERhdGEsXHJcbiAgICBbRU5VTV9UQUJMRVMuY291cmllcl06IGNvdXJpZXJEYXRhLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX1V0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxuICBjb252ZXJ0RHVtbXlEYXRhVG9Nb2RlbCh0YWJsZTogRU5VTV9UQUJMRVMsIG1vZGVsQ2xhc3M6IElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcik6IFByb21pc2U8YW55W10+IHtcclxuICAgIGlmICghdGhpcy5KU09OU1t0YWJsZV0pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2YoKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLkpTT05TW3RhYmxlXTtcclxuICAgICAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgICAgIF8ubWFwKGRhdGEsICh4KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBtb2RlbCA9IG5ldyBtb2RlbENsYXNzKHgpO1xyXG4gICAgICAgICAgYXJyYXkucHVzaChtb2RlbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgICB9KTtcclxuICAgIC8vIHJldHVybiB0aGlzLl9VdGlsc1NlcnZpY2UuZ2V0SlNPTih0aGlzLkNPTlNUQU5UX1BBVEggKyB0aGlzLkpTT05TW3RhYmxlXSlcclxuICAgIC8vICAgLnBpcGUoXHJcbiAgICAvLyAgICAgdGFwKCksXHJcbiAgICAvLyAgICAgZmlyc3QoKVxyXG4gICAgLy8gICApXHJcbiAgICAvLyAgIC50b1Byb21pc2UoKVxyXG4gICAgLy8gICAudGhlbihkYXRhID0+IHtcclxuICAgIC8vICAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgLy8gICAgIF8ubWFwKGRhdGEsICh4KSA9PiB7XHJcbiAgICAvLyAgICAgICBjb25zdCBtb2RlbCA9IG5ldyBtb2RlbENsYXNzKHgpO1xyXG4gICAgLy8gICAgICAgYXJyYXkucHVzaChtb2RlbCk7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgLy8gICB9KTtcclxuICB9XHJcblxyXG59XHJcblxyXG4iXX0=