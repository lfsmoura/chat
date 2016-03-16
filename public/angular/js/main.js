angular.module('chatApp', ['ngResource'])
    .controller('ChatController', ['$resource', '$timeout', function($resource, $timeout){
        var Message = $resource('/messages/:msgId',
            { msgId:'0' }, {
                getLast: {method: 'GET', isArray: true}
            });

        var scrollToBottom = function(y) {
          var room = document.getElementById('room');
          room.scrollTop = y || (room.scrollHeight + 100);
        }

        var chat = this;
        chat.messagesSent = 0;
        chat.autoScroll = true;
        chat.userId = new Date().getTime();
        chat.username = 'anonymous'
        chat.changeuserdisabled = '';
        chat.lastId = 0;
        chat.msgs = [];
        chat.msgs = Message.query(function(){
            chat.lastId = _.max(_.pluck(chat.msgs, 'id'));
            if (chat.autoScroll) {
                $timeout(scrollToBottom.bind(this, chat.msgs.length * 50));
            }

            setInterval(function() {
                var ret = Message.getLast({msgId: chat.lastId}, function(){
                    if (ret.length) {
                        chat.lastId = _.max(_.pluck(ret, 'id'));
                        _.forEach(ret, function(msg) {
                           chat.msgs.push(msg);
                        });
                        if (chat.autoScroll) {
                            scrollToBottom();
                        }
                    }
                });
            }, 3000);
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

            chat.messagesSent++;
            chat.message = ''
        };
    }]);
