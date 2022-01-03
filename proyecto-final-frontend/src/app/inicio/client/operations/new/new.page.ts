import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
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

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private operationsService: OperationsService,
    private router: Router,
    private alert: AlertService
  ) {
    this.formOperation = this.fb.group({
      'operationType': new FormControl("", Validators.required),
      'description': new FormControl("", Validators.required),
      'amount': new FormControl("", Validators.required),
      'credit': new FormControl("", Validators.required)
    }) }

  ngOnInit() {
    if (!this.operationsService.account){
      this.router.navigate(['/inicio'])
    }
  }

  newOperation(){
    if (this.formOperation.invalid) {
      this.alert.presentAlert('Hay campos vacíos');
      return;
    }
    var values = this.formOperation.value
    var currDate = new Date();
    this.operation = values;
    this.operation.idAccount = this.operationsService.account.id;
    this.operation.date = this.datePipe.transform(currDate, 'yyyy-MM-dd hh:mm:ss');

  }

  createOperation(){
    this.operationsService.createOperation(this.operation).subscribe( data => {
      this.alert.presentSuccessToast("Movimiento creado exitósamente");
      this.router.navigate(['/inicio/cliente/movimientos']);
    }, err => { this.alert.presentErrorToast("Error del servidor") });
  }

}
