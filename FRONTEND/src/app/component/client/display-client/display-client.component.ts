import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from 'src/app/core/model/Client';

@Component({
  selector: 'app-display-client',
  templateUrl: './display-client.component.html',
  styleUrls: ['./display-client.component.scss']
})
export class DisplayClientComponent implements OnInit {

  @Output() return = new EventEmitter<boolean>();
  @Input() client: Client;
  clientIsCorrect: boolean;


  constructor() { }

  ngOnInit(): void {
    this.clientIsCorrect = this.verifyClientProperties();
  }

  returnMethod() {
    this.return.emit(false);
  }

  verifyClientProperties() {
    if (!this.client.name || !this.client.firstName || !this.client.address || !this.client.zipCode ||
      !this.client.city || !this.client.country || !this.client.phone || !this.client.email || !this.client || !this.client.login
      || !this.client.password || !this.client.passwordValidation) {
      return false;
    }
    return true;

  }

}
