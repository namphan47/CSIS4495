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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsaXZlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUc5QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QjtJQUE4Qiw0QkFBWTtJQVF4QyxrQkFBWSxJQUFTO1FBQXJCLFlBQ0Usa0JBQU0sSUFBSSxDQUFDLFNBRVo7UUFWRCxRQUFFLEdBQVcsRUFBRSxDQUFDO1FBQ2hCLFlBQU0sR0FBWSxFQUFFLENBQUM7UUFDckIsZ0JBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsY0FBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixvQkFBYyxHQUE0QixFQUFFLENBQUM7UUFDN0MsbUJBQWEsR0FBMEIsSUFBSSxDQUFDO1FBSTFDLGlCQUFNLFFBQVEsYUFBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVELG1DQUFnQixHQUFoQixVQUFpQixTQUFrQztRQUNqRCxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBd0IsSUFBSyxPQUFBLENBQUMsQ0FBQyxTQUFTLEVBQVgsQ0FBVyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBakJELENBQThCLFlBQVksR0FpQnpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0TW9kZWx9IGZyb20gXCIuLi9kZWZhdWx0LW1vZGVsXCI7XHJcbmltcG9ydCB7UG9pbnR9IGZyb20gXCIuLi9wb2ludC9wb2ludFwiO1xyXG5pbXBvcnQge0RlbGl2ZXJ5U3RhdHVzSGlzdG9yeX0gZnJvbSBcIi4vZGVsaXZlcnktc3RhdHVzLWhpc3RvcnlcIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlbGl2ZXJ5IGV4dGVuZHMgRGVmYXVsdE1vZGVsIHtcclxuICBpZDogc3RyaW5nID0gJyc7XHJcbiAgcG9pbnRzOiBQb2ludFtdID0gW107XHJcbiAgY291cmllcl9pZDogc3RyaW5nID0gJyc7XHJcbiAgb3JkZXJfaWQ6IHN0cmluZyA9ICcnO1xyXG4gIHN0YXR1c19oaXN0b3J5OiBEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXSA9IFtdO1xyXG4gIGN1cnJlbnRTdGF0dXM6IERlbGl2ZXJ5U3RhdHVzSGlzdG9yeSA9IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBzdXBlci5jb3B5SW50byhkYXRhKTtcclxuICB9XHJcblxyXG4gIHNldFN0YXR1c0hpc3RvcnkoaGlzdG9yaWVzOiBEZWxpdmVyeVN0YXR1c0hpc3RvcnlbXSkge1xyXG4gICAgdGhpcy5zdGF0dXNfaGlzdG9yeSA9IGhpc3RvcmllcztcclxuICAgIHRoaXMuY3VycmVudFN0YXR1cyA9IF8ubWF4QnkoaGlzdG9yaWVzLCAoeDogRGVsaXZlcnlTdGF0dXNIaXN0b3J5KSA9PiB4LmRhdGVfdGltZSk7XHJcbiAgfVxyXG59XHJcblxyXG4iXX0=