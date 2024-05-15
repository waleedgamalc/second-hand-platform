import { Component , OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  
  conversations = [];
  
  constructor(private messageService: MessageService) {}
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



}
