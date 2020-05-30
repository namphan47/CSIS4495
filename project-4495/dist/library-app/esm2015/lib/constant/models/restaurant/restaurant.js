import { DefaultModel } from "../default-model";
export class Restaurant extends DefaultModel {
    constructor(data) {
        super(data);
        this.id = '';
        this.name = '';
        this.address = '';
        this.phone_no = '';
        this.lat = '';
        this.long = '';
        this.meal_ids = [];
        this.meals = [];
        super.copyInto(data);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGF1cmFudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL2NvbnN0YW50L21vZGVscy9yZXN0YXVyYW50L3Jlc3RhdXJhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRzlDLE1BQU0sT0FBTyxVQUFXLFNBQVEsWUFBWTtJQVcxQyxZQUFZLElBQVM7UUFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBWGQsT0FBRSxHQUFXLEVBQUUsQ0FBQztRQUNoQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixRQUFHLEdBQVcsRUFBRSxDQUFDO1FBQ2pCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFFbEIsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUN4QixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBSWpCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUVGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0TW9kZWx9IGZyb20gXCIuLi9kZWZhdWx0LW1vZGVsXCI7XHJcbmltcG9ydCB7TWVhbH0gZnJvbSBcIi4uL21lYWwvbWVhbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlc3RhdXJhbnQgZXh0ZW5kcyBEZWZhdWx0TW9kZWwge1xyXG4gIGlkOiBzdHJpbmcgPSAnJztcclxuICBuYW1lOiBzdHJpbmcgPSAnJztcclxuICBhZGRyZXNzOiBzdHJpbmcgPSAnJztcclxuICBwaG9uZV9ubzogc3RyaW5nID0gJyc7XHJcbiAgbGF0OiBzdHJpbmcgPSAnJztcclxuICBsb25nOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgbWVhbF9pZHM6IHN0cmluZ1tdID0gW107XHJcbiAgbWVhbHM6IE1lYWxbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcclxuICAgIHN1cGVyKGRhdGEpO1xyXG4gICAgc3VwZXIuY29weUludG8oZGF0YSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=