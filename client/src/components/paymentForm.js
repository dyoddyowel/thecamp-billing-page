import React, { Component } from 'react';
import Cards from 'react-credit-cards';
import Payment from 'payment';
import valid from 'card-validator';
import 'react-credit-cards/es/styles-compiled.css';

export default class PaymentForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        focused: '',
        "Amount": 89,
        "CreditCardNumber": 777777777777,
        "ExpMonth": 1,
        "ExpYear": 2018,
      };
    }
  
    componentDidMount() {
      Payment.formatCardNumber(document.querySelector('[name="number"]'));
      Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
      Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
    }
  
    handleInputFocus = ({ target }) => {
      this.setState({
        focused: target.name,
      });
    };
  
    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            let numberValidation = valid.number(target.value);
            if(!numberValidation.isPotentiallyValid) {
                console.log("invalid");
            }
        
        this.setState({
          [target.name]: target.value.replace(/ /g, ''),
        });
      }
      else if (target.name === 'expiry') {
        this.setState({
          [target.name]: target.value.replace(/ |\//g, ''),
        });
      }
      else {
        this.setState({
          [target.name]: target.value,
        });
      }
    };
  
    handleCallback(type, isValid) {
      console.log(type, isValid); //eslint-disable-line no-console
    }
  
    render() {
      const { name, number, expiry, cvc, focused } = this.state;
      return (
        <div>
          <h2>Credit Card</h2>
          <div>
            <Cards
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />
            <form className="rccs">
              <div>
                <input
                  type="tel"
                  name="number"
                  placeholder="Card Number"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div>
                <input
                  type="tel"
                  className="half-width"
                  name="expiry"
                  placeholder="Valid Thru"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <input
                  type="tel"
                  className="half-width"
                  name="cvc"
                  placeholder="CVC"
                  onKeyUp={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </form>
          </div>
        </div>
      );
    }
  }