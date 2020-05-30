import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, Injectable, Component, NgModule } from '@angular/core';

let LibraryAppService = class LibraryAppService {
    constructor() {
    }
    testString() {
        return 'Hello';
    }
};
LibraryAppService.ɵprov = ɵɵdefineInjectable({ factory: function LibraryAppService_Factory() { return new LibraryAppService(); }, token: LibraryAppService, providedIn: "root" });
LibraryAppService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], LibraryAppService);

let LibraryAppComponent = class LibraryAppComponent {
    constructor() { }
    ngOnInit() {
    }
};
LibraryAppComponent = __decorate([
    Component({
        selector: 'lib-library-app',
        template: `
    <p>
      library-app works!
    </p>
  `
    })
], LibraryAppComponent);

let LibraryAppModule = class LibraryAppModule {
};
LibraryAppModule = __decorate([
    NgModule({
        declarations: [LibraryAppComponent],
        imports: [],
        exports: [LibraryAppComponent]
    })
], LibraryAppModule);

let TestAppService = class TestAppService {
    constructor() {
    }
    testString() {
        return 'Hello Test App';
    }
};
TestAppService.ɵprov = ɵɵdefineInjectable({ factory: function TestAppService_Factory() { return new TestAppService(); }, token: TestAppService, providedIn: "root" });
TestAppService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TestAppService);

/*
 * Public API Surface of library-app
 */

/**
 * Generated bundle index. Do not edit.
 */

export { LibraryAppComponent, LibraryAppModule, LibraryAppService, TestAppService };
//# sourceMappingURL=library-app.js.map
