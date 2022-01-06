import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { Account } from '../account/account';
import { AccountService } from '../account/account.service';
import { AccountType } from '../account/accounttype';
import { OperationsService } from './operations/operations.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  accounts?: Account[]
  types?: AccountType[]

  constructor(
    private accountService: AccountService,
    private operationsService: OperationsService,
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
    this.getAccountList();
  }

  private getAccountList() {
    this.accountService.getUserAccountList().subscribe(data => {
      this.accounts = data;
    });
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
    this.operationsService.account = account;
    this.router.navigate(["inicio/usuario/movimientos"])
  }

  options(event, account: Account) {
    event.stopPropagation();
    this.presentActionSheet(account);
  }

  async presentActionSheet(account: Account) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones de cuenta',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Estado de cuenta',
        icon: 'build',
        handler: () => {
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
      }, {
        text: 'Cancelar cuenta',
        icon: 'trash',
        handler: () => {
          if (account.amount > 0) {
            this.alert.presentAlert("Esta cuenta aún tiene saldo");
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
      }, {
        text: 'Cancelar',
        icon: 'close'
      }]
    });
    await actionSheet.present();
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

}
