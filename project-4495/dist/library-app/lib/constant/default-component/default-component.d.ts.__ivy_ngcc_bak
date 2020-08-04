import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
export declare class DefaultComponent implements OnDestroy {
    _subscriptionList: Subscription;
    constructor();
    ngOnDestroy(): void;
    /**
     * unsubscribe all subscription which add into the component
     * it is important to prevent subscription still exist when component is destroyed
     */
    unsubscribeAll(): void;
    /**
     * add subscriptions to component storage
     * @param subscriptions
     */
    addSubscribes(...subscriptions: any[]): void;
}
