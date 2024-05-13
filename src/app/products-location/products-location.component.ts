import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { UsernameService } from '../username.service';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, updateDoc } from '@angular/fire/firestore'; // Import updateDoc function

@Component({
  selector: 'app-products-location',
  templateUrl: './products-location.component.html',
  styleUrls: ['./products-location.component.css']
})
export class ProductsLocationComponent {
  @Input() product!: Product;

  constructor(private usernameService: UsernameService, private firestore: Firestore) {}

  async buyProduct(): Promise<void> {
    const loggedInUsername = this.usernameService.username;
    const productId = this.product.id; // Assuming Product has an 'id' property
    const productDocRef = doc(this.firestore, 'product', productId);

    if (loggedInUsername && productId) {
      await updateDoc(productDocRef, {
        buyer: loggedInUsername,
        state: 'Sold'
      });
      console.log('Product purchased successfully.');
    } else {
      console.error('Error purchasing product: Invalid username or product ID.');
    }
  }
}
