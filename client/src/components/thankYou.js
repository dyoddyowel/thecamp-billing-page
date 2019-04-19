import React from 'react';

const ThankYou = ({ pixelView }) => {
  return(
    <div id="thank-you-container">
      {pixelView()}
      <h1>Thank you for signing up!</h1>
      <div>We look forward to see you at the program's start! You will receive more information to your provided email in the coming days. If you have any questions, please <a href="mailto: michael@onepercentnutrition.com">contact us</a>.</div>
      <div id="thank-you-image-wrapper">
        <div><a href="/Summer_Shred_NUTRITION_MANUAL.pdf" download><button>Download the Summer Shred Manual</button></a></div>
      </div>
    </div>
  );
}

export default ThankYou;