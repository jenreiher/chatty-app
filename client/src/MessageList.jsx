import React,  {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("rendered messagelist");
    return (
      <div id="message-list">

        {this.props.messageData.map((message) => {
            return <Message key={message.id} MessageObj={message} />;
          })
        }
      </div>
    );
  }
}
export default MessageList;

     // <div className="message system">

     //      Anonymous1 changed their name to nomnom.
     //    </div>