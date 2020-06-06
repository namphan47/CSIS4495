import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var UtilsService = /** @class */ (function () {
    function UtilsService(_HttpClient) {
        this._HttpClient = _HttpClient;
    }
    UtilsService.prototype.getJSON = function (url) {
        return this._HttpClient.get(url);
    };
    UtilsService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    UtilsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function UtilsService_Factory() { return new UtilsService(i0.ɵɵinject(i1.HttpClient)); }, token: UtilsService, providedIn: "root" });
    UtilsService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], UtilsService);
    return UtilsService;
}());
export { UtilsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpYnJhcnktYXBwLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL21pY3MvdXRpbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7OztBQUtoRDtJQUVFLHNCQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUMzQyxDQUFDO0lBRU0sOEJBQU8sR0FBZCxVQUFlLEdBQVc7UUFDeEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDOztnQkFMZ0MsVUFBVTs7O0lBRmhDLFlBQVk7UUFIeEIsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLFlBQVksQ0FReEI7dUJBZkQ7Q0FlQyxBQVJELElBUUM7U0FSWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVXRpbHNTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfSHR0cENsaWVudDogSHR0cENsaWVudCkge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEpTT04odXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX0h0dHBDbGllbnQuZ2V0KHVybCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==