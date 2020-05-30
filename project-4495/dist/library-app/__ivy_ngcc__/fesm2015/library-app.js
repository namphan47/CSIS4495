import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, Injectable, Component, NgModule } from '@angular/core';

import * as ɵngcc0 from '@angular/core';
let LibraryAppService = class LibraryAppService {
    constructor() {
    }
    testString() {
        return 'Hello';
    }
};
LibraryAppService.ɵfac = function LibraryAppService_Factory(t) { return new (t || LibraryAppService)(); };
LibraryAppService.ɵprov = ɵɵdefineInjectable({ factory: function LibraryAppService_Factory() { return new LibraryAppService(); }, token: LibraryAppService, providedIn: "root" });

let LibraryAppComponent = class LibraryAppComponent {
    constructor() { }
    ngOnInit() {
    }
};
LibraryAppComponent.ɵfac = function LibraryAppComponent_Factory(t) { return new (t || LibraryAppComponent)(); };
LibraryAppComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: LibraryAppComponent, selectors: [["lib-library-app"]], decls: 2, vars: 0, template: function LibraryAppComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "p");
        ɵngcc0.ɵɵtext(1, " library-app works! ");
        ɵngcc0.ɵɵelementEnd();
    } }, encapsulation: 2 });

let LibraryAppModule = class LibraryAppModule {
};
LibraryAppModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: LibraryAppModule });
LibraryAppModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function LibraryAppModule_Factory(t) { return new (t || LibraryAppModule)(); }, imports: [[]] });

let TestAppService = class TestAppService {
    constructor() {
    }
    testString() {
        return 'Hello Test App';
    }
};
TestAppService.ɵfac = function TestAppService_Factory(t) { return new (t || TestAppService)(); };
TestAppService.ɵprov = ɵɵdefineInjectable({ factory: function TestAppService_Factory() { return new TestAppService(); }, token: TestAppService, providedIn: "root" });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(LibraryAppService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(LibraryAppComponent, [{
        type: Component,
        args: [{
                selector: 'lib-library-app',
                template: `
    <p>
      library-app works!
    </p>
  `
            }]
    }], function () { return []; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(LibraryAppModule, { declarations: [LibraryAppComponent], exports: [LibraryAppComponent] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(LibraryAppModule, [{
        type: NgModule,
        args: [{
                declarations: [LibraryAppComponent],
                imports: [],
                exports: [LibraryAppComponent]
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TestAppService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

/*
 * Public API Surface of library-app
 */

/**
 * Generated bundle index. Do not edit.
 */

export { LibraryAppComponent, LibraryAppModule, LibraryAppService, TestAppService };

//# sourceMappingURL=library-app.js.map