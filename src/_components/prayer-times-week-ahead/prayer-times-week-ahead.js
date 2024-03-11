import React, { Component } from 'react';
import moment from 'moment';
import './prayer-times-week-ahead.css';
import axios from 'axios';
import PrayerData from '../prayer-data/prayer-data';

class PrayerTimesWeekAhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prayerTimes: []
    };
  }

  componentDidMount() {
    this.fetchPrayerTimes();
  }

  fetchPrayerTimes() {
    const city = 'Perth';
    const country = 'Australia';

    // Get the current year, month, and day
    const currentDate = moment();
    const currentYear = currentDate.year();
    const currentMonth = currentDate.month() + 1;
    const currentDay = currentDate.date();

    // Fetch prayer times from the Aladhan API starting from the current date
    axios
      .get(
        `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=2&month=${currentMonth}&year=${currentYear}`
      )
      .then(response => {
        // Find today's data in the response
        const todayIndex = response.data.data.findIndex(
          dayData =>
            moment(dayData.date.readable, 'DD MMM YYYY').date() === currentDay
        );

        const data = response.data.data.slice(todayIndex, todayIndex + 7); // Get data for today and the next 6 days
        this.setState({ prayerTimes: data });
      })
      .catch(error => {
        console.error('Error fetching prayer times:', error);
      });
  }

  getPrayerTimes(additional_days = 0) {
    const currentDate = moment();
    const targetDate = currentDate.clone().add(additional_days, 'days');
    const prayerData = new PrayerData();
    const jamahTimes = prayerData.getPrayerTimes(
      targetDate.format('DD/MM/YYYY')
    );

    return jamahTimes;
  }

  render() {
    const currentDate = moment();
    const rows = this.state.prayerTimes.map((day, index) => {
      const date = currentDate
        .clone()
        .add(index, 'days')
        .format('ddd D MMM');
      const prayerData = this.getPrayerTimes(index);
      const MaghribAzaan = day.timings.Maghrib.replace(' (AWST)', '');
      return (
        <tr key={index} className="PrayerTimesWeekAhead-row">
          <td>{date}</td>
          <td>{prayerData.fajr_jamaah}</td>
          <td>{prayerData.zuhr_jamaah}</td>
          <td>{prayerData.asr_jamaah}</td>
          <td>
            {moment(MaghribAzaan, 'HH:mm')
              // .add(10, 'minutes')
              .add(20, 'minutes')
              .format('h:mm')}
          </td>
          <td>{prayerData.isha_jamaah}</td>
        </tr>
      );
    });

    return (
      <div className="PrayerTimesWeekAheadWrapper">
        <table className="PrayerTimesWeekAhead">
          <thead>
            <tr>
              <th>Week ahead</th>
              <th>Fajr</th>
              <th>Dhuhr</th>
              <th>Asr</th>
              <th>Maghrib</th>
              <th>Isha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td>━━</td>
              <td>━━</td>
              <td>-Iqamah-</td>
              <td>━━</td>
              <td>━━</td>
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PrayerTimesWeekAhead;
