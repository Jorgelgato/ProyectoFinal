import { Component, OnInit } from '@angular/core';
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
    private operationsService: OperationsService
  ) { }

  ngOnInit(): void {
  } 
  
  ionViewDidEnter(): void {
    this.getAccountList();
  }

  private getAccountList() {
    this.accountService.getAccountList().subscribe(data => {
      this.accounts = data;
    });
  }

  saveAccount(account: Account){
    this.operationsService.account = account;
  }

}
