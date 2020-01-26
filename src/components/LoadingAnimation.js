import React, {Component} from 'react';

class LoadingAnimation extends Component {
  render() {
    return (
      <div role="progressbar" className="mdc-linear-progress">
        <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
          <span className="mdc-linear-progress__bar-inner"></span>
        </div>
      </div>
    );
  }
}

export default LoadingAnimation;