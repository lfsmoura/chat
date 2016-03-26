define(["react", 'lib/randomColor'], function(React, randomColor) {
  return React.createClass({
          componentDidUpdate: function() {
            if (this.props.autoScroll) {
              this.refs.elem.scrollTop = this.refs.elem.scrollHeight;
            }
          },
          getUserColor: function(id) {
            if (Number.isNaN(parseInt(id))) {
              id = id.split('').reduce(function(s, a) { return s + a.charCodeAt(0); }, 0);
            } else {
              id = parseInt(id);
            }
            return randomColor({ seed: id, luminosity: 'bright' });
          },
          render : function() {
                     var rows = this.props.messages.map(function(message) {
                       var usernameStyle= {
                         color: this.getUserColor(message.user_id)
                       };
                       return (<div>
                         <span className="user" style={usernameStyle}>{message.username}:</span> {message.message}
                         </div>);
                     }.bind(this));
            return (<div className="room" ref="elem">{rows}</div>);
        }
  });
});
