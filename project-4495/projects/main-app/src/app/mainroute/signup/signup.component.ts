import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Customer, FirebaseDataService} from 'library-app';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  customer: Customer;
  signupFormGroup: FormGroup;


  constructor(private router: Router, private _FirebaseDataService: FirebaseDataService) {
  }

  ngOnInit(): void {
    this.signupFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'))]),
      repassword: new FormControl('', [Validators.required]),
      fullname: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$'))]),
      phone: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^\\D?(\\d{3})\\D?\\D?(\\d{3})\\D?(\\d{4})$'))]),
      address: new FormControl('', [Validators.required])
    });
  }

  // onInputChange($event: any) {
  //   console.log(this.inputData);
  // }

  signup() {
    console.log(this.customer);
    console.log(this.signupFormGroup);
    // if(this.inputData.email !== '')
    let isValid = true;

    for (let key in this.signupFormGroup.controls) {
      if (this.signupFormGroup.get(key).invalid) {
        isValid = false;
      }
    }

    if (!isValid) {
      alert('The form is invalid');
    } else {
      this.customer = new Customer({});
      this.customer.email = this.signupFormGroup.get('email').value;
      this.customer.address = this.signupFormGroup.get('address').value;
      this.customer.name = this.signupFormGroup.get('fullname').value;
      this.customer.password = this.signupFormGroup.get('password').value;
      this.customer.phone_no = this.signupFormGroup.get('phone').value;
      console.log(this.customer);
      this._FirebaseDataService.signUp(this.customer)
        .then((cus) => {
          console.log('cus = ' + cus);
          if (cus === true) {
            this.router.navigate(['/main/', 'login']);
          } else {
            window.alert('Error occurred');
          }
        });
      // this.router.navigate(['/main/', 'login']);
    }
  }
}
