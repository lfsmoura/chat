var chat = chat || {};

var Chat = Backbone.Collection.extend({
  model: chat.Message,

  initialize: function() {
  },

  url: function() {
    console.log("get url "+ this.length);
    var last_id = (this.last() && this.last().get('id')) ? this.last().get('id') : '0';
    return '/messages/' + last_id;
  }
});

chat.Chat = new Chat();
