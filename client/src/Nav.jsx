import React, {Component} from 'react';




class Nav extends Component {

  render() {

    return (
        <nav>
          <h1>Chatty</h1>
          <h4 id="userCount">User Count: {this.props.userCount} </h4>
        </nav>
    );
  }

}

export default Nav;