import { DefaultModel } from "../default-model";
export class Courier extends DefaultModel {
    constructor(data) {
        super(data);
        this.id = '';
        this.name = '';
        this.vin = '';
        this.driver_license = '';
        this.email = '';
        this.phone_no = '';
        super.copyInto(data);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cmllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL2NvbnN0YW50L21vZGVscy9jb3VyaWVyL2NvdXJpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRTlDLE1BQU0sT0FBTyxPQUFRLFNBQVEsWUFBWTtJQVF2QyxZQUFZLElBQVM7UUFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBUmQsT0FBRSxHQUFXLEVBQUUsQ0FBQztRQUNoQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFFBQUcsR0FBVyxFQUFFLENBQUM7UUFDakIsbUJBQWMsR0FBVyxFQUFFLENBQUM7UUFDNUIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBSXBCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0TW9kZWx9IGZyb20gXCIuLi9kZWZhdWx0LW1vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ291cmllciBleHRlbmRzIERlZmF1bHRNb2RlbCB7XHJcbiAgaWQ6IHN0cmluZyA9ICcnO1xyXG4gIG5hbWU6IHN0cmluZyA9ICcnO1xyXG4gIHZpbjogc3RyaW5nID0gJyc7XHJcbiAgZHJpdmVyX2xpY2Vuc2U6IHN0cmluZyA9ICcnO1xyXG4gIGVtYWlsOiBzdHJpbmcgPSAnJztcclxuICBwaG9uZV9ubzogc3RyaW5nID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBzdXBlci5jb3B5SW50byhkYXRhKTtcclxuICB9XHJcbn1cclxuIl19