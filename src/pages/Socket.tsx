import React, { FC, useEffect } from 'react';

import { useSocket } from '../hooks/useSocket';
import { socketSettings, typeMessage } from '../constants/sockets';
import { ServerMessage } from '../types/common';
import { SocketInstance } from '../modules/sockets/types';
import { Message } from '../types/сhatList';

interface SocketProps {
  children: React.ReactElement;
  setterChatStory: React.Dispatch<React.SetStateAction<Message[]>>;
  setterSocketState: React.Dispatch<
    React.SetStateAction<SocketInstance | undefined>
  >;
}

export const Socket: FC<SocketProps> = ({
  children,
  setterChatStory,
  setterSocketState,
}: SocketProps) => {
  const connectHandler = (instance: SocketInstance) =>
    instance?.connection('connect', 1);
  const disconnectHandler = (instance: SocketInstance) =>
    instance?.connection('disconnect', 1);
  const messageHandler = (response: ServerMessage) => {
    const type = response.type;

    switch (type) {
      case typeMessage.client:
        setterChatStory((prevState) => [...prevState, response]);
        break;
    }
  };

  const options = {
    url: socketSettings.chatUrl,
    onMessage: messageHandler,
    onConnect: connectHandler,
    onDisconnect: disconnectHandler,
  };
  const socket = useSocket(options);

  useEffect(() => {
    if (!socket) return;
    setterSocketState(() => socket);
  }, [setterSocketState, socket]);

  return { ...children };
};
