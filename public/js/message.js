var chat = chat || {};

chat.Message = Backbone.Model.extend({

  defaults: {
    user: '',
    message: ''
  },
});
