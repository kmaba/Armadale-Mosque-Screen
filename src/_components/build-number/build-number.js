import React, { Component } from 'react';
import './build-number.css';

class BuildNumber extends Component {
  constructor(props) {
    super(props);
    this.state = { buildNumber: '' };
  }

  componentDidMount() {
    fetch(
      'https://api.github.com/repos/kmaba/armadale-mosque-screen/branches/main'
    )
      .then(response => response.json())
      .then(data => {
        const commitHash = data.commit.sha;
        const commitMessage = data.commit.commit.message;
        const build = commitMessage + '/' + commitHash.substring(0, 7);
        this.setState({ buildNumber: build });
      });
  }

  render() {
    return (
      <div className="BuildNumberWrapper">
        {'kmaba/armadale-mosque-screen - ' + this.state.buildNumber}
      </div>
    );
  }
}

export default BuildNumber;
