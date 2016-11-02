import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  //set initial state with constructor**
  constructor(props) {
    super(props);
    this.state = { data : {
        currentUser : {},
        messages : []
      }
    }
    this.handleChatBar = this.handleChatBar.bind(this);
  }

  componentDidMount() {

  }
  handleChatBar (messageObject) {
    const messageArray = this.state.data.messages;
    let currentUser = messageObject.username;
    if (!messageObject.username) {
      currentUser = "Anonymous";
    }
    messageArray.push({
      username: currentUser,
      content: messageObject.content,
      id: messageObject.id});
      this.setState( {data : {
        currentUser : currentUser,
        messages : messageArray
     }})
  }
  render() {
    console.log("rendered app");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>

          <MessageList messageData={this.state.data.messages}></MessageList>

        <Chatbar currentUser={this.state.data.currentUser.name} onEnter={this.handleChatBar}></Chatbar>
      </div>
    );
  }
}
export default App;

