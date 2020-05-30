import { __extends } from "tslib";
import { DefaultModel } from "../default-model";
var Courier = /** @class */ (function (_super) {
    __extends(Courier, _super);
    function Courier(data) {
        var _this = _super.call(this, data) || this;
        _this.id = '';
        _this.name = '';
        _this.vin = '';
        _this.driver_license = '';
        _this.email = '';
        _this.phone_no = '';
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    return Courier;
}(DefaultModel));
export { Courier };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cmllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL2NvbnN0YW50L21vZGVscy9jb3VyaWVyL2NvdXJpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUU5QztJQUE2QiwyQkFBWTtJQVF2QyxpQkFBWSxJQUFTO1FBQXJCLFlBQ0Usa0JBQU0sSUFBSSxDQUFDLFNBRVo7UUFWRCxRQUFFLEdBQVcsRUFBRSxDQUFDO1FBQ2hCLFVBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsU0FBRyxHQUFXLEVBQUUsQ0FBQztRQUNqQixvQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUM1QixXQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLGNBQVEsR0FBVyxFQUFFLENBQUM7UUFJcEIsaUJBQU0sUUFBUSxhQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBQ0gsY0FBQztBQUFELENBQUMsQUFaRCxDQUE2QixZQUFZLEdBWXhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0TW9kZWx9IGZyb20gXCIuLi9kZWZhdWx0LW1vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ291cmllciBleHRlbmRzIERlZmF1bHRNb2RlbCB7XHJcbiAgaWQ6IHN0cmluZyA9ICcnO1xyXG4gIG5hbWU6IHN0cmluZyA9ICcnO1xyXG4gIHZpbjogc3RyaW5nID0gJyc7XHJcbiAgZHJpdmVyX2xpY2Vuc2U6IHN0cmluZyA9ICcnO1xyXG4gIGVtYWlsOiBzdHJpbmcgPSAnJztcclxuICBwaG9uZV9ubzogc3RyaW5nID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBzdXBlci5jb3B5SW50byhkYXRhKTtcclxuICB9XHJcbn1cclxuIl19