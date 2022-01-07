import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AccountService } from './account/account.service';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  users?: User[];

  constructor(
    private router: Router,
    private userService: UserService,
    private actionSheetController: ActionSheetController,
    private alert: AlertService,
    private accountService: AccountService,
  ) {

  }

  ngOnInit(): void {

  }

  ionViewDidEnter(): void {
    this.getUserList();
  }

  private getUserList() {
    this.userService.getUserList().subscribe(data => {
      this.users = data;
    });
  }

  saveUser(user: User){
    this.userService.user = user;
    this.router.navigate([this.router.url + "/cuentas"])
  }

  options(event, user: User) {
    event.stopPropagation();
    this.presentActionSheet(user);
  }

  async presentActionSheet(user: User) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones de usuario',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Modificar cliente',
        icon: 'build',
        handler: () => {
          this.userService.user = user;
          this.router.navigate([this.router.url + "/modificar"])
        }
      }, {
        text: 'Eliminar cliente',
        icon: 'trash',
        handler: () => {
          this.delete(user);
        }
      }, {
        text: 'Cancelar',
        icon: 'close'
      }]
    });
    await actionSheet.present();
  }

  delete(user: User) {
    this.accountService.getUserAccountList(user.id).subscribe(data => {
      if (data.length > 0) {
        this.alert.presentAlert("Tiene productos vigentes");
      } else {
        this.alert.presentAlertConfirm('¿Seguro que desea eliminar el usuario?').then((res) => {
          if (res.data) {
            this.deleteUser(user);
          }
        });
      }
    }, err => { this.alert.presentErrorToast("Error del servidor") });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(data => {
      this.alert.presentSuccessToast("Usuario eliminado exitosamente");
      this.reload();
    }, err => { this.alert.presentErrorToast("Error del servidor") });
  }

  reload(){
    window.location.reload();
  }
}
