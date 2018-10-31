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
            <div id="billing-form" class="form">
                <h2>Billing Address</h2>
                <label for="BillingName">Name</label>
                <input type="text" id="BillingName" name="BillingName" />
                <label for="BillingAddress">Address1</label>
                <input type="text" id="BillingAddress" name="BillingAddress" />
                <div id="city-postal">
                    <label for="BillingCity">City</label>
                    <input type="text" id="BillingCity" name="BillingCity" />
                    <label for="BillingPostalCode">Postal Code</label>
                    <input type="text" id="BillingPostalCode" name="BillingPostalCode" />
                </div>
                <label for="BillingState">State</label>
                <SelectUSState id="BillingState" name="BillingState" className="myClassName" onChange={this.setNewValue}/>
            </div>
        );
    }
}

export default BillingForm;