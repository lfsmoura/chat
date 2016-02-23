define(function() {
    return Backbone.Model.extend({
        defaults: {
            username: '',
            user_id: 0,
            message: '',
            date: 0
        }
    });
});
