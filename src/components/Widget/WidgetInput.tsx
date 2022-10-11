import React, { FC, useState } from 'react';
import { WidgetInputProps } from '../../constants/WidgetConstants/widgetInputProps';

const WidgetInput: FC<WidgetInputProps> = ({
  messageValue,
  setterMessageValue,
  setterSendHandler,
  socketProps,
}) => {
  const [send, setSend] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const stopTypingDelay = 2500;
  const socket = socketProps;

  const sendStatus = (flag: boolean) => {
    setSend(flag);
    socket?.typing({ state: flag, chatId: 1 });
  };

  const typingHandler = () => {
    if (!send) sendStatus(true);
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => sendStatus(false), stopTypingDelay);
    setTimeoutId(timeout);
  };

  return (
    <form className="widget-content-sendField">
      <textarea
        className="widget-content-sendField-messageArea"
        placeholder="Введите сообщение"
        value={messageValue}
        onChange={(e) => {
          setterMessageValue(e.target.value);
          typingHandler();
        }}
      />
      <button
        className="widget-content-sendField-sendButton"
        type="submit"
        onClick={(e: React.MouseEvent) => setterSendHandler(e, messageValue)}
      />
    </form>
  );
};

export default WidgetInput;
