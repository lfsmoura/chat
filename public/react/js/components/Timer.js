define(["react"], function( React) {
  var Timer = React.createClass({
          render : function() {
            return (<h1>Hello, {this.props.name}</h1>);
                   }
  });
  React.render(<Timer name="John" />, document.getElementById('chat'));
  return {};
});
