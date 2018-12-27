import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './routes';
import Promos from './routes/promos';
import Logging from './routes/logging';
import Locations from './routes/locations';
import Users from './routes/users';

class MainPanel extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return(
      <div>
        <Route path='/admin/' exact component={Home} />
        <Route path='/admin/logging' exact component={Logging} />
        <Route path='/admin/locations' exact component={Locations} />
        <Route path='/admin/users' exact component={Users} />
        <Route path='/admin/promos' exact component={Promos} />
      </div>
    );
  }
}

export default MainPanel;