import React, { FC, useState } from 'react';
import '../assets/scss/index.scss';
import Widget from '../components/widget';
import { Socket } from './Socket';
import { SocketInstance } from '../modules/sockets/types';
import { Message } from '../types/сhatList';

const App: FC = () => {
  const [chatStory, setChatStory] = useState<Message[]>([]);
  const [socket, setSocketState] = useState<SocketInstance | undefined>();

  return (
    <Socket setterChatStory={setChatStory} setterSocketState={setSocketState}>
      {
        <Widget
          chatStory={chatStory}
          setterChatStory={setChatStory}
          socketProps={socket}
        />
      }
    </Socket>
  );
};

export default App;
