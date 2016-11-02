import React, {Component} from 'react';

class Message extends Component {
  render() {

    console.log("rendered message");
    return (
        <div className="message">
          <span className="username"><b>{this.props.MessageObj.username}:</b></span>
          <span className="content">{this.props.MessageObj.content}</span>
        </div>

    );
  }
}
export default Message;

