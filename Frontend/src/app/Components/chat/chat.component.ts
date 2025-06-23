import { Component } from '@angular/core';
import { ChatService } from '../../Service/ChatService/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  constructor(private chatService: ChatService) { console.log(chatService) }
  messagge: string = ''
  send() {
    this.chatService.sendMessage(this.messagge)
  }
}
