define(["react"], function( React) {
  return React.createClass({
          getInitialState: function() {
            return { username: 'Anonymous', message: '', autoScroll: 'checked', messagesSent: 0};
          },
          canChangeUsername: function() {
            return this.state.messagesSent === 0;
          },
          handleUsernameChange: function(e) {
            if (this.canChangeUsername() && e.target.value.length < 15) {
              this.setState({ username: e.target.value });
            }
          },
          handleMessageChange: function(e) {
            this.setState({ message: e.target.value });
          },
          handleAutoScroll: function(e) {
            var autoScroll = this.state.autoScroll ? '' : 'checked';
            this.setState({ autoScroll: autoScroll});
            this.props.onAutoScrollChange(!!autoScroll);
          },
          handleSubmit: function(e) {
            e.preventDefault();
            var username = this.state.username.trim();
            var message = this.state.message.trim();
            if (!message || !username) {
              return;
            }
            this.props.onMessageSubmit({ username: username, message: message });
            this.setState({ message: '', messagesSent: this.state.messagesSent + 1 });
          },
          render : function() {
            var hiddenStyle = {
              display: 'none'
            };

            return (<div id="input-box">
              <form onSubmit={this.handleSubmit}>
                <label>
                  <input 
                    type="checkbox"
                    name="auto-scroll"
                    onChange={this.handleAutoScroll}
                    checked={this.state.autoScroll} /> auto-scroll
                </label>
                <div className="form-group">
                  <label htmlFor="user">Username</label>
                  <input id="user" className="form-control" maxlength="15" value={this.state.username} onChange={this.handleUsernameChange} disabled={!this.canChangeUsername()} />
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
                    onChange={this.handleMessageChange}
                  />
                </div>
                <input style={hiddenStyle} type="submit" value="Send" />
              </form></div>);
          }
  });
});
