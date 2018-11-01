import React, { Component } from 'react';
import './App.css';
import PaymentForm from './components/paymentForm';
import BillingForm from './components/billingForm';
import CustomerForm from './components/customerForm';
import LocationList from './components/locationList';
import EmailAddress from './components/emailAddress';
import logo from './logo.png';
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
      { step } of 3
      { components[step] }
        <NextButton 
          nextSection={nextSection} />
    </div>
  );
}

function Child({ match }) {
  return (
    <div>
      <h3>ID: {match.params.id}</h3>
    </div>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      components: {
        1: <EmailAddress />,
        2: [<PaymentForm />, <BillingForm />],
      }
    };
  }

  nextSection = () => {
    let nextStep = this.state.step + 1;
    this.setState({ step: nextStep });
  }

  render() {
    return (
      <Router>
        <div className="App">
            <div>
              <img src={logo} alt="The Camp" />
            </div>
            <Route path="/:id" component={LocationList} />
              <div className="block focused">
                <StepComponent 
                  step={this.state.step}
                  components={this.state.components}
                  nextSection={this.nextSection} />
              </div>
              
            <input type="button" value="Join Class" />
        </div>
      </Router>
    );
  }
}

export default App;
