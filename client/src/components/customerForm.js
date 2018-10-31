import React, { Component } from 'react';

class CustomerForm extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return(
            <div class="form">
                <h2>Customer Information</h2>
                <label for="BillingName">Name</label>
                <input type="text" id="BillingName" name="BillingName" />
                <label for="BillingName">Address 1</label>
                <input type="text" id="AddressLine1" />
                <label for="BillingName">Address 2</label>
                <input type="text" id="AddressLine1" />
                <label for="BillingName">State</label>
                <input type="text" id="State" />
                <label for="BillingName">City</label>
                <input type="text" id="City" />
                <label for="BillingName">Postal Code</label>
                <input type="text" id="PostalCode" />
                <label for="BillingName">Referred By</label>
                <input type="text" id="ReferredBy" />
                <label for="BillingName">Mobile Phone</label>
                <input type="text" id="MobilePhone" />
            </div>
        );
    }
}

export default CustomerForm;