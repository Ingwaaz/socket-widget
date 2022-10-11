import React, { useEffect, useState } from 'react';

import { socketConstructor } from '../modules/sockets';
import { SocketInstance, SocketOptions } from '../modules/sockets/types';

export const useSocket = (options: SocketOptions): SocketInstance | null => {
  const [socket, setSocket] = useState<SocketInstance | null>(null);

  useEffect(() => {
    if (socket) return;
    const instanceSocket = socketConstructor(options);
    setSocket(instanceSocket);

    return () => instanceSocket.close(1000, '');
  }, []);

  return socket;
};
