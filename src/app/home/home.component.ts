import { Component, Input } from '@angular/core';
import { ProductsLocationComponent } from '../products-location/products-location.component';
import { Product } from '../product';
import { ProductService } from '../services/product.service';
import { FirebaseService } from '../services/firebase.service';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-home',
 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() product!: Product;
  productList!: Product[];
  filteredProductList : Product[] | undefined;
  

  constructor(private productService:ProductService , private wishlistService: WishlistService ) {
    this.productService.productList$.subscribe((products) => {
    this.productList = products;
    this.filteredProductList = products;
    }); }

    filterResults(text: string) {
      if (!text) {
        this.filteredProductList = this.productList;
        return;
      }
    
      this.filteredProductList = this.productList.filter(
        product => 
        product?.name.toLowerCase().includes(text.toLowerCase())
      );
    }

    
}



