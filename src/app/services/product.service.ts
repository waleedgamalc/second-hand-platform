import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product';
import { FirebaseService } from './firebase.service';
import { UsernameService } from '../username.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  productList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  
  constructor(private firebaseService: FirebaseService , private userservice: UsernameService) {
    this.refreshProducts();
  }

  refreshProducts() {
    this.firebaseService.getProducts().subscribe((res) => {
      this.productList$.next(res as Product[]);
    });
  }

  getProductLocationById(id: string): Product | undefined {
    return this.productList$.value.find(product => product.id === id);
  }
}
