require.config({
  paths: {
    'socket.io' : '/socket.io/socket.io'
         }
});
require(['Backbone', 'chatView'],
    function (Backbone, ChatView) {
        return new ChatView();
});
