import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var UtilsService = /** @class */ (function () {
    function UtilsService(_HttpClient) {
        this._HttpClient = _HttpClient;
    }
    UtilsService.prototype.getJSON = function (url) {
        return this._HttpClient.get(url);
    };
    UtilsService.ɵfac = function UtilsService_Factory(t) { return new (t || UtilsService)(i0.ɵɵinject(i1.HttpClient)); };
    UtilsService.ɵprov = i0.ɵɵdefineInjectable({ token: UtilsService, factory: UtilsService.ɵfac, providedIn: 'root' });
    return UtilsService;
}());
export { UtilsService };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(UtilsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL21pY3MvdXRpbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7QUFJekM7SUFLRSxzQkFBb0IsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFDM0MsQ0FBQztJQUVNLDhCQUFPLEdBQWQsVUFBZSxHQUFXO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs0RUFQVSxZQUFZO3dEQUFaLFlBQVksV0FBWixZQUFZLG1CQUZYLE1BQU07dUJBTHBCO0NBZUMsQUFYRCxJQVdDO1NBUlksWUFBWTtrREFBWixZQUFZO2NBSHhCLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBVdGlsc1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX0h0dHBDbGllbnQ6IEh0dHBDbGllbnQpIHtcbiAgfVxuXG4gIHB1YmxpYyBnZXRKU09OKHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fSHR0cENsaWVudC5nZXQodXJsKTtcbiAgfVxufVxuIl19