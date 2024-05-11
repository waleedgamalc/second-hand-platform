import { Component , Input } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-products-location',
  templateUrl: './products-location.component.html',
  styleUrl: './products-location.component.css'
})
export class ProductsLocationComponent {

  @Input() product!: Product;
}
