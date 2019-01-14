import React from 'react';
import SelectUSState from 'react-select-us-states';

const BillingAddressForm = ({ handleChange, handleSubmit, setNewValue, disabled }) => (
    <div id="billing-address">
        <h2 className="form-header">Billing Address</h2>
        <input onChange={handleChange} type="text" placeholder="Address" id="BillingAddress" name="BillingAddress" />
        <div id="city-postal">
            <div id="city-state">
                <input onChange={handleChange} type="text" placeholder="City" id="BillingCity" name="BillingCity" />
                <SelectUSState id="BillingState" name="BillingState" className="myClassName" onChange={setNewValue} placeholder="State"/>
            </div>
            <input onChange={handleChange} type="number" placeholder="Zip Code" id="BillingPostalCode" name="BillingPostalCode" />
        </div>
        
    </div>    
);

export default BillingAddressForm;