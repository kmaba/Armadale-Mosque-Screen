import React, { Component } from 'react';
import moment from 'moment';
import './prayer-times-week-ahead.css';
import axios from 'axios';

class PrayerTimesWeekAhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prayerTimes: [],
    };
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
          <td>{day.timings.Dhuhr.replace(' (AWST)', '')}</td>
          <td>{day.timings.Asr.replace(' (AWST)', '')}</td>
          <td>{day.timings.Maghrib.replace(' (AWST)', '')}</td>
          <td>{day.timings.Isha.replace(' (AWST)', '')}</td>
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
