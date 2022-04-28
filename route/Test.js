import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-dash'
import 'videojs-contrib-hls'
import 'videojs-contrib-eme'

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, options, () => {
        // player.log('player is ready');
        player.eme()
        onReady && onReady(player);
      });

      // You can update player in the `else` block here, for example:
    } else {
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div >
<h1>TEST</h1>
      <div data-vjs-player>
        <video
          style={{ width: '100%' }}
          // controls
          ref={videoRef}
          className="video-js vjs-default-skin vjs-big-play-centered"
        />
      </div>
    </div>
  );
}

export default VideoJS;