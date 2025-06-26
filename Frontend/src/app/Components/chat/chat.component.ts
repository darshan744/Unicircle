import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';

interface User {
  id: number;
  name: string;
  avatar: string;
  lastSeen: string;
  isOnline: boolean;
}

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

@Component({
  selector: 'app-chat',
  imports: [FormsModule , CommonModule , Button],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  users: User[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
      lastSeen: 'Online',
      isOnline: true,
    },
    {
      id: 2,
      name: 'Bob Smith',
      avatar: '/placeholder.svg?height=40&width=40',
      lastSeen: '2 minutes ago',
      isOnline: false,
    },
    {
      id: 3,
      name: 'Carol Davis',
      avatar: '/placeholder.svg?height=40&width=40',
      lastSeen: 'Online',
      isOnline: true,
    },
    {
      id: 4,
      name: 'David Wilson',
      avatar: '/placeholder.svg?height=40&width=40',
      lastSeen: '1 hour ago',
      isOnline: false,
    },
    {
      id: 5,
      name: 'Emma Brown',
      avatar: '/placeholder.svg?height=40&width=40',
      lastSeen: 'Online',
      isOnline: true,
    },
  ];

  messages: Message[] = [
    {
      id: 1,
      senderId: 1,
      receiverId: 0, // 0 represents current user
      content: 'Hey! How are you doing?',
      timestamp: new Date(Date.now() - 300000),
      isRead: true,
    },
    {
      id: 2,
      senderId: 0,
      receiverId: 1,
      content: "I'm doing great! Thanks for asking. How about you?",
      timestamp: new Date(Date.now() - 240000),
      isRead: true,
    },
    {
      id: 3,
      senderId: 1,
      receiverId: 0,
      content:
        'Pretty good! Just working on some new projects. Are you free this weekend?',
      timestamp: new Date(Date.now() - 180000),
      isRead: true,
    },
    {
      id: 4,
      senderId: 0,
      receiverId: 1,
      content: 'Yes, I should be free on Saturday. What did you have in mind?',
      timestamp: new Date(Date.now() - 120000),
      isRead: true,
    },
    {
      id: 5,
      senderId: 1,
      receiverId: 0,
      content:
        "Maybe we could grab coffee and catch up? It's been a while since we last met.",
      timestamp: new Date(Date.now() - 60000),
      isRead: false,
    },
  ];

  selectedUser: User | null = null;
  currentUserId = 0;
  newMessage = '';
  filteredMessages: Message[] = [];

  ngOnInit(): void {
    // Select first user by default
    if (this.users.length > 0) {
      this.selectUser(this.users[0]);
    }
  }

  selectUser(user: User): void {
    this.selectedUser = user;
    this.loadMessages();
  }

  loadMessages(): void {
    if (this.selectedUser) {
      this.filteredMessages = this.messages
        .filter(
          (message) =>
            (message.senderId === this.selectedUser!.id &&
              message.receiverId === this.currentUserId) ||
            (message.senderId === this.currentUserId &&
              message.receiverId === this.selectedUser!.id),
        )
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.selectedUser) {
      const message: Message = {
        id: this.messages.length + 1,
        senderId: this.currentUserId,
        receiverId: this.selectedUser.id,
        content: this.newMessage.trim(),
        timestamp: new Date(),
        isRead: false,
      };

      this.messages.push(message);
      this.loadMessages();
      this.newMessage = '';

      // Scroll to bottom after sending message
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  isMessageFromCurrentUser(message: Message): boolean {
    return message.senderId === this.currentUserId;
  }

  private scrollToBottom(): void {
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  getLastMessage(userId: number): string {
    const userMessages = this.messages.filter(
      (message) =>
        (message.senderId === userId &&
          message.receiverId === this.currentUserId) ||
        (message.senderId === this.currentUserId &&
          message.receiverId === userId),
    );

    if (userMessages.length > 0) {
      const lastMessage = userMessages[userMessages.length - 1];
      return lastMessage.content.length > 30
        ? lastMessage.content.substring(0, 30) + '...'
        : lastMessage.content;
    }

    return 'No messages yet';
  }

  getUnreadCount(userId: number): number {
    return this.messages.filter(
      (message) =>
        message.senderId === userId &&
        message.receiverId === this.currentUserId &&
        !message.isRead,
    ).length;
  }
}
