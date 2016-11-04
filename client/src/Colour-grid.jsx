import React, {Component} from 'react';

class Colour_grid extends Component {

  render() {
    return(
      <div className="colour-grid" ref={document.querySelector(".colour-grid")}>
        <div className="colour-row">
          <div className="colour-block" id="colour1" onClick={this.props.handleMenuClick} data-colour="#5853b2"></div>
          <div className="colour-block" id="colour2" onClick={this.props.handleMenuClick} data-colour="#ad67d3"></div>
          <div className="colour-block" id="colour3" onClick={this.props.handleMenuClick} data-colour="#d367bc"></div>
        </div>

        <div className="colour-row">
          <div className="colour-block" id="colour4" onClick={this.props.handleMenuClick} data-colour="#bc2323"></div>
          <div className="colour-block" id="colour5" onClick={this.props.handleMenuClick} data-colour="#23b7bc"></div>
          <div className="colour-block" id="colour6" onClick={this.props.handleMenuClick} data-colour="#23bc5b"></div>
        </div>

         <div className="colour-row">
          <div className="colour-block" id="colour7" onClick={this.props.handleMenuClick} data-colour="#727554"></div>
          <div className="colour-block" id="colour8" onClick={this.props.handleMenuClick} data-colour="#af6c28"></div>
          <div className="colour-block" id="colour9" onClick={this.props.handleMenuClick} data-colour=" black"></div>
        </div>
      </div>
      );
  }
}

export default Colour_grid;