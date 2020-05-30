import { Injectable } from '@angular/core';
import _ from 'lodash';
import { first, tap } from 'rxjs/operators';
import { ENUM_TABLES } from '../../constant/const-value';
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
    DummyDataService.ɵfac = function DummyDataService_Factory(t) { return new (t || DummyDataService)(i0.ɵɵinject(i1.UtilsService)); };
    DummyDataService.ɵprov = i0.ɵɵdefineInjectable({ token: DummyDataService, factory: DummyDataService.ɵfac, providedIn: 'root' });
    return DummyDataService;
}());
export { DummyDataService };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DummyDataService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.UtilsService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZGF0YS9kdW1teS1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7OztBQUl2RDtJQWFFLDBCQUFvQixhQUEyQjs7UUFBM0Isa0JBQWEsR0FBYixhQUFhLENBQWM7UUFSdEMsa0JBQWEsR0FBRyxlQUFlLENBQUM7UUFDaEMsVUFBSztZQUNaLEdBQUMsV0FBVyxDQUFDLFVBQVUsSUFBRyxpQkFBaUI7WUFDM0MsR0FBQyxXQUFXLENBQUMsUUFBUSxJQUFHLGVBQWU7WUFDdkMsR0FBQyxXQUFXLENBQUMsSUFBSSxJQUFHLFdBQVc7WUFDL0IsR0FBQyxXQUFXLENBQUMsT0FBTyxJQUFHLGNBQWM7Z0JBQ3JDO0lBR0YsQ0FBQztJQUVELGtEQUF1QixHQUF2QixVQUF3QixLQUFrQixFQUFFLFVBQW9DO1FBQzlFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1QjtRQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RFLElBQUksQ0FDSCxHQUFHLEVBQUUsRUFDTCxLQUFLLEVBQUUsQ0FDUjthQUNBLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFBLElBQUk7WUFDUixJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDakIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBQyxDQUFDO2dCQUNaLElBQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUE5Qk0sdUJBQU0sR0FBRyxXQUFXLENBQUM7b0ZBRGpCLGdCQUFnQjs0REFBaEIsZ0JBQWdCLFdBQWhCLGdCQUFnQixtQkFGZixNQUFNOzJCQVJwQjtDQTJDQyxBQXBDRCxJQW9DQztTQWpDWSxnQkFBZ0I7a0RBQWhCLGdCQUFnQjtjQUg1QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQge2ZpcnN0LCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtFTlVNX1RBQkxFU30gZnJvbSAnLi4vLi4vY29uc3RhbnQvY29uc3QtdmFsdWUnO1xyXG5pbXBvcnQge1V0aWxzU2VydmljZX0gZnJvbSBcIi4uL21pY3MvdXRpbHMuc2VydmljZVwiO1xyXG5pbXBvcnQge0lEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcn0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9pLWRlZmF1bHQtbW9kZWxcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIER1bW15RGF0YVNlcnZpY2Uge1xyXG4gIHN0YXRpYyBUQUJMRVMgPSBFTlVNX1RBQkxFUztcclxuICByZWFkb25seSBDT05TVEFOVF9QQVRIID0gJ2Fzc2V0cy9kdW1teS8nO1xyXG4gIHJlYWRvbmx5IEpTT05TID0ge1xyXG4gICAgW0VOVU1fVEFCTEVTLnJlc3RhdXJhbnRdOiAncmVzdGF1cmFudC5qc29uJyxcclxuICAgIFtFTlVNX1RBQkxFUy5jdXN0b21lcl06ICdjdXN0b21lci5qc29uJyxcclxuICAgIFtFTlVNX1RBQkxFUy5tZWFsXTogJ21lYWwuanNvbicsXHJcbiAgICBbRU5VTV9UQUJMRVMuY291cmllcl06ICdjb3VyaWVyLmpzb24nLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX1V0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxuICBjb252ZXJ0RHVtbXlEYXRhVG9Nb2RlbCh0YWJsZTogRU5VTV9UQUJMRVMsIG1vZGVsQ2xhc3M6IElEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcik6IFByb21pc2U8YW55W10+IHtcclxuICAgIGlmICghdGhpcy5KU09OU1t0YWJsZV0pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fVXRpbHNTZXJ2aWNlLmdldEpTT04odGhpcy5DT05TVEFOVF9QQVRIICsgdGhpcy5KU09OU1t0YWJsZV0pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRhcCgpLFxyXG4gICAgICAgIGZpcnN0KClcclxuICAgICAgKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSBbXTtcclxuICAgICAgICBfLm1hcChkYXRhLCAoeCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbW9kZWwgPSBuZXcgbW9kZWxDbGFzcyh4KTtcclxuICAgICAgICAgIGFycmF5LnB1c2gobW9kZWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuIl19