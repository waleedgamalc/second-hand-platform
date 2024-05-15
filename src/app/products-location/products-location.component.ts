import { Component, Input, inject } from '@angular/core';
import { Product } from '../product';
import { UsernameService } from '../username.service';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, updateDoc } from '@angular/fire/firestore'; // Import updateDoc function
import { addDoc } from 'firebase/firestore';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { DocumentReference } from '@angular/fire/firestore';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-location',
  templateUrl: './products-location.component.html',
  styleUrls: ['./products-location.component.css']
})
export class ProductsLocationComponent {
  @Input() product!: Product;

  constructor(private usernameService: UsernameService, private firestore: Firestore , private productService : ProductService) {}
  username_not_buy : string = this.usernameService.username;

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
  firestor : Firestore = inject(Firestore);
  
  add_to_wishlist (): void {
  const username = this.usernameService.username;
  const acollection = collection(this.firestor , 'wishlist')
  addDoc(acollection,{
    id : this.product.id,
    username : username,
    name : this.product.name,
    price: this.product.price,
    description: this.product.description,
    state: this.product.state,
    photo: this.product.photo,
    buyer: this.product.buyer,
  })
}

}
