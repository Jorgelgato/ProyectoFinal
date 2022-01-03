import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/inicio/account/account';
import { AccountService } from 'src/app/inicio/account/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { Client } from '../../client';
import { ClientService } from '../../client.service';
import { Operation } from '../operation';
import { OperationsService } from '../operations.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  formOperation: FormGroup;
  operation: Operation;
  client: Client;
  account: Account = new Account();

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private operationsService: OperationsService,
    private accountService: AccountService,
    private router: Router,
    private alert: AlertService
  ) {
    this.formOperation = this.fb.group({
      'operationType': new FormControl("", Validators.required),
      'description': new FormControl("", Validators.required),
      'amount': new FormControl("", Validators.required),
      'credit': new FormControl("", Validators.required),
      'idDestination': new FormControl(),
    })
  }

  ngOnInit() {
    if (!this.operationsService.account) {
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
    var currDate = new Date();
    this.operation = values;
    this.operation.idAccount = this.operationsService.account.id;
    this.operation.date = this.datePipe.transform(currDate, 'yyyy-MM-dd hh:mm:ss');

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
      this.router.navigate(['/inicio/cliente/movimientos']);
    }, err => { this.alert.presentErrorToast("Error del servidor") });

  }

  deposit() {
    this.accountService.accountAddAmount(this.operationsService.account.id, this.operation.amount).subscribe(data => {
      this.alert.presentSuccessToast("Depósito realizado")
      this.createOperation()
    }, err => {
      this.alert.presentErrorToast("Error del servidor")
    });
  }

  withdrawal() {
    if (this.operationsService.account.amount - this.operation.amount < 0) {
      this.alert.presentErrorToast("Saldo insuficiente");
      return;
    }
    this.accountService.accountSubtractAmount(this.operationsService.account.id, this.operation.amount).subscribe(data => {
      this.alert.presentSuccessToast("Retiro realizado");
      this.createOperation();
    }, err => {
      this.alert.presentErrorToast("Error del servidor");
    });
  }

  transfer() {
    if (this.operationsService.account.amount - this.operation.amount < 0) {
      this.alert.presentErrorToast("Saldo insuficiente");
      return;
    }
    this.accountService.accountSubtractAmount(this.operationsService.account.id, this.operation.amount).subscribe(data => {
      this.createOperation();
      this.accountService.accountAddAmount(this.operation.idDestination, this.operation.amount).subscribe(data => {
        this.createOperation();
      }, err => {
        this.alert.presentErrorToast("Error del servidor");
      });
    }, err => {
      this.alert.presentErrorToast("Error del servidor");
    });
  }

}
