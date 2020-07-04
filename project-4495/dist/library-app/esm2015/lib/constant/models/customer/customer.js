import { DefaultModel } from "../default-model";
export class Customer extends DefaultModel {
    constructor(data) {
        super(data);
        this.id = '';
        this.name = '';
        this.address = '';
        this.lat = 0;
        this.lng = 0;
        this.phone_no = '';
        this.email = '';
        this.password = '';
        super.copyInto(data);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvY3VzdG9tZXIvY3VzdG9tZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRTlDLE1BQU0sT0FBTyxRQUFTLFNBQVEsWUFBWTtJQVl4QyxZQUFZLElBQVM7UUFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBWmQsT0FBRSxHQUFXLEVBQUUsQ0FBQztRQUNoQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsUUFBRyxHQUFXLENBQUMsQ0FBQztRQUNoQixRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBRWhCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUVuQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBSXBCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUVGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0TW9kZWx9IGZyb20gXCIuLi9kZWZhdWx0LW1vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXIgZXh0ZW5kcyBEZWZhdWx0TW9kZWwge1xyXG4gIGlkOiBzdHJpbmcgPSAnJztcclxuICBuYW1lOiBzdHJpbmcgPSAnJztcclxuICBhZGRyZXNzOiBzdHJpbmcgPSAnJztcclxuICBsYXQ6IG51bWJlciA9IDA7XHJcbiAgbG5nOiBudW1iZXIgPSAwO1xyXG5cclxuICBwaG9uZV9ubzogc3RyaW5nID0gJyc7XHJcbiAgZW1haWw6IHN0cmluZyA9ICcnO1xyXG5cclxuICBwYXNzd29yZDogc3RyaW5nID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBzdXBlci5jb3B5SW50byhkYXRhKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==