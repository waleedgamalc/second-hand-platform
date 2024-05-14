import { Component , Input, inject } from '@angular/core';
import { Product } from '../product';
import { UsernameService } from '../username.service';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, doc, updateDoc } from '@angular/fire/firestore'; // Import updateDoc function
import { ProductService } from '../services/product.service';
import { AngularFireStorage} from '@angular/fire/compat/storage'
import { addDoc,query ,where , getDocs } from 'firebase/firestore';
import { user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
// import { query } from 'express';




@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  @Input() product!: Product;

  constructor(private usernameService: UsernameService, private FireStorage : AngularFireStorage , private firestore : Firestore) {}

  produtlist!: Product[]
  wishlist_products:  Product[] | undefined ;

  async wishlist_filter() {

    const q = query(collection(this.firestore , "wishlist") , where('username' ,'==' , this.usernameService.username));
    const wishquery = await getDocs(q)
 
    wishquery.forEach((document) => {
     console.log(document.id , "=>" , document.data())
    })
   }
  

 }
