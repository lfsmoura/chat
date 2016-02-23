define(['react', 'jsx!components/Timer'], function (React, Timer) {
        console.log(React);
        React.renderComponent(<Timer />, document.getElementById('chat'));
});
