import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { getFirestore,addDoc, DocumentReference } from 'firebase/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore'

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
  login(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.collectionRef.get() 
        .subscribe(snapshot => {
          snapshot.forEach(doc => {
            
            const userData = doc.data() as UserData;
            if (userData.username === username && userData.password === password) {
              resolve(true); // User found, login successful
            }
          });
          resolve(false); // User not found or incorrect password, login failed
        }, error => {
          reject(error);
        });
    });
  }

  //Read all products
  getProducts(): Observable<Product[]> {
    const productCollection = collection(this.firestore, 'product');
    return collectionData(productCollection, { idField: 'id' }) as Observable<Product[]>;
  }}