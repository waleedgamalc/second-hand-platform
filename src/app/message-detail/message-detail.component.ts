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
  

  public messages: Message[] = [];
  receiver: string = this.route.snapshot.params['username']
  newMessage: string = '';
  
  constructor(private route: ActivatedRoute, private messageService: MessageService , private firebaseService : FirebaseService , private userservice  : UsernameService) {}
  username : String =  this.userservice.username
  ngOnInit(): void {
    this.messageService.getMessagesWithUser(this.receiver).subscribe(messages => {
      this.messages = messages;
      this.sortMessagesByTimestamp(); // Sort messages after retrieving them
    });
  }

  sortMessagesByTimestamp() {
    this.messages.sort((a, b) => {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });
  }

  // ngOnInit(): void {
  //   this.messageService.getMessagesWithUser(this.receiver).subscribe(Messages => {
  //     this.messages = Messages;
  //   });
  // }

  sendMessage() {
    this.messageService.sendMessage(this.receiver, this.newMessage).then(() => {
      this.newMessage = '';
    });
  }

}
