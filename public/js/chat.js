var chat = chat || {};

var Chat = Backbone.Collection.extend({
  model: chat.Message,

  initialize: function() {
  },

  url: '/messages/'
});

chat.Chat = new Chat();
