import { Subscription } from "rxjs";
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
    return DefaultComponent;
}());
export { DefaultComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9kZWZhdWx0LWNvbXBvbmVudC9kZWZhdWx0LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDO0lBR0U7UUFDRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELHNDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILHlDQUFjLEdBQWQ7UUFDRSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEM7UUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUU5QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsd0NBQWEsR0FBYjtRQUFBLGlCQUlDO1FBSmEsdUJBQWdCO2FBQWhCLFVBQWdCLEVBQWhCLHFCQUFnQixFQUFoQixJQUFnQjtZQUFoQixrQ0FBZ0I7O1FBQzVCLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFFO1lBQ3ZCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBaENELElBZ0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPbkRlc3Ryb3l9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIF9zdWJzY3JpcHRpb25MaXN0OiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy51bnN1YnNjcmliZUFsbCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlQWxsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB1bnN1YnNjcmliZSBhbGwgc3Vic2NyaXB0aW9uIHdoaWNoIGFkZCBpbnRvIHRoZSBjb21wb25lbnRcclxuICAgKiBpdCBpcyBpbXBvcnRhbnQgdG8gcHJldmVudCBzdWJzY3JpcHRpb24gc3RpbGwgZXhpc3Qgd2hlbiBjb21wb25lbnQgaXMgZGVzdHJveWVkXHJcbiAgICovXHJcbiAgdW5zdWJzY3JpYmVBbGwoKSB7XHJcbiAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uTGlzdCkge1xyXG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25MaXN0LnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25MaXN0ID0gbmV3IFN1YnNjcmlwdGlvbigpO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGFkZCBzdWJzY3JpcHRpb25zIHRvIGNvbXBvbmVudCBzdG9yYWdlXHJcbiAgICogQHBhcmFtIHN1YnNjcmlwdGlvbnNcclxuICAgKi9cclxuICBhZGRTdWJzY3JpYmVzKC4uLnN1YnNjcmlwdGlvbnMpIHtcclxuICAgIHN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uTGlzdC5hZGQoZWwpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==