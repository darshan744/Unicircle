import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserService } from '../User/user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket, private userService: UserService) {
    console.log(socket)
  }
  sendMessage(message: string) { console.log(message); this.socket.emit("chat:send", { message, name: this.userService.userID }) }
  getMessage() {
  }
}
