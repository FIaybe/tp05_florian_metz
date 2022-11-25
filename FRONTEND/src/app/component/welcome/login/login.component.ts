import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';

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

  constructor(private formBuilder: FormBuilder, private service: DataService) {
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
    this.service.login(this.login, this.password).subscribe({
      next: () => {
        localStorage.setItem('connected', 'true')
      }, error: () => {
        this.hint = true;
      }
    });
  }
}
