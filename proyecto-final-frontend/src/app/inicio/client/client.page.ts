import { Component, OnInit } from '@angular/core';
import { Account } from '../account/account';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  accounts: Account[]/* = [{ id: 1, type: 0, number: "820833931420", created: "31/12/2021", status: 0, amount: 1600000 },
  { id: 1, type: 0, number: "821202649628", created: "31/12/2021", status: 0, amount: 1200000 }]*/

  constructor(private accountService: AccountService) { }

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

}
