import React, { Component } from 'react';
import './jummah-times.css';
import moment from 'moment/moment';
import AppConfig from '../app-config/app-config';

class JummahTimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _appConfig: new AppConfig()
    };
  }

  getDST() {
    return this.getNextFriday().isDST();
  }

  getNextFriday() {
    const dayINeed = 5;

    if (moment().isoWeekday() <= dayINeed) {
      return moment().isoWeekday(dayINeed);
    } else {
      return moment()
        .add(1, 'weeks')
        .isoWeekday(dayINeed);
    }
  }

  getJummahTimes(prefix = 'Jummah') {
    var summerTimes = {
      slot_1: this.state._appConfig.get(`${prefix}_slot_1_summer`),
      slot_2: this.state._appConfig.get(`${prefix}_slot_2_summer`)
    };

    var winterTimes = {
      slot_1: this.state._appConfig.get(`${prefix}_slot_1_winter`),
      slot_2: this.state._appConfig.get(`${prefix}_slot_2_winter`)
    };
    return this.getDST() ? summerTimes : winterTimes;
  }

  render() {
    const scaleStyle = {
      transform: 'scale(0.8)',
      transformOrigin: 'center center'
    };

    return (
      <div className="JummahTimesWrapper" style={scaleStyle}>
        <table className="JummahTimesTable">
          <thead>
            <tr>
              <th />
              <th>{this.state._appConfig.get('Jummah_slot_1_label')}</th>
              <th>{this.state._appConfig.get('Jummah_slot_2_label')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jumuah 1</td>
              <td>{this.getJummahTimes('Jummah')['slot_1']}</td>
              <td>{this.getJummahTimes('Jummah')['slot_2']}</td>
            </tr>
            <tr>
              <td>Jumuah 2</td>
              <td>{this.getJummahTimes('Jummah2')['slot_1']}</td>
              <td>{this.getJummahTimes('Jummah2')['slot_2']}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default JummahTimes;
