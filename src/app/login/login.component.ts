import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  invalidUsernamePwd = false;
  username = new FormControl('');
  password = new FormControl('');
  options: string[] = ['Mázli', 'Pistike', 'Sárika'];

  constructor(private router: Router, private loginService: LoginService) { }

  login() {
    const isValidUser = true; //this.loginService.checkUser(this.username.value, this.password.value);
    if (isValidUser) {
      this.invalidUsernamePwd = false;
      this.router.navigate(["photos"]);
    } else {
      this.invalidUsernamePwd = true;
    }
  }
}