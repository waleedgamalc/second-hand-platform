import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
    
    productId! : string;
    Product : Product | undefined;
    constructor(route : ActivatedRoute , productService : ProductService) {

      this.productId = (route.snapshot.params['id']);
      this.Product = productService.getProductLocationById(this.productId)
    }
}
