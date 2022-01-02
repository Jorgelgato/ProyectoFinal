import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { AccountService } from '../account/account.service';
import { Account } from './account';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  formAccount: FormGroup;
  account: Account = new Account();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    public alert: AlertComponent
  ) {
    this.formAccount = this.fb.group({
      'type': new FormControl("", Validators.required),
      'number': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  createAccount() {
    var values = this.formAccount.value


    if (this.formAccount.invalid) {
      this.alert.presentAlert('Hay campos vacíos');
      return;
    }
    this.account = values;
    this.account.idClient = +localStorage.getItem('id');
    var today = new Date();
    this.account.created = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    this.account.status = 0;
    this.account.amount = 0;
    console.log(this.account)
    this.saveAccount();
  }

  saveAccount(){
    this.accountService.createAccount(this.account).subscribe(data => {
      console.log(data);
      this.alert.presentSuccessToast("Cuenta creada exitósamente")
      this.router.navigate(['/inicio/cliente'])
    }, err => { this.alert.presentErrorToast("Error del servidor") });
  }
}
