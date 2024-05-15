import { Injectable, Query } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsernameService } from '../username.service';
import { Message } from '../message';
import { Observable, combineLatest, map } from 'rxjs';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { Firestore, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private Firestore: Firestore ,private firestore: AngularFirestore , private usernameService: UsernameService) {}

  // Sending Messages
  sendMessage(receiver: string, message: string , productId: string) {
    const sender = this.usernameService.username;
    const timestamp = new Date().toISOString();

    return this.firestore.collection('messages').add({
      productId,
      sender,
      receiver,
      message,
      timestamp
    });
  }

  // getMessagesWithUser(username: string): Observable<Message[]> {

  //   const currentUserId = this.usernameService.username;
    
  //   const messages = collection(this.Firestore, 'messages'); 
  //   const sellerQuery = query(messages, where('receiver', '==', username));
  //   return collectionData(sellerQuery, { idField: 'id' }) as Observable<Message[]>;

  // }
  getMessagesWithUser(productId: string): Observable<Message[]> {
    const currentUserId = this.usernameService.username;
    
    const messages = collection(this.Firestore, 'messages'); 
    const sellerQuery = query(
        messages, 
        where('productId', '==', productId)      );

    return collectionData(sellerQuery, { idField: 'id' }) as Observable<Message[]>;
}
  
}