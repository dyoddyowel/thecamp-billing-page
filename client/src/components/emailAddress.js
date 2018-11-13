import React, { Component } from 'react';
import AdHeader from './landingpage/adHeader';
import AdCopy from './landingpage/adCopy';
import validator from "email-validator";
import phone from 'phone';
import "node_modules/video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';

// http://thecamptc.com/videos/AlexandraThanksgiving_1x1_tiny.mp4
// http://thecamptc.com/videos/SamAlejandra_wideToFit_tiny.mp4
// http://thecamptc.com/videos/SamThanksgiving_1x1_tiny.mp4


const VideoPlayer = (props) => {
  return (
    <Player
      playsInline
      poster="/assets/poster.png"
      src="http://thecamptc.com/videos/SamAlejandra_wideToFit_tiny.mp4"
    />
  );
};

const VideoBlack = () => {
  return(
    <div></div>
  );
}

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
      fname: "",
      lname: "",
      isDisabled: true
    }
  }

  componentDidMount() {
    this.props.pixelView();
  }
  
  validatePhone = () => {
    let x = phone(this.state.phone);
    return x.length > 0 ? true : false;
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

  emailChange = (e) => {
    validator.validate(e.target.value);
  }

  render() {
    const style = {
      display: 'none'
    }
    return(
      <div>
        <AdHeader />
        <div className="notmobile">
          <AdCopy />
        </div>
        <div id="email-box">
          <h3>Join Our Program</h3>
          <div>
            <input type="text" name="fname" placeholder="First Name" onChange={this.handleChange} autoComplete="off"/>
            <input type="text" name="lname" placeholder="Last Name" onChange={this.handleChange} autoComplete="off"/>
            <input type="number" name="phone" placeholder="Phone Number" onChange={this.handleChange} autoComplete="off"/>
            <input type="text" name="email" placeholder="Email Address" onChange={this.handleChange} autoComplete="off"/>
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