import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username : "",
      "content" : ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleChange (event) {
    const id = event.target.id;
    if(id === "username") {
      this.setState({username : event.target.value});
    } else if (id === "new-message") {
      this.setState({content: event.target.value});
    }
  }

  handleEnter (event) {
    var content = this.state.content.trim();
    var username = this.state.username.trim();

    //on enter key and  if message content is not empty
    if(event.keyCode === 13 && content.length > 0) {
      //check for name change
      if(this.state.username !== this.props.currentUser) {
        this.props.sendNotification(this.state.username);
      }
      //sends state to Parent to be sent to ws server
      this.props.onEnter(this.state);
      //clear input field
      this.setState({content: ""})
    }
  }
  render() {
    console.log("rendered chatbar");
    return (
      <footer>
        <input className="form-control"
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.state.username}
          onChange={this.handleChange}
          onKeyUp={this.handleEnter} />

        <input className="form-control"
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onChange={this.handleChange}
          onKeyUp={this.handleEnter} />


        <span className="textcolour-menu">Colour</span>
      </footer>
    );
  }
}

export default ChatBar;

//pick a color