import { Injectable } from '@angular/core';
import _ from 'lodash';
import { first, tap } from 'rxjs/operators';
import { ENUM_TABLES } from '../../constant/const-value';
import * as i0 from "@angular/core";
import * as i1 from "../mics/utils.service";
export class DummyDataService {
    constructor(_UtilsService) {
        this._UtilsService = _UtilsService;
        this.CONSTANT_PATH = 'assets/dummy/';
        this.JSONS = {
            [ENUM_TABLES.restaurant]: 'restaurant.json',
            [ENUM_TABLES.customer]: 'customer.json',
            [ENUM_TABLES.meal]: 'meal.json',
            [ENUM_TABLES.courier]: 'courier.json',
        };
    }
    convertDummyDataToModel(table, modelClass) {
        if (!this.JSONS[table]) {
            return Promise.resolve([]);
        }
        return this._UtilsService.getJSON(this.CONSTANT_PATH + this.JSONS[table])
            .pipe(tap(), first())
            .toPromise()
            .then(data => {
            const array = [];
            _.map(data, (x) => {
                const model = new modelClass(x);
                array.push(model);
            });
            return array;
        });
    }
}
DummyDataService.TABLES = ENUM_TABLES;
DummyDataService.ɵfac = function DummyDataService_Factory(t) { return new (t || DummyDataService)(i0.ɵɵinject(i1.UtilsService)); };
DummyDataService.ɵprov = i0.ɵɵdefineInjectable({ token: DummyDataService, factory: DummyDataService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DummyDataService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.UtilsService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZGF0YS9kdW1teS1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkIsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7OztBQU92RCxNQUFNLE9BQU8sZ0JBQWdCO0lBVTNCLFlBQW9CLGFBQTJCO1FBQTNCLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBUnRDLGtCQUFhLEdBQUcsZUFBZSxDQUFDO1FBQ2hDLFVBQUssR0FBRztZQUNmLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLGlCQUFpQjtZQUMzQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxlQUFlO1lBQ3ZDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVc7WUFDL0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsY0FBYztTQUN0QyxDQUFDO0lBR0YsQ0FBQztJQUVELHVCQUF1QixDQUFDLEtBQWtCLEVBQUUsVUFBb0M7UUFDOUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEUsSUFBSSxDQUNILEdBQUcsRUFBRSxFQUNMLEtBQUssRUFBRSxDQUNSO2FBQ0EsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1gsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBOUJNLHVCQUFNLEdBQUcsV0FBVyxDQUFDO2dGQURqQixnQkFBZ0I7d0RBQWhCLGdCQUFnQixXQUFoQixnQkFBZ0IsbUJBRmYsTUFBTTtrREFFUCxnQkFBZ0I7Y0FINUIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHtmaXJzdCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7RU5VTV9UQUJMRVN9IGZyb20gJy4uLy4uL2NvbnN0YW50L2NvbnN0LXZhbHVlJztcclxuaW1wb3J0IHtVdGlsc1NlcnZpY2V9IGZyb20gXCIuLi9taWNzL3V0aWxzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3J9IGZyb20gXCIuLi8uLi9jb25zdGFudC9tb2RlbHMvaS1kZWZhdWx0LW1vZGVsXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEdW1teURhdGFTZXJ2aWNlIHtcclxuICBzdGF0aWMgVEFCTEVTID0gRU5VTV9UQUJMRVM7XHJcbiAgcmVhZG9ubHkgQ09OU1RBTlRfUEFUSCA9ICdhc3NldHMvZHVtbXkvJztcclxuICByZWFkb25seSBKU09OUyA9IHtcclxuICAgIFtFTlVNX1RBQkxFUy5yZXN0YXVyYW50XTogJ3Jlc3RhdXJhbnQuanNvbicsXHJcbiAgICBbRU5VTV9UQUJMRVMuY3VzdG9tZXJdOiAnY3VzdG9tZXIuanNvbicsXHJcbiAgICBbRU5VTV9UQUJMRVMubWVhbF06ICdtZWFsLmpzb24nLFxyXG4gICAgW0VOVU1fVEFCTEVTLmNvdXJpZXJdOiAnY291cmllci5qc29uJyxcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9VdGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSkge1xyXG4gIH1cclxuXHJcbiAgY29udmVydER1bW15RGF0YVRvTW9kZWwodGFibGU6IEVOVU1fVEFCTEVTLCBtb2RlbENsYXNzOiBJRGVmYXVsdE1vZGVsQ29uc3RydWN0b3IpOiBQcm9taXNlPGFueVtdPiB7XHJcbiAgICBpZiAoIXRoaXMuSlNPTlNbdGFibGVdKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX1V0aWxzU2VydmljZS5nZXRKU09OKHRoaXMuQ09OU1RBTlRfUEFUSCArIHRoaXMuSlNPTlNbdGFibGVdKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YXAoKSxcclxuICAgICAgICBmaXJzdCgpXHJcbiAgICAgIClcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICAgICAgXy5tYXAoZGF0YSwgKHgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG1vZGVsID0gbmV3IG1vZGVsQ2xhc3MoeCk7XHJcbiAgICAgICAgICBhcnJheS5wdXNoKG1vZGVsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==