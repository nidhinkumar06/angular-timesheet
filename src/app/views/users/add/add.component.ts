import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Role } from '../../../models';

@Component({
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  buttonDisabled = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobileno: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      address: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    this.buttonDisabled = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    this.saveDataToFirebase(this.userForm.value);
    console.log('on submit got called', this.userForm.value);
  }

  saveDataToFirebase(values: any) {
    const data: User = {
      name: values.name,
      email: values.email,
      mobileno: values.mobileno,
      city: values.city,
      address: values.address,
      role: Role.User
    };
    setTimeout(() => {
      this.userService.addUser(data);
      this.submitted = false;
      this.buttonDisabled = false;
      this.router.navigateByUrl('/users');
    }, 2000);
  }

}
