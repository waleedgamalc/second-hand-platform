import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';
import { Message } from '../message';
import { FirebaseService } from '../services/firebase.service';
import { UsernameService } from '../username.service';


@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrl: './message-detail.component.css'
})
export class MessageDetailComponent implements OnInit {
  

  
  constructor(private route: ActivatedRoute, private messageService: MessageService , private firebaseService : FirebaseService , private userservice  : UsernameService) {}
  public messages: Message[] = [];
  receiver: string = this.route.snapshot.params['username'] // Seller
  newMessage: string = '';
  username : string =  this.userservice.username
  productId: string = this.route.snapshot.params['id'] as string


  ngOnInit(): void {
    this.messageService.getMessagesWithUser(this.productId).subscribe(messages => {
      this.messages = messages;
      this.sortMessagesByTimestamp(); // Sort messages after retrieving them
    });
  }


  // ngOnInit(): void {
  //   this.messageService.getMessagesWithUser(this.receiver).subscribe(messages => {
  //     this.messages = messages.filter(message =>
  //       message.productid === this.productId
  //     );
  //     this.sortMessagesByTimestamp(); // Sort filtered messages after retrieving them
  //   });
  // }


  sortMessagesByTimestamp() {
    this.messages.sort((a, b) => {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });
  }

  

  sendMessage() {
    this.messageService.sendMessage(this.receiver, this.newMessage ,this.productId ).then(() => {
      this.newMessage = '';
    });
  }

}
