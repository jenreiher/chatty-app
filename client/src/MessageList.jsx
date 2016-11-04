import React,  {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  constructor() {
    super();
    this.messageid = 0;
  }

  render() {
    console.log("rendered messagelist");
    return (
      <div id="message-list">

        {this.props.messageData.map((message) => {
          //increment a message id to keep track of specific messages for styling
            message.messageid = this.messageid;
            this.messageid++;
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

//message object will have colour property