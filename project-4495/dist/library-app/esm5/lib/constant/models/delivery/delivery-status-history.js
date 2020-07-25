import { __extends } from "tslib";
import { DefaultModel } from '../default-model';
export var Delivery_Status;
(function (Delivery_Status) {
    Delivery_Status["ORDERED"] = "ORDERED";
    Delivery_Status["PREPARING"] = "PREPARING";
    Delivery_Status["WAIT_FOR_PICK_UP"] = "WAIT_FOR_PICK_UP";
    Delivery_Status["DELIVERING"] = "DELIVERING";
    Delivery_Status["DELIVERED"] = "DELIVERED";
})(Delivery_Status || (Delivery_Status = {}));
var DeliveryStatusHistory = /** @class */ (function (_super) {
    __extends(DeliveryStatusHistory, _super);
    function DeliveryStatusHistory(data) {
        var _this = _super.call(this, data) || this;
        _this.id = '';
        _this.status = null;
        _this.delivery_id = '';
        _this.date_time = 0;
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    return DeliveryStatusHistory;
}(DefaultModel));
export { DeliveryStatusHistory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsaXZlcnktc3RhdHVzLWhpc3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnktc3RhdHVzLWhpc3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUU5QyxNQUFNLENBQU4sSUFBWSxlQU1YO0FBTkQsV0FBWSxlQUFlO0lBQ3pCLHNDQUFtQixDQUFBO0lBQ25CLDBDQUF1QixDQUFBO0lBQ3ZCLHdEQUFxQyxDQUFBO0lBQ3JDLDRDQUF5QixDQUFBO0lBQ3pCLDBDQUF1QixDQUFBO0FBQ3pCLENBQUMsRUFOVyxlQUFlLEtBQWYsZUFBZSxRQU0xQjtBQUVEO0lBQTJDLHlDQUFZO0lBTXJELCtCQUFZLElBQVM7UUFBckIsWUFDRSxrQkFBTSxJQUFJLENBQUMsU0FFWjtRQVJELFFBQUUsR0FBVyxFQUFFLENBQUM7UUFDaEIsWUFBTSxHQUFvQixJQUFJLENBQUM7UUFDL0IsaUJBQVcsR0FBVyxFQUFFLENBQUM7UUFDekIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUlwQixpQkFBTSxRQUFRLGFBQUMsSUFBSSxDQUFDLENBQUM7O0lBQ3ZCLENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUFWRCxDQUEyQyxZQUFZLEdBVXREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0TW9kZWx9IGZyb20gJy4uL2RlZmF1bHQtbW9kZWwnO1xyXG5cclxuZXhwb3J0IGVudW0gRGVsaXZlcnlfU3RhdHVzIHtcclxuICBPUkRFUkVEID0gJ09SREVSRUQnLFxyXG4gIFBSRVBBUklORyA9ICdQUkVQQVJJTkcnLFxyXG4gIFdBSVRfRk9SX1BJQ0tfVVAgPSAnV0FJVF9GT1JfUElDS19VUCcsXHJcbiAgREVMSVZFUklORyA9ICdERUxJVkVSSU5HJyxcclxuICBERUxJVkVSRUQgPSAnREVMSVZFUkVEJ1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGVsaXZlcnlTdGF0dXNIaXN0b3J5IGV4dGVuZHMgRGVmYXVsdE1vZGVsIHtcclxuICBpZDogc3RyaW5nID0gJyc7XHJcbiAgc3RhdHVzOiBEZWxpdmVyeV9TdGF0dXMgPSBudWxsO1xyXG4gIGRlbGl2ZXJ5X2lkOiBzdHJpbmcgPSAnJztcclxuICBkYXRlX3RpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBzdXBlci5jb3B5SW50byhkYXRhKTtcclxuICB9XHJcbn1cclxuXHJcbiJdfQ==