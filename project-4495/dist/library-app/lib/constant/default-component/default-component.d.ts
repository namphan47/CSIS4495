import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDef<DefaultComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<DefaultComponent, never, never, {}, {}, never>;
}
