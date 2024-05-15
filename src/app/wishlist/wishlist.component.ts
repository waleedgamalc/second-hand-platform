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
import { prototype } from 'node:events';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  @Input() product!: Product;
  
  Id_wishlist: string[] = [];
  prodList: Product[] = []

  constructor(
    private productService: ProductService,
    private userService: UsernameService,
    private fireservice:FirebaseService
  ) {}

  ngOnInit() {
    this.productService.productList$.subscribe((products) => {
      // this.productList = products;
      // console.log('Products fetched:', this.productList);
      // this.filterwishlist();
      

      // Fetch feedbacks after products are fetched
      this.fetchwishlists()
    });
  }

  // filterwishlist(){
  //   this.filteredWishList = this.prodList.filter(wish => 
  //     wish.username === this.userService.username
  //   )
  //   console.log("this is the filered wish list",this.filteredWishList)
  //   // console.log("this is tthe secccoond list", this.filteredWishList)
  // }

  fetchwishlists(){
    this.fireservice.getwishlist(this.userService.username).subscribe((wishes:Product[]) =>{

        for(let x of wishes){

          this.prodList.push(x)
         
        }
      
    })
  }
//   product_wishlist() {
//     // Clear the prodList array before adding new products
//     this.fetchwishlists() 
//     this.prodList = [];
    
//     // Loop through each id in Id_wishlist
//     for (const wishId of this.Id_wishlist) {
//       // Find the product with the matching id
//       const product = this.productService.getProductLocationById(wishId);
//       // If product is found, add it to prodList
//       console.log(this.prodList)
//         if (product) {
//             this.prodList.push(product);
//         }
//     }
    
// }



}
