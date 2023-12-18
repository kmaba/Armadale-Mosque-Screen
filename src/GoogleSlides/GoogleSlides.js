import React, { Component } from 'react';
import './GoogleSlides.css';
import AppConfig from '../_components/app-config/app-config';
import JummahTimes from '../_components/jummah-times/jummah-times';
import PrayerTimes from '../_components/prayer-times/prayer-times';
import config from '../config.json';
import moment from 'moment';

class GoogleSlides extends Component {
  constructor(props) {
    super(props);
    var _appConfig = new AppConfig();
    var format = _appConfig.get('time_format')
      ? _appConfig.get('time_format')
      : 'h:mm A';
    this.state = {
      url:
        config.googleSlides && config.googleSlides.url
          ? config.googleSlides.url
          : '',
      time: this.getTime(format),
      format: format
    };
  }

  getTime(format = 'h:mm A') {
    return moment().format(format);
  }

  tick() {
    this.setState(() => ({
      time: this.getTime(this.state.format)
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
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
                <div className="row">
                  <JummahTimes />
                </div>
                <div className=".col-md-6">
                  <div className="Clock">
                    <a style={{ opacity: '0%' }}>--/</a>
                    {this.state.time}
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
