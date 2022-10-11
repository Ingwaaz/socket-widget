import { SocketInstance, SocketOptions } from './types';
import { typeMessage } from '../../constants/sockets';

export const socketConstructor = (options: SocketOptions): SocketInstance => {
  const { queryParams, onConnect, onDisconnect } = options;
  let { url } = options;

  if (queryParams) url = `${url}?${JSON.stringify(queryParams)}`;

  let socket: WebSocket | null = new WebSocket(url);

  const connection = {
    socket,
    send: (message = {}) => {
      if (queryParams) message = { ...message, ...queryParams };
      const value = { ...message, ...{ type: typeMessage.agent } };
      socket?.send(JSON.stringify(value));
    },
    connection: (state: string, agentId: number) => {
      const value = { state, agentId, type: typeMessage.connection };
      socket?.send(JSON.stringify(value));
    },
    close: (code = 1000, reason = 'reason close connection') => {
      socket?.close(code, reason);
    },
    typing: ({ state, chatId }: { state: boolean; chatId: number }) => {
      const value = {
        type: typeMessage.typing,
        state: `${Number(state)}`,
        chatId,
      };
      socket?.send(JSON.stringify(value));
    },
  };

  socket.addEventListener('open', (e) => {
    console.log('onopen', e);
    if (onConnect) onConnect(connection);
  });
  socket.addEventListener('error', (e) => console.log('onerror', e));

  socket.addEventListener('close', (e) => {
    console.log('on close', e);
    socket = null;
    if (onDisconnect) onDisconnect(connection);
  });

  socket.addEventListener('message', (event) => {
    if (event?.data && options.onMessage) {
      options.onMessage(JSON.parse(event.data));
    }
  });

  return connection;
};

export const readyState = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};
