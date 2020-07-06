import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Customer} from "library-app";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import validate = WebAssembly.validate;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  customer: Customer;
  signupFormGroup: FormGroup;


  inputData = {
    email: '',
    password: '',
    repassword: ''
  };
  private Validators: any;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.customer = new Customer({});
    this.signupFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repassword: new FormControl('', [Validators.required])
    });
  }

  // onInputChange($event: any) {
  //   console.log(this.inputData);
  // }

  signup() {
    // if(this.inputData.email !== '')
    console.log(this.inputData);
    let isValid = true;

    for (let key in this.signupFormGroup.controls) {
      console.log(key);
      console.log(this.signupFormGroup.get(key));
      if (this.signupFormGroup.get(key).invalid) {
        isValid = false;
      }
    }

    if (!isValid) {
      alert('The form is invalid');
    }
    else
    {
      this.router.navigate(['/main/', 'login']);
    }
  }
}
