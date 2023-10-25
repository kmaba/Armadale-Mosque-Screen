import React, { Component } from 'react';
import moment from 'moment';
import './prayer-times-week-ahead.css';
import PrayerData from '../prayer-data/prayer-data';
import axios from 'axios';

class PrayerTimesWeekAhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prayerTimes: this.getPrayerTimes()
    };
  }

  getPrayerTimes(additional_days = 0) {
    var date = moment()
      .add(additional_days, 'days')
      .format('DD/MM/YYYY');
    var _data = new PrayerData();
    return _data.getPrayerTimes(date);
  }

  componentDidMount() {
    this.fetchPrayerTimes();
  }

  fetchPrayerTimes() {
    const city = "Perth";

    // Get the current year and month
    const currentYear = moment().year();
    const currentMonth = moment().month() + 1;

    // Fetch prayer times from the Aladhan API
    axios
      .get(
        `http://api.aladhan.com/v1/calendarByCity?city=${city}&country=Australia&method=2&month=${currentMonth}&year=${currentYear}`
      )
      .then((response) => {
        const data = response.data.data.slice(0, 7); // Limit to 7 days
        this.setState({ prayerTimes: data });
      })
      .catch((error) => {
        console.error('Error fetching prayer times:', error);
      });
  }

  render() {
    const rows = this.state.prayerTimes.map((day, index) => {
      const date = moment(day.date.readable, 'DD MMMM YYYY').format('ddd D MMM');
      return (
        <tr key={index} className="PrayerTimesWeekAhead-row">
          <td>{index === 0 ? moment().format('ddd D MMM') : date}</td>
          <td>{day.timings.Fajr.replace(' (AWST)', '')}</td>
          <td>{times['fajr_jamaah']}</td>
          <td>{day.timings.Dhuhr.replace(' (AWST)', '')}</td>
          <td>{times['zuhr_jamaah']}</td>
          <td>{day.timings.Asr.replace(' (AWST)', '')}</td>
          <td>{times['asr_jamaah']}</td>
          <td>{day.timings.Maghrib.replace(' (AWST)', '')}</td>
          <td>{times['maghrib_jamaah']}</td>
          <td>{day.timings.Isha.replace(' (AWST)', '')}</td>
          <td>{times['isha_jamaah']}</td>
        </tr>
      );
    });

    return (
      <div className="PrayerTimesWeekAheadWrapper">
        <table className="PrayerTimesWeekAhead">
          <thead>
            <tr>
            <th>Week ahead</th>
              <th colSpan="3">Fajr</th>
              <th colSpan="2">Zuhr</th>
              <th colSpan="2">Asr</th>
              <th colSpan="2">Maghrib</th>
              <th colSpan="2">Isha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td />
              {/* FAJR */}
              <td>Begins</td>
              <td>Jama'ah</td>

              {/* ZUHR */}
              <td>Begins</td>
              <td>Jama'ah</td>

              {/* ASR */}
              <td>Begins</td>
              <td>Jama'ah</td>

              {/* MAGHRIB */}
              <td>Begins</td>
              <td>Jama'ah</td>

              {/* ISHA */}
              <td>Begins</td>
              <td>Jama'ah</td>
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PrayerTimesWeekAhead;
