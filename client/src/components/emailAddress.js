import React, { Component } from 'react';

class EmailForm extends Component {
  constructor(props) {
    super();
    this.state = {
      input: ""
    }
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  }
  
  clickHandler = (e) => {
      e.preventDefault();
      let x = {
        "Email": this.state.input
      }
      this.props.saveData(x);
  }

  render() {
    return(
      <div>
        <input type="text" placeholder="Email Address" onChange={this.handleChange} />
        <button onClick={this.clickHandler}>Continue to Payment</button>
      </div>
    );
  }
}

export default EmailForm;