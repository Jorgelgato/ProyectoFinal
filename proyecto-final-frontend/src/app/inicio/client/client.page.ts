import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { Account } from '../account/account';
import { AccountService } from '../account/account.service';
import { OperationsService } from './operations/operations.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  accounts: Account[]

  constructor(
    private accountService: AccountService,
    private operationsService: OperationsService,
    private alert: AlertService,
    private router: Router,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit(): void {
  } 
  
  ionViewDidEnter(): void {
    this.getAccountList();
  }

  private getAccountList() {
    this.accountService.getClientAccountList().subscribe(data => {
      this.accounts = data;
    });
  }

  saveAccount(account: Account){
    this.operationsService.account = account;
    this.router.navigate(["inicio/cliente/movimientos"])
  }

}
