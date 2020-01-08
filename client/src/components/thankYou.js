import React from 'react';

const ThankYou = ({ pixelView }) => {
  return(
    <div id="thank-you-container">
      {pixelView()}
      <h1>Thank you for signing up!</h1>
      <div>We look forward to see you at the program's start! You will receive more information to your provided email in the coming days. If you have any questions, please <a href="https://thecamptc.com/locations">contact us</a>.</div>
      <div id="thank-you-image-wrapper">
        <div><a href="/tough-love-manual-2020.pdf" download><button>Download the 21 Day Tough Love 2020 Program Manual</button></a></div>
      </div>
    </div>
  );
}

export default ThankYou;
