import React from 'react';
import randomColor from './lib/randomColor.js'

export default class ChatRoom extends React.Component {
  componentDidUpdate() {
    if (this.props.autoScroll) {
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
    var rows = this.props.messages.map(function(message) {
      var usernameStyle= {
       color: this.getUserColor(message.user_id)
      };
      return (<div key={message.id}>
        <span className="user" style={usernameStyle}>{message.username}:</span> {message.message}
       </div>);
      }.bind(this));
    return (<div className="room" ref="elem">{rows}</div>);
  }
}
