import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './chat.js'

import { chatStore } from './chatStore.js';

const render = () => {
    ReactDOM.render(<Chat />,
        document.getElementById('chat'));
}

// When something changes in the store, the view is rendered
chatStore.subscribe(render);
render();

var socket = io();
socket.on('message', (message) => {
  chatStore.dispatch({
    type: "ADD-MESSAGE",
    message
  })
});

// get initial messages
let req = new XMLHttpRequest();
req.addEventListener("load", () => {
  chatStore.dispatch({
    type: "ADD-MESSAGE",
    message: JSON.parse(req.response)
  })
});
req.open("GET", "/messages/0");
req.send();
