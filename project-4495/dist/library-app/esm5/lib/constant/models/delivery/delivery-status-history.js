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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsaXZlcnktc3RhdHVzLWhpc3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnktc3RhdHVzLWhpc3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUU5QyxNQUFNLENBQU4sSUFBWSxlQU1YO0FBTkQsV0FBWSxlQUFlO0lBQ3pCLDJEQUFPLENBQUE7SUFDUCwrREFBUyxDQUFBO0lBQ1QsNkVBQWdCLENBQUE7SUFDaEIsaUVBQVUsQ0FBQTtJQUNWLCtEQUFTLENBQUE7QUFDWCxDQUFDLEVBTlcsZUFBZSxLQUFmLGVBQWUsUUFNMUI7QUFFRDtJQUEyQyx5Q0FBWTtJQU1yRCwrQkFBWSxJQUFTO1FBQXJCLFlBQ0Usa0JBQU0sSUFBSSxDQUFDLFNBRVo7UUFSRCxRQUFFLEdBQVcsRUFBRSxDQUFDO1FBQ2hCLFlBQU0sR0FBb0IsSUFBSSxDQUFDO1FBQy9CLGlCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFJcEIsaUJBQU0sUUFBUSxhQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBVkQsQ0FBMkMsWUFBWSxHQVV0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGVmYXVsdE1vZGVsfSBmcm9tIFwiLi4vZGVmYXVsdC1tb2RlbFwiO1xyXG5cclxuZXhwb3J0IGVudW0gRGVsaXZlcnlfU3RhdHVzIHtcclxuICBPUkRFUkVELFxyXG4gIFBSRVBBUklORyxcclxuICBXQUlUX0ZPUl9QSUNLX1VQLFxyXG4gIERFTElWRVJJTkcsXHJcbiAgREVMSVZFUkVEXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEZWxpdmVyeVN0YXR1c0hpc3RvcnkgZXh0ZW5kcyBEZWZhdWx0TW9kZWwge1xyXG4gIGlkOiBzdHJpbmcgPSAnJztcclxuICBzdGF0dXM6IERlbGl2ZXJ5X1N0YXR1cyA9IG51bGw7XHJcbiAgZGVsaXZlcnlfaWQ6IHN0cmluZyA9ICcnO1xyXG4gIGRhdGVfdGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XHJcbiAgICBzdXBlcihkYXRhKTtcclxuICAgIHN1cGVyLmNvcHlJbnRvKGRhdGEpO1xyXG4gIH1cclxufVxyXG5cclxuIl19