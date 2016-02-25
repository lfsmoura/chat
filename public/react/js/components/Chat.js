define(["jquery", "react", 'socket.io', 'jsx!components/ChatRoom', 'jsx!components/InputBox'], function($, React, io, ChatRoom, InputBox) {

  var Chat = React.createClass({
          getInitialState: function() {
            var socket = io();
            socket.on('message', function receive(msg) {
              this.setState({ messages: this.state.messages.concat([msg]) });
            }.bind(this));
            return { messages: [], autoScroll: true };
          },
          componentDidMount: function() {
            $.ajax({
              url: '/messages/0',
              cache: false,
              dataType: 'json',
              success: function(msgs) {
                this.setState({ messages: msgs });
              }.bind(this)
            });
          },
          handleMessageSubmit: function(message) {
            message.user_id = this.props.userId;
            $.ajax({
              url: '/messages/0',
              type: 'POST',
              data: JSON.stringify(message),
              contentType: 'application/json',
              dataType: 'json'
            });
          },
          handleAutoScrollChange: function(autoScroll) {
            this.setState({ autoScroll: autoScroll }); 
          },
          render : function() {
            return (<div>
                  <h1>Chat Super Cool</h1>
                  <ChatRoom autoScroll={this.state.autoScroll} messages={this.state.messages} />
                  <div className="input-box">
                    <InputBox
                      onAutoScrollChange={this.handleAutoScrollChange}
                      onMessageSubmit={this.handleMessageSubmit} />
                  </div>
                </div>
              );
          }
  });
  // this returns a function that renders the component instead of
  // the component, I could not manage to get the component running
  // outside the components folder because of the plugin I am using
  return function(elem) {
    React.render(<Chat userId={new Date().getTime()}/>, elem);
  };
});
