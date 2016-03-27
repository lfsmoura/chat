import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './chat.js'

ReactDOM.render(<Chat userId={new Date().getTime()} />,
    document.getElementById('chat'));
