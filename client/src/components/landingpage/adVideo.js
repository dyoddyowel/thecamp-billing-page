import React from 'react';
import "../../video-react.css"; // import css
import { Player } from 'video-react';

const VideoPlayer = (props) => {
  return (
    <div id="video-wrapper">
        <Player
          playsInline
          poster='/videoPoster.jpg'
          autoPlay={false}
          muted={false}
          src="https://www.thecamptc.com/videos/gobble.mp4"
        />
    </div>
  );
};

export default VideoPlayer;
