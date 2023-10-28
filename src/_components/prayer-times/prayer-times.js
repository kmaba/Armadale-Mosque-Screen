import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './prayer-times.css';
import PrayerData from '../prayer-data/prayer-data';

class PrayerTimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prayerTimes: [],
      jamaahTimes: {},
    };
  }

  componentDidMount() {
    this.fetchPrayerTimes();
  }

  fetchPrayerTimes() {
    const city = "Perth";
    const country = "Australia";

    // Get the current year, month, and day
    const currentDate = moment();
    const currentYear = currentDate.year();
    const currentMonth = currentDate.month() + 1;
    const currentDay = currentDate.date();

    // Fetch prayer times from the Aladhan API starting from the current date
    axios
      .get(
        `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=2&month=${currentMonth}&year=${currentYear}&day=${currentDay}`
      )
      .then((response) => {
        let data = response.data.data[0].timings; // Get today's prayer times

        // Remove "(AWST)" and convert time format
        for (let key in data) {
          data[key] = moment(data[key].replace(' (AWST)', ''), 'HH:mm').format('h:mm');
        }

        this.setState({ prayerTimes: data });

        // Get jamaah times from prayer-data.js
        const prayerData = new PrayerData();
        const jamaahTimes = prayerData.getPrayerTimes(currentDate.format('DD/MM/YYYY'));
        this.setState({ jamaahTimes });
      })
      .catch((error) => {
        console.error('Error fetching prayer times:', error);
      });
  }

  render() {
    if (!this.state.prayerTimes || !this.state.jamaahTimes)
      return (
        <>
          <h1>Loading</h1>
        </>
      );

    return (
      <div className="PrayerTimeWrapper">
        <table className="PrayerTimes">
          <thead>
            <tr>
              <th />
              <th />
              <th>Begins</th>
              <th>Jama'ah</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Fajr</th>
              <td />
              <td>{this.state.prayerTimes['Fajr']}</td>
              <td>{this.state.jamaahTimes['fajr_jamaah']}</td>
            </tr>
            <tr>
              <th>Dhuhr</th>
              <td />
              <td>{this.state.prayerTimes['Dhuhr']}</td>
              <td>{this.state.jamaahTimes['zuhr_jamaah']}</td>
            </tr>
            <tr>
              <th>Asr</th>
              <td />
              <td>{this.state.prayerTimes['Asr']}</td>
              <td>{this.state.jamaahTimes['asr_jamaah']}</td>
            </tr>
            <tr>
              <th>Maghrib</th>
              <td />
              <td>{this.state.prayerTimes['Maghrib']}</td>
              <td>{this.state.jamaahTimes['maghrib_jamaah']}</td>
            </tr>
            <tr>
              <th>Isha</th>
              <td />
              <td>{this.state.prayerTimes['Isha']}</td>
              <td>{this.state.jamaahTimes['isha_jamaah']}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PrayerTimes;
