import {Component, OnInit} from '@angular/core';
import {Customer} from "library-app";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  customer: Customer;
  loginFormGroup: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.customer = new Customer({});
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    console.log(this.customer);
    console.log(this.loginFormGroup);
    //
    let isValid = true;

    for (let key in this.loginFormGroup.controls) {
      console.log(key);
      console.log(this.loginFormGroup.get(key));
      if (this.loginFormGroup.get(key).invalid) {
        isValid = false;
      }
    }

    if (!isValid) {
      alert('The form is invalid');
    }
  }
}
