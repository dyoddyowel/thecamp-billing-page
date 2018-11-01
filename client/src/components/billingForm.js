import React, { Component } from 'react';
import SelectUSState from 'react-select-us-states';

class BillingForm extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    setNewValue(newValue) {
        console.log('this is the State code:' + newValue);
      }

    render() {
        return(
            <div id="billing-form" className="form">
                <h2>Billing Address</h2>
                <input type="text" placeholder="First Name" id="BillingFirstName" name="BillingFirstName" />
                <input type="text" placeholder="Last Name" id="BillingLastName" name="BillingLastName" />
                <input type="text" placeholder="Address" id="BillingAddress" name="BillingAddress" />
                <div id="city-postal">
                    <input type="text" placeholder="City" id="BillingCity" name="BillingCity" />
                    <input type="text" placeholder="Zip Code" id="BillingPostalCode" name="BillingPostalCode" />
                </div>
                <SelectUSState id="BillingState" name="BillingState" className="myClassName" onChange={this.setNewValue}/>
            </div>
        );
    }
}

export default BillingForm;