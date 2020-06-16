import { DefaultModel } from "../default-model";
export var Delivery_Status;
(function (Delivery_Status) {
    Delivery_Status[Delivery_Status["ORDERED"] = 0] = "ORDERED";
    Delivery_Status[Delivery_Status["PREPARING"] = 1] = "PREPARING";
    Delivery_Status[Delivery_Status["WAIT_FOR_PICK_UP"] = 2] = "WAIT_FOR_PICK_UP";
    Delivery_Status[Delivery_Status["DELIVERING"] = 3] = "DELIVERING";
    Delivery_Status[Delivery_Status["DELIVERED"] = 4] = "DELIVERED";
})(Delivery_Status || (Delivery_Status = {}));
export class DeliveryStatusHistory extends DefaultModel {
    constructor(data) {
        super(data);
        this.id = '';
        this.status = null;
        this.delivery_id = '';
        this.date_time = 0;
        super.copyInto(data);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsaXZlcnktc3RhdHVzLWhpc3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9tb2RlbHMvZGVsaXZlcnkvZGVsaXZlcnktc3RhdHVzLWhpc3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRTlDLE1BQU0sQ0FBTixJQUFZLGVBTVg7QUFORCxXQUFZLGVBQWU7SUFDekIsMkRBQU8sQ0FBQTtJQUNQLCtEQUFTLENBQUE7SUFDVCw2RUFBZ0IsQ0FBQTtJQUNoQixpRUFBVSxDQUFBO0lBQ1YsK0RBQVMsQ0FBQTtBQUNYLENBQUMsRUFOVyxlQUFlLEtBQWYsZUFBZSxRQU0xQjtBQUVELE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxZQUFZO0lBTXJELFlBQVksSUFBUztRQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFOZCxPQUFFLEdBQVcsRUFBRSxDQUFDO1FBQ2hCLFdBQU0sR0FBb0IsSUFBSSxDQUFDO1FBQy9CLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFJcEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RlZmF1bHRNb2RlbH0gZnJvbSBcIi4uL2RlZmF1bHQtbW9kZWxcIjtcclxuXHJcbmV4cG9ydCBlbnVtIERlbGl2ZXJ5X1N0YXR1cyB7XHJcbiAgT1JERVJFRCxcclxuICBQUkVQQVJJTkcsXHJcbiAgV0FJVF9GT1JfUElDS19VUCxcclxuICBERUxJVkVSSU5HLFxyXG4gIERFTElWRVJFRFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGVsaXZlcnlTdGF0dXNIaXN0b3J5IGV4dGVuZHMgRGVmYXVsdE1vZGVsIHtcclxuICBpZDogc3RyaW5nID0gJyc7XHJcbiAgc3RhdHVzOiBEZWxpdmVyeV9TdGF0dXMgPSBudWxsO1xyXG4gIGRlbGl2ZXJ5X2lkOiBzdHJpbmcgPSAnJztcclxuICBkYXRlX3RpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBzdXBlci5jb3B5SW50byhkYXRhKTtcclxuICB9XHJcbn1cclxuXHJcbiJdfQ==