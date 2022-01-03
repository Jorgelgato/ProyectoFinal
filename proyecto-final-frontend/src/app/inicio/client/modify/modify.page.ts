import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { EncryptService } from 'src/app/services/encrypt.service';
import { AccountService } from '../../account/account.service';
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
    private encrypt: EncryptService,
    private fb: FormBuilder,
    private alert: AlertService,
    private accountService: AccountService,
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
    if (this.formModify.invalid) {
      this.alert.presentAlert('Ingrese su contraseña actual');
      return;
    }
    var values = this.formModify.value
    if (!this.encrypt.compare(values.oldPassword, this.client.password)) {
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
    if (values.password && values.confirmPassword && (values.password == values.confirmPassword)) {
        this.client.password = this.encrypt.encrypt(values.password)
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

  delete() {
    this.accountService.getClientAccountList().subscribe(data => {
      console.log(data)
      if (data.length > 0) {
        this.alert.presentAlert("Tiene productos vigentes");
        return;
      }
    });

    this.alert.presentAlertConfirm('¿Seguro que desea eliminar el usuario?').then((res) => {
      if (res.data) {
        this.deleteClient();
      }
    })
  }

  deleteClient() {
    this.clientService.deleteClient(this.client).subscribe(data => {
      this.alert.presentSuccessToast("Cliente eliminado exitosamente")
      localStorage.removeItem('logged')
      localStorage.removeItem('id')
      this.router.navigate(['/login'])
    }, err => { this.alert.presentErrorToast("Error del servidor") });
  }
}
