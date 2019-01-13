import React from 'react';

const ThankYou = ({ pixelView }) => {
  return(
    <div id="thank-you-container">
      {pixelView()}
      <h1>Thank you for signing up!</h1>
      <div><a href="http://www.thecamptc.com/manuals/ValentinesNutritionTrainingPlan.pdf" download><button>Download the Tough Love Manual</button></a></div>
      <div id="thank-you-image-wrapper">
        <a href="http://www.thecamptc.com/manuals/ValentinesNutritionTrainingPlan.pdf" download>
          <img src="/ToughLove.png" />
        </a>
      </div>
    </div>
  );
}

export default ThankYou;