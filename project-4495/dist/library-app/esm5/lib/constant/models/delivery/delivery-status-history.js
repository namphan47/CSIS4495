import { __extends } from "tslib";
import { DefaultModel } from "../default-model";
export var Delivery_Status;
(function (Delivery_Status) {
    Delivery_Status[Delivery_Status["ORDERED"] = 0] = "ORDERED";
    Delivery_Status[Delivery_Status["PREPARING"] = 1] = "PREPARING";
    Delivery_Status[Delivery_Status["WAIT_FOR_PICK_UP"] = 2] = "WAIT_FOR_PICK_UP";
    Delivery_Status[Delivery_Status["DELIVERING"] = 3] = "DELIVERING";
    Delivery_Status[Delivery_Status["DELIVERED"] = 4] = "DELIVERED";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsaXZlcnktc3RhdHVzLWhpc3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnktc3RhdHVzLWhpc3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUU5QyxNQUFNLENBQU4sSUFBWSxlQU1YO0FBTkQsV0FBWSxlQUFlO0lBQ3pCLDJEQUFPLENBQUE7SUFDUCwrREFBUyxDQUFBO0lBQ1QsNkVBQWdCLENBQUE7SUFDaEIsaUVBQVUsQ0FBQTtJQUNWLCtEQUFTLENBQUE7QUFDWCxDQUFDLEVBTlcsZUFBZSxLQUFmLGVBQWUsUUFNMUI7QUFFRDtJQUEyQyx5Q0FBWTtJQU1yRCwrQkFBWSxJQUFTO1FBQXJCLFlBQ0Usa0JBQU0sSUFBSSxDQUFDLFNBRVo7UUFSRCxRQUFFLEdBQVcsRUFBRSxDQUFDO1FBQ2hCLFlBQU0sR0FBb0IsSUFBSSxDQUFDO1FBQy9CLGlCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFJcEIsaUJBQU0sUUFBUSxhQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBVkQsQ0FBMkMsWUFBWSxHQVV0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGVmYXVsdE1vZGVsfSBmcm9tIFwiLi4vZGVmYXVsdC1tb2RlbFwiO1xuXG5leHBvcnQgZW51bSBEZWxpdmVyeV9TdGF0dXMge1xuICBPUkRFUkVELFxuICBQUkVQQVJJTkcsXG4gIFdBSVRfRk9SX1BJQ0tfVVAsXG4gIERFTElWRVJJTkcsXG4gIERFTElWRVJFRFxufVxuXG5leHBvcnQgY2xhc3MgRGVsaXZlcnlTdGF0dXNIaXN0b3J5IGV4dGVuZHMgRGVmYXVsdE1vZGVsIHtcbiAgaWQ6IHN0cmluZyA9ICcnO1xuICBzdGF0dXM6IERlbGl2ZXJ5X1N0YXR1cyA9IG51bGw7XG4gIGRlbGl2ZXJ5X2lkOiBzdHJpbmcgPSAnJztcbiAgZGF0ZV90aW1lOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xuICAgIHN1cGVyKGRhdGEpO1xuICAgIHN1cGVyLmNvcHlJbnRvKGRhdGEpO1xuICB9XG59XG5cbiJdfQ==