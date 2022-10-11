import React, { FC } from 'react';
import { WidgetMessageProps } from '../../constants/WidgetConstants/widgetMessageProps';

const WidgetMessage: FC<WidgetMessageProps> = ({
  from,
  message,
  timestamp,
}) => (
  <div
    className={`widget-content-body-messageStory-content ${
      from === 'admin' ? 'fromUser' : 'fromYou'
    }`}
  >
    {/*{item.avatar && (*/}
    {/*  <div className="widget-content-body-messageStory-avatar">*/}
    {/*    AVA*/}
    {/*  </div>*/}
    {/*)}*/}
    <div
      className={`widget-content-body-messageStory-message ${
        from === 'admin' ? 'fromUser' : 'fromYou'
      }`}
    >
      <p
        className={`widget-content-body-messageStory-message__text ${
          from === 'admin' ? 'fromUser' : 'fromYou'
        }`}
      >
        {message}
      </p>
      <span
        className={`widget-content-body-messageStory-message__time ${
          from === 'admin' ? 'fromUser' : 'fromYou'
        }`}
      >
        {timestamp}
      </span>
    </div>
  </div>
);

export default WidgetMessage;
