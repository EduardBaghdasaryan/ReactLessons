import React, { FC, useEffect } from 'react';
import { signalingProvider } from '../../providers/signaling-provider';
import { useMessaging } from '../../hooks/use-messaging';
import { Message } from '../../types';

export const Home: FC = () => {

  const [messages, sendMessage] = useMessaging();

  useEffect(() => {
    signalingProvider.init();
  }, []);

  const onSend = () => {
    const inputValue = 'adsasda';
    const message = {
      username: 'user',
      text: inputValue,
      date: new Date().toISOString(),
    } as Message;

    sendMessage(message);
  }

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <p>{message.username}: {message.text}</p>
        </div>
      ))}
      <button onClick={onSend}>Send</button>
    </div>
  );
};
