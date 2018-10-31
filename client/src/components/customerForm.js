import React, { Component } from 'react';
import SelectUSState from 'react-select-us-states';

class CustomerForm extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return(
            <div id="customer-form" className="form">
                <h2>Customer Information</h2>
                
                <input type="text" placeholder="Name" id="BillingName" name="BillingName" />
                
                <input type="text" placeholder="Address 1" id="AddressLine1" />
                
                <input type="text" placeholder="Address 2" id="AddressLine1" />
                
                <SelectUSState id="BillingState" name="BillingState" className="myClassName" onChange={this.setNewValue}/>
                
                <input type="text" placeholder="City" id="City" />
                
                <input type="text" placeholder="Zip Code" id="PostalCode" />
    
                <input type="text" placeholder="Phone" id="MobilePhone" />
                <input type="text" placeholder="Referred By" id="ReferredBy" />
                
            </div>
        );
    }
}

export default CustomerForm;