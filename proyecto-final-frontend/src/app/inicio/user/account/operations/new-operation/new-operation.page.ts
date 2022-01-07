import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/inicio/user/account/account';
import { AccountService } from 'src/app/inicio/user/account/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { User } from '../../../user';
import { Operation } from '../operation';
import { OperationsService } from '../operations.service';

@Component({
  selector: 'app-new',
  templateUrl: './new-operation.page.html',
  styleUrls: ['./new-operation.page.scss'],
})
export class NewOperationPage implements OnInit {

  formOperation: FormGroup;
  operation: Operation;
  user: User;
  account?: Account = new Account();

  constructor(
    public accountService: AccountService,
    private operationsService: OperationsService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private alert: AlertService
  ) {
    this.formOperation = this.fb.group({
      'operationType': new FormControl("", Validators.required),
      'description': new FormControl("", Validators.required),
      'amount': new FormControl("", Validators.required),
      'idDestination': new FormControl(),
    })
  }

  ngOnInit() {
    if (!this.accountService.account) {
      this.router.navigate(['/inicio'])
    }
  }

  updateForm() {
    if (this.formOperation.value.operationType == 2) {
      this.formOperation.get('idDestination').setValidators(Validators.required);
    } else {
      this.formOperation.get('idDestination').clearValidators();
    }
    this.formOperation.controls['idDestination'].updateValueAndValidity()
  }

  newOperation() {
    if (this.formOperation.invalid) {
      this.alert.presentAlert('Hay campos vacíos');
      return;
    }
    var values = this.formOperation.value
    this.operation = values;
    this.operation.idAccount = this.accountService.account.id;
    this.operation.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');

    switch (this.operation.operationType) {
      case 0:
        this.deposit();
        break;
      case 1:
        this.withdrawal();
        break;
      case 2:
        this.transfer();
        break;
    }
  }

  createOperation() {
    this.operationsService.createOperation(this.operation).subscribe(data => {
      this.router.navigate(['inicio/usuarios/cuentas/movimientos']);
    }, err => { this.alert.presentErrorToast("Error del servidor") });
  }

  deposit() {
    this.accountService.accountAddAmount(this.accountService.account.id, this.operation.amount).subscribe(data => {
      this.operation.credit = 1;
      this.createOperation()
      this.alert.presentSuccessToast("Depósito realizado")
    }, err => {
      this.alert.presentErrorToast("Error del servidor")
    });
  }

  withdrawal() {
    if (this.accountService.account.amount - this.operation.amount < 0) {
      this.alert.presentErrorToast("Saldo insuficiente");
      return;
    }
    this.accountService.accountSubtractAmount(this.accountService.account.id, this.operation.amount).subscribe(data => {
      this.operation.credit = 0;
      this.createOperation();
      this.alert.presentSuccessToast("Retiro realizado");
    }, err => {
      this.alert.presentErrorToast("Error del servidor");
    });
  }

  transfer() {
    if (this.accountService.account.amount - this.operation.amount < 0) {
      this.alert.presentErrorToast("Saldo insuficiente");
      return;
    }
    this.accountService.getAccount(this.operation.idDestination).subscribe(data => {
      if (data.status == 2) {
        this.alert.presentErrorToast("La cuenta destino no existe");
      } else {
        this.accountService.accountSubtractAmount(this.accountService.account.id, this.operation.amount).subscribe(data => {
          this.operation.credit = 0;
          this.createOperation();
          this.accountService.accountAddAmount(this.operation.idDestination, this.operation.amount).subscribe(data => {
            this.operation.credit = 1;
            this.operation.idAccount = this.operation.idDestination;
            this.createOperation();
            this.alert.presentSuccessToast("Transferencia ralizada");
          }, err => {
            this.alert.presentErrorToast("Error del servidor");
          });
        }, err => {
          this.alert.presentErrorToast("Error del servidor");
        });
      }
    }, err => {
      this.alert.presentErrorToast("La cuenta destino no existe");
    });
  }

}
