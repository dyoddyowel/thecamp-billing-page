import React from 'react';

const ThankYou = ({ pixelView }) => {
  return(
    <div id="thank-you-container">
      {pixelView()}
      <h1>Thank you for signing up!</h1>
      <div><a href="https://drive.google.com/uc?export=download&id=1PS00GEqMjNLuGedrIyQf6My7fcqsj4Uw" download><button>Download the Holiday Survival Guide</button></a></div>
      <div id="thank-you-image-wrapper">
        <a href="https://drive.google.com/uc?export=download&id=1PS00GEqMjNLuGedrIyQf6My7fcqsj4Uw" download>
          <img src="/survival_guide_image.jpg" />
        </a>
      </div>
    </div>
  );
}

export default ThankYou;