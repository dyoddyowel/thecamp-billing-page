import React, { Component } from 'react';
import validator from 'email-validator';

class EmailForm extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onInputChange(e) {
    // validator.validate
  }

  render() {
    return(
      <div>
        <input type="text" placeholder="Email Address" onKeyUp={this.onInputChange} />
      </div>
    );
  }
}

export default EmailForm;