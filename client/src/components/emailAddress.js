import React, { Component } from 'react';
import LandingPage from './landingPage';
import validator from "email-validator";
 

class EmailForm extends Component {
  constructor(props) {
    super();
    this.state = {
      input: "",
      isDisabled: true
    }
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
    if(validator.validate(e.target.value) && e.target.value > '') {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }
  
  clickHandler = (e) => {
      e.preventDefault();
      let x = {
        "Email": this.state.input
      }
      this.props.saveData(x);
  }

  emailChange = (e) => {
    validator.validate(e.target.value);
  }

  render() {
    return(
      <div>
        <LandingPage />
        <div id="email-box">
          <h3>Join Our Program</h3>
          <div>
            <input type="text" placeholder="Email Address" onChange={this.handleChange} />
          </div>
          <div>
            <button onClick={this.clickHandler} disabled={this.state.isDisabled}>Get Started</button>
          </div>
        </div>
      </div>
    );
  }
}

export default EmailForm;