import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UsernameService } from '../username.service';
import { ProductService } from './product.service';
import { Product } from '../product';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  @Input() product!: Product;
  
  private wishlistCollection: AngularFirestoreCollection<any>;

  constructor(
    private firestore: AngularFirestore,
    private usernservice: UsernameService
  ) {
    this.wishlistCollection = this.firestore.collection('wishlist');
  }

  getProductsFromWishlist(): Observable<Product[]> {
    return this.wishlistCollection
      .doc("yassin") // Assuming username is the document ID for each user's wishlist
      .collection('products')
      .valueChanges({ idField: 'id' })
      .pipe(
        map((products: any[]) => {
          // Assuming each product document in the wishlist has a 'productId' field
          return products.map(product => ({ id: product.id, ...product }));
        })
      );
  }
}

