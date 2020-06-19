import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { LibraryAppComponent } from './library-app.component';
import { NguiMapModule } from "@ngui/map";
let LibraryAppModule = class LibraryAppModule {
};
LibraryAppModule = __decorate([
    NgModule({
        declarations: [LibraryAppComponent],
        imports: [
            NguiMapModule.forRoot({
                apiUrl: `https://maps.google.com/maps/api/js?libraries=drawing&key=AIzaSyDrnDCTwDNyiqxi-qkY1wMRCpbBMA8LFYc`
            })
        ],
        exports: [LibraryAppComponent]
    })
], LibraryAppModule);
export { LibraryAppModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlicmFyeS1hcHAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGlicmFyeS1hcHAvIiwic291cmNlcyI6WyJsaWIvbGlicmFyeS1hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFXeEMsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7Q0FDNUIsQ0FBQTtBQURZLGdCQUFnQjtJQVQ1QixRQUFRLENBQUM7UUFDUixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztRQUNuQyxPQUFPLEVBQUU7WUFDUCxhQUFhLENBQUMsT0FBTyxDQUFDO2dCQUNwQixNQUFNLEVBQUUsbUdBQW1HO2FBQzVHLENBQUM7U0FDSDtRQUNELE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDO0tBQy9CLENBQUM7R0FDVyxnQkFBZ0IsQ0FDNUI7U0FEWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtMaWJyYXJ5QXBwQ29tcG9uZW50fSBmcm9tICcuL2xpYnJhcnktYXBwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Tmd1aU1hcE1vZHVsZX0gZnJvbSBcIkBuZ3VpL21hcFwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtMaWJyYXJ5QXBwQ29tcG9uZW50XSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBOZ3VpTWFwTW9kdWxlLmZvclJvb3Qoe1xyXG4gICAgICBhcGlVcmw6IGBodHRwczovL21hcHMuZ29vZ2xlLmNvbS9tYXBzL2FwaS9qcz9saWJyYXJpZXM9ZHJhd2luZyZrZXk9QUl6YVN5RHJuRENUd0ROeWlxeGktcWtZMXdNUkNwYkJNQThMRlljYFxyXG4gICAgfSlcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtMaWJyYXJ5QXBwQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlicmFyeUFwcE1vZHVsZSB7XHJcbn1cclxuIl19