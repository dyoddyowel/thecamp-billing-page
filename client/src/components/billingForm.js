import React, { Component } from 'react';
import SelectUSState from 'react-select-us-states';
import PaymentForm from './paymentForm';
import postcode from 'postcode-validator';
import cardValidator from 'card-validator';


class BillingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: true,
            address: {
                "BillingAddress": "",
                "BillingCity": "",
                "BillingState": "",
                "BillingPostalCode": "",
            },
            payment: {
                "amount": 89,
                "number": "",
                "expiry": "",
                "cvc": "",
                "name": "",
                "isValid": false
            },
            formErrors: {
                
            }
        }
    }

    componentDidMount() {
        this.props.pixelView();
    }

    validateEverything = () => {
        let numberValidation = cardValidator.number(this.state.payment.number);
        let isValid = numberValidation.isPotentiallyValid;
        if(postcode.validate(this.state.address.BillingPostalCode, 'US') && this.state.payment.isValid) {
            
            this.setState({ isDisabled: false });
        } else {
            this.setState({ isDisabled: true });
        }
    }

    handleChange = (e) => {
        let x = this.state.address;
        x[e.target.id] = e.target.value;
        this.setState({ address: x });
        this.validateEverything();
    }
    
    handlePaymentChange = (data) => {
        let x = {
            ...this.state.payment,
            ...data
        };
        this.setState({ payment: x });
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
            "Address": this.state.address,
            "Payment": this.state.payment
        }
        // this.props.saveData(x);
        this.props.handleSubmit(x);
        let clear_data = {
            isDisabled: true,
            address: {
                "BillingAddress": "",
                "BillingCity": "",
                "BillingState": "",
                "BillingPostalCode": "",
            },
            payment: {
                "amount": 89,
                "number": "",
                "expiry": "",
                "cvc": "",
                "name": "",
                "isValid": false
            },
            formErrors: {
                
            }
        }
        this.setState(clear_data);
    }

    render() {
        return(
            <div id="billing-form" className="form">
                <PaymentForm 
                    amount={this.state.payment['amount']}
                    cc={this.state.payment['number']}
                    cvc={this.state.payment['cvc']}
                    expiry={this.state.payment['expiry']}
                    ccName={this.state.payment['name']} 
                    handlePaymentChange={this.handlePaymentChange}/>
                <div id="billing-address">
                    <h2>Billing Address</h2>
                    <input onChange={this.handleChange} type="text" placeholder="Address" id="BillingAddress" name="BillingAddress" />
                    <div id="city-postal">
                        <div id="city-state">
                            <input onChange={this.handleChange} type="text" placeholder="City" id="BillingCity" name="BillingCity" />
                            <SelectUSState id="BillingState" name="BillingState" className="myClassName" onChange={this.setNewValue} />
                        </div>
                        <input onChange={this.handleChange} type="number" placeholder="Zip Code" id="BillingPostalCode" name="BillingPostalCode" />
                    </div>
                    <button onClick={this.handleSubmit} disabled={this.state.isDisabled}>Join Class</button>
                </div>
            </div>

        );
    }
}

export default BillingForm;