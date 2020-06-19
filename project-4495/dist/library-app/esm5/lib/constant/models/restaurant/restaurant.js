import { __extends } from "tslib";
import { DefaultModel } from "../default-model";
var Restaurant = /** @class */ (function (_super) {
    __extends(Restaurant, _super);
    function Restaurant(data) {
        var _this = _super.call(this, data) || this;
        _this.id = '';
        _this.name = '';
        _this.address = '';
        _this.phone_no = '';
        _this.img1 = '';
        _this.img2 = '';
        _this.lat = 0;
        _this.lng = 0;
        _this.meal_ids = [];
        _this.meals = [];
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    return Restaurant;
}(DefaultModel));
export { Restaurant };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGF1cmFudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUc5QztJQUFnQyw4QkFBWTtJQWMxQyxvQkFBWSxJQUFTO1FBQXJCLFlBQ0Usa0JBQU0sSUFBSSxDQUFDLFNBRVo7UUFoQkQsUUFBRSxHQUFXLEVBQUUsQ0FBQztRQUNoQixVQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLGFBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsY0FBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixVQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFVBQUksR0FBVyxFQUFFLENBQUM7UUFFbEIsU0FBRyxHQUFXLENBQUMsQ0FBQztRQUNoQixTQUFHLEdBQVcsQ0FBQyxDQUFDO1FBRWhCLGNBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsV0FBSyxHQUFXLEVBQUUsQ0FBQztRQUlqQixpQkFBTSxRQUFRLGFBQUMsSUFBSSxDQUFDLENBQUM7O0lBQ3ZCLENBQUM7SUFFSCxpQkFBQztBQUFELENBQUMsQUFuQkQsQ0FBZ0MsWUFBWSxHQW1CM0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RlZmF1bHRNb2RlbH0gZnJvbSBcIi4uL2RlZmF1bHQtbW9kZWxcIjtcclxuaW1wb3J0IHtNZWFsfSBmcm9tIFwiLi4vbWVhbC9tZWFsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzdGF1cmFudCBleHRlbmRzIERlZmF1bHRNb2RlbCB7XHJcbiAgaWQ6IHN0cmluZyA9ICcnO1xyXG4gIG5hbWU6IHN0cmluZyA9ICcnO1xyXG4gIGFkZHJlc3M6IHN0cmluZyA9ICcnO1xyXG4gIHBob25lX25vOiBzdHJpbmcgPSAnJztcclxuICBpbWcxOiBzdHJpbmcgPSAnJztcclxuICBpbWcyOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgbGF0OiBudW1iZXIgPSAwO1xyXG4gIGxuZzogbnVtYmVyID0gMDtcclxuXHJcbiAgbWVhbF9pZHM6IHN0cmluZ1tdID0gW107XHJcbiAgbWVhbHM6IE1lYWxbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcclxuICAgIHN1cGVyKGRhdGEpO1xyXG4gICAgc3VwZXIuY29weUludG8oZGF0YSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=