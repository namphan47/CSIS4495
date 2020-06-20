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
let DummyDataService = class DummyDataService {
    constructor() {
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
    }
};
DummyDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DummyDataService_Factory() { return new DummyDataService(); }, token: DummyDataService, providedIn: "root" });
DummyDataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DummyDataService);
export { DummyDataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZGF0YS9kdW1teS1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUV2RCxPQUFPLGNBQWMsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUt4QixJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQVEzQjtRQVBTLFVBQUssR0FBRztZQUNmLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLGNBQWM7WUFDeEMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsWUFBWTtZQUNwQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRO1lBQzVCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFdBQVc7U0FDbkMsQ0FBQztJQUdGLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxLQUFrQixFQUFFLFVBQW9DO1FBQzlFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1QjtRQUNELE9BQU8sRUFBRSxFQUFFO2FBQ1IsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNULE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFRixDQUFBOztBQTVCWSxnQkFBZ0I7SUFINUIsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLGdCQUFnQixDQTRCNUI7U0E1QlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHtFTlVNX1RBQkxFU30gZnJvbSBcIi4uLy4uL2NvbnN0YW50L2NvbnN0LXZhbHVlXCI7XHJcbmltcG9ydCB7SURlZmF1bHRNb2RlbENvbnN0cnVjdG9yfSBmcm9tIFwiLi4vLi4vY29uc3RhbnQvbW9kZWxzL2ktZGVmYXVsdC1tb2RlbFwiO1xyXG5pbXBvcnQgcmVzdGF1cmFudERhdGEgZnJvbSBcIi4uLy4uL2R1bW15L3Jlc3RhdXJhbnQuanNvblwiO1xyXG5pbXBvcnQgY291cmllckRhdGEgZnJvbSBcIi4uLy4uL2R1bW15L2NvdXJpZXIuanNvblwiO1xyXG5pbXBvcnQgbWVhbERhdGEgZnJvbSBcIi4uLy4uL2R1bW15L21lYWwuanNvblwiO1xyXG5pbXBvcnQgY3VzdG9tZXJEYXRhIGZyb20gXCIuLi8uLi9kdW1teS9jdXN0b21lci5qc29uXCI7XHJcbmltcG9ydCB7b2Z9IGZyb20gXCJyeGpzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEdW1teURhdGFTZXJ2aWNlIHtcclxuICByZWFkb25seSBKU09OUyA9IHtcclxuICAgIFtFTlVNX1RBQkxFUy5yZXN0YXVyYW50XTogcmVzdGF1cmFudERhdGEsXHJcbiAgICBbRU5VTV9UQUJMRVMuY3VzdG9tZXJdOiBjdXN0b21lckRhdGEsXHJcbiAgICBbRU5VTV9UQUJMRVMubWVhbF06IG1lYWxEYXRhLFxyXG4gICAgW0VOVU1fVEFCTEVTLmNvdXJpZXJdOiBjb3VyaWVyRGF0YSxcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICB9XHJcblxyXG4gIGNvbnZlcnREdW1teURhdGFUb01vZGVsKHRhYmxlOiBFTlVNX1RBQkxFUywgbW9kZWxDbGFzczogSURlZmF1bHRNb2RlbENvbnN0cnVjdG9yKTogUHJvbWlzZTxhbnlbXT4ge1xyXG4gICAgaWYgKCF0aGlzLkpTT05TW3RhYmxlXSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtdKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZigpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuSlNPTlNbdGFibGVdO1xyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICAgICAgXy5tYXAoZGF0YSwgKHgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG1vZGVsID0gbmV3IG1vZGVsQ2xhc3MoeCk7XHJcbiAgICAgICAgICBhcnJheS5wdXNoKG1vZGVsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==