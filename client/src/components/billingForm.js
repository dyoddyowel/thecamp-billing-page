import React, { Component } from 'react';
import SelectUSState from 'react-select-us-states';
import PaymentForm from './paymentForm';

class BillingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: {
                "BillingFirstName": "",
                "BillingLastName": "",
                "BillingAddress": "",
                "BillingCity": "",
                "BillingState": "",
                "BillingPostalCode": "",
            }
        }
    }

    handleChange = (e) => {
        let x = this.state.address;
        console.log(x);
        x[e.target.id] = e.target.value;
        this.setState({ address: x });
    }

    setNewValue = (newValue) => {
        let x = {
            ...this.state.address
        };
        x["BillingState"] = newValue;
        this.setState({ address: x });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let x = {
            "Address": this.state.address
        }
        this.props.saveData(x);
        this.props.handleSubmit();
    }

    render() {
        return(
            <div id="billing-form" className="form">
                <PaymentForm />
                <h2>Billing Address</h2>
                <input onChange={this.handleChange} type="text" placeholder="First Name" id="BillingFirstName" name="BillingFirstName" />
                <input onChange={this.handleChange} type="text" placeholder="Last Name" id="BillingLastName" name="BillingLastName" />
                <input onChange={this.handleChange} type="text" placeholder="Address" id="BillingAddress" name="BillingAddress" />
                <div id="city-postal">
                    <input onChange={this.handleChange} type="text" placeholder="City" id="BillingCity" name="BillingCity" />
                    <input onChange={this.handleChange} type="text" placeholder="Zip Code" id="BillingPostalCode" name="BillingPostalCode" />
                </div>
                <SelectUSState id="BillingState" name="BillingState" className="myClassName" onChange={this.setNewValue}/>
                <button onClick={this.handleSubmit}>Join Class</button>
            </div>

        );
    }
}

export default BillingForm;