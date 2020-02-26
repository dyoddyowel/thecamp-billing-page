import React from 'react';

const ThankYou = ({ pixelView }) => {
  return(
    <div id="thank-you-container">
      {pixelView()}
      <h1>Thank you for signing up!</h1>
      <div>We look forward to see you at the program's start! You will receive more information to your provided email in the coming days. If you have any questions, please <a href="https://thecamptc.com/locations">contact us</a>.</div>
      <div id="thank-you-image-wrapper">
        <div><a href="/xxx.pdf" download><button>Download the Spring Cleaning Detox Program Manual</button></a></div>
      </div>
    </div>
  );
}

export default ThankYou;
