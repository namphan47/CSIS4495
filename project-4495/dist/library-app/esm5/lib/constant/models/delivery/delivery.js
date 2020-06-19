import { __extends } from "tslib";
import { DefaultModel } from "../default-model";
import * as _ from 'lodash';
var Delivery = /** @class */ (function (_super) {
    __extends(Delivery, _super);
    function Delivery(data) {
        var _this = _super.call(this, data) || this;
        _this.id = '';
        _this.points = [];
        _this.courier_id = '';
        _this.order_id = '';
        _this.status_history = [];
        _this.currentStatus = null;
        _this.timeToNextStatus = 0;
        _this.path_to_restaurant = [];
        _this.path_to_customer = [];
        _super.prototype.copyInto.call(_this, data);
        if (_this.path_to_customer.length) {
            _this.path_to_customer = _.map(_this.path_to_customer, function (x) { return JSON.parse(x); });
        }
        if (_this.path_to_restaurant.length) {
            _this.path_to_restaurant = _.map(_this.path_to_restaurant, function (x) { return JSON.parse(x); });
        }
        return _this;
    }
    Delivery.prototype.getData = function () {
        var _this = this;
        var self = this;
        var result = {};
        Object.keys(this).map(function (key) {
            if (_this[key] instanceof DefaultModel) {
                return;
            }
            switch (key) {
                case '_raw':
                case 'order':
                case 'restaurant':
                case 'customer':
                case 'courier':
                    return;
                case 'path_to_restaurant':
                case 'path_to_customer': {
                    result[key] = _.map(self[key], function (x) {
                        return JSON.stringify(x);
                    });
                    // console.log(result[key]);
                    return;
                }
            }
            result[key] = self[key];
        });
        return result;
    };
    Delivery.prototype.setStatusHistory = function (histories) {
        this.status_history = histories;
        this.currentStatus = _.maxBy(histories, function (x) { return x.date_time; });
    };
    return Delivery;
}(DefaultModel));
export { Delivery };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsaXZlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUc5QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQU01QjtJQUE4Qiw0QkFBWTtJQWdCeEMsa0JBQVksSUFBUztRQUFyQixZQUNFLGtCQUFNLElBQUksQ0FBQyxTQVFaO1FBeEJELFFBQUUsR0FBVyxFQUFFLENBQUM7UUFDaEIsWUFBTSxHQUFZLEVBQUUsQ0FBQztRQUNyQixnQkFBVSxHQUFXLEVBQUUsQ0FBQztRQUN4QixjQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLG9CQUFjLEdBQTRCLEVBQUUsQ0FBQztRQUM3QyxtQkFBYSxHQUEwQixJQUFJLENBQUM7UUFDNUMsc0JBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBTTdCLHdCQUFrQixHQUFVLEVBQUUsQ0FBQztRQUMvQixzQkFBZ0IsR0FBVSxFQUFFLENBQUM7UUFJM0IsaUJBQU0sUUFBUSxhQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLElBQUksS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtZQUNoQyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFiLENBQWEsQ0FBQyxDQUFDO1NBQzFFO1FBQ0QsSUFBSSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFO1lBQ2xDLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUM7U0FDOUU7O0lBQ0gsQ0FBQztJQUVELDBCQUFPLEdBQVA7UUFBQSxpQkEyQkM7UUExQkMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUc7WUFDdkIsSUFBSSxLQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksWUFBWSxFQUFFO2dCQUNyQyxPQUFPO2FBQ1I7WUFFRCxRQUFRLEdBQUcsRUFBRTtnQkFDWCxLQUFLLE1BQU0sQ0FBQztnQkFDWixLQUFLLE9BQU8sQ0FBQztnQkFDYixLQUFLLFlBQVksQ0FBQztnQkFDbEIsS0FBSyxVQUFVLENBQUM7Z0JBQ2hCLEtBQUssU0FBUztvQkFDWixPQUFPO2dCQUNULEtBQUssb0JBQW9CLENBQUM7Z0JBQzFCLEtBQUssa0JBQWtCLENBQUMsQ0FBQztvQkFDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQUMsQ0FBQzt3QkFDL0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixDQUFDLENBQUMsQ0FBQztvQkFDSCw0QkFBNEI7b0JBQzVCLE9BQU87aUJBQ1I7YUFDRjtZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsbUNBQWdCLEdBQWhCLFVBQWlCLFNBQWtDO1FBQ2pELElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBQyxDQUF3QixJQUFLLE9BQUEsQ0FBQyxDQUFDLFNBQVMsRUFBWCxDQUFXLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUgsZUFBQztBQUFELENBQUMsQUE3REQsQ0FBOEIsWUFBWSxHQTZEekMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RlZmF1bHRNb2RlbH0gZnJvbSBcIi4uL2RlZmF1bHQtbW9kZWxcIjtcclxuaW1wb3J0IHtQb2ludH0gZnJvbSBcIi4uL3BvaW50L3BvaW50XCI7XHJcbmltcG9ydCB7RGVsaXZlcnlTdGF0dXNIaXN0b3J5fSBmcm9tIFwiLi9kZWxpdmVyeS1zdGF0dXMtaGlzdG9yeVwiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7T3JkZXJ9IGZyb20gXCIuLi9vcmRlci9vcmRlclwiO1xyXG5pbXBvcnQge0NvdXJpZXJ9IGZyb20gXCIuLi9jb3VyaWVyL2NvdXJpZXJcIjtcclxuaW1wb3J0IHtSZXN0YXVyYW50fSBmcm9tIFwiLi4vcmVzdGF1cmFudC9yZXN0YXVyYW50XCI7XHJcbmltcG9ydCB7Q3VzdG9tZXJ9IGZyb20gXCIuLi9jdXN0b21lci9jdXN0b21lclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlbGl2ZXJ5IGV4dGVuZHMgRGVmYXVsdE1vZGVsIHtcclxuICBpZDogc3RyaW5nID0gJyc7XHJcbiAgcG9pbnRzOiBQb2ludFtdID0gW107XHJcbiAgY291cmllcl9pZDogc3RyaW5nID0gJyc7XHJcbiAgb3JkZXJfaWQ6IHN0cmluZyA9ICcnO1xyXG4gIHN0YXR1c19oaXN0b3J5OiBEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXSA9IFtdO1xyXG4gIGN1cnJlbnRTdGF0dXM6IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSA9IG51bGw7XHJcbiAgdGltZVRvTmV4dFN0YXR1czogbnVtYmVyID0gMDtcclxuXHJcbiAgb3JkZXI6IE9yZGVyO1xyXG4gIGNvdXJpZXI6IENvdXJpZXI7XHJcbiAgcmVzdGF1cmFudDogUmVzdGF1cmFudDtcclxuICBjdXN0b21lcjogQ3VzdG9tZXI7XHJcbiAgcGF0aF90b19yZXN0YXVyYW50OiBhbnlbXSA9IFtdO1xyXG4gIHBhdGhfdG9fY3VzdG9tZXI6IGFueVtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBzdXBlci5jb3B5SW50byhkYXRhKTtcclxuICAgIGlmICh0aGlzLnBhdGhfdG9fY3VzdG9tZXIubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMucGF0aF90b19jdXN0b21lciA9IF8ubWFwKHRoaXMucGF0aF90b19jdXN0b21lciwgeCA9PiBKU09OLnBhcnNlKHgpKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBhdGhfdG9fcmVzdGF1cmFudC5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5wYXRoX3RvX3Jlc3RhdXJhbnQgPSBfLm1hcCh0aGlzLnBhdGhfdG9fcmVzdGF1cmFudCwgeCA9PiBKU09OLnBhcnNlKHgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERhdGEoKTogb2JqZWN0IHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzKS5tYXAoa2V5ID0+IHtcclxuICAgICAgaWYgKHRoaXNba2V5XSBpbnN0YW5jZW9mIERlZmF1bHRNb2RlbCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlICdfcmF3JzpcclxuICAgICAgICBjYXNlICdvcmRlcic6XHJcbiAgICAgICAgY2FzZSAncmVzdGF1cmFudCc6XHJcbiAgICAgICAgY2FzZSAnY3VzdG9tZXInOlxyXG4gICAgICAgIGNhc2UgJ2NvdXJpZXInOlxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNhc2UgJ3BhdGhfdG9fcmVzdGF1cmFudCc6XHJcbiAgICAgICAgY2FzZSAncGF0aF90b19jdXN0b21lcic6IHtcclxuICAgICAgICAgIHJlc3VsdFtrZXldID0gXy5tYXAoc2VsZltrZXldLCAoeCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoeCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdFtrZXldKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmVzdWx0W2tleV0gPSBzZWxmW2tleV07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBzZXRTdGF0dXNIaXN0b3J5KGhpc3RvcmllczogRGVsaXZlcnlTdGF0dXNIaXN0b3J5W10pIHtcclxuICAgIHRoaXMuc3RhdHVzX2hpc3RvcnkgPSBoaXN0b3JpZXM7XHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0dXMgPSBfLm1heEJ5KGhpc3RvcmllcywgKHg6IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSkgPT4geC5kYXRlX3RpbWUpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==