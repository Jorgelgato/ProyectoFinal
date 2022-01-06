import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../inicio/user/user';
import { UserService } from '../inicio/user/user.service';
import { AlertService } from '../services/alert.service';
import { EncryptService } from '../services/encrypt.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  user: User = new User();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private encrypt: EncryptService,
    private alert: AlertService
  ) {
    this.formLogin = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  login() {
    if (this.formLogin.invalid) {
      this.alert.presentAlert('Hay campos vacíos');
      return;
    }
    var values = this.formLogin.value
    this.user.email = values.email;
    this.userService.loginUser(this.user).subscribe(data => {
      if (this.encrypt.compare(values.password, data.password)) {
        localStorage.setItem('logged', '1')
        localStorage.setItem('id', data.id);
        this.router.navigate(['/inicio'])
      } else {
        this.alert.presentErrorToast("Contraseña incorrecta");
      }
    }, err => {
      this.alert.presentErrorToast("Usuario no existe");
    });
  }

}
