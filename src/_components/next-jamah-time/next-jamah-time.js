import React, { Component } from 'react';
import './next-jamah-time.css';
import moment from 'moment';
import axios from 'axios';
import PrayerData from '../prayer-data/prayer-data';

class NextJammahTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setMaghribTime: null,
      nextJammahTime: null
    };
  }

  componentDidMount() {
    this.fetchMagribTimes().then(() => {
      this.setState({ nextJammahTime: this.getNextJammahTime() });
    });
  }

  fetchMagribTimes() {
    return new Promise((resolve, reject) => {
      const city = 'Perth';
      const country = 'Australia';
      const currentDate = moment();
      const currentYear = currentDate.year();
      const currentMonth = currentDate.month() + 1;
      const currentDay = currentDate.date();

      axios
        .get(
          `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=4&month=${currentMonth}&year=${currentYear}`
        )
        .then(response => {
          // Find today's data in the response
          const todayData = response.data.data.find(
            dayData =>
              moment(dayData.date.readable, 'DD MMM YYYY').date() === currentDay
          );

          let data = todayData.timings;
          const mTime = moment(data['Maghrib'].replace(' (AWST)', ''), 'HH:mm')
            .add(10, 'minutes')
            .format('h:mm A');
          this.setState({ setMaghribTime: mTime }, resolve);
        })
        .catch(error => {
          console.error('Error fetching prayer times:', error);
          reject(error);
        });
    });
  }

  getTodaysPrayerTime() {
    var date = moment().format('DD/MM/YYYY');
    var _data = new PrayerData();
    return _data.getPrayerTimes(date);
  }

  getTomorrowsPrayerTime() {
    var date = moment()
      .add(1, 'days')
      .format('DD/MM/YYYY');
    var _data = new PrayerData();
    return _data.getPrayerTimes(date);
  }

  getCurrentTime() {
    return moment().format('HH:mm');
  }

  stringToTime(stringTime) {
    return moment(stringTime, 'HH:mm a').format('HH:mm');
  }

  getNextJammahTime() {
    var currentDate = this.getTodaysPrayerTime();
    var tomorrowsPrayerTime = this.getTomorrowsPrayerTime();
    var currentTime = this.getCurrentTime();
    if (this.stringToTime(`${currentDate['fajr_jamaah']} AM`) > currentTime) {
      return {
        name: 'Fajr',
        time: `${currentDate['fajr_jamaah']} AM`
      };
    }

    if (this.stringToTime(`${currentDate['zuhr_jamaah']} PM`) > currentTime) {
      return {
        name: 'Dhuhr',
        time: `${currentDate['zuhr_jamaah']} PM`
      };
    }

    if (this.stringToTime(`${currentDate['asr_jamaah']} PM`) > currentTime) {
      return {
        name: 'Asr',
        time: `${currentDate['asr_jamaah']} PM`
      };
    }

    if (this.stringToTime(`${this.state.setMaghribTime} PM`) > currentTime) {
      return {
        name: 'Maghrib',
        time: `${this.state.setMaghribTime}`
      };
    }

    if (this.stringToTime(`${currentDate['isha_jamaah']} PM`) > currentTime) {
      return {
        name: 'Isha',
        time: `${currentDate['isha_jamaah']} PM`
      };
    }

    // if none return the next day fajr
    return {
      name: 'Fajr',
      time: `${tomorrowsPrayerTime['fajr_jamaah']} AM`
    };
  }

  render() {
    const { nextJammahTime } = this.state;

    return (
      <div className="NextJammahTimeWrapper">
        <table className="NextJammahTime">
          <thead>
            <tr>
              <th>Next Iqamah</th>
            </tr>
          </thead>
          <tbody>
            {nextJammahTime && (
              <>
                <tr>
                  <td>{nextJammahTime.name}</td>
                </tr>
                <tr>
                  <td>{nextJammahTime.time}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default NextJammahTime;
