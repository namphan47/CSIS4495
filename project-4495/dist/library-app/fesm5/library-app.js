import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, Injectable, Component, NgModule } from '@angular/core';

var LibraryAppService = /** @class */ (function () {
    function LibraryAppService() {
    }
    LibraryAppService.prototype.testString = function () {
        return 'Hello';
    };
    LibraryAppService.ɵprov = ɵɵdefineInjectable({ factory: function LibraryAppService_Factory() { return new LibraryAppService(); }, token: LibraryAppService, providedIn: "root" });
    LibraryAppService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], LibraryAppService);
    return LibraryAppService;
}());

var LibraryAppComponent = /** @class */ (function () {
    function LibraryAppComponent() {
    }
    LibraryAppComponent.prototype.ngOnInit = function () {
    };
    LibraryAppComponent = __decorate([
        Component({
            selector: 'lib-library-app',
            template: "\n    <p>\n      library-app works!\n    </p>\n  "
        })
    ], LibraryAppComponent);
    return LibraryAppComponent;
}());

var LibraryAppModule = /** @class */ (function () {
    function LibraryAppModule() {
    }
    LibraryAppModule = __decorate([
        NgModule({
            declarations: [LibraryAppComponent],
            imports: [],
            exports: [LibraryAppComponent]
        })
    ], LibraryAppModule);
    return LibraryAppModule;
}());

var TestAppService = /** @class */ (function () {
    function TestAppService() {
    }
    TestAppService.prototype.testString = function () {
        return 'Hello Test App';
    };
    TestAppService.ɵprov = ɵɵdefineInjectable({ factory: function TestAppService_Factory() { return new TestAppService(); }, token: TestAppService, providedIn: "root" });
    TestAppService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], TestAppService);
    return TestAppService;
}());

/*
 * Public API Surface of library-app
 */

/**
 * Generated bundle index. Do not edit.
 */

export { LibraryAppComponent, LibraryAppModule, LibraryAppService, TestAppService };
//# sourceMappingURL=library-app.js.map
