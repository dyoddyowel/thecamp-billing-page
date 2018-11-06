import React, { Component } from 'react';
import LandingPage from './landingPage';
import validator from "email-validator";
import phone from 'phone'; 

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

  validatePhone = () => {
    let x = phone(this.state.phone);
    console.log(x)
    return x.length > 0 ? true : false;
  }

  validateEverything = () => {
      if(validator.validate(this.state.email) && this.state.email > '' && this.validatePhone()) {  
        this.setState({ isDisabled: false });
          
      } else {
        this.setState({ isDisabled: true });
      }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state)
    });
    this.validateEverything();
  }
  
  clickHandler = (e) => {
      e.preventDefault();
      let x = {
        "Email": this.state.email,
        "Phone": this.state.phone,
        "Name": this.state.name,
      }
      this.props.saveData(x);
      const response = await fetch('/api/infusionsoft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(x),
      });
      const body = await response.text();
      console.log(body);
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
            <input type="number" name="phone" placeholder="Phone Number" onChange={this.handleChange} />
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