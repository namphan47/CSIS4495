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
        this.CONSTANT_PATH = 'assets/dummy/';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZGF0YS9kdW1teS1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUV2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFbkQsT0FBTyxjQUFjLE1BQU0sNkJBQTZCLENBQUM7QUFDekQsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxFQUFDLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7O0FBS3hCO0lBU0UsMEJBQW9CLGFBQTJCOztRQUEzQixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQVJ0QyxrQkFBYSxHQUFHLGVBQWUsQ0FBQztRQUNoQyxVQUFLO1lBQ1osR0FBQyxXQUFXLENBQUMsVUFBVSxJQUFHLGNBQWM7WUFDeEMsR0FBQyxXQUFXLENBQUMsUUFBUSxJQUFHLFlBQVk7WUFDcEMsR0FBQyxXQUFXLENBQUMsSUFBSSxJQUFHLFFBQVE7WUFDNUIsR0FBQyxXQUFXLENBQUMsT0FBTyxJQUFHLFdBQVc7Z0JBQ2xDO0lBR0YsQ0FBQztJQUVELGtEQUF1QixHQUF2QixVQUF3QixLQUFrQixFQUFFLFVBQW9DO1FBQWhGLGlCQTZCQztRQTVCQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPLEVBQUUsRUFBRTthQUNSLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQztZQUNKLElBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQUMsQ0FBQztnQkFDWixJQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCw0RUFBNEU7UUFDNUUsV0FBVztRQUNYLGFBQWE7UUFDYixjQUFjO1FBQ2QsTUFBTTtRQUNOLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsd0JBQXdCO1FBQ3hCLDJCQUEyQjtRQUMzQix5Q0FBeUM7UUFDekMsMkJBQTJCO1FBQzNCLFVBQVU7UUFDVixvQkFBb0I7UUFDcEIsUUFBUTtJQUNWLENBQUM7O2dCQWhDa0MsWUFBWTs7O0lBVHBDLGdCQUFnQjtRQUg1QixVQUFVLENBQUM7WUFDVixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDO09BQ1csZ0JBQWdCLENBMkM1QjsyQkEzREQ7Q0EyREMsQUEzQ0QsSUEyQ0M7U0EzQ1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHtmaXJzdCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7RU5VTV9UQUJMRVN9IGZyb20gXCIuLi8uLi9jb25zdGFudC9jb25zdC12YWx1ZVwiO1xyXG5pbXBvcnQge0lEZWZhdWx0TW9kZWxDb25zdHJ1Y3Rvcn0gZnJvbSBcIi4uLy4uL2NvbnN0YW50L21vZGVscy9pLWRlZmF1bHQtbW9kZWxcIjtcclxuaW1wb3J0IHtVdGlsc1NlcnZpY2V9IGZyb20gXCIuLi9taWNzL3V0aWxzLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCByZXN0YXVyYW50RGF0YSBmcm9tIFwiLi4vLi4vZHVtbXkvcmVzdGF1cmFudC5qc29uXCI7XHJcbmltcG9ydCBjb3VyaWVyRGF0YSBmcm9tIFwiLi4vLi4vZHVtbXkvY291cmllci5qc29uXCI7XHJcbmltcG9ydCBtZWFsRGF0YSBmcm9tIFwiLi4vLi4vZHVtbXkvbWVhbC5qc29uXCI7XHJcbmltcG9ydCBjdXN0b21lckRhdGEgZnJvbSBcIi4uLy4uL2R1bW15L2N1c3RvbWVyLmpzb25cIjtcclxuaW1wb3J0IHtvZn0gZnJvbSBcInJ4anNcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIER1bW15RGF0YVNlcnZpY2Uge1xyXG4gIHJlYWRvbmx5IENPTlNUQU5UX1BBVEggPSAnYXNzZXRzL2R1bW15Lyc7XHJcbiAgcmVhZG9ubHkgSlNPTlMgPSB7XHJcbiAgICBbRU5VTV9UQUJMRVMucmVzdGF1cmFudF06IHJlc3RhdXJhbnREYXRhLFxyXG4gICAgW0VOVU1fVEFCTEVTLmN1c3RvbWVyXTogY3VzdG9tZXJEYXRhLFxyXG4gICAgW0VOVU1fVEFCTEVTLm1lYWxdOiBtZWFsRGF0YSxcclxuICAgIFtFTlVNX1RBQkxFUy5jb3VyaWVyXTogY291cmllckRhdGEsXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfVXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UpIHtcclxuICB9XHJcblxyXG4gIGNvbnZlcnREdW1teURhdGFUb01vZGVsKHRhYmxlOiBFTlVNX1RBQkxFUywgbW9kZWxDbGFzczogSURlZmF1bHRNb2RlbENvbnN0cnVjdG9yKTogUHJvbWlzZTxhbnlbXT4ge1xyXG4gICAgaWYgKCF0aGlzLkpTT05TW3RhYmxlXSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtdKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZigpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuSlNPTlNbdGFibGVdO1xyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICAgICAgXy5tYXAoZGF0YSwgKHgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG1vZGVsID0gbmV3IG1vZGVsQ2xhc3MoeCk7XHJcbiAgICAgICAgICBhcnJheS5wdXNoKG1vZGVsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICAgIH0pO1xyXG4gICAgLy8gcmV0dXJuIHRoaXMuX1V0aWxzU2VydmljZS5nZXRKU09OKHRoaXMuQ09OU1RBTlRfUEFUSCArIHRoaXMuSlNPTlNbdGFibGVdKVxyXG4gICAgLy8gICAucGlwZShcclxuICAgIC8vICAgICB0YXAoKSxcclxuICAgIC8vICAgICBmaXJzdCgpXHJcbiAgICAvLyAgIClcclxuICAgIC8vICAgLnRvUHJvbWlzZSgpXHJcbiAgICAvLyAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgLy8gICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICAvLyAgICAgXy5tYXAoZGF0YSwgKHgpID0+IHtcclxuICAgIC8vICAgICAgIGNvbnN0IG1vZGVsID0gbmV3IG1vZGVsQ2xhc3MoeCk7XHJcbiAgICAvLyAgICAgICBhcnJheS5wdXNoKG1vZGVsKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICAvLyAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==