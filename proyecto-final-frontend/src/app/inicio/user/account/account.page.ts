import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { Account } from './account';
import { AlertService } from 'src/app/services/alert.service';
import { AccountType } from './accounttype';
import { OperationsService } from './operations/operations.service';
import { ActionSheetController } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  
  accounts?: Account[]
  @ViewChildren('accountCard') accountCards;
  types?: AccountType[]

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private alert: AlertService,
    private router: Router,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit(): void {
  } 

  ionViewWillEnter(): void {
    this.getAccountTypes();
  }

  ionViewDidEnter(): void {
    if(!this.userService.user){
      this.router.navigate(['/inicio'])
    } else {      
      this.accountService.getUserAccountList(this.userService.user.id).subscribe(data => {
        this.accounts = data;
      });
    }
  }

  private getAccountTypes() {
    this.accountService.getAccountTypes().subscribe(data => {
      this.types = data;
    });
  }

  typeToString(type: number): string {
    for (let types of this.types) {
      if (type == types.id) {
        return types.type;
      }
    }
  }

  saveAccount(account: Account){
    this.accountService.account = account;
    this.router.navigate([this.router.url + "/movimientos"])
  }

  statusAccount(account: Account){
    if (account.status) {
      this.alert.presentAlertConfirm('Esta cuenta está <ion-text color="danger">inactiva</ion-text>.\n ¿Desea activarla?').then((res) => {
        if (res.data) {
          this.accountService.toggleAccount(account).subscribe(data => {
            this.alert.presentSuccessToast("Cuenta activada exitósamente");
          }, err => { this.alert.presentErrorToast("Error del servidor") });
        }
      })
    } else {
      this.alert.presentAlertConfirm('Esta cuenta está <ion-text color="success">activa</ion-text>.\n ¿Desea desactivarla?').then((res) => {
        if (res.data) {
          this.accountService.toggleAccount(account).subscribe(data => {
            this.alert.presentSuccessToast("Cuenta desactivada exitósamente");
          }, err => { this.alert.presentErrorToast("Error del servidor") });
        }
      })           
    }
  }

  cancelAccount(account: Account){
    if (account.amount > 0) {
      this.alert.presentAlert("Esta cuenta aún tiene saldo");
    } else if (account.amount < 0) {
      this.alert.presentAlert("Esta cuenta tiene saldo negativo");            
    } else {
      this.alert.presentAlertConfirm('¿Seguro que desea cancelar esta cuenta?').then((res) => {
        if (res.data) {
          this.accountService.cancelAccount(account).subscribe(data => {
            this.alert.presentSuccessToast("Cuenta cancelada exitósamente");
            this.reload();
          }, err => { this.alert.presentErrorToast("Error del servidor") });
        }
      })
    }
  }

  reload() {
    window.location.reload();
    /*
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
    */
  }
  
  toggleAccordian(index) {
    var element = this.accountCards.toArray()[index].el.firstChild;
    element.classList.toggle("active");
    if (this.accounts[index].collapsed) {
      this.accounts[index].collapsed = false;
    } else {
      this.accounts[index].collapsed = true;
    }
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
}
