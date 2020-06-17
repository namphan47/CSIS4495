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
var DummyDataService = /** @class */ (function () {
    function DummyDataService(_UtilsService) {
        var _a;
        this._UtilsService = _UtilsService;
        this.JSONS = (_a = {},
            _a[ENUM_TABLES.restaurant] = restaurantData,
            _a[ENUM_TABLES.customer] = customerData,
            _a[ENUM_TABLES.meal] = mealData,
            _a[ENUM_TABLES.courier] = courierData,
            _a);
    }
    DummyDataService.prototype.convertDummyDataToModel = function (table, modelClass) {
        var _this = this;
        if (!this.JSONS[table]) {
            return Promise.resolve([]);
        }
        return of()
            .toPromise()
            .then(function () {
            var data = _this.JSONS[table];
            var array = [];
            _.map(data, function (x) {
                var model = new modelClass(x);
                array.push(model);
            });
            return array;
        });
    };
    DummyDataService.ctorParameters = function () { return [
        { type: UtilsService }
    ]; };
    DummyDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DummyDataService_Factory() { return new DummyDataService(i0.ɵɵinject(i1.UtilsService)); }, token: DummyDataService, providedIn: "root" });
    DummyDataService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], DummyDataService);
    return DummyDataService;
}());
export { DummyDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZGF0YS9kdW1teS1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUV2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFbkQsT0FBTyxjQUFjLE1BQU0sNkJBQTZCLENBQUM7QUFDekQsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxFQUFDLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7O0FBS3hCO0lBUUUsMEJBQW9CLGFBQTJCOztRQUEzQixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQVB0QyxVQUFLO1lBQ1osR0FBQyxXQUFXLENBQUMsVUFBVSxJQUFHLGNBQWM7WUFDeEMsR0FBQyxXQUFXLENBQUMsUUFBUSxJQUFHLFlBQVk7WUFDcEMsR0FBQyxXQUFXLENBQUMsSUFBSSxJQUFHLFFBQVE7WUFDNUIsR0FBQyxXQUFXLENBQUMsT0FBTyxJQUFHLFdBQVc7Z0JBQ2xDO0lBR0YsQ0FBQztJQUVELGtEQUF1QixHQUF2QixVQUF3QixLQUFrQixFQUFFLFVBQW9DO1FBQWhGLGlCQWVDO1FBZEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxFQUFFLEVBQUU7YUFDUixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUM7WUFDSixJQUFNLElBQUksR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFDLENBQUM7Z0JBQ1osSUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBbEJrQyxZQUFZOzs7SUFScEMsZ0JBQWdCO1FBSDVCLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7T0FDVyxnQkFBZ0IsQ0E0QjVCOzJCQTNDRDtDQTJDQyxBQTVCRCxJQTRCQztTQTVCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQge0VOVU1fVEFCTEVTfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvY29uc3QtdmFsdWVcIjtcclxuaW1wb3J0IHtJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3J9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvaS1kZWZhdWx0LW1vZGVsXCI7XHJcbmltcG9ydCB7VXRpbHNTZXJ2aWNlfSBmcm9tIFwiLi4vbWljcy91dGlscy5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgcmVzdGF1cmFudERhdGEgZnJvbSBcIi4uLy4uL2R1bW15L3Jlc3RhdXJhbnQuanNvblwiO1xyXG5pbXBvcnQgY291cmllckRhdGEgZnJvbSBcIi4uLy4uL2R1bW15L2NvdXJpZXIuanNvblwiO1xyXG5pbXBvcnQgbWVhbERhdGEgZnJvbSBcIi4uLy4uL2R1bW15L21lYWwuanNvblwiO1xyXG5pbXBvcnQgY3VzdG9tZXJEYXRhIGZyb20gXCIuLi8uLi9kdW1teS9jdXN0b21lci5qc29uXCI7XHJcbmltcG9ydCB7b2Z9IGZyb20gXCJyeGpzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEdW1teURhdGFTZXJ2aWNlIHtcclxuICByZWFkb25seSBKU09OUyA9IHtcclxuICAgIFtFTlVNX1RBQkxFUy5yZXN0YXVyYW50XTogcmVzdGF1cmFudERhdGEsXHJcbiAgICBbRU5VTV9UQUJMRVMuY3VzdG9tZXJdOiBjdXN0b21lckRhdGEsXHJcbiAgICBbRU5VTV9UQUJMRVMubWVhbF06IG1lYWxEYXRhLFxyXG4gICAgW0VOVU1fVEFCTEVTLmNvdXJpZXJdOiBjb3VyaWVyRGF0YSxcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9VdGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSkge1xyXG4gIH1cclxuXHJcbiAgY29udmVydER1bW15RGF0YVRvTW9kZWwodGFibGU6IEVOVU1fVEFCTEVTLCBtb2RlbENsYXNzOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3IpOiBQcm9taXNlPGFueVtdPiB7XHJcbiAgICBpZiAoIXRoaXMuSlNPTlNbdGFibGVdKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9mKClcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5KU09OU1t0YWJsZV07XHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSBbXTtcclxuICAgICAgICBfLm1hcChkYXRhLCAoeCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbW9kZWwgPSBuZXcgbW9kZWxDbGFzcyh4KTtcclxuICAgICAgICAgIGFycmF5LnB1c2gobW9kZWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuIl19