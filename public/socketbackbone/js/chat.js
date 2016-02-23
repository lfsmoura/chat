define(['socket.io', 'message'], function(io, Message) {
  return Backbone.Collection.extend({
    model: Message,

    initialize: function () {
      var self = this;
      var socket = io();
      socket.on('message', function receive(msg) {
        self.add(msg);
      })

      this.fetch({ reset: true });
    },

    url: '/messages/0'
  });
});
