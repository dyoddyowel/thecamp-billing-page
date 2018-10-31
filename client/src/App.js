import React, { Component } from 'react';
import './App.css';
import PaymentForm from './components/paymentForm';
import BillingForm from './components/billingForm';
import CustomerForm from './components/customerForm';
import LocationList from './components/locationList';
import logo from './logo.png';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div>
            <img src={logo} alt="The Camp" />
          </div>
          <LocationList />
          <PaymentForm />
          <BillingForm />
          <CustomerForm />
          <input type="button" value="Join Class" />
      </div>
    );
  }
}

export default App;
