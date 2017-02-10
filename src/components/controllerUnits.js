import React from 'react';

class ControllerUnits extends React.Component {
  
  handleClick (e) {
    e.stopPropagation();
    e.preventDefault();

    if (!this.props.arrange.isCenter) {
      this.props.center();
    } else {
      this.props.inverse();
    }
  }

  render () {

    let controllerUnitsClassName = 'controller-unit';
    controllerUnitsClassName += (this.props.arrange.isCenter) ? ' is-center' : '';
    controllerUnitsClassName += (this.props.arrange.isInverse) ? ' is-inverse' : '';

    return (
      <span className={controllerUnitsClassName} onClick={this.handleClick.bind(this)}></span>
    )
  }
}

export default ControllerUnits;