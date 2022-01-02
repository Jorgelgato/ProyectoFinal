import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/alert/alert.component';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {

  client: Client = new Client();

  formModify: FormGroup;

  constructor(
    private clientService: ClientService,
    public fb: FormBuilder,
    public alert: AlertComponent,
    private router: Router
  ) {
    this.formModify = this.fb.group({
      'idType': new FormControl(""),
      'idNumber': new FormControl(""),
      'firstName': new FormControl(""),
      'lastName': new FormControl(""),
      'email': new FormControl(""),
      'bornDate': new FormControl(""),
      'password': new FormControl(""),
      'confirmPassword': new FormControl(""),
      'oldPassword': new FormControl("", Validators.required),
    })
  }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    this.getClient();
  }

  modify() {
    var values = this.formModify.value

    if (this.formModify.invalid) {
      this.alert.presentAlert('Ingrese su contraseña actual');
      return;
    }
    if (values.oldPassword != this.client.password) {
      this.alert.presentAlert('Contraseña incorrecta');
      return;
    }

    if (values.idType) {
      this.client.idType = values.idType
    }
    if (values.idNumber) {
      this.client.idNumber = values.idNumber
    }
    if (values.firstName) {
      this.client.firstName = values.firstName
    }
    if (values.lastName) {
      this.client.lastName = values.lastName
    }
    if (values.email) {
      this.client.email = values.email
    }
    if (values.bornDate) {
      this.client.bornDate = values.bornDate
    }
    if (values.password && values.confirmPassword) {
      if (values.password == values.confirmPassword) {
        this.client.password = values.password
      } else {
        this.alert.presentAlert('Las contraseñas no coinciden');
        return;
      }
    } else {
      this.alert.presentAlert('Las contraseñas no coinciden');
      return;
    }
    this.updateClient();
  }

  getClient() {
    this.clientService.getClient().subscribe(data => {
      this.client = data;
    });
  }

  updateClient() {
    this.clientService.updateClient(this.client).subscribe(data => {
      this.alert.presentSuccessToast("Cliente modificado exitosamente")
      this.router.navigate(['/inicio'])
    }, err => { this.alert.presentErrorToast("Error del servidor") });
  }

}
