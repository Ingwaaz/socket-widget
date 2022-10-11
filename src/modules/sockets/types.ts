import { ServerMessage } from '../../types/common';

export interface SocketOptions {
  url: string;
  queryParams?: unknown;
  onConnect?: (instance: SocketInstance) => void;
  onDisconnect?: (instance: SocketInstance) => void;
  onMessage?: (message: ServerMessage) => void;
}

export interface SocketInstance {
  socket: WebSocket | null;
  send: (message: Record<string, unknown> | string | undefined) => void;
  close: (code: number, reason: string) => void;
  typing: ({ state, chatId }: { state: boolean; chatId: number }) => void;
  connection: (state: 'connect' | 'disconnect', agentId: number) => void;
}
