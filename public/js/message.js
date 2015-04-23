var chat = chat || {};

chat.Message = Backbone.Model.extend({

  defaults: {
    user: '',
    message: '',
    // TODO change date to userId
    date: 0
  },
});
