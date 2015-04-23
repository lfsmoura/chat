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
    setInterval(function() { chat.Chat.fetch(); }, 5000);

    this.$room    = this.$('#room');
    this.$user    = this.$('#user');
    this.$message = this.$('#new-message');

    this.listenTo(chat.Chat, 'add', this.addJustOne);
    this.listenTo(chat.Chat, 'reset', this.addAll);
    this.listenTo(chat.Chat, 'change', function() { console.log("ok britto"); });
   
    chat.Chat.fetch({reset:true});
  },

  addJustOne: function(msg) {
    if (!msg.isNew()) {
      if (msg.get('date') != chat.userId)
        chat.notify(msg.get('user') + ":",msg.get('message'));  
      this.addOne(msg);
    }
  },

  addOne: function(msg) {
    //chat.notify(msg);
    var view = new chat.MessageView({ model: msg });
    this.$room.append( view.render().el );
    if (this.autoScrollActivated())
      this.$room.animate({ scrollTop: chat.Chat.length * 60 }, 1000);
  },

  addAll: function() {
    console.log('reset');
    this.$room.html(''); // clear placeholder message
    chat.Chat.each(this.addOne, this);
  },

  render: function() {
    console.log('render');
    return this;
  },

  getInputMessage: function() {
    return { user: this.$user.val().trim(), message: this.$message.val().trim(), date:chat.userId };
  },

  autoScrollActivated: function() {
    return this.$('#auto-scroll').is(':checked');
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

chat.notify = function notify(title, bodytxt) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check if the user is okay to get some notification
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(title, {body:bodytxt});
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user is okay, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(title, {body:bodytxt});
      }
    });
  }
}

$(function() {
  chat.userId = new Date().getTime();
  chat.cView = new chat.ChatView();
});
