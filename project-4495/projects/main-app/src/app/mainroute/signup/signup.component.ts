import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  inputData = {
    email: '',
    password: '',
    repassword: ''
  };

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  // onInputChange($event: any) {
  //   console.log(this.inputData);
  // }

  signup() {
    // if(this.inputData.email !== '')
    console.log(this.inputData);
    this.router.navigateByUrl('main/login');
  }
}
