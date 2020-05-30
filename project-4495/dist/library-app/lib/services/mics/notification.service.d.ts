import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
export declare class NotificationService {
    readonly _Observable_Message: BehaviorSubject<string>;
    constructor();
    reset(): void;
    pushMessage(message: string): void;
    getMessageOservable(): BehaviorSubject<string>;
    static ɵfac: i0.ɵɵFactoryDef<NotificationService, never>;
    static ɵprov: i0.ɵɵInjectableDef<NotificationService>;
}
