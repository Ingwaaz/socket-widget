import React, { FC } from 'react';
import { WidgetMessageProps } from '../../constants/WidgetConstants/widgetMessageProps';

const WidgetMessage: FC<WidgetMessageProps> = ({
  from,
  message,
  timestamp,
}) => (
  <div
    className={`widget-content-body-messageStory-content ${
      from === 'admin'
        ? 'widget-content-body-messageStory-content-fromUser'
        : 'widget-content-body-messageStory-content-fromYou'
    }`}
  >
    {/*{item.avatar && (*/}
    {/*  <div className="widget-content-body-messageStory-avatar">*/}
    {/*    AVA*/}
    {/*  </div>*/}
    {/*)}*/}
    <div
      className={`widget-content-body-messageStory-message ${
        from === 'admin'
          ? 'widget-content-body-messageStory-message-fromUser'
          : 'widget-content-body-messageStory-message-fromYou'
      }`}
    >
      <p
        className={`widget-content-body-messageStory-message__text ${
          from === 'admin'
            ? 'widget-content-body-messageStory-message__text-fromUser'
            : 'widget-content-body-messageStory-message__text-fromYou'
        }`}
      >
        {message}
      </p>
      <span
        className={`widget-content-body-messageStory-message__time ${
          from === 'admin'
            ? 'widget-content-body-messageStory-message__time-fromUser'
            : 'widget-content-body-messageStory-message__time-fromYou'
        }`}
      >
        {timestamp}
      </span>
    </div>
  </div>
);

export default WidgetMessage;
