import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { getFirestore,addDoc, DocumentReference, query, where, getDocs } from 'firebase/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Feedback } from '../feedback';

interface UserData {
  username: string;
  password: string;
  // Add other fields if necessary
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
 
  constructor(private firestore: Firestore , private AngularfireStore: AngularFirestore) { }
  collectionRef = this.AngularfireStore.collection('users');

 //Login
  login(username: string, password: string): Promise<{ success: boolean, userId?: string }> {
    return new Promise<{ success: boolean, userId?: string }>((resolve, reject) => {
      this.collectionRef.get() 
        .subscribe(snapshot => {
          let found = false;
          snapshot.forEach(doc => {
            const userData = doc.data() as UserData;
            if (userData.username === username && userData.password === password) {
              found = true;
              resolve({ success: true, userId: doc.id }); // User found, return user ID
            }
          });
          if (!found) {
            resolve({ success: false }); // User not found or incorrect password
          }
        }, error => {
          reject(error);
        });
    });
  }


  getFeedbacks(): Observable<Feedback[]> {
    const feedbackCollection = collection(this.firestore, 'feedback'); // Assuming 'feedback' is the collection name
    return collectionData(feedbackCollection, { idField: 'id' }) as Observable<Feedback[]>;
  }

  //Read all products
  getProducts(): Observable<Product[]> {
    const productCollection = collection(this.firestore, 'product');
    return collectionData(productCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  

  // Read products for a specific seller
  getProductsForSeller(username: string): Observable<Product[]> {
    const productCollection = collection(this.firestore, 'product');
    const sellerQuery = query(productCollection, where('username', '==', username));
    return collectionData(sellerQuery, { idField: 'id' }) as Observable<Product[]>;
  }

  // // Read SellerId for a specific seller
  // async getSellerIdForSeller(username: string): Promise<String> {
  //   const productCollection = collection(this.firestore, 'users');
  //   const sellerQuery = query(productCollection, where('username', '==', username));
  //   const querySnapshot = getDocs(sellerQuery);
  //   const doc = (await querySnapshot).docs[0];
  //     return doc.id;
   
  // }

  getwishlist(username: string): Observable<Product[]>{
    const wishlistCollection = collection(this.firestore, "wishlist");
    const wishquey = query(wishlistCollection, where('username', '==', username));
    return collectionData(wishquey, {idField: "id"}) as Observable<Product[]>;
  }
  
}