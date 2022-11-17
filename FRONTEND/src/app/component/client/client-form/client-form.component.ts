import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/model/Client';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {

  formgroup: FormGroup;

  display: boolean = false;
  client: Client = new Client();

  constructor(private formBuilder: FormBuilder, private router: Router) {

    this.formgroup = this.formBuilder.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      address: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      passwordValidation: ['', [Validators.required, Validators.pattern(this.client.password)]]
    });

    this.formgroup.valueChanges.subscribe({
      next: (value) => {
        this.client.name = value.name;
        this.client.firstName = value.firstName;
        this.client.address = value.address;
        this.client.zipCode = value.zipCode;
        this.client.city = value.city;
        this.client.country = value.country;
        this.client.phone = value.phone;
        this.client.email = value.email;
        this.client.gender = value.gender
        this.client.login = value.login;
        this.client.password = value.password;
        this.client.passwordValidation = value.passwordValidation;
      }
    })
  }

  onSubmit() {
    this.changedisplay();
  }

  changedisplay() {
    this.display = !this.display;
  }

  change(event) {
    this.client.gender = event.target.value;
  }

  changeCountry(event) {
    this.client.country = event.target.value;
  }

}
