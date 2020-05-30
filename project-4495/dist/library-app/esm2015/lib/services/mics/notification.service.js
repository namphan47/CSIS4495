import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
export class NotificationService {
    constructor() {
        this._Observable_Message = new BehaviorSubject(null);
    }
    reset() {
        this._Observable_Message.next(null);
    }
    pushMessage(message) {
        this._Observable_Message.next(message);
    }
    getMessageOservable() {
        return this._Observable_Message;
    }
}
NotificationService.ɵfac = function NotificationService_Factory(t) { return new (t || NotificationService)(); };
NotificationService.ɵprov = i0.ɵɵdefineInjectable({ token: NotificationService, factory: NotificationService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NotificationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7QUFLckMsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QjtRQUZTLHdCQUFtQixHQUE0QixJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQztJQUcxRixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFlO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxDQUFDOztzRkFoQlUsbUJBQW1COzJEQUFuQixtQkFBbUIsV0FBbkIsbUJBQW1CLG1CQUZsQixNQUFNO2tEQUVQLG1CQUFtQjtjQUgvQixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSBcInJ4anNcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG4gIHJlYWRvbmx5IF9PYnNlcnZhYmxlX01lc3NhZ2U6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KG51bGwpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICB9XHJcblxyXG4gIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fT2JzZXJ2YWJsZV9NZXNzYWdlLm5leHQobnVsbCk7XHJcbiAgfVxyXG5cclxuICBwdXNoTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX09ic2VydmFibGVfTWVzc2FnZS5uZXh0KG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWVzc2FnZU9zZXJ2YWJsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9PYnNlcnZhYmxlX01lc3NhZ2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==