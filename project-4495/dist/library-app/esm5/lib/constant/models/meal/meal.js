import { __extends } from "tslib";
import { DefaultModel } from "../default-model";
var Meal = /** @class */ (function (_super) {
    __extends(Meal, _super);
    function Meal(data) {
        var _this = _super.call(this, data) || this;
        _this.id = '';
        _this.name = '';
        _this.description = '';
        _this.price = 0;
        _this.image = '';
        _this.restaurant_name = '';
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    return Meal;
}(DefaultModel));
export { Meal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL2NvbnN0YW50L21vZGVscy9tZWFsL21lYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUU5QztJQUEwQix3QkFBWTtJQVFwQyxjQUFZLElBQVM7UUFBckIsWUFDRSxrQkFBTSxJQUFJLENBQUMsU0FFWjtRQVZELFFBQUUsR0FBVyxFQUFFLENBQUM7UUFDaEIsVUFBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixpQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFdBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIscUJBQWUsR0FBVyxFQUFFLENBQUM7UUFJM0IsaUJBQU0sUUFBUSxhQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUFaRCxDQUEwQixZQUFZLEdBWXJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0TW9kZWx9IGZyb20gXCIuLi9kZWZhdWx0LW1vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVhbCBleHRlbmRzIERlZmF1bHRNb2RlbCB7XHJcbiAgaWQ6IHN0cmluZyA9ICcnO1xyXG4gIG5hbWU6IHN0cmluZyA9ICcnO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSAnJztcclxuICBwcmljZTogbnVtYmVyID0gMDtcclxuICBpbWFnZTogc3RyaW5nID0gJyc7XHJcbiAgcmVzdGF1cmFudF9uYW1lOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XHJcbiAgICBzdXBlcihkYXRhKTtcclxuICAgIHN1cGVyLmNvcHlJbnRvKGRhdGEpO1xyXG4gIH1cclxufVxyXG4iXX0=