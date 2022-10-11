import { SocketInstance } from '../../modules/sockets/types';

export interface WidgetInputProps {
  messageValue: string;
  setterMessageValue: (value: string) => void;
  setterSendHandler: (e: React.MouseEvent, value: string) => void;
  socketProps: SocketInstance | undefined;
}
