import React, { FC, useEffect, useState } from 'react';
import { handleScrollDownMessages } from '../utils/handleScrollDownMessages';
import { WidgetProps } from '../constants/WidgetConstants/widgetProps';
import WidgetInput from './Widget/WidgetInput';
import { resetWidget, resizeEvent } from './Widget/WidgetResizeLogic';
import WidgetMessage from './Widget/WidgetMessage';

const Widget: FC<WidgetProps> = ({
  setterChatStory,
  chatStory,
  socketProps,
}: WidgetProps) => {
  const [messageValue, setMessageValue] = useState('');
  const [openWidget, setOpenWidget] = useState(false);

  const socket = socketProps;

  const sendHandler = (e: React.MouseEvent, message: string) => {
    e.preventDefault();

    const newMessage = {
      message,
      from: 'user',
      messageId: Math.random(),
      timestamp: new Date().getTime(),
    };
    setterChatStory((prevState) => [...prevState, newMessage]);
    socket?.send(newMessage);

    setMessageValue('');
  };

  useEffect(() => {
    handleScrollDownMessages('messageArea');
  }, [chatStory]);

  const widgetMovingContainer = document.getElementById(
    'resizeMe',
  ) as HTMLElement;

  const handleResetWidget = () => {
    resetWidget(widgetMovingContainer);

    setOpenWidget(false);
  };

  return (
    <div
      className={`socket-widget ${
        openWidget ? 'socket-widget-open' : 'socket-widget-close'
      }`}
      id="resizeMe"
    >
      <div className="widget-content">
        {openWidget && (
          <div
            className="widget-content-closeButton"
            onClick={() => handleResetWidget()}
          >
            X
          </div>
        )}
        <div
          className={`widget-content-header ${
            openWidget
              ? 'widget-content-header-open'
              : 'widget-content-header-close'
          }`}
          onClick={() => setOpenWidget(true)}
          onMouseDown={() => resizeEvent(widgetMovingContainer)}
        >
          <span className="widget-content-header__title">
            Напишите ваше сообщение
          </span>
          <span
            className={`widget-content-header__desc ${
              openWidget
                ? 'widget-content-header__desc-open'
                : 'widget-content-header__desc-close'
            }`}
          >
            Операторы онлайн!
          </span>
        </div>
        <div className="widget-content-body" id="messageArea">
          <div className="widget-content-body-messageStory">
            {chatStory.map((item) => (
              <WidgetMessage
                key={item.messageId}
                from={item.from}
                message={item.message}
                timestamp={item.timestamp}
              />
            ))}
          </div>
        </div>
        <WidgetInput
          messageValue={messageValue}
          setterMessageValue={setMessageValue}
          setterSendHandler={sendHandler}
          socketProps={socketProps}
        />
      </div>
    </div>
  );
};

export default Widget;
