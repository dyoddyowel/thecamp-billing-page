import React from 'react';
import "../../video-react.css"; // import css
import { Player } from 'video-react';

// http://thecamptc.com/videos/AlexandraThanksgiving_1x1_tiny.mp4
// http://thecamptc.com/videos/SamAlejandra_wideToFit_tiny.mp4
// http://thecamptc.com/videos/SamThanksgiving_1x1_tiny.mp4


const VideoPlayer = (props) => {
  return (
    <div id="video-wrapper">
        <Player
        playsInline
        poster="/videoPoster.png"
        src="http://thecamptc.com/videos/SamAlejandra_wideToFit_tiny.mp4"
        />
    </div>
  );
};

export default VideoPlayer;