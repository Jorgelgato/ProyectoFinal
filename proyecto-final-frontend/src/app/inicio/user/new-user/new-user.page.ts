import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { EncryptService } from 'src/app/services/encrypt.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {

  user?: User = new User();

  formRegister: FormGroup;

  constructor(
    private userService: UserService, 
    private fb: FormBuilder, 
    private alert: AlertService,
    private encrypt: EncryptService,
    private router: Router,
    private datePipe: DatePipe 
    ) {
    this.formRegister = this.fb.group({
      'idType': new FormControl("", Validators.required),
      'idNumber': new FormControl("", Validators.required),
      'firstName': new FormControl("", Validators.required),
      'lastName': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      'bornDate': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmPassword': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
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
      this.router.navigate(['/inicio/'])
    }, err => { this.alert.presentErrorToast("Error del servidor") });
  }
}
