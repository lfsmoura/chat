var chat = chat || {};

chat.MessageView = Backbone.View.extend({
  tagname: 'p',

  template: _.template( $('#message-template').html() ),

  initialize: function() {
   
  },

  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
    return this;
  }
});

chat.ChatView = Backbone.View.extend({
  el: '#chat',

  events: {
    'keypress #new-message': 'sendOnEnter'
  },

  initialize: function() {
    setInterval(function() { chat.Chat.fetch({update:true, reset:true}); }, 5000);

    this.$room    = this.$('#room');
    this.$user    = this.$('#user');
    this.$message = this.$('#new-message');

    this.listenTo(chat.Chat, 'add', this.addOne);
    this.listenTo(chat.Chat, 'reset update', this.addAll);
   
    chat.Chat.fetch({reset:true});
  },

  addOne: function(msg) {
    var view = new chat.MessageView({ model: msg });
    this.$room.append( view.render().el );
  },

  addAll: function() {
    this.$room.html(''); // clear placeholder message
    chat.Chat.each(this.addOne, this);
    this.$room.animate({ scrollTop: 1000 }, 1000);
  },

  render: function() {
    console.log('render');
    return this;
  },

  getInputMessage: function() {
    return { user: this.$user.val().trim(), message: this.$message.val().trim() };
  },

  sendOnEnter: function(event) {
    // TODO add constant
    if (event.which !== 13 || !this.$message.val().trim() 
        || !this.$user.val().trim()) {
      return;
    }

    this.$user.prop('disabled', true);

    chat.Chat.create(this.getInputMessage() );
    this.$message.val('');
  }
});


$(function() {
  chat.cView = new chat.ChatView();
});
