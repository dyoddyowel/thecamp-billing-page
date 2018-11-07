import React from 'react';

const ThankYou = ({ pixelView }) => {
  return(
    <div>
      {pixelView()}
      <h1>Thank you for signing up!</h1>
      <div><a href="https://drive.google.com/uc?export=download&id=1PS00GEqMjNLuGedrIyQf6My7fcqsj4Uw" download>Download the Holiday Survival Guide</a></div>
      <div>
        <img src="/survival_guide_image.jpg" />
      </div>
    </div>
  );
}

export default ThankYou;