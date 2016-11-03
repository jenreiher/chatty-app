import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx'

class App extends Component {
  //set initial state with constructor**
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://localhost:4000");
    this.handleChatBar = this.handleChatBar.bind(this);
    this.sendChatData = this.sendChatData.bind(this);
    this.postChatData = this.postChatData.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
    this.postNotification = this.postNotification.bind(this);
    this.generateMessageArray = this.generateMessageArray.bind(this);
    this.handleSocketMessage = this.handleSocketMessage.bind(this);
    this.showColourMenu = this.showColourMenu.bind(this);
    this.state = {
        currentUser : {name: ""},
        messages : [],
        userCount: 0

    }
  }

  handleSocketMessage(message) {
    switch (message.type) {
      case "incoming-message":
        this.postChatData(message);
        break;
      case "incoming-notification":
        this.postNotification(message);
        break;
      case "incoming-userCount":
        this.setState({userCount: message.data});
        break;
    }
  }

  generateMessageArray(messageData) {
    const messageArray = this.state.messages;
    messageArray.push({
      username: messageData.data.username,
      content: messageData.data.content,
      id: messageData.data.id,
      className: messageData.data.className,
      colour: messageData.data.colour});

    return messageArray;
  }



  postChatData (messageData) {
    var messageArray = this.generateMessageArray(messageData);
    this.setState({ messages : messageArray });
  }

  sendChatData (chatData) {
    this.socket.send(JSON.stringify(chatData));
  }

  postNotification (messageData) {
    this.postChatData(messageData);
  }

  sendNotification (newName) {
    const notificationObject = {
       type: "post-nameChange",
       oldName: this.state.currentUser.name,
       newName: newName
    }
    this.socket.send(JSON.stringify(notificationObject));
  }

  componentWillMount() {
    console.log("app will mount")
  }

  componentDidMount() {
    this.socket.onopen = function() {
      console.log("connected to server");
    }
    this.socket.onmessage = (message) => {
      var message = JSON.parse(message.data);
      this.handleSocketMessage(message);
    }
  }


  handleChatBar (messageObject) {
    //if no username field was entered
      if(!messageObject.username.length) {
        messageObject.username = "Anonymous";
        this.setState({currentUser: { name: messageObject.username}});
      }
      messageObject.type = "post-message"
      this.sendChatData(messageObject);

  }
  showColourMenu (colourMenu) {
    if(colourMenu.style.display === "") {
      colourMenu.style.display = "block";
    } else if (colourMenu.style.display === "block") {
        colourMenu.style.display = "";
    }

  }
  render() {

    return (
      <div className="wrapper">

        <Nav userCount={this.state.userCount} />
        <MessageList messageData={this.state.messages} postNotification={this.postNotification} ></MessageList>
        <Chatbar
          currentUser={this.state.currentUser.name}
          onEnter={this.handleChatBar}
          setName={this.setName}
          sendNotification={this.sendNotification}
          showColourMenu={this.showColourMenu} ></Chatbar>

      </div>
    );
  }
}
export default App;

