import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DefaultComponent, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<DefaultComponent, never, never, {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jb21wb25lbnQuZC50cyIsInNvdXJjZXMiOlsiZGVmYXVsdC1jb21wb25lbnQuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgRGVmYXVsdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgICBfc3Vic2NyaXB0aW9uTGlzdDogU3Vic2NyaXB0aW9uO1xyXG4gICAgY29uc3RydWN0b3IoKTtcclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIHVuc3Vic2NyaWJlIGFsbCBzdWJzY3JpcHRpb24gd2hpY2ggYWRkIGludG8gdGhlIGNvbXBvbmVudFxyXG4gICAgICogaXQgaXMgaW1wb3J0YW50IHRvIHByZXZlbnQgc3Vic2NyaXB0aW9uIHN0aWxsIGV4aXN0IHdoZW4gY29tcG9uZW50IGlzIGRlc3Ryb3llZFxyXG4gICAgICovXHJcbiAgICB1bnN1YnNjcmliZUFsbCgpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgc3Vic2NyaXB0aW9ucyB0byBjb21wb25lbnQgc3RvcmFnZVxyXG4gICAgICogQHBhcmFtIHN1YnNjcmlwdGlvbnNcclxuICAgICAqL1xyXG4gICAgYWRkU3Vic2NyaWJlcyguLi5zdWJzY3JpcHRpb25zOiBhbnlbXSk6IHZvaWQ7XHJcbn1cclxuIl19