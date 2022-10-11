import { Message } from './сhatList';

export interface ServerMessage extends Message {
  chatId: number;
  name: string;
  type: string;
}
