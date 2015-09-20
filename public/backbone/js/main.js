// require.config({
//     config: {
//         i18n: {
//             locale: 'pt-br'
//         }
//     }
// });

require(['chatView'],
    function (ChatView) {
        return new ChatView();
});
