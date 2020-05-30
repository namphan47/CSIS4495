import { Subscription } from "rxjs";
import * as i0 from "@angular/core";
export class DefaultComponent {
    constructor() {
        this.unsubscribeAll();
    }
    ngOnDestroy() {
        this.unsubscribeAll();
    }
    /**
     * unsubscribe all subscription which add into the component
     * it is important to prevent subscription still exist when component is destroyed
     */
    unsubscribeAll() {
        if (this._subscriptionList) {
            this._subscriptionList.unsubscribe();
        }
        this._subscriptionList = new Subscription();
    }
    /**
     * add subscriptions to component storage
     * @param subscriptions
     */
    addSubscribes(...subscriptions) {
        subscriptions.forEach((el) => {
            this._subscriptionList.add(el);
        });
    }
}
DefaultComponent.ɵfac = function DefaultComponent_Factory(t) { return new (t || DefaultComponent)(); };
DefaultComponent.ɵdir = i0.ɵɵdefineDirective({ type: DefaultComponent });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9kZWZhdWx0LWNvbXBvbmVudC9kZWZhdWx0LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUVsQyxNQUFNLE9BQU8sZ0JBQWdCO0lBRzNCO1FBQ0UsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxjQUFjO1FBQ1osSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFOUMsQ0FBQztJQUVEOzs7T0FHRztJQUNILGFBQWEsQ0FBQyxHQUFHLGFBQWE7UUFDNUIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnRkEvQlUsZ0JBQWdCO3FEQUFoQixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09uRGVzdHJveX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgX3N1YnNjcmlwdGlvbkxpc3Q6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlQWxsKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVBbGwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHVuc3Vic2NyaWJlIGFsbCBzdWJzY3JpcHRpb24gd2hpY2ggYWRkIGludG8gdGhlIGNvbXBvbmVudFxyXG4gICAqIGl0IGlzIGltcG9ydGFudCB0byBwcmV2ZW50IHN1YnNjcmlwdGlvbiBzdGlsbCBleGlzdCB3aGVuIGNvbXBvbmVudCBpcyBkZXN0cm95ZWRcclxuICAgKi9cclxuICB1bnN1YnNjcmliZUFsbCgpIHtcclxuICAgIGlmICh0aGlzLl9zdWJzY3JpcHRpb25MaXN0KSB7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbkxpc3QudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbkxpc3QgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogYWRkIHN1YnNjcmlwdGlvbnMgdG8gY29tcG9uZW50IHN0b3JhZ2VcclxuICAgKiBAcGFyYW0gc3Vic2NyaXB0aW9uc1xyXG4gICAqL1xyXG4gIGFkZFN1YnNjcmliZXMoLi4uc3Vic2NyaXB0aW9ucykge1xyXG4gICAgc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25MaXN0LmFkZChlbCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19