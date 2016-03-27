import React from 'react';
import ChatRoom from './chatRoom.js';
import InputBox from './inputBox.js';

export default class Chat extends React.Component {

  render() {
    return (<div>
          <h1>Chat Super Cool</h1>
          <ChatRoom />
          <InputBox />
          </div>);
  }
};
