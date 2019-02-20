import React, { Component } from 'react';
import EmailBox from './emailBox';
import postcode from 'postcode-validator';
import ReactPixel from 'react-facebook-pixel';
import PaymentForm from './paymentForm';
import BillingAddress from './billingAddress';
import AdCopy from './landingpage/adCopy';
import { capitalize } from '../helpers';
import ThankYou from './thankYou';
import ErrorComponent from './error';
import PromoDetails from './landingpage/promoDetails';
import Video from './landingpage/adVideo';
import location from '../locations2';
//TODO: Implement Thank You Page
//TODO: Implement Step Component

const StepComponent = ({ Component }) => (
  <div className="step">
    { Component }
  </div>
);

const Loading = () => (
  <h1>Please wait! Processing your purchase.</h1>
);

const BillingPage = ({ 
  saveData,
  pixelView,
  handleEmailChange,
  handleChange,
  handleSubmit,
  nextSection,
  setNewValue,
  disabled,
  amount,
  cc,
  cvc,
  expiry,
  ccName,
  handlePaymentChange,
}) => (
  <React.Fragment>
    <PromoDetails
      detailname="Spring Cleaning Detox"
      price="37" />
    <Video />
    <AdCopy
      id="billing-copy" />
    <h2 className="form-header">Customer Information</h2>
    <EmailBox 
      saveData={saveData}
      handleChange={handleEmailChange}
      nextSection={nextSection} 
      pixelView={pixelView}
      startCheckout={pixelView } />
    <BillingAddress 
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      setNewValue={setNewValue}
      disabled={disabled} />
    <h2 className="form-header">Payment Information</h2>
    <PaymentForm 
      amount={amount}
      cc={cc}
      cvc={cvc}
      expiry={expiry}
      ccName={ccName} 
      handlePaymentChange={handlePaymentChange}/>
    <button title="Please fill out all inputs before submitting." disabled={disabled} className="primary join-program" onClick={handleSubmit}>Join Program</button>
  </React.Fragment>
);

const LocationSwitch = ({ changeHandler }) => {
  const renderSwitch = () => {
    let arr = [];
    let keys = Object.keys(location);
    keys.forEach((key, i) => {
      let name = key.replace('-', ' ');
      arr.push(
        <option key={i} value={location[key]['siteID']} name={name}>{name}</option>
      );        
    })
    return arr;
  }

  return(
    <select onChange={changeHandler}>
      {
        renderSwitch()
      }
    </select>
  );
};

class BillingHotLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      siteName: '',
      clientID: '',
      complete: false,
      isDisabled: true,
      ProgramID: '',
      error: false,
      SiteID: '',
      showSwitch: false,
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
          "issuer": "",
          "isValid": false
      },
      formErrors: {
          
      }
    };
  }

  componentDidMount() {
    let a = this.props.locations;
    let t = capitalize(this.props.match.params.id);
    this.setState({ SiteID: a[t]['siteID'],
                    ProgramID: a[t]['programID'],
                    PixelID: a[t]['pixelID'],
                    siteName: t,
    })
  }
  nextSection = () => {
    let steps = this.state.steps + 1;
    this.setState({ steps: steps });
  }

//TODO: export out the Email Address section
  saveData = async (data) => {
    const newData = Object.assign({}, this.state.data, data);
    await this.setState({ data: newData }
      , () => {
        console.log(this.state)
      });
    return this.state;
  }

  handleEmailChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.validateEverything();
  }

  handlePaymentChange = (data) => {
    let x = {
        ...this.state.payment,
        ...data
    };
    this.setState({ payment: x });
    this.validateEverything();
  }

  saveEmailData = async (x) => {

  }

  handleChange = (e) => {
    let x = this.state.address;
    x[e.target.id] = e.target.value;
    this.setState({ address: x });
    this.validateEverything();
  }

  validateEverything = () => {
    if(postcode.validate(this.state.address.BillingPostalCode, 'US') && this.state.payment.isValid) {  
        this.setState({ isDisabled: false });
    } else {
        this.setState({ isDisabled: true });
    }
}

  clientEndpoint = async () => {
    const client_response = await fetch('/api/client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    });
    let response_parse = await client_response.json();
    console.log("react client response", response_parse)
    let client_id = response_parse[0]['ID'];
    this.setState({ clientID: client_id});
  }

  paymentEndpoint = async () => {
    const payment_response = await fetch('/api/billing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    });

    const status = await payment_response.text();
    if(status === "Success") {
      this.nextSection();
      ReactPixel.track('Purchase', {
        'currency': 'USD',
        'value': 37.0
      });
      this.setState({ complete: true });
    } else {
      this.setState({ error: true });
    }
  }

  handleSubmit = async () => {
    this.setState({ error: false });
    this.setState({ loading: true });

    if(this.state.clientID === '' || this.state.clientID === undefined) {
      console.log("no clientid")
      await this.clientEndpoint();
      await this.paymentEndpoint();
    } else {
      await this.paymentEndpoint();
    }
    this.setState({ loading: false });
  };

  setNewValue = (newValue) => {
    let x = {
        ...this.state.address
    };
    x["BillingState"] = newValue;
    this.setState({ address: x });
  }

  handleLocationChange = (e) => {
    let name = e.target.options[e.target.selectedIndex].text;
    this.setState({SiteID: e.target.value, showSwitch: false, siteName: name});
  }

  render() {
    return(
      <div className="billing">
      <React.Fragment>
        <div className="location-name"> {this.state.siteName} </div>
        <div className="low-priority" onClick={()=> {this.setState({showSwitch: !this.state.showSwitch})}}>Need to visit a different location?</div>
        {
          this.state.showSwitch && <LocationSwitch site={this.state.siteID} changeHandler={this.handleLocationChange}/>
        }
        
      </React.Fragment>
      
      {

        this.state.loading ? <Loading /> : 
        this.state.complete ? <ThankYou 
                                pixelView={this.props.pixelView} /> : 
                              <BillingPage 
                                saveData={this.saveEmailData}
                                handleEmailChange={this.handleEmailChange}
                                nextSection={this.props.nextSection} 
                                pixelView={this.props.pixelView}
                                startCheckout={this.props.pixelView }
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                setNewValue={this.setNewValue}
                                disabled={this.state.isDisabled}
                                amount={this.state.payment['amount']}
                                cc={this.state.payment['number']}
                                cvc={this.state.payment['cvc']}
                                expiry={this.state.payment['expiry']}
                                ccName={this.state.payment['name']} 
                                handlePaymentChange={this.handlePaymentChange} />
      }
      {
        this.state.error ? <ErrorComponent/> : <span></span>
      }
      </div>
    );
  }
}



export default BillingHotLink;