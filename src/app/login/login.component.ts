import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { NavigationExtras, Router } from '@angular/router';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  
  username: string = '';
  password: string = '';

  constructor (private firebaseService : FirebaseService, private router:Router, private userService: UsernameService){}

  login() {
    this.firebaseService.login(this.username, this.password)
      .then((success) => {
        if (success) {
          this.userService.username = this.username;
          const navigationExtras: NavigationExtras = {};
          this.router.navigate(['home'], navigationExtras);
          // alert("Login successful");
        } else {
          alert("Login failed");
        }
      })
  }
}
