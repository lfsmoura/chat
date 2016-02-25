define(["react", 'lib/randomColor'], function(React, randomColor) {
  return React.createClass({
          componentDidUpdate: function() {
            if (this.props.autoScroll) {
              this.refs.elem.scrollTop = this.refs.elem.scrollHeight;
            }
          },
          render : function() {
                     var rows = this.props.messages.map(function(message) {
                       var usernameStyle= {
                         color: randomColor({ seed: parseInt(message.user_id), luminosity: 'bright' })
                       };
                       return (<div>
                         <span className="user" style={usernameStyle}>{message.username}:</span> {message.message}
                         </div>);
                     });
            return (<div className="room" ref="elem">{rows}</div>);
        }
  });
});
