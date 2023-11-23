import React, { Component } from 'react';
import './GoogleSlides.css';
import JummahTimes from '../_components/jummah-times/jummah-times';
import PrayerTimes from '../_components/prayer-times/prayer-times';
import config from '../config.json';

class GoogleSlides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:
        config.googleSlides && config.googleSlides.url
          ? config.googleSlides.url
          : ''
    };
  }

  componentWillMount() {
    document.body.className = 'body_GoogleSlides';
  }

  componentWillUnmount() {
    document.body.className = null;
  }

  render() {
    return (
      <div>
        <div
          className="GoogleSlides"
          style={{ position: 'relative', width: '100vw', height: '100vh' }}
        >
          <iframe
            title="GoogleSlidesIframe"
            src={this.state.url}
            frameBorder="0"
            border="0"
            width="100%"
            height="100%"
            allowFullScreen="true"
          />
          <div
            className="content-over-slides"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="row"></div>
              </div>
              <div className="col-12 col-md-6">
                <div className="row">
                  <PrayerTimes />
                </div>
                <div className="col-12 col-md-6">
                  <div className="row">
                    <PrayerTimes />
                  </div>
                  <div className="row">
                    <JummahTimes />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleSlides;
