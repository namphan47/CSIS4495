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
    NotificationService.ɵfac = function NotificationService_Factory(t) { return new (t || NotificationService)(); };
    NotificationService.ɵprov = i0.ɵɵdefineInjectable({ token: NotificationService, factory: NotificationService.ɵfac, providedIn: 'root' });
    return NotificationService;
}());
export { NotificationService };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NotificationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9taWNzL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7QUFFckM7SUFNRTtRQUZTLHdCQUFtQixHQUE0QixJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQztJQUcxRixDQUFDO0lBRUQsbUNBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELHlDQUFXLEdBQVgsVUFBWSxPQUFlO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELGlEQUFtQixHQUFuQjtRQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xDLENBQUM7MEZBaEJVLG1CQUFtQjsrREFBbkIsbUJBQW1CLFdBQW5CLG1CQUFtQixtQkFGbEIsTUFBTTs4QkFKcEI7Q0F1QkMsQUFwQkQsSUFvQkM7U0FqQlksbUJBQW1CO2tEQUFuQixtQkFBbUI7Y0FIL0IsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gXCJyeGpzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcclxuICByZWFkb25seSBfT2JzZXJ2YWJsZV9NZXNzYWdlOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihudWxsKTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICByZXNldCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX09ic2VydmFibGVfTWVzc2FnZS5uZXh0KG51bGwpO1xyXG4gIH1cclxuXHJcbiAgcHVzaE1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9PYnNlcnZhYmxlX01lc3NhZ2UubmV4dChtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIGdldE1lc3NhZ2VPc2VydmFibGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fT2JzZXJ2YWJsZV9NZXNzYWdlO1xyXG4gIH1cclxufVxyXG4iXX0=