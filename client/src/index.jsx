// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('react-root'));
var exampleSocket = new WebSocket("ws://localhost:4000");
exampleSocket.onopen = function (event) {
  exampleSocket.send("Here's some text that the server is urgently awaiting!");
};
