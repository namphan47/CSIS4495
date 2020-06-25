import { DefaultModel } from "../default-model";
export class Restaurant extends DefaultModel {
    constructor(data) {
        super(data);
        this.id = '';
        this.name = '';
        this.address = '';
        this.phone_no = '';
        this.img1 = '';
        this.img2 = '';
        this.del_time = '';
        this.del_fee = '';
        this.rating = 0;
        this.lat = 0;
        this.lng = 0;
        this.meal_ids = [];
        this.meals = [];
        super.copyInto(data);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGF1cmFudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRzlDLE1BQU0sT0FBTyxVQUFXLFNBQVEsWUFBWTtJQW1CMUMsWUFBWSxJQUFTO1FBQ25CLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQW5CZCxPQUFFLEdBQVcsRUFBRSxDQUFDO1FBQ2hCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUVsQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFFckIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUVuQixRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBQ2hCLFFBQUcsR0FBVyxDQUFDLENBQUM7UUFFaEIsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUN4QixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBSWpCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUVGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0TW9kZWx9IGZyb20gXCIuLi9kZWZhdWx0LW1vZGVsXCI7XHJcbmltcG9ydCB7TWVhbH0gZnJvbSBcIi4uL21lYWwvbWVhbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlc3RhdXJhbnQgZXh0ZW5kcyBEZWZhdWx0TW9kZWwge1xyXG4gIGlkOiBzdHJpbmcgPSAnJztcclxuICBuYW1lOiBzdHJpbmcgPSAnJztcclxuICBhZGRyZXNzOiBzdHJpbmcgPSAnJztcclxuICBwaG9uZV9ubzogc3RyaW5nID0gJyc7XHJcbiAgaW1nMTogc3RyaW5nID0gJyc7XHJcbiAgaW1nMjogc3RyaW5nID0gJyc7XHJcblxyXG4gIGRlbF90aW1lOiBzdHJpbmcgPSAnJztcclxuICBkZWxfZmVlOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgcmF0aW5nOiBudW1iZXIgPSAwO1xyXG5cclxuICBsYXQ6IG51bWJlciA9IDA7XHJcbiAgbG5nOiBudW1iZXIgPSAwO1xyXG5cclxuICBtZWFsX2lkczogc3RyaW5nW10gPSBbXTtcclxuICBtZWFsczogTWVhbFtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBzdXBlci5jb3B5SW50byhkYXRhKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==