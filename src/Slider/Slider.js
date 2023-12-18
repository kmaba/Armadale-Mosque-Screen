import React, { Component } from 'react';
import './Slider.css';
import View1 from '../Views/View 1/View1';
import View2 from '../Views/View 2/View2';
import View3 from '../Views/View 3/View3';
import View4 from '../Views/View 4/View4';
import View5 from '../Views/View 5/View5';
import View7 from '../Views/View 7/View7';
import SingleView from '../Views/SingleView/SingleView';
import GoogleSlides from '../GoogleSlides/GoogleSlides';
import config from '../config.json';
import BlackoutPeriods from '../_components/blackout-periods/blackout-periods';
import AppConfig from '../_components/app-config/app-config';

class Slider extends Component {
  constructor(props) {
    super(props);
    var _appConfig = new AppConfig();
    var sliderMode = _appConfig.get('sliderMode');
    this.state = {
      currentSlide:
        sliderMode === 'single-view'
          ? this.getSingleView()
          : this.getInitialSlide(),
      slides: this.getSlides(),
      currentPosition: 0,
      sliderMode: sliderMode || 'slider',
      slideTimeout: _appConfig.get('sliderTimeout') || 8000,
      googleSlides: {
        slide: <GoogleSlides />,
        totalCount:
          config.googleSlides && config.googleSlides.numberOfSlides
            ? config.googleSlides.numberOfSlides
            : 0,
        blur: false
      }
    };
  }

  getInitialSlide() {
    return <View1 />;
    // return [<View />];
  }

  getSingleView() {
    return <SingleView />;
  }

  getSlides() {
    return [<View1 />, <View4 />];
    // return [<View />];
  }

  next() {
    var blackoutPeriods = new BlackoutPeriods();
    if (blackoutPeriods.checkIfBlackoutPeriod()) {
      this.setState(() => ({
        currentSlide: blackoutPeriods.state.blackOutSlide,
        currentPosition: 0
      }));
    } else if (this.state.sliderMode === 'single-view') {
      this.setState(() => ({
        currentSlide: this.getSingleView()
      }));
    } else {
      this.nextSlide();
    }
  }

  nextSlide() {
    this.setState({ blur: true }, () => {
      var newSlidePosition = this.state.currentPosition + 1;
      var isLastSlide = newSlidePosition >= this.state.slides.length;

      if (isLastSlide) {
        this.showGoogleSlides();
        return;
      }

      setTimeout(() => {
        this.setState({
          currentSlide: this.state.slides[newSlidePosition],
          currentPosition: newSlidePosition,
          blur: false
        });
      }, 300); // adjust as needed
    });
  }

  showGoogleSlides() {
    this.setState(() => ({
      currentSlide: this.state.googleSlides.slide,
      blur: false // Turn off the blur
    }));
    this.stopInterval();
    var slideCount = 0;
    var _gSlideInterval = setInterval(() => {
      slideCount++;
      if (slideCount >= this.state.googleSlides.totalCount - 1) {
        clearInterval(_gSlideInterval);
        this.setState({
          // Reset the slider
          currentSlide: this.getInitialSlide(),
          currentPosition: 0,
          blur: false
        });
        this.startInterval(); // Restart the interval
      }
    }, this.state.slideTimeout);
  }

  startInterval() {
    this.interval = setInterval(() => this.next(), this.state.slideTimeout);
  }

  stopInterval() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.startInterval();
  }

  componentWillUnmount() {
    this.stopInterval();
  }

  render() {
    return (
      <div className={`slide ${this.state.blur ? 'blur' : ''}`}>
        {this.state.currentSlide}
      </div>
    );
  }
}

export default Slider;
