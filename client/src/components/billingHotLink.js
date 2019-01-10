import React, { Component } from 'react';
import EmailBox from './emailBox';
import postcode from 'postcode-validator';
import ReactPixel from 'react-facebook-pixel';
import PaymentForm from './paymentForm';
import BillingAddress from './billingAddress';
import AdCopy from './landingpage/adCopy';

class BillingHotLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      address: {
          "BillingAddress": "",
          "BillingCity": "",
          "BillingState": "",
          "BillingPostalCode": "",
      },
      payment: {
          "amount": 21,
          "number": "",
          "expiry": "",
          "cvc": "",
          "name": "",
          "isValid": false
      },
      formErrors: {
          
      }
    };
  }

//TODO: export out the Email Address section
  saveData = async (data) => {
    const newData = Object.assign({}, this.state.data, data);
    await this.setState({ data: newData }, () => {
      console.log(this.state)
    });
    return this.state;
  }

  handleEmailChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state)
    });
    this.validateEverything();
  }

  handlePaymentChange = (data) => {
    let x = {
        ...this.state.payment,
        ...data
    };
    this.setState({ payment: x }, () => {
      console.log(this.state)
    });
  }

  saveEmailData = async (x) => {
    x['TagID'] = this.state.data.TagID;
    this.saveData(x);
    const response = await fetch('/api/infusionsoft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(x),
    });
    await response.text();
  }

  handleChange = (e) => {
    let x = this.state.address;
    x[e.target.id] = e.target.value;
    this.setState({ address: x });
    this.validateEverything();
  }

  validateEverything = () => {
    // let numberValidation = cardValidator.number(this.state.payment.number);
    // let isValid = numberValidation.isPotentiallyValid;
    if(postcode.validate(this.state.address.BillingPostalCode, 'US') && this.state.payment.isValid) {
        
        this.setState({ isDisabled: false }, () => {
          console.log(this.state)
        });
    } else {
        this.setState({ isDisabled: false }, () => {
          console.log(this.state)
        });
    }
}

  handleSubmit = async (x) => {
    this.setState({ error: false });
    await this.saveData(x);
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: this.state.data,
    });

    const status = await response.text();
    if(status === "Success") {
      this.nextSection();
      ReactPixel.track('Purchase', {
        'currency': 'USD',
        'value': 21.0
      });
    } else {
      this.setState({ error: true });
    }
  };

  setNewValue = (newValue) => {
    let x = {
        ...this.state.address
    };
    x["BillingState"] = newValue;
    this.setState({ address: x });
  }

  render() {
    return(
      <div className="billing">
        <AdCopy
          id="billing-copy" />
        <h2>Customer Information</h2>
        <EmailBox 
          saveData={this.saveEmailData}
          handleChange={this.handleEmailChange}
          nextSection={this.props.nextSection} 
          pixelView={this.props.pixelView}
          startCheckout={this.props.pixelView } />
        <BillingAddress 
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          setNewValue={this.setNewValue}
          disabled={this.state.isDisabled} />
        <h2>Payment Information</h2>
        <PaymentForm 
          amount={this.state.payment['amount']}
          cc={this.state.payment['number']}
          cvc={this.state.payment['cvc']}
          expiry={this.state.payment['expiry']}
          ccName={this.state.payment['name']} 
          handlePaymentChange={this.handlePaymentChange}/>
        <button onClick={this.handleSubmit}>Join Program</button>
      </div>
    );
  }
}

export default BillingHotLink;