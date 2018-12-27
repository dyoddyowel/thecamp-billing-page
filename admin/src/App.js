import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import MainPanel from './components/mainPanel';
import SidePanel from './components/sidePanel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <div>
              <div className="panel" id="side-panel">
                <SidePanel />
              </div>
              <div className="panel" id="main-panel">
                <MainPanel />
              </div>
            </div>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
