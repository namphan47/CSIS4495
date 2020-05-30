import {Component, OnInit} from '@angular/core';
import {DummyDataService, TestAppService} from 'library-app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'main-app';

  constructor(private _TestAppService: TestAppService,
              private _DummyDataService: DummyDataService) {

  }

  ngOnInit(): void {
    console.log(this._TestAppService.testString());
  }
}
