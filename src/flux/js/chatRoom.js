import React from 'react';
import randomColor from './lib/randomColor.js'

import { chatStore } from './chatStore.js';

export default class ChatRoom extends React.Component {
  componentDidUpdate() {
    if (chatStore.getState().autoScroll) {
      this.refs.elem.scrollTop = this.refs.elem.scrollHeight;
    }
  }

  getUserColor(id) {
    if (Number.isNaN(parseInt(id))) {
      id = id.split('').reduce(function(s, a) { return s + a.charCodeAt(0); }, 0);
    } else {
      id = parseInt(id);
    }
    return randomColor({ seed: id, luminosity: 'bright' });
  }

  render() {
    var rows = chatStore.getState().messages.map((message) => {
        let usernameStyle= {
         color: this.getUserColor(message.user_id)
        };
        return (<div key={message.id}>
          <span className="user" style={usernameStyle}>{message.username}:</span> {message.message}
         </div>);
      });
    return (<div className="room" ref="elem">{rows}</div>);
  }
}
