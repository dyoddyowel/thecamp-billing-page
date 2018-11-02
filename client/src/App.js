import React, { Component } from 'react';
import BillingForm from './components/billingForm';
import LocationList from './components/locationList';
import EmailAddress from './components/emailAddress';
import logo from './logo.png';
import './App.css';
import './bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

// const NextButton = ({ nextSection }) => {
//   const clickHandler = (e) => {
//     nextSection();
//   }
//   return (
//     <div onClick={clickHandler} className="btn">Next</div>
//   );
// }

const StepComponent = ({ step, components, nextSection }) => {
  return(
    <div>
      { step } of 2
      { components[step] }
    </div>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      components: {
        1: <EmailAddress saveData={this.saveData} />,
        2: <BillingForm saveData={this.saveData} handleSubmit={this.handleSubmit}/>,
      },
      data: {}
    };
  }
  
  saveData = async (data) => {
    const newData = Object.assign({}, this.state.data, data);
    await this.setState({ data: newData }, () => {
      console.log("submitted", this.state);
      this.nextSection();
    });
    return this.state;
  }

  componentDidMount() {
    // this.callApi()
    //   .then(res => this.setState({ response: res.express }))
    //   .catch(err => console.log(err));
  }

  nextSection = () => {
    let nextStep = this.state.step + 1;
    this.setState({ step: nextStep }, () => {
      console.log(this.state);
    });
  };

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async (x) => {
    let d = await this.saveData(x);
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.data),
    });
    const body = await response.text();
    console.log(body);
  };

  render() {
    return (
      <Router>
        <div className="App">
            <div>
              <img src={logo} alt="The Camp" />
            </div>
            <Route path="/:id" render={props => <LocationList {...props} saveData={this.saveData} /> } />
              <div className="block focused">
                <StepComponent 
                  step={this.state.step}
                  components={this.state.components}
                  nextSection={this.nextSection} />
              </div>
        </div>
      </Router>
    );
  }
}

export default App;
