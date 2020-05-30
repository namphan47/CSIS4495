import { Subscription } from "rxjs";
import * as i0 from "@angular/core";
var DefaultComponent = /** @class */ (function () {
    function DefaultComponent() {
        this.unsubscribeAll();
    }
    DefaultComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeAll();
    };
    /**
     * unsubscribe all subscription which add into the component
     * it is important to prevent subscription still exist when component is destroyed
     */
    DefaultComponent.prototype.unsubscribeAll = function () {
        if (this._subscriptionList) {
            this._subscriptionList.unsubscribe();
        }
        this._subscriptionList = new Subscription();
    };
    /**
     * add subscriptions to component storage
     * @param subscriptions
     */
    DefaultComponent.prototype.addSubscribes = function () {
        var _this = this;
        var subscriptions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            subscriptions[_i] = arguments[_i];
        }
        subscriptions.forEach(function (el) {
            _this._subscriptionList.add(el);
        });
    };
    DefaultComponent.ɵfac = function DefaultComponent_Factory(t) { return new (t || DefaultComponent)(); };
    DefaultComponent.ɵdir = i0.ɵɵdefineDirective({ type: DefaultComponent });
    return DefaultComponent;
}());
export { DefaultComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9kZWZhdWx0LWNvbXBvbmVudC9kZWZhdWx0LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUVsQztJQUdFO1FBQ0UsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxzQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7O09BR0c7SUFDSCx5Q0FBYyxHQUFkO1FBQ0UsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFOUMsQ0FBQztJQUVEOzs7T0FHRztJQUNILHdDQUFhLEdBQWI7UUFBQSxpQkFJQztRQUphLHVCQUFnQjthQUFoQixVQUFnQixFQUFoQixxQkFBZ0IsRUFBaEIsSUFBZ0I7WUFBaEIsa0NBQWdCOztRQUM1QixhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBRTtZQUN2QixLQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztvRkEvQlUsZ0JBQWdCO3lEQUFoQixnQkFBZ0I7MkJBSDdCO0NBbUNDLEFBaENELElBZ0NDO1NBaENZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T25EZXN0cm95fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBfc3Vic2NyaXB0aW9uTGlzdDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVBbGwoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy51bnN1YnNjcmliZUFsbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdW5zdWJzY3JpYmUgYWxsIHN1YnNjcmlwdGlvbiB3aGljaCBhZGQgaW50byB0aGUgY29tcG9uZW50XHJcbiAgICogaXQgaXMgaW1wb3J0YW50IHRvIHByZXZlbnQgc3Vic2NyaXB0aW9uIHN0aWxsIGV4aXN0IHdoZW4gY29tcG9uZW50IGlzIGRlc3Ryb3llZFxyXG4gICAqL1xyXG4gIHVuc3Vic2NyaWJlQWxsKCkge1xyXG4gICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbkxpc3QpIHtcclxuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uTGlzdC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uTGlzdCA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBhZGQgc3Vic2NyaXB0aW9ucyB0byBjb21wb25lbnQgc3RvcmFnZVxyXG4gICAqIEBwYXJhbSBzdWJzY3JpcHRpb25zXHJcbiAgICovXHJcbiAgYWRkU3Vic2NyaWJlcyguLi5zdWJzY3JpcHRpb25zKSB7XHJcbiAgICBzdWJzY3JpcHRpb25zLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbkxpc3QuYWRkKGVsKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=