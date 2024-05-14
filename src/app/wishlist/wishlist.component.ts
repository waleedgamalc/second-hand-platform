// import { Component , Input, inject } from '@angular/core';
// import { Product } from '../product';
// import { UsernameService } from '../username.service';
// import { Firestore, collectionData } from '@angular/fire/firestore';
// import { collection, doc, updateDoc } from '@angular/fire/firestore'; // Import updateDoc function
// import { ProductService } from '../services/product.service';
// import { AngularFireStorage} from '@angular/fire/compat/storage'
// import { addDoc,query ,where , getDocs } from 'firebase/firestore';
// import { user } from '@angular/fire/auth';
// import { Observable } from 'rxjs';
// // import { query } from 'express';




// @Component({
//   selector: 'app-wishlist',
//   templateUrl: './wishlist.component.html',
//   styleUrl: './wishlist.component.css'
// })
// export class WishlistComponent {

//   @Input() product!: Product;

//   wishlistDocs : Observable<Product[]> | undefined ;
//   wishlist_products:  Product[] | undefined ;
//   produtlist!: Product[]

//   constructor(private usernameService: UsernameService, private FireStorage : AngularFireStorage , private firestore : Firestore , private fire : AngularFireStorage) {}



//   //   get_wish_docs() {
//   //     this.wishlistDocs = this.FireStorage.collection('wishlist', ref => 
//   //       ref.where('username' , '==' , this.usernameService.username)
//   //     ).valueChanges()
//   //  }
  

//  }


import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { WishlistService } from '../services/wishlist.service';
import { HomeComponent } from '../home/home.component';
import { ProductService } from '../services/product.service';
import { FirebaseService } from '../services/firebase.service';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  @Input() product!: Product;
  
  productList!: Product[];
  filteredWishList: Product[] | undefined;
  prodList: Product[] = []

  constructor(
    private productService: ProductService,
    private userService: UsernameService,
    private fireservice:FirebaseService
  ) {}

  ngOnInit() {
    this.productService.productList$.subscribe((products) => {
      console.log('Products fetched:', products);
      this.productList = products;
      this.filterwishlist();
      

      // Fetch feedbacks after products are fetched
      this.fetchwishlists();
    });
  }

  filterwishlist(){
    this.filteredWishList = this.prodList.filter(wish => 
      wish.username === this.userService.username
    )
    console.log("this is tthe secccoond list", this.filteredWishList)
  }

  fetchwishlists(){
    this.fireservice.getwishlist().subscribe((wishes:Product[]) =>{
      this.fireservice.getProducts().subscribe((prods: Product[]) =>{
        for(let pro of wishes){
          for (const pp of prods) {
            if(pro.id == pp.id){
              if(pro.username === this.userService.username){
              console.log(this.userService.username)
              this.prodList.push(pp);

            }
          }
        }
      }
    })
    })
  }
  // loadWishlistProducts() {
  //   this.wishlistService.getProductsFromWishlist().subscribe(
  //     (products: Product[]) => {
  //       // this.wishlist_products.push(products);
  //       console.log(products)
  //     },
  //     error => {
  //       console.error('Error fetching wishlist products:', error);
  //     }
  //   );
  // }
}
