import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  encrypt(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  compare(password: string, password2: string) {
    return bcrypt.compareSync(password, password2);
  }
}
