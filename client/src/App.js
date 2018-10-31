import React, { Component } from 'react';
import './App.css';
import PaymentForm from './components/paymentForm';
import BillingForm from './components/billingForm';
import CustomerForm from './components/customerForm';
import LocationList from './components/locationList';

class App extends Component {
  render() {
    return (
      <div className="App">
          <LocationList />
          <PaymentForm />
          <BillingForm />
          <CustomerForm />
      </div>
    );
  }
}

export default App;
