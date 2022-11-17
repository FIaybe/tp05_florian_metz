import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formgroup: FormGroup;
  hint = false;

  login = '';
  password = '';

  constructor(private formBuilder: FormBuilder) {
    this.formgroup = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.formgroup.valueChanges.subscribe({
      next: (value) => {
        this.login = value.login;
        this.password = value.password;
      }
    });
  }

  onSubmit() {
    if (this.login != 'admin' || this.password != 'admin') {
      this.hint = true
    }
    else {
      console.log('ok');
      this.hint = false

    }
  }
}
