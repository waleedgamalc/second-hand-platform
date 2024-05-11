import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { getFirestore,addDoc, DocumentReference } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  //Read all products
  getProducts(): Observable<Product[]> {
    const productCollection = collection(this.firestore, 'product');
    return collectionData(productCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  // Function to create a new product document in Firestore
  addProduct(product: any): Promise<void> {
    const productCollection = collection(this.firestore, 'products');
    return addDoc(productCollection, product).then(() => {});
  }

}
