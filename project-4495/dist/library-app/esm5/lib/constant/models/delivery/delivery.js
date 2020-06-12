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
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    Delivery.prototype.setStatusHistory = function (histories) {
        this.status_history = histories;
        this.currentStatus = _.maxBy(histories, function (x) { return x.date_time; });
    };
    return Delivery;
}(DefaultModel));
export { Delivery };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsaXZlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUc5QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUc1QjtJQUE4Qiw0QkFBWTtJQVd4QyxrQkFBWSxJQUFTO1FBQXJCLFlBQ0Usa0JBQU0sSUFBSSxDQUFDLFNBRVo7UUFiRCxRQUFFLEdBQVcsRUFBRSxDQUFDO1FBQ2hCLFlBQU0sR0FBWSxFQUFFLENBQUM7UUFDckIsZ0JBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsY0FBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixvQkFBYyxHQUE0QixFQUFFLENBQUM7UUFDN0MsbUJBQWEsR0FBMEIsSUFBSSxDQUFDO1FBRzVDLHNCQUFnQixHQUFXLENBQUMsQ0FBQztRQUkzQixpQkFBTSxRQUFRLGFBQUMsSUFBSSxDQUFDLENBQUM7O0lBQ3ZCLENBQUM7SUFFRCxtQ0FBZ0IsR0FBaEIsVUFBaUIsU0FBa0M7UUFDakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxVQUFDLENBQXdCLElBQUssT0FBQSxDQUFDLENBQUMsU0FBUyxFQUFYLENBQVcsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFSCxlQUFDO0FBQUQsQ0FBQyxBQXJCRCxDQUE4QixZQUFZLEdBcUJ6QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGVmYXVsdE1vZGVsfSBmcm9tIFwiLi4vZGVmYXVsdC1tb2RlbFwiO1xyXG5pbXBvcnQge1BvaW50fSBmcm9tIFwiLi4vcG9pbnQvcG9pbnRcIjtcclxuaW1wb3J0IHtEZWxpdmVyeVN0YXR1c0hpc3Rvcnl9IGZyb20gXCIuL2RlbGl2ZXJ5LXN0YXR1cy1oaXN0b3J5XCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHtPcmRlcn0gZnJvbSBcIi4uL29yZGVyL29yZGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVsaXZlcnkgZXh0ZW5kcyBEZWZhdWx0TW9kZWwge1xyXG4gIGlkOiBzdHJpbmcgPSAnJztcclxuICBwb2ludHM6IFBvaW50W10gPSBbXTtcclxuICBjb3VyaWVyX2lkOiBzdHJpbmcgPSAnJztcclxuICBvcmRlcl9pZDogc3RyaW5nID0gJyc7XHJcbiAgc3RhdHVzX2hpc3Rvcnk6IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeVtdID0gW107XHJcbiAgY3VycmVudFN0YXR1czogRGVsaXZlcnlTdGF0dXNIaXN0b3J5ID0gbnVsbDtcclxuICBvcmRlcjogT3JkZXI7XHJcblxyXG4gIHRpbWVUb05leHRTdGF0dXM6IG51bWJlciA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBzdXBlci5jb3B5SW50byhkYXRhKTtcclxuICB9XHJcblxyXG4gIHNldFN0YXR1c0hpc3RvcnkoaGlzdG9yaWVzOiBEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXSkge1xyXG4gICAgdGhpcy5zdGF0dXNfaGlzdG9yeSA9IGhpc3RvcmllcztcclxuICAgIHRoaXMuY3VycmVudFN0YXR1cyA9IF8ubWF4QnkoaGlzdG9yaWVzLCAoeDogRGVsaXZlcnlTdGF0dXNIaXN0b3J5KSA9PiB4LmRhdGVfdGltZSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuIl19