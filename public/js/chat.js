var chat = chat || {};

var Chat = Backbone.Collection.extend({
  model: chat.Message,

  initialize: function() {
  },

  url: '/messages/'
  //url: function() {
  //  return '/messages/' + new Date().getTime();
  //}
});

chat.Chat = new Chat();
