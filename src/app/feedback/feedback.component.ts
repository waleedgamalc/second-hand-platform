import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UsernameService } from '../username.service';
import { ProductService } from '../services/product.service';
import { ProductsLocationComponent } from '../products-location/products-location.component';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  currentRate = 0;
  stars = [1, 2, 3, 4, 5];
  feedback = '';
  username = '';
  seller='';
  constructor(private firestore: Firestore, private FireStorage: AngularFireStorage , private userservice: UsernameService , private route : ActivatedRoute , private router: Router) {}
  

  rate(rate: number): void {
    this.currentRate = rate;
  }

  async submitFeedback(): Promise<void> {
    // Assuming you have a Firebase collection named 'feedbacks'
    const feedbackCollection = collection(this.firestore, 'feedback');
    const username = this.userservice.username;
    

    // Add the feedback data to Firestore
    await addDoc(feedbackCollection, {
      rating: this.currentRate,
      feedback: this.feedback,
      username: username,
      seller: this.route.snapshot.params['username']
      

    });

    // Reset the form after submission
    this.currentRate = 0;
    this.feedback = '';
    this.router.navigateByUrl('/home')
  }
}