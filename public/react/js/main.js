require.config({
  paths: {
    "jquery" : "lib/jquery-min",
    "react" : "lib/react.min",
    "socket.io" : "/socket.io/socket.io"
  }
});

require(['react', 'jsx!components/Chat'], function (React, Chat) {
  Chat(document.getElementById('chat'));
});
