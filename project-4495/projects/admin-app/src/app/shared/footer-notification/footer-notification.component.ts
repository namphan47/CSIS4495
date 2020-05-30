import {Component, OnInit} from '@angular/core';
import {DefaultComponent, NotificationService} from "library-app";

@Component({
  selector: 'app-footer-notification',
  templateUrl: './footer-notification.component.html',
  styleUrls: ['./footer-notification.component.scss']
})
export class FooterNotificationComponent extends DefaultComponent implements OnInit {
  message: string;

  constructor(private _NotificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    this._NotificationService.reset();
    this.addSubscribes(
      this._NotificationService.getMessageOservable()
        .subscribe((rs) => {
          this.message = rs;
        })
    );
  }

}
