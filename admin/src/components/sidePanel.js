import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SidePanel extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return(
      <div>
        <div className="tab">
          <Link to='/admin'>Home</Link>
        </div>
        <div className="tab">
          <Link to='/admin/promos'>Promos</Link>
        </div>
        <div className="tab">
          <Link to='/admin/locations'>Locations</Link>
        </div>
        <div className="tab">
          <Link to='/admin/logging'>Logging</Link>
        </div>
        <div className="tab">
          <Link to='/admin/users'>Users</Link>
        </div>
      </div>
    );
  }
}

export default SidePanel;