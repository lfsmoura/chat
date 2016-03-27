import React from 'react';
import ChatRoom from './chatRoom.js';
import InputBox from './inputBox.js';

import { chatStore } from './chatStore.js';

console.log(chatStore);

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    var socket = io();
    socket.on('message', function receive(msg) {
      this.setState({ messages: this.state.messages.concat([msg]) });
    }.bind(this));

    this.state = { messages: [], autoScroll: true };
  }

  componentDidMount() {
    var req = new XMLHttpRequest();
    req.addEventListener("load", function(r, a, b) {
      this.setState({messages: JSON.parse(req.response)})
    }.bind(this));
    req.open("GET", "/messages/0");
    req.send();
  }

  handleMessageSubmit(message) {
    message.user_id = this.props.userId;
    var req = new XMLHttpRequest();
    req.open("POST", "/messages/0");
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(message));
  }

  handleAutoScrollChange(autoScroll) {
    this.setState({ autoScroll: autoScroll });
  }

  render() {
    return (<div>
          <h1>Chat Super Cool</h1>
          <ChatRoom autoScroll={this.state.autoScroll} messages={this.state.messages} />
          <div className="input-box">
            <InputBox
              onAutoScrollChange={this.handleAutoScrollChange.bind(this)}
              onMessageSubmit={this.handleMessageSubmit.bind(this)} />
          </div>
          </div>);
  }
};
