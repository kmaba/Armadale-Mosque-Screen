import React, { Component } from 'react';
import moment from 'moment';
import './prayer-times-week-ahead.css';
import axios from 'axios';
import PrayerData from '../prayer-data/prayer-data';

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
        const data = response.data.data.slice(0, 7); // Limit to 7 days
        this.setState({ prayerTimes: data });
      })
      .catch((error) => {
        console.error('Error fetching prayer times:', error);
      });
  }

  getPrayerTimes(additional_days = 0) {
    const currentDate = moment();
    const targetDate = currentDate.clone().add(additional_days, 'days');
    const prayerData = new PrayerData();
    const jamahTimes = prayerData.getPrayerTimes(targetDate.format('DD/MM/YYYY'));

    return jamahTimes;
  }

  render() {
    const currentDate = moment();
    const rows = this.state.prayerTimes.map((day, index) => {
      const date = currentDate.clone().add(index, 'days').format('ddd D MMM');
      const prayerData = this.getPrayerTimes(index);
      const FajrBegins = day.timings.Fajr.replace(' (AWST)', '')
      const DhuhrBegins = day.timings.Dhuhr.replace(' (AWST)', '')
      const AsrBegins = day.timings.Asr.replace(' (AWST)', '')
      const MaghribBegins = day.timings.Maghrib.replace(' (AWST)', '')
      const IshaBegins = day.timings.Isha.replace(' (AWST)', '')
      return (
        <tr key={index} className="PrayerTimesWeekAhead-row">
          <td>{date}</td>
          <td>{moment(FajrBegins, 'HH:mm').format('h:mm')}</td>
          <td>{prayerData.fajr_jamaah}</td>
          <td>{moment(DhuhrBegins, 'HH:mm').format('h:mm')}</td>
          <td>{prayerData.zuhr_jamaah}</td>
          <td>{moment(AsrBegins, 'HH:mm').format('h:mm')}</td>
          <td>{prayerData.asr_jamaah}</td>
          <td>{moment(MaghribBegins, 'HH:mm').format('h:mm')}</td>
          <td>{prayerData.maghrib_jamaah}</td>
          <td>{moment(IshaBegins, 'HH:mm').format('h:mm')}</td>
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
              <th colSpan="2">Fajr</th>
              <th colSpan="2">Zuhr</th>
              <th colSpan="2">Asr</th>
              <th colSpan="2">Maghrib</th>
              <th colSpan="2">Isha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td>Begins</td>
              <td>Jama'ah</td>
              <td>Begins</td>
              <td>Jama'ah</td>
              <td>Begins</td>
              <td>Jama'ah</td>
              <td>Begins</td>
              <td>Jama'ah</td>
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
