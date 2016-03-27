import React from 'react';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: 'Anonymous', message: '', autoScroll: 'checked', messagesSent: 0};
  }
  canChangeUsername() {
    return this.state.messagesSent === 0;
  }

  handleUsernameChange(e) {
    if (this.canChangeUsername() && e.target.value.length < 15) {
        this.setState({ username: e.target.value });
    }
  }

  handleAutoScroll(e) {
    var autoScroll = this.state.autoScroll ? '' : 'checked';
    this.setState({ autoScroll: autoScroll});
    this.props.onAutoScrollChange(!!autoScroll);
  }

  handleSubmit(e) {
    e.preventDefault();
    var username = this.state.username.trim();
    var message = this.state.message.trim();
    if (!message || !username) {
      return;
    }
    this.props.onMessageSubmit({ username: username, message: message });
    this.setState({ message: '', messagesSent: this.state.messagesSent + 1 });
  }
  
  changeContent(e){
   this.setState({inputContent: e.target.value})
 }

  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  render () {
    var hiddenStyle = {
      display: 'none'
    };

    return (<div id="input-box">
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          <input
            type="checkbox"
            name="auto-scroll"
            onChange={this.handleAutoScroll.bind(this)}
            checked={this.state.autoScroll} /> auto-scroll
        </label>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input id="user" className="form-control" maxLength="15"
          value={this.state.username}
          onChange={this.handleUsernameChange.bind(this)}
          disabled={!this.canChangeUsername()} />
        </div>
        <div className="form-group">
          <label htmlFor="new-message">Message</label>
          <input
            id="new-message"
            placeholder="Type your message and press enter"
            name="message"
            className="form-control"
            autofocus
            value={this.state.message}
            onChange={this.handleMessageChange.bind(this)}
          />
        </div>
        <input style={hiddenStyle} type="submit" value="Send" />
      </form></div>);
    }
}
