import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
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
    if(event.keyCode === 13) {
      this.setState({id : this.state.id + 1})
      this.props.onEnter(this.state);
      this.setState({content: ""})
    }
  }
  render() {
    console.log("rendered chatbar");
    return (
      <footer>
        <input className="form-control" id="username" type="text" placeholder="Your Name (Optional)" value={this.state.username} onChange={this.handleChange} onKeyUp={this.handleEnter} />
        <input className="form-control" id="new-message" type="text" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.handleChange} onKeyUp={this.handleEnter} />
      </footer>
    );
  }
}

export default ChatBar;