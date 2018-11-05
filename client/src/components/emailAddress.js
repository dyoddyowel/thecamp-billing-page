import React, { Component } from 'react';
import LandingPage from './landingPage';
import validator from "email-validator";
 

class EmailForm extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      phone: "",
      name: "",
      isDisabled: true
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state)
    });
    if(validator.validate(e.target.value) && e.target.value > '') {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }
  
  clickHandler = (e) => {
      e.preventDefault();
      let x = {
        "Email": this.state.email,
        "Phone": this.state.phone,
        "Name": this.state.name,
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
            <input type="text" name="name" placeholder="Name" onChange={this.handleChange} />
            <input type="text" name="phone" placeholder="Phone Number" onChange={this.handleChange} />
            <input type="text" name="email" placeholder="Email Address" onChange={this.handleChange} />
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