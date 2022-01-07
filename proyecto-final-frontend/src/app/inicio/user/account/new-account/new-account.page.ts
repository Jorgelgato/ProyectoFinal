import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from '../../user.service';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.page.html',
  styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {

  formAccount: FormGroup;
  account: Account = new Account();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private userService: UserService,
    private alert: AlertService
  ) {
    this.formAccount = this.fb.group({
      'type': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  createAccount() {    
    if (this.formAccount.invalid) {
      this.alert.presentAlert('Hay campos vacíos');
      return;
    }
    var values = this.formAccount.value
    this.account = values;
    this.account.idClient = this.userService.user.id;
    var today = new Date();
    this.account.created = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    this.account.status = 0;
    this.account.amount = 0;
    this.saveAccount();
  }

  saveAccount(){
    this.accountService.createAccount(this.account).subscribe(data => {
      this.alert.presentSuccessToast("Cuenta creada exitósamente")
      this.router.navigate(['/inicio/usuarios/cuentas'])
    }, err => { this.alert.presentErrorToast("Error del servidor") });
  }

}
