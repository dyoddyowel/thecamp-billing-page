import React, { Component } from 'react';
import AdHeader from './landingpage/adHeader';
import AdCopy from './landingpage/adCopy';
import VideoPlayer from './landingpage/adVideo';
import EmailBox from './emailBox';

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
      fname: "",
      lname: "",
      isDisabled: true
    }
  }

  componentDidMount() {
    this.props.pixelView();
  }

  render() {

    return(
      <div>
        <AdHeader />
        <div id="email-box">
          <div id="header-text">Register for the <span className="bold yellow">Summer Sizzle Slim Down</span> for just <span className="slash">$197</span> <span className="bold yellow">$47</span>:</div>
            <EmailBox
              saveData={this.props.saveData}
              nextSection={this.props.nextSection}
              startCheckout={this.props.startCheckout} />
        </div>
        <VideoPlayer />
        <div className="notmobile">
          <AdCopy id="header-copy" />
        </div>
      </div>
    );
  }
}

export default EmailForm;
