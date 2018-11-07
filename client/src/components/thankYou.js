import React from 'react';

const ThankYou = ({ pixelView }) => {
  return(
    <div>
      {pixelView()}
      <h1>Thank you for signing up!</h1>
      <div>Please check your email for confirmation</div>
    </div>
  );
}

export default ThankYou;