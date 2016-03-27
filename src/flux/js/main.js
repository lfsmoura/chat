import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './chat.js'


import { chatStore } from './chatStore.js';

const render = () => {
    ReactDOM.render(<Chat userId={new Date().getTime()} />,
        document.getElementById('chat'));
}

chatStore.subscribe(render);
render();
