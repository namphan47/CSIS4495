import { Subscription } from "rxjs";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saWJyYXJ5LWFwcC8iLCJzb3VyY2VzIjpbImxpYi9jb25zdGFudC9kZWZhdWx0LWNvbXBvbmVudC9kZWZhdWx0LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE1BQU0sT0FBTyxnQkFBZ0I7SUFHM0I7UUFDRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILGNBQWM7UUFDWixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEM7UUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUU5QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsYUFBYSxDQUFDLEdBQUcsYUFBYTtRQUM1QixhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T25EZXN0cm95fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBfc3Vic2NyaXB0aW9uTGlzdDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVBbGwoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy51bnN1YnNjcmliZUFsbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdW5zdWJzY3JpYmUgYWxsIHN1YnNjcmlwdGlvbiB3aGljaCBhZGQgaW50byB0aGUgY29tcG9uZW50XHJcbiAgICogaXQgaXMgaW1wb3J0YW50IHRvIHByZXZlbnQgc3Vic2NyaXB0aW9uIHN0aWxsIGV4aXN0IHdoZW4gY29tcG9uZW50IGlzIGRlc3Ryb3llZFxyXG4gICAqL1xyXG4gIHVuc3Vic2NyaWJlQWxsKCkge1xyXG4gICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbkxpc3QpIHtcclxuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uTGlzdC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uTGlzdCA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBhZGQgc3Vic2NyaXB0aW9ucyB0byBjb21wb25lbnQgc3RvcmFnZVxyXG4gICAqIEBwYXJhbSBzdWJzY3JpcHRpb25zXHJcbiAgICovXHJcbiAgYWRkU3Vic2NyaWJlcyguLi5zdWJzY3JpcHRpb25zKSB7XHJcbiAgICBzdWJzY3JpcHRpb25zLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbkxpc3QuYWRkKGVsKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=