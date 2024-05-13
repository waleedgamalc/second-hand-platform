import { Component, ViewChild, inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LoginComponent } from '../login/login.component';
import { UsernameService } from '../username.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-register-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private FirebaseService: FirebaseService,
    private FireStorage: AngularFireStorage,
    private userService: UsernameService,
    private router: Router // Inject Router
  ) {}

  @ViewChild('registerForm') register: any;
  firestore: Firestore = inject(Firestore);

  saveData(): void {
    const username = this.userService.username;
    const acollection = collection(this.firestore, 'users');
    addDoc(acollection, {
      username: this.register.value.username,
      email: this.register.value.email,
      password: this.register.value.password,
    });
  }

  onSubmit() {
    // Check if any field is blank
    if (
      !this.register.value.username ||
      !this.register.value.email ||
      !this.register.value.password
    ) {
      alert('Please fill in all fields');
      return; // Stop execution if any field is blank
    }

    // Handle form submission logic here
    this.saveData();
    alert(this.register.value.username);

    // Redirect to [/]
    this.router.navigateByUrl('/');
  }
}
