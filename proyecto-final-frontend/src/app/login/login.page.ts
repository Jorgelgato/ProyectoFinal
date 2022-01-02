import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { Client } from '../client/client';
import { ClientService } from '../client/client.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  client: Client = new Client();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    public alert: AlertComponent
  ) {
    this.formLogin = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  login() {

    var values = this.formLogin.value
    this.client = values;

    if (this.formLogin.invalid) {
      this.alert.presentAlert('Hay campos vacíos');
      return;
    }

    //console.log(this.client)
    this.clientService.loginClient(this.client).subscribe(data => {
      localStorage.setItem('logged', '1')
      localStorage.setItem('id', data.id);
      this.router.navigate(['/inicio'])
    }, err => {
      //console.log(err);
      this.alert.presentErrorToast("Usuario o contraseña incorrecto")
    });
  }

}
