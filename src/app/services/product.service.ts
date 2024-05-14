import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product';
import { FirebaseService } from './firebase.service';
import { UsernameService } from '../username.service';
import { Feedback } from '../feedback'; // Import the Feedback interface

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  productList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  feedbackList$: BehaviorSubject<Feedback[]> = new BehaviorSubject<Feedback[]>([]); // Add feedbackList$

  constructor(
    private firebaseService: FirebaseService,
    private userService: UsernameService
  ) {
    this.refreshProducts();
    this.refreshFeedbacks(); // Fetch feedbacks when ProductService initializes
  }

  refreshProducts() {
    this.firebaseService.getProducts().subscribe((res) => {
      this.productList$.next(res as Product[]);
    });
  }

  refreshFeedbacks() {
    this.firebaseService.getFeedbacks().subscribe((res) => {
      this.feedbackList$.next(res as Feedback[]);
    });
  }

  getProductLocationById(id: string): Product | undefined {
    return this.productList$.value.find(product => product.id === id);
  }
}
