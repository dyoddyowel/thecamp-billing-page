import React from 'react';

const ThankYou = ({ pixelView }) => {
  return(
    <div id="thank-you-container">
      {pixelView()}
      <h1>Thank you for signing up!</h1>
      <div>We look forward to see you at the program's start! You will receive more information to your provided email in the coming days. If you have any questions, please <a href="https://www.thecamptc.com/locations.php">contact us</a>.</div>
      <div id="thank-you-image-wrapper">
        <div><a href="/21-Day-Back-to-School-Macro-Counting-Program.pdf" download><button>Download the 21 Day Back to School Macro Counting Program Manual</button></a></div>
      </div>
    </div>
  );
}

export default ThankYou;
