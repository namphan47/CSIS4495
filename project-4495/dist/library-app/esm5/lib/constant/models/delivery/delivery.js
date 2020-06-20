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
                case 'points':
                case 'subscription':
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsaXZlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUc5QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQU01QjtJQUE4Qiw0QkFBWTtJQWtCeEMsa0JBQVksSUFBUztRQUFyQixZQUNFLGtCQUFNLElBQUksQ0FBQyxTQVFaO1FBMUJELFFBQUUsR0FBVyxFQUFFLENBQUM7UUFDaEIsWUFBTSxHQUFZLEVBQUUsQ0FBQztRQUNyQixnQkFBVSxHQUFXLEVBQUUsQ0FBQztRQUN4QixjQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLG9CQUFjLEdBQTRCLEVBQUUsQ0FBQztRQUM3QyxtQkFBYSxHQUEwQixJQUFJLENBQUM7UUFDNUMsc0JBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBTTdCLHdCQUFrQixHQUFVLEVBQUUsQ0FBQztRQUMvQixzQkFBZ0IsR0FBVSxFQUFFLENBQUM7UUFNM0IsaUJBQU0sUUFBUSxhQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLElBQUksS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtZQUNoQyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFiLENBQWEsQ0FBQyxDQUFDO1NBQzFFO1FBQ0QsSUFBSSxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFO1lBQ2xDLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUM7U0FDOUU7O0lBQ0gsQ0FBQztJQUVELDBCQUFPLEdBQVA7UUFBQSxpQkE2QkM7UUE1QkMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUc7WUFDdkIsSUFBSSxLQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksWUFBWSxFQUFFO2dCQUNyQyxPQUFPO2FBQ1I7WUFFRCxRQUFRLEdBQUcsRUFBRTtnQkFDWCxLQUFLLE1BQU0sQ0FBQztnQkFDWixLQUFLLE9BQU8sQ0FBQztnQkFDYixLQUFLLFlBQVksQ0FBQztnQkFDbEIsS0FBSyxVQUFVLENBQUM7Z0JBQ2hCLEtBQUssU0FBUyxDQUFDO2dCQUNmLEtBQUssUUFBUSxDQUFDO2dCQUNkLEtBQUssY0FBYztvQkFDakIsT0FBTztnQkFDVCxLQUFLLG9CQUFvQixDQUFDO2dCQUMxQixLQUFLLGtCQUFrQixDQUFDLENBQUM7b0JBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFDLENBQUM7d0JBQy9CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0IsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsNEJBQTRCO29CQUM1QixPQUFPO2lCQUNSO2FBQ0Y7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELG1DQUFnQixHQUFoQixVQUFpQixTQUFrQztRQUNqRCxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBd0IsSUFBSyxPQUFBLENBQUMsQ0FBQyxTQUFTLEVBQVgsQ0FBVyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVILGVBQUM7QUFBRCxDQUFDLEFBakVELENBQThCLFlBQVksR0FpRXpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0TW9kZWx9IGZyb20gXCIuLi9kZWZhdWx0LW1vZGVsXCI7XHJcbmltcG9ydCB7UG9pbnR9IGZyb20gXCIuLi9wb2ludC9wb2ludFwiO1xyXG5pbXBvcnQge0RlbGl2ZXJ5U3RhdHVzSGlzdG9yeX0gZnJvbSBcIi4vZGVsaXZlcnktc3RhdHVzLWhpc3RvcnlcIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQge09yZGVyfSBmcm9tIFwiLi4vb3JkZXIvb3JkZXJcIjtcclxuaW1wb3J0IHtDb3VyaWVyfSBmcm9tIFwiLi4vY291cmllci9jb3VyaWVyXCI7XHJcbmltcG9ydCB7UmVzdGF1cmFudH0gZnJvbSBcIi4uL3Jlc3RhdXJhbnQvcmVzdGF1cmFudFwiO1xyXG5pbXBvcnQge0N1c3RvbWVyfSBmcm9tIFwiLi4vY3VzdG9tZXIvY3VzdG9tZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWxpdmVyeSBleHRlbmRzIERlZmF1bHRNb2RlbCB7XHJcbiAgaWQ6IHN0cmluZyA9ICcnO1xyXG4gIHBvaW50czogUG9pbnRbXSA9IFtdO1xyXG4gIGNvdXJpZXJfaWQ6IHN0cmluZyA9ICcnO1xyXG4gIG9yZGVyX2lkOiBzdHJpbmcgPSAnJztcclxuICBzdGF0dXNfaGlzdG9yeTogRGVsaXZlcnlTdGF0dXNIaXN0b3J5W10gPSBbXTtcclxuICBjdXJyZW50U3RhdHVzOiBEZWxpdmVyeVN0YXR1c0hpc3RvcnkgPSBudWxsO1xyXG4gIHRpbWVUb05leHRTdGF0dXM6IG51bWJlciA9IDA7XHJcblxyXG4gIG9yZGVyOiBPcmRlcjtcclxuICBjb3VyaWVyOiBDb3VyaWVyO1xyXG4gIHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQ7XHJcbiAgY3VzdG9tZXI6IEN1c3RvbWVyO1xyXG4gIHBhdGhfdG9fcmVzdGF1cmFudDogYW55W10gPSBbXTtcclxuICBwYXRoX3RvX2N1c3RvbWVyOiBhbnlbXSA9IFtdO1xyXG5cclxuICBzdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBzdXBlci5jb3B5SW50byhkYXRhKTtcclxuICAgIGlmICh0aGlzLnBhdGhfdG9fY3VzdG9tZXIubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMucGF0aF90b19jdXN0b21lciA9IF8ubWFwKHRoaXMucGF0aF90b19jdXN0b21lciwgeCA9PiBKU09OLnBhcnNlKHgpKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBhdGhfdG9fcmVzdGF1cmFudC5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5wYXRoX3RvX3Jlc3RhdXJhbnQgPSBfLm1hcCh0aGlzLnBhdGhfdG9fcmVzdGF1cmFudCwgeCA9PiBKU09OLnBhcnNlKHgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERhdGEoKTogb2JqZWN0IHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzKS5tYXAoa2V5ID0+IHtcclxuICAgICAgaWYgKHRoaXNba2V5XSBpbnN0YW5jZW9mIERlZmF1bHRNb2RlbCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlICdfcmF3JzpcclxuICAgICAgICBjYXNlICdvcmRlcic6XHJcbiAgICAgICAgY2FzZSAncmVzdGF1cmFudCc6XHJcbiAgICAgICAgY2FzZSAnY3VzdG9tZXInOlxyXG4gICAgICAgIGNhc2UgJ2NvdXJpZXInOlxyXG4gICAgICAgIGNhc2UgJ3BvaW50cyc6XHJcbiAgICAgICAgY2FzZSAnc3Vic2NyaXB0aW9uJzpcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjYXNlICdwYXRoX3RvX3Jlc3RhdXJhbnQnOlxyXG4gICAgICAgIGNhc2UgJ3BhdGhfdG9fY3VzdG9tZXInOiB7XHJcbiAgICAgICAgICByZXN1bHRba2V5XSA9IF8ubWFwKHNlbGZba2V5XSwgKHgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRba2V5XSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJlc3VsdFtrZXldID0gc2VsZltrZXldO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgc2V0U3RhdHVzSGlzdG9yeShoaXN0b3JpZXM6IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdKSB7XHJcbiAgICB0aGlzLnN0YXR1c19oaXN0b3J5ID0gaGlzdG9yaWVzO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdHVzID0gXy5tYXhCeShoaXN0b3JpZXMsICh4OiBEZWxpdmVyeVN0YXR1c0hpc3RvcnkpID0+IHguZGF0ZV90aW1lKTtcclxuICB9XHJcblxyXG59XHJcblxyXG4iXX0=