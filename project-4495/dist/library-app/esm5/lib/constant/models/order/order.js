import { __extends } from "tslib";
import { DefaultModel } from "../default-model";
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order(data) {
        var _this = _super.call(this, data) || this;
        _this.id = '';
        _this.date_time = 0;
        _this.restaurant_id = '';
        _this.customer_id = '';
        _this.total = 0;
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    return Order;
}(DefaultModel));
export { Order };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvb3JkZXIvb3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQU05QztJQUEyQix5QkFBWTtJQVdyQyxlQUFZLElBQVM7UUFBckIsWUFDRSxrQkFBTSxJQUFJLENBQUMsU0FFWjtRQWJELFFBQUUsR0FBVyxFQUFFLENBQUM7UUFDaEIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixtQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUMzQixpQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBUWhCLGlCQUFNLFFBQVEsYUFBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVILFlBQUM7QUFBRCxDQUFDLEFBaEJELENBQTJCLFlBQVksR0FnQnRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0TW9kZWx9IGZyb20gXCIuLi9kZWZhdWx0LW1vZGVsXCI7XHJcbmltcG9ydCB7UmVzdGF1cmFudH0gZnJvbSBcIi4uL3Jlc3RhdXJhbnQvcmVzdGF1cmFudFwiO1xyXG5pbXBvcnQge0N1c3RvbWVyfSBmcm9tIFwiLi4vY3VzdG9tZXIvY3VzdG9tZXJcIjtcclxuaW1wb3J0IHtPcmRlckl0ZW19IGZyb20gXCIuLi9vcmRlcl9pdGVtL29yZGVyLWl0ZW1cIjtcclxuaW1wb3J0IHtEZWxpdmVyeX0gZnJvbSBcIi4uL2RlbGl2ZXJ5L2RlbGl2ZXJ5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgT3JkZXIgZXh0ZW5kcyBEZWZhdWx0TW9kZWwge1xyXG4gIGlkOiBzdHJpbmcgPSAnJztcclxuICBkYXRlX3RpbWU6IG51bWJlciA9IDA7XHJcbiAgcmVzdGF1cmFudF9pZDogc3RyaW5nID0gJyc7XHJcbiAgY3VzdG9tZXJfaWQ6IHN0cmluZyA9ICcnO1xyXG4gIHRvdGFsOiBudW1iZXIgPSAwO1xyXG5cclxuICByZXN0YXVyYW50OiBSZXN0YXVyYW50O1xyXG4gIGN1c3RvbWVyOiBDdXN0b21lcjtcclxuICBpdGVtczogT3JkZXJJdGVtW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBzdXBlci5jb3B5SW50byhkYXRhKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==