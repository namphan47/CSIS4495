import { DefaultModel } from "../default-model";
export class Meal extends DefaultModel {
    constructor(data) {
        super(data);
        this.id = '';
        this.name = '';
        this.description = '';
        this.price = 0;
        this.image = '';
        this.restaurant_name = '';
        super.copyInto(data);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL2NvbnN0YW50L21vZGVscy9tZWFsL21lYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRTlDLE1BQU0sT0FBTyxJQUFLLFNBQVEsWUFBWTtJQVFwQyxZQUFZLElBQVM7UUFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBUmQsT0FBRSxHQUFXLEVBQUUsQ0FBQztRQUNoQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixvQkFBZSxHQUFXLEVBQUUsQ0FBQztRQUkzQixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGVmYXVsdE1vZGVsfSBmcm9tIFwiLi4vZGVmYXVsdC1tb2RlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lYWwgZXh0ZW5kcyBEZWZhdWx0TW9kZWwge1xyXG4gIGlkOiBzdHJpbmcgPSAnJztcclxuICBuYW1lOiBzdHJpbmcgPSAnJztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nID0gJyc7XHJcbiAgcHJpY2U6IG51bWJlciA9IDA7XHJcbiAgaW1hZ2U6IHN0cmluZyA9ICcnO1xyXG4gIHJlc3RhdXJhbnRfbmFtZTogc3RyaW5nID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBzdXBlci5jb3B5SW50byhkYXRhKTtcclxuICB9XHJcbn1cclxuIl19