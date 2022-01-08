import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  formRegister: FormGroup;
  user: User = new User();
  container: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private encrypt: EncryptService,
    private alert: AlertService,
    private datePipe: DatePipe 
  ) {
    this.formLogin = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
    this.formRegister = this.fb.group({
      'idType': new FormControl("", Validators.required),
      'idNumber': new FormControl("", Validators.required),
      'firstName': new FormControl("", Validators.required),
      'lastName': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      'bornDate': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmPassword': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.container = document.querySelector('.container');
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
  
  register() {
    var values = this.formRegister.value
    this.user = values;
    if (this.formRegister.invalid) {
      this.alert.presentAlert('Hay campos vacíos');
      return;
    }
    if (values.password == values.confirmPassword) {
      this.user.password = this.encrypt.encrypt(values.password)
    } else {
      this.alert.presentAlert('Las contraseñas no coinciden');
      return;
    }
    this.user.created = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    this.user.active = true;
    this.saveUser();
  }

  saveUser(){
    this.userService.createUser(this.user).subscribe(data => {
      this.alert.presentSuccessToast("Usuario creado exitósamente")
      this.router.navigate(['/login'])
    }, err => { this.alert.presentErrorToast("Error del servidor") });
  }

  signUp() {
    this.container.classList.add("sign-up-mode");
  }

  signIn() {
    this.container.classList.remove("sign-up-mode");
  }
}
