import React,  {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("rendered messagelist");
    console.log(this.props.messageData, "message data from messagelist")

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

//better way of renderig this

//should not need to rerender the whole entire array...
//instead if we could find a way to append a dom node of <Message>