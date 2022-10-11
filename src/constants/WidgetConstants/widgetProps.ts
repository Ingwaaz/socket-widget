import { Message } from '../../types/сhatList';
import { SocketInstance } from '../../modules/sockets/types';

export interface WidgetProps {
  setterChatStory: React.Dispatch<React.SetStateAction<Message[]>>;
  chatStory: Message[];
  socketProps: SocketInstance | undefined;
}