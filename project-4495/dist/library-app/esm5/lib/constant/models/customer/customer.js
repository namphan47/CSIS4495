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
        _super.prototype.copyInto.call(_this, data);
        return _this;
    }
    return Customer;
}(DefaultModel));
export { Customer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvY3VzdG9tZXIvY3VzdG9tZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUU5QztJQUE4Qiw0QkFBWTtJQVV4QyxrQkFBWSxJQUFTO1FBQXJCLFlBQ0Usa0JBQU0sSUFBSSxDQUFDLFNBRVo7UUFaRCxRQUFFLEdBQVcsRUFBRSxDQUFDO1FBQ2hCLFVBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsYUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixTQUFHLEdBQVcsQ0FBQyxDQUFDO1FBQ2hCLFNBQUcsR0FBVyxDQUFDLENBQUM7UUFFaEIsY0FBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixXQUFLLEdBQVcsRUFBRSxDQUFDO1FBSWpCLGlCQUFNLFFBQVEsYUFBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVILGVBQUM7QUFBRCxDQUFDLEFBZkQsQ0FBOEIsWUFBWSxHQWV6QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGVmYXVsdE1vZGVsfSBmcm9tIFwiLi4vZGVmYXVsdC1tb2RlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyIGV4dGVuZHMgRGVmYXVsdE1vZGVsIHtcclxuICBpZDogc3RyaW5nID0gJyc7XHJcbiAgbmFtZTogc3RyaW5nID0gJyc7XHJcbiAgYWRkcmVzczogc3RyaW5nID0gJyc7XHJcbiAgbGF0OiBudW1iZXIgPSAwO1xyXG4gIGxuZzogbnVtYmVyID0gMDtcclxuXHJcbiAgcGhvbmVfbm86IHN0cmluZyA9ICcnO1xyXG4gIGVtYWlsOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XHJcbiAgICBzdXBlcihkYXRhKTtcclxuICAgIHN1cGVyLmNvcHlJbnRvKGRhdGEpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19