// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');
// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//Messge System for simple helper methods
class MessageSystem {
  //generates an object to broadcast to clients when someones name has changed
  static notifyNameChange(names) {
    return {
      username: "Message-System",
      content: `${names.oldName} changed name too ${names.newName}`,
      id: makeUID(),
      className: "system"};
  }

  static setUserCount(onConnection) {
    if(onConnection) {
      this.userCount++;
    } else if (!onConnection) {
      this.userCount--;
    }
    console.log(this.userCount, ": users online.");
  }
  static getUserCount() {
    return this.userCount;
  }
}
//set MessageSystem usercount to be initially zero;
MessageSystem.userCount = 0;
//broadcast data object to each client
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
};

function makeUID() {
  return uuid.v1();
}

//send a broadcast of varying type and data
function sendBroadcast(type, dataObj) {
  wss.broadcast({
    type: type,
    data: dataObj
  });
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  MessageSystem.setUserCount(true);
  sendBroadcast("incoming-userCount", MessageSystem.getUserCount());
  ws.on("message", (data) => {
    data = JSON.parse(data);
    switch (data.type) {

      case "post-message":
        sendBroadcast("incoming-message", {
            id: makeUID(),
            username: data.username,
            content: data.content,
            className: "user",
            colour: data.colour
          });
        break;
      case "post-nameChange":
        sendBroadcast("incoming-notification", MessageSystem.notifyNameChange(data))
        break;
    }
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    MessageSystem.setUserCount(false);
    sendBroadcast("incoming-userCount", MessageSystem.getUserCount());
    console.log('Client disconnected');
  });
});

