import React, { Component } from 'react';
import PaymentForm from './components/paymentForm';
import BillingForm from './components/billingForm';
import LocationList from './components/locationList';
import EmailAddress from './components/emailAddress';
import logo from './logo.png';
import './App.css';
import './bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

const NextButton = ({ nextSection }) => {
  const clickHandler = (e) => {
    nextSection();
  }
  return (
    <div onClick={clickHandler} className="btn">Next</div>
  );
}

const StepComponent = ({ step, components, nextSection }) => {
  return(
    <div>
      { step } of 2
      { components[step] }
        <NextButton 
          nextSection={nextSection} />
    </div>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      components: {
        1: [<EmailAddress saveData={this.saveData} />],
        2: [<PaymentForm saveData={this.saveData} />, <BillingForm saveData={this.saveData} />],
      },
      data: {
        
      }
    };
  }
  
  saveData = (data) => {
    this.setState({ data: data });
    this.nextSection();
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  nextSection = () => {
    let nextStep = this.state.step + 1;
    this.setState({ step: nextStep });
  };

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <Router>
        <div className="App">
            <div>
              <img src={logo} alt="The Camp" />
            </div>
            <Route path="/:id" render={props => <LocationList {...props} saveData={this.saveData} /> } />
              <div className="block focused">
                <StepComponent 
                  step={this.state.step}
                  components={this.state.components}
                  nextSection={this.nextSection} />
              </div>
              
            <input type="button" value="Join Class" onClick={this.handleSubmit} />
        </div>
      </Router>
    );
  }
}

export default App;
