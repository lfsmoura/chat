angular.module('chatApp', [])
    //.factory('Message', function($resource) {
    //    return $resource('/messages/:id')
   // })

    .controller('ChatController', function(){
        var chat = this;
        chat.user = 'anonymous'
        chat.changeuserdisabled = '';
        chat.msgs = [];

        chat.sendMsg = function() {
            if (chat.text.length <= 0) {
                return;
            }
            $('#user').prop('disabled', true);
            chat.msgs.push({user: chat.user, text: chat.text });
            chat.text = ''
        };
    });