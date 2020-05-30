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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvb3JkZXIvb3JkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUs5QztJQUEyQix5QkFBWTtJQVdyQyxlQUFZLElBQVM7UUFBckIsWUFDRSxrQkFBTSxJQUFJLENBQUMsU0FFWjtRQWJELFFBQUUsR0FBVyxFQUFFLENBQUM7UUFDaEIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixtQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUMzQixpQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBUWhCLGlCQUFNLFFBQVEsYUFBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUNILFlBQUM7QUFBRCxDQUFDLEFBZkQsQ0FBMkIsWUFBWSxHQWV0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGVmYXVsdE1vZGVsfSBmcm9tIFwiLi4vZGVmYXVsdC1tb2RlbFwiO1xyXG5pbXBvcnQge1Jlc3RhdXJhbnR9IGZyb20gXCIuLi9yZXN0YXVyYW50L3Jlc3RhdXJhbnRcIjtcclxuaW1wb3J0IHtDdXN0b21lcn0gZnJvbSBcIi4uL2N1c3RvbWVyL2N1c3RvbWVyXCI7XHJcbmltcG9ydCB7T3JkZXJJdGVtfSBmcm9tIFwiLi4vb3JkZXJfaXRlbS9vcmRlci1pdGVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgT3JkZXIgZXh0ZW5kcyBEZWZhdWx0TW9kZWwge1xyXG4gIGlkOiBzdHJpbmcgPSAnJztcclxuICBkYXRlX3RpbWU6IG51bWJlciA9IDA7XHJcbiAgcmVzdGF1cmFudF9pZDogc3RyaW5nID0gJyc7XHJcbiAgY3VzdG9tZXJfaWQ6IHN0cmluZyA9ICcnO1xyXG4gIHRvdGFsOiBudW1iZXIgPSAwO1xyXG5cclxuICByZXN0YXVyYW50OiBSZXN0YXVyYW50O1xyXG4gIGN1c3RvbWVyOiBDdXN0b21lcjtcclxuICBpdGVtczogT3JkZXJJdGVtW11cclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XHJcbiAgICBzdXBlcihkYXRhKTtcclxuICAgIHN1cGVyLmNvcHlJbnRvKGRhdGEpO1xyXG4gIH1cclxufVxyXG4iXX0=