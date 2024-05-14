import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../services/product.service';
import { UsernameService } from '../username.service';
import { Feedback } from '../feedback';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  productList!: Product[];
  filteredProductList: Product[] | undefined;
  otherFilteredProductList: Product[] | undefined;
  feedbackList: Feedback[] = [];

  constructor(
    private productService: ProductService,
    private userService: UsernameService,
    private fireservice:FirebaseService
  ) {}

  username_h1: string = this.userService.username;

  ngOnInit() {
    this.productService.productList$.subscribe((products) => {
      console.log('Products fetched:', products);
      this.productList = products;
      this.filterResults('');
      this.filterByUsername();
      this.filterForOtherSection();

      // Fetch feedbacks after products are fetched
      this.fetchFeedbacks();
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredProductList = this.productList.filter(product =>
        product.buyer === this.userService.username && product.state === 'Sold'
      );
      return;
    }

    this.filteredProductList = this.productList.filter(
      product =>
        product.name.toLowerCase().includes(text.toLowerCase()) &&
        product.buyer === this.userService.username &&
        product.state === 'Sold'
    );
  }

  filterByUsername() {
    this.otherFilteredProductList = this.productList.filter(product =>
      product.username === this.userService.username
    );
  }

  filterForOtherSection() {
    // Add additional filtering logic for the other section if needed
  }

  fetchFeedbacks() {
    this.fireservice.getFeedbacks().subscribe((feedbacks: Feedback[]) => {
      console.log('Feedbacks fetched:', feedbacks);
      this.feedbackList = feedbacks;
    });
  }
}
