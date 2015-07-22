define(['chat','message'], function(Chat, Message) {

    var MessageView = Backbone.View.extend({
        tagname: 'p',

        template: _.template($('#message-template').html()),

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            this.$el.fadeIn();
            return this;
        }
    });

    var notify = function notify(title, bodytxt) {
        // Let's check if the user is okay to get some notification
        if (Notification.permission === "granted") {
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
    };

    return Backbone.View.extend({
        el: '#chat',

        events: {
            'keypress #new-message': 'sendOnEnter'
        },

        initialize: function () {

            this.$room = this.$('#room');
            this.$user = this.$('#user');
            this.$message = this.$('#new-message');

            this.createdAt = new Date().getTime();
            this.userId = new Date().getTime();
            this.chat = new Chat();
            this.listenTo(this.chat, 'reset', this.render);
            this.listenTo(this.chat, 'add', this.add);
        },

        add: function (msg) {
            if (!msg.isNew()) {
                if (msg.get('user_id') != this.userId) {
                    notify(msg.get('username') + ":", msg.get('message'));
                    if (this.autoScrollActivated())
                        this.$room.animate({scrollTop: this.chat.length * 60}, 1000);
                }
                this.addNoNotification(msg);
            }
        },

        addNoNotification: function (msg) {
            var view = new MessageView({model: msg});
            this.$room.append(view.render().el);
        },

        render: function () {
            // clear placeholder message
            this.$room.html('');
            this.chat.each(this.addNoNotification, this);
            if (this.autoScrollActivated())
                this.$room.animate({scrollTop: this.chat.length * 60}, 1000);
            return this;
        },

        getInputMessage: function () {
            return {
                username: this.$user.val().trim(),
                message: this.$message.val().trim(),
                user_id: this.userId
            };
        },

        autoScrollActivated: function () {
            return this.$('#auto-scroll').is(':checked');
        },

        sendOnEnter: function (event) {
            var EnterKey = 13;
            if (event.which !== EnterKey || !this.$message.val().trim()
                || !this.$user.val().trim()) {
                return;
            }

            // forbid user to change their name
            this.$user.prop('disabled', true);

            this.chat.create(this.getInputMessage());

            // clear input field
            this.$message.val('');
        }
    });
});
