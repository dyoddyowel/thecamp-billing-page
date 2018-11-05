import React, { Component } from 'react';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div>
        <h1>Holiday Survival Program</h1>
        <h3>Black Tie/Black Dress</h3>
        <div id="img-wrapper">
          <img src="/blacktie.jpg" alt="Landing page" />
        </div>
        <br />
        <div id="header-text">Join the <span className="bold">Holiday Survival Program</span> and for just <span className="bold">$97</span> you get:</div>
        <br />
        <ul>
          <li>Unlimited sessions @ The Camp 7 days/week for 4 weeks</li>
          <li>Best Alcoholic Beverages to Minimize Holiday Weight Gain</li>
          <li>Healthy Holiday Recipes</li>
          <li>Custom step-by-step nutrition program</li>
          <li>40 page manual</li>
        </ul>
      </div>
    );
  }
}

export default LandingPage;