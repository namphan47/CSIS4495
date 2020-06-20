import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import _ from 'lodash';
import { ENUM_TABLES } from "../../constant/const-value";
import restaurantData from "../../dummy/restaurant.json";
import courierData from "../../dummy/courier.json";
import mealData from "../../dummy/meal.json";
import customerData from "../../dummy/customer.json";
import { of } from "rxjs";
import * as i0 from "@angular/core";
var DummyDataService = /** @class */ (function () {
    function DummyDataService() {
        var _a;
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
    DummyDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DummyDataService_Factory() { return new DummyDataService(); }, token: DummyDataService, providedIn: "root" });
    DummyDataService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], DummyDataService);
    return DummyDataService;
}());
export { DummyDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZGF0YS9kdW1teS1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUV2RCxPQUFPLGNBQWMsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUt4QjtJQVFFOztRQVBTLFVBQUs7WUFDWixHQUFDLFdBQVcsQ0FBQyxVQUFVLElBQUcsY0FBYztZQUN4QyxHQUFDLFdBQVcsQ0FBQyxRQUFRLElBQUcsWUFBWTtZQUNwQyxHQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUcsUUFBUTtZQUM1QixHQUFDLFdBQVcsQ0FBQyxPQUFPLElBQUcsV0FBVztnQkFDbEM7SUFHRixDQUFDO0lBRUQsa0RBQXVCLEdBQXZCLFVBQXdCLEtBQWtCLEVBQUUsVUFBb0M7UUFBaEYsaUJBZUM7UUFkQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPLEVBQUUsRUFBRTthQUNSLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQztZQUNKLElBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQUMsQ0FBQztnQkFDWixJQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztJQTFCVSxnQkFBZ0I7UUFINUIsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLGdCQUFnQixDQTRCNUI7MkJBekNEO0NBeUNDLEFBNUJELElBNEJDO1NBNUJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7RU5VTV9UQUJMRVN9IGZyb20gXCIuLi8uLi9jb25zdGFudC9jb25zdC12YWx1ZVwiO1xyXG5pbXBvcnQge0lEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcn0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9pLWRlZmF1bHQtbW9kZWxcIjtcclxuaW1wb3J0IHJlc3RhdXJhbnREYXRhIGZyb20gXCIuLi8uLi9kdW1teS9yZXN0YXVyYW50Lmpzb25cIjtcclxuaW1wb3J0IGNvdXJpZXJEYXRhIGZyb20gXCIuLi8uLi9kdW1teS9jb3VyaWVyLmpzb25cIjtcclxuaW1wb3J0IG1lYWxEYXRhIGZyb20gXCIuLi8uLi9kdW1teS9tZWFsLmpzb25cIjtcclxuaW1wb3J0IGN1c3RvbWVyRGF0YSBmcm9tIFwiLi4vLi4vZHVtbXkvY3VzdG9tZXIuanNvblwiO1xyXG5pbXBvcnQge29mfSBmcm9tIFwicnhqc1wiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHVtbXlEYXRhU2VydmljZSB7XHJcbiAgcmVhZG9ubHkgSlNPTlMgPSB7XHJcbiAgICBbRU5VTV9UQUJMRVMucmVzdGF1cmFudF06IHJlc3RhdXJhbnREYXRhLFxyXG4gICAgW0VOVU1fVEFCTEVTLmN1c3RvbWVyXTogY3VzdG9tZXJEYXRhLFxyXG4gICAgW0VOVU1fVEFCTEVTLm1lYWxdOiBtZWFsRGF0YSxcclxuICAgIFtFTlVNX1RBQkxFUy5jb3VyaWVyXTogY291cmllckRhdGEsXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICBjb252ZXJ0RHVtbXlEYXRhVG9Nb2RlbCh0YWJsZTogRU5VTV9UQUJMRVMsIG1vZGVsQ2xhc3M6IElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcik6IFByb21pc2U8YW55W10+IHtcclxuICAgIGlmICghdGhpcy5KU09OU1t0YWJsZV0pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2YoKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLkpTT05TW3RhYmxlXTtcclxuICAgICAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgICAgIF8ubWFwKGRhdGEsICh4KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBtb2RlbCA9IG5ldyBtb2RlbENsYXNzKHgpO1xyXG4gICAgICAgICAgYXJyYXkucHVzaChtb2RlbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG59XHJcblxyXG4iXX0=