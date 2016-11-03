import React, {Component} from 'react';

class Message extends Component {
  componentDidMount() {
    //set colour of specific messages by their id
    let username = document.getElementById(this.props.MessageObj.messageid);
    username.style.color = this.props.MessageObj.colour;
  }
  render() {

    console.log("rendered message");
    return (
        <div className="message">
         <div className={this.props.MessageObj.className}>
          <span className="username" id={this.props.MessageObj.messageid}><b>{this.props.MessageObj.username}:</b></span>
          <span className="content">{this.props.MessageObj.content}</span>
         </div>
        </div>

    );
  }
}
export default Message;

