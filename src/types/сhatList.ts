export interface Message {
  from: string;
  message: string;
  messageId: number;
  timestamp: number;
}

export interface Chat {
  chatId: number;
  name: string;
  messageList: Message[];
}