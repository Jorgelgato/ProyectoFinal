import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
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
  @ViewChildren('userCard') userCards;

  constructor(
    private router: Router,
    private userService: UserService,
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

  saveUser(user: User) {
    this.userService.user = user;
    this.router.navigate([this.router.url + "/cuentas"])
  }

  modifyUser(user: User) {
    this.userService.user = user;
    this.router.navigate([this.router.url + "/modificar"])
  }

  deleteUser(user: User) {
    this.accountService.getUserAccountList(user.id).subscribe(data => {
      if (data.length > 0) {
        this.alert.presentAlert("Tiene productos vigentes");
      } else {
        this.alert.presentAlertConfirm('¿Seguro que desea eliminar el usuario?').then((res) => {
          if (res.data) {
            this.userService.deleteUser(user).subscribe(data => {
              this.alert.presentSuccessToast("Usuario eliminado exitosamente");
              this.reload();
            }, err => { this.alert.presentErrorToast("Error del servidor") });
          }
        });
      }
    }, err => { this.alert.presentErrorToast("Error del servidor") });
  }

  reload() {
    window.location.reload();
  }

  toggleAccordian(index) {
    var element = this.userCards.toArray()[index].el.firstChild;
    element.classList.toggle("active");
    if (this.users[index].collapsed) {
      this.users[index].collapsed = false;
    } else {
      this.users[index].collapsed = true;
    }
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

}
