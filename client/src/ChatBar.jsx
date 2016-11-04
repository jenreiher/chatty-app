import React, {Component} from 'react';
import Colour_grid from './Colour-grid.jsx'

class ChatBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username : "",
      "content" : "",
      "colourMenu": "",
      "colour" : "black"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount() {
    this.setState( {colourMenu: document.querySelector(".colour-grid")});
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
    let content = this.state.content.trim();
    let username = this.state.username.trim();

    //on enter key and  if message content is not empty
    if(event.keyCode === 13 && content.length > 0) {
      //if name is empty
      if(!username) {
        this.setState({username: "Anonymous"});
      }
      //check for name change
      if(username !== this.props.currentUser) {
        this.props.sendNotification(this.state.username);
      }
      //sends state to Parent to be sent to ws server
      this.props.onEnter({
        username: this.state.username,
        content: this.state.content,
        colour: this.state.colour
      });
      //clear input field
      this.setState({content: ""})
    }
  }

  handleMenuClick(event) {
    event.stopPropagation();
    switch (event.target.className) {
      case "textcolour-menu btn-group":
        this.props.showColourMenu(this.state.colourMenu);
        break;
      case "colour-block":
        this.setState({"colour" : event.target.dataset.colour});
        this.props.showColourMenu(this.state.colourMenu);
        console.log("it worked")
        break;
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


        <span className="textcolour-menu btn-group" onClick={this.handleMenuClick}>Colour</span>
        <Colour_grid handleMenuClick={this.handleMenuClick} />
      </footer>
    );
  }
}

export default ChatBar;
