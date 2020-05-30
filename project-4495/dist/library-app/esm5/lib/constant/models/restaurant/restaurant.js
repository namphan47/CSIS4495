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
        _this.lat = '';
        _this.long = '';
        _this.meal_ids = [];
        _this.meals = [];
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    return Restaurant;
}(DefaultModel));
export { Restaurant };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGF1cmFudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUc5QztJQUFnQyw4QkFBWTtJQVcxQyxvQkFBWSxJQUFTO1FBQXJCLFlBQ0Usa0JBQU0sSUFBSSxDQUFDLFNBRVo7UUFiRCxRQUFFLEdBQVcsRUFBRSxDQUFDO1FBQ2hCLFVBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsYUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixjQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFNBQUcsR0FBVyxFQUFFLENBQUM7UUFDakIsVUFBSSxHQUFXLEVBQUUsQ0FBQztRQUVsQixjQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLFdBQUssR0FBVyxFQUFFLENBQUM7UUFJakIsaUJBQU0sUUFBUSxhQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRUgsaUJBQUM7QUFBRCxDQUFDLEFBaEJELENBQWdDLFlBQVksR0FnQjNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0TW9kZWx9IGZyb20gXCIuLi9kZWZhdWx0LW1vZGVsXCI7XHJcbmltcG9ydCB7TWVhbH0gZnJvbSBcIi4uL21lYWwvbWVhbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlc3RhdXJhbnQgZXh0ZW5kcyBEZWZhdWx0TW9kZWwge1xyXG4gIGlkOiBzdHJpbmcgPSAnJztcclxuICBuYW1lOiBzdHJpbmcgPSAnJztcclxuICBhZGRyZXNzOiBzdHJpbmcgPSAnJztcclxuICBwaG9uZV9ubzogc3RyaW5nID0gJyc7XHJcbiAgbGF0OiBzdHJpbmcgPSAnJztcclxuICBsb25nOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgbWVhbF9pZHM6IHN0cmluZ1tdID0gW107XHJcbiAgbWVhbHM6IE1lYWxbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcclxuICAgIHN1cGVyKGRhdGEpO1xyXG4gICAgc3VwZXIuY29weUludG8oZGF0YSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=