import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {

    console.log(this.socket)
  }
  sendMessage(message: string) { this.socket.emit("chat:send", { message }) }
  getMessage() {
  }
}
