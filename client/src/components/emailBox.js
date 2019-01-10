import React, { Component } from 'react';
import validator from "email-validator";
import phone from 'phone';

class EmailBox extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      phone: "",
      fname: "",
      lname: "",
      isDisabled: true
    }
  }

  validatePhone = () => {
    let x = phone(this.state.phone);
    return x.length > 0 ? true : false;
  }

  clickHandler = async (e) => {
    e.preventDefault();
    let name = this.state.fname + ' ' + this.state.lname;
    let x = {
      "Email": this.state.email,
      "Phone": this.state.phone,
      "Name": name,
    }
    this.props.saveData(x);
    this.props.nextSection();
    this.props.startCheckout('InitiateCheckout', {
      'currency': 'usd',
      'value': 97.00
    })
}

  validateName = () => {
    return (this.state.lname > "" && this.state.fname > "") ? true : false;
  }

  validateEverything = () => {
      if(validator.validate(this.state.email) && this.state.email > '' && this.validatePhone() && this.validateName()) {  
        this.setState({ isDisabled: false });
          
      } else {
        this.setState({ isDisabled: true });
      }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.validateEverything();
  }

  render() {
    return(
      <div id="form-box">
        <input type="text" name="fname" placeholder="First Name" onChange={this.handleChange} autoComplete="off"/>
        <input type="text" name="lname" placeholder="Last Name" onChange={this.handleChange} autoComplete="off"/>
        <input type="number" name="phone" placeholder="Phone Number" onChange={this.handleChange} autoComplete="off"/>
        <input type="text" name="email" placeholder="Email Address" onChange={this.handleChange} autoComplete="off"/>
        {/* <button onClick={this.clickHandler} disabled={this.state.isDisabled}>Get Started</button> */}
      </div>
    );
  }
}

export default EmailBox;