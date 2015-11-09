define(['message'], function(Message) {
  return Backbone.Collection.extend({
    model: Message,

    initialize: function () {
      this.poll({ reset: true });
    },

    schedulePoll: function() {
      var self = this;
      setTimeout(function() {
        self.poll();
      }, 5000);
    },

    poll: function(options) {
      var self = this;
      this.fetch(_.extend({
          remove: false,
          success: function() {
            self.schedulePoll();
          }
      }, options));
    },

    url: function () {
      var lastId = (this.last() && this.last().get('id')) ? this.last().get('id') : '0';
      return '/messages/' + lastId;
    }
  });
});
