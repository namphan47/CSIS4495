import {Component, OnInit} from '@angular/core';
import {FirebaseDataService} from 'library-app';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _FirebaseDataService: FirebaseDataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  orderHistory() {
    this.router.navigate(['/main/', 'orderhistory']);
  }

  goToAccount() {
    this.router.navigate(['/main/', 'account']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/main/', 'login']);
  }

  logo() {
    if ('CustomerID' in localStorage) {

      this.router.navigate(['/main/', 'rest']);
    } else {

      this.router.navigate(['/main/', 'login']);
    }
  }

}
