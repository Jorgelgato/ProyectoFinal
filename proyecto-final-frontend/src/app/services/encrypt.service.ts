import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  encrypt(password: string) {
    const salt = "$2a$10$LRzl4OGEb4Xaaot9sMSslu";
    return bcrypt.hashSync(password, salt);
  }

  compare(password: string, password2: string) {
    return bcrypt.compareSync(password, password2);
  }

}
