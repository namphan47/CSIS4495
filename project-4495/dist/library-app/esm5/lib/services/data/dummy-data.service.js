import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import _ from 'lodash';
import { first, tap } from 'rxjs/operators';
import { ENUM_TABLES } from "../../constant/const-value";
import { UtilsService } from "../mics/utils.service";
import * as i0 from "@angular/core";
import * as i1 from "../mics/utils.service";
var DummyDataService = /** @class */ (function () {
    function DummyDataService(_UtilsService) {
        var _a;
        this._UtilsService = _UtilsService;
        this.CONSTANT_PATH = 'assets/dummy/';
        this.JSONS = (_a = {},
            _a[ENUM_TABLES.restaurant] = 'restaurant.json',
            _a[ENUM_TABLES.customer] = 'customer.json',
            _a[ENUM_TABLES.meal] = 'meal.json',
            _a[ENUM_TABLES.courier] = 'courier.json',
            _a);
    }
    DummyDataService.prototype.convertDummyDataToModel = function (table, modelClass) {
        if (!this.JSONS[table]) {
            return Promise.resolve([]);
        }
        return this._UtilsService.getJSON(this.CONSTANT_PATH + this.JSONS[table])
            .pipe(tap(), first())
            .toPromise()
            .then(function (data) {
            var array = [];
            _.map(data, function (x) {
                var model = new modelClass(x);
                array.push(model);
            });
            return array;
        });
    };
    DummyDataService.TABLES = ENUM_TABLES;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZGF0YS9kdW1teS1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRXZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBS25EO0lBVUUsMEJBQW9CLGFBQTJCOztRQUEzQixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQVJ0QyxrQkFBYSxHQUFHLGVBQWUsQ0FBQztRQUNoQyxVQUFLO1lBQ1osR0FBQyxXQUFXLENBQUMsVUFBVSxJQUFHLGlCQUFpQjtZQUMzQyxHQUFDLFdBQVcsQ0FBQyxRQUFRLElBQUcsZUFBZTtZQUN2QyxHQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUcsV0FBVztZQUMvQixHQUFDLFdBQVcsQ0FBQyxPQUFPLElBQUcsY0FBYztnQkFDckM7SUFHRixDQUFDO0lBRUQsa0RBQXVCLEdBQXZCLFVBQXdCLEtBQWtCLEVBQUUsVUFBb0M7UUFDOUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEUsSUFBSSxDQUNILEdBQUcsRUFBRSxFQUNMLEtBQUssRUFBRSxDQUNSO2FBQ0EsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUNSLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFDLENBQUM7Z0JBQ1osSUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTlCTSx1QkFBTSxHQUFHLFdBQVcsQ0FBQzs7Z0JBU08sWUFBWTs7O0lBVnBDLGdCQUFnQjtRQUg1QixVQUFVLENBQUM7WUFDVixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDO09BQ1csZ0JBQWdCLENBaUM1QjsyQkEzQ0Q7Q0EyQ0MsQUFqQ0QsSUFpQ0M7U0FqQ1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHtmaXJzdCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7RU5VTV9UQUJMRVN9IGZyb20gXCIuLi8uLi9jb25zdGFudC9jb25zdC12YWx1ZVwiO1xyXG5pbXBvcnQge0lEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcn0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9pLWRlZmF1bHQtbW9kZWxcIjtcclxuaW1wb3J0IHtVdGlsc1NlcnZpY2V9IGZyb20gXCIuLi9taWNzL3V0aWxzLnNlcnZpY2VcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIER1bW15RGF0YVNlcnZpY2Uge1xyXG4gIHN0YXRpYyBUQUJMRVMgPSBFTlVNX1RBQkxFUztcclxuICByZWFkb25seSBDT05TVEFOVF9QQVRIID0gJ2Fzc2V0cy9kdW1teS8nO1xyXG4gIHJlYWRvbmx5IEpTT05TID0ge1xyXG4gICAgW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdOiAncmVzdGF1cmFudC5qc29uJyxcclxuICAgIFtFTlVNX1RBQkxFUy5jdXN0b21lcl06ICdjdXN0b21lci5qc29uJyxcclxuICAgIFtFTlVNX1RBQkxFUy5tZWFsXTogJ21lYWwuanNvbicsXHJcbiAgICBbRU5VTV9UQUJMRVMuY291cmllcl06ICdjb3VyaWVyLmpzb24nLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX1V0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxuICBjb252ZXJ0RHVtbXlEYXRhVG9Nb2RlbCh0YWJsZTogRU5VTV9UQUJMRVMsIG1vZGVsQ2xhc3M6IElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcik6IFByb21pc2U8YW55W10+IHtcclxuICAgIGlmICghdGhpcy5KU09OU1t0YWJsZV0pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fVXRpbHNTZXJ2aWNlLmdldEpTT04odGhpcy5DT05TVEFOVF9QQVRIICsgdGhpcy5KU09OU1t0YWJsZV0pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRhcCgpLFxyXG4gICAgICAgIGZpcnN0KClcclxuICAgICAgKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSBbXTtcclxuICAgICAgICBfLm1hcChkYXRhLCAoeCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbW9kZWwgPSBuZXcgbW9kZWxDbGFzcyh4KTtcclxuICAgICAgICAgIGFycmF5LnB1c2gobW9kZWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuIl19