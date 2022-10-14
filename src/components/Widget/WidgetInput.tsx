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

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.trim() === '') return;
    setterMessageValue(e.target.value);
    typingHandler();
  };

  return (
    <form className="widget-content-sendField">
      <textarea
        className="widget-content-sendField-messageArea"
        placeholder="Введите сообщение"
        value={messageValue}
        onChange={(e) => changeHandler(e)}
      />
      <button
        className="widget-content-sendField-sendButton"
        type="submit"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (messageValue === '') return;
          setterSendHandler(e, messageValue);
        }}
      />
    </form>
  );
};

export default WidgetInput;
