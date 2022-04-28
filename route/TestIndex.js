import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import videojs, { type as VideojsType } from 'video.js'

import dynamic from 'next/dynamic'
const Test = dynamic(() => import('./Test'), { ssr: false })

export default function Home() {
  const playerRef = React.useRef(null);
  const [url, setUrl] = useState('')
  const [license, setLicense] = useState('')
  const [isSSR, setIsSSR] = useState(true);

  const videoJsOptions = {
    autoplay: false,
    // controlBar: {
    //   children: [
    //     'qualitySelector',
    //     'playToggle',
    //     'volumePanel',
    //     'currentTimeDisplay',
    //     'timeDivider',
    //     'durationDisplay',
    //     'progressControl',
    //     'liveDisplay',
    //     'seekToLive',
    //     'remainingTimeDisplay',
    //     'customControlSpacer',
    //     'playbackRateMenuButton',
    //     'chaptersButton',
    //     'descriptionsButton',
    //     'subsCapsButton',
    //     'audioTrackButton',
    //     'fullscreenToggle'
    //   ],
    // },
    // muted: true,
    // play:3,
    height: 100,
    width: 100,
    // videoWidth:960,videoHeight:400,
    controls: true,
    fluid: true,
    responsive: true,
    preload: "auto",
    // enableSourceset: true,
    liveui: true,
    // qualityMenu: true,
    html5: {
      dash: {
        useTTML: true
      },
      vhs: {
        withCredentials: false,
        overrideNative: !videojs?.browser?.IS_SAFARI
      },
      nativeCaptions: true,
      nativeAudioTracks: true,
      nativeVideoTracks: true
    },
    sources: []
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      player.log('player is waiting');
    });

    player.on('dispose', () => {
      player.log('player will dispose');
    });

    player.on('ready', () => {
      console.log('player will readyreadyready');
    })

    player.on('canplay', () => {
      console.log('player will canplay', playerRef.current);

    })
  };


  const onTestStream = (valueType) => {
    if (!playerRef.current) return

    if (!videojs?.browser?.IS_SAFARI) {
      if (valueType === 'dash') {
        playerRef.current.src({
          src: url,
          type: "application/dash+xml",
          keySystemOptions: [
            {
              name: 'com.widevine.alpha',
              options: {
                licenseUrl: license,
              },
            }
          ]
        })
      } else if (valueType === 'hls') {
        playerRef.current.src({
          src: url,
          type: "application/x-mpegURL"
        })
      }

    } else {
      if (valueType === 'dash') {
        playerRef.current.src({
          src: url,
          type: "application/x-mpegURL",
          keySystemOptions: [
            {
              name: 'com.apple.fps.1_0',
              options: {
                licenseUrl: license,
              },
            }
          ],
        })
      } else if (valueType === 'hls') {
        playerRef.current.src([{
          src: url,
          type: "application/x-mpegURL"
        }])
      }

    }

  }

  // console.log('TESTSETEST');

  // React.useEffect(() => {
  //   setIsSSR(false);
  // }, []);

  // if (isSSR) return null
  return (
    <div>
      <Test options={videoJsOptions} onReady={handlePlayerReady} />
      <br /><br />

      <input style={{ width: '400px', marginRight: '16px' }} value={url} onChange={(e) => setUrl(e.target.value)} />
      <input style={{ width: '400px' }} value={license} onChange={(e) => setLicense(e.target.value)} />
      <br /><br />

      <button style={{ marginRight: '16px' }} onClick={() => onTestStream('dash')}>Test Stream DASH</button>
      <button style={{ marginRight: '16px' }} onClick={() => onTestStream('hls')}>Test Stream HLS</button>
      <button onClick={() => { setUrl(''); setLicense('') }}>CLEAR URL</button>
    </div >
  );
}
