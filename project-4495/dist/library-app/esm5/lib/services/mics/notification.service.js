import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
var NotificationService = /** @class */ (function () {
    function NotificationService() {
        this._Observable_Message = new BehaviorSubject(null);
    }
    NotificationService.prototype.reset = function () {
        this._Observable_Message.next(null);
    };
    NotificationService.prototype.pushMessage = function (message) {
        this._Observable_Message.next(message);
    };
    NotificationService.prototype.getMessageOservable = function () {
        return this._Observable_Message;
    };
    NotificationService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NotificationService_Factory() { return new NotificationService(); }, token: NotificationService, providedIn: "root" });
    NotificationService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], NotificationService);
    return NotificationService;
}());
export { NotificationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7O0FBS3JDO0lBR0U7UUFGUyx3QkFBbUIsR0FBNEIsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7SUFHMUYsQ0FBQztJQUVELG1DQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCx5Q0FBVyxHQUFYLFVBQVksT0FBZTtRQUN6QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxpREFBbUIsR0FBbkI7UUFDRSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxDQUFDOztJQWhCVSxtQkFBbUI7UUFIL0IsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLG1CQUFtQixDQWlCL0I7OEJBdkJEO0NBdUJDLEFBakJELElBaUJDO1NBakJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tIFwicnhqc1wiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XHJcbiAgcmVhZG9ubHkgX09ic2VydmFibGVfTWVzc2FnZTogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4obnVsbCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgcmVzZXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9PYnNlcnZhYmxlX01lc3NhZ2UubmV4dChudWxsKTtcclxuICB9XHJcblxyXG4gIHB1c2hNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5fT2JzZXJ2YWJsZV9NZXNzYWdlLm5leHQobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBnZXRNZXNzYWdlT3NlcnZhYmxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX09ic2VydmFibGVfTWVzc2FnZTtcclxuICB9XHJcbn1cclxuIl19