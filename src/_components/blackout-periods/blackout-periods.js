import React, { Component } from 'react';
import PrayerData from '../prayer-data/prayer-data';
import moment from 'moment/moment';
import View6 from '../../Views/View 6/View6';
import AppConfig from '../app-config/app-config';
import axios from 'axios';

class BlackoutPeriods extends Component {
  constructor(props) {
    super(props);
    var _appConfig = new AppConfig();
    this.state = {
      blackOutSlide: <View6 />,
      blackOutPeriods: {
        fajr: _appConfig.get('blackOutPeriod_fajr'),
        zuhr: _appConfig.get('blackOutPeriod_zuhr'),
        asr: _appConfig.get('blackOutPeriod_asr'),
        maghrib: _appConfig.get('blackOutPeriod_maghrib'),
        isha: _appConfig.get('blackOutPeriod_isha'),
        jummah: _appConfig.get('blackOutPeriod_jummah')
      },
      prayerTimes: {},
      jamaahTimes: {}
    };
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
        `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=3&month=${currentMonth}&year=${currentYear}`
      )
      .then(response => {
        // Find today's data in the response
        const todayData = response.data.data.find(
          dayData =>
            moment(dayData.date.readable, 'DD MMM YYYY').date() === currentDay
        );

        let data = todayData.timings; // Get today's prayer times

        // Remove "(AWST)" and convert time format
        for (let key in data) {
          data[key] = moment(data[key].replace(' (AWST)', ''), 'HH:mm').format(
            'h:mm'
          );
        }

        this.setState({ prayerTimes: data });

        // Get jamaah times from prayer-data.js
        const prayerData = new PrayerData();
        const jamaahTimes = prayerData.getPrayerTimes(
          currentDate.format('DD/MM/YYYY')
        );

        // Add 10 minutes to Maghrib prayer time
        jamaahTimes['maghrib_jamaah'] = moment(
          this.state.prayerTimes['Maghrib'],
          'h:mm'
        )
          .add(10, 'minutes')
          .format('h:mm');

        this.setState({ jamaahTimes });
      })
      .catch(error => {
        console.error('Error fetching prayer times:', error);
      });
  }

  getPrayerTimes() {
    var date = moment().format('DD/MM/YYYY');
    var _data = new PrayerData();
    var currentDay = _data.getPrayerTimes(date);
    var prayerTimes = {
      fajr: moment(`${currentDay['fajr_jamaah']} AM`, 'h:mm A')
        .subtract(1, 'minutes')
        .format('h:mm A'),
      zuhr: moment(`${currentDay['zuhr_jamaah']} PM`, 'h:mm A')
        .subtract(1, 'minutes')
        .format('h:mm A'),
      asr: moment(`${currentDay['asr_jamaah']} PM`, 'h:mm A')
        .subtract(1, 'minutes')
        .format('h:mm A'),
      maghrib: moment(`${currentDay['maghrib_jamaah']} PM`, 'h:mm A')
        .subtract(1, 'minutes')
        .format('h:mm A'),
      isha: moment(`${currentDay['isha_jamaah']} PM`, 'h:mm A')
        .subtract(1, 'minutes')
        .format('h:mm A')
    };
    return prayerTimes;
  }

  getCurrentTime() {
    return moment().format('HH:mm');
  }

  stringToTime(stringTime) {
    return moment(stringTime, 'HH:mm a').format('HH:mm');
  }

  getBlackoutEndTime(time, duration = 10) {
    return moment(time, 'HH:mm a')
      .add(duration, 'minutes')
      .format('HH:mm');
  }

  isJummahPeriod(prayerName) {
    return moment().day() === 5 && prayerName === 'zuhr';
  }

  isBlackout(prayerName) {
    // return true; // for testing
    var todaysPrayerTime = this.getPrayerTimes();
    var durations = this.state.blackOutPeriods;
    var currentTime = this.getCurrentTime();
    var isJummahPeriod = this.isJummahPeriod(prayerName);

    if (
      currentTime >= this.stringToTime(todaysPrayerTime[prayerName]) &&
      currentTime <=
        this.getBlackoutEndTime(
          this.stringToTime(todaysPrayerTime[prayerName]),
          isJummahPeriod ? durations['jummah'] : durations[prayerName]
        )
    ) {
      return true;
    } else return false;
  }

  checkIfBlackoutPeriod() {
    if (this.isBlackout('fajr')) return true;
    else if (this.isBlackout('zuhr')) return true;
    else if (this.isBlackout('asr')) return true;
    else if (this.isBlackout('maghrib')) return true;
    else if (this.isBlackout('isha')) return true;
    else return false;
  }
}

export default BlackoutPeriods;
