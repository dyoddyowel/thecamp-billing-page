import React, { Component } from 'react';
import LandingPage from './landingPage';
import validator from "email-validator";
import phone from 'phone'; 

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
      name: "",
      isDisabled: true
    }
  }

  componentDidMount() {
    console.log("pixel view", this.props.pixelView)
    this.props.pixelView();
  }
  
  validatePhone = () => {
    let x = phone(this.state.phone);
    console.log(x)
    return x.length > 0 ? true : false;
  }

  validateEverything = () => {
      if(validator.validate(this.state.email) && this.state.email > '' && this.validatePhone() && this.state.name > '') {  
        this.setState({ isDisabled: false });
          
      } else {
        this.setState({ isDisabled: true });
      }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state)
    });
    console.log(this.props)
    this.validateEverything();
  }
  
  clickHandler = async (e) => {
      e.preventDefault();
      let x = {
        "Email": this.state.email,
        "Phone": this.state.phone,
        "Name": this.state.name,
      }
      this.props.saveData(x);
      this.props.startCheckout('InitiateCheckout', {
        'currency': 'usd',
        'value': 97.00
      })
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