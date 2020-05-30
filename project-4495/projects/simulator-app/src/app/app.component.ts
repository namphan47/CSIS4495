import {Component, OnInit} from '@angular/core';
import {TestAppService} from 'library-app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _TestAppService: TestAppService) {

  }

  ngOnInit(): void {
  }

}
