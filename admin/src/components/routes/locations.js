import React, { Component } from 'react';
import LocationData from '../../locations';

const CreateButton = ({ clickhandler }) => {
  return(
    <div className="btn primary" onClick={clickhandler}>
      Add Location
    </div>
  );
}

class Locations extends Component {
  constructor() {
    super();
    this.state = {};
  }

  renderLocations = () => {
    let keys = Object.keys(LocationData);
    let values = Object.values(LocationData);
    let arr = [];
    arr.push(
      <div className="toprow">
        <div className="column bold upper">Name</div>
        <div className="column bold upper">Site ID</div>
        <div className="column bold upper">Program ID</div>
        <div className="column bold upper">Tag ID</div>
        <div className="column bold upper">Pixel ID</div>
      </div>
    );
    for(let i of keys.keys()) {
        let x = 
          <div className="row">
            <div className="column" key={i}>{keys[i]}</div>
            <div className="column">{LocationData[keys[i]]['siteID']}</div>
            <div className="column">{LocationData[keys[i]]['programID']}</div>
            <div className="column">{LocationData[keys[i]]['tagID']}</div>
            <div className="column">{LocationData[keys[i]]['pixelID']}</div>
          </div>;
        arr.push(x);
    }
    return arr;
  }

  render() {
    return(
      <div>
        <CreateButton clickhandler={this.props.clickhandler} />
        <div>{this.renderLocations()}</div>
      </div>
    );
  }
}

export default Locations;