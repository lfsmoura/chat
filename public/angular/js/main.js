angular.module('chatApp', ['ngResource'])
    .controller('ChatController', function($resource){
        var Message = $resource('/messages/:msgId',
            { msgId:'0' }, {
                getLast: {method: 'GET', isArray: true}
            });

        var chat = this;
        chat.userId = new Date().getTime();
        chat.username = 'anonymous'
        chat.changeuserdisabled = '';
        chat.lastId = 0;
        chat.msgs = [];
        chat.msgs = Message.query(function(){
            chat.lastId = _.max(_.pluck(chat.msgs, 'id'));
            if ($('#auto-scroll').is(':checked')) {
                $('#room').animate({scrollTop: chat.msgs.length * 60}, 1000);
            }

            setInterval(function() {
                var ret = Message.getLast({msgId: chat.lastId}, function(){
                    if (ret.length) {
                        chat.lastId = _.max(_.pluck(ret, 'id'));
                        _.forEach(ret, function(msg) {
                           chat.msgs.push(msg);
                        });
                        if ($('#auto-scroll').is(':checked')) {
                            $('#room').animate({scrollTop: chat.msgs.length * 60}, 1000);
                        }
                    }
                });
            }, 5000);
        });

        chat.sendMsg = function() {
            if (chat.message.length <= 0) {
                return;
            }

            var msg = new Message({
                user_id: chat.userId,
                username: chat.username,
                message: chat.message });
            msg.$save();

            $('#user').prop('disabled', true);
            chat.message = ''
        };
    });