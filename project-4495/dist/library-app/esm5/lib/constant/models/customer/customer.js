import { __extends } from "tslib";
import { DefaultModel } from "../default-model";
var Customer = /** @class */ (function (_super) {
    __extends(Customer, _super);
    function Customer(data) {
        var _this = _super.call(this, data) || this;
        _this.id = '';
        _this.name = '';
        _this.address = '';
        _this.lat = 0;
        _this.lng = 0;
        _this.phone_no = '';
        _this.email = '';
        _this.password = '';
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    return Customer;
}(DefaultModel));
export { Customer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvY3VzdG9tZXIvY3VzdG9tZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUU5QztJQUE4Qiw0QkFBWTtJQVl4QyxrQkFBWSxJQUFTO1FBQXJCLFlBQ0Usa0JBQU0sSUFBSSxDQUFDLFNBRVo7UUFkRCxRQUFFLEdBQVcsRUFBRSxDQUFDO1FBQ2hCLFVBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsYUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixTQUFHLEdBQVcsQ0FBQyxDQUFDO1FBQ2hCLFNBQUcsR0FBVyxDQUFDLENBQUM7UUFFaEIsY0FBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixXQUFLLEdBQVcsRUFBRSxDQUFDO1FBRW5CLGNBQVEsR0FBVyxFQUFFLENBQUM7UUFJcEIsaUJBQU0sUUFBUSxhQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRUgsZUFBQztBQUFELENBQUMsQUFqQkQsQ0FBOEIsWUFBWSxHQWlCekMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RlZmF1bHRNb2RlbH0gZnJvbSBcIi4uL2RlZmF1bHQtbW9kZWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21lciBleHRlbmRzIERlZmF1bHRNb2RlbCB7XHJcbiAgaWQ6IHN0cmluZyA9ICcnO1xyXG4gIG5hbWU6IHN0cmluZyA9ICcnO1xyXG4gIGFkZHJlc3M6IHN0cmluZyA9ICcnO1xyXG4gIGxhdDogbnVtYmVyID0gMDtcclxuICBsbmc6IG51bWJlciA9IDA7XHJcblxyXG4gIHBob25lX25vOiBzdHJpbmcgPSAnJztcclxuICBlbWFpbDogc3RyaW5nID0gJyc7XHJcblxyXG4gIHBhc3N3b3JkOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XHJcbiAgICBzdXBlcihkYXRhKTtcclxuICAgIHN1cGVyLmNvcHlJbnRvKGRhdGEpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19