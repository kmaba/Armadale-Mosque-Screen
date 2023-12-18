import React, { Component } from 'react';
import moment from 'moment';
import './clock.css';
import AppConfig from '../app-config/app-config';

class Clock extends Component {
  constructor(props) {
    super(props);
    var _appConfig = new AppConfig();
    var format = _appConfig.get('time_format')
      ? _appConfig.get('time_format')
      : 'h:mm A';

    this.state = {
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

  updateTime() {
    // Get the current date and time
    const now = new Date();

    // Get the hours, minutes, and seconds
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Convert the hours, minutes, and seconds to strings
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');

    // Combine the hours, minutes, and seconds into a single string
    const timeStr = hoursStr + minutesStr + secondsStr;

    // Update each digit of the clock
    for (let i = 0; i < 6; i++) {
      // Get the digit element
      const digitElement = this.element.querySelectorAll('[data-digit]')[i];
      if (!digitElement) return;

      // Get the new digit value
      const newDigitValue = Number(timeStr[i]);

      // Update the digit element
      digitElement.setAttributeNS(null, 'data-digit', newDigitValue);
    }
  }

  componentDidMount() {
    this.element = document.querySelector('.Clock');
    this.updateTime();
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentDidUpdate() {
    this.updateTime();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className="ClockWrapper">
        <svg className="Clock" viewBox="0 0 80 20" role="img">
          <svg className="Clock" viewBox="0 0 80 20" role="img">
            <g fill="currentColor">
              <circle cx="25.5" cy="6" r="1" />
              <circle cx="25.5" cy="14" r="1" />
              <circle cx="54.5" cy="6" r="1" />
              <circle cx="54.5" cy="14" r="1" />
            </g>
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g data-digit="0">
                <polyline
                  className="clock__digit"
                  strokeDasharray="53 53"
                  strokeDashoffset="-53"
                  points="1 1,9 1,9 19,1 19,1 1"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="19 19"
                  strokeDashoffset="-19"
                  points="9 1,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="43 43"
                  strokeDashoffset="-43"
                  points="1 1,9 1,9 10,1 10,1 19,9 19"
                />
              </g>
              <g data-digit="0" transform="translate(12,0)">
                <polyline
                  className="clock__digit"
                  strokeDasharray="53 53"
                  strokeDashoffset="-53"
                  points="1 1,9 1,9 19,1 19,1 1"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="19 19"
                  strokeDashoffset="-19"
                  points="9 1,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="43 43"
                  strokeDashoffset="-43"
                  points="1 1,9 1,9 10,1 10,1 19,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="51 51"
                  strokeDashoffset="-51"
                  points="1 1,9 1,9 10,1 10,9 10,9 19,1 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="45 45"
                  strokeDashoffset="-45"
                  points="1 1,1 10,9 10,9 1,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="43 43"
                  strokeDashoffset="-43"
                  points="9 1,1 1,1 10,9 10,9 19,1 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="52 52"
                  strokeDashoffset="-52"
                  points="9 1,1 1,1 19,9 19,9 10,1 10"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="27 27"
                  strokeDashoffset="-27"
                  points="1 1,9 1,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="61 61"
                  strokeDashoffset="-61"
                  points="9 10,1 10,1 1,9 1,9 19,1 19,1 10"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="52 52"
                  strokeDashoffset="-52"
                  points="9 10,1 10,1 1,9 1,9 19,1 19"
                />
              </g>
              <g data-digit="0" transform="translate(29,0)">
                <polyline
                  className="clock__digit"
                  strokeDasharray="53 53"
                  strokeDashoffset="-53"
                  points="1 1,9 1,9 19,1 19,1 1"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="19 19"
                  strokeDashoffset="-19"
                  points="9 1,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="43 43"
                  strokeDashoffset="-43"
                  points="1 1,9 1,9 10,1 10,1 19,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="51 51"
                  strokeDashoffset="-51"
                  points="1 1,9 1,9 10,1 10,9 10,9 19,1 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="45 45"
                  strokeDashoffset="-45"
                  points="1 1,1 10,9 10,9 1,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="43 43"
                  strokeDashoffset="-43"
                  points="9 1,1 1,1 10,9 10,9 19,1 19"
                />
              </g>
              <g data-digit="0" transform="translate(41,0)">
                <polyline
                  className="clock__digit"
                  strokeDasharray="53 53"
                  strokeDashoffset="-53"
                  points="1 1,9 1,9 19,1 19,1 1"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="19 19"
                  strokeDashoffset="-19"
                  points="9 1,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="43 43"
                  strokeDashoffset="-43"
                  points="1 1,9 1,9 10,1 10,1 19,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="51 51"
                  strokeDashoffset="-51"
                  points="1 1,9 1,9 10,1 10,9 10,9 19,1 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="45 45"
                  strokeDashoffset="-45"
                  points="1 1,1 10,9 10,9 1,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="43 43"
                  strokeDashoffset="-43"
                  points="9 1,1 1,1 10,9 10,9 19,1 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="52 52"
                  strokeDashoffset="-52"
                  points="9 1,1 1,1 19,9 19,9 10,1 10"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="27 27"
                  strokeDashoffset="-27"
                  points="1 1,9 1,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="61 61"
                  strokeDashoffset="-61"
                  points="9 10,1 10,1 1,9 1,9 19,1 19,1 10"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="52 52"
                  strokeDashoffset="-52"
                  points="9 10,1 10,1 1,9 1,9 19,1 19"
                />
              </g>
              <g data-digit="0" transform="translate(58,0)">
                <polyline
                  className="clock__digit"
                  strokeDasharray="53 53"
                  strokeDashoffset="-53"
                  points="1 1,9 1,9 19,1 19,1 1"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="19 19"
                  strokeDashoffset="-19"
                  points="9 1,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="43 43"
                  strokeDashoffset="-43"
                  points="1 1,9 1,9 10,1 10,1 19,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="51 51"
                  strokeDashoffset="-51"
                  points="1 1,9 1,9 10,1 10,9 10,9 19,1 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="45 45"
                  strokeDashoffset="-45"
                  points="1 1,1 10,9 10,9 1,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="43 43"
                  strokeDashoffset="-43"
                  points="9 1,1 1,1 10,9 10,9 19,1 19"
                />
              </g>
              <g data-digit="0" transform="translate(70,0)">
                <polyline
                  className="clock__digit"
                  strokeDasharray="53 53"
                  strokeDashoffset="-53"
                  points="1 1,9 1,9 19,1 19,1 1"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="19 19"
                  strokeDashoffset="-19"
                  points="9 1,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="43 43"
                  strokeDashoffset="-43"
                  points="1 1,9 1,9 10,1 10,1 19,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="51 51"
                  strokeDashoffset="-51"
                  points="1 1,9 1,9 10,1 10,9 10,9 19,1 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="45 45"
                  strokeDashoffset="-45"
                  points="1 1,1 10,9 10,9 1,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="43 43"
                  strokeDashoffset="-43"
                  points="9 1,1 1,1 10,9 10,9 19,1 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="52 52"
                  strokeDashoffset="-52"
                  points="9 1,1 1,1 19,9 19,9 10,1 10"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="27 27"
                  strokeDashoffset="-27"
                  points="1 1,9 1,9 19"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="61 61"
                  strokeDashoffset="-61"
                  points="9 10,1 10,1 1,9 1,9 19,1 19,1 10"
                />
                <polyline
                  className="clock__digit"
                  strokeDasharray="52 52"
                  strokeDashoffset="-52"
                  points="9 10,1 10,1 1,9 1,9 19,1 19"
                />
              </g>
            </g>
          </svg>
        </svg>
      </div>
    );
  }
}

export default Clock;
