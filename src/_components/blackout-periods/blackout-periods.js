import React, { Component } from 'react';
import PrayerData from '../prayer-data/prayer-data';
import moment from 'moment/moment';
import View6 from '../../Views/View 6/View6';
import axios from 'axios';
import AppConfig from '../app-config/app-config';

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
      }
    };
  }

  getPrayerTimes() {
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

          var date = moment().format('DD/MM/YYYY');
          var _data = new PrayerData();
          var currentDay = _data.getPrayerTimes(date);

          let data = todayData.timings;
          const prayerTimes = {
            fajr: `${currentDay['fajr_jamaah']} AM`,
            zuhr: `${currentDay['zuhr_jamaah']} PM`,
            asr: `${currentDay['asr_jamaah']} PM`,
            maghrib: `${moment(data['Maghrib'].replace(' (AWST)', ''), 'HH:mm')
              .add(10, 'minutes')
              .format('h:mm')} PM`,
            isha: `${currentDay['isha_jamaah']} PM`
          };
          resolve(prayerTimes);
        })
        .catch(error => {
          console.error('Error fetching prayer times:', error);
          reject(error);
        });
    });
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
