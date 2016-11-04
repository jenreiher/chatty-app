import React, {Component} from 'react';

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
          <div className="colour-grid" ref={document.querySelector(".colour-grid")}>
            <div className="colour-row">
              <div className="colour-block" id="colour1" onClick={this.handleMenuClick} data-colour="#5853b2"></div>
              <div className="colour-block" id="colour2" onClick={this.handleMenuClick} data-colour="#ad67d3"></div>
              <div className="colour-block" id="colour3" onClick={this.handleMenuClick} data-colour="#d367bc"></div>
            </div>
            <div className="colour-row">
              <div className="colour-block" id="colour4" onClick={this.handleMenuClick} data-colour="#bc2323"></div>
              <div className="colour-block" id="colour5" onClick={this.handleMenuClick} data-colour="#23b7bc"></div>
              <div className="colour-block" id="colour6" onClick={this.handleMenuClick} data-colour="#23bc5b"></div>
            </div>
             <div className="colour-row">
              <div className="colour-block" id="colour7" onClick={this.handleMenuClick} data-colour="#727554"></div>
              <div className="colour-block" id="colour8" onClick={this.handleMenuClick} data-colour="#af6c28"></div>
              <div className="colour-block" id="colour9" onClick={this.handleMenuClick} data-colour=" black"></div>
            </div>

        </div>
      </footer>
    );
  }
}

export default ChatBar;
