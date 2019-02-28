import React from 'react';

const ThankYou = ({ pixelView }) => {
  return(
    <div id="thank-you-container">
      {pixelView()}
      <h1>Thank you for signing up!</h1>
      <div>We look forward to see you at the program's start on March 18th! You will receive more information to your provided email in the coming days. If you have any questions, please <a href="mailto: michael@onepercentnutrition.com">contact us</a>.</div>
      <div id="thank-you-image-wrapper">
        <a href="/SpringCleaningDetoxManual2019.pdf" download>
          <img src="/ToughLove.png" />
        </a>
        <div><a href="/SpringCleaningDetoxManual2019.pdf" download><button>Download the Tough Love Manual</button></a></div>
      </div>
    </div>
  );
}

export default ThankYou;