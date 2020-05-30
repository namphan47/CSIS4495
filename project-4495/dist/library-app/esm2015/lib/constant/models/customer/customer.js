import { DefaultModel } from "../default-model";
export class Customer extends DefaultModel {
    constructor(data) {
        super(data);
        this.id = '';
        this.name = '';
        this.address = '';
        this.lat = '';
        this.long = '';
        this.phone_no = '';
        this.email = '';
        super.copyInto(data);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvY3VzdG9tZXIvY3VzdG9tZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRTlDLE1BQU0sT0FBTyxRQUFTLFNBQVEsWUFBWTtJQVN4QyxZQUFZLElBQVM7UUFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBVGQsT0FBRSxHQUFXLEVBQUUsQ0FBQztRQUNoQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsUUFBRyxHQUFXLEVBQUUsQ0FBQztRQUNqQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUlqQixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Q0FFRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGVmYXVsdE1vZGVsfSBmcm9tIFwiLi4vZGVmYXVsdC1tb2RlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyIGV4dGVuZHMgRGVmYXVsdE1vZGVsIHtcclxuICBpZDogc3RyaW5nID0gJyc7XHJcbiAgbmFtZTogc3RyaW5nID0gJyc7XHJcbiAgYWRkcmVzczogc3RyaW5nID0gJyc7XHJcbiAgbGF0OiBzdHJpbmcgPSAnJztcclxuICBsb25nOiBzdHJpbmcgPSAnJztcclxuICBwaG9uZV9ubzogc3RyaW5nID0gJyc7XHJcbiAgZW1haWw6IHN0cmluZyA9ICcnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcclxuICAgIHN1cGVyKGRhdGEpO1xyXG4gICAgc3VwZXIuY29weUludG8oZGF0YSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=