import React, { Component } from 'react';
import './View6Timer.css';
import Logo from '../../_components/logo/logo';
import BuildNumber from '../../_components/build-number/build-number';
import Branding from '../../_components/branding/branding';

class View6Timer extends Component {
  state = {
    countdown: 600
  };

  componentDidMount() {
    document.body.style.background = 'black';

    this.timer = setInterval(() => {
      this.setState(prevState => ({
        countdown: prevState.countdown - 1
      }));

      if (this.state.countdown <= 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  componentWillUnmount() {
    document.body.style.background = null;
    clearInterval(this.timer);
  }

  render() {
    const minutes = Math.floor(this.state.countdown / 60);
    const seconds = this.state.countdown % 60;

    return (
      <div className="View6Timer BlackoutWrapper d-flex justify-content-center">
        <div className="row blackout-logo">
          <Logo />
        </div>
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="row blackout-mobile-message">
              <i>Iqamah is coming!</i>
            </div>
            <div className="row blackout-clock text-center">
              <h1 style={{ fontSize: '200px', margin: '0 10px 0 0' }}>
                T-{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
              </h1>
            </div>
          </div>
        </div>
        <BuildNumber />
        <Branding />
      </div>
    );
  }
}

export default View6Timer;
