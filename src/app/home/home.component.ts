import { Component } from '@angular/core';
import { ProductsLocationComponent } from '../products-location/products-location.component';
import { Product } from '../product';
import { ProductService } from '../services/product.service';
import { FirebaseService } from '../services/firebase.service';
import { WishlistComponent } from '../wishlist/wishlist.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  productList!: Product[];
  filteredProductList : Product[] | undefined;

  constructor(private productService:ProductService) {
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



