import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { LibraryAppComponent } from './library-app.component';
import { NguiMapModule } from "@ngui/map";
var LibraryAppModule = /** @class */ (function () {
    function LibraryAppModule() {
    }
    LibraryAppModule = __decorate([
        NgModule({
            declarations: [LibraryAppComponent],
            imports: [
                NguiMapModule.forRoot({
                    apiUrl: "https://maps.google.com/maps/api/js?libraries=drawing&key=AIzaSyDrnDCTwDNyiqxi-qkY1wMRCpbBMA8LFYc"
                })
            ],
            exports: [LibraryAppComponent]
        })
    ], LibraryAppModule);
    return LibraryAppModule;
}());
export { LibraryAppModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlicmFyeS1hcHAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvbGlicmFyeS1hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFXeEM7SUFBQTtJQUNBLENBQUM7SUFEWSxnQkFBZ0I7UUFUNUIsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLENBQUMsbUJBQW1CLENBQUM7WUFDbkMsT0FBTyxFQUFFO2dCQUNQLGFBQWEsQ0FBQyxPQUFPLENBQUM7b0JBQ3BCLE1BQU0sRUFBRSxtR0FBbUc7aUJBQzVHLENBQUM7YUFDSDtZQUNELE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDO1NBQy9CLENBQUM7T0FDVyxnQkFBZ0IsQ0FDNUI7SUFBRCx1QkFBQztDQUFBLEFBREQsSUFDQztTQURZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0xpYnJhcnlBcHBDb21wb25lbnR9IGZyb20gJy4vbGlicmFyeS1hcHAuY29tcG9uZW50JztcclxuaW1wb3J0IHtOZ3VpTWFwTW9kdWxlfSBmcm9tIFwiQG5ndWkvbWFwXCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW0xpYnJhcnlBcHBDb21wb25lbnRdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIE5ndWlNYXBNb2R1bGUuZm9yUm9vdCh7XHJcbiAgICAgIGFwaVVybDogYGh0dHBzOi8vbWFwcy5nb29nbGUuY29tL21hcHMvYXBpL2pzP2xpYnJhcmllcz1kcmF3aW5nJmtleT1BSXphU3lEcm5EQ1R3RE55aXF4aS1xa1kxd01SQ3BiQk1BOExGWWNgXHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW0xpYnJhcnlBcHBDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaWJyYXJ5QXBwTW9kdWxlIHtcclxufVxyXG4iXX0=