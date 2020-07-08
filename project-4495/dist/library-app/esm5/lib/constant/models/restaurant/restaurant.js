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
        _this.del_time = '';
        _this.del_fee = '';
        _this.rating = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGF1cmFudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUc5QztJQUFnQyw4QkFBWTtJQW1CMUMsb0JBQVksSUFBUztRQUFyQixZQUNFLGtCQUFNLElBQUksQ0FBQyxTQUVaO1FBckJELFFBQUUsR0FBVyxFQUFFLENBQUM7UUFDaEIsVUFBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixhQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLGNBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsVUFBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixVQUFJLEdBQVcsRUFBRSxDQUFDO1FBRWxCLGNBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsYUFBTyxHQUFXLEVBQUUsQ0FBQztRQUVyQixZQUFNLEdBQVcsQ0FBQyxDQUFDO1FBRW5CLFNBQUcsR0FBVyxDQUFDLENBQUM7UUFDaEIsU0FBRyxHQUFXLENBQUMsQ0FBQztRQUVoQixjQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLFdBQUssR0FBVyxFQUFFLENBQUM7UUFJakIsaUJBQU0sUUFBUSxhQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRUgsaUJBQUM7QUFBRCxDQUFDLEFBeEJELENBQWdDLFlBQVksR0F3QjNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0TW9kZWx9IGZyb20gXCIuLi9kZWZhdWx0LW1vZGVsXCI7XHJcbmltcG9ydCB7TWVhbH0gZnJvbSBcIi4uL21lYWwvbWVhbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlc3RhdXJhbnQgZXh0ZW5kcyBEZWZhdWx0TW9kZWwge1xyXG4gIGlkOiBzdHJpbmcgPSAnJztcclxuICBuYW1lOiBzdHJpbmcgPSAnJztcclxuICBhZGRyZXNzOiBzdHJpbmcgPSAnJztcclxuICBwaG9uZV9ubzogc3RyaW5nID0gJyc7XHJcbiAgaW1nMTogc3RyaW5nID0gJyc7XHJcbiAgaW1nMjogc3RyaW5nID0gJyc7XHJcblxyXG4gIGRlbF90aW1lOiBzdHJpbmcgPSAnJztcclxuICBkZWxfZmVlOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgcmF0aW5nOiBudW1iZXIgPSAwO1xyXG5cclxuICBsYXQ6IG51bWJlciA9IDA7XHJcbiAgbG5nOiBudW1iZXIgPSAwO1xyXG5cclxuICBtZWFsX2lkczogc3RyaW5nW10gPSBbXTtcclxuICBtZWFsczogTWVhbFtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBzdXBlci5jb3B5SW50byhkYXRhKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==